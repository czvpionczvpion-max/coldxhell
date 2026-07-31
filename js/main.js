  let currentLang = localStorage.getItem('coldbet-lang') || 'pl';
  
  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('coldbet-lang', lang);
    
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    document.documentElement.lang = lang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
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
  
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.addEventListener('click', function() {
      setLanguage(this.dataset.lang);
    });
  });
  
  setLanguage(currentLang);
  
  // ============================================
  // SMOOTH SCROLL DLA "DOWIEDZ SIĘ WIĘCEJ"
  // ============================================
  
  document.querySelectorAll('.btn-scroll, .nav-links a, a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // ============================================
  // INTERSECTION OBSERVER
  // ============================================
  
  const revealElements = document.querySelectorAll('.section, .promo-grid, .benefits-grid, .steps-grid, .cta-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    observer.observe(el);
  });
  
  // ============================================
  // YEAR IN FOOTER
  // ============================================
  
  const yearSpan = document.querySelector('.footer-legal p:last-child');
  if (yearSpan) {
    yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', new Date().getFullYear());
  }
  
  console.log('🔥 HELLBOY x COLDBET loaded successfully!');
});