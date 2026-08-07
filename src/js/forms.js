/* ════════════════════════════════════════════════════════
   BRITOL GROUP — Contact Forms Handling
   ════════════════════════════════════════════════════════ */

function initForms() {
  document.addEventListener('DOMContentLoaded', () => {
    // ── Quote Form Validation ──────────────
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
      quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = quoteForm.querySelector('#quoteName').value.trim();
        const email = quoteForm.querySelector('#quoteEmail').value.trim();
        const phone = quoteForm.querySelector('#quotePhone').value.trim();
        const messageEl = quoteForm.querySelector('#quoteMessage');
        const messageText = messageEl ? messageEl.value.trim() : '';
        const serviceEl = quoteForm.querySelector('#quoteService');
        const serviceText = (serviceEl && serviceEl.value)
          ? (serviceEl.options[serviceEl.selectedIndex] ? serviceEl.options[serviceEl.selectedIndex].text : serviceEl.value)
          : 'Not specified';

        if (!name || !email || !phone) {
          showNotification('Please fill in all required fields.', 'error');
          return;
        }

        if (!isValidEmail(email)) {
          showNotification('Please enter a valid email address.', 'error');
          return;
        }

        const whatsappMessage =
          `*New Quote Request - South East Melbourne*\n\n` +
          `👤 *Name:* ${name}\n` +
          `📧 *Email:* ${email}\n` +
          `📞 *Phone:* ${phone}\n` +
          `🧹 *Service:* ${serviceText}\n` +
          `💬 *Message:* ${messageText || 'N/A'}`;

        const whatsappNumber = '61405585405';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappUrl, '_blank');
        showNotification('Opening WhatsApp with your quote details... 💬', 'success');
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
  });
}

initForms();
