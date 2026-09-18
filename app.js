/**
 * Brothers Jet Set Go Travels & Services - Nepal to Dubai Visit Visa Full Package
 * Client-side interactivity: FAQs, Modal, Viewport preview switcher, and WhatsApp routing.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
  initViewModeSwitcher();
});

/* -------------------------------------------------------------
 * 1. FAQ Accordion Logic
 * ------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const toggleBtn = item.querySelector('.faq-toggle');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    toggleBtn.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.setAttribute('data-open', 'false');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) {
            otherIcon.textContent = '+';
            otherIcon.classList.remove('bg-emerald-100', 'text-brand-primary');
            otherIcon.classList.add('bg-slate-100', 'text-slate-600');
          }
        }
      });

      // Toggle current item
      if (isOpen) {
        item.setAttribute('data-open', 'false');
        content.classList.add('hidden');
        icon.textContent = '+';
        icon.classList.remove('bg-emerald-100', 'text-brand-primary');
        icon.classList.add('bg-slate-100', 'text-slate-600');
      } else {
        item.setAttribute('data-open', 'true');
        content.classList.remove('hidden');
        icon.textContent = '−';
        icon.classList.remove('bg-slate-100', 'text-slate-600');
        icon.classList.add('bg-emerald-100', 'text-brand-primary');
      }
    });
  });
}

/* -------------------------------------------------------------
 * 2. Inquiry Modal Controls
 * ------------------------------------------------------------- */
function openInquiryModal() {
  const modal = document.getElementById('inquiry-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.setAttribute('open', '');
    document.body.style.overflow = 'hidden';
    const nameInput = document.getElementById('applicant-name');
    if (nameInput) nameInput.focus();
  }
}

function closeInquiryModal() {
  const modal = document.getElementById('inquiry-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.removeAttribute('open');
    document.body.style.overflow = '';
  }
}

// Close on backdrop click
document.getElementById('inquiry-modal')?.addEventListener('click', (e) => {
  if (e.target === document.getElementById('inquiry-modal')) {
    closeInquiryModal();
  }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeInquiryModal();
  }
});

/* -------------------------------------------------------------
 * 3. Handle Inquiry Form Submit (Redirect to WhatsApp with details)
 * ------------------------------------------------------------- */
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('applicant-name')?.value.trim();
  const phone = document.getElementById('applicant-phone')?.value.trim();
  const airport = document.getElementById('visa-airport')?.value;
  const travelDate = document.getElementById('travel-date')?.value;
  
  const hasPassport = document.getElementById('doc-passport')?.checked ? 'Yes' : 'No';
  const hasPhoto = document.getElementById('doc-photo')?.checked ? 'Yes' : 'No';
  const hasCitizenship = document.getElementById('doc-citizenship')?.checked ? 'Yes' : 'No';

  const message = `Hello Brothers Jet Set Go Travels & Services,
I would like to apply for the Nepal to Dubai Visit Visa Full Package (NPR 135,000).

My Details:
• Name: ${name}
• Contact: ${phone}
• Preferred Entry: ${airport}
• Travel Timeline: ${travelDate}
• Documents Ready:
  - Passport: ${hasPassport}
  - Photo: ${hasPhoto}
  - Citizenship: ${hasCitizenship}

Please let me know the next steps for document submission.`;

  const whatsappUrl = `https://wa.me/9779816386563?text=${encodeURIComponent(message)}`;
  
  // Close modal and open WhatsApp in new tab
  closeInquiryModal();
  window.open(whatsappUrl, '_blank');
}

/* -------------------------------------------------------------
 * 4. Desktop Viewport Switcher (Full Width vs Stitch Mobile 390px)
 * ------------------------------------------------------------- */
function initViewModeSwitcher() {
  const desktopBtn = document.getElementById('view-desktop-btn');
  const mobileBtn = document.getElementById('view-mobile-btn');
  const appShell = document.getElementById('app-shell');

  if (!desktopBtn || !mobileBtn || !appShell) return;

  desktopBtn.addEventListener('click', () => {
    appShell.classList.remove('mobile-view');
    document.body.classList.remove('mobile-view-active');
    desktopBtn.classList.add('bg-brand-primary', 'text-white', 'shadow');
    desktopBtn.classList.remove('text-slate-400');
    mobileBtn.classList.remove('bg-brand-primary', 'text-white', 'shadow');
    mobileBtn.classList.add('text-slate-400');
  });

  mobileBtn.addEventListener('click', () => {
    appShell.classList.add('mobile-view');
    document.body.classList.add('mobile-view-active');
    mobileBtn.classList.add('bg-brand-primary', 'text-white', 'shadow');
    mobileBtn.classList.remove('text-slate-400');
    desktopBtn.classList.remove('bg-brand-primary', 'text-white', 'shadow');
    desktopBtn.classList.add('text-slate-400');
  });
}
