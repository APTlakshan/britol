/* ════════════════════════════════════════════════════════
   BRITOL GROUP — Testimonials Carousel
   ════════════════════════════════════════════════════════ */

function initTestimonials() {
  document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.testimonials-track');
    const dots = document.querySelectorAll('.testimonials-dots .dot');

    if (!track || !dots.length) return;

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
  });
}

initTestimonials();
