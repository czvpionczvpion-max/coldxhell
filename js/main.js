document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  let currentLang = localStorage.getItem('coldbet-lang') || 'pl';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('coldbet-lang', lang);
    document.documentElement.lang = lang;

    document.querySelectorAll('.lang-toggle button').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const translation = translations[lang]?.[key];
      if (translation !== undefined) {
        if (translation.includes('<')) {
          el.innerHTML = translation;
        } else {
          el.textContent = translation;
        }
      }
    });
  }

  document.querySelectorAll('.lang-toggle button').forEach((btn) => {
    btn.addEventListener('click', function () {
      setLanguage(this.dataset.lang);
    });
  });

  setLanguage(currentLang);

  /* Smooth scroll */
  document.querySelectorAll('.btn-scroll, .nav-links a, a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
          const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  /* Scroll reveal with stagger */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');

        entry.target.querySelectorAll('.reveal-stagger').forEach((child, i) => {
          child.style.transitionDelay = `${i * 70}ms`;
          child.classList.add('is-visible');
        });

        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  document.querySelectorAll('.reveal-stagger').forEach((el) => {
    if (!el.closest('.reveal')) {
      revealObserver.observe(el);
    }
  });

  /* Nav shadow on scroll */
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 12);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Footer year */
  const yearSpan = document.querySelector('.footer-legal p:last-child');
  if (yearSpan) {
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', new Date().getFullYear());
  }
});
