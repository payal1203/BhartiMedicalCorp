/* ═══════════════════════════════════════════════════════════
   Bharti Medical Corporation — JavaScript
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── NAVBAR SCROLL ──────────────────────────────────────
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }

    // Active nav link highlight
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    document.querySelectorAll('.navbar__links > a').forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  });

  // Back to top
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── HAMBURGER / MOBILE MENU ────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // Mobile dropdown toggle
  document.querySelectorAll('.nav-dropdown > a').forEach(a => {
    a.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        a.closest('.nav-dropdown').classList.toggle('open');
      }
    });
  });

  // ── SMOOTH SCROLL for btn onclick ─────────────────────
  window.scrollTo_section = function (target) {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // All anchor links with hash — smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = link.getAttribute('href');
      if (target === '#') return;
      const el = document.querySelector(target);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── ANIMATED COUNTER ──────────────────────────────────
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = start.toLocaleString();
    }, 16);
  }

  const statsSection = document.getElementById('stats');
  let countersStarted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      document.querySelectorAll('.stat-item').forEach(item => {
        const target = parseInt(item.dataset.target, 10);
        const counter = item.querySelector('.counter');
        animateCounter(counter, target);
      });
    }
  }, { threshold: 0.3 });

  if (statsSection) statsObserver.observe(statsSection);

  // ── AOS (Animate On Scroll) ────────────────────────────
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  aosElements.forEach(el => aosObserver.observe(el));

  // ── TESTIMONIALS SLIDER ────────────────────────────────
  const track = document.getElementById('testimonialTrack');
  const dots   = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');
  let currentSlide = 0;
  let autoplay;

  function isMobile() { return window.innerWidth <= 768; }

  function goToSlide(idx) {
    if (isMobile()) return;
    const total = dots.length;
    currentSlide = (idx + total) % total;
    const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 24;
    track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoplay(); });
  dots.forEach(d => d.addEventListener('click', () => { goToSlide(parseInt(d.dataset.idx)); resetAutoplay(); }));

  function startAutoplay() {
    autoplay = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }
  function resetAutoplay() { clearInterval(autoplay); startAutoplay(); }
  startAutoplay();
  window.addEventListener('resize', () => { if (isMobile()) track.style.transform = ''; });

  // ── CONTACT FORM ───────────────────────────────────────
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

      // Simulate API call
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
        success.classList.add('show');
        form.reset();
        setTimeout(() => success.classList.remove('show'), 5000);
      }, 1500);
    });

    // Real-time validation
    form.querySelectorAll('input[required], select[required]').forEach(input => {
      input.addEventListener('blur', () => {
        if (!input.value.trim()) {
          input.style.borderColor = '#ef4444';
        } else {
          input.style.borderColor = '';
        }
      });
      input.addEventListener('input', () => {
        if (input.value.trim()) input.style.borderColor = '';
      });
    });
  }

  // ── CATEGORY CARD HOVER EFFECT ─────────────────────────
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const link = card.querySelector('.cat-link');
        if (link) link.click();
      }
    });
  });

})();
