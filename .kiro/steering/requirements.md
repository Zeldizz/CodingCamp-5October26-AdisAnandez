# To-Do List Life Dashboard — MVP Requirements Specification

## Document Info

| Field | Value |
|-------|-------|
| Project | To-Do List Life Dashboard |
| Scope | MVP only |
| Stack | HTML · CSS · Vanilla JavaScript · localStorage |
| Status | Draft |

---

## Conventions

- **EARS notation** is used where applicable:
  - **Ubiquitous:** `The system shall …`
  - **Event-driven:** `WHEN <trigger>, the system shall …`
  - **State-driven:** `WHILE <state>, the system shall …`
  - **Optional:** `WHERE <feature is included>, the system shall …`
  - **Unwanted behaviour:** `IF <condition>, THEN the system shall …`
- Each requirement has a unique ID (`REQ-XXX-NN`).
- Each user story follows the format: *As a [role], I want [goal] so that [benefit].*

---

## 1. Greeting & Clock

### User Stories

**US-CLK-01**
As a user, I want to see the current time on the dashboard so that I always know what time it is without looking elsewhere.

**US-CLK-02**
As a user, I want the time to update automatically so that it stays accurate while I keep the page open.

**US-CLK-03**
As a user, I want to see today's date so that I have a quick reference without opening another app.

**US-CLK-04**
As a user, I want to see a greeting that reflects the time of day so that the dashboard feels personal and contextually relevant.

### Functional Requirements

| ID | Requirement |
|----|-------------|
| REQ-CLK-01 | The system shall display the current local time in 24-hour HH:MM:SS format (e.g. 09:05:03, 14:30:00, 23:59:59). |
| REQ-CLK-02 | WHILE the page is open, the system shall update the displayed time every second. |
| REQ-CLK-03 | The system shall display the current date including the day name, month name, day number, and year (e.g. "Thursday, October 8, 2026"). |
| REQ-CLK-04 | WHEN the page loads or the time changes, the system shall display a greeting according to the following rules: |
| | — 05:00–11:59 → "Good Morning" |
| | — 12:00–17:59 → "Good Afternoon" |
| | — 18:00–20:59 → "Good Evening" |
| | — 21:00–04:59 → "Good Night" |
| REQ-CLK-05 | The system shall re-evaluate the greeting each time the clock ticks so it updates automatically at the boundary hour without requiring a page reload. |

### Acceptance Criteria

| ID | Scenario | Expected Result |
|----|----------|-----------------|
| AC-CLK-01 | User opens the page at 09:30 | Clock shows current time; date is correct; greeting reads "Good Morning" |
| AC-CLK-02 | User leaves the page open for 2 seconds | Displayed seconds increment by 2 |
| AC-CLK-03 | System clock crosses 12:00 while page is open | Greeting changes from "Good Morning" to "Good Afternoon" without reload |
| AC-CLK-04 | User opens the page at 22:00 | Greeting reads "Good Night" |
| AC-CLK-05 | User opens the page at 13:45 | Greeting reads "Good Afternoon" |

---

## 2. Focus Timer

### User Stories

**US-TMR-01**
As a user, I want a 25-minute countdown timer so that I can structure focused work sessions.

**US-TMR-02**
As a user, I want to start, stop, and reset the timer so that I have full control over my focus session.

**US-TMR-03**
As a user, I want to see the remaining time in MM:SS format so that I can track progress at a glance.

### Functional Requirements

| ID | Requirement |
|----|-------------|
| REQ-TMR-01 | The system shall initialise the timer display to 25:00 on page load. |
| REQ-TMR-02 | WHEN the user clicks Start, the system shall begin counting down one second at a time. |
| REQ-TMR-03 | WHILE the timer is running, the system shall update the display every second. |
| REQ-TMR-04 | WHILE the timer is running, the system shall disable the Start button and enable the Stop button. |
| REQ-TMR-05 | WHEN the user clicks Stop, the system shall pause the countdown at its current value. |
| REQ-TMR-06 | WHILE the timer is paused, the system shall enable the Start button so the user can resume. |
| REQ-TMR-07 | WHEN the user clicks Reset, the system shall stop any running countdown and return the display to 25:00. |
| REQ-TMR-08 | WHEN the timer reaches 00:00, the system shall stop the countdown automatically and disable the Start button. |
| REQ-TMR-09 | IF the timer has reached 00:00, THEN the system shall prevent the display from going below 00:00. |
| REQ-TMR-10 | The system shall display the timer in MM:SS format with zero-padding (e.g. 04:07, not 4:7). |
| REQ-TMR-11 | WHILE the timer is at 00:00, the system shall keep the Start button disabled until the user clicks Reset. |
| REQ-TMR-12 | WHEN the user clicks Reset after the timer has reached 00:00, the system shall return the display to 25:00 and re-enable the Start button. |

### Acceptance Criteria

| ID | Scenario | Expected Result |
|----|----------|-----------------|
| AC-TMR-01 | Page loads | Timer shows 25:00; Start is enabled; Stop is disabled |
| AC-TMR-02 | User clicks Start | Countdown begins; display ticks down each second |
| AC-TMR-03 | User clicks Stop while timer is running | Countdown pauses at current value; Start re-enables |
| AC-TMR-04 | User clicks Start after Stop | Countdown resumes from where it paused |
| AC-TMR-05 | User clicks Reset while timer is running | Timer stops and resets to 25:00 |
| AC-TMR-06 | User clicks Reset while timer is paused | Timer resets to 25:00 |
| AC-TMR-07 | Timer counts down to 00:00 | Countdown stops automatically; display stays at 00:00; Start button is disabled |
| AC-TMR-08 | User tries to click Start when timer is at 00:00 | Start button is disabled; timer does not go negative |
| AC-TMR-09 | User clicks Reset after timer has reached 00:00 | Timer resets to 25:00; Start button re-enables |

---

## 3. To-Do List

### User Stories

**US-TODO-01**
As a user, I want to add a new task so that I can track what I need to do today.

**US-TODO-02**
As a user, I want to edit an existing task so that I can fix a typo or update its description.

**US-TODO-03**
As a user, I want to mark a task as complete so that I can see my progress.

**US-TODO-04**
As a user, I want to unmark a completed task so that I can reopen it if needed.

**US-TODO-05**
As a user, I want to delete a task so that I can remove items I no longer need.

**US-TODO-06**
As a user, I want my tasks to still be there after I refresh the page so that I don't lose my list.

### Functional Requirements

| ID | Requirement |
|----|-------------|
| REQ-TODO-01 | The system shall provide a text input and an Add button for creating tasks. |
| REQ-TODO-02 | WHEN the user submits a non-empty task name (via button click or pressing Enter), the system shall add it to the list and clear the input field. |
| REQ-TODO-03 | IF the user submits an empty or whitespace-only input, THEN the system shall not add a task and shall indicate the input is required (e.g. focus the field or show an inline message). |
| REQ-TODO-04 | The system shall display each task with: its text, a complete/incomplete toggle control, an Edit button, and a Delete button. |
| REQ-TODO-05 | WHEN the user toggles the complete control on a task, the system shall mark that task as completed and apply a visual indicator (e.g. strikethrough text, muted colour). |
| REQ-TODO-06 | WHEN the user toggles the complete control on a completed task, the system shall mark it as incomplete and remove the visual indicator. |
| REQ-TODO-07 | WHEN the user clicks Edit on a task, the system shall make the task text editable in place (or replace it with an input pre-filled with the current text). |
| REQ-TODO-08 | WHEN the user confirms an edit (via a Save/Confirm button or pressing Enter), the system shall update the task text. |
| REQ-TODO-09 | IF the user confirms an edit with empty or whitespace-only text, THEN the system shall not save the change and shall keep the original text. |
| REQ-TODO-10 | WHEN the user clicks Delete on a task, the system shall remove that task from the list immediately. |
| REQ-TODO-11 | The system shall save the full task list to `localStorage` under the key `dashboard_tasks` whenever the list changes (add, edit, complete toggle, delete). |
| REQ-TODO-12 | WHEN the page loads, the system shall read `dashboard_tasks` from `localStorage` and render all saved tasks. |
| REQ-TODO-13 | IF `dashboard_tasks` is absent or unparseable in `localStorage`, THEN the system shall start with an empty task list without throwing an error. |

### Acceptance Criteria

| ID | Scenario | Expected Result |
|----|----------|-----------------|
| AC-TODO-01 | User types "Buy groceries" and clicks Add | Task appears in the list; input clears |
| AC-TODO-02 | User presses Enter with text in the input | Task is added (same as clicking Add) |
| AC-TODO-03 | User clicks Add with empty input | No task added; field is focused or error shown |
| AC-TODO-04 | User clicks Add with only spaces | No task added |
| AC-TODO-05 | User clicks the complete toggle on a task | Task shows strikethrough/muted style |
| AC-TODO-06 | User clicks the complete toggle on an already-completed task | Strikethrough is removed; task appears active |
| AC-TODO-07 | User clicks Edit on "Buy groceries" | Task becomes editable; input shows "Buy groceries" |
| AC-TODO-08 | User edits to "Buy groceries and milk", confirms | Task text updates to "Buy groceries and milk" |
| AC-TODO-09 | User clears edit input and confirms | Original text is kept; task unchanged |
| AC-TODO-10 | User clicks Delete on a task | Task is removed from the list immediately |
| AC-TODO-11 | User adds 3 tasks then refreshes the page | All 3 tasks are still visible |
| AC-TODO-12 | User marks a task complete then refreshes | Task is still shown as completed after reload |
| AC-TODO-13 | User opens the page for the first time (no localStorage) | Empty task list renders without errors |

---

## 4. Quick Links

### User Stories

**US-LNK-01**
As a user, I want to save a website with a custom name so that I can access it quickly from the dashboard.

**US-LNK-02**
As a user, I want to click a saved link and have it open the website so that I don't have to type URLs manually.

**US-LNK-03**
As a user, I want to delete a quick link I no longer need so that my links list stays tidy.

**US-LNK-04**
As a user, I want my quick links to persist after a page refresh so that I don't have to re-enter them each session.

### Functional Requirements

| ID | Requirement |
|----|-------------|
| REQ-LNK-01 | The system shall provide two inputs (link name, URL) and an Add button for creating quick links. |
| REQ-LNK-02 | WHEN the user submits a link with both a non-empty name and a non-empty URL, the system shall add it to the links list. |
| REQ-LNK-03 | IF either the link name or URL is empty or whitespace-only, THEN the system shall not add the link and shall indicate which field is missing. |
| REQ-LNK-04 | IF the entered URL does not begin with `http://` or `https://`, THEN the system shall automatically prepend `https://` before saving. |
| REQ-LNK-05 | The system shall display each quick link as a clickable element showing the link name. |
| REQ-LNK-06 | WHEN the user clicks a quick link, the system shall open the stored URL in a new browser tab. |
| REQ-LNK-07 | WHEN the user clicks Delete on a quick link, the system shall remove it from the list immediately. |
| REQ-LNK-08 | The system shall save the full links list to `localStorage` under the key `dashboard_links` whenever the list changes (add, delete). |
| REQ-LNK-09 | WHEN the page loads, the system shall read `dashboard_links` from `localStorage` and render all saved links. |
| REQ-LNK-10 | IF `dashboard_links` is absent or unparseable in `localStorage`, THEN the system shall start with an empty links list without throwing an error. |

### Acceptance Criteria

| ID | Scenario | Expected Result |
|----|----------|-----------------|
| AC-LNK-01 | User enters name "GitHub" and URL "https://github.com", clicks Add | Link appears in the list showing "GitHub" |
| AC-LNK-02 | User clicks the "GitHub" link | `https://github.com` opens in a new tab |
| AC-LNK-03 | User enters name "Docs" and URL "docs.example.com" (no protocol) | Link is saved as "https://docs.example.com" and opens correctly |
| AC-LNK-04 | User clicks Add with empty name | Link not added; name field highlighted or focused |
| AC-LNK-05 | User clicks Add with empty URL | Link not added; URL field highlighted or focused |
| AC-LNK-06 | User clicks Delete on "GitHub" | Link is removed immediately |
| AC-LNK-07 | User adds 2 links then refreshes the page | Both links are still displayed |
| AC-LNK-08 | User opens the page for the first time | Empty links list renders without errors |

---

## 5. UI & UX

### Functional Requirements

| ID | Requirement |
|----|-------------|
| REQ-UI-01 | The page shall have a single `<main>` element containing four clearly separated sections: Greeting/Clock, Focus Timer, To-Do List, Quick Links. |
| REQ-UI-02 | The layout shall be responsive: readable and usable on a viewport as narrow as 375px and as wide as 1440px. |
| REQ-UI-03 | The system shall use readable font sizes — body text no smaller than 14px; headings no smaller than 18px. |
| REQ-UI-04 | All interactive controls (buttons, inputs) shall have sufficient size and spacing to be easily clickable on both desktop and touch screens. |
| REQ-UI-05 | Completed tasks shall be visually distinct from incomplete tasks (e.g. strikethrough text, reduced opacity). |
| REQ-UI-06 | The page shall load and render correctly in the current stable versions of Chrome, Firefox, Edge, and Safari. |
| REQ-UI-07 | The page shall not depend on any external CSS or JS file loaded from a CDN. All assets are local. |

---

## 6. Data Model Reference

### Task Object
```json
{
  "id": "string (unique, e.g. timestamp-based)",
  "text": "string",
  "completed": "boolean"
}
```

### Quick Link Object
```json
{
  "id": "string (unique, e.g. timestamp-based)",
  "name": "string",
  "url": "string (always starts with http:// or https://)"
}
```

---

## 7. Out of Scope (MVP)

The following are deferred to a later phase:

| Feature | Reason deferred |
|---------|-----------------|
| Light / dark mode toggle | Polish feature; not core functionality |
| Custom user name in greeting | Personalisation; adds storage complexity |
| Custom Pomodoro duration | Advanced setting; default 25 min covers the MVP |
| Duplicate task prevention | Edge-case UX; adds logic complexity |
| Task sorting / filtering | Nice-to-have; not required for basic usability |
| Drag-and-drop reordering | Advanced interaction; outside beginner scope |
| Notifications / audio alerts | Browser permission complexity; out of scope |
