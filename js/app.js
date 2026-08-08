/**
 * Code Origin.AI — Application Script
 * Minimal, professional. Handles: header scroll, reveal, mobile nav, form validation.
 * No animated counters, no staggered delays, no excessive effects.
 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ═══ HEADER SCROLL ═══
  var header = document.querySelector('.header');
  var ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (header) header.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ═══ REVEAL ON SCROLL ═══
  var reveals = document.querySelectorAll('.reveal');

  if (reveals.length > 0 && !prefersReducedMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('active'); });
  }

  // ═══ MOBILE MENU ═══
  var menuBtn = document.querySelector('.menu-btn');
  var mobileNav = document.querySelector('.mobile-nav');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', function () {
      var isOpen = menuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
        closeMenu();
        menuBtn.focus();
      }
    });

    function closeMenu() {
      menuBtn.classList.remove('active');
      mobileNav.classList.remove('active');
      menuBtn.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  // ═══ CONTACT FORM ═══
  var form = document.getElementById('contact-form');

  if (form) {
    var submitBtn = form.querySelector('button[type="submit"]');
    var successEl = document.getElementById('form-success');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();

      var valid = true;
      valid = validateField('name', 'text') && valid;
      valid = validateField('email', 'email') && valid;
      valid = validateField('message', 'text') && valid;

      if (!valid) {
        var first = form.querySelector('.error');
        if (first) first.focus();
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Simulate submission (replace with real API call)
      setTimeout(function () {
        form.style.display = 'none';
        if (successEl) successEl.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }, 1200);
    });

    // Clear error on input
    form.addEventListener('input', function (e) {
      var el = e.target;
      el.classList.remove('error');
      var group = el.closest('.form-group');
      if (group) group.classList.remove('has-error');
    });

    function validateField(name, type) {
      var input = form.querySelector('[name="' + name + '"]');
      if (!input) return true;
      var val = input.value.trim();
      var group = input.closest('.form-group');

      if (!val) {
        input.classList.add('error');
        if (group) group.classList.add('has-error');
        return false;
      }
      if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        input.classList.add('error');
        if (group) group.classList.add('has-error');
        return false;
      }
      return true;
    }

    function clearErrors() {
      form.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
      form.querySelectorAll('.has-error').forEach(function (el) { el.classList.remove('has-error'); });
    }
  }

});
