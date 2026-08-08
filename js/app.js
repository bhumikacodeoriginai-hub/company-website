'use strict';
document.addEventListener('DOMContentLoaded',()=>{
  // Header scroll
  const header=document.querySelector('.header');
  window.addEventListener('scroll',()=>header&&header.classList.toggle('scrolled',scrollY>50),{passive:true});

  // Reveal on scroll
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('active');obs.unobserve(e.target)}});
  },{threshold:.1,rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

  // Mobile menu
  const mb=document.querySelector('.menu-btn'),mn=document.querySelector('.mobile-nav');
  if(mb&&mn){
    mb.addEventListener('click',()=>{mb.classList.toggle('active');mn.classList.toggle('active');document.body.style.overflow=mn.classList.contains('active')?'hidden':''});
    mn.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mb.classList.remove('active');mn.classList.remove('active');document.body.style.overflow=''}));
  }

  // Counter
  document.querySelectorAll('[data-count]').forEach(el=>{
    const io=new IntersectionObserver(ent=>{
      if(ent[0].isIntersecting){
        const end=+el.dataset.count,suf=el.dataset.suffix||'',dur=2000,start=performance.now();
        (function up(now){
          const p=Math.min((now-start)/dur,1),v=Math.floor((1-Math.pow(1-p,3))*end);
          el.textContent=v+suf;
          if(p<1)requestAnimationFrame(up);
        })(start);
        io.unobserve(el);
      }
    });io.observe(el);
  });

  // Contact form
  const form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const btn=form.querySelector('button[type=submit]');
      const fd=new FormData(form);
      let valid=true;
      ['name','email','message'].forEach(f=>{if(!fd.get(f)?.trim()){valid=false;const el=form.querySelector('[name='+f+']');el&&el.classList.add('error')}});
      if(!valid)return;
      btn.disabled=true;btn.textContent='Sending...';
      await new Promise(r=>setTimeout(r,1500));
      form.style.display='none';
      document.getElementById('form-success').style.display='block';
    });
  }
});
