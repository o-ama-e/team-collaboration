# Redeemer's University Student Portal (RUN)
This is the final year project for Ama Emmanuel—a fully interactive, high-fidelity academic student portal designed to manage course registration, semester results, lecture schedules, and tuition payments.

## 🚀 Live Demo & How to Run
Since this application is a high-fidelity Single Page Application (SPA) built with pure client-side technologies, it requires no complex servers or backend installation:
1. Open [index.html](file:///C:/Users/user/team-collaboration/index.html) directly in any modern web browser (Chrome, Firefox, Safari, Edge).
2. Enjoy the seamless, responsive user experience!

---

## 🎨 Technology Stack
- **Structure**: HTML5 Semantic markup
- **Styling**: Tailwind CSS v4 (via real-time browser runtime `@tailwindcss/browser`)
- **Custom Enhancements**: Custom CSS variables, smooth animations, customized scrollbars, and `@media print` sheets for generating official registration slips and academic transcripts.
- **Interactivity**: Pure, native Vanilla JavaScript (for application state management, tab routing, notifications, modal popups, transaction flows, and Canvas charts).

---

## 💎 Features & Modules

### 1. Unified Student Dashboard
- **Greeting Banner**: Welcome header with real-time status details.
- **Interactive Metric Cards**: Displays matriculation number, current level, department, CGPA, academic standing, and tuition due balance.
- **GPA Growth Chart**: Custom HTML5 2D Canvas chart tracking GPA history over semesters.
- **Faculty Advising Panel**: Details of the student's assigned supervisor with quick email link.

### 2. Digital Course Registration
- **Course Selection Table**: Lists core courses and electives for the 400 Level Harmattan Semester.
- **Automatic Credit Compliance**: Dynamic validator calculating units limit (requires a minimum of 12 credits and a maximum of 24 credits to enable submission).
- **Registration Slip**: Generates a high-quality printable PDF layout slip, complete with institutional seal, electronic registrar approval signature, and simulated barcode hashes.
- *Note: In accordance with academic guidelines, course registration submission is blocked if there are outstanding tuition payments.*

### 3. Result Checker & Unofficial Transcript
- **Semester Filter**: Interactive dropdown selector displaying past grades (Year 1 to Year 3).
- **Academic Metrics**: Live computation of GPA and Cumulative GPA (CGPA) for the selected timeframe.
- **Unofficial Transcript Generator**: Renders a formal, print-formatted transcript sheet detailing all semesters, credit points, and overall final CGPA.

### 4. Lecture Timetable & Schedule
- **Weekly Schedule Block**: Clear card layouts showing Monday to Friday lecture slots, room locations, times, and course codes.

### 5. Tuition Payment Portal
- **Invoice Tracking**: History tracker separating paid invoices and pending balance bills.
- **Tuition Checkout Simulator**: Secure credit card input window with live format validators (Auto-spacing card numbers, MM/YY inputs, secure CVV).
- **Payment Processing**: Simulated backend processing spinner, payment success overlays, and real-time ledger update (clearing the tuition balance).

### 6. Preferences & Portal Settings
- **Preferences Selector**: A toggler button to switch the user interface between Light and Dark mode.
- **Contact Details Updater**: Modify school email, phone number, and home address.
- **Security Updates**: Change portal access password with verification validation checks.
