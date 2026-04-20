/* ════════════════════════════════════════════════════════
   BRITOL GROUP — Preloader Control
   ════════════════════════════════════════════════════════ */

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

function initPreloader() {
  document.addEventListener('DOMContentLoaded', () => {
    pageReady = true;
    checkPreloaderExit();

    // Ensure preloader is hidden after absolute max time (5s) even if something goes wrong
    setTimeout(() => {
      if (!preloaderShown) {
        hidePreloader();
      }
    }, 5000);
  });
}

initPreloader();
