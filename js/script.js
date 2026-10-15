/**
 * Abdulla Thaslim — Premium Portfolio JavaScript
 * Handles: Navigation, Typing animation, Scroll effects,
 *          Project filters, Theme toggle, Contact form,
 *          Copy to clipboard, Back-to-top, Progress bar
 */

'use strict';

/* ============================================================
   1. AOS (Animate On Scroll) Initialization
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  });
});

/* ============================================================
   2. Reading Progress Bar
   ============================================================ */
(function initProgressBar() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
    bar.style.width = pct + '%';
    bar.setAttribute('aria-valuenow', Math.round(pct));
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();

/* ============================================================
   3. Sticky Navbar + Active Section Highlighting
   ============================================================ */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  // Scroll shadow
  function handleNavScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Active section highlighting via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
})();

/* ============================================================
   4. Mobile Menu (Hamburger)
   ============================================================ */
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close when a mobile link is clicked
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
  });
})();

/* ============================================================
   5. Smooth Scrolling for All Anchor Links
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '70',
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ============================================================
   6. Hero Typing Animation
   ============================================================ */
(function initTypingAnimation() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  // Respect reduced-motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const titles = [
    'Full Stack Developer',
    'Web Application Developer',
    'Cybersecurity Enthusiast',
    'AI Explorer',
  ];

  if (prefersReducedMotion) {
    el.textContent = titles[0];
    return;
  }

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer = null;

  const TYPING_SPEED = 90;
  const DELETING_SPEED = 50;
  const PAUSE_BEFORE_DELETE = 2200;
  const PAUSE_BEFORE_TYPE = 400;

  function type() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = currentTitle.substring(0, charIndex);
    } else {
      charIndex++;
      el.textContent = currentTitle.substring(0, charIndex);
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === currentTitle.length) {
      isDeleting = true;
      delay = PAUSE_BEFORE_DELETE;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      delay = PAUSE_BEFORE_TYPE;
    }

    typingTimer = setTimeout(type, delay);
  }

  // Start after a small delay
  setTimeout(type, 600);
})();

/* ============================================================
   7. Theme Toggle (Dark / Light)
   ============================================================ */
(function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const body = document.body;
  if (!btn || !icon) return;

  const STORAGE_KEY = 'at-portfolio-theme';

  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-theme');
      icon.className = 'fa-solid fa-sun';
      btn.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      body.classList.remove('light-theme');
      icon.className = 'fa-solid fa-moon';
      btn.setAttribute('aria-label', 'Switch to light theme');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Load saved preference or system preference
  const saved = localStorage.getItem(STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (systemPrefersDark ? 'dark' : 'light'));

  btn.addEventListener('click', () => {
    const isLight = body.classList.contains('light-theme');
    applyTheme(isLight ? 'dark' : 'light');
  });
})();

/* ============================================================
   8. Project Filters
   ============================================================ */
(function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const categories = (card.getAttribute('data-category') || '').split(' ');
        const show = filter === 'all' || categories.includes(filter);

        if (show) {
          card.classList.remove('hidden');
          // Trigger subtle re-animation
          card.style.animation = 'none';
          void card.offsetWidth; // reflow
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

/* ============================================================
   9. Back to Top Button
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  function handleVisibility() {
    btn.classList.toggle('visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', handleVisibility, { passive: true });
  handleVisibility();

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   10. Copy Email to Clipboard
   ============================================================ */
(function initCopyEmail() {
  const btn = document.getElementById('copy-email-btn');
  const textEl = document.getElementById('copy-email-text');
  if (!btn || !textEl) return;

  const EMAIL = 'mt.abdulla.it@gmail.com';

  btn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        // Fallback for non-secure contexts
        const ta = document.createElement('textarea');
        ta.value = EMAIL;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      btn.classList.add('copied');
      textEl.textContent = 'Email Copied!';
      btn.querySelector('i').className = 'fa-solid fa-check';

      setTimeout(() => {
        btn.classList.remove('copied');
        textEl.textContent = 'Copy Email Address';
        btn.querySelector('i').className = 'fa-solid fa-copy';
      }, 2500);
    } catch (err) {
      textEl.textContent = 'Copy failed – try manually';
      setTimeout(() => {
        textEl.textContent = 'Copy Email Address';
      }, 2000);
    }
  });
})();

/* ============================================================
   11. Contact Form Validation & mailto: Submission
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');
  const submitBtn = document.getElementById('form-submit-btn');
  const submitText = document.getElementById('submit-btn-text');
  if (!form) return;

  function getField(id) {
    return document.getElementById(id);
  }

  function showError(inputId, errorId, show) {
    const input = getField(inputId);
    const error = getField(errorId);
    if (!input || !error) return;
    if (show) {
      input.classList.add('error');
      error.classList.add('show');
    } else {
      input.classList.remove('error');
      error.classList.remove('show');
    }
  }

  function clearStatus() {
    statusEl.className = 'form-status';
    statusEl.textContent = '';
  }

  function showStatus(type, message) {
    statusEl.className = `form-status ${type} show`;
    statusEl.textContent = message;
    statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function validateForm() {
    const name = getField('form-name').value.trim();
    const email = getField('form-email').value.trim();
    const subject = getField('form-subject').value.trim();
    const message = getField('form-message').value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (!name) { showError('form-name', 'name-error', true); isValid = false; }
    else { showError('form-name', 'name-error', false); }

    if (!email || !emailRegex.test(email)) { showError('form-email', 'email-error', true); isValid = false; }
    else { showError('form-email', 'email-error', false); }

    if (!subject) { showError('form-subject', 'subject-error', true); isValid = false; }
    else { showError('form-subject', 'subject-error', false); }

    if (!message || message.length < 20) { showError('form-message', 'message-error', true); isValid = false; }
    else { showError('form-message', 'message-error', false); }

    return isValid;
  }

  // Real-time validation on blur
  ['form-name', 'form-email', 'form-subject', 'form-message'].forEach((id) => {
    const el = getField(id);
    if (el) {
      el.addEventListener('blur', () => {
        el.classList.toggle('error', !el.value.trim());
      });
      el.addEventListener('input', () => {
        if (el.classList.contains('error') && el.value.trim()) {
          el.classList.remove('error');
          const errId = id.replace('form-', '') + '-error';
          const errEl = getField(errId);
          if (errEl) errEl.classList.remove('show');
        }
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearStatus();

    if (!validateForm()) {
      showStatus('info', 'Please fill in all required fields correctly.');
      return;
    }

    const name = getField('form-name').value.trim();
    const email = getField('form-email').value.trim();
    const subject = getField('form-subject').value.trim();
    const message = getField('form-message').value.trim();

    // Build mailto URL
    const body = `Hello Abdulla,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`;
    const mailtoUrl = `mailto:mt.abdulla.it@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Simulate a brief loading state
    submitBtn.disabled = true;
    submitText.textContent = 'Opening Mail Client…';
    submitBtn.querySelector('i').className = 'fa-solid fa-circle-notch fa-spin';

    setTimeout(() => {
      window.location.href = mailtoUrl;

      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
      submitBtn.querySelector('i').className = 'fa-solid fa-paper-plane';

      showStatus(
        'success',
        '✓ Your email client should open now. If not, please email mt.abdulla.it@gmail.com directly.',
      );

      form.reset();
    }, 800);
  });
})();

/* ============================================================
   12. Auto-update Footer Copyright Year
   ============================================================ */
(function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ============================================================
   13. Scroll Reveal for elements without AOS
   ============================================================ */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up');
  if (!elements.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('revealed'));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  elements.forEach((el) => observer.observe(el));
})();

/* ============================================================
   14. Keyboard Accessibility — ESC closes mobile menu
   ============================================================ */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');
    if (menu && menu.classList.contains('open')) {
      hamburger.classList.remove('active');
      menu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    }
  }
});

/* ============================================================
   15. Lazy-load images natively (intersection + native loading)
   ============================================================ */
(function lazyLoadImages() {
  // Native lazy loading is already set via loading="lazy" attribute.
  // This is a progressive enhancement fallback for older browsers.
  if ('loading' in HTMLImageElement.prototype) return;

  const images = document.querySelectorAll('img[loading="lazy"]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        io.unobserve(img);
      }
    });
  });
  images.forEach((img) => io.observe(img));
})();
