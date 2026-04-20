/* ════════════════════════════════════════════════════════
   BRITOL GROUP — Navigation & Hamburger Menu
   ════════════════════════════════════════════════════════ */

function initNavbar() {
  document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = document.querySelectorAll('.nav-links a');

    // ── Navbar Scroll Effect ────────────────
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });

    // ── Hamburger Menu ──────────────────────
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
  });
}

initNavbar();
