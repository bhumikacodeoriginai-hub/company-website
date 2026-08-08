/**
 * Code Origin.AI — Main Application Script
 * Handles: scroll effects, reveal animations, mobile nav, counters,
 * form validation/submission, accessibility, and performance features
 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {

  // ═══ PERFORMANCE & DEVICE DETECTION ═══
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 768;

  // ═══ HEADER SCROLL EFFECT ═══
  const header = document.querySelector('.header');
  let lastScrollY = 0;
  let headerTicking = false;

  function updateHeader() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
    headerTicking = false;
  }

  window.addEventListener('scroll', function () {
    lastScrollY = window.scrollY;
    if (!headerTicking) {
      requestAnimationFrame(updateHeader);
      headerTicking = true;
    }
  }, { passive: true });


  // ═══ SCROLL REVEAL SYSTEM ═══
  if (!prefersReducedMotion) {
    var revealSelectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    var revealElements = document.querySelectorAll(revealSelectors);

    if (revealElements.length > 0) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
      });

      revealElements.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  } else {
    // If reduced motion, show everything immediately
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(function (el) {
      el.classList.add('active');
    });
  }


  // ═══ MOBILE MENU ═══
  var menuBtn = document.querySelector('.menu-btn');
  var mobileNav = document.querySelector('.mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = menuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // Close on escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        menuBtn.focus();
      }
    });
  }


  // ═══ ANIMATED COUNTERS ═══
  var counterElements = document.querySelectorAll('[data-count]');

  if (counterElements.length > 0 && !prefersReducedMotion) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counterElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    // Show final values immediately for reduced motion
    counterElements.forEach(function (el) {
      el.textContent = el.dataset.count + (el.dataset.suffix || '');
    });
  }

  function animateCounter(el) {
    var end = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 2000;
    var startTime = performance.now();

    function update(currentTime) {
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var easedProgress = 1 - Math.pow(1 - progress, 3);
      var currentValue = Math.floor(easedProgress * end);
      el.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }


  // ═══ CONTACT FORM HANDLING ═══
  var form = document.getElementById('contact-form');

  if (form) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var successEl = document.getElementById('form-success');
    var errorEl = document.getElementById('form-error');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Reset errors
      form.querySelectorAll('.form-group').forEach(function (g) {
        g.classList.remove('has-error');
      });
      form.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function (f) {
        f.classList.remove('error');
      });

      // Validate
      var isValid = true;
      var fields = [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'message', type: 'text', required: true }
      ];

      fields.forEach(function (field) {
        var input = form.querySelector('[name="' + field.name + '"]');
        if (!input) return;
        var value = input.value.trim();
        var group = input.closest('.form-group');

        if (field.required && !value) {
          isValid = false;
          input.classList.add('error');
          if (group) group.classList.add('has-error');
        } else if (field.type === 'email' && value && !isValidEmail(value)) {
          isValid = false;
          input.classList.add('error');
          if (group) group.classList.add('has-error');
        }
      });

      if (!isValid) {
        // Focus first error field
        var firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      // Submit simulation (loading state)
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      submitBtn.style.opacity = '0.7';

      // Simulate API call
      setTimeout(function () {
        form.style.display = 'none';
        if (successEl) successEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        submitBtn.style.opacity = '1';
      }, 1500);
    });

    // Real-time field validation (remove error on input)
    form.querySelectorAll('.form-input, .form-textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        this.classList.remove('error');
        var group = this.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }


  // ═══ SMOOTH SCROLL FOR ANCHOR LINKS ═══
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var headerHeight = header ? header.offsetHeight : 80;
        var top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  // ═══ ACTIVE NAV HIGHLIGHT (for current page) ═══
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mobile-nav a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && href.includes(currentPage) && currentPage !== 'index.html') {
      link.classList.add('active');
    }
  });

  // ═══ KEYBOARD FOCUS STYLES ═══
  // Only show focus outlines for keyboard navigation
  var usingKeyboard = false;

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      usingKeyboard = true;
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', function () {
    usingKeyboard = false;
    document.body.classList.remove('keyboard-nav');
  });

  // ═══ EXTERNAL LINK HANDLING ═══
  document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
    if (!link.querySelector('.sr-only')) {
      var srSpan = document.createElement('span');
      srSpan.className = 'sr-only';
      srSpan.textContent = ' (opens in new tab)';
      link.appendChild(srSpan);
    }
  });

});
