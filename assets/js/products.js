/* ═══════════════════════════════════════════════════════════
   Bharti Medical Corporation — Products Page JS
   ═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── FILTER TABS ────────────────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const sections   = document.querySelectorAll('.prod-section');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      sections.forEach(section => {
        if (filter === 'all') {
          section.classList.remove('hidden');
        } else {
          const match = section.dataset.section === filter;
          section.classList.toggle('hidden', !match);
        }
      });

      // Scroll to top of products area smoothly
      document.querySelector('.products-page').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── ANCHOR FILTER (from dropdown nav links) ────────────
  // e.g. products.html#ventilators should auto-filter
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const matchBtn = document.querySelector(`.filter-btn[data-filter="${hash}"]`);
    if (matchBtn) matchBtn.click();
  }

  // ── HAMBURGER (reuse from main.js) ────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  // ── BACK TO TOP ────────────────────────────────────────
  const backToTop = document.getElementById('backToTop');
  const navbar    = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 300);
    if (navbar)    navbar.classList.toggle('scrolled',   window.scrollY > 60);
  });

  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

})();
