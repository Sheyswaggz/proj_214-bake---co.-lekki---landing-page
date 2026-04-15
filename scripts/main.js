document.addEventListener('DOMContentLoaded', function() {
  // ==========================================
  // SECTION 1 - PREFERS REDUCED MOTION CHECK
  // ==========================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================
  // SECTION 2 - SCROLL REVEAL WITH INTERSECTION OBSERVER
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  if (prefersReducedMotion) {
    // Skip animations for users who prefer reduced motion
    revealElements.forEach(function(element) {
      element.classList.add('active');
    });
  } else {
    // Set up Intersection Observer for scroll-triggered animations
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(observerCallback, observerOptions);

    revealElements.forEach(function(element) {
      revealObserver.observe(element);
    });
  }

  // ==========================================
  // SECTION 3 - SMOOTH SCROLL
  // ==========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');

      // Skip if href is just '#'
      if (href === '#') {
        return;
      }

      e.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const headerOffset = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  // ==========================================
  // SECTION 4 - MOBILE HAMBURGER MENU WITH OVERLAY
  // ==========================================
  const hamburger = document.querySelector('.nav__hamburger');
  const navMenu = document.querySelector('.nav__menu');

  if (hamburger && navMenu) {
    // Create overlay element dynamically
    const overlay = document.createElement('div');
    overlay.classList.add('nav__overlay');
    document.body.appendChild(overlay);

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      overlay.classList.toggle('active');

      const isExpanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close menu when nav link is clicked
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // ==========================================
  // SECTION 5 - HEADER SCROLL EFFECT (OPTIONAL ENHANCEMENT)
  // ==========================================
  let lastScroll = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.header');

    if (header) {
      if (currentScroll > 100) {
        header.style.boxShadow = 'var(--shadow-md)';
      } else {
        header.style.boxShadow = 'var(--shadow-sm)';
      }
    }

    lastScroll = currentScroll;
  }, { passive: true });
});
