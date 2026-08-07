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

        if (!name || !email || !phone) {
          showNotification('Please fill in all required fields.', 'error');
          return;
        }

        if (!isValidEmail(email)) {
          showNotification('Please enter a valid email address.', 'error');
          return;
        }

        const serviceSelect = quoteForm.querySelector('#quoteService');
        const serviceText = (serviceSelect && serviceSelect.value) 
          ? serviceSelect.options[serviceSelect.selectedIndex].text 
          : 'Not specified';
        const messageInput = quoteForm.querySelector('#quoteMessage');
        const messageText = messageInput ? messageInput.value.trim() : '';

        let waText = `*New Free Quote Request - South East Melbourne*\n\n` +
          `👤 *Name:* ${name}\n` +
          `📧 *Email:* ${email}\n` +
          `📞 *Phone:* ${phone}\n` +
          `🛠️ *Service Needed:* ${serviceText}`;

        if (messageText) {
          waText += `\n💬 *Message:* ${messageText}`;
        }

        const waUrl = `https://wa.me/61405585405?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');

        showNotification('Opening WhatsApp with your quote details... 🎉', 'success');
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
