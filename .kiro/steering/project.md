# To-Do List Life Dashboard — Project Steering

## Project Overview

A single-page Life Dashboard built as a 5-day software engineering mini project. It combines a realtime clock, a focus timer, a to-do list, and quick links into one clean, browser-only interface.

---

## Technology Constraints

These are hard constraints. Do not deviate without explicit user approval.

- **HTML** — structure only, semantic markup
- **CSS** — styling only, plain CSS (no preprocessors)
- **JavaScript** — vanilla JS only, no frameworks
- **No React, Vue, Angular, Svelte, or any component framework**
- **No Bootstrap, Tailwind, or any CSS utility/component library**
- **No backend, no server, no API calls to external services**
- **No npm, no build tools, no bundlers** — files load directly in the browser
- **Persistence** — Browser `localStorage` API only

---

## Project Structure

```
/
├── index.html          ← Single HTML page, all content lives here
├── css/
│   └── style.css       ← Only CSS file; no additional stylesheets
├── js/
│   └── script.js       ← Only JS file; all logic lives here
├── .kiro/
│   └── steering/
│       └── project.md  ← This file
└── README.md
```

### Folder constraints

- `css/` must contain **exactly one** CSS file: `style.css`
- `js/` must contain **exactly one** JS file: `script.js`
- Do not create additional folders or files outside this structure unless the user explicitly requests it

---

## Functional Requirements

### Clock & Date
- Display the current time updating every second (realtime clock)
- Display the current date alongside the time
- Show a greeting that changes based on the time of day (morning / afternoon / evening / night)

### Focus Timer
- 25-minute countdown timer (Pomodoro-style)
- Controls: Start, Stop, Reset
- Visual countdown display (MM:SS format)

### To-Do List
- Add new tasks
- Edit existing tasks
- Mark tasks as complete / incomplete
- Delete tasks
- Persist tasks using `localStorage` — tasks survive page refresh

### Quick Links
- Add a named link (title + URL)
- Open links in a new tab
- Persist links using `localStorage` — links survive page refresh

---

## Non-Functional Requirements

- **Clean UI** — uncluttered, visually comfortable layout
- **Simple and readable** — code and UI both prioritise clarity over cleverness
- **Responsive** — usable on desktop and mobile screen sizes
- **Fast interactions** — no noticeable lag on user actions
- **Modern browser compatibility** — target current Chrome, Firefox, Safari, Edge (no IE support needed)

---

## Coding Guidelines

These apply to every implementation task.

### General
- Verify a feature matches the requirements above before implementing it
- Prefer the simplest solution that satisfies the requirement
- Do not add libraries, CDN links, or external dependencies
- Do not modify files unrelated to the current task
- Explain important implementation decisions before making major changes

### HTML (`index.html`)
- Use semantic elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`, etc.
- Each major feature (clock, timer, to-do, links) gets its own clearly labelled `<section>`
- Use `aria-label` and other ARIA attributes where they improve accessibility
- Keep indentation consistent (2 spaces)

### CSS (`css/style.css`)
- Organise rules in the same top-to-bottom order as the HTML sections they style
- Use CSS custom properties (`--variable-name`) for colours, spacing, and font sizes so theming is easy
- Group related rules with a comment header, e.g. `/* === TIMER === */`
- Avoid overly specific selectors; keep specificity low
- Use `rem` / `em` for font sizes and spacing; `px` is acceptable for borders and small fixed values
- Responsive layout via CSS `flexbox` or `grid`; no media-query breakpoint frameworks

### JavaScript (`js/script.js`)
- Organise code into clearly named functions; one function = one responsibility
- Group related functions together with a comment header, e.g. `// === TIMER ===`
- Use `const` by default; use `let` only when reassignment is necessary; never use `var`
- Use `addEventListener` for all event handling; do not use inline `onclick` attributes in HTML
- Access the DOM with `document.querySelector` / `document.querySelectorAll`; cache references in `const` variables at the top of each section
- `localStorage` keys must be consistent — use the constants defined below
- Do not use `eval`, `innerHTML` for user-supplied content (use `textContent` or `createElement` to prevent XSS)

### localStorage Keys
| Key | Type | Purpose |
|-----|------|---------|
| `dashboard_tasks` | JSON array | Persisted to-do list items |
| `dashboard_links` | JSON array | Persisted quick links |

---

## Day-by-Day Development Plan (Reference)

| Day | Focus |
|-----|-------|
| 1 | Project setup, HTML structure, base CSS layout |
| 2 | Realtime clock, date display, time-based greeting |
| 3 | Focus timer (25 min, Start / Stop / Reset) |
| 4 | To-Do List with localStorage |
| 5 | Quick Links with localStorage, final polish & responsive fixes |

---

## Out of Scope

The following are explicitly not part of this project:

- User authentication or accounts
- Backend or database
- External API integrations
- Multiple pages or routing
- Drag-and-drop reordering
- Notifications or push alerts
- Dark/light mode toggle (unless added as a stretch goal after core features are done)
