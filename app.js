/**
 * Brothers Jet Set Go Travels & Services - Nepal to Dubai Visit Visa Full Package
 * Client-side interactivity: FAQs, Modal, Viewport preview switcher, and WhatsApp routing.
 */

// Universal SSR & Node environment safety guard
const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

if (isBrowser) {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}

function initApp() {
  if (!isBrowser) return;
  initFaqAccordion();
  initViewModeSwitcher();
  initGlobalListeners();
}

/* -------------------------------------------------------------
 * 1. FAQ Accordion Logic
 * ------------------------------------------------------------- */
function initFaqAccordion() {
  if (!isBrowser) return;
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const toggleBtn = item.querySelector('.faq-toggle');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = item.getAttribute('data-open') === 'true';

      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.setAttribute('data-open', 'false');
          otherItem.classList.remove('border-2', 'border-[#6ee7b7]', 'shadow-md');
          otherItem.classList.add('border', 'border-slate-200');
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) {
            otherIcon.textContent = '+';
            otherIcon.classList.remove('bg-[#065f46]', 'text-white');
            otherIcon.classList.add('bg-slate-100', 'text-slate-700');
          }
        }
      });

      // Toggle current item
      if (isOpen) {
        item.setAttribute('data-open', 'false');
        if (content) content.classList.add('hidden');
        item.classList.remove('border-2', 'border-[#6ee7b7]', 'shadow-md');
        item.classList.add('border', 'border-slate-200');
        if (icon) {
          icon.textContent = '+';
          icon.classList.remove('bg-[#065f46]', 'text-white');
          icon.classList.add('bg-slate-100', 'text-slate-700');
        }
      } else {
        item.setAttribute('data-open', 'true');
        if (content) content.classList.remove('hidden');
        item.classList.add('border-2', 'border-[#6ee7b7]', 'shadow-md');
        item.classList.remove('border-slate-200');
        if (icon) {
          icon.textContent = '−';
          icon.classList.remove('bg-slate-100', 'text-slate-700');
          icon.classList.add('bg-[#065f46]', 'text-white');
        }
      }
    });
  });
}

/* -------------------------------------------------------------
 * 2. Inquiry Modal Controls
 * ------------------------------------------------------------- */
function openInquiryModal() {
  if (!isBrowser) return;
  const modal = document.getElementById('inquiry-modal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.setAttribute('open', '');
    if (document.body) document.body.style.overflow = 'hidden';
    const nameInput = document.getElementById('applicant-name');
    if (nameInput) nameInput.focus();
  }
}

function closeInquiryModal() {
  if (!isBrowser) return;
  const modal = document.getElementById('inquiry-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.removeAttribute('open');
    if (document.body) document.body.style.overflow = '';
  }
}

function initGlobalListeners() {
  if (!isBrowser) return;

  // Close on backdrop click
  const inquiryModal = document.getElementById('inquiry-modal');
  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) {
        closeInquiryModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeInquiryModal();
    }
  });
}

/* -------------------------------------------------------------
 * 3. Handle Inquiry Form Submit (Redirect to WhatsApp with details)
 * ------------------------------------------------------------- */
function handleFormSubmit(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  if (!isBrowser) return;

  const name = document.getElementById('applicant-name')?.value.trim() || '';
  const phone = document.getElementById('applicant-phone')?.value.trim() || '';
  const airport = document.getElementById('visa-airport')?.value || '';
  const travelDate = document.getElementById('travel-date')?.value || '';
  
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
  if (typeof window !== 'undefined' && window.open) {
    window.open(whatsappUrl, '_blank');
  }
}

/* -------------------------------------------------------------
 * 4. Desktop Viewport Switcher (Full Width vs Stitch Mobile 390px)
 * ------------------------------------------------------------- */
function initViewModeSwitcher() {
  if (!isBrowser) return;
  const desktopBtn = document.getElementById('view-desktop-btn');
  const mobileBtn = document.getElementById('view-mobile-btn');
  const appShell = document.getElementById('app-shell');

  if (!desktopBtn || !mobileBtn || !appShell) return;

  desktopBtn.addEventListener('click', () => {
    appShell.classList.remove('mobile-view');
    if (document.body) document.body.classList.remove('mobile-view-active');
    desktopBtn.classList.add('bg-brand-primary', 'text-white', 'shadow');
    desktopBtn.classList.remove('text-slate-400');
    mobileBtn.classList.remove('bg-brand-primary', 'text-white', 'shadow');
    mobileBtn.classList.add('text-slate-400');
  });

  mobileBtn.addEventListener('click', () => {
    appShell.classList.add('mobile-view');
    if (document.body) document.body.classList.add('mobile-view-active');
    mobileBtn.classList.add('bg-brand-primary', 'text-white', 'shadow');
    mobileBtn.classList.remove('text-slate-400');
    desktopBtn.classList.remove('bg-brand-primary', 'text-white', 'shadow');
    desktopBtn.classList.add('text-slate-400');
  });
}

// Make functions available globally for inline HTML event handlers (onclick="openInquiryModal()", etc.)
if (isBrowser) {
  window.openInquiryModal = openInquiryModal;
  window.closeInquiryModal = closeInquiryModal;
  window.handleFormSubmit = handleFormSubmit;
}

// Serverless / Node environment handler: If Vercel executes app.js as a Serverless Function
if (typeof module !== 'undefined' && module.exports) {
  module.exports = (req, res) => {
    const fs = require('fs');
    const path = require('path');

    let reqUrl = (req.url || '/').split('?')[0];

    // Handle favicon directly with 204 No Content
    if (reqUrl === '/favicon.ico') {
      res.statusCode = 204;
      res.end();
      return;
    }

    if (reqUrl === '/' || reqUrl === '') {
      reqUrl = '/index.html';
    }

    const cleanPath = reqUrl.startsWith('/') ? reqUrl.slice(1) : reqUrl;
    const filePath = path.join(process.cwd(), cleanPath);

    const MIME_TYPES = {
      '.html': 'text/html; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.json': 'application/json',
    };

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      res.statusCode = 200;
      res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
      return res.end(fs.readFileSync(filePath));
    }

    // Fallback to index.html for root routes
    const indexPath = path.join(process.cwd(), 'index.html');
    if (fs.existsSync(indexPath)) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.end(fs.readFileSync(indexPath));
    }

    res.statusCode = 404;
    res.end('Not Found');
  };
}
