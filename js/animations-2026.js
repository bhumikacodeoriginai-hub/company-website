/**
 * Code Origin.AI — 2026 Animation Engine
 * Smooth scroll reveals, custom cursor, parallax layers,
 * counter animations, magnetic buttons, tilt cards, scroll progress
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ═══════════════════════════════════════════
  // SCROLL PROGRESS BAR
  // ═══════════════════════════════════════════
  const progressBar = document.createElement('div');
  progressBar.classList.add('scroll-progress');
  document.body.prepend(progressBar);

  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ═══════════════════════════════════════════
  // CUSTOM CURSOR — Glow & Dot
  // ═══════════════════════════════════════════
  const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

  if (!isMobile) {
    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    let cursorX = 0, cursorY = 0;
    let glowX = 0, glowY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorGlow.classList.add('active');
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursorGlow.classList.remove('active');
    });

    // Smooth follow animation
    function animateCursor() {
      glowX += (cursorX - glowX) * 0.08;
      glowY += (cursorY - glowY) * 0.08;
      dotX += (cursorX - dotX) * 0.2;
      dotY += (cursorY - dotY) * 0.2;

      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover state on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .glass, .glass-v2, .impact-card, .glass-card-animated, .service-nav-item, .tech-tab, .arch-layer, .ai-flow-step, .industry-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorDot.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorDot.classList.remove('hovering'));
    });
  }

  // ═══════════════════════════════════════════
  // ENHANCED SCROLL REVEAL — IntersectionObserver
  // ═══════════════════════════════════════════
  const revealSelectors = '.reveal, .reveal-scale, .reveal-left, .reveal-right, .reveal-blur, .stagger-children, .scroll-fade-in, .scroll-scale-in, .scroll-slide-up';
  const revealElements = document.querySelectorAll(revealSelectors);

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Only unobserve if not a scroll-driven animation
          if (!entry.target.classList.contains('scroll-fade-in') &&
              !entry.target.classList.contains('scroll-scale-in') &&
              !entry.target.classList.contains('scroll-slide-up')) {
            revealObserver.unobserve(entry.target);
          }
        }
      });
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // ═══════════════════════════════════════════
  // PARALLAX LAYERS — Multi-depth scroll
  // ═══════════════════════════════════════════
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
      const rect = el.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const viewCenter = window.innerHeight / 2;
      const offset = (centerY - viewCenter) * speed;
      
      el.style.transform = `translateY(${offset}px)`;
    });
    
    ticking = false;
  }

  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════
  // COUNTER ANIMATION — Animated numbers
  // ═══════════════════════════════════════════
  const counters = document.querySelectorAll('[data-count]');

  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const start = Date.now();

    function update() {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }
    update();
  }

  // ═══════════════════════════════════════════
  // MAGNETIC BUTTONS — Attract to cursor
  // ═══════════════════════════════════════════
  if (!isMobile) {
    const magneticBtns = document.querySelectorAll('.btn-magnetic, .btn-primary');

    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const strength = 0.3;

        btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ═══════════════════════════════════════════
  // TILT CARDS — 3D perspective on hover
  // ═══════════════════════════════════════════
  if (!isMobile) {
    const tiltCards = document.querySelectorAll('.tilt-card, .impact-card, .glass-card-animated');

    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
        card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }

  // ═══════════════════════════════════════════
  // SMOOTH SECTION TRANSITIONS
  // ═══════════════════════════════════════════
  const sections = document.querySelectorAll('.section, .video-showcase, .capability-band');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    sections.forEach(s => sectionObserver.observe(s));
  }

  // ═══════════════════════════════════════════
  // TEXT SPLIT ANIMATION — Character by character
  // ═══════════════════════════════════════════
  const splitTexts = document.querySelectorAll('.split-text');

  splitTexts.forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    el.setAttribute('aria-label', text);

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = (i * 30) + 'ms';
      span.classList.add('split-char');
      el.appendChild(span);
    });
  });

  // ═══════════════════════════════════════════
  // SMOOTH SCROLL SPEED — Lenis-like effect
  // ═══════════════════════════════════════════
  // Light smooth scroll with momentum
  let currentScroll = window.scrollY;
  let targetScroll = window.scrollY;
  let scrolling = false;

  // Only add smooth momentum on desktop
  if (!isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Add smooth transitions to page elements during scroll
    let lastScrollY = 0;
    let scrollDirection = 0;

    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      scrollDirection = currentY > lastScrollY ? 1 : -1;
      lastScrollY = currentY;

      // Subtle header shadow based on scroll speed
      const header = document.querySelector('.header');
      if (header) {
        const speed = Math.abs(currentY - lastScrollY);
        if (currentY > 100) {
          header.style.boxShadow = `0 4px ${20 + speed}px rgba(0,0,0,${0.3 + speed * 0.01})`;
        } else {
          header.style.boxShadow = '';
        }
      }
    }, { passive: true });
  }

  // ═══════════════════════════════════════════
  // PARTICLE GENERATOR — For sections with .particles-bg
  // ═══════════════════════════════════════════
  const particleBgs = document.querySelectorAll('.particles-bg');
  
  particleBgs.forEach(container => {
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = -(Math.random() * 8) + 's';
      particle.style.animationDuration = (6 + Math.random() * 4) + 's';
      container.appendChild(particle);
    }
  });

  // ═══════════════════════════════════════════
  // HOVER GLOW EFFECT — Cards follow cursor
  // ═══════════════════════════════════════════
  if (!isMobile) {
    const glowCards = document.querySelectorAll('.glass, .glass-sm, .glass-v2, .impact-card');

    glowCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--glow-x', x + 'px');
        card.style.setProperty('--glow-y', y + 'px');
        card.style.background = `radial-gradient(circle 150px at ${x}px ${y}px, rgba(212,164,24,0.06), transparent), var(--glass-v2-bg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.background = '';
      });
    });
  }

  // ═══════════════════════════════════════════
  // PAGE LOAD ANIMATION
  // ═══════════════════════════════════════════
  document.body.classList.add('loaded');

  // Animate hero content in sequence
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1)';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }

  // ═══════════════════════════════════════════
  // INTERSECTION-BASED BACKGROUND CHANGES
  // ═══════════════════════════════════════════
  const colorSections = document.querySelectorAll('[data-bg-shift]');
  
  if (colorSections.length > 0 && 'IntersectionObserver' in window) {
    const bgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const shift = entry.target.getAttribute('data-bg-shift');
          document.body.style.setProperty('--section-bg', shift);
        }
      });
    }, { threshold: 0.3 });

    colorSections.forEach(s => bgObserver.observe(s));
  }

});
