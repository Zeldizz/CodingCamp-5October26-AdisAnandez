# To-Do List Life Dashboard — Technical Design

## Document Info

| Field | Value |
|-------|-------|
| Project | To-Do List Life Dashboard |
| Phase | Design |
| Based on | requirements.md · project.md |
| Stack | HTML · CSS · Vanilla JavaScript · localStorage |
| Status | Reviewed |

---

## 1. HTML Structure

### Overview

The page is a single HTML file (`index.html`). All content lives inside one `<main>` element divided into four `<section>` elements — one per feature. There are no external dependencies.

### Document Skeleton

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Life Dashboard</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <main class="dashboard">

      <!-- Section 1: Greeting & Clock -->
      <section class="section" id="section-clock" aria-label="Clock and greeting">
        <p  id="greeting">Good Morning</p>
        <p  id="clock">00:00:00</p>
        <p  id="date">Thursday, October 8, 2026</p>
      </section>

      <!-- Section 2: Focus Timer -->
      <section class="section" id="section-timer" aria-label="Focus timer">
        <h2>Focus Timer</h2>
        <p  id="timer-display">25:00</p>
        <div class="timer-controls">
          <button id="timer-start">Start</button>
          <button id="timer-stop"  disabled>Stop</button>
          <button id="timer-reset">Reset</button>
        </div>
      </section>

      <!-- Section 3: To-Do List -->
      <section class="section" id="section-todo" aria-label="To-do list">
        <h2>To-Do List</h2>
        <div class="input-row">
          <input type="text" id="todo-input" placeholder="Add a new task..." aria-label="New task" />
          <button id="todo-add">Add</button>
        </div>
        <ul id="todo-list" aria-live="polite"></ul>
      </section>

      <!-- Section 4: Quick Links -->
      <section class="section" id="section-links" aria-label="Quick links">
        <h2>Quick Links</h2>
        <div class="input-row">
          <input type="text"  id="link-name"  placeholder="Link name"  aria-label="Link name" />
          <input type="url"   id="link-url"   placeholder="https://..."  aria-label="URL" />
          <button id="link-add">Add</button>
        </div>
        <ul id="links-list" aria-live="polite"></ul>
      </section>

    </main>
    <script src="js/script.js"></script>
  </body>
</html>
```

### Key HTML Decisions

| Decision | Reason |
|----------|--------|
| `<section>` per feature | Semantic grouping; each section is independently labelled with `aria-label` |
| `<ul>` for tasks and links | A list of items is semantically a list |
| `aria-live="polite"` on lists | Screen readers announce additions and removals without interrupting the user |
| `disabled` on Stop button in HTML | Matches the initial state (REQ-TMR-04); no JS needed to set it on load |
| `<script>` at bottom of `<body>` | DOM is fully parsed before the script runs; no need for `DOMContentLoaded` wrapper |
| No inline event handlers | All events are attached in JS via `addEventListener` (project coding guideline) |

---

## 2. CSS Layout Approach

### File: `css/style.css`

The stylesheet is divided into clearly labelled sections matching the HTML top-to-bottom order.

### Section Order in the Stylesheet

```
/* === RESET & BASE === */
/* === CUSTOM PROPERTIES === */
/* === BODY & LAYOUT === */
/* === DASHBOARD GRID === */
/* === SECTION CARDS === */
/* === CLOCK === */
/* === TIMER === */
/* === TO-DO LIST === */
/* === QUICK LINKS === */
/* === SHARED COMPONENTS (buttons, inputs, input-row) === */
/* === RESPONSIVE === */
```

### Custom Properties (Design Tokens)

Defined on `:root` so any value can be changed in one place:

```css
:root {
  /* Colours */
  --color-bg:        #f0f2f5;
  --color-surface:   #ffffff;
  --color-primary:   #4f46e5;   /* buttons, accent */
  --color-danger:    #ef4444;   /* delete actions */
  --color-text:      #1f2937;
  --color-muted:     #6b7280;
  --color-border:    #e5e7eb;
  --color-done-text: #9ca3af;

  /* Spacing */
  --space-xs:  0.25rem;
  --space-sm:  0.5rem;
  --space-md:  1rem;
  --space-lg:  1.5rem;
  --space-xl:  2rem;

  /* Typography */
  --font-base:    1rem;
  --font-sm:      0.875rem;
  --font-lg:      1.25rem;
  --font-xl:      1.5rem;
  --font-clock:   3rem;
  --font-timer:   4rem;

  /* Borders */
  --radius:    0.5rem;
  --radius-sm: 0.25rem;
}
```

### Dashboard Grid Layout

On **desktop** (≥ 700 px): three rows — clock spans full width at the top; timer and to-do list are side-by-side in the middle row; quick links spans full width at the bottom.

On **mobile** (< 700 px): single column, sections stack vertically.

```css
/* Desktop */
.dashboard {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "clock clock"
    "timer todo"
    "links links";
  gap: var(--space-lg);
  max-width: 1000px;
  margin: var(--space-xl) auto;
  padding: var(--space-md);
}

/* Mobile */
@media (max-width: 700px) {
  .dashboard {
    grid-template-columns: 1fr;
    grid-template-areas:
      "clock"
      "timer"
      "todo"
      "links";
  }
}
```

Section IDs are mapped to grid areas:

```css
#section-clock  { grid-area: clock; }
#section-timer  { grid-area: timer; }
#section-todo   { grid-area: todo;  }
#section-links  { grid-area: links; }
```

### Section Cards

Each section is a white card with subtle shadow:

```css
.section {
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: var(--space-lg);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}
```

### Shared Components

**Input row** — label + input(s) + button side by side, wrapping on small screens:

```css
.input-row {
  display: flex;
  gap: var(--space-sm);
  flex-wrap: wrap;
}
.input-row input { flex: 1; min-width: 0; }
```

**Buttons** — consistent height, padding, border-radius; primary and danger variants:

```css
button {
  padding: var(--space-sm) var(--space-md);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: var(--font-base);
}
button:disabled { opacity: 0.4; cursor: not-allowed; }
```

**Completed task** styling:

```css
li.done .task-text {
  text-decoration: line-through;
  color: var(--color-done-text);
}
```

---

## 3. JavaScript Architecture

### File: `js/script.js`

All JavaScript lives in one file. It is organised into clearly labelled sections. There are no classes, no modules, no build steps — just plain functions grouped by feature.

### File Structure (top to bottom)

```
// === CONSTANTS ===
// === STORAGE HELPERS ===
// === CLOCK ===
// === TIMER ===
// === TO-DO LIST ===
// === QUICK LINKS ===
// === INIT ===
```

### Constants

```js
const STORAGE_KEY_TASKS = 'dashboard_tasks';
const STORAGE_KEY_LINKS = 'dashboard_links';
const TIMER_DURATION    = 25 * 60;   // seconds
```

### Design Principle: Render from State

Each feature follows the same simple pattern:

1. **State** is held in a plain JS variable (array or number).
2. **Every mutation** (add, delete, edit, toggle) updates the state variable first, then calls a `render*()` function to rebuild the UI from scratch, then saves to `localStorage`.
3. **On page load** the state is loaded from `localStorage` (or defaulted) and `render*()` is called once.

This keeps UI and data always in sync, and there is only one place that touches the DOM per feature.

```
User action
    │
    ▼
Update state variable
    │
    ▼
Save to localStorage
    │
    ▼
renderX()  ← rebuilds the list from state
```

---

## 4. State & Data Flow

### Clock State

The clock has no persistent state. It runs on a `setInterval` that reads `new Date()` every second and writes directly to the DOM.

```
setInterval (1000ms)
    │
    ▼
new Date()
    │
    ├─▶ format time  → #clock (HH:MM:SS, 24-hour)
    ├─▶ format date  → #date
    └─▶ pick greeting → #greeting
```

### Timer State

```js
let timerSeconds  = TIMER_DURATION;   // current countdown value
let timerInterval = null;             // setInterval reference (null = not running)
```

State machine (three states):

| State | `timerInterval` | `timerSeconds` | Start btn | Stop btn |
|-------|----------------|----------------|-----------|----------|
| Ready | `null` | 1500 | enabled | disabled |
| Running | reference | > 0 | disabled | enabled |
| Done | `null` | 0 | disabled | disabled |

The `timerInterval` being `null` vs. a reference is the single source of truth for whether the timer is running. No separate `isRunning` boolean is needed.

### To-Do State

```js
let tasks = [];   // array of task objects, loaded from localStorage on init
```

Task object shape (matches requirements.md data model):

```js
{ id: '1728123456789', text: 'Buy groceries', completed: false }
```

`id` is generated with `Date.now().toString()` — simple, unique for human-speed interactions.

### Quick Links State

```js
let links = [];   // array of link objects, loaded from localStorage on init
```

Link object shape:

```js
{ id: '1728123456790', name: 'GitHub', url: 'https://github.com' }
```

---

## 5. localStorage Strategy

### Read (on page load)

```js
function loadFromStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];   // handles corrupt/unparseable data gracefully
  }
}
```

### Write (after every mutation)

```js
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
```

### Usage

```js
// Load
tasks = loadFromStorage(STORAGE_KEY_TASKS);
links = loadFromStorage(STORAGE_KEY_LINKS);

// Save after mutation
saveToStorage(STORAGE_KEY_TASKS, tasks);
saveToStorage(STORAGE_KEY_LINKS, links);
```

The two helper functions are the only place in the code that references `localStorage`, making it easy to understand and change.

---

## 6. Clock & Greeting Logic

```js
function updateClock() {
  const now  = new Date();
  const h    = String(now.getHours()).padStart(2, '0');
  const m    = String(now.getMinutes()).padStart(2, '0');
  const s    = String(now.getSeconds()).padStart(2, '0');

  clockEl.textContent    = `${h}:${m}:${s}`;
  dateEl.textContent     = now.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  greetingEl.textContent = getGreeting(now.getHours());
}

function getGreeting(hour) {
  if (hour >= 5  && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 18) return 'Good Afternoon';
  if (hour >= 18 && hour < 21) return 'Good Evening';
  return 'Good Night';
}

// updateClock() and getGreeting() are defined here but started only once
// inside init() below — do not call setInterval or updateClock() here.
```

---

## 7. Timer Logic

### Functions

| Function | Responsibility |
|----------|---------------|
| `startTimer()` | Creates the `setInterval`; disables Start; enables Stop |
| `stopTimer()` | Clears the interval (`timerInterval = null`); enables Start; disables Stop |
| `resetTimer()` | Calls `stopTimer()`; resets `timerSeconds` to `TIMER_DURATION`; updates display; re-enables Start |
| `tickTimer()` | Called by the interval each second; decrements `timerSeconds`; updates display; calls `handleTimerDone()` if `timerSeconds === 0` |
| `handleTimerDone()` | Clears interval; disables Start AND Stop; ensures display shows `00:00` |
| `formatTime(secs)` | Converts total seconds to `MM:SS` string with zero-padding |
| `updateTimerDisplay()` | Writes `formatTime(timerSeconds)` to `#timer-display` |

### Button State Table

| Situation | Start | Stop | Reset |
|-----------|-------|------|-------|
| Page load (Ready) | enabled | disabled | enabled |
| Running | disabled | enabled | enabled |
| Paused | enabled | disabled | enabled |
| Done (00:00) | disabled | disabled | enabled |

### Tick Logic (pseudocode)

```
tickTimer():
  timerSeconds -= 1
  updateTimerDisplay()
  if timerSeconds === 0:
    handleTimerDone()
```

---

## 8. To-Do List Logic

### DOM References

```js
const todoInput = document.querySelector('#todo-input');
const todoAddBtn = document.querySelector('#todo-add');
const todoList  = document.querySelector('#todo-list');
```

### Functions

| Function | Responsibility |
|----------|---------------|
| `addTask()` | Reads input; validates not empty/whitespace; creates task object; pushes to `tasks`; saves to localStorage; renders; clears input |
| `deleteTask(id)` | Filters `tasks` by id; saves to localStorage; renders |
| `toggleTask(id)` | Flips `completed` on matched task; saves to localStorage; renders |
| `editTask(id, newText)` | Validates `newText` not empty; updates `text` on matched task; saves to localStorage; renders |
| `renderTasks()` | Clears `#todo-list`; iterates `tasks` array; builds one `<li>` per task using `createTaskElement(task)`; appends to list |
| `createTaskElement(task)` | Creates and returns a `<li>` with checkbox, text span, Edit button, Delete button |

### Render Pattern for a Single Task

```
<li class="task-item [done]" data-id="...">
  <input type="checkbox" [checked] aria-label="Mark complete" />
  <span class="task-text">Buy groceries</span>
  <button class="btn-edit">Edit</button>
  <button class="btn-delete">Delete</button>
</li>
```

When Edit is clicked the `<span>` is replaced with an `<input>` pre-filled with the task text and a Save button. On Save, `editTask()` is called and `renderTasks()` restores the normal view.

### Input Validation

```js
function addTask() {
  const text = todoInput.value.trim();
  if (!text) {
    todoInput.focus();   // REQ-TODO-03: indicate the field is required
    return;
  }
  // ... create and add task
}
```

---

## 9. Quick Links Logic

### DOM References

```js
const linkNameInput = document.querySelector('#link-name');
const linkUrlInput  = document.querySelector('#link-url');
const linkAddBtn    = document.querySelector('#link-add');
const linksList     = document.querySelector('#links-list');
```

### Functions

| Function | Responsibility |
|----------|---------------|
| `addLink()` | Reads name + URL; validates both non-empty; normalises URL (prepend `https://`); creates link object; pushes to `links`; saves to localStorage; renders; clears inputs |
| `deleteLink(id)` | Filters `links` by id; saves to localStorage; renders |
| `renderLinks()` | Clears `#links-list`; iterates `links`; builds one `<li>` per link using `createLinkElement(link)`; appends to list |
| `createLinkElement(link)` | Creates and returns a `<li>` with a clickable `<a>` and a Delete button |
| `normaliseUrl(url)` | Returns url unchanged if it starts with `http://` or `https://`; otherwise prepends `https://` |

### Render Pattern for a Single Link

```
<li class="link-item" data-id="...">
  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
  <button class="btn-delete">Delete</button>
</li>
```

`rel="noopener noreferrer"` is included on all external links to prevent tab-napping — a standard security practice for `target="_blank"` links.

### URL Normalisation

```js
function normaliseUrl(url) {
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return 'https://' + trimmed;
}
```

### Input Validation

```js
function addLink() {
  const name = linkNameInput.value.trim();
  const url  = linkUrlInput.value.trim();
  if (!name) { linkNameInput.focus(); return; }
  if (!url)  { linkUrlInput.focus();  return; }
  // ... create and add link
}
```

---

## 10. Initialisation (INIT section)

The `init()` function runs once when the page loads. It wires up all event listeners and performs the first render.

```js
function init() {
  // Clock
  updateClock();
  setInterval(updateClock, 1000);

  // Timer
  updateTimerDisplay();
  timerStartBtn.addEventListener('click', startTimer);
  timerStopBtn.addEventListener('click', stopTimer);
  timerResetBtn.addEventListener('click', resetTimer);

  // To-Do
  tasks = loadFromStorage(STORAGE_KEY_TASKS);
  renderTasks();
  todoAddBtn.addEventListener('click', addTask);
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask();
  });

  // Quick Links
  links = loadFromStorage(STORAGE_KEY_LINKS);
  renderLinks();
  linkAddBtn.addEventListener('click', addLink);
}

init();
```

Event delegation is not required here because the lists are rebuilt completely on every render — each new element gets fresh event listeners attached by `createTaskElement` / `createLinkElement`. This is the simplest approach for a beginner; performance is not a concern at this scale.

---

## 11. Responsive Layout Summary

| Viewport | Layout |
|----------|--------|
| ≥ 700 px (tablet/desktop) | 2-column CSS Grid; clock spans full width (top); timer + to-do side-by-side (middle); quick links spans full width (bottom) |
| < 700 px (mobile) | 1-column grid; all four sections stack vertically |

The single breakpoint at `700px` is enough for a two-column → one-column switch. `flex-wrap` on `.input-row` handles the Quick Links inputs (name + URL + button) naturally narrowing without a separate media query.

---

## 12. Security Notes

| Concern | Mitigation |
|---------|-----------|
| XSS via task / link name input | Use `element.textContent` and `document.createElement` — never `innerHTML` with user data |
| Tab-napping on external links | All `<a target="_blank">` elements include `rel="noopener noreferrer"` |
| Corrupt localStorage data | `loadFromStorage` wraps `JSON.parse` in `try/catch` and falls back to `[]` |

---

## 13. File Checklist

Before implementation begins, confirm:

- [ ] `index.html` — single file, four sections, script tag at bottom
- [ ] `css/style.css` — single file, custom properties, grid layout, responsive breakpoint
- [ ] `js/script.js` — single file, eight sections (constants → helpers → clock → timer → todo → links → init)
- [ ] No external CDN links
- [ ] No additional JS or CSS files
- [ ] `localStorage` accessed only through `loadFromStorage` / `saveToStorage`
