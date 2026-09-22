/* ==========================================================================
   NEHAL BHUTTU — PORTFOLIO SCRIPT
   Plain JavaScript, no libraries. Organised into small independent functions
   that each set up one piece of behaviour.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initActiveNavLink();
  initScrollReveal();
  initVideoCards();
  initFooterYear();
});

/* ---------- Header background on scroll ---------- */
function initHeaderScroll() {
  const header = document.getElementById('siteHeader');
  if (!header) return;

  const toggle = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
}

/* ---------- Mobile nav open/close ---------- */
function initMobileNav() {
  const toggleBtn = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (!toggleBtn || !mobileNav) return;

  const closeNav = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
  };

  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    mobileNav.classList.toggle('is-open', !isOpen);
  });

  // Close the menu when a link inside it is clicked
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
}

/* ---------- Highlight the nav link for the section currently in view ---------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------- Fade-in reveal for section intros (subtle, one-time) ---------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Portfolio video cards: click a thumbnail to play the video ----------
   Works for two types, set via data-type on the button:
     data-type="youtube" data-src="VIDEO_ID"      → embeds a YouTube player
     data-type="video"   data-src="path/file.mp4" → plays a self-hosted file
   If data-src is still a placeholder (contains "ADD-"), shows a small note
   instead of trying to load a broken video.
------------------------------------------------------------------------- */
function initVideoCards() {
  const mediaButtons = document.querySelectorAll('.video-card__media');

  mediaButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.type;
      const src = btn.dataset.src;
      const label = btn.getAttribute('aria-label') || 'Video';
      const frame = btn.closest('.video-card__frame');
      if (!frame) return;

      if (!src || src.includes('ADD-')) {
        showPlaceholderNotice(btn);
        return;
      }

      let embed;

      if (type === 'youtube') {
        embed = document.createElement('iframe');
        embed.src = `https://www.youtube-nocookie.com/embed/${src}?autoplay=1&rel=0`;
        embed.title = label;
        embed.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        embed.allowFullscreen = true;
        embed.loading = 'lazy';
      } else if (type === 'video') {
        embed = document.createElement('video');
        embed.src = src;
        embed.controls = true;
        embed.autoplay = true;
        embed.playsInline = true;
      } else {
        return;
      }

      embed.className = 'video-card__embed';
      frame.innerHTML = '';
      frame.appendChild(embed);
    });
  });
}

function showPlaceholderNotice(button) {
  // Avoid stacking multiple notices if clicked repeatedly
  const existing = button.querySelector('.video-card__notice');
  if (existing) return;

  const notice = document.createElement('div');
  notice.className = 'video-card__notice';
  notice.textContent = 'Placeholder card — add your video source in index.html.';
  button.appendChild(notice);

  setTimeout(() => notice.remove(), 2600);
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
