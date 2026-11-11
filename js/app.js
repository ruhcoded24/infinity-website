/**
 * INFINITY — THE TECH SOCIETY, SGGSCC
 * Main Application Controller & Interactive Logic
 */

import {
  SOCIETY_INFO,
  DOMAINS,
  EVENTS,
  VERIFIED_METRICS,
  HISTORICAL_TIMELINE,
  TEAM_MEMBERS,
  GALLERY_ITEMS,
  DEMO_STUDENT,
  LEADERBOARD,
  RECRUITMENT_TIMELINE
} from './data.js';

import { InfinityCanvas } from './infinity-canvas.js';
import { sfx } from './audio.js';
import {
  submitContactInquiry,
  submitRecruitmentApplication,
  submitEventRegistration,
  cancelEventRegistrationInDb,
  saveStudentProfileToDb
} from './supabase.js';

const EVENT_REGISTRATIONS_KEY = 'infinity_event_registrations';
const PROFILE_TOKEN_KEY = 'infinity_profile_token';

function generateUuidV4() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, ch => {
    const r = Math.floor(Math.random() * 16);
    const v = ch === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getOrCreateProfileToken() {
  let token = localStorage.getItem(PROFILE_TOKEN_KEY);
  if (!token) {
    token = generateUuidV4();
    localStorage.setItem(PROFILE_TOKEN_KEY, token);
  }
  return token;
}

// Application State
const state = {
  activeEventFilter: 'all',
  eventSearchQuery: '',
  activeGalleryFilter: 'all',
  leaderboardTimeframe: 'overall',
  recruitmentCycle: 'open', // 'open' | 'closing' | 'closed' | 'soon'
  currentUser: null,
  registeredEvents: []
};

function loadSavedRegistrations() {
  try {
    const raw = localStorage.getItem(EVENT_REGISTRATIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function saveRegistrationsToStorage(registrations) {
  localStorage.setItem(EVENT_REGISTRATIONS_KEY, JSON.stringify(registrations));
}

function syncRegisteredEventsState() {
  const saved = loadSavedRegistrations();
  state.registeredEvents = [...saved, ...DEMO_STUDENT.registeredEvents];
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  syncRegisteredEventsState();
  initIcons();
  initCanvas();
  initSoundEngine();
  initNavigation();
  initCursorFollower();
  initTiltCards();
  initAuthState();

  // Render Core Modules
  renderDomains();
  renderEvents();
  renderImpactCounters();
  renderTimeline();
  renderGallery();
  renderTeam();
  renderRecruitmentTimeline();
  renderLeaderboard();
  renderDashboard();

  // Bind Listeners
  bindEventFilters();
  bindEventRegistrationForm();
  bindGalleryFilters();
  bindLeaderboardFilters();
  bindRecruitmentForm();
  bindContactForm();
  bindModals();
  bindVisualModeToggle();
});

// Refresh Lucide Icons safely
function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// -----------------------------------------------------------------------------
// 1. Interactive 3D Lemniscate Canvas
// -----------------------------------------------------------------------------
let canvasInstance = null;
function initCanvas() {
  const canvasEl = document.getElementById('infinity-canvas');
  if (canvasEl) {
    canvasInstance = new InfinityCanvas('infinity-canvas');
  }
}

function bindVisualModeToggle() {
  const canvasBtn = document.getElementById('view-canvas-btn');
  const neonBtn = document.getElementById('view-neon-btn');
  const canvasEl = document.getElementById('infinity-canvas');
  const overlayEl = document.getElementById('infinity-image-overlay');

  if (!canvasBtn || !neonBtn) return;

  canvasBtn.addEventListener('click', () => {
    sfx.playClick();
    canvasEl.classList.remove('hidden');
    overlayEl.classList.add('hidden');
    if (canvasInstance) {
      canvasInstance.resize();
    }
    canvasBtn.className = 'px-2 py-0.5 rounded text-purple-300 bg-purple-950 font-semibold border border-purple-500/40';
    neonBtn.className = 'px-2 py-0.5 rounded text-slate-400 hover:text-white';
  });

  neonBtn.addEventListener('click', () => {
    sfx.playClick();
    canvasEl.classList.add('hidden');
    overlayEl.classList.remove('hidden');
    neonBtn.className = 'px-2 py-0.5 rounded text-purple-300 bg-purple-950 font-semibold border border-purple-500/40';
    canvasBtn.className = 'px-2 py-0.5 rounded text-slate-400 hover:text-white';
  });
}

// -----------------------------------------------------------------------------
// 2. Sound Effects Engine Toggle
// -----------------------------------------------------------------------------
function initSoundEngine() {
  const sfxBtn = document.getElementById('sfx-toggle-btn');
  const sfxText = document.getElementById('sfx-status-text');
  const sfxIcon = document.getElementById('sfx-icon');

  function updateUi(enabled) {
    if (sfxText) sfxText.textContent = enabled ? 'Audio: Active' : 'Audio: Muted';
    if (sfxIcon) {
      sfxIcon.setAttribute('data-lucide', enabled ? 'volume-2' : 'volume-x');
      initIcons();
    }
  }

  updateUi(sfx.isEnabled());

  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      const active = sfx.toggle();
      updateUi(active);
    });
  }

  // Add click sound to interactive buttons
  document.querySelectorAll('button, a[href^="#"]').forEach(el => {
    el.addEventListener('mouseenter', () => sfx.playHover());
  });
}

// -----------------------------------------------------------------------------
// 3. Navigation, Mobile Menu & Active Links
// -----------------------------------------------------------------------------
function initNavigation() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backToTop = document.getElementById('back-to-top-btn');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      sfx.playClick();
      drawer.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.add('hidden');
      });
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      sfx.playClick();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Active section spy
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link').forEach(nav => {
          nav.classList.toggle('text-cyan-400', nav.dataset.nav === id);
          nav.classList.toggle('text-slate-300', nav.dataset.nav !== id);
        });
      }
    });
  });
}

// -----------------------------------------------------------------------------
// 4. Interactive Cursor Glow
// -----------------------------------------------------------------------------
function initCursorFollower() {
  const cursor = document.getElementById('cursor-glow');
  if (!cursor || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
}

// -----------------------------------------------------------------------------
// 5. 3D Tilt Effect on Cards
// -----------------------------------------------------------------------------
function initTiltCards() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

// -----------------------------------------------------------------------------
// 6. Domains Module
// -----------------------------------------------------------------------------
function renderDomains() {
  const container = document.getElementById('domains-grid');
  if (!container) return;

  container.innerHTML = DOMAINS.map(domain => `
    <div class="tilt-card glass-panel-glow p-6 rounded-3xl border ${domain.borderColor} flex flex-col justify-between transition-all duration-300 group cursor-pointer" data-domain-id="${domain.id}">
      <div>
        <div class="flex items-center justify-between mb-4">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${domain.color} p-[1px] shadow-lg">
            <div class="w-full h-full bg-surface rounded-[15px] flex items-center justify-center text-white">
              <i data-lucide="${domain.icon}" class="w-6 h-6"></i>
            </div>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10 uppercase">Domain</span>
        </div>

        <h3 class="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition">${domain.title}</h3>
        <p class="text-xs font-mono text-purple-300/80 mt-1">${domain.tagline}</p>
        <p class="text-xs text-slate-300 mt-3 leading-relaxed">${domain.shortDesc}</p>

        <div class="mt-4 pt-4 border-t border-white/5">
          <div class="text-[11px] font-mono uppercase text-slate-400 mb-2">Core Focus Areas:</div>
          <ul class="space-y-1.5 text-xs text-slate-300">
            ${domain.curriculum.slice(0, 3).map(item => `
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${domain.accent}"></span>
                <span>${item}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
        <button class="domain-explore-btn text-xs font-semibold text-white flex items-center gap-1.5 group-hover:text-cyan-400 transition" data-domain-id="${domain.id}">
          <span>Explore Syllabus & Lab</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
        </button>
        <span class="text-xs font-mono text-slate-500">SGGSCC</span>
      </div>
    </div>
  `).join('');

  initIcons();
  initTiltCards();

  document.querySelectorAll('.domain-explore-btn, [data-domain-id]').forEach(el => {
    el.addEventListener('click', (e) => {
      const id = el.dataset.domainId || el.closest('[data-domain-id]').dataset.domainId;
      openDomainModal(id);
    });
  });
}

function openDomainModal(domainId) {
  const domain = DOMAINS.find(d => d.id === domainId);
  if (!domain) return;
  sfx.playClick();

  const modal = document.getElementById('domain-modal');
  const content = document.getElementById('domain-modal-content');

  content.innerHTML = `
    <div class="flex items-center gap-3 mb-4">
      <div class="w-12 h-12 rounded-2xl bg-gradient-to-br ${domain.color} p-[1px]">
        <div class="w-full h-full bg-surface rounded-[15px] flex items-center justify-center text-white">
          <i data-lucide="${domain.icon}" class="w-6 h-6"></i>
        </div>
      </div>
      <div>
        <h3 class="text-2xl font-bold font-display text-white">${domain.title}</h3>
        <p class="text-xs font-mono text-cyan-400">${domain.tagline}</p>
      </div>
    </div>

    <p class="text-xs text-slate-300 leading-relaxed mb-6">${domain.shortDesc}</p>

    <div class="space-y-5">
      <div>
        <h4 class="text-xs font-mono uppercase text-purple-300 font-bold mb-2">Technical Syllabus & Learning Modules</h4>
        <div class="space-y-2">
          ${domain.curriculum.map(c => `
            <div class="p-2.5 rounded-xl bg-surface border border-white/5 text-xs text-slate-200 flex items-center gap-2.5">
              <i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>
              <span>${c}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div>
        <h4 class="text-xs font-mono uppercase text-cyan-300 font-bold mb-2">Flagship Hands-On Activities & Labs</h4>
        <div class="space-y-2">
          ${domain.sampleActivities.map(a => `
            <div class="p-2.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 flex items-center gap-2.5">
              <i data-lucide="sparkles" class="w-4 h-4 text-purple-400"></i>
              <span>${a}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
      <a href="#join" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs uppercase tracking-wider close-domain-link">
        Apply for this Domain
      </a>
      <span class="text-[11px] text-slate-400 font-mono">Academic Session 2025–26</span>
    </div>
  `;

  modal.classList.remove('hidden');
  initIcons();

  content.querySelector('.close-domain-link')?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

// -----------------------------------------------------------------------------
// 7. Events Module (Search, Filters, Detail, Booking)
// -----------------------------------------------------------------------------
function renderEvents() {
  const container = document.getElementById('events-grid');
  if (!container) return;

  const filtered = EVENTS.filter(evt => {
    // Category match
    const catMatch = state.activeEventFilter === 'all' 
      ? true 
      : (state.activeEventFilter === 'upcoming' ? evt.type === 'upcoming' 
      : (state.activeEventFilter === 'past' ? evt.type === 'past' 
      : evt.category === state.activeEventFilter));

    // Search query match
    const q = state.eventSearchQuery.toLowerCase();
    const searchMatch = !q || evt.title.toLowerCase().includes(q) || evt.shortDesc.toLowerCase().includes(q) || evt.categoryLabel.toLowerCase().includes(q);

    return catMatch && searchMatch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-3 text-center py-16 glass-panel rounded-2xl border border-white/5">
        <i data-lucide="calendar-x" class="w-10 h-10 text-slate-500 mx-auto mb-3"></i>
        <h4 class="text-base font-bold text-white font-display">No events found</h4>
        <p class="text-xs text-slate-400 mt-1">Try modifying your search or switching categories.</p>
      </div>
    `;
    initIcons();
    return;
  }

  container.innerHTML = filtered.map(evt => `
    <div class="tilt-card event-card-clickable cursor-pointer glass-panel-glow rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-purple-500/50 group" data-event-id="${evt.id}" role="button" tabindex="0" aria-label="View details for ${evt.title}">
      <div>
        <!-- Card Image Header -->
        <div class="relative h-44 overflow-hidden">
          <img src="${evt.image}" alt="${evt.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105">
          <div class="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>

          <!-- Top Status Pills -->
          <div class="absolute top-3 left-3 right-3 flex items-center justify-between">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${
              evt.type === 'upcoming' 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                : 'bg-purple-950/70 text-purple-300 border border-purple-500/30'
            }">
              ${evt.tag}
            </span>

            ${evt.isVerified ? `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <i data-lucide="check-circle" class="w-3 h-3"></i>
                <span>Verified Event</span>
              </span>
            ` : `
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Demo Preview
              </span>
            `}
          </div>

          <!-- Bottom Venue & Date -->
          <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-3 text-[11px] text-slate-300 font-mono">
            <span class="flex items-center gap-1 truncate">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-purple-400 flex-shrink-0"></i>
              <span class="truncate">${evt.displayDate}</span>
            </span>
            <span class="text-cyan-400 flex-shrink-0 truncate max-w-[45%]">${evt.categoryLabel}</span>
          </div>
        </div>

        <!-- Body Content -->
        <div class="p-6">
          <h3 class="text-lg font-bold font-display text-white group-hover:text-cyan-300 transition">${evt.title}</h3>
          <p class="text-xs text-slate-400 mt-2 leading-relaxed">${evt.shortDesc}</p>

          <!-- Verified metric banner -->
          <div class="mt-4 p-2.5 rounded-xl bg-surface border border-white/5 flex items-center justify-between text-xs font-mono">
            <span class="text-slate-400">Event Metric:</span>
            <span class="text-cyan-400 font-bold">${evt.verifiedMetric}</span>
          </div>
        </div>
      </div>

      <!-- Action Footer -->
      <div class="p-6 pt-0 flex items-center justify-between gap-3">
        <button class="event-details-btn px-4 py-2 rounded-xl glass-panel border border-white/10 text-xs font-semibold text-slate-200 hover:text-white hover:border-purple-400 transition" data-event-id="${evt.id}">
          Details & Recap
        </button>

        ${evt.type === 'upcoming' ? `
          <button class="event-quick-register-btn px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1.5" data-event-id="${evt.id}">
            <i data-lucide="ticket" class="w-3.5 h-3.5"></i>
            <span>Register</span>
          </button>
        ` : `
          <button class="event-register-btn px-4 py-2 rounded-xl bg-surface border border-purple-500/30 text-purple-300 font-semibold text-xs hover:bg-purple-900/30 transition flex items-center gap-1.5" data-event-id="${evt.id}">
            <i data-lucide="file-check" class="w-3.5 h-3.5"></i>
            <span>View Archive</span>
          </button>
        `}
      </div>
    </div>
  `).join('');

  initIcons();
  initTiltCards();

  document.querySelectorAll('.event-quick-register-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEventRegistrationModal(btn.dataset.eventId);
    });
  });

  document.querySelectorAll('.event-card-clickable').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.eventId;
      openEventModal(id);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEventModal(card.dataset.eventId);
      }
    });
  });
}

function bindEventFilters() {
  const container = document.getElementById('event-filter-container');
  const searchInput = document.getElementById('event-search-input');

  if (container) {
    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.event-filter-btn');
      if (!btn) return;
      sfx.playClick();

      document.querySelectorAll('.event-filter-btn').forEach(b => {
        b.className = 'event-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition';
      });
      btn.className = 'event-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium transition active-filter bg-purple-600 text-white';

      state.activeEventFilter = btn.dataset.filter;
      renderEvents();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.eventSearchQuery = e.target.value.trim();
      renderEvents();
    });
  }
}

function openEventModal(eventId) {
  const evt = EVENTS.find(e => e.id === eventId);
  if (!evt) return;
  sfx.playClick();

  const modal = document.getElementById('event-modal');
  const content = document.getElementById('event-modal-content');

  const isAlreadyRegistered = state.registeredEvents.some(r => r.eventId === evt.id || r.id === evt.id);

  content.innerHTML = `
    <div class="relative mb-6 rounded-2xl overflow-hidden aspect-video">
      <img src="${evt.image}" alt="${evt.title}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent"></div>
      <div class="absolute bottom-4 left-4 right-4">
        <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-purple-900/80 text-purple-300 border border-purple-500/30 uppercase">
          ${evt.categoryLabel}
        </span>
        <h3 class="text-2xl font-black font-display text-white mt-1">${evt.title}</h3>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 text-xs font-mono">
      <div class="p-3 rounded-xl bg-surface border border-white/5">
        <span class="text-slate-500 block text-[10px]">SCHEDULE</span>
        <span class="text-white font-semibold">${evt.displayDate}</span>
      </div>
      <div class="p-3 rounded-xl bg-surface border border-white/5">
        <span class="text-slate-500 block text-[10px]">VENUE / HOST</span>
        <span class="text-cyan-400 font-semibold">${evt.venue}</span>
      </div>
      <div class="p-3 rounded-xl bg-surface border border-white/5 col-span-2 sm:col-span-1">
        <span class="text-slate-500 block text-[10px]">VERIFIED IMPACT</span>
        <span class="text-purple-300 font-semibold">${evt.verifiedMetric}</span>
      </div>
    </div>

    <div class="space-y-4 text-xs text-slate-300">
      <div>
        <h4 class="font-mono text-purple-300 uppercase font-bold text-xs mb-1">Event Overview</h4>
        <p class="leading-relaxed text-slate-300">${evt.longDesc}</p>
      </div>

      <div>
        <h4 class="font-mono text-cyan-300 uppercase font-bold text-xs mb-2">Key Highlights</h4>
        <div class="space-y-1.5">
          ${evt.highlights.map(h => `
            <div class="flex items-center gap-2 p-2 rounded-lg bg-surface border border-white/5">
              <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i>
              <span>${h}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Registration or Digital Ticket Box -->
    <div class="mt-8 pt-6 border-t border-white/10">
      ${isAlreadyRegistered ? `
        <div class="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <i data-lucide="check-circle" class="w-5 h-5"></i>
            </div>
            <div>
              <div class="text-xs font-bold text-white">Already Confirmed</div>
              <div class="text-[11px] text-slate-400 font-mono">Digital Pass added to Student Dashboard</div>
            </div>
          </div>
          <a href="#dashboard" class="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold close-event-btn">
            View Pass
          </a>
        </div>
      ` : `
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-xs text-slate-400">
            ${evt.type === 'upcoming' 
              ? 'Join this event and generate your digital entry ticket.' 
              : 'Add this verified historical activity to your student participation log.'}
          </div>
          <button id="book-event-now-btn" class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center justify-center gap-2">
            <i data-lucide="ticket" class="w-4 h-4"></i>
            <span>${evt.type === 'upcoming' ? 'Register' : 'Claim Attendance (Demo)'}</span>
          </button>
        </div>
      `}
    </div>
  `;

  modal.classList.remove('hidden');
  initIcons();

  const bookBtn = content.querySelector('#book-event-now-btn');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => {
      if (evt.type === 'upcoming') {
        modal.classList.add('hidden');
        openEventRegistrationModal(evt.id);
        return;
      }

      sfx.playSuccess();
      const code = `INF-${evt.category.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;
      state.registeredEvents.unshift({
        id: evt.id,
        eventId: evt.id,
        title: evt.title,
        date: evt.displayDate,
        status: 'Attended',
        ticketCode: code,
        badge: evt.tag,
        category: evt.categoryLabel
      });

      renderDashboard();
      openEventModal(evt.id); // re-render modal with confirmed state
    });
  }

  content.querySelectorAll('.close-event-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  });
}

// -----------------------------------------------------------------------------
// 8. Impact & Achievements (Animated Stat Counters & Timeline)
// -----------------------------------------------------------------------------
function renderImpactCounters() {
  const container = document.getElementById('impact-counters-container');
  if (!container) return;

  container.innerHTML = VERIFIED_METRICS.map(m => `
    <div class="glass-panel-glow p-6 rounded-3xl border border-white/10 text-center relative overflow-hidden group">
      <div class="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-4 group-hover:scale-110 transition">
        <i data-lucide="${m.icon}" class="w-6 h-6"></i>
      </div>

      <div class="text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
        <span class="counter-number" data-target="${m.number}">0</span><span class="text-cyan-400">${m.suffix}</span>
      </div>

      <h4 class="text-sm font-bold font-display text-white mt-2">${m.label}</h4>
      <p class="text-xs text-purple-300 font-mono mt-0.5">${m.subtext}</p>
      
      <div class="mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-500 font-mono">
        <i data-lucide="shield-check" class="inline w-3 h-3 text-emerald-400 mr-1"></i>
        <span>${m.eventContext}</span>
      </div>
    </div>
  `).join('');

  initIcons();
  initCounterAnimations();
}

function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const duration = 1500;
        const stepTime = 20;
        const stepValue = Math.max(1, Math.floor(target / (duration / stepTime)));

        const timer = setInterval(() => {
          current += stepValue;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = current;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = HISTORICAL_TIMELINE.map((item, idx) => {
    const isEven = idx % 2 === 0;
    return `
      <div class="relative flex items-center ${isEven ? 'md:flex-row-reverse' : ''} gap-6">
        
        <!-- Timeline Marker Dot -->
        <div class="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-deep border-2 border-purple-500 flex items-center justify-center text-cyan-400 z-10 shadow-lg shadow-purple-500/40">
          <i data-lucide="${item.icon}" class="w-4 h-4"></i>
        </div>

        <!-- Content Card -->
        <div class="ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-10 md:text-right' : 'md:pl-10'} w-full">
          <div class="glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition">
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-950/70 text-purple-300 border border-purple-500/30">
              ${item.period} • ${item.type}
            </span>
            <h4 class="text-base font-bold font-display text-white mt-2">${item.title}</h4>
            <p class="text-xs font-mono text-cyan-400 mt-0.5">${item.location}</p>
            <p class="text-xs text-slate-300 mt-2 leading-relaxed">${item.description}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  initIcons();
}

// -----------------------------------------------------------------------------
// 9. Gallery Module (Lightbox, Filtering)
// -----------------------------------------------------------------------------
function renderGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  const filtered = state.activeGalleryFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === state.activeGalleryFilter);

  container.innerHTML = filtered.map(item => `
    <div class="tilt-card glass-panel-glow rounded-3xl overflow-hidden border border-white/10 group cursor-pointer relative" data-gallery-id="${item.id}">
      <div class="aspect-video sm:aspect-square overflow-hidden relative">
        <img src="${item.src}" alt="${item.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
        <div class="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent opacity-80 group-hover:opacity-90 transition"></div>
        
        <!-- Hover Zoom Icon -->
        <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-deep/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition duration-300">
          <i data-lucide="maximize-2" class="w-4 h-4"></i>
        </div>

        <!-- Caption Overlay -->
        <div class="absolute bottom-4 left-4 right-4">
          <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-500/30 uppercase">
            ${item.categoryLabel}
          </span>
          <h4 class="text-base font-bold font-display text-white mt-1.5">${item.title}</h4>
          <p class="text-xs text-slate-300 line-clamp-2 mt-0.5">${item.caption}</p>
        </div>
      </div>
    </div>
  `).join('');

  initIcons();
  initTiltCards();

  document.querySelectorAll('[data-gallery-id]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.galleryId;
      openLightbox(id);
    });
  });
}

function bindGalleryFilters() {
  const container = document.getElementById('gallery-filter-container');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.gallery-filter-btn');
    if (!btn) return;
    sfx.playClick();

    document.querySelectorAll('.gallery-filter-btn').forEach(b => {
      b.className = 'gallery-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition';
    });
    btn.className = 'gallery-filter-btn px-3 py-1.5 rounded-lg text-xs font-medium transition active-gal-filter bg-purple-600 text-white';

    state.activeGalleryFilter = btn.dataset.filter;
    renderGallery();
  });
}

function openLightbox(galleryId) {
  const item = GALLERY_ITEMS.find(g => g.id === galleryId);
  if (!item) return;
  sfx.playClick();

  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const caption = document.getElementById('lightbox-caption');

  img.src = item.src;
  title.textContent = item.title;
  caption.textContent = item.caption;

  modal.classList.remove('hidden');
}

// -----------------------------------------------------------------------------
// 10. Our Team Module (2025–26 Verified Office Bearers)
// -----------------------------------------------------------------------------
function renderTeam() {
  const container = document.getElementById('team-grid');
  if (!container) return;

  container.innerHTML = TEAM_MEMBERS.map(m => `
    <a href="${m.linkedin}" target="_blank" rel="noopener noreferrer" class="tilt-card glass-panel-glow p-5 rounded-3xl border border-white/10 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400/60 group text-center cursor-pointer block" title="Open ${m.name}'s LinkedIn Profile">
      <div>
        <!-- Avatar -->
        <div class="relative w-24 h-24 mx-auto mb-4">
          <img src="${m.image}" alt="${m.name}" class="w-full h-full rounded-2xl object-cover border-2 border-purple-500/40 shadow-lg shadow-purple-500/20 group-hover:border-cyan-400 transition duration-300">
          <span class="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md bg-purple-900 border border-purple-400/40 text-[9px] font-mono text-purple-200">25–26</span>
        </div>

        <h3 class="text-base font-bold font-display text-white group-hover:text-cyan-300 transition">${m.name}</h3>
        <p class="text-xs font-mono font-semibold text-purple-400 mt-0.5">${m.role}</p>
        <p class="text-[11px] text-slate-400 mt-1">${m.domain}</p>

        <p class="text-xs text-slate-300 mt-3 leading-relaxed line-clamp-3">${m.bio}</p>
      </div>

      <div class="mt-5 pt-3 border-t border-white/5 flex items-center justify-center gap-2">
        <span class="px-3.5 py-1.5 rounded-lg bg-blue-950/50 border border-blue-500/40 text-blue-300 text-xs group-hover:text-white group-hover:bg-blue-600/80 group-hover:border-blue-400 transition flex items-center gap-1.5 font-medium">
          <i data-lucide="linkedin" class="w-3.5 h-3.5"></i>
          <span>LinkedIn Profile</span>
          <i data-lucide="external-link" class="w-3 h-3 opacity-75"></i>
        </span>
      </div>
    </a>
  `).join('');

  initIcons();
  initTiltCards();
}

// -----------------------------------------------------------------------------
// 11. Recruitment Portal Module
// -----------------------------------------------------------------------------
function renderRecruitmentTimeline() {
  const container = document.getElementById('recruitment-timeline-container');
  if (!container) return;

  container.innerHTML = RECRUITMENT_TIMELINE.map(item => `
    <div class="flex items-start gap-4 p-3 rounded-2xl bg-surface/60 border border-white/5 hover:border-purple-500/30 transition">
      <div class="w-10 h-10 rounded-xl bg-purple-950/50 border border-purple-500/40 flex items-center justify-center font-mono font-bold text-xs text-purple-300 flex-shrink-0">
        ${item.step}
      </div>
      <div class="flex-grow">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-bold font-display text-white">${item.stage}</h4>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">${item.duration}</span>
        </div>
        <p class="text-xs text-slate-300 mt-1 leading-relaxed">${item.desc}</p>
      </div>
    </div>
  `).join('');

  // Cycle toggle simulator
  const toggleBtn = document.getElementById('toggle-cycle-btn');
  const badge = document.getElementById('recruitment-status-badge');
  if (toggleBtn && badge) {
    const statuses = [
      { text: 'Applications Open (Demo Phase)', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
      { text: 'Applications Closing Soon (Demo)', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
      { text: 'Applications Closed (Demo)', color: 'bg-red-500/20 text-red-400 border-red-500/40' },
      { text: 'Recruitment Coming Soon (Demo)', color: 'bg-purple-500/20 text-purple-400 border-purple-500/40' }
    ];
    let idx = 0;

    toggleBtn.addEventListener('click', () => {
      sfx.playClick();
      idx = (idx + 1) % statuses.length;
      badge.textContent = statuses[idx].text;
      badge.className = `px-2.5 py-0.5 rounded text-xs font-mono font-semibold border ${statuses[idx].color}`;
    });
  }
}

function bindRecruitmentForm() {
  const form = document.getElementById('recruitment-form');
  const successPanel = document.getElementById('recruitment-success-panel');
  const receiptEl = document.getElementById('receipt-id');
  const resetBtn = document.getElementById('reset-application-btn');
  const errorBox = document.getElementById('recruitment-error-box');
  const errorText = document.getElementById('recruitment-error-text');
  const submitBtn = document.getElementById('recruitment-submit-btn');

  if (!form) return;

  const showError = (msg) => {
    if (errorText) errorText.textContent = msg;
    if (errorBox) errorBox.classList.remove('hidden');
  };
  const clearError = () => {
    if (errorText) errorText.textContent = '';
    if (errorBox) errorBox.classList.add('hidden');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const applicationData = {
      id: `INF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: document.getElementById('rec-name').value.trim(),
      email: document.getElementById('rec-email').value.trim(),
      course: document.getElementById('rec-course').value.trim(),
      year: document.getElementById('rec-year').value.trim(),
      phone: document.getElementById('rec-phone').value.trim(),
      domain: document.getElementById('rec-domain').value.trim(),
      skills: document.getElementById('rec-skills').value.trim(),
      why: document.getElementById('rec-why').value.trim(),
      portfolio: document.getElementById('rec-portfolio').value.trim(),
      submittedAt: new Date().toISOString()
    };

    if (!applicationData.name || !applicationData.email || !applicationData.course || !applicationData.phone || !applicationData.why) {
      showError('Please fill in all required application fields.');
      return;
    }
    if (!EMAIL_FORMAT_REGEX.test(applicationData.email)) {
      showError('Please enter a valid college email address.');
      return;
    }
    if (applicationData.phone.replace(/\D/g, '').length < 7) {
      showError('Please enter a valid phone number.');
      return;
    }

    const originalHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Submitting Application...</span>';
    }

    try {
      await submitRecruitmentApplication(applicationData);
    } catch (err) {
      showError(err?.message || 'Unable to submit application right now. Please try again.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }

    sfx.playSuccess();
    const existing = JSON.parse(localStorage.getItem('infinity_demo_applications') || '[]');
    existing.push(applicationData);
    localStorage.setItem('infinity_demo_applications', JSON.stringify(existing));

    if (receiptEl) receiptEl.textContent = applicationData.id;
    form.classList.add('hidden');
    successPanel.classList.remove('hidden');
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      clearError();
      form.classList.remove('hidden');
      successPanel.classList.add('hidden');
    });
  }
}

// -----------------------------------------------------------------------------
// 12. Student Dashboard Module ("INFINITY CONNECT")
// -----------------------------------------------------------------------------
function initAuthState() {
  // Check if simulated user is logged in
  const savedUser = localStorage.getItem('infinity_current_user');
  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser);
      // Migrate previous demo session to current profile
      if (!parsed || parsed.name === 'Simranjeet Kaur' || !parsed.avatar || parsed.avatar.includes('unsplash')) {
        state.currentUser = DEMO_STUDENT;
        localStorage.setItem('infinity_current_user', JSON.stringify(DEMO_STUDENT));
      } else {
        state.currentUser = parsed;
      }
    } catch (e) {
      state.currentUser = DEMO_STUDENT;
    }
  } else {
    state.currentUser = DEMO_STUDENT; // Default demo student for seamless immediate evaluation
  }
  updateAuthUi();
}

function updateAuthUi() {
  const navBtn = document.getElementById('auth-nav-btn');
  const navText = document.getElementById('auth-nav-text');
  const mobileNavText = document.getElementById('mobile-auth-text');

  if (state.currentUser) {
    const firstName = state.currentUser.name ? state.currentUser.name.split(' ')[0] : 'Ruhani';
    if (navText) navText.textContent = `Portal: ${firstName}`;
    if (mobileNavText) mobileNavText.textContent = `Portal: ${firstName}`;
  } else {
    if (navText) navText.textContent = 'Login';
    if (mobileNavText) mobileNavText.textContent = 'Student Login';
  }
}

function renderDashboard() {
  const user = state.currentUser || DEMO_STUDENT;

  // Header data
  const avatarEl = document.getElementById('dash-avatar');
  const nameEl = document.getElementById('dash-name');
  const courseEl = document.getElementById('dash-course-info');
  const emailEl = document.getElementById('dash-email');
  const bioEl = document.getElementById('dash-bio');
  const pointsEl = document.getElementById('dash-points');
  const rankEl = document.getElementById('dash-rank');
  const tierEl = document.getElementById('dash-tier');

  if (avatarEl && user.avatar) avatarEl.src = user.avatar;
  if (nameEl) nameEl.textContent = user.name;
  if (courseEl) courseEl.textContent = `${user.course} • ${user.year} • Roll: ${user.rollNo || 'CS/24/089'}`;
  if (emailEl) emailEl.textContent = user.collegeEmail;
  if (bioEl) bioEl.textContent = user.bio;
  if (pointsEl) pointsEl.textContent = user.points;
  if (rankEl) rankEl.textContent = `#${user.rank}`;
  if (tierEl) tierEl.textContent = user.tier;

  // 1. Registered events & digital tickets
  const regCountEl = document.getElementById('my-reg-count');
  if (regCountEl) {
    regCountEl.textContent = String(state.registeredEvents.length);
  }

  const eventsGrid = document.getElementById('dash-registered-events-grid');
  if (eventsGrid) {
    if (state.registeredEvents.length === 0) {
      eventsGrid.innerHTML = `
        <div class="col-span-full glass-panel p-8 rounded-2xl border border-white/10 text-center">
          <p class="text-sm text-slate-300 font-medium">No registered events yet.</p>
          <p class="text-xs text-slate-400 mt-1">Register for an upcoming event to see your confirmation and entry pass here.</p>
        </div>
      `;
    } else {
      const savedIds = new Set(loadSavedRegistrations().map(r => r.id));
      eventsGrid.innerHTML = state.registeredEvents.map(evt => {
        const canCancel = savedIds.has(evt.id);
        return `
        <div class="dash-reg-card glass-panel p-5 rounded-2xl border border-white/10 hover:border-purple-400/60 hover:-translate-y-0.5 transition cursor-pointer flex flex-col justify-between" role="button" tabindex="0" data-pass-card-id="${escapeHtml(evt.id)}" title="Click to view Digital Admission Pass">
          <div>
            <div class="flex items-center justify-between gap-2 mb-3">
              <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
                ${escapeHtml(evt.category || 'Event')}
              </span>
              <span class="text-[10px] font-mono text-emerald-400 shrink-0">${escapeHtml(evt.status || 'Confirmed')}</span>
            </div>
            <h4 class="text-base font-bold font-display text-white">${escapeHtml(evt.title)}</h4>
            <p class="text-xs text-slate-400 mt-1 font-mono">${escapeHtml(evt.date)}</p>
            ${evt.studentName && evt.email ? `
              <div class="mt-3 p-2.5 rounded-xl bg-surface/80 border border-white/5 text-[11px] space-y-0.5">
                <div class="text-slate-200 font-medium truncate">${escapeHtml(evt.studentName)}</div>
                <div class="text-cyan-300 font-mono truncate">${escapeHtml(evt.email)}</div>
              </div>
            ` : ''}
          </div>

          <div class="mt-4 pt-4 border-t border-white/5 space-y-3">
            <div class="flex items-center justify-between gap-2">
              <div class="min-w-0">
                <span class="text-[9px] text-slate-500 uppercase font-mono block">Digital Entry Pass</span>
                <span class="text-xs font-mono font-bold text-cyan-400 truncate block">${escapeHtml(evt.ticketCode)}</span>
              </div>
              <div class="flex items-center gap-1.5 shrink-0">
                <button type="button" class="dash-view-pass-btn px-2.5 py-1.5 rounded-lg bg-surface border border-purple-500/30 hover:border-cyan-400/60 text-slate-200 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition" data-pass-id="${escapeHtml(evt.id)}" title="Open Digital Admission Pass">
                  <i data-lucide="qr-code" class="w-3.5 h-3.5 text-cyan-400"></i>
                  <span>Pass</span>
                </button>
                ${canCancel ? `
                  <button type="button" class="dash-cancel-reg-btn px-2.5 py-1.5 rounded-lg bg-red-950/30 border border-red-500/30 hover:bg-red-900/50 text-red-300 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition" data-cancel-id="${escapeHtml(evt.id)}" title="Cancel Registration">
                    <i data-lucide="x" class="w-3.5 h-3.5"></i>
                    <span>Cancel</span>
                  </button>
                ` : ''}
              </div>
            </div>
            ${canCancel ? `
              <div class="dash-cancel-confirm-bar hidden p-2.5 rounded-xl bg-red-950/50 border border-red-500/40 flex items-center justify-between gap-2" data-confirm-for="${escapeHtml(evt.id)}">
                <span class="text-[11px] text-red-200 font-medium">Cancel registration?</span>
                <div class="flex items-center gap-1.5 shrink-0">
                  <button type="button" class="dash-confirm-cancel-btn px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[11px] font-semibold transition" data-confirm-id="${escapeHtml(evt.id)}">Yes</button>
                  <button type="button" class="dash-abort-cancel-btn px-2.5 py-1 rounded-lg border border-white/15 text-slate-200 hover:bg-white/10 text-[11px] font-semibold transition" data-abort-id="${escapeHtml(evt.id)}">Keep</button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
      }).join('');

      eventsGrid.querySelectorAll('.dash-reg-card').forEach(card => {
        const openPass = () => {
          const reg = state.registeredEvents.find(r => r.id === card.dataset.passCardId);
          if (reg) {
            sfx.playClick();
            showDigitalAdmissionPass(reg);
          }
        };
        card.addEventListener('click', openPass);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPass();
          }
        });
      });

      eventsGrid.querySelectorAll('.dash-view-pass-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const reg = state.registeredEvents.find(r => r.id === btn.dataset.passId);
          if (reg) {
            sfx.playClick();
            showDigitalAdmissionPass(reg);
          }
        });
      });

      eventsGrid.querySelectorAll('.dash-cancel-reg-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          sfx.playClick();
          const bar = eventsGrid.querySelector(`.dash-cancel-confirm-bar[data-confirm-for="${CSS.escape(btn.dataset.cancelId)}"]`);
          if (bar) bar.classList.remove('hidden');
        });
      });

      eventsGrid.querySelectorAll('.dash-cancel-confirm-bar').forEach(bar => {
        bar.addEventListener('click', (e) => e.stopPropagation());
      });

      eventsGrid.querySelectorAll('.dash-abort-cancel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          sfx.playClick();
          const bar = eventsGrid.querySelector(`.dash-cancel-confirm-bar[data-confirm-for="${CSS.escape(btn.dataset.abortId)}"]`);
          if (bar) bar.classList.add('hidden');
        });
      });

      eventsGrid.querySelectorAll('.dash-confirm-cancel-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          cancelRegistrationById(btn.dataset.confirmId);
        });
      });
    }
  }

  // 2. Verified Certificates
  const certsGrid = document.getElementById('dash-certs-grid');
  if (certsGrid) {
    certsGrid.innerHTML = user.certificates.map(cert => `
      <div class="dash-cert-card glass-panel p-6 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/60 hover:-translate-y-0.5 transition cursor-pointer relative flex flex-col justify-between" role="button" tabindex="0" data-cert-id="${escapeHtml(cert.id)}" title="Click to preview & download certificate">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              OFFICIAL CERTIFICATE
            </span>
            <span class="text-[11px] font-mono text-slate-400">${escapeHtml(cert.certNumber)}</span>
          </div>
          <h4 class="text-base font-bold font-display text-white">${escapeHtml(cert.title)}</h4>
          <p class="text-xs text-purple-300 font-mono mt-1">${escapeHtml(cert.event)}</p>
          <p class="text-xs text-slate-300 mt-2 leading-relaxed">${escapeHtml(cert.description)}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
          <div class="flex items-center gap-3">
            <span>Issued: ${escapeHtml(cert.issueDate)}</span>
            <span class="text-emerald-400 font-mono flex items-center gap-1">
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Verified
            </span>
          </div>
          <button type="button" class="dash-download-cert-btn px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600/80 to-cyan-600/80 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-[11px] flex items-center gap-1.5 shadow-sm transition" data-cert-id="${escapeHtml(cert.id)}">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span>Download Certificate</span>
          </button>
        </div>
      </div>
    `).join('');

    certsGrid.querySelectorAll('.dash-cert-card').forEach(card => {
      const openPreview = () => {
        const cert = user.certificates.find(c => c.id === card.dataset.certId);
        if (cert) {
          sfx.playClick();
          openCertificateModal(cert, false);
        }
      };
      card.addEventListener('click', openPreview);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPreview();
        }
      });
    });

    certsGrid.querySelectorAll('.dash-download-cert-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const cert = user.certificates.find(c => c.id === btn.dataset.certId);
        if (cert) {
          sfx.playSuccess();
          openCertificateModal(cert, true);
        }
      });
    });
  }

  // 3. Activity History
  const historyList = document.getElementById('dash-history-list');
  if (historyList) {
    historyList.innerHTML = user.activityLog.map(act => `
      <div class="flex items-center justify-between p-3 rounded-xl bg-surface border border-white/5 text-xs">
        <div class="flex items-center gap-2.5">
          <i data-lucide="arrow-right-circle" class="w-4 h-4 text-purple-400"></i>
          <span class="text-slate-200">${act.action}</span>
        </div>
        <div class="flex items-center gap-3 font-mono">
          <span class="text-slate-500 text-[11px]">${act.date}</span>
          <span class="text-cyan-400 font-semibold">${act.pts}</span>
        </div>
      </div>
    `).join('');
  }

  initIcons();
  bindDashboardTabs();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function activateDashboardTab(tab) {
  document.querySelectorAll('.dash-tab-btn').forEach(b => {
    const isTarget = b.dataset.dashtab === tab;
    b.classList.toggle('text-white', isTarget);
    b.classList.toggle('bg-purple-600', isTarget);
    b.classList.toggle('text-slate-400', !isTarget);
    b.classList.toggle('hover:text-white', !isTarget);
  });

  document.querySelectorAll('.dashtab-content').forEach(c => c.classList.add('hidden'));
  const activeContent = document.getElementById(`dashtab-${tab}`);
  if (activeContent) activeContent.classList.remove('hidden');
}

function bindDashboardTabs() {
  document.querySelectorAll('.dash-tab-btn').forEach(btn => {
    btn.onclick = () => {
      sfx.playClick();
      activateDashboardTab(btn.dataset.dashtab);
    };
  });

  const logoutBtn = document.getElementById('dashboard-logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      sfx.playClick();
      state.currentUser = null;
      localStorage.removeItem('infinity_current_user');
      updateAuthUi();
      alert('Logged out from demo session. You can sign in anytime via the top navigation.');
    };
  }
}

// -----------------------------------------------------------------------------
// 13. Leaderboard Module
// -----------------------------------------------------------------------------
function renderLeaderboard() {
  const tbody = document.getElementById('leaderboard-table-body');
  if (!tbody) return;

  tbody.innerHTML = LEADERBOARD.map(item => {
    let rankBadge = `<span class="font-mono text-slate-400">${item.rank}</span>`;
    if (item.rank === 1) rankBadge = `<span class="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 inline-flex items-center justify-center font-bold">1</span>`;
    if (item.rank === 2) rankBadge = `<span class="w-6 h-6 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/40 inline-flex items-center justify-center font-bold">2</span>`;
    if (item.rank === 3) rankBadge = `<span class="w-6 h-6 rounded-full bg-amber-700/20 text-amber-500 border border-amber-700/40 inline-flex items-center justify-center font-bold">3</span>`;

    return `
      <tr class="hover:bg-white/[0.02] transition">
        <td class="py-3.5 px-4">${rankBadge}</td>
        <td class="py-3.5 px-4">
          <div class="font-bold text-white font-display">${item.name}</div>
          <div class="text-[10px] text-purple-300 font-mono">${item.badge}</div>
        </td>
        <td class="py-3.5 px-4 text-slate-400 hidden sm:table-cell font-mono">${item.course}</td>
        <td class="py-3.5 px-4 hidden md:table-cell">
          <span class="px-2 py-0.5 rounded-full bg-surface border border-white/10 text-cyan-400 text-[10px] font-mono">
            ${item.domain}
          </span>
        </td>
        <td class="py-3.5 px-4 text-center font-mono text-slate-300">${item.events}</td>
        <td class="py-3.5 px-4 text-right font-mono font-bold text-cyan-400">${item.points} pts</td>
      </tr>
    `;
  }).join('');
}

function bindLeaderboardFilters() {
  document.querySelectorAll('.lb-time-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playClick();
      document.querySelectorAll('.lb-time-filter').forEach(b => {
        b.className = 'lb-time-filter px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition';
      });
      btn.className = 'lb-time-filter px-4 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 text-white transition';
      state.leaderboardTimeframe = btn.dataset.lbtime;
      renderLeaderboard();
    });
  });
}

// -----------------------------------------------------------------------------
// 14. Contact Form Module
// -----------------------------------------------------------------------------
function bindContactForm() {
  const form = document.getElementById('contact-message-form');
  const successState = document.getElementById('contact-success-state');
  const errorBox = document.getElementById('contact-error-state');
  const errorText = document.getElementById('contact-error-text');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form) return;

  const showError = (msg) => {
    if (errorText) errorText.textContent = msg;
    if (errorBox) errorBox.classList.remove('hidden');
  };
  const clearError = () => {
    if (errorText) errorText.textContent = '';
    if (errorBox) errorBox.classList.add('hidden');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearError();

    const name = (document.getElementById('contact-name')?.value || '').trim();
    const email = (document.getElementById('contact-email')?.value || '').trim();
    const subject = (document.getElementById('contact-subject')?.value || '').trim();
    const message = (document.getElementById('contact-message')?.value || '').trim();

    if (!name || !email || !subject || !message) {
      showError('Please fill in your name, email, subject, and message.');
      return;
    }
    if (!EMAIL_FORMAT_REGEX.test(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    const originalHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';
    }

    try {
      await submitContactInquiry({ name, email, subject, message });
    } catch (err) {
      showError(err?.message || 'Unable to send your message right now. Please try again.');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }

    sfx.playSuccess();
    form.classList.add('hidden');
    successState.classList.remove('hidden');

    setTimeout(() => {
      form.reset();
      form.classList.remove('hidden');
      successState.classList.add('hidden');
    }, 5000);
  });
}

// -----------------------------------------------------------------------------
// 14B. Upcoming Event Registration Form & Validation
// -----------------------------------------------------------------------------
const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function populateUpcomingEventOptions(selectedEventId = '') {
  const eventSelect = document.getElementById('evreg-event');
  if (!eventSelect) return;

  const upcomingEvents = EVENTS.filter(e => e.type === 'upcoming');
  eventSelect.innerHTML = [
    '<option value="">-- Choose an upcoming event --</option>',
    ...upcomingEvents.map(evt => `<option value="${escapeHtml(evt.id)}">${escapeHtml(evt.title)} (${escapeHtml(evt.displayDate)})</option>`)
  ].join('');

  if (selectedEventId && upcomingEvents.some(e => e.id === selectedEventId)) {
    eventSelect.value = selectedEventId;
  } else {
    eventSelect.value = '';
  }
}

function showEventRegistrationError(message) {
  const errorBox = document.getElementById('evreg-error-box');
  const errorText = document.getElementById('evreg-error-text');
  if (errorText) errorText.textContent = message;
  if (errorBox) errorBox.classList.remove('hidden');
}

function clearEventRegistrationError() {
  const errorBox = document.getElementById('evreg-error-box');
  const errorText = document.getElementById('evreg-error-text');
  if (errorText) errorText.textContent = '';
  if (errorBox) errorBox.classList.add('hidden');
}

function generateTicketCode(category = 'INF') {
  const prefix = String(category).toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 4) || 'INF';
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let token = '';
  for (let i = 0; i < 6; i += 1) {
    token += chars[Math.floor(Math.random() * chars.length)];
  }
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return {
    ticketCode: `TKT-${prefix}-${token}-${suffix}`,
    passRef: `INF-2027-${suffix}`
  };
}

function generateTicketQrSvg(seedText) {
  const size = 11;
  let hash = 2166136261;
  for (let i = 0; i < seedText.length; i += 1) {
    hash ^= seedText.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const nextBit = () => {
    hash ^= hash << 13;
    hash ^= hash >>> 17;
    hash ^= hash << 5;
    return (hash >>> 0) % 10 < 5;
  };

  const rects = [];
  const drawFinder = (ox, oy, innerColor) => {
    rects.push(`<rect x="${ox}" y="${oy}" width="3" height="3" rx="0.45" fill="none" stroke="#1E1B4B" stroke-width="0.65"/>`);
    rects.push(`<rect x="${ox + 0.9}" y="${oy + 0.9}" width="1.2" height="1.2" rx="0.2" fill="${innerColor}"/>`);
  };

  // Three corner finder patterns in INFINITY violet & cyan accents
  drawFinder(0.35, 0.35, '#7C3AED');
  drawFinder(size - 3.35, 0.35, '#0891B2');
  drawFinder(0.35, size - 3.35, '#7C3AED');

  // Center emblem square
  rects.push(`<rect x="4.6" y="4.6" width="1.8" height="1.8" rx="0.35" fill="#7C3AED"/>`);

  // Deterministic data modules avoiding finder zones and center glyph
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const inTopLeft = x < 4 && y < 4;
      const inTopRight = x >= size - 4 && y < 4;
      const inBottomLeft = x < 4 && y >= size - 4;
      const inCenter = x >= 4 && x <= 6 && y >= 4 && y <= 6;
      if (inTopLeft || inTopRight || inBottomLeft || inCenter) continue;

      if (nextBit()) {
        const fill = (x + y) % 3 === 0 ? '#7C3AED' : ((x + y) % 5 === 0 ? '#0891B2' : '#1E1B4B');
        rects.push(`<rect x="${x + 0.15}" y="${y + 0.15}" width="0.78" height="0.78" rx="0.16" fill="${fill}"/>`);
      }
    }
  }

  return `<svg viewBox="0 0 ${size} ${size}" class="w-full h-full" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision">${rects.join('')}</svg>`;
}

let activePassRegistrationId = null;

function isSavedRegistration(registrationId) {
  if (!registrationId) return false;
  return loadSavedRegistrations().some(reg => reg.id === registrationId);
}

function cancelRegistrationById(registrationId) {
  if (!registrationId) return false;
  const saved = loadSavedRegistrations();
  const target = saved.find(reg => reg.id === registrationId);
  const next = saved.filter(reg => reg.id !== registrationId);
  if (next.length === saved.length) return false;

  saveRegistrationsToStorage(next);
  syncRegisteredEventsState();
  sfx.playClick();
  renderDashboard();
  renderEvents();

  if (target?.passToken && target?.ticketCode) {
    cancelEventRegistrationInDb({
      passToken: target.passToken,
      ticketCode: target.ticketCode
    }).catch(() => {});
  }

  if (activePassRegistrationId === registrationId) {
    activePassRegistrationId = null;
  }
  return true;
}

function showDigitalAdmissionPass(reg) {
  const modal = document.getElementById('event-reg-modal');
  const formHeader = document.getElementById('evreg-form-header');
  const form = document.getElementById('event-registration-form');
  const successPanel = document.getElementById('evreg-success-panel');
  const cancelBtn = document.getElementById('evreg-cancel-reg-btn');
  const cancelConfirmBox = document.getElementById('evreg-cancel-confirm-box');
  if (!modal || !successPanel) return;

  activePassRegistrationId = reg.id || null;

  const matchedEvent = EVENTS.find(e => e.id === (reg.eventId || reg.id));
  const statusEl = document.getElementById('evreg-pass-status');
  const titleEl = document.getElementById('evreg-pass-title');
  const dateEl = document.getElementById('evreg-pass-date');
  const venueEl = document.getElementById('evreg-pass-venue');
  const attendeeEl = document.getElementById('evreg-pass-attendee');
  const emailEl = document.getElementById('evreg-pass-email');
  const refEl = document.getElementById('evreg-pass-ref');
  const qrEl = document.getElementById('evreg-pass-qr');
  const codeEl = document.getElementById('evreg-pass-code');

  const user = state.currentUser || DEMO_STUDENT;
  const statusLabel = reg.status || 'Confirmed';
  const attendeeName = reg.studentName || user.name || 'Registered Student';
  const attendeeEmail = reg.email || user.collegeEmail || 'student@sggscc.du.ac.in';
  const ticketCode = reg.ticketCode || 'TKT-INF-PASS';
  const passRef = reg.passRef || ticketCode.split('-').slice(-1)[0] || 'INF-PASS';
  const venue = reg.venue || matchedEvent?.venue || 'SGGSCC Campus, University of Delhi';

  if (statusEl) {
    statusEl.textContent = statusLabel;
    const isAttended = statusLabel.toLowerCase().includes('attended');
    statusEl.className = isAttended
      ? 'px-3 py-0.5 rounded-full text-[11px] font-semibold bg-cyan-500/15 border border-cyan-500/40 text-cyan-300'
      : 'px-3 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 border border-emerald-500/40 text-emerald-400';
  }

  if (titleEl) titleEl.textContent = reg.title || matchedEvent?.title || 'INFINITY Event';
  if (dateEl) dateEl.textContent = reg.date || matchedEvent?.displayDate || '';
  if (venueEl) venueEl.textContent = venue;
  if (attendeeEl) attendeeEl.textContent = attendeeName;
  if (emailEl) emailEl.textContent = attendeeEmail;
  if (refEl) refEl.textContent = passRef;
  if (qrEl) qrEl.innerHTML = generateTicketQrSvg(`${ticketCode}|${attendeeEmail}`);
  if (codeEl) codeEl.textContent = ticketCode;

  if (cancelConfirmBox) cancelConfirmBox.classList.add('hidden');
  if (cancelBtn) {
    cancelBtn.classList.toggle('hidden', !isSavedRegistration(activePassRegistrationId));
  }

  if (formHeader) formHeader.classList.add('hidden');
  if (form) form.classList.add('hidden');
  successPanel.classList.remove('hidden');
  modal.classList.remove('hidden');
  initIcons();
}

function openEventRegistrationModal(preselectedEventId = '') {
  const modal = document.getElementById('event-reg-modal');
  const formHeader = document.getElementById('evreg-form-header');
  const form = document.getElementById('event-registration-form');
  const successPanel = document.getElementById('evreg-success-panel');
  const nameInput = document.getElementById('evreg-name');
  const emailInput = document.getElementById('evreg-email');
  if (!modal || !form) return;

  sfx.playClick();
  populateUpcomingEventOptions(preselectedEventId);
  clearEventRegistrationError();

  if (formHeader) formHeader.classList.remove('hidden');
  form.classList.remove('hidden');
  if (successPanel) successPanel.classList.add('hidden');

  if (nameInput && !nameInput.value.trim() && state.currentUser?.name) {
    nameInput.value = state.currentUser.name;
  }
  if (emailInput && !emailInput.value.trim() && state.currentUser?.collegeEmail) {
    emailInput.value = state.currentUser.collegeEmail;
  }

  modal.classList.remove('hidden');
  initIcons();
}

function validateEventRegistration({ studentName, email, eventId }) {
  if (!studentName) {
    return 'Please enter your full name.';
  }
  if (!email) {
    return 'Please enter your student email address.';
  }
  if (!EMAIL_FORMAT_REGEX.test(email)) {
    return 'Please enter a valid email address (e.g. name@sggscc.du.ac.in).';
  }
  if (!eventId) {
    return 'Please select an upcoming event to register.';
  }

  const targetEvent = EVENTS.find(e => e.id === eventId && e.type === 'upcoming');
  if (!targetEvent) {
    return 'Selected event is not open for registration.';
  }

  const normalizedEmail = email.toLowerCase();
  const saved = loadSavedRegistrations();
  const duplicate = saved.some(
    reg => reg.eventId === eventId && String(reg.email || '').trim().toLowerCase() === normalizedEmail
  );
  if (duplicate) {
    return `You are already registered for "${targetEvent.title}" with ${email}.`;
  }

  return null;
}

function bindEventRegistrationForm() {
  const openBtn = document.getElementById('open-event-reg-btn');
  const dashMoreBtn = document.getElementById('dash-register-more-btn');
  const gotoMyRegsLink = document.getElementById('goto-my-registrations-link');
  const modal = document.getElementById('event-reg-modal');
  const formHeader = document.getElementById('evreg-form-header');
  const form = document.getElementById('event-registration-form');
  const successPanel = document.getElementById('evreg-success-panel');
  const doneBtn = document.getElementById('evreg-done-btn');
  const goDashboardBtn = document.getElementById('evreg-go-dashboard');
  const registerAnotherBtn = document.getElementById('evreg-register-another');
  const cancelRegBtn = document.getElementById('evreg-cancel-reg-btn');
  const cancelConfirmBox = document.getElementById('evreg-cancel-confirm-box');
  const confirmCancelBtn = document.getElementById('evreg-confirm-cancel-btn');
  const keepTicketBtn = document.getElementById('evreg-keep-ticket-btn');

  if (openBtn) {
    openBtn.addEventListener('click', () => openEventRegistrationModal());
  }
  if (dashMoreBtn) {
    dashMoreBtn.addEventListener('click', () => openEventRegistrationModal());
  }
  if (gotoMyRegsLink) {
    gotoMyRegsLink.addEventListener('click', () => activateDashboardTab('events'));
  }

  if (!form) return;

  ['evreg-name', 'evreg-email', 'evreg-event'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', clearEventRegistrationError);
      el.addEventListener('change', clearEventRegistrationError);
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearEventRegistrationError();

    const nameInput = document.getElementById('evreg-name');
    const emailInput = document.getElementById('evreg-email');
    const eventSelect = document.getElementById('evreg-event');
    const submitBtn = form.querySelector('button[type="submit"]');

    const studentName = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const eventId = eventSelect ? eventSelect.value : '';

    const validationError = validateEventRegistration({ studentName, email, eventId });
    if (validationError) {
      showEventRegistrationError(validationError);
      return;
    }

    const evt = EVENTS.find(item => item.id === eventId);
    const { ticketCode, passRef } = generateTicketCode(evt.category);
    const passToken = generateUuidV4();
    const newRegistration = {
      id: `${evt.id}-${Date.now()}`,
      passToken,
      eventId: evt.id,
      title: evt.title,
      date: evt.displayDate,
      venue: evt.venue || 'SGGSCC Campus & Virtual Sandbox',
      category: evt.categoryLabel,
      status: 'Confirmed',
      ticketCode,
      passRef,
      studentName,
      email,
      registeredAt: new Date().toISOString()
    };

    const originalHtml = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Registering...</span>';
    }

    try {
      await submitEventRegistration(newRegistration);
    } catch (err) {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }
      if (err?.status === 409 || err?.code === '23505') {
        showEventRegistrationError(`You are already registered for "${evt.title}" with ${email}.`);
      } else {
        showEventRegistrationError(err?.message || 'Unable to complete registration. Please try again.');
      }
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalHtml;
    }

    const existing = loadSavedRegistrations();
    existing.unshift(newRegistration);
    saveRegistrationsToStorage(existing);
    syncRegisteredEventsState();

    sfx.playSuccess();
    renderDashboard();
    renderEvents();
    showDigitalAdmissionPass(newRegistration);
  });

  if (doneBtn) {
    doneBtn.addEventListener('click', () => {
      sfx.playClick();
      if (modal) modal.classList.add('hidden');
    });
  }

  if (goDashboardBtn) {
    goDashboardBtn.addEventListener('click', () => {
      if (modal) modal.classList.add('hidden');
      activateDashboardTab('events');
    });
  }

  if (registerAnotherBtn) {
    registerAnotherBtn.addEventListener('click', () => {
      sfx.playClick();
      form.reset();
      populateUpcomingEventOptions();
      clearEventRegistrationError();
      if (cancelConfirmBox) cancelConfirmBox.classList.add('hidden');
      if (successPanel) successPanel.classList.add('hidden');
      if (formHeader) formHeader.classList.remove('hidden');
      form.classList.remove('hidden');
    });
  }

  if (cancelRegBtn) {
    cancelRegBtn.addEventListener('click', () => {
      sfx.playClick();
      if (cancelConfirmBox) cancelConfirmBox.classList.remove('hidden');
    });
  }

  if (keepTicketBtn) {
    keepTicketBtn.addEventListener('click', () => {
      sfx.playClick();
      if (cancelConfirmBox) cancelConfirmBox.classList.add('hidden');
    });
  }

  if (confirmCancelBtn) {
    confirmCancelBtn.addEventListener('click', () => {
      if (activePassRegistrationId) {
        cancelRegistrationById(activePassRegistrationId);
      }
      if (cancelConfirmBox) cancelConfirmBox.classList.add('hidden');
      if (modal) modal.classList.add('hidden');
    });
  }
}

// -----------------------------------------------------------------------------
// 14C. Event-Specific Verified Certificate Preview & PNG Export
// -----------------------------------------------------------------------------
let activeCertificate = null;

function getCertificateTheme(cert) {
  const key = `${cert.id || ''} ${cert.event || ''}`.toLowerCase();
  if (key.includes('cyber') || key.includes('security')) {
    return {
      wingLabel: 'CYBER DEFENSE & DIGITAL HYGIENE WING',
      icon: 'shield-check',
      bgGradient: 'from-[#04131E] via-[#091D2E] to-[#0B0920]',
      borderClass: 'border-cyan-400/50',
      innerBorderClass: 'border-emerald-400/35',
      pillClass: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300',
      accentTextClass: 'text-cyan-300',
      eventBoxClass: 'from-cyan-950/60 via-emerald-950/35 to-slate-900/60 border-cyan-400/40',
      sealClass: 'from-cyan-500 to-emerald-500',
      canvasBgTop: '#04131E',
      canvasBgMid: '#0A2234',
      canvasBgBottom: '#0B0920',
      primaryHex: '#22D3EE',
      secondaryHex: '#10B981',
      goldHex: '#FBBF24'
    };
  }
  if (key.includes('ai') || key.includes('prompt')) {
    return {
      wingLabel: 'GENERATIVE AI & PROMPT INNOVATION LAB',
      icon: 'sparkles',
      bgGradient: 'from-[#100626] via-[#1C0B3C] to-[#090B22]',
      borderClass: 'border-purple-400/55',
      innerBorderClass: 'border-pink-400/35',
      pillClass: 'bg-purple-500/15 border-purple-400/45 text-purple-200',
      accentTextClass: 'text-purple-300',
      eventBoxClass: 'from-purple-950/70 via-fuchsia-950/40 to-indigo-950/60 border-purple-400/45',
      sealClass: 'from-purple-500 via-fuchsia-500 to-cyan-400',
      canvasBgTop: '#100626',
      canvasBgMid: '#1F0C42',
      canvasBgBottom: '#090B22',
      primaryHex: '#C084FC',
      secondaryHex: '#F472B6',
      goldHex: '#FBBF24'
    };
  }
  return {
    wingLabel: 'INFINITY – THE TECH SOCIETY, SGGSCC',
    icon: 'award',
    bgGradient: 'from-[#09081E] via-[#121032] to-[#071426]',
    borderClass: 'border-indigo-400/50',
    innerBorderClass: 'border-cyan-400/35',
    pillClass: 'bg-indigo-500/15 border-indigo-400/40 text-indigo-200',
    accentTextClass: 'text-cyan-300',
    eventBoxClass: 'from-indigo-950/60 via-purple-950/40 to-cyan-950/40 border-indigo-400/40',
    sealClass: 'from-purple-500 to-cyan-500',
    canvasBgTop: '#09081E',
    canvasBgMid: '#131036',
    canvasBgBottom: '#071426',
    primaryHex: '#A78BFA',
    secondaryHex: '#22D3EE',
    goldHex: '#FBBF24'
  };
}

function renderCertificatePreviewHtml(cert, user) {
  const theme = getCertificateTheme(cert);
  const studentName = user.name || 'Student Participant';
  const studentMeta = `${user.course || 'University of Delhi'} • ${user.year || ''} • Roll: ${user.rollNo || 'SGGSCC'}`;

  return `
    <div class="relative bg-gradient-to-br ${theme.bgGradient} p-4 sm:p-7 text-white select-none overflow-hidden">
      <!-- Ambient cosmic radial accents -->
      <div class="pointer-events-none absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-25 blur-3xl" style="background:${theme.primaryHex};"></div>
      <div class="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl" style="background:${theme.secondaryHex};"></div>

      <!-- Outer & Inner Ornate Certificate Borders -->
      <div class="relative rounded-2xl border-2 ${theme.borderClass} p-2 sm:p-3 bg-black/20">
        <div class="relative rounded-xl border ${theme.innerBorderClass} px-5 py-7 sm:px-10 sm:py-9">
          <!-- Corner Filigree Accents -->
          <span class="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-amber-400/80 rounded-tl-md"></span>
          <span class="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-amber-400/80 rounded-tr-md"></span>
          <span class="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-amber-400/80 rounded-bl-md"></span>
          <span class="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-amber-400/80 rounded-br-md"></span>

          <!-- Crest Header -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-tr ${theme.sealClass} p-[2px] shadow-lg">
                <div class="w-full h-full rounded-[10px] bg-[#070616] flex items-center justify-center">
                  <span class="text-2xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">∞</span>
                </div>
              </div>
              <div class="text-center sm:text-left">
                <div class="text-sm font-bold font-display tracking-wide text-white">INFINITY • THE TECH SOCIETY</div>
                <div class="text-[11px] text-slate-300">Sri Guru Gobind Singh College of Commerce, DU</div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <span class="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border ${theme.pillClass} flex items-center gap-1.5">
                <i data-lucide="${theme.icon}" class="w-3.5 h-3.5"></i>
                <span>${escapeHtml(theme.wingLabel)}</span>
              </span>
              <div class="w-12 h-12 rounded-full bg-white/95 p-1 shadow-md shrink-0">
                <img src="assets/images/sggscc-logo.png" alt="SGGSCC Crest" class="w-full h-full object-contain">
              </div>
            </div>
          </div>

          <!-- Main Certificate Typography -->
          <div class="text-center py-6 sm:py-8 space-y-4">
            <div class="text-[11px] font-mono uppercase tracking-[0.28em] text-amber-300/90">
              Official Credential of Merit
            </div>
            <h4 class="text-2xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">
              ${escapeHtml(cert.title)}
            </h4>
            <p class="text-xs sm:text-sm text-slate-300 italic">This is proudly presented to</p>

            <div class="py-1">
              <div class="text-2xl sm:text-4xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-200">
                ${escapeHtml(studentName)}
              </div>
              <div class="w-56 h-[1.5px] mx-auto mt-2 bg-gradient-to-r from-transparent via-amber-400/75 to-transparent"></div>
              <div class="text-[11px] font-mono text-slate-400 mt-1.5">${escapeHtml(studentMeta)}</div>
            </div>

            <div class="max-w-xl mx-auto rounded-xl border bg-gradient-to-r ${theme.eventBoxClass} px-5 py-3">
              <div class="text-[10px] font-mono uppercase tracking-widest text-slate-300">Event / Program</div>
              <div class="text-sm sm:text-base font-bold ${theme.accentTextClass} mt-0.5">${escapeHtml(cert.event)}</div>
            </div>

            <p class="max-w-2xl mx-auto text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
              ${escapeHtml(cert.description)}
            </p>
          </div>

          <!-- Signatures & Official Verification Footer -->
          <div class="pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-5 items-center text-center">
            <div>
              <div class="font-display italic text-base text-cyan-200">Kulsehaj Singh</div>
              <div class="w-36 h-[1px] bg-white/25 mx-auto my-1.5"></div>
              <div class="text-[11px] font-semibold text-white">President, INFINITY</div>
              <div class="text-[10px] text-slate-400">SGGSCC Tech Society</div>
            </div>

            <div class="flex flex-col items-center">
              <div class="w-16 h-16 rounded-full bg-gradient-to-tr ${theme.sealClass} p-[2px] shadow-lg">
                <div class="w-full h-full rounded-full bg-[#09081C] border border-amber-400/60 flex flex-col items-center justify-center">
                  <i data-lucide="shield-check" class="w-5 h-5 text-amber-300"></i>
                  <span class="text-[8px] font-mono font-bold text-amber-200 uppercase mt-0.5">Verified</span>
                </div>
              </div>
              <div class="mt-2 text-[10px] font-mono text-cyan-300">${escapeHtml(cert.certNumber)}</div>
              <div class="text-[10px] text-slate-400">Issued: ${escapeHtml(cert.issueDate)}</div>
            </div>

            <div>
              <div class="font-display italic text-base text-purple-200">${escapeHtml(cert.issuer)}</div>
              <div class="w-40 h-[1px] bg-white/25 mx-auto my-1.5"></div>
              <div class="text-[11px] font-semibold text-white">Issuing Authority</div>
              <div class="text-[10px] text-slate-400">University of Delhi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function wrapCanvasText(ctx, text, maxWidth) {
  const words = String(text || '').split(/\s+/);
  const lines = [];
  let line = '';
  words.forEach(word => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  return lines;
}

async function downloadCertificatePng(cert) {
  const user = state.currentUser || DEMO_STUDENT;
  const theme = getCertificateTheme(cert);
  const canvas = document.createElement('canvas');
  canvas.width = 1600;
  canvas.height = 1130;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Background gradient
  const bg = ctx.createLinearGradient(0, 0, 1600, 1130);
  bg.addColorStop(0, theme.canvasBgTop);
  bg.addColorStop(0.5, theme.canvasBgMid);
  bg.addColorStop(1, theme.canvasBgBottom);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 1600, 1130);

  // Subtle ambient glow circles
  const glow1 = ctx.createRadialGradient(240, 160, 10, 240, 160, 420);
  glow1.addColorStop(0, `${theme.primaryHex}33`);
  glow1.addColorStop(1, 'transparent');
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, 1600, 1130);

  const glow2 = ctx.createRadialGradient(1360, 960, 10, 1360, 960, 420);
  glow2.addColorStop(0, `${theme.secondaryHex}2B`);
  glow2.addColorStop(1, 'transparent');
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, 1600, 1130);

  // 2. Double ornamental frame + corner flourishes
  ctx.strokeStyle = theme.primaryHex;
  ctx.lineWidth = 4;
  ctx.strokeRect(48, 48, 1504, 1034);

  ctx.strokeStyle = theme.secondaryHex;
  ctx.lineWidth = 1.8;
  ctx.strokeRect(72, 72, 1456, 986);

  ctx.strokeStyle = theme.goldHex;
  ctx.lineWidth = 4;
  const corners = [
    [88, 128, 88, 88, 128, 88],
    [1472, 88, 1512, 88, 1512, 128],
    [88, 1002, 88, 1042, 128, 1042],
    [1472, 1042, 1512, 1042, 1512, 1002]
  ];
  corners.forEach(([x1, y1, x2, y2, x3, y3]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke();
  });

  // 3. Header emblems: INFINITY badge on left, SGGSCC crest on right
  ctx.fillStyle = '#070616';
  ctx.beginPath();
  ctx.arc(165, 160, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = theme.primaryHex;
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = theme.primaryHex;
  ctx.font = 'bold 48px "Space Grotesk", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('∞', 165, 160);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 26px "Space Grotesk", Arial, sans-serif';
  ctx.fillText('INFINITY • THE TECH SOCIETY', 230, 154);
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '18px Inter, Arial, sans-serif';
  ctx.fillText('Sri Guru Gobind Singh College of Commerce, University of Delhi', 230, 184);

  // Load SGGSCC crest smoothly
  try {
    const logoImg = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = 'assets/images/sggscc-logo.png';
    });
    ctx.save();
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(1430, 162, 48, 0, Math.PI * 2);
    ctx.fill();
    ctx.clip();
    ctx.drawImage(logoImg, 1384, 116, 92, 92);
    ctx.restore();
  } catch (err) {
    // Keep clean typographic fallback if image loading fails offline
  }

  // Wing pill on top right
  ctx.fillStyle = theme.primaryHex;
  ctx.font = 'bold 16px "JetBrains Mono", monospace';
  ctx.textAlign = 'right';
  ctx.fillText(theme.wingLabel, 1358, 168);

  // Header divider
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(116, 232);
  ctx.lineTo(1484, 232);
  ctx.stroke();

  // 4. Title & Recipient
  ctx.textAlign = 'center';
  ctx.fillStyle = theme.goldHex;
  ctx.font = 'bold 18px "JetBrains Mono", monospace';
  ctx.fillText('O F F I C I A L   C R E D E N T I A L   O F   M E R I T', 800, 305);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 54px "Space Grotesk", Arial, sans-serif';
  ctx.fillText(String(cert.title || 'Verified Certificate').toUpperCase(), 800, 382);

  ctx.fillStyle = '#94A3B8';
  ctx.font = 'italic 24px Georgia, serif';
  ctx.fillText('This is proudly presented to', 800, 444);

  const studentGrad = ctx.createLinearGradient(500, 480, 1100, 540);
  studentGrad.addColorStop(0, '#FFFFFF');
  studentGrad.addColorStop(0.5, theme.primaryHex);
  studentGrad.addColorStop(1, theme.secondaryHex);
  ctx.fillStyle = studentGrad;
  ctx.font = 'bold 64px "Space Grotesk", Arial, sans-serif';
  ctx.fillText(user.name || 'Student Participant', 800, 526);

  ctx.strokeStyle = theme.goldHex;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(520, 548);
  ctx.lineTo(1080, 548);
  ctx.stroke();

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '19px "JetBrains Mono", monospace';
  ctx.fillText(`${user.course || 'B.Sc (Hons.) Computer Science'} • ${user.year || 'SGGSCC'} • Roll: ${user.rollNo || 'CS/24/089'}`, 800, 584);

  // Event Box
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.strokeStyle = theme.primaryHex;
  ctx.lineWidth = 2;
  ctx.fillRect(300, 624, 1000, 92);
  ctx.strokeRect(300, 624, 1000, 92);

  ctx.fillStyle = '#94A3B8';
  ctx.font = 'bold 14px "JetBrains Mono", monospace';
  ctx.fillText('FOR OUTSTANDING PARTICIPATION IN', 800, 654);

  ctx.fillStyle = theme.primaryHex;
  ctx.font = 'bold 28px "Space Grotesk", Arial, sans-serif';
  ctx.fillText(cert.event || 'INFINITY Official Event', 800, 694);

  // Description lines
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '24px Inter, Arial, sans-serif';
  const descLines = wrapCanvasText(ctx, cert.description, 1060);
  descLines.slice(0, 3).forEach((line, idx) => {
    ctx.fillText(line, 800, 774 + idx * 36);
  });

  // 5. Footer Signatures & Verification Seal
  ctx.strokeStyle = 'rgba(255,255,255,0.14)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(116, 892);
  ctx.lineTo(1484, 892);
  ctx.stroke();

  // Left signature
  ctx.fillStyle = theme.secondaryHex;
  ctx.font = 'italic 28px Georgia, serif';
  ctx.fillText('Kulsehaj Singh', 330, 956);
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.beginPath();
  ctx.moveTo(200, 974);
  ctx.lineTo(460, 974);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px Inter, Arial, sans-serif';
  ctx.fillText('President, INFINITY SGGSCC', 330, 1004);

  // Center seal
  ctx.beginPath();
  ctx.arc(800, 952, 42, 0, Math.PI * 2);
  ctx.fillStyle = '#09081C';
  ctx.fill();
  ctx.strokeStyle = theme.goldHex;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = theme.goldHex;
  ctx.font = 'bold 13px "JetBrains Mono", monospace';
  ctx.fillText('VERIFIED', 800, 956);

  ctx.fillStyle = theme.primaryHex;
  ctx.font = 'bold 17px "JetBrains Mono", monospace';
  ctx.fillText(cert.certNumber || 'INF/CERT/VERIFIED', 800, 1016);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '15px Inter, Arial, sans-serif';
  ctx.fillText(`Issued: ${cert.issueDate || '2025'}`, 800, 1040);

  // Right issuer
  ctx.fillStyle = theme.primaryHex;
  ctx.font = 'italic 22px Georgia, serif';
  const issuerShort = (cert.issuer || 'INFINITY SGGSCC').slice(0, 36);
  ctx.fillText(issuerShort, 1270, 956);
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.beginPath();
  ctx.moveTo(1110, 974);
  ctx.lineTo(1430, 974);
  ctx.stroke();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 18px Inter, Arial, sans-serif';
  ctx.fillText('Authorized Issuing Body', 1270, 1004);

  const safeSlug = String(cert.certNumber || cert.id || 'certificate').replace(/[^a-zA-Z0-9_-]+/g, '-');
  const filename = `INFINITY-Certificate-${safeSlug}.png`;
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  const statusBox = document.getElementById('cert-download-status');
  const statusText = document.getElementById('cert-download-status-text');
  if (statusText) statusText.textContent = `Downloaded "${filename}" for ${cert.event}.`;
  if (statusBox) statusBox.classList.remove('hidden');
}

function openCertificateModal(cert, triggerDownload = false) {
  const modal = document.getElementById('certificate-modal');
  const stage = document.getElementById('cert-preview-stage');
  const subtitle = document.getElementById('cert-modal-subtitle');
  const statusBox = document.getElementById('cert-download-status');
  if (!modal || !stage) return;

  activeCertificate = cert;
  const user = state.currentUser || DEMO_STUDENT;
  if (subtitle) {
    subtitle.textContent = `${cert.event} • Credential ID: ${cert.certNumber}`;
  }
  if (statusBox) statusBox.classList.add('hidden');

  stage.innerHTML = renderCertificatePreviewHtml(cert, user);
  modal.classList.remove('hidden');
  initIcons();

  if (triggerDownload) {
    downloadCertificatePng(cert);
  }
}

// -----------------------------------------------------------------------------
// 15. Global Modals (Auth, Event, Domain, Lightbox)
// -----------------------------------------------------------------------------
function bindModals() {
  // Auth Modal Triggers
  const authBtn = document.getElementById('auth-nav-btn');
  const mobileAuthBtn = document.getElementById('mobile-auth-btn');
  const authModal = document.getElementById('auth-modal');
  const closeAuth = document.getElementById('close-auth-modal');
  const quickDemoLogin = document.getElementById('quick-demo-login-btn');
  const loginForm = document.getElementById('login-form');

  function openAuth() {
    sfx.playClick();
    if (state.currentUser) {
      // If already logged in, navigate straight to dashboard
      window.location.hash = '#dashboard';
    } else {
      authModal.classList.remove('hidden');
    }
  }

  if (authBtn) authBtn.addEventListener('click', openAuth);
  if (mobileAuthBtn) mobileAuthBtn.addEventListener('click', openAuth);
  if (closeAuth) closeAuth.addEventListener('click', () => authModal.classList.add('hidden'));

  if (quickDemoLogin) {
    quickDemoLogin.addEventListener('click', () => {
      sfx.playSuccess();
      state.currentUser = DEMO_STUDENT;
      localStorage.setItem('infinity_current_user', JSON.stringify(DEMO_STUDENT));
      updateAuthUi();
      renderDashboard();
      authModal.classList.add('hidden');
      window.location.hash = '#dashboard';
    });
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sfx.playSuccess();
      state.currentUser = DEMO_STUDENT;
      localStorage.setItem('infinity_current_user', JSON.stringify(DEMO_STUDENT));
      updateAuthUi();
      renderDashboard();
      authModal.classList.add('hidden');
      window.location.hash = '#dashboard';
    });
  }

  // Close Event Modal
  const closeEvent = document.getElementById('close-event-modal');
  const eventModal = document.getElementById('event-modal');
  if (closeEvent && eventModal) {
    closeEvent.addEventListener('click', () => eventModal.classList.add('hidden'));
  }

  // Close Domain Modal
  const closeDomain = document.getElementById('close-domain-modal');
  const domainModal = document.getElementById('domain-modal');
  if (closeDomain && domainModal) {
    closeDomain.addEventListener('click', () => domainModal.classList.add('hidden'));
  }

  // Close Lightbox
  const closeLight = document.getElementById('close-lightbox');
  const lightModal = document.getElementById('lightbox-modal');
  if (closeLight && lightModal) {
    closeLight.addEventListener('click', () => lightModal.classList.add('hidden'));
  }

  // Close Upcoming Event Registration Modal
  const closeEventReg = document.getElementById('close-event-reg-modal');
  const eventRegModal = document.getElementById('event-reg-modal');
  if (closeEventReg && eventRegModal) {
    closeEventReg.addEventListener('click', () => eventRegModal.classList.add('hidden'));
  }

  // Verified Certificate Modal Controls
  const certificateModal = document.getElementById('certificate-modal');
  const closeCertModal = document.getElementById('close-certificate-modal');
  const certDownloadBtn = document.getElementById('cert-download-png-btn');
  const certPrintBtn = document.getElementById('cert-print-btn');

  if (closeCertModal && certificateModal) {
    closeCertModal.addEventListener('click', () => certificateModal.classList.add('hidden'));
  }
  if (certDownloadBtn) {
    certDownloadBtn.addEventListener('click', () => {
      if (activeCertificate) {
        sfx.playSuccess();
        downloadCertificatePng(activeCertificate);
      }
    });
  }
  if (certPrintBtn) {
    certPrintBtn.addEventListener('click', () => {
      const stage = document.getElementById('cert-preview-stage');
      if (!stage || !activeCertificate) return;
      sfx.playClick();
      const printWin = window.open('', '_blank', 'width=1100,height=780');
      if (!printWin) return;
      printWin.document.write(`<!DOCTYPE html><html><head><title>${escapeHtml(activeCertificate.title)} - INFINITY SGGSCC</title><script src="https://cdn.tailwindcss.com"><\/script><style>body{margin:0;background:#070616;padding:24px;}@media print{body{padding:0;}}</style></head><body>${stage.innerHTML}<script>setTimeout(()=>window.print(),400);<\/script></body></html>`);
      printWin.document.close();
    });
  }

  // Edit Student Profile Modal Controls
  const editProfileBtn = document.getElementById('dashboard-edit-btn');
  const editProfileModal = document.getElementById('edit-profile-modal');
  const closeEditProfileBtn = document.getElementById('close-edit-profile-modal');
  const editProfileForm = document.getElementById('edit-profile-form');
  const editProfileResetBtn = document.getElementById('editprof-reset-btn');
  const editProfErrorBox = document.getElementById('editprof-error-box');
  const editProfErrorText = document.getElementById('editprof-error-text');

  function clearEditProfileError() {
    if (editProfErrorText) editProfErrorText.textContent = '';
    if (editProfErrorBox) editProfErrorBox.classList.add('hidden');
  }

  function openEditProfileModal() {
    if (!editProfileModal) return;
    const user = state.currentUser || DEMO_STUDENT;
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };
    setVal('editprof-name', user.name);
    setVal('editprof-email', user.collegeEmail);
    setVal('editprof-course', user.course);
    setVal('editprof-year', user.year || '2nd Year');
    setVal('editprof-roll', user.rollNo || 'CS/24/089');
    setVal('editprof-tier', user.tier || 'Cyber Elite');
    setVal('editprof-bio', user.bio || '');
    clearEditProfileError();
    editProfileModal.classList.remove('hidden');
    initIcons();
  }

  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      sfx.playClick();
      openEditProfileModal();
    });
  }
  if (closeEditProfileBtn && editProfileModal) {
    closeEditProfileBtn.addEventListener('click', () => editProfileModal.classList.add('hidden'));
  }

  if (editProfileForm) {
    ['editprof-name', 'editprof-email', 'editprof-course'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', clearEditProfileError);
    });

    editProfileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearEditProfileError();

      const getVal = (id) => (document.getElementById(id)?.value || '').trim();
      const name = getVal('editprof-name');
      const collegeEmail = getVal('editprof-email');
      const course = getVal('editprof-course');
      const year = getVal('editprof-year') || '2nd Year';
      const rollNo = getVal('editprof-roll') || 'CS/24/089';
      const tier = getVal('editprof-tier') || 'Member';
      const bio = getVal('editprof-bio');

      if (!name) {
        if (editProfErrorText) editProfErrorText.textContent = 'Please enter your full name.';
        if (editProfErrorBox) editProfErrorBox.classList.remove('hidden');
        return;
      }
      if (!collegeEmail || !EMAIL_FORMAT_REGEX.test(collegeEmail)) {
        if (editProfErrorText) editProfErrorText.textContent = 'Please enter a valid college email address.';
        if (editProfErrorBox) editProfErrorBox.classList.remove('hidden');
        return;
      }
      if (!course) {
        if (editProfErrorText) editProfErrorText.textContent = 'Please enter your course or program.';
        if (editProfErrorBox) editProfErrorBox.classList.remove('hidden');
        return;
      }

      const baseUser = state.currentUser || DEMO_STUDENT;
      const updatedUser = {
        ...baseUser,
        name,
        collegeEmail,
        course,
        year,
        rollNo,
        tier,
        bio
      };

      const submitBtn = editProfileForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Saving...</span>';
      }

      try {
        await saveStudentProfileToDb({
          profileToken: getOrCreateProfileToken(),
          user: updatedUser
        });
      } catch (err) {
        if (editProfErrorText) editProfErrorText.textContent = err?.message || 'Unable to save profile to server right now.';
        if (editProfErrorBox) editProfErrorBox.classList.remove('hidden');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHtml;
      }

      state.currentUser = updatedUser;
      localStorage.setItem('infinity_current_user', JSON.stringify(updatedUser));
      sfx.playSuccess();
      updateAuthUi();
      renderDashboard();
      editProfileModal.classList.add('hidden');
    });
  }

  if (editProfileResetBtn) {
    editProfileResetBtn.addEventListener('click', () => {
      sfx.playClick();
      state.currentUser = { ...DEMO_STUDENT };
      localStorage.setItem('infinity_current_user', JSON.stringify(state.currentUser));
      updateAuthUi();
      renderDashboard();
      openEditProfileModal();
    });
  }

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [authModal, eventModal, domainModal, lightModal, eventRegModal, certificateModal, editProfileModal].forEach(m => {
        if (m) m.classList.add('hidden');
      });
    }
  });
}
