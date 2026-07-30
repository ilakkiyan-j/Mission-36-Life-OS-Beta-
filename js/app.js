(function () {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const dotNav = document.getElementById('dot-nav');
  const settingsBtn = document.getElementById('settings-btn');
  const settingsModal = document.getElementById('settings-modal');
  const modalClose = document.getElementById('modal-close');
  const saveSettings = document.getElementById('save-settings');
  const clearDataBtn = document.getElementById('clear-data');
  const syncStatus = document.getElementById('sync-status');
  const themeToggle = document.getElementById('theme-toggle');
  const toastContainer = document.getElementById('toast-container');
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');

  let currentDay = getCurrentDay();

  function getCurrentDay() {
    const start = new Date('2026-08-03');
    const now = new Date();
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    return Math.min(Math.max(diff + 1, 1), 36);
  }

  // Navbar scroll effect
  function onScroll() {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
  }

  // Mobile nav
  function toggleNav() {
    navLinks.classList.toggle('open');
  }

  function closeNav() {
    navLinks.classList.remove('open');
  }

  // Dot nav active state
  function updateDotNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.id;
    });
    document.querySelectorAll('.dot').forEach((dot) => {
      dot.classList.toggle('active', dot.dataset.section === current);
    });
    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  // Settings modal
  function openSettings() {
    settingsModal.classList.add('open');
    document.getElementById('github-token').value = localStorage.getItem('gh_token') || '';
    document.getElementById('github-repo').value = localStorage.getItem('gh_repo') || '';
  }

  function closeSettings() {
    settingsModal.classList.remove('open');
  }

  function saveSettingsHandler() {
    const token = document.getElementById('github-token').value.trim();
    const repo = document.getElementById('github-repo').value.trim();
    if (token) localStorage.setItem('gh_token', token);
    else localStorage.removeItem('gh_token');
    if (repo) localStorage.setItem('gh_repo', repo);
    else localStorage.removeItem('gh_repo');
    closeSettings();
    showToast('Settings saved', 'success');
    if (typeof window.MissionData !== 'undefined') window.MissionData.init();
  }

  function clearLocalData() {
    if (!confirm('Clear all local data? This cannot be undone.')) return;
    localStorage.clear();
    showToast('Local data cleared', 'info');
    closeSettings();
    location.reload();
  }

  // Toast
  window.showToast = function (message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  // Sync status indicator
  window.setSyncStatus = function (status) {
    syncStatus.textContent = status;
    syncStatus.className = 'sync-status';
    if (status === 'Offline') syncStatus.classList.add('offline');
    if (status === 'Error') syncStatus.classList.add('error');
  };

  // Day navigation
  function setCurrentDay(day) {
    currentDay = Math.min(Math.max(day, 1), 36);
    renderChecklist();
    renderTodos();
  }

  document.getElementById('prev-day').addEventListener('click', () => setCurrentDay(currentDay - 1));
  document.getElementById('next-day').addEventListener('click', () => setCurrentDay(currentDay + 1));

  // Checklist
  function renderChecklist() {
    document.getElementById('current-day-num').textContent = currentDay;
    const template = typeof window.MissionData !== 'undefined' ? window.MissionData.getChecklistTemplate(currentDay) : null;
    const titleEl = document.getElementById('current-day-title');
    if (titleEl) titleEl.textContent = template ? template.title : '--';

    const dayChecklistEl = document.getElementById('day-checklist');
    if (!dayChecklistEl) return;

    const progress = typeof window.MissionData !== 'undefined' ? window.MissionData.getDayProgress(currentDay) : { completed: [] };
    const completedSet = new Set(progress.completed || []);

    let html = '';

    if (template && template.sections) {
      template.sections.forEach((section, sIdx) => {
        html += `<div class="day-category"><div class="category-title">${escapeHtml(section.name)}</div><ul class="day-checklist">`;
        section.tasks.forEach((task, tIdx) => {
          const id = `d${currentDay}-${sIdx}-${tIdx}`;
          const checked = completedSet.has(id) ? 'checked' : '';
          html += `<li><label><input type="checkbox" value="${id}" ${checked}><span>${escapeHtml(task)}</span></label></li>`;
        });
        html += `</ul></div>`;
      });
    }

    dayChecklistEl.innerHTML = html;

    dayChecklistEl.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.addEventListener('change', (e) => {
        const itemId = e.target.value;
        const checked = e.target.checked;
        if (typeof window.MissionData !== 'undefined') {
          window.MissionData.toggleChecklistItem(currentDay, itemId, checked);
        }
      });
    });
  }

  // Todo
  function renderTodos() {
    const todos = [];
    if (typeof window.MissionData !== 'undefined' && window.MissionData.todos) {
      const dayTodos = window.MissionData.todos[currentDay];
      if (dayTodos) todos.push(...dayTodos);
    }
    todoList.innerHTML = '';
    todos.forEach((todo) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="todo-item ${todo.done ? 'done' : ''}">
          <input type="checkbox" ${todo.done ? 'checked' : ''} data-id="${todo.id}">
          <span>${escapeHtml(todo.text)}</span>
        </div>
        <button class="todo-delete" data-id="${todo.id}" aria-label="Delete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      `;
      todoList.appendChild(li);
    });
  }

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;
    if (typeof window.MissionData !== 'undefined') {
      window.MissionData.addTodo(currentDay, text);
    }
    todoInput.value = '';
  });

  todoList.addEventListener('click', (e) => {
    const deleteBtn = e.target.closest('.todo-delete');
    if (deleteBtn) {
      const id = deleteBtn.dataset.id;
      if (typeof window.MissionData !== 'undefined') window.MissionData.deleteTodo(currentDay, id);
      return;
    }
    const checkbox = e.target.closest('input[type="checkbox"]');
    if (checkbox) {
      const id = checkbox.dataset.id;
      if (typeof window.MissionData !== 'undefined') window.MissionData.toggleTodo(currentDay, id, checkbox.checked);
    }
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Count-up animation
  function animateCounters() {
    document.querySelectorAll('.stat-value[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      const duration = 2000;
      const start = performance.now();
      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    });
  }

  function updateMissionControl() {
    const now = new Date();
    const ai200 = new Date('2026-08-27');
    const ibm = new Date('2026-09-07');
    const ai200Days = Math.max(0, Math.floor((ai200 - now) / (1000 * 60 * 60 * 24)));
    const ibmDays = Math.max(0, Math.floor((ibm - now) / (1000 * 60 * 60 * 24)));
    const ai200El = document.getElementById('mc-ai200-days');
    const ibmEl = document.getElementById('mc-ibm-days');
    if (ai200El) ai200El.textContent = ai200Days;
    if (ibmEl) ibmEl.textContent = ibmDays;
  }

  // Notes Manager
  const NotesManager = {
    STORAGE_KEY: 'mission36_notes',

    load() {
      try {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {};
      } catch { return {}; }
    },

    saveAll(notes) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(notes));
    },

    get(cardId) {
      return this.load()[cardId] || '';
    },

    set(cardId, text) {
      const notes = this.load();
      notes[cardId] = text;
      this.saveAll(notes);
    },

    clear(cardId) {
      const notes = this.load();
      delete notes[cardId];
      this.saveAll(notes);
    },

    init() {
      const notes = this.load();
      document.querySelectorAll('.notes-toggle').forEach((btn) => {
        const cardId = btn.dataset.card;
        const container = document.getElementById('notes-' + cardId);
        const textarea = container ? container.querySelector('.notes-textarea') : null;
        if (!container || !textarea) return;

        if (notes[cardId]) textarea.value = notes[cardId];

        btn.addEventListener('click', () => {
          const isOpen = container.classList.contains('open');
          container.classList.toggle('open');
          if (!isOpen) textarea.focus();
        });

        textarea.addEventListener('input', () => {
          this.set(cardId, textarea.value);
        });
      });

      document.querySelectorAll('.notes-clear').forEach((btn) => {
        btn.addEventListener('click', () => {
          const cardId = btn.dataset.card;
          const container = document.getElementById('notes-' + cardId);
          const textarea = container ? container.querySelector('.notes-textarea') : null;
          if (textarea) textarea.value = '';
          this.clear(cardId);
        });
      });
    }
  };

  // Global Notes Panel
  const GlobalNotesPanel = window.GlobalNotesPanel = {
    overlay: null,
    panel: null,
    textarea: null,
    btn: null,
    closeBtn: null,

    init() {
      this.overlay = document.getElementById('notes-overlay');
      this.panel = document.getElementById('notes-panel');
      this.textarea = document.getElementById('notes-panel-textarea');
      this.btn = document.getElementById('notes-toggle');
      this.closeBtn = document.getElementById('notes-panel-close');
      if (!this.overlay || !this.textarea) return;

      this.load();

      this.btn.addEventListener('click', () => this.open());
      this.closeBtn.addEventListener('click', () => this.close());
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.close();
      });

      this.textarea.addEventListener('input', () => {
        if (typeof window.MissionData !== 'undefined') {
          window.MissionData.setGlobalNotes(this.textarea.value);
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.overlay.classList.contains('open')) this.close();
      });
    },

    load() {
      if (typeof window.MissionData !== 'undefined') {
        this.textarea.value = window.MissionData.getGlobalNotes();
      }
    },

    open() {
      this.overlay.classList.add('open');
      setTimeout(() => this.textarea.focus(), 350);
    },

    close() {
      this.overlay.classList.remove('open');
    }
  };

  // Theme toggle
  function initTheme() {
    const saved = localStorage.getItem('mission36_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
  }

  function applyTheme(theme) {
    const body = document.body;
    const sun = document.querySelector('.icon-sun');
    const moon = document.querySelector('.icon-moon');
    if (theme === 'light') {
      body.classList.add('light');
      if (sun) sun.style.display = 'none';
      if (moon) moon.style.display = 'block';
    } else {
      body.classList.remove('light');
      if (sun) sun.style.display = 'block';
      if (moon) moon.style.display = 'none';
    }
  }

  function toggleTheme() {
    const isLight = document.body.classList.contains('light');
    const newTheme = isLight ? 'dark' : 'light';
    localStorage.setItem('mission36_theme', newTheme);
    applyTheme(newTheme);
  }

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // Event Listeners
  window.addEventListener('scroll', () => {
    onScroll();
    updateDotNav();
  });
  navToggle.addEventListener('click', toggleNav);
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  settingsBtn.addEventListener('click', openSettings);
  modalClose.addEventListener('click', closeSettings);
  settingsModal.addEventListener('click', (e) => { if (e.target === settingsModal) closeSettings(); });
  saveSettings.addEventListener('click', saveSettingsHandler);
  clearDataBtn.addEventListener('click', clearLocalData);

  // Expose UI methods for data.js
  window.MissionUI = { renderChecklist, renderTodos, animateCounters, setSyncStatus, setCurrentDay };

  // Init
  onScroll();
  updateDotNav();
  updateMissionControl();
  setCurrentDay(currentDay);
  initTheme();
  NotesManager.init();
  GlobalNotesPanel.init();
})();
