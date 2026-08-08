'use strict';
document.addEventListener('DOMContentLoaded', function () {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header scroll
  const header = document.querySelector('.header');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { if(header) header.classList.toggle('scrolled', scrollY > 40); ticking = false; }); ticking = true; }
  }, {passive:true});

  // Reveal
  const els = document.querySelectorAll('.reveal');
  if (els.length && !reducedMotion) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('active');obs.unobserve(e.target);} });
    }, {threshold:0.08, rootMargin:'0px 0px -50px 0px'});
    els.forEach(el => obs.observe(el));
  } else { els.forEach(el => el.classList.add('active')); }

  // Counters
  document.querySelectorAll('[data-count]').forEach(el => {
    if (reducedMotion) { el.textContent = el.dataset.count + (el.dataset.suffix||''); return; }
    const io = new IntersectionObserver(ent => {
      if (ent[0].isIntersecting) {
        const end = +el.dataset.count, suf = el.dataset.suffix||'', dur = 1800, start = performance.now();
        (function up(now) {
          const p = Math.min((now-start)/dur, 1);
          el.textContent = Math.floor((1-Math.pow(1-p,3))*end) + suf;
          if (p<1) requestAnimationFrame(up);
        })(start);
        io.unobserve(el);
      }
    }, {threshold:0.5});
    io.observe(el);
  });

  // Mobile menu
  const mb = document.querySelector('.menu-btn'), mn = document.querySelector('.mobile-nav');
  if (mb && mn) {
    mb.addEventListener('click', () => {
      const open = mb.classList.toggle('active');
      mn.classList.toggle('active');
      mb.setAttribute('aria-expanded', open);
      mn.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mn.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', e => { if(e.key==='Escape' && mn.classList.contains('active')){close();mb.focus();} });
    function close(){mb.classList.remove('active');mn.classList.remove('active');mb.setAttribute('aria-expanded','false');mn.setAttribute('aria-hidden','true');document.body.style.overflow='';}
  }

  // Form
  const form = document.getElementById('contact-form');
  if (form) {
    const btn = form.querySelector('button[type=submit]');
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.querySelectorAll('.error').forEach(el=>el.classList.remove('error'));
      form.querySelectorAll('.has-error').forEach(el=>el.classList.remove('has-error'));
      let ok = true;
      [{n:'name',t:'text'},{n:'email',t:'email'},{n:'message',t:'text'}].forEach(f => {
        const i=form.querySelector('[name="'+f.n+'"]'); if(!i)return;
        const v=i.value.trim(), g=i.closest('.form-group');
        if(!v||(f.t==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))){ok=false;i.classList.add('error');if(g)g.classList.add('has-error');}
      });
      if(!ok){const fe=form.querySelector('.error');if(fe)fe.focus();return;}
      btn.disabled=true;btn.textContent='Sending...';
      setTimeout(()=>{form.style.display='none';const s=document.getElementById('form-success');if(s)s.style.display='block';btn.disabled=false;btn.textContent='Send Message';},1300);
    });
    form.addEventListener('input', e => { e.target.classList.remove('error'); const g=e.target.closest('.form-group');if(g)g.classList.remove('has-error'); });
  }
});
