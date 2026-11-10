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

// Application State
const state = {
  activeEventFilter: 'all',
  eventSearchQuery: '',
  activeGalleryFilter: 'all',
  leaderboardTimeframe: 'overall',
  recruitmentCycle: 'open', // 'open' | 'closing' | 'closed' | 'soon'
  currentUser: null,
  registeredEvents: [...DEMO_STUDENT.registeredEvents]
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
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
    <div class="tilt-card glass-panel-glow rounded-3xl border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-purple-500/50 group">
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
          <div class="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
            <span class="flex items-center gap-1">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-purple-400"></i>
              <span>${evt.displayDate}</span>
            </span>
            <span class="text-cyan-400">${evt.categoryLabel}</span>
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
          <button class="event-register-btn px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition flex items-center gap-1.5" data-event-id="${evt.id}">
            <i data-lucide="ticket" class="w-3.5 h-3.5"></i>
            <span>Register (Demo)</span>
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

  document.querySelectorAll('.event-details-btn, .event-register-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.eventId;
      openEventModal(id);
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

  const isAlreadyRegistered = state.registeredEvents.some(r => r.id === evt.id);

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
            <span>${evt.type === 'upcoming' ? 'Register Now (Demo Pass)' : 'Claim Attendance (Demo)'}</span>
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
      sfx.playSuccess();
      const code = `INF-${evt.category.toUpperCase().slice(0, 4)}-${Math.floor(1000 + Math.random() * 9000)}`;
      state.registeredEvents.unshift({
        id: evt.id,
        title: evt.title,
        date: evt.displayDate,
        status: evt.type === 'upcoming' ? 'Confirmed (Demo)' : 'Attended',
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
    <div class="tilt-card glass-panel-glow p-5 rounded-3xl border border-white/10 flex flex-col justify-between transition-all duration-300 hover:border-purple-500/50 group text-center">
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
        <a href="${m.linkedin}" target="_blank" rel="noopener noreferrer" class="px-3 py-1 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-300 text-xs hover:text-white hover:bg-blue-900/60 transition flex items-center gap-1.5" title="Verified LinkedIn Profile">
          <i data-lucide="linkedin" class="w-3.5 h-3.5"></i>
          <span>Verified Profile</span>
        </a>
      </div>
    </div>
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

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sfx.playSuccess();

    const applicationData = {
      id: `INF-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: document.getElementById('rec-name').value,
      email: document.getElementById('rec-email').value,
      course: document.getElementById('rec-course').value,
      year: document.getElementById('rec-year').value,
      phone: document.getElementById('rec-phone').value,
      domain: document.getElementById('rec-domain').value,
      skills: document.getElementById('rec-skills').value,
      why: document.getElementById('rec-why').value,
      portfolio: document.getElementById('rec-portfolio').value,
      submittedAt: new Date().toISOString()
    };

    // Save to local storage for demo verification
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
    state.currentUser = JSON.parse(savedUser);
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
    if (navText) navText.textContent = 'Portal: Simranjeet';
    if (mobileNavText) mobileNavText.textContent = 'My Student Portal';
  } else {
    if (navText) navText.textContent = 'Login';
    if (mobileNavText) mobileNavText.textContent = 'Student Login';
  }
}

function renderDashboard() {
  const user = state.currentUser || DEMO_STUDENT;

  // Header data
  const nameEl = document.getElementById('dash-name');
  const courseEl = document.getElementById('dash-course-info');
  const emailEl = document.getElementById('dash-email');
  const bioEl = document.getElementById('dash-bio');
  const pointsEl = document.getElementById('dash-points');
  const rankEl = document.getElementById('dash-rank');
  const tierEl = document.getElementById('dash-tier');

  if (nameEl) nameEl.textContent = user.name;
  if (courseEl) courseEl.textContent = `${user.course} • ${user.year} • Roll: ${user.rollNo || 'CS/24/089'}`;
  if (emailEl) emailEl.textContent = user.collegeEmail;
  if (bioEl) bioEl.textContent = user.bio;
  if (pointsEl) pointsEl.textContent = user.points;
  if (rankEl) rankEl.textContent = `#${user.rank}`;
  if (tierEl) tierEl.textContent = user.tier;

  // 1. Registered events & digital tickets
  const eventsGrid = document.getElementById('dash-registered-events-grid');
  if (eventsGrid) {
    eventsGrid.innerHTML = state.registeredEvents.map(evt => `
      <div class="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-500/30">
              ${evt.category || 'Event'}
            </span>
            <span class="text-[10px] font-mono text-emerald-400">${evt.status}</span>
          </div>
          <h4 class="text-base font-bold font-display text-white">${evt.title}</h4>
          <p class="text-xs text-slate-400 mt-1 font-mono">${evt.date}</p>
        </div>

        <div class="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
          <div>
            <span class="text-[9px] text-slate-500 uppercase font-mono block">Digital Entry Pass</span>
            <span class="text-xs font-mono font-bold text-cyan-400">${evt.ticketCode}</span>
          </div>
          <div class="w-7 h-7 rounded-lg bg-surface border border-white/10 flex items-center justify-center text-slate-300" title="QR Validated Pass">
            <i data-lucide="qr-code" class="w-4 h-4"></i>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 2. Verified Certificates
  const certsGrid = document.getElementById('dash-certs-grid');
  if (certsGrid) {
    certsGrid.innerHTML = user.certificates.map(cert => `
      <div class="glass-panel p-6 rounded-2xl border border-cyan-500/20 relative">
        <div class="flex items-center justify-between mb-3">
          <span class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
            OFFICIAL CERTIFICATE
          </span>
          <span class="text-[11px] font-mono text-slate-400">${cert.certNumber}</span>
        </div>
        <h4 class="text-base font-bold font-display text-white">${cert.title}</h4>
        <p class="text-xs text-purple-300 font-mono mt-1">${cert.event}</p>
        <p class="text-xs text-slate-300 mt-2 leading-relaxed">${cert.description}</p>
        <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
          <span>Issued: ${cert.issueDate}</span>
          <span class="text-emerald-400 font-mono flex items-center gap-1">
            <i data-lucide="shield-check" class="w-3.5 h-3.5"></i> Verified
          </span>
        </div>
      </div>
    `).join('');
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

function bindDashboardTabs() {
  document.querySelectorAll('.dash-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playClick();
      const tab = btn.dataset.dashtab;

      document.querySelectorAll('.dash-tab-btn').forEach(b => {
        b.className = 'dash-tab-btn px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition';
      });
      btn.className = 'dash-tab-btn px-4 py-2 rounded-lg text-xs font-semibold text-white bg-purple-600 transition';

      document.querySelectorAll('.dashtab-content').forEach(c => c.classList.add('hidden'));
      const activeContent = document.getElementById(`dashtab-${tab}`);
      if (activeContent) activeContent.classList.remove('hidden');
    });
  });

  const logoutBtn = document.getElementById('dashboard-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sfx.playClick();
      state.currentUser = null;
      localStorage.removeItem('infinity_current_user');
      updateAuthUi();
      alert('Logged out from demo session. You can sign in anytime via the top navigation.');
    });
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

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
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

  // Escape key closes modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [authModal, eventModal, domainModal, lightModal].forEach(m => {
        if (m) m.classList.add('hidden');
      });
    }
  });
}
