/* ════════════════════════════════════════════════════════
   BRITOL GROUP — Utilities & Notifications
   ════════════════════════════════════════════════════════ */

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

function initSmoothScroll() {
  document.addEventListener('DOMContentLoaded', () => {
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
}

initSmoothScroll();
