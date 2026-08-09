/**
 * Code Origin.AI — 2026 Innovative Features
 * Typing animation, AI Chat Widget, Loading Screen,
 * Spotlight cursor, Light trails on scroll, 2D/3D Mode Toggle
 */
'use strict';

document.addEventListener('DOMContentLoaded', function() {

  // ═══════════════════════════════════════════
  // 2D / 3D MODE TOGGLE
  // ═══════════════════════════════════════════
  var modeToggle = document.getElementById('mode-toggle');
  
  if (modeToggle) {
    // Check saved preference
    var savedMode = localStorage.getItem('codeorigin-view-mode');
    var is3D = savedMode !== '2d'; // Default to 3D

    // Create transition overlay
    var overlay = document.createElement('div');
    overlay.classList.add('mode-transition-overlay');
    document.body.appendChild(overlay);

    function updateModeUI() {
      if (is3D) {
        document.body.classList.remove('mode-2d');
        modeToggle.setAttribute('aria-checked', 'true');
        modeToggle.querySelector('.mode-label-3d').classList.add('active');
        modeToggle.querySelector('.mode-label-2d').classList.remove('active');
      } else {
        document.body.classList.add('mode-2d');
        modeToggle.setAttribute('aria-checked', 'false');
        modeToggle.querySelector('.mode-label-2d').classList.add('active');
        modeToggle.querySelector('.mode-label-3d').classList.remove('active');
      }
      localStorage.setItem('codeorigin-view-mode', is3D ? '3d' : '2d');
    }

    function toggleMode() {
      is3D = !is3D;
      // Flash transition
      overlay.classList.add('active');
      setTimeout(function() {
        updateModeUI();
        setTimeout(function() { overlay.classList.remove('active'); }, 300);
      }, 200);
    }

    // Apply saved mode on load (no animation)
    updateModeUI();

    // Click handler
    modeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      toggleMode();
    });

    // Keyboard support
    modeToggle.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMode();
      }
    });
  }

  // ═══════════════════════════════════════════
  // PAGE LOADING SCREEN
  // ═══════════════════════════════════════════
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 600);
      }, 800);
    });
    // Fallback: hide after 3s max
    setTimeout(() => {
      if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
      }
    }, 3000);
  }

  // ═══════════════════════════════════════════
  // HERO TYPING ANIMATION — Rotating words
  // ═══════════════════════════════════════════
  const typingTarget = document.getElementById('typing-target');
  if (typingTarget) {
    const words = ['Comes Next.', 'Matters Most.', 'Scales Forever.', 'Drives Growth.', 'Changes Everything.'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTimer = null;

    function typeStep() {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        // Typing forward
        charIndex++;
        typingTarget.textContent = currentWord.substring(0, charIndex);

        if (charIndex === currentWord.length) {
          // Pause at full word
          typingTarget.classList.remove('no-caret');
          pauseTimer = setTimeout(() => {
            isDeleting = true;
            typeStep();
          }, 2500);
          return;
        }
        setTimeout(typeStep, 80 + Math.random() * 40);
      } else {
        // Deleting
        charIndex--;
        typingTarget.textContent = currentWord.substring(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(typeStep, 400);
          return;
        }
        setTimeout(typeStep, 40);
      }
    }

    // Start after initial load
    setTimeout(() => {
      typingTarget.textContent = '';
      typeStep();
    }, 1500);
  }

  // ═══════════════════════════════════════════
  // SPOTLIGHT CURSOR EFFECT ON SECTIONS
  // ═══════════════════════════════════════════
  const spotlightSections = document.querySelectorAll('.spotlight-section');

  if (spotlightSections.length > 0 && window.innerWidth > 768) {
    spotlightSections.forEach(section => {
      section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        section.style.setProperty('--spotlight-x', x + 'px');
        section.style.setProperty('--spotlight-y', y + 'px');
      });
    });
  }

  // ═══════════════════════════════════════════
  // LIGHT TRAILS ON SCROLL
  // ═══════════════════════════════════════════
  const trailContainer = document.getElementById('light-trails');
  let lastScrollY = window.scrollY;
  let trailTimeout = null;

  if (trailContainer && window.innerWidth > 768) {
    const trails = [];
    for (let i = 0; i < 3; i++) {
      const trail = document.createElement('div');
      trail.classList.add('light-trail');
      trail.style.left = (20 + i * 30) + '%';
      trailContainer.appendChild(trail);
      trails.push(trail);
    }

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const speed = Math.abs(scrollY - lastScrollY);

      if (speed > 8) {
        trails.forEach((trail, i) => {
          trail.style.top = (scrollY + window.innerHeight * 0.3 + i * 60) + 'px';
          trail.style.height = Math.min(speed * 3, 120) + 'px';
          trail.classList.remove('active');
          void trail.offsetWidth; // force reflow
          trail.classList.add('active');
        });
      }

      lastScrollY = scrollY;
    }, { passive: true });
  }

  // ═══════════════════════════════════════════
  // AI CHAT WIDGET
  // ═══════════════════════════════════════════
  const chatFab = document.getElementById('ai-chat-fab');
  const chatWindow = document.getElementById('ai-chat-window');
  const chatBody = document.getElementById('ai-chat-body');
  const chatInput = document.getElementById('ai-chat-input');
  const chatSend = document.getElementById('ai-chat-send');
  const chatSuggestions = document.getElementById('ai-chat-suggestions');

  if (chatFab && chatWindow) {
    // Toggle chat
    chatFab.addEventListener('click', () => {
      const isOpen = chatWindow.classList.toggle('open');
      chatFab.classList.toggle('open');
      chatWindow.setAttribute('aria-hidden', !isOpen);
      if (isOpen && chatInput) chatInput.focus();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatWindow.classList.contains('open')) {
        chatWindow.classList.remove('open');
        chatFab.classList.remove('open');
        chatWindow.setAttribute('aria-hidden', 'true');
      }
    });

    // AI responses based on keywords
    const aiResponses = {
      'ai services': 'We offer comprehensive AI & ML services including custom model development, LLM fine-tuning, RAG systems, AI agents, computer vision, and MLOps. Our team has deployed 40+ production AI models for enterprise clients.',
      'industries': 'We serve Financial Services, Healthcare, Manufacturing, Retail, Logistics, Real Estate, Technology, and Professional Services. Each with deep domain expertise and tailored solutions.',
      'project': 'I\'d love to help you get started! You can reach our experts directly at the Contact page, or I can tell you more about our process. We typically begin with a Discovery phase to understand your unique challenges.',
      'tech stack': 'Our stack includes PyTorch, TensorFlow, LangChain for AI; React, Next.js, Vue for frontend; Go, Python, Rust for backend; AWS, Azure, GCP with Kubernetes for cloud; and PostgreSQL, Kafka, Redis for data.',
      'pricing': 'Our pricing is project-based and depends on scope, complexity, and timeline. We offer flexible engagement models — from dedicated teams to fixed-scope projects. Let\'s discuss your needs on a call!',
      'default': 'Thanks for your question! Our team would be happy to discuss this in detail. You can reach us through the Contact page, or ask me about our AI services, industries, tech stack, or how to start a project.'
    };

    function getAIResponse(userMsg) {
      const msg = userMsg.toLowerCase();
      if (msg.includes('ai') || msg.includes('machine learning') || msg.includes('ml')) return aiResponses['ai services'];
      if (msg.includes('industr') || msg.includes('sector') || msg.includes('healthcare') || msg.includes('finance')) return aiResponses['industries'];
      if (msg.includes('project') || msg.includes('start') || msg.includes('work together') || msg.includes('hire')) return aiResponses['project'];
      if (msg.includes('tech') || msg.includes('stack') || msg.includes('tools') || msg.includes('framework')) return aiResponses['tech stack'];
      if (msg.includes('pric') || msg.includes('cost') || msg.includes('budget') || msg.includes('rate')) return aiResponses['pricing'];
      return aiResponses['default'];
    }

    function addMessage(text, type) {
      const msg = document.createElement('div');
      msg.classList.add('ai-chat-msg', type);
      msg.textContent = text;
      chatBody.appendChild(msg);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showTyping() {
      const typing = document.createElement('div');
      typing.classList.add('ai-chat-msg', 'bot', 'typing');
      typing.id = 'chat-typing';
      typing.innerHTML = '<span></span><span></span><span></span>';
      chatBody.appendChild(typing);
      chatBody.scrollTop = chatBody.scrollHeight;
    }

    function removeTyping() {
      const typing = document.getElementById('chat-typing');
      if (typing) typing.remove();
    }

    function handleUserMessage(text) {
      if (!text.trim()) return;

      // Remove suggestions after first message
      if (chatSuggestions) chatSuggestions.remove();

      // Add user message
      addMessage(text, 'user');
      if (chatInput) chatInput.value = '';

      // Show typing indicator
      showTyping();

      // Simulate AI response delay
      setTimeout(() => {
        removeTyping();
        const response = getAIResponse(text);
        addMessage(response, 'bot');
      }, 1000 + Math.random() * 800);
    }

    // Send button
    if (chatSend) {
      chatSend.addEventListener('click', () => {
        handleUserMessage(chatInput.value);
      });
    }

    // Enter key
    if (chatInput) {
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleUserMessage(chatInput.value);
        }
      });
    }

    // Suggestion buttons
    if (chatSuggestions) {
      chatSuggestions.addEventListener('click', (e) => {
        const btn = e.target.closest('.ai-chat-suggestion');
        if (btn) {
          const msg = btn.getAttribute('data-msg');
          handleUserMessage(msg);
        }
      });
    }
  }

});
