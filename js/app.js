'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

  // Header scroll
  const header = document.querySelector('.header');
  let tick = false;
  window.addEventListener('scroll', function () {
    if (!tick) { requestAnimationFrame(function () { if (header) header.classList.toggle('scrolled', scrollY > 30); tick = false; }); tick = true; }
  }, { passive: true });

  // Reveal
  const els = document.querySelectorAll('.reveal');
  if (els.length && !reduced) {
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('active'); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { obs.observe(el); });
  } else { els.forEach(function (el) { el.classList.add('active'); }); }

  // Mobile menu
  const mb = document.querySelector('.menu-btn'), mn = document.querySelector('.mobile-nav');
  if (mb && mn) {
    mb.addEventListener('click', function () {
      const open = mb.classList.toggle('active');
      mn.classList.toggle('active');
      mb.setAttribute('aria-expanded', String(open));
      mn.setAttribute('aria-hidden', String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mn.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && mn.classList.contains('active')) { closeMenu(); mb.focus(); } });
    function closeMenu() { mb.classList.remove('active'); mn.classList.remove('active'); mb.setAttribute('aria-expanded', 'false'); mn.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  }

  // Contact form (Web3Forms)
  const form = document.getElementById('contact-form');
  if (form) {
    const btn = form.querySelector('button[type=submit]');
    const successEl = document.getElementById('form-success');
    const errorEl = document.getElementById('form-error');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      // Clear errors
      form.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
      form.querySelectorAll('.has-error').forEach(function (el) { el.classList.remove('has-error'); });
      if (errorEl) errorEl.style.display = 'none';

      // Validate
      let valid = true;
      [{ n: 'name', t: 'text' }, { n: 'email', t: 'email' }, { n: 'message', t: 'text' }].forEach(function (f) {
        const inp = form.querySelector('[name="' + f.n + '"]');
        if (!inp) return;
        const val = inp.value.trim();
        const grp = inp.closest('.form-group');
        if (!val || (f.t === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))) {
          valid = false; inp.classList.add('error'); if (grp) grp.classList.add('has-error');
        }
      });
      if (!valid) { var fe = form.querySelector('.error'); if (fe) fe.focus(); return; }

      // Submit to Web3Forms
      btn.disabled = true; btn.textContent = 'Sending...';
      try {
        const data = new FormData(form);
        data.append('access_key', 'YOUR_WEB3FORMS_KEY'); // Replace with real key
        data.append('subject', 'New inquiry from Code Origin.AI website');
        data.append('from_name', 'Code Origin.AI Website');

        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
        const json = await res.json();

        if (json.success) {
          form.style.display = 'none';
          if (successEl) successEl.style.display = 'block';
        } else {
          if (errorEl) errorEl.style.display = 'block';
        }
      } catch (err) {
        if (errorEl) errorEl.style.display = 'block';
      }
      btn.disabled = false; btn.textContent = 'Send Message';
    });

    // Real-time clear
    form.addEventListener('input', function (e) {
      e.target.classList.remove('error');
      var g = e.target.closest('.form-group'); if (g) g.classList.remove('has-error');
    });
  }

  // Counter (for verified numbers only)
  document.querySelectorAll('[data-count]').forEach(function (el) {
    if (reduced) { el.textContent = el.dataset.count + (el.dataset.suffix || ''); return; }
    var io = new IntersectionObserver(function (ent) {
      if (ent[0].isIntersecting) {
        var end = +el.dataset.count, suf = el.dataset.suffix || '', dur = 1600, start = performance.now();
        (function up(now) { var p = Math.min((now - start) / dur, 1); el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * end) + suf; if (p < 1) requestAnimationFrame(up); })(start);
        io.unobserve(el);
      }
    }, { threshold: 0.5 });
    io.observe(el);
  });
});
