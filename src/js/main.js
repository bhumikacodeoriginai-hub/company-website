/**
 * CODE ORIGIN.AI — Main Application JavaScript
 * Enterprise Technology Website
 */

'use strict';

// ============================================
// THEME MANAGEMENT
// ============================================
const ThemeManager = {
  STORAGE_KEY: 'codeorigin-theme',
  
  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    this.apply(theme);
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        this.apply(e.matches ? 'dark' : 'light');
      }
    });
    
    // Bind toggle buttons
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  },
  
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    this.updateIcons(theme);
  },
  
  toggle() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.STORAGE_KEY, next);
    this.apply(next);
  },
  
  updateIcons(theme) {
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      const sunIcon = btn.querySelector('.icon-sun');
      const moonIcon = btn.querySelector('.icon-moon');
      if (sunIcon && moonIcon) {
        sunIcon.style.display = theme === 'dark' ? 'block' : 'none';
        moonIcon.style.display = theme === 'dark' ? 'none' : 'block';
      }
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }
};

// ============================================
// NAVIGATION
// ============================================
const Navigation = {
  init() {
    this.header = document.querySelector('.header');
    this.toggle = document.querySelector('.nav-toggle');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.navLinks = document.querySelectorAll('.nav-link[aria-expanded]');
    
    if (!this.header) return;
    
    // Scroll behavior
    this.lastScroll = 0;
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
    
    // Mobile toggle
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleMobile());
    }
    
    // Desktop dropdowns
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.toggleDropdown(e, link));
      link.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleDropdown(e, link);
        }
      });
    });
    
    // Mobile subnav toggles
    document.querySelectorAll('.mobile-nav-link[data-subnav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const subnav = link.nextElementSibling;
        if (subnav) {
          subnav.classList.toggle('active');
          const chevron = link.querySelector('.nav-chevron');
          if (chevron) {
            chevron.style.transform = subnav.classList.contains('active') ? 'rotate(180deg)' : '';
          }
        }
      });
    });
    
    // Close dropdowns on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item')) {
        this.closeAllDropdowns();
      }
    });
    
    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllDropdowns();
        if (this.mobileNav && this.mobileNav.classList.contains('active')) {
          this.toggleMobile();
        }
      }
    });
  },
  
  onScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 10) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
    
    this.lastScroll = scrollY;
  },
  
  toggleMobile() {
    const isOpen = this.mobileNav.classList.contains('active');
    this.mobileNav.classList.toggle('active');
    this.toggle.classList.toggle('active');
    document.body.classList.toggle('nav-open');
    
    this.toggle.setAttribute('aria-expanded', !isOpen);
    this.mobileNav.setAttribute('aria-hidden', isOpen);
    
    if (!isOpen) {
      // Focus first link
      const firstLink = this.mobileNav.querySelector('a, button');
      if (firstLink) firstLink.focus();
    }
  },
  
  toggleDropdown(e, link) {
    e.preventDefault();
    const expanded = link.getAttribute('aria-expanded') === 'true';
    
    this.closeAllDropdowns();
    
    if (!expanded) {
      link.setAttribute('aria-expanded', 'true');
      const dropdown = link.nextElementSibling;
      if (dropdown) {
        dropdown.classList.add('active');
      }
    }
  },
  
  closeAllDropdowns() {
    this.navLinks.forEach(link => {
      link.setAttribute('aria-expanded', 'false');
      const dropdown = link.nextElementSibling;
      if (dropdown) dropdown.classList.remove('active');
    });
  }
};

// ============================================
// SCROLL REVEAL
// ============================================
const ScrollReveal = {
  init() {
    this.elements = document.querySelectorAll('.reveal');
    if (!this.elements.length) return;
    
    // Check if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.elements.forEach(el => el.classList.add('revealed'));
      return;
    }
    
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    
    this.elements.forEach(el => this.observer.observe(el));
  }
};

// ============================================
// CONTACT FORM
// ============================================
const ContactForm = {
  init() {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;
    
    this.submitBtn = this.form.querySelector('.form-submit .btn');
    this.formContainer = this.form.closest('.contact-form-container');
    this.successState = document.querySelector('.form-success');
    this.errorState = document.querySelector('.form-error-state');
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Real-time validation
    this.form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
  },
  
  validateField(field) {
    const errorEl = field.parentElement.querySelector('.form-error');
    let isValid = true;
    let message = '';
    
    if (field.required && !field.value.trim()) {
      isValid = false;
      message = 'This field is required';
    } else if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        message = 'Please enter a valid email address';
      }
    } else if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
      if (!phoneRegex.test(field.value)) {
        isValid = false;
        message = 'Please enter a valid phone number';
      }
    }
    
    if (!isValid) {
      field.classList.add('error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      }
      field.setAttribute('aria-invalid', 'true');
    } else {
      field.classList.remove('error');
      if (errorEl) {
        errorEl.classList.remove('visible');
      }
      field.removeAttribute('aria-invalid');
    }
    
    return isValid;
  },
  
  validateAll() {
    let isValid = true;
    this.form.querySelectorAll('[required]').forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    return isValid;
  },
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateAll()) {
      // Focus first error
      const firstError = this.form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }
    
    // Show loading
    this.submitBtn.disabled = true;
    this.submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    
    // Simulate API call (replace with actual endpoint)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success
      this.form.style.display = 'none';
      if (this.successState) {
        this.successState.classList.add('visible');
      }
    } catch (error) {
      // Show error
      this.form.style.display = 'none';
      if (this.errorState) {
        this.errorState.classList.add('visible');
      }
    } finally {
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = 'Start a Conversation';
    }
  }
};

// ============================================
// SMOOTH SCROLL
// ============================================
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 72;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }
};

// ============================================
// JOB FILTERS (Careers page)
// ============================================
const JobFilters = {
  init() {
    const filters = document.querySelectorAll('.jobs-filter');
    const jobCards = document.querySelectorAll('.job-card');
    
    if (!filters.length) return;
    
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.filter;
        
        // Update active state
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        // Filter jobs
        jobCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
};

// ============================================
// INSIGHTS FILTERS
// ============================================
const InsightsFilter = {
  init() {
    const filters = document.querySelectorAll('.insight-filter');
    const cards = document.querySelectorAll('.insight-card');
    
    if (!filters.length) return;
    
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        const category = filter.dataset.filter;
        
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        cards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
};

// ============================================
// BACK TO TOP
// ============================================
const BackToTop = {
  init() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
    
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  Navigation.init();
  ScrollReveal.init();
  ContactForm.init();
  SmoothScroll.init();
  JobFilters.init();
  InsightsFilter.init();
  BackToTop.init();
});
