/* ═══════════════════════════════════════════════════════════════
   APP.JS — Main Application Logic
   Navigation, scroll animations, FAQ, guide cards
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initCounterAnimation();
  initFAQ();
  initGuideCards();
  initHeroButtons();
});

// ─── Navbar ─────────────────────────────────────────────────────
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveLink();
  });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
}

function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ─── Scroll Reveal Animations ───────────────────────────────────
function initScrollAnimations() {
  // Add reveal class to elements
  const revealTargets = document.querySelectorAll(
    '.section-header, .guide-card, .faq-item, .quiz-container, .stat'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(el => observer.observe(el));
}

// ─── Counter Animation ─────────────────────────────────────────
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const target = parseInt(element.dataset.target);
  const duration = 2000;
  const stepTime = 20;
  const steps = duration / stepTime;
  const increment = target / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, stepTime);
}

// ─── FAQ Accordion ──────────────────────────────────────────────
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(faq => {
        faq.classList.remove('open');
        faq.querySelector('.faq-answer').style.maxHeight = null;
      });

      // Open clicked (if it was closed)
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// ─── Guide Cards Expand ─────────────────────────────────────────
function initGuideCards() {
  const cards = document.querySelectorAll('.guide-card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');

      // Close all cards
      cards.forEach(c => c.classList.remove('expanded'));

      // Toggle clicked
      if (!isExpanded) {
        card.classList.add('expanded');
      }
    });
  });
}

// ─── Hero Buttons ───────────────────────────────────────────────
function initHeroButtons() {
  const askBtn = document.getElementById('heroAskBtn');
  if (askBtn) {
    askBtn.addEventListener('click', () => {
      // Open chat widget
      const chatWidget = document.getElementById('chatWidget');
      if (chatWidget) {
        chatWidget.classList.add('open');
      }
    });
  }
}
