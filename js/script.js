// === CONSTANTS ===

const STORAGE_KEY_TASKS    = 'dashboard_tasks';
const STORAGE_KEY_LINKS    = 'dashboard_links';
const STORAGE_KEY_NAME     = 'dashboard_name';
const STORAGE_KEY_THEME    = 'dashboard_theme';
const STORAGE_KEY_DURATION = 'dashboard_duration';
const TIMER_DURATION       = 25 * 60; // seconds — fallback default

// === STORAGE HELPERS ===

function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// === NOTIFICATION ===

const notificationEl = document.querySelector('#notification');
let notificationTimer = null;

function showNotification(message, type) {
  // type: 'success' (default) or 'error'
  clearTimeout(notificationTimer);
  notificationEl.textContent = message;
  notificationEl.className   = type === 'error' ? 'show error' : 'show';
  notificationTimer = setTimeout(function() {
    notificationEl.className = '';
  }, 3000);
}

// === CLOCK ===

const greetingEl = document.querySelector('#greeting');
const clockEl    = document.querySelector('#clock');
const dateEl     = document.querySelector('#date');

function getGreeting(hour, name) {
  let base;
  if (hour >= 5  && hour < 12) base = 'Good Morning';
  else if (hour >= 12 && hour < 18) base = 'Good Afternoon';
  else if (hour >= 18 && hour < 21) base = 'Good Evening';
  else base = 'Good Night';
  return name ? `${base}, ${name}` : base;
}

function updateClock() {
  const now = new Date();
  const h   = String(now.getHours()).padStart(2, '0');
  const m   = String(now.getMinutes()).padStart(2, '0');
  const s   = String(now.getSeconds()).padStart(2, '0');

  clockEl.textContent    = `${h}:${m}:${s}`;
  dateEl.textContent     = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  });
  const savedName = localStorage.getItem(STORAGE_KEY_NAME) || '';
  greetingEl.textContent = getGreeting(now.getHours(), savedName.trim());
}

// === TIMER ===

const timerDisplay  = document.querySelector('#timer-display');
const timerStartBtn = document.querySelector('#timer-start');
const timerStopBtn  = document.querySelector('#timer-stop');
const timerResetBtn = document.querySelector('#timer-reset');

let timerSeconds  = TIMER_DURATION; // current countdown value in seconds
let timerInterval = null;           // setInterval reference; null means not running

// Returns the saved custom duration in seconds, or the default (25 min).
function getTimerDuration() {
  const saved = parseInt(localStorage.getItem(STORAGE_KEY_DURATION), 10);
  if (Number.isInteger(saved) && saved >= 1 && saved <= 180) {
    return saved * 60;
  }
  return TIMER_DURATION;
}

function formatTime(secs) {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateTimerDisplay() {
  timerDisplay.textContent = formatTime(timerSeconds);
}

function startTimer() {
  // Guard: do nothing if already running or finished
  if (timerInterval !== null || timerSeconds === 0) return;

  timerInterval = setInterval(tickTimer, 1000);
  timerStartBtn.disabled = true;
  timerStopBtn.disabled  = false;
}

function tickTimer() {
  timerSeconds -= 1;
  updateTimerDisplay();

  if (timerSeconds === 0) {
    handleTimerDone();
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerStartBtn.disabled = false;
  timerStopBtn.disabled  = true;
}

function handleTimerDone() {
  clearInterval(timerInterval);
  timerInterval = null;
  timerStartBtn.disabled = true;
  timerStopBtn.disabled  = true;
  updateTimerDisplay(); // ensures display shows 00:00
}

function resetTimer() {
  stopTimer();               // clears any running interval; re-enables Start
  timerSeconds = getTimerDuration();
  updateTimerDisplay();
}

// === TO-DO LIST ===

const todoInput   = document.querySelector('#todo-input');
const todoAddBtn  = document.querySelector('#todo-add');
const todoList    = document.querySelector('#todo-list');
const todoSort    = document.querySelector('#todo-sort');

let tasks        = [];
let currentSort  = 'newest'; // tracks active sort order

// Returns a sorted copy of tasks — never mutates the original array.
function getSortedTasks() {
  const copy = tasks.slice();
  if (currentSort === 'oldest') {
    copy.sort(function(a, b) { return Number(a.id) - Number(b.id); });
  } else if (currentSort === 'az') {
    copy.sort(function(a, b) { return a.text.localeCompare(b.text); });
  } else if (currentSort === 'za') {
    copy.sort(function(a, b) { return b.text.localeCompare(a.text); });
  } else {
    // newest (default): highest id first
    copy.sort(function(a, b) { return Number(b.id) - Number(a.id); });
  }
  return copy;
}

function renderTasks() {
  todoList.innerHTML = '';
  getSortedTasks().forEach(function(task) {
    todoList.appendChild(createTaskElement(task));
  });
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task-item' + (task.completed ? ' done' : '');
  li.dataset.id = task.id;

  // Checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.setAttribute('aria-label', 'Mark complete');
  checkbox.addEventListener('change', function() {
    toggleTask(task.id);
  });

  // Task text
  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = task.text;

  // Edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'btn-edit';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', function() {
    startEditTask(task.id, li);
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', function() {
    deleteTask(task.id);
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  return li;
}

function startEditTask(id, li) {
  const task = tasks.find(function(t) { return t.id === id; });
  if (!task) return;

  // Replace text span with an input
  const span = li.querySelector('.task-text');
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.value = task.text;
  li.replaceChild(editInput, span);

  // Replace Edit button with a Save button
  const editBtn = li.querySelector('.btn-edit');
  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn-save';
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', function() {
    editTask(id, editInput.value);
  });
  li.replaceChild(saveBtn, editBtn);

  // Allow saving with Enter key
  editInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') editTask(id, editInput.value);
  });

  editInput.focus();
}

function editTask(id, newText) {
  const trimmed = newText.trim();
  if (!trimmed) {
    // Empty input — restore the list without saving
    renderTasks();
    return;
  }
  const task = tasks.find(function(t) { return t.id === id; });
  if (!task) return;
  task.text = trimmed;
  saveToStorage(STORAGE_KEY_TASKS, tasks);
  renderTasks();
  showNotification('Task updated.');
}

function toggleTask(id) {
  const task = tasks.find(function(t) { return t.id === id; });
  if (!task) return;
  task.completed = !task.completed;
  saveToStorage(STORAGE_KEY_TASKS, tasks);
  renderTasks();
  showNotification(task.completed ? 'Task completed.' : 'Task reopened.');
}

function deleteTask(id) {
  tasks = tasks.filter(function(t) { return t.id !== id; });
  saveToStorage(STORAGE_KEY_TASKS, tasks);
  renderTasks();
  showNotification('Task deleted.');
}

function addTask() {
  const text = todoInput.value.trim();
  if (!text) {
    todoInput.focus();
    showNotification('Please enter a task.', 'error');
    return;
  }
  const isDuplicate = tasks.some(function(t) {
    return t.text.toLowerCase() === text.toLowerCase();
  });
  if (isDuplicate) {
    todoInput.select();
    showNotification('Task already exists.', 'error');
    return;
  }
  tasks.push({ id: Date.now().toString(), text: text, completed: false });
  saveToStorage(STORAGE_KEY_TASKS, tasks);
  renderTasks();
  todoInput.value = '';
  showNotification('Task added.');
}

// === QUICK LINKS ===

const linkNameInput = document.querySelector('#link-name');
const linkUrlInput  = document.querySelector('#link-url');
const linkAddBtn    = document.querySelector('#link-add');
const linksList     = document.querySelector('#links-list');

let links = [];

function normaliseUrl(url) {
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return 'https://' + trimmed;
}

function renderLinks() {
  linksList.innerHTML = '';
  links.forEach(function(link) {
    linksList.appendChild(createLinkElement(link));
  });
}

function createLinkElement(link) {
  const li = document.createElement('li');
  li.className = 'link-item';
  li.dataset.id = link.id;

  const a = document.createElement('a');
  a.href = link.url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.textContent = link.name;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-delete';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', function() {
    deleteLink(link.id);
  });

  li.appendChild(a);
  li.appendChild(deleteBtn);

  return li;
}

function deleteLink(id) {
  links = links.filter(function(l) { return l.id !== id; });
  saveToStorage(STORAGE_KEY_LINKS, links);
  renderLinks();
}

function addLink() {
  const name = linkNameInput.value.trim();
  const url  = linkUrlInput.value.trim();
  if (!name) { linkNameInput.focus(); return; }
  if (!url)  { linkUrlInput.focus();  return; }
  links.push({ id: Date.now().toString(), name: name, url: normaliseUrl(url) });
  saveToStorage(STORAGE_KEY_LINKS, links);
  renderLinks();
  linkNameInput.value = '';
  linkUrlInput.value  = '';
}

// === THEME ===

const themeToggleBtn = document.querySelector('#theme-toggle-btn');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggleBtn.textContent = '☀️ Light Mode';
    themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeToggleBtn.textContent = '🌙 Dark Mode';
    themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(STORAGE_KEY_THEME, next);
  applyTheme(next);
}

function loadTheme() {
  const saved = localStorage.getItem(STORAGE_KEY_THEME);
  applyTheme(saved === 'dark' ? 'dark' : 'light');
}

// === DURATION ===

const durationInput   = document.querySelector('#duration-input');
const durationSaveBtn = document.querySelector('#duration-save-btn');

function loadDurationInput() {
  const saved = parseInt(localStorage.getItem(STORAGE_KEY_DURATION), 10);
  durationInput.value = (Number.isInteger(saved) && saved >= 1 && saved <= 180) ? saved : 25;
}

function saveDuration() {
  const value = parseInt(durationInput.value, 10);
  if (!Number.isInteger(value) || value < 1 || value > 180) {
    showNotification('Duration must be between 1 and 180 minutes.', 'error');
    return;
  }
  localStorage.setItem(STORAGE_KEY_DURATION, value);
  // Only update the display if the timer is not currently running or mid-countdown.
  // The new duration takes effect on the next Reset.
  if (timerInterval === null) {
    timerSeconds = getTimerDuration();
    updateTimerDisplay();
  }
  showNotification('Focus duration updated.');
}

// === NAME ===

const settingsBtn    = document.querySelector('#settings-btn');
const settingsPanel  = document.querySelector('#settings-panel');
const nameInput      = document.querySelector('#name-input');
const nameSaveBtn    = document.querySelector('#name-save-btn');
const nameCancelBtn  = document.querySelector('#name-cancel-btn');

function openSettings() {
  const saved = localStorage.getItem(STORAGE_KEY_NAME) || '';
  nameInput.value = saved;
  settingsPanel.hidden = false;
  nameInput.focus();
}

function closeSettings() {
  settingsPanel.hidden = true;
}

function toggleSettings() {
  if (settingsPanel.hidden) {
    openSettings();
  } else {
    closeSettings();
  }
}

function saveName() {
  const name = nameInput.value.trim();
  localStorage.setItem(STORAGE_KEY_NAME, name);
  closeSettings();
  // Update greeting immediately without waiting for the next clock tick
  updateClock();
}

// === INIT ===

function init() {
  // Theme — restores the saved theme on load (defaults to light if missing or invalid)
  loadTheme();

  // Clock — call once immediately so there is no 1-second blank on load,
  // then start a single interval that ticks every second.
  updateClock();
  setInterval(updateClock, 1000);

  // Name
  settingsBtn.addEventListener('click', toggleSettings);
  nameSaveBtn.addEventListener('click', saveName);
  nameCancelBtn.addEventListener('click', closeSettings);
  nameInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') saveName();
  });

  // Theme toggle
  themeToggleBtn.addEventListener('click', toggleTheme);

  // Timer
  timerSeconds = getTimerDuration();
  updateTimerDisplay();
  timerStartBtn.addEventListener('click', startTimer);
  timerStopBtn.addEventListener('click', stopTimer);
  timerResetBtn.addEventListener('click', resetTimer);

  // Duration setting
  loadDurationInput();
  durationSaveBtn.addEventListener('click', saveDuration);
  durationInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') saveDuration();
  });

  // To-Do List
  tasks = loadFromStorage(STORAGE_KEY_TASKS);
  renderTasks();
  todoAddBtn.addEventListener('click', addTask);
  todoInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') addTask();
  });
  todoSort.addEventListener('change', function() {
    currentSort = todoSort.value;
    renderTasks();
  });

  // Quick Links
  links = loadFromStorage(STORAGE_KEY_LINKS);
  renderLinks();
  linkAddBtn.addEventListener('click', addLink);
}

init();
