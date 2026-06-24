# Ama's University Student Portal

A fully interactive, high-fidelity single-page application (SPA) academic student portal built entirely with vanilla frontend technologies. Designed for course registration, semester results, lecture schedules, tuition payments, ID card management, and residence allocation.

**Project by**: Ama Emmanuel

---

## Table of Contents

- [Overview](#overview)
- [How to Run](#how-to-run)
- [Technology Stack](#technology-stack)
- [Features & Modules](#features--modules)
- [Frontend Architecture](#frontend-architecture)
  - [HTML Structure](#html-structure)
  - [JavaScript Architecture](#javascript-architecture)
  - [CSS & Styling](#css--styling)

---

## Overview

This project is a **client-side only** student portal that simulates a full academic management system. It demonstrates sophisticated frontend engineering without any backend dependency — all data, routing, and application state live entirely in the browser. The application consists of a **public-facing landing page** (university homepage) and a **restricted student portal** with seven functional modules.

---

## How to Run

Since this is a pure client-side SPA, no server or build step is required:

1. Open **`index.html`** directly in any modern web browser (Chrome, Firefox, Safari, Edge).
2. Click **"Access Portal"** or **"Enter Student Portal"** on the landing page.
3. On the login screen, the demo credentials are pre-filled — simply click **Sign In** to access the student dashboard.

---

## Technology Stack

| Layer         | Technology                                                              |
| ------------- | ----------------------------------------------------------------------- |
| **Markup**    | HTML5 semantic elements (`<nav>`, `<section>`, `<main>`, `<dialog>`)    |
| **Styling**   | Tailwind CSS v4 (via `@tailwindcss/browser` CDN runtime) + Custom CSS   |
| **Logic**     | Pure Vanilla JavaScript (ES6+), no frameworks, no libraries             |
| **Charts**    | HTML5 Canvas 2D API (custom GPA trend chart)                            |
| **Storage**   | `localStorage` for persistent session state and user preferences        |
| **Fonts**     | Google Fonts — Outfit (sans-serif)                                      |
| **Icons**     | Inline SVG icons (no icon library dependency)                           |

---

## Features & Modules

### 0. Landing Page (University Homepage)

The public-facing entry point features a full university website experience:

- **Navigation bar** with links to Home, About AMA, Colleges, and Media Center.
- **Hero section** with gradient typography, call-to-action buttons, and campus imagery.
- **Admissions banner** announcing the 2026/2027 intake.
- **Dark/Light theme toggle** accessible before even logging in.
- A dedicated **login modal** with animated form, pre-filled demo credentials, credential validation, and "Remember Me" persistence.

### 1. Student Dashboard

The main hub after login, displaying:

- **Greeting banner** with the student's name, matriculation number, and current level.
- **Metric cards** showing CGPA, academic standing, tuition balance, and department info.
- **GPA Growth Chart** — a custom HTML5 Canvas line chart plotting GPA progression across semesters (100L through 300L) with gradient fill, labeled axes, and responsive resolution (DPI-aware rendering).
- **Faculty Advisor Panel** — displays assigned supervisor details with a one-click email link.
- **Recent activity timeline** showing portal events (login, registration, payments).

### 2. Digital Course Registration

A full course registration workflow:

- **Course Selection Table** listing 400-level Harmattan semester courses (core + electives) with code, title, credits, type, lecturer, and description.
- **Credit Limit Validator** — enforces minimum 12 and maximum 24 credit units dynamically. The submit button enables/disables based on compliance.
- **Registration Slip Generation** — produces a print-formatted slip with institutional seal, registrar signature, barcode hash, student details, and selected course list. Activated via `window.print()` with custom `@media print` styles.
- **Tuition Hold Check** — registration is blocked if the student has outstanding tuition fees.
- **Toast notification system** confirms successful registration.

### 3. Result Checker & Unofficial Transcript

Semester-by-semester academic records viewer:

- **Semester Filter** — dropdown to select past semesters from 100L through 300L.
- **Grade Table** — course-by-course breakdown with letter grades and grade points.
- **Live GPA Calculation** — computes semester GPA and cumulative CGPA from the loaded data.
- **Unofficial Transcript Generator** — renders a comprehensive transcript document listing all completed semesters, total credit points, and final CGPA, formatted for printing.

### 4. Lecture Timetable

A weekly academic schedule view:

- **Day blocks** for Monday through Friday showing lecture slots.
- **Course cards** with course code, title, time, venue, and lecturer.
- **Visual differentiation** between morning, afternoon, and evening sessions.

### 5. Tuition Payment Portal

A simulated payment processing system:

- **Invoice History** — list of paid invoices and outstanding balances.
- **Payment Form** — credit/debit card input with live formatting:
  - Auto-spacing of 16-digit card numbers.
  - MM/YY expiry with slash auto-insertion.
  - Masked CVV entry.
- **Processing Simulation** — spinner overlay simulating backend payment processing.
- **Success/Failure Flows** — animated success overlay with confetti effect; ledger updates the balance in real time.

### 6. Preferences & Settings

User-configurable portal settings:

- **Theme Toggle** — switch between Light and Dark mode (persisted via `localStorage`).
- **Contact Details** — editable email, phone, and home address fields.
- **Password Change** — update portal password with confirmation validation.

### 7. ID Card

A digital student identification card:

- **3D Flip Animation** — click the card to reveal the back side (CSS `perspective` + `rotateY` transform with `backface-visibility`).
- **Front Side** — student photo, name, matric number, department, level, and issue date.
- **Back Side** — emergency contact, blood group, QR code placeholder, and institutional signature.

### 8. Residence Allocation

Hall accommodation management:

- **Hall Assignment Display** — allocated hall name, room number, and bed space.
- **Residence Details** — check-in date, duration, and contact information for the hall porter.

---

## Frontend Architecture

### HTML Structure

The entire application lives in a single **`index.html`** file organized into distinct sections:

```
index.html
├── <head>: meta tags, Tailwind CDN, custom CSS link, font import
├── Landing Page (#landing-page)
│   ├── Navbar (university branding, nav links, theme toggle, CTA)
│   ├── Hero Section (tagline, description, buttons, campus image)
│   ├── Academics Section (colleges: Computing, Law, Sciences, Management)
│   └── Footer
├── Login Modal (#login-modal)
│   ├── Tabbed forms (Student Login)
│   ├── Pre-filled credentials
│   └── Remember Me checkbox
├── Portal Shell (#portal-shell)
│   ├── Sidebar (navigation tabs, user avatar, logout)
│   ├── Dashboard Tab (#tab-dashboard)
│   │   ├── Metric cards (matric, CGPA, standing, balance)
│   │   ├── GPA Chart (<canvas>)
│   │   └── Advisor panel
│   ├── Course Registration Tab (#tab-registration)
│   │   ├── Course selection table
│   │   ├── Credit counter badge
│   │   └── Registration slip (printable)
│   ├── Results Tab (#tab-results)
│   │   ├── Semester dropdown
│   │   ├── Grade table
│   │   └── Transcript generator
│   ├── Timetable Tab (#tab-timetable)
│   │   └── Weekly schedule blocks
│   ├── Payments Tab (#tab-payments)
│   │   ├── Invoice history
│   │   └── Card payment form
│   ├── ID Card Tab (#tab-idcard)
│   │   └── 3D flip card
│   ├── Residence Tab (#tab-residence)
│   │   └── Hall allocation card
│   └── Settings Tab (#tab-settings)
│       ├── Theme toggle
│       ├── Contact editor
│       └── Password change form
├── Toast Notification Container
└── Modal Overlays (generic modal system)
```

**Key HTML patterns used:**
- Semantic `<section>` elements with `id` attributes for tab routing.
- `<dialog>` elements for modals (login, payment success, etc.).
- `<canvas>` for the GPA chart (sized with DPI-aware resolution).
- `data-*` attributes on interactive elements for event delegation.
- `@media print` targeted classes (`.no-print`, `.printable-document`) for registration slip and transcript printing.

### JavaScript Architecture

The entire application logic resides in **`app.js`** — a single vanilla JavaScript file (~1,400 lines) organized into these systems:

#### State Management (`window.STATE`)

A centralized state object holds all application state:

```js
{
  loggedIn: boolean,
  theme: 'light' | 'dark',
  currentTab: string,
  user: object | null,
  selectedCourses: array,
  notifications: array,
  readNotifications: array
}
```

- **`loadState()`** — deserializes from `localStorage` on page load, merging with defaults.
- **`saveState()`** — persists to `localStorage` after every state mutation.
- **`DEFAULT_STATE`** — provides safe fallback values when storage is empty or corrupted.

#### Data Layer

Hardcoded datasets simulate backend responses:

- **`STUDENT_DATA`** — profile info, GPA history array, tuition balance, advisor details, contact info.
- **`COURSES_DATA`** — 10 courses (8 core + 2 elective) with code, title, units, type, lecturer, description.
- **`SEMESTER_DATA`** — 6 semesters of grade records with course codes, letter grades, and grade points.

#### Tab Routing & Navigation

A simple hash-free tab system using click handlers on sidebar items:

1. Clicking a sidebar tab calls `switchTab(tabId)`.
2. All tab panels are hidden via `classList` removal (`hidden` class).
3. The target tab panel is shown.
4. `currentTab` in state is updated and saved.

#### Key Functions

| Function                      | Purpose                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| `switchTab(id)`               | Routes between dashboard / registration / results / etc.    |
| `login()` / `logout()`        | Authentication simulation with credential validation        |
| `toggleTheme()`               | Switches dark/light mode, persists preference               |
| `updateCredits()`             | Validates selected courses against 12–24 credit range       |
| `registerCourses()`           | Submits selected courses (blocked if balance > 0)           |
| `generateSlip()`              | Builds and opens print dialog for registration slip         |
| `filterSemester()`            | Loads grade data for the selected semester                  |
| `computeGpa(grades)`          | Calculates GPA from grade points / total units              |
| `computeCgpa(semesters)`      | Aggregates all semesters for cumulative GPA                 |
| `generateTranscript()`        | Renders print-formatted full transcript                     |
| `drawGpaChart()`              | Canvas 2D chart — line graph with gradient fill, DPI-aware  |
| `processPayment()`            | Simulates card payment with spinner + success overlay       |
| `formatCardNumber()`          | Auto-spaces 16-digit input into 4-4-4-4 groups              |
| `formatExpiry()`              | Auto-inserts `/` in MM/YY input                             |
| `showToast(msg, type)`        | Displays animated toast notification                        |
| `flipIdCard()`                | Toggles 3D CSS flip on the ID card                          |
| `shareToSocial(type)`         | Simulates social media sharing (Twitter, Facebook, WhatsApp) |

#### Event Binding

All event listeners are attached in a `DOMContentLoaded` handler using element IDs:

```js
document.getElementById('login-btn').addEventListener('click', login);
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
```

No frameworks, no virtual DOM, no reactive bindings — just direct DOM manipulation.

#### Chart Rendering (Canvas)

The GPA chart (`drawGpaChart()`) uses the HTML5 Canvas 2D API:
- **DPI-aware sizing** — uses `devicePixelRatio` to render crisp on Retina/HiDPI displays.
- **Grid lines** with 5 horizontal GPA reference lines (0.0 through 5.0).
- **Line path** connecting semester data points with `lineJoin: 'round'`.
- **Gradient fill** beneath the line using `createLinearGradient`.
- **Data point dots** — white circles at each semester marker.
- **Theme-aware colors** — detects dark mode and adjusts text, grid, and fill colors.

#### Notification System

A toast notification system at the bottom-right:
- Messages are queued and displayed sequentially.
- Each toast auto-dismisses after 3 seconds.
- Three types: `success` (green), `error` (red), `info` (indigo).
- Entry/exit animations via CSS keyframes (`.animate-toast-in`, `.animate-toast-out`).

#### Modal System

A generic overlay modal system:
- `openModal(title, content)` — sets title and body HTML, shows overlay with fade-in.
- `closeModal()` — hides the modal.
- Used by: login, payment confirmation, registration slip preview, success overlays.

### CSS & Styling

Styling combines **Tailwind CSS v4** (loaded via CDN) with **`styles.css`** (294 lines of custom styles).

#### Tailwind CSS v4 (CDN Runtime)

```html
<script src="https://unpkg.com/@tailwindcss/browser@4"></script>
```

This loads the Tailwind JIT compiler in the browser, allowing utility classes to work at runtime. Used for:
- Layout: `flex`, `grid`, `grid-cols-*`, `gap-*`, `max-w-*`, `mx-auto`
- Spacing: `p-*`, `m-*`, `px-*`, `py-*`
- Typography: `text-*`, `font-*`, `leading-*`, `tracking-*`
- Colors: `bg-*`, `text-*`, `border-*`, `shadow-*`
- Responsive: `md:*`, `lg:*` breakpoints
- Dark mode: `dark:*` variant classes
- State: `hover:*`, `focus:*`, `group-hover:*`
- Transitions: `transition-*`, `duration-*`

#### Custom CSS (`styles.css`)

| Feature                | Implementation                                                |
| ---------------------- | ------------------------------------------------------------- |
| **Base**               | Outfit font import, CSS reset, custom `@theme` tokens         |
| **Selection**          | Styled `::selection` in light and dark mode                   |
| **Scrollbar**          | Custom `::-webkit-scrollbar` with indigo thumb                |
| **Animations**         | `fadeIn`, `slideInRight`, `pulseBorder`, `toastIn`, `toastOut`, `spin` |
| **Glassmorphism**      | `.glass-panel` with `backdrop-filter: blur()` + semi-transparent bg |
| **3D Card Flip**       | `perspective` + `rotateY(180deg)` + `backface-visibility: hidden` |
| **Drawer**             | `.drawer-closed` / `.drawer-content` with `translateX` transitions |
| **Spinner**            | CSS `border` trick with `spin` animation                     |
| **Progress Ring**      | SVG circle with `stroke-dashoffset` transition                |
| **Toast**              | Fixed-position container with animated enter/exit             |
| **Print**              | `@media print` block: hides `.no-print`, formats A4 documents |
| **Dark Mode**          | `.dark` overrides for scrollbar, inputs, panels, toasts       |
| **Focus**              | `:focus-visible` outlines for keyboard accessibility          |

#### Dark Mode Strategy

Dark mode is toggled by adding/removing the `dark` class on `<html>`:

```html
<html class="dark">
```

Tailwind's `dark:` variant handles most color changes. Custom CSS uses `.dark` ancestor selectors for scrollbar, toast, glass panel, and chart colors. The preference is persisted in `localStorage` and restored on page load.

#### Print Stylesheet

The `@media print` block at the bottom of `styles.css` handles:
- Hiding navigation, buttons, and interactive elements (`.no-print`).
- Resetting backgrounds to white, text to black.
- A4 page dimensions with 15mm margins.
- `page-break-inside: avoid` on registration slip, transcript, and ID card.
- Removing shadows and borders for clean document output.

---

## Data Persistence

All persistent data uses the browser's `localStorage`:

| Key                      | Stored Data                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `AMAS_PORTAL_STATE_V4.2` | JSON: login state, theme preference, selected courses, notifications |
| (implicit)               | Dark mode preference on `<html>` class + state object       |

No cookies, no sessionStorage, no server calls. The application is fully offline-capable after the initial page load.

---

## Browser Compatibility

Works in all modern browsers that support:
- ES6+ JavaScript (arrow functions, `let`/`const`, template literals, classes)
- HTML5 Canvas 2D API
- CSS Custom Properties
- CSS `backdrop-filter`
- CSS 3D Transforms (`perspective`, `rotateY`, `backface-visibility`)
- `localStorage` API
- `@media print` with `@page` rules

Recommended: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+.

---

## File Structure

```
team-collaboration/
├── index.html           # Main HTML file (landing page + portal SPA)
├── app.js               # All JavaScript logic (state, routing, features)
├── styles.css           # Custom CSS (animations, glassmorphism, print, dark mode)
├── README.md            # This file
├── campus_hero.jpg      # Hero section campus image
├── student_profile.jpg  # Student profile photo for ID card
└── university_banner.jpg # University branding banner
```
