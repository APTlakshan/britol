/* ════════════════════════════════════════════════════════
   BRITOL GROUP — Scroll Animations & Intersection Observer
   ════════════════════════════════════════════════════════ */

function initScrollAnimations() {
  document.addEventListener('DOMContentLoaded', () => {
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
  });
}

initScrollAnimations();
