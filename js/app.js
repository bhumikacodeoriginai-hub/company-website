/**
 * Code Origin.AI — Main Application Controller
 * Handles all interactions, animations, and UI state
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ═══════════════════════════════════════════
  // HEADER — Scroll state
  // ═══════════════════════════════════════════
  const header = document.querySelector('.header');
  let lastScroll = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;
    if (header) {
      header.classList.toggle('scrolled', scrollY > 40);
    }
    lastScroll = scrollY;
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ═══════════════════════════════════════════
  // MEGA MENU
  // ═══════════════════════════════════════════
  const megaTriggers = document.querySelectorAll('[data-mega]');
  const megaMenus = document.querySelectorAll('.mega-menu');
  let megaTimeout = null;
  let activeMega = null;

  function openMega(id) {
    closeMega();
    const menu = document.getElementById('mega-' + id);
    if (menu) {
      menu.classList.add('active');
      menu.setAttribute('aria-hidden', 'false');
      activeMega = menu;
    }
  }

  function closeMega() {
    megaMenus.forEach(m => {
      m.classList.remove('active');
      m.setAttribute('aria-hidden', 'true');
    });
    activeMega = null;
  }


  megaTriggers.forEach(trigger => {
    const id = trigger.getAttribute('data-mega');

    trigger.addEventListener('mouseenter', () => {
      clearTimeout(megaTimeout);
      openMega(id);
    });

    trigger.addEventListener('mouseleave', () => {
      megaTimeout = setTimeout(closeMega, 200);
    });

    // Keyboard support
    trigger.addEventListener('focus', () => {
      openMega(id);
    });
  });

  megaMenus.forEach(menu => {
    menu.addEventListener('mouseenter', () => {
      clearTimeout(megaTimeout);
    });
    menu.addEventListener('mouseleave', () => {
      megaTimeout = setTimeout(closeMega, 150);
    });
  });

  // Close mega menu on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeMega) {
      closeMega();
    }
  });

  // Close mega menu when clicking outside
  document.addEventListener('click', (e) => {
    if (activeMega && !e.target.closest('.mega-menu') && !e.target.closest('[data-mega]')) {
      closeMega();
    }
  });

  // ═══════════════════════════════════════════
  // MOBILE NAVIGATION
  // ═══════════════════════════════════════════
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
      mobileNav.setAttribute('aria-hidden', !isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNav.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        mobileNav.classList.remove('active');
        mobileNav.setAttribute('aria-hidden', 'true');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }


  // ═══════════════════════════════════════════
  // SCROLL REVEAL ANIMATIONS
  // ═══════════════════════════════════════════
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all elements immediately
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ═══════════════════════════════════════════
  // SERVICE NAVIGATOR
  // ═══════════════════════════════════════════
  const serviceData = {
    ai: {
      title: 'AI & Machine Learning',
      desc: 'Custom AI models, deep learning pipelines, and intelligent automation systems designed for enterprise scale. From generative AI to computer vision, we build systems that learn, adapt, and deliver measurable business value.',
      caps: ['Custom Model Development', 'Generative AI & LLMs', 'RAG Systems', 'AI Agents', 'MLOps & Monitoring', 'Computer Vision'],
      tech: ['PyTorch', 'TensorFlow', 'LangChain', 'Hugging Face', 'MLflow', 'OpenAI']
    },
    software: {
      title: 'Software Engineering',
      desc: 'Scalable, maintainable software architectures built with modern engineering practices. We craft systems that stand the test of time, grow with your business, and deliver exceptional user experiences.',
      caps: ['Microservices Architecture', 'Full Stack Development', 'API Design & Development', 'Mobile Applications', 'Legacy Modernization', 'Performance Optimization'],
      tech: ['TypeScript', 'React', 'Node.js', 'Go', 'Python', 'GraphQL']
    },
    cloud: {
      title: 'Cloud & DevOps',
      desc: 'Cloud-native architectures and DevOps excellence that enable rapid, reliable software delivery. We build infrastructure that scales automatically, recovers gracefully, and optimizes cost.',
      caps: ['Cloud Migration & Strategy', 'Infrastructure as Code', 'CI/CD Pipeline Design', 'Kubernetes Orchestration', 'Multi-Cloud Architecture', 'Cost Optimization'],
      tech: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'Docker']
    },
    security: {
      title: 'Cybersecurity',
      desc: 'Comprehensive security solutions that protect your digital assets and ensure compliance. Defense-in-depth strategies powered by AI-driven threat detection and zero-trust principles.',
      caps: ['Zero-Trust Architecture', 'Penetration Testing', 'Security Operations (SOC)', 'Compliance & Audit', 'Incident Response', 'AI Threat Detection'],
      tech: ['Vault', 'SonarQube', 'Snyk', 'OWASP ZAP', 'Falco', 'Keycloak']
    },
    data: {
      title: 'Data & Analytics',
      desc: 'Transform raw data into actionable intelligence. Modern data platforms that enable real-time analytics, predictive modeling, and data-driven decision making at enterprise scale.',
      caps: ['Data Platform Design', 'Real-Time ETL Pipelines', 'Business Intelligence', 'Predictive Analytics', 'Data Governance', 'Data Lake Architecture'],
      tech: ['PostgreSQL', 'Kafka', 'Snowflake', 'Spark', 'Elasticsearch', 'dbt']
    },
    transformation: {
      title: 'Digital Transformation',
      desc: 'End-to-end digital strategy that aligns technology investments with business objectives. We guide organizations through comprehensive modernization journeys for the AI era.',
      caps: ['Digital Strategy', 'Technology Roadmapping', 'Process Automation', 'Change Management', 'Legacy Modernization', 'Innovation Programs'],
      tech: ['Agile', 'Design Thinking', 'Value Stream Mapping', 'OKRs', 'TOGAF', 'ArchiMate']
    },
    product: {
      title: 'Product Engineering',
      desc: 'End-to-end product development from concept to scale. We build products that users love, leveraging modern design systems, rapid prototyping, and iterative delivery.',
      caps: ['Product Strategy', 'UX/UI Design', 'MVP Development', 'Growth Engineering', 'Platform Architecture', 'Analytics & Optimization'],
      tech: ['React', 'Next.js', 'React Native', 'Figma', 'Amplitude', 'LaunchDarkly']
    },
    quality: {
      title: 'Quality Engineering',
      desc: 'Comprehensive quality assurance and testing automation that ensures reliability, performance, and security across your entire technology portfolio.',
      caps: ['Test Automation', 'Performance Testing', 'Security Testing', 'Mobile Testing', 'API Testing', 'CI/CD Quality Gates'],
      tech: ['Playwright', 'Cypress', 'k6', 'JMeter', 'Postman', 'Selenium']
    }
  };


  const serviceNavItems = document.querySelectorAll('.service-nav-item');
  const serviceTitle = document.getElementById('service-title');
  const serviceDesc = document.getElementById('service-desc');
  const serviceCaps = document.getElementById('service-caps');
  const serviceTech = document.getElementById('service-tech');

  if (serviceNavItems.length && serviceTitle) {
    serviceNavItems.forEach(item => {
      item.addEventListener('click', () => {
        const key = item.getAttribute('data-service');
        const data = serviceData[key];
        if (!data) return;

        // Update active state
        serviceNavItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        // Update content with smooth transition
        const panel = document.getElementById('service-panel');
        if (panel) {
          panel.style.opacity = '0';
          panel.style.transform = 'translateY(8px)';

          setTimeout(() => {
            serviceTitle.textContent = data.title;
            serviceDesc.textContent = data.desc;
            serviceCaps.innerHTML = data.caps.map(c =>
              `<div class="service-nav-cap">${c}</div>`
            ).join('');
            serviceTech.innerHTML = data.tech.map(t =>
              `<span class="tag">${t}</span>`
            ).join('');

            panel.style.opacity = '1';
            panel.style.transform = 'translateY(0)';
          }, 200);
        }
      });
    });
  }

  // ═══════════════════════════════════════════
  // TECHNOLOGY ECOSYSTEM TABS
  // ═══════════════════════════════════════════
  const techTabs = document.querySelectorAll('.tech-tab');
  const techPanels = document.querySelectorAll('.tech-panel');

  techTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tech');

      techTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      techPanels.forEach(panel => {
        panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
      });
    });
  });

  // ═══════════════════════════════════════════
  // ARCHITECTURE LAYERS
  // ═══════════════════════════════════════════
  const archLayers = document.querySelectorAll('.arch-layer');

  archLayers.forEach(layer => {
    layer.addEventListener('click', () => {
      archLayers.forEach(l => l.classList.remove('active'));
      layer.classList.add('active');
    });

    layer.addEventListener('mouseenter', () => {
      archLayers.forEach(l => l.classList.remove('active'));
      layer.classList.add('active');
    });
  });


  // ═══════════════════════════════════════════
  // AI FLOW STEPS
  // ═══════════════════════════════════════════
  const aiFlowSteps = document.querySelectorAll('.ai-flow-step');

  aiFlowSteps.forEach(step => {
    step.addEventListener('click', () => {
      aiFlowSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });

    step.addEventListener('mouseenter', () => {
      aiFlowSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });

  // ═══════════════════════════════════════════
  // INDUSTRY CARDS
  // ═══════════════════════════════════════════
  const industryCards = document.querySelectorAll('.industry-card');

  industryCards.forEach(card => {
    card.addEventListener('click', () => {
      industryCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // ═══════════════════════════════════════════
  // CONTACT FORM
  // ═══════════════════════════════════════════
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const formData = new FormData(contactForm);
      let valid = true;

      // Basic validation
      ['name', 'email', 'message'].forEach(field => {
        const input = contactForm.querySelector(`[name="${field}"]`);
        if (input && !formData.get(field)?.trim()) {
          valid = false;
          input.classList.add('error');
          input.addEventListener('input', () => input.classList.remove('error'), { once: true });
        }
      });

      // Email format check
      const emailInput = contactForm.querySelector('[name="email"]');
      if (emailInput) {
        const email = formData.get('email')?.trim();
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          valid = false;
          emailInput.classList.add('error');
        }
      }

      if (!valid) return;

      // Simulate submission
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending...';
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      contactForm.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
    });
  }


  // ═══════════════════════════════════════════
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ═══════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ═══════════════════════════════════════════
  // PAGE TRANSITION EFFECT
  // ═══════════════════════════════════════════
  // Add subtle fade-in on page load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // ═══════════════════════════════════════════
  // SERVICE NAV PANEL TRANSITION STYLE
  // ═══════════════════════════════════════════
  const servicePanel = document.getElementById('service-panel');
  if (servicePanel) {
    servicePanel.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
  }

  // ═══════════════════════════════════════════
  // ACTIVE NAV INDICATOR
  // ═══════════════════════════════════════════
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-item');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href.replace('../', '').replace('.html', ''))) {
      link.classList.add('active');
    }
  });

  // ═══════════════════════════════════════════
  // KEYBOARD ACCESSIBILITY — Tab trapping in modals
  // ═══════════════════════════════════════════
  function trapFocus(element) {
    const focusable = element.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    element.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // Trap focus in mobile nav when open
  if (mobileNav) {
    trapFocus(mobileNav);
  }

});
