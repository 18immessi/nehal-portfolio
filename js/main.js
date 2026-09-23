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
  initSkillModal();
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

/* ---------- Skill gallery modal ----------
   Reads skill/gallery content from SKILLS_DATA (js/skills-data.js).
   Clicking a skill button in the Skills section opens a single shared
   modal, populated with that skill's title, description and 6 images.
   - Click a thumbnail, or use the prev/next arrows or Left/Right arrow
     keys, to browse the 6 images.
   - Esc, the × button, or clicking the dark overlay all close it.
   - Focus returns to whichever skill button was clicked, and the page
     stays exactly where it was — nothing here touches scroll position.
------------------------------------------------------------------------- */
function initSkillModal() {
  const modal = document.getElementById('skillModal');
  if (!modal || typeof SKILLS_DATA === 'undefined') return;

  const panel = modal.querySelector('.skill-modal__panel');
  const titleEl = document.getElementById('skillModalTitle');
  const descEl = document.getElementById('skillModalDesc');
  const mainWrap = document.getElementById('skillModalMainWrap');
  const mainImg = document.getElementById('skillModalMainImg');
  const captionEl = document.getElementById('skillModalCaption');
  const thumbsEl = document.getElementById('skillModalThumbs');
  const prevBtn = document.getElementById('skillModalPrev');
  const nextBtn = document.getElementById('skillModalNext');

  let currentSkill = null;
  let currentIndex = 0;
  let lastFocusedEl = null;

  function loadImage(index) {
    if (!currentSkill) return;
    const total = currentSkill.images.length;
    currentIndex = (index + total) % total; // wraps around at either end
    const image = currentSkill.images[currentIndex];

    mainWrap.classList.remove('is-placeholder');
    mainWrap.removeAttribute('data-placeholder-label');
    mainImg.style.display = '';
    mainImg.alt = image.caption ? `${currentSkill.title} — ${image.caption}` : `${currentSkill.title} screenshot`;
    mainImg.onerror = () => {
      mainWrap.classList.add('is-placeholder');
      mainWrap.setAttribute('data-placeholder-label', 'Image coming soon');
      mainImg.style.display = 'none';
    };
    mainImg.src = image.src;

    captionEl.textContent = image.caption || '';

    thumbsEl.querySelectorAll('.skill-modal__thumb').forEach((thumb, i) => {
      thumb.classList.toggle('is-active', i === currentIndex);
    });
  }

  function buildThumbs() {
    thumbsEl.innerHTML = '';
    currentSkill.images.forEach((image, i) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.className = 'skill-modal__thumb';
      thumb.setAttribute('aria-label', image.caption || `View image ${i + 1} of ${currentSkill.images.length}`);

      const img = document.createElement('img');
      img.alt = '';
      img.loading = 'lazy';
      img.onerror = () => {
        thumb.classList.add('is-placeholder');
        img.remove();
      };
      img.src = image.src;

      thumb.appendChild(img);
      thumb.addEventListener('click', () => loadImage(i));
      thumbsEl.appendChild(thumb);
    });
  }

  function openModal(skillId, triggerEl) {
    const skill = SKILLS_DATA.find((s) => s.id === skillId);
    if (!skill) return;

    currentSkill = skill;
    lastFocusedEl = triggerEl || document.activeElement;

    titleEl.textContent = skill.title;
    descEl.textContent = skill.description;

    buildThumbs();
    loadImage(0);

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // lock background scroll without moving it
    panel.focus();
  }

  function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus(); // back to exactly where the user was
  }

  function trapFocus(e) {
    const focusable = panel.querySelectorAll('button, [href]');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  document.querySelectorAll('.skill-item').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.dataset.skill, btn));
  });

  modal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  prevBtn.addEventListener('click', () => loadImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => loadImage(currentIndex + 1));

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') loadImage(currentIndex - 1);
    if (e.key === 'ArrowRight') loadImage(currentIndex + 1);
    if (e.key === 'Tab') trapFocus(e);
  });
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
