/* ════════════════════════════════════════════════════════
   BRITOL GROUP — Back to Top Button
   ════════════════════════════════════════════════════════ */

function initBackToTop() {
  document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
}

initBackToTop();
