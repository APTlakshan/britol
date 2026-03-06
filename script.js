/* ============================================
   BRITOL GROUP — Website Interactivity
   ============================================ */

// ── Preloader Control ───────────────────
let preloaderShown = false;
let pageReady = false;
const MIN_PRELOADER_TIME = 3000; // 3 seconds minimum
const preloaderStartTime = Date.now();

function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      if (preloader.parentElement) {
        preloader.remove();
      }
    }, 600);
    preloaderShown = true;
  }
}

function checkPreloaderExit() {
  if (!pageReady) return;
  
  const elapsedTime = Date.now() - preloaderStartTime;
  const remainingTime = Math.max(0, MIN_PRELOADER_TIME - elapsedTime);
  
  if (remainingTime > 0) {
    // Wait for minimum time to pass
    setTimeout(hidePreloader, remainingTime);
  } else {
    // Minimum time already passed
    hidePreloader();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  pageReady = true;
  checkPreloaderExit();
  
  // Ensure preloader is hidden after absolute max time (5s) even if something goes wrong
  setTimeout(() => {
    if (!preloaderShown) {
      hidePreloader();
    }
  }, 5000);

  // ── Navbar Scroll Effect ────────────────
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top visibility
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ── Hamburger Menu ──────────────────────
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navAnchors = document.querySelectorAll('.nav-links a');

  // Create overlay for mobile nav
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMenu() {
    hamburger.classList.add('active');
    navLinks.classList.add('open');
    navOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  hamburger.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay.addEventListener('click', closeMenu);

  navAnchors.forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // ── Active Nav Link on Scroll ───────────
  const sections = document.querySelectorAll('section[id]');

  function setActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }
  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  // ── Scroll Animations (Intersection Observer) ──
  const animateElements = document.querySelectorAll(
    '.service-card, .gallery-item, .about-image, .about-content, .contact-info, .contact-form-wrapper'
  );

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
        const siblingIndex = siblings.indexOf(el);
        // Reduce stagger delay on mobile for faster animations
        const delay = window.innerWidth < 768 ? siblingIndex * 30 : siblingIndex * 100;

        setTimeout(() => {
          el.classList.add('animate-in');
        }, delay);

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // ── Testimonials Carousel ───────────────
  const track = document.querySelector('.testimonials-track');
  const dots = document.querySelectorAll('.testimonials-dots .dot');
  let currentSlide = 0;
  const totalSlides = dots.length;
  let autoRotateInterval;

  function goToSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => goToSlide(i));
  });

  // Auto-rotate every 5 seconds (skip on mobile for performance)
  function startAutoRotate() {
    if (window.innerWidth > 768) {
      autoRotateInterval = setInterval(() => {
        goToSlide((currentSlide + 1) % totalSlides);
      }, 5000);
    }
  }
  
  startAutoRotate();
  
  // Adjust on resize
  window.addEventListener('resize', () => {
    clearInterval(autoRotateInterval);
    startAutoRotate();
  });

  // ── Hero Particles ─────────────────────
  const particlesContainer = document.querySelector('.hero-particles');
  if (particlesContainer) {
    for (let i = 0; i < 10; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (Math.random() * 8 + 6) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';
      p.style.width = (Math.random() * 6 + 3) + 'px';
      p.style.height = p.style.width;
      particlesContainer.appendChild(p);
    }
  }

  // ── Counter Animation ──────────────────
  const counterEl = document.querySelector('.experience-badge .number');
  if (counterEl) {
    let counted = false;
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !counted) {
        counted = true;
        const target = parseInt(counterEl.getAttribute('data-count'));
        let current = 0;
        const increment = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counterEl.textContent = current + '+';
        }, 40);
        counterObserver.unobserve(counterEl);
      }
    }, { threshold: 0.5 });
    counterObserver.observe(counterEl);
  }

  // ── Quote Form Validation ──────────────
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = quoteForm.querySelector('#quoteName').value.trim();
      const email = quoteForm.querySelector('#quoteEmail').value.trim();
      const phone = quoteForm.querySelector('#quotePhone').value.trim();

      if (!name || !email || !phone) {
        showNotification('Please fill in all required fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      showNotification('Thank you! We\'ll get back to you within 24 hours. 🎉', 'success');
      quoteForm.reset();
    });
  }

  // ── Mailing List Form ──────────────────
  const mailingForm = document.getElementById('mailingForm');
  if (mailingForm) {
    mailingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = mailingForm.querySelector('input[type="email"]').value.trim();

      if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }

      showNotification('You\'re subscribed! Welcome aboard. 🌿', 'success');
      mailingForm.reset();
    });
  }

  // ── Utilities ──────────────────────────
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <span>${message}</span>
      <button onclick="this.parentElement.remove()">✕</button>
    `;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 16px 24px;
      border-radius: 14px;
      font-family: 'Inter', sans-serif;
      font-size: .92rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 16px;
      z-index: 9999;
      animation: fadeInDown .4s ease;
      box-shadow: 0 8px 30px rgba(0,0,0,.15);
      background: ${type === 'success' ? '#33acdc' : '#e74c3c'};
      color: white;
    `;

    const btn = notification.querySelector('button');
    btn.style.cssText = `
      background: none;
      border: none;
      color: white;
      font-size: 1.1rem;
      cursor: pointer;
      padding: 0 4px;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'fadeInUp .3s ease reverse';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // ── Smooth Scroll for all anchor links ─
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
