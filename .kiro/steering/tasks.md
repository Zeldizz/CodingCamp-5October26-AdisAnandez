# To-Do List Life Dashboard — Implementation Tasks

## Document Info

| Field | Value |
|-------|-------|
| Project | To-Do List Life Dashboard |
| Phase | Implementation planning |
| Based on | requirements.md · design.md |
| Status | Ready |

---

## How to Use This File

- Work through tasks **in order**. Each task builds on the one before it.
- A task is **done** when every item in its verification checklist passes.
- Mark a task complete by changing `[ ]` to `[x]`.
- Do not skip a task; later tasks assume earlier ones are already working.

---

## Task List

| ID | Title | Status |
|----|-------|--------|
| TASK-01 | HTML skeleton and page structure | [ ] |
| TASK-02 | Base CSS: reset, custom properties, body | [ ] |
| TASK-03 | Dashboard grid layout and section cards | [ ] |
| TASK-04 | Shared component styles (buttons, inputs, input-row) | [ ] |
| TASK-05 | Clock and greeting — HTML wiring | [ ] |
| TASK-06 | Clock and greeting — JavaScript logic | [ ] |
| TASK-07 | Focus timer — HTML wiring | [ ] |
| TASK-08 | Focus timer — JavaScript logic | [ ] |
| TASK-09 | Focus timer — CSS styling | [ ] |
| TASK-10 | localStorage helper functions | [ ] |
| TASK-11 | To-Do List — add and render tasks | [ ] |
| TASK-12 | To-Do List — complete and delete tasks | [ ] |
| TASK-13 | To-Do List — edit tasks | [ ] |
| TASK-14 | To-Do List — localStorage persistence | [ ] |
| TASK-15 | To-Do List — CSS styling | [ ] |
| TASK-16 | Quick Links — add and render links | [ ] |
| TASK-17 | Quick Links — delete links and localStorage persistence | [ ] |
| TASK-18 | Quick Links — CSS styling | [ ] |
| TASK-19 | Responsive layout | [ ] |
| TASK-20 | Final polish and cross-browser check | [ ] |

---

## Detailed Tasks

---

### TASK-01 — HTML Skeleton and Page Structure

**Goal:** Create the complete HTML document with all four sections in the correct order. No styling or JavaScript yet.

**Files to edit:** `index.html`

**What to do:**
- Write the `<!DOCTYPE html>`, `<html lang="en">`, `<head>`, and `<body>` structure.
- Add `<meta charset>`, `<meta name="viewport">`, `<title>Life Dashboard</title>`.
- Link `css/style.css` in `<head>`.
- Add `<script src="js/script.js"></script>` as the last child of `<body>`.
- Inside `<body>` add `<main class="dashboard">`.
- Inside `<main>` add four `<section>` elements in this order:
  1. `id="section-clock"` — contains `#greeting`, `#clock`, `#date`
  2. `id="section-timer"` — contains `<h2>`, `#timer-display`, three buttons (`#timer-start`, `#timer-stop`, `#timer-reset`)
  3. `id="section-todo"` — contains `<h2>`, `.input-row` with `#todo-input` + `#todo-add`, `<ul id="todo-list">`
  4. `id="section-links"` — contains `<h2>`, `.input-row` with `#link-name` + `#link-url` + `#link-add`, `<ul id="links-list">`
- Add `aria-label` on each `<section>` and `aria-live="polite"` on both `<ul>` elements.
- Add `disabled` attribute to `#timer-stop` in HTML.
- Use 2-space indentation throughout.

**Verification:**
- [ ] Page opens in the browser without errors in the console.
- [ ] All four sections are visible as unstyled text.
- [ ] Validator (or manual check) shows no missing closing tags.
- [ ] `#timer-stop` is visually disabled (browser default).
- [ ] No `onclick` or other inline event attributes exist anywhere in the HTML.

---

### TASK-02 — Base CSS: Reset, Custom Properties, Body

**Goal:** Establish the stylesheet foundation — reset browser defaults, define all design tokens, and set the page background and font.

**Files to edit:** `css/style.css`

**What to do:**
- Add the comment header `/* === RESET & BASE === */` then a minimal CSS reset:
  - `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`
- Add `/* === CUSTOM PROPERTIES === */` then the `:root` block with all design tokens from design.md section 2:
  - Colours: `--color-bg`, `--color-surface`, `--color-primary`, `--color-danger`, `--color-text`, `--color-muted`, `--color-border`, `--color-done-text`
  - Spacing: `--space-xs` through `--space-xl`
  - Typography: `--font-base`, `--font-sm`, `--font-lg`, `--font-xl`, `--font-clock`, `--font-timer`
  - Borders: `--radius`, `--radius-sm`
- Add `/* === BODY & LAYOUT === */` then style `body`:
  - `background-color: var(--color-bg)`
  - `color: var(--color-text)`
  - `font-family: system-ui, sans-serif`
  - `font-size: var(--font-base)`
  - `line-height: 1.5`

**Verification:**
- [ ] Page background is light grey (not white).
- [ ] Body text uses the system font and `--color-text`.
- [ ] Inspecting `:root` in DevTools shows all custom properties defined.
- [ ] No visible layout change yet — this task only sets up the base.

---

### TASK-03 — Dashboard Grid Layout and Section Cards

**Goal:** Lay out the four sections in the correct three-row desktop grid, with each section styled as a white card.

**Files to edit:** `css/style.css`

**What to do:**
- Add `/* === DASHBOARD GRID === */` then style `.dashboard`:
  - `display: grid`
  - `grid-template-columns: 1fr 1fr`
  - `grid-template-areas: "clock clock" "timer todo" "links links"`
  - `gap: var(--space-lg)`
  - `max-width: 1000px`
  - `margin: var(--space-xl) auto`
  - `padding: var(--space-md)`
- Map section IDs to grid areas:
  - `#section-clock { grid-area: clock; }`
  - `#section-timer { grid-area: timer; }`
  - `#section-todo  { grid-area: todo; }`
  - `#section-links { grid-area: links; }`
- Add `/* === SECTION CARDS === */` then style `.section`:
  - `background: var(--color-surface)`
  - `border-radius: var(--radius)`
  - `padding: var(--space-lg)`
  - `box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08)`

**Verification:**
- [ ] On a desktop viewport (≥ 700 px): clock section spans full width at the top; timer and to-do are side by side in the second row; links spans full width at the bottom.
- [ ] Each section appears as a distinct white card on a grey background.
- [ ] No horizontal scrollbar at typical desktop widths.

---

### TASK-04 — Shared Component Styles: Buttons, Inputs, Input-Row

**Goal:** Style all buttons and inputs consistently so every feature looks uniform before individual feature styling is added.

**Files to edit:** `css/style.css`

**What to do:**
- Add `/* === SHARED COMPONENTS === */`.
- Style `button`:
  - `padding: var(--space-sm) var(--space-md)`
  - `border: none; border-radius: var(--radius-sm); cursor: pointer`
  - `font-size: var(--font-base)`
  - `background-color: var(--color-primary); color: #fff`
- Style `button:disabled`:
  - `opacity: 0.4; cursor: not-allowed`
- Style `button.btn-delete`:
  - `background-color: var(--color-danger)`
- Style `input[type="text"], input[type="url"]`:
  - `padding: var(--space-sm)`
  - `border: 1px solid var(--color-border); border-radius: var(--radius-sm)`
  - `font-size: var(--font-base); width: 100%`
- Style `.input-row`:
  - `display: flex; gap: var(--space-sm); flex-wrap: wrap`
- Style `.input-row input`:
  - `flex: 1; min-width: 0`

**Verification:**
- [ ] All buttons have the primary colour background.
- [ ] `#timer-stop` (currently disabled) is visibly greyed out.
- [ ] Inputs have a visible border.
- [ ] The `.input-row` in the To-Do and Quick Links sections lays input and button side by side.

---

### TASK-05 — Clock and Greeting: HTML Wiring

**Goal:** Confirm the clock section HTML is correct and the three target elements exist with the right IDs.

**Files to edit:** `index.html`

**What to do:**
- Verify (and fix if needed) that `#section-clock` contains exactly:
  - `<p id="greeting"></p>`
  - `<p id="clock"></p>`
  - `<p id="date"></p>`
- These elements must be present with no placeholder text that JS will need to clear — JS will write `textContent` directly.

**Verification:**
- [ ] DevTools shows three `<p>` elements with correct IDs inside `#section-clock`.
- [ ] No inline text content in those elements (JS fills them).

> This task is intentionally small. If TASK-01 was done correctly, this task is already complete — just confirm and tick it off.

---

### TASK-06 — Clock and Greeting: JavaScript Logic

**Goal:** Implement the realtime clock, date display, and time-based greeting in `script.js`.

**Files to edit:** `js/script.js`

**What to do:**
- Add the `// === CONSTANTS ===` section at the top:
  ```js
  const STORAGE_KEY_TASKS = 'dashboard_tasks';
  const STORAGE_KEY_LINKS = 'dashboard_links';
  const TIMER_DURATION    = 25 * 60;
  ```
- Add `// === CLOCK ===` section.
- Cache DOM references: `greetingEl`, `clockEl`, `dateEl` using `document.querySelector`.
- Implement `getGreeting(hour)` — returns the correct string based on the hour ranges in REQ-CLK-04.
- Implement `updateClock()` — formats hours, minutes, seconds with `padStart(2, '0')` for 24-hour HH:MM:SS; writes to `clockEl`, `dateEl`, and `greetingEl` using `textContent`.
- Add `// === INIT ===` section at the bottom with:
  ```js
  function init() {
    updateClock();
    setInterval(updateClock, 1000);
  }
  init();
  ```
  *(Other features will be added to `init()` in later tasks.)*

**Verification:**
- [ ] Clock displays time in HH:MM:SS 24-hour format (e.g. `14:05:03`).
- [ ] Seconds increment every second with the page open.
- [ ] Date displays full format (e.g. "Thursday, October 8, 2026").
- [ ] Greeting matches the current hour (open at 09:00 → "Good Morning"; open at 14:00 → "Good Afternoon"; open at 19:00 → "Good Evening"; open at 22:00 → "Good Night").
- [ ] No console errors.

---

### TASK-07 — Focus Timer: HTML Wiring

**Goal:** Confirm the timer section HTML is correct and matches the design's expected element IDs.

**Files to edit:** `index.html`

**What to do:**
- Verify `#section-timer` contains:
  - `<h2>Focus Timer</h2>`
  - `<p id="timer-display">25:00</p>`
  - A `<div class="timer-controls">` containing:
    - `<button id="timer-start">Start</button>`
    - `<button id="timer-stop" disabled>Stop</button>`
    - `<button id="timer-reset">Reset</button>`

**Verification:**
- [ ] Timer section shows "25:00" as static text.
- [ ] Stop button is visually disabled on page load.
- [ ] Start and Reset buttons are enabled on page load.

> Again, if TASK-01 was complete this is a confirmation step only.

---

### TASK-08 — Focus Timer: JavaScript Logic

**Goal:** Implement the full timer countdown with correct Start / Stop / Reset / Done behaviour.

**Files to edit:** `js/script.js`

**What to do:**
- Add `// === TIMER ===` section.
- Cache DOM references: `timerDisplay`, `timerStartBtn`, `timerStopBtn`, `timerResetBtn`.
- Declare state variables: `let timerSeconds = TIMER_DURATION;` and `let timerInterval = null;`.
- Implement `formatTime(secs)` — returns zero-padded `MM:SS` string.
- Implement `updateTimerDisplay()` — writes `formatTime(timerSeconds)` to `#timer-display`.
- Implement `startTimer()`:
  - Guard: return immediately if `timerInterval !== null` (already running) or `timerSeconds === 0` (done).
  - Set `timerInterval = setInterval(tickTimer, 1000)`.
  - Disable Start; enable Stop.
- Implement `tickTimer()`:
  - Decrement `timerSeconds`.
  - Call `updateTimerDisplay()`.
  - If `timerSeconds === 0`, call `handleTimerDone()`.
- Implement `stopTimer()`:
  - `clearInterval(timerInterval); timerInterval = null`.
  - Enable Start; disable Stop.
- Implement `handleTimerDone()`:
  - `clearInterval(timerInterval); timerInterval = null`.
  - Disable both Start and Stop.
  - Call `updateTimerDisplay()` (shows `00:00`).
- Implement `resetTimer()`:
  - Call `stopTimer()` (clears any running interval, re-enables Start).
  - Set `timerSeconds = TIMER_DURATION`.
  - Call `updateTimerDisplay()`.
  - Ensure Start is enabled (handles reset from Done state).
- In `init()`, add:
  - `updateTimerDisplay()`
  - `timerStartBtn.addEventListener('click', startTimer)`
  - `timerStopBtn.addEventListener('click', stopTimer)`
  - `timerResetBtn.addEventListener('click', resetTimer)`

**Verification:**
- [ ] Page load: timer shows `25:00`; Start enabled; Stop disabled.
- [ ] Click Start: countdown begins; Start disables; Stop enables.
- [ ] Click Stop: countdown pauses at current value; Start re-enables.
- [ ] Click Start again: countdown resumes from paused value.
- [ ] Click Reset while running: countdown stops and resets to `25:00`; Start re-enables.
- [ ] Click Reset while paused: resets to `25:00`.
- [ ] Timer reaches `00:00`: stops automatically; Start AND Stop both disabled; display stays `00:00`.
- [ ] Click Reset after `00:00`: resets to `25:00`; Start re-enables.
- [ ] No console errors.

---

### TASK-09 — Focus Timer: CSS Styling

**Goal:** Style the timer display and controls so they are visually prominent and clear.

**Files to edit:** `css/style.css`

**What to do:**
- Add `/* === TIMER === */` section.
- Style `#timer-display`:
  - `font-size: var(--font-timer)` (4rem)
  - `font-weight: bold; text-align: center`
  - `letter-spacing: 0.05em`
  - `margin: var(--space-md) 0`
- Style `.timer-controls`:
  - `display: flex; gap: var(--space-sm); justify-content: center`
  - `margin-top: var(--space-md)`

**Verification:**
- [ ] Timer countdown is large and readable.
- [ ] Three buttons are centred and evenly spaced.
- [ ] Disabled Stop button appears faded.

---

### TASK-10 — localStorage Helper Functions

**Goal:** Implement the two shared storage helpers that all features use. No UI change — this is pure logic.

**Files to edit:** `js/script.js`

**What to do:**
- Add `// === STORAGE HELPERS ===` section (place it after `CONSTANTS`, before `CLOCK`).
- Implement `loadFromStorage(key)`:
  ```js
  function loadFromStorage(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  ```
- Implement `saveToStorage(key, data)`:
  ```js
  function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  ```

**Verification:**
- [ ] Open DevTools → Application → Local Storage. Manually call `saveToStorage('test', [1,2,3])` in the console — entry appears.
- [ ] `loadFromStorage('test')` returns `[1, 2, 3]`.
- [ ] `loadFromStorage('nonexistent')` returns `[]` without error.
- [ ] `saveToStorage('bad', undefined)` followed by corrupting the entry manually: `loadFromStorage` returns `[]` without throwing.

---

### TASK-11 — To-Do List: Add and Render Tasks

**Goal:** Implement adding a new task and rendering the full task list. No complete/edit/delete yet.

**Files to edit:** `js/script.js`

**What to do:**
- Add `// === TO-DO LIST ===` section.
- Cache DOM references: `todoInput`, `todoAddBtn`, `todoList`.
- Declare `let tasks = [];`.
- Implement `renderTasks()`:
  - Clear `todoList` (set `innerHTML = ''` is acceptable here since we are writing our own safe elements, not user content).
  - For each task in `tasks`, call `createTaskElement(task)` and append to `todoList`.
- Implement `createTaskElement(task)`:
  - Create a `<li>` with `class="task-item"` and `data-id` attribute.
  - Create a `<span class="task-text">` — set `textContent` to `task.text`.
  - Append the span to the `<li>` (checkbox, edit, delete buttons are added in later tasks).
  - Return the `<li>`.
- Implement `addTask()`:
  - Read and trim `todoInput.value`.
  - If empty, call `todoInput.focus()` and return.
  - Create task object: `{ id: Date.now().toString(), text, completed: false }`.
  - Push to `tasks`.
  - Save to localStorage: `saveToStorage(STORAGE_KEY_TASKS, tasks)`.
  - Call `renderTasks()`.
  - Clear `todoInput.value`.
- In `init()`, add:
  - `tasks = loadFromStorage(STORAGE_KEY_TASKS)`
  - `renderTasks()`
  - `todoAddBtn.addEventListener('click', addTask)`
  - `todoInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); })`

**Verification:**
- [ ] Type "Buy groceries", click Add → item appears in the list; input clears.
- [ ] Press Enter with text in input → task is added.
- [ ] Click Add with empty input → no task added; input receives focus.
- [ ] Click Add with only spaces → no task added.
- [ ] Add 3 tasks; refresh page → all 3 tasks are still visible.
- [ ] Open DevTools → `dashboard_tasks` in localStorage contains the tasks as JSON.

---

### TASK-12 — To-Do List: Complete and Delete Tasks

**Goal:** Add the checkbox (complete toggle) and Delete button to each task item.

**Files to edit:** `js/script.js`, `css/style.css`

**What to do:**

*`js/script.js`:*
- Update `createTaskElement(task)` to:
  - Add `class="done"` to the `<li>` if `task.completed` is `true`.
  - Create `<input type="checkbox">` with `aria-label="Mark complete"`; set `.checked = task.completed`.
  - Add a `change` event listener on the checkbox that calls `toggleTask(task.id)`.
  - Create `<button class="btn-delete">Delete</button>`.
  - Add a `click` event listener on the delete button that calls `deleteTask(task.id)`.
  - Append checkbox, task-text span, and delete button to the `<li>` in that order.
- Implement `toggleTask(id)`:
  - Find the task in `tasks` where `task.id === id`.
  - Flip `task.completed`.
  - `saveToStorage(STORAGE_KEY_TASKS, tasks)`.
  - `renderTasks()`.
- Implement `deleteTask(id)`:
  - `tasks = tasks.filter(t => t.id !== id)`.
  - `saveToStorage(STORAGE_KEY_TASKS, tasks)`.
  - `renderTasks()`.

*`css/style.css`:*
- Add `/* === TO-DO LIST === */` section (partial — more styling in TASK-15).
- Style `li.done .task-text`:
  - `text-decoration: line-through; color: var(--color-done-text)`

**Verification:**
- [ ] Each task shows a checkbox and a Delete button.
- [ ] Click checkbox → task text gets strikethrough; checkbox is checked.
- [ ] Click checkbox again → strikethrough removed; checkbox unchecked.
- [ ] Refresh → completed state is preserved.
- [ ] Click Delete → task disappears immediately.
- [ ] Refresh after delete → deleted task is gone.

---

### TASK-13 — To-Do List: Edit Tasks

**Goal:** Add inline editing — clicking Edit replaces the task text with an input pre-filled with the current text and a Save button.

**Files to edit:** `js/script.js`

**What to do:**
- Update `createTaskElement(task)` to:
  - Create `<button class="btn-edit">Edit</button>`.
  - Add a `click` event listener that calls `startEditTask(task.id, li)` where `li` is the `<li>` element.
  - Append the edit button before the delete button.
- Implement `startEditTask(id, li)`:
  - Find the current task text.
  - Replace the `<span class="task-text">` inside `li` with an `<input type="text" class="edit-input">` pre-filled with `task.text`.
  - Replace the Edit button with a `<button class="btn-save">Save</button>`.
  - Add a `click` listener on Save that calls `editTask(id, editInput.value)`.
  - Add a `keydown` listener on the input: if `Enter`, call `editTask(id, editInput.value)`.
  - Focus the input.
- Implement `editTask(id, newText)`:
  - Trim `newText`.
  - If empty, return without saving (keep original text — trigger `renderTasks()` to restore normal view or simply return).
  - Find the task in `tasks` and update `task.text = newText`.
  - `saveToStorage(STORAGE_KEY_TASKS, tasks)`.
  - `renderTasks()`.

**Verification:**
- [ ] Click Edit on a task → text becomes an editable input pre-filled with current text; Save button appears.
- [ ] Change text, click Save → task text updates.
- [ ] Change text, press Enter → task text updates.
- [ ] Clear the input, click Save → original text is kept.
- [ ] Edit a task; refresh → edited text is persisted.

---

### TASK-14 — To-Do List: localStorage Persistence (Full Verification)

**Goal:** Confirm the complete to-do list persistence across all operations. No new code — this is a testing checkpoint.

**Files to edit:** None (verification only)

**What to do:**
- Work through the following scenario in the browser:
  1. Add three tasks.
  2. Mark the first as complete.
  3. Edit the second.
  4. Delete the third.
  5. Refresh the page.
  6. Verify the state is exactly as left.

**Verification:**
- [ ] After refresh: two tasks remain (first is complete, second has edited text, third is gone).
- [ ] `dashboard_tasks` in localStorage matches the rendered list exactly.
- [ ] Open the page in an incognito window (no localStorage) → empty list, no errors.

---

### TASK-15 — To-Do List: CSS Styling

**Goal:** Complete the visual styling for the task list.

**Files to edit:** `css/style.css`

**What to do:**
- Extend the `/* === TO-DO LIST === */` section:
- Style `#todo-list`:
  - `list-style: none; margin-top: var(--space-md)`
- Style `.task-item`:
  - `display: flex; align-items: center; gap: var(--space-sm)`
  - `padding: var(--space-sm) 0`
  - `border-bottom: 1px solid var(--color-border)`
- Style `.task-text`:
  - `flex: 1` (takes up remaining space, pushing buttons to the right)
- Style `.edit-input`:
  - `flex: 1; padding: var(--space-xs); font-size: var(--font-base)`
  - `border: 1px solid var(--color-border); border-radius: var(--radius-sm)`
- Style `input[type="checkbox"]`:
  - `width: 1rem; height: 1rem; cursor: pointer; flex-shrink: 0`

**Verification:**
- [ ] Tasks are displayed in a clean list with separator lines.
- [ ] Task text fills available space; Edit and Delete buttons sit on the right.
- [ ] Completed task text has strikethrough and muted colour.
- [ ] Edit input fits neatly within the task row.

---

### TASK-16 — Quick Links: Add and Render Links

**Goal:** Implement adding a new quick link and rendering the links list.

**Files to edit:** `js/script.js`

**What to do:**
- Add `// === QUICK LINKS ===` section.
- Cache DOM references: `linkNameInput`, `linkUrlInput`, `linkAddBtn`, `linksList`.
- Declare `let links = [];`.
- Implement `normaliseUrl(url)`:
  - If `url` starts with `http://` or `https://`, return as-is.
  - Otherwise prepend `'https://'`.
- Implement `renderLinks()`:
  - Clear `linksList`.
  - For each link in `links`, call `createLinkElement(link)` and append.
- Implement `createLinkElement(link)`:
  - Create `<li class="link-item">` with `data-id`.
  - Create `<a>` with `href = link.url`, `target="_blank"`, `rel="noopener noreferrer"`; set `textContent = link.name`.
  - Append `<a>` to `<li>`.
  - Return `<li>`.
- Implement `addLink()`:
  - Read and trim `linkNameInput.value` and `linkUrlInput.value`.
  - If name is empty: `linkNameInput.focus(); return`.
  - If url is empty: `linkUrlInput.focus(); return`.
  - Normalise URL with `normaliseUrl(url)`.
  - Create link object: `{ id: Date.now().toString(), name, url: normalisedUrl }`.
  - Push to `links`.
  - `saveToStorage(STORAGE_KEY_LINKS, links)`.
  - `renderLinks()`.
  - Clear both inputs.
- In `init()`, add:
  - `links = loadFromStorage(STORAGE_KEY_LINKS)`
  - `renderLinks()`
  - `linkAddBtn.addEventListener('click', addLink)`

**Verification:**
- [ ] Enter "GitHub" + "https://github.com", click Add → link appears showing "GitHub"; both inputs clear.
- [ ] Click the "GitHub" link → `https://github.com` opens in a new tab.
- [ ] Enter "Docs" + "docs.example.com" (no protocol) → link saved as `https://docs.example.com`.
- [ ] Click Add with empty name → no link added; name input receives focus.
- [ ] Click Add with empty URL → no link added; URL input receives focus.
- [ ] Add 2 links; refresh → both links still displayed.

---

### TASK-17 — Quick Links: Delete and localStorage Persistence

**Goal:** Add the Delete button to each link item and confirm full persistence.

**Files to edit:** `js/script.js`

**What to do:**
- Update `createLinkElement(link)` to:
  - Create `<button class="btn-delete">Delete</button>`.
  - Add `click` event listener calling `deleteLink(link.id)`.
  - Append the delete button to the `<li>`.
- Implement `deleteLink(id)`:
  - `links = links.filter(l => l.id !== id)`.
  - `saveToStorage(STORAGE_KEY_LINKS, links)`.
  - `renderLinks()`.

**Verification:**
- [ ] Each link shows a Delete button.
- [ ] Click Delete → link disappears immediately.
- [ ] Refresh after delete → deleted link is gone.
- [ ] Open in incognito → empty links list, no errors.

---

### TASK-18 — Quick Links: CSS Styling

**Goal:** Style the quick links section.

**Files to edit:** `css/style.css`

**What to do:**
- Add `/* === QUICK LINKS === */` section.
- Style `#links-list`:
  - `list-style: none; margin-top: var(--space-md)`
- Style `.link-item`:
  - `display: flex; align-items: center; justify-content: space-between`
  - `padding: var(--space-sm) 0`
  - `border-bottom: 1px solid var(--color-border)`
- Style `.link-item a`:
  - `color: var(--color-primary); text-decoration: none; font-weight: 500`
- Style `.link-item a:hover`:
  - `text-decoration: underline`

**Verification:**
- [ ] Links are displayed in a clean list.
- [ ] Link names are styled as coloured, clickable text.
- [ ] Delete button sits on the right of each row.
- [ ] Hovering a link shows underline.

---

### TASK-19 — Responsive Layout

**Goal:** Make the dashboard usable on mobile (< 700 px) by collapsing to a single column.

**Files to edit:** `css/style.css`

**What to do:**
- Add `/* === RESPONSIVE === */` section at the bottom of the stylesheet.
- Add `@media (max-width: 700px)` block:
  - `.dashboard`: `grid-template-columns: 1fr` and `grid-template-areas: "clock" "timer" "todo" "links"`
- Ensure `.input-row` (already using `flex-wrap: wrap`) handles the Quick Links double-input row wrapping gracefully at narrow widths.
- Ensure font sizes remain readable — no adjustments needed unless something breaks.

**Verification:**
- [ ] At 375 px viewport width: all four sections stack vertically in order (clock → timer → todo → links).
- [ ] No horizontal scrollbar at 375 px.
- [ ] `.input-row` inputs and buttons wrap cleanly on small screens.
- [ ] At 768 px and above: the desktop three-row grid is restored.

---

### TASK-20 — Final Polish and Cross-Browser Check

**Goal:** Review the complete dashboard for visual consistency, fix any rough edges, and verify it works in all target browsers.

**Files to edit:** `css/style.css`, `index.html`, `js/script.js` (minor fixes only)

**What to do:**
- Add `/* === CLOCK === */` CSS section and style `#greeting`, `#clock`, `#date`:
  - `#greeting`: `font-size: var(--font-lg); color: var(--color-muted)`
  - `#clock`: `font-size: var(--font-clock); font-weight: bold; letter-spacing: 0.05em`
  - `#date`: `font-size: var(--font-base); color: var(--color-muted)`
  - `#section-clock`: `text-align: center`
- Add `h2` base style if missing: `font-size: var(--font-xl); margin-bottom: var(--space-md)`
- Review the page at 375 px, 768 px, and 1280 px and fix any overflow or spacing issues.
- Open in Chrome, Firefox, Edge, and Safari and verify no layout or JS errors.
- Confirm no `console.error` or `console.warn` output in any browser on page load.
- Confirm all localStorage behaviour works (add, persist, delete) in each browser.

**Verification:**
- [ ] Clock section is centred and the large time display is prominent.
- [ ] Section headings are styled consistently.
- [ ] No console errors in Chrome, Firefox, Edge, or Safari.
- [ ] All four features work end-to-end in all four browsers.
- [ ] Dashboard is usable and readable at 375 px, 768 px, and 1280 px.
- [ ] Design checklist in design.md section 13 is fully satisfied.

---

## Summary

| Area | Tasks |
|------|-------|
| Structure & base styles | TASK-01 → TASK-04 |
| Clock & greeting | TASK-05 → TASK-06 |
| Focus timer | TASK-07 → TASK-09 |
| Storage helpers | TASK-10 |
| To-Do list | TASK-11 → TASK-15 |
| Quick Links | TASK-16 → TASK-18 |
| Responsive & polish | TASK-19 → TASK-20 |
| **Total** | **20 tasks** |
