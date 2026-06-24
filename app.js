/* ============================================================
   REDEEMER'S UNIVERSITY STUDENT PORTAL — app.js
   Single-file vanilla JS SPA
   ============================================================ */

// ─── STATE MANAGEMENT ─────────────────────────────────────────
const STORAGE_KEY = 'RUN_PORTAL_STATE_V4.1';

const DEFAULT_STATE = {
  loggedIn: false,
  theme: 'light',
  currentTab: 'dashboard',
  user: null,
  selectedCourses: [],
  notifications: [],
  readNotifications: []
};

window.STATE = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      window.STATE = { ...DEFAULT_STATE, ...parsed };
    } else {
      window.STATE = { ...DEFAULT_STATE };
    }
  } catch (e) {
    window.STATE = { ...DEFAULT_STATE };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(window.STATE));
  } catch (e) { /* quota exceeded, ignore */ }
}

// ─── DATA ─────────────────────────────────────────────────────
const STUDENT_DATA = {
  name: 'Ama O. Emmanuel',
  matric: 'RUN/CMP/22/1042',
  dept: 'Computer Science',
  faculty: 'College of Natural Sciences',
  level: '400 Level',
  cgpa: 3.82,
  gpaHistory: [
    { semester: '100L-1', gpa: 3.20 },
    { semester: '100L-2', gpa: 3.45 },
    { semester: '200L-1', gpa: 3.60 },
    { semester: '200L-2', gpa: 3.75 },
    { semester: '300L-1', gpa: 3.80 },
    { semester: '300L-2', gpa: 3.82 }
  ],
  tuitionBalance: 1400.00,
  email: 'emmanuel.ama@run.edu.ng',
  phone: '+234 803 456 7890',
  address: '12, Peace Estate, Ede, Osun State',
  advisor: {
    name: 'Prof. K. O. Adeyemi',
    email: 'adeyemiko@run.edu.ng'
  }
};

const COURSES_DATA = [
  { code: 'CSC401', title: 'Software Engineering', units: 3, type: 'Core', lecturer: 'Dr. T. O. Banjo', description: 'Principles and methodologies of software development lifecycle, requirements engineering, design patterns, testing, and project management.' },
  { code: 'CSC403', title: 'Compiler Construction', units: 3, type: 'Core', lecturer: 'Dr. J. O. Ogundele', description: 'Study of parsing methodologies, lexical analysis, syntax-directed translation, code generation and optimization techniques.' },
  { code: 'CSC405', title: 'Artificial Intelligence', units: 3, type: 'Core', lecturer: 'Prof. M. A. Olanrewaju', description: 'Foundations of AI including search algorithms, knowledge representation, machine learning, and neural networks.' },
  { code: 'CSC407', title: 'Computer Networks', units: 3, type: 'Core', lecturer: 'Dr. B. S. Ogunleye', description: 'Network architectures, protocols, OSI and TCP/IP models, routing, network security and management.' },
  { code: 'CSC409', title: 'Operating Systems II', units: 3, type: 'Core', lecturer: 'Dr. F. A. Odetola', description: 'Advanced OS concepts: memory management, virtual memory, file systems, distributed systems and security.' },
  { code: 'CSC411', title: 'Database Systems', units: 3, type: 'Core', lecturer: 'Prof. O. O. Ogunlade', description: 'Relational database design, SQL, normalization, transaction processing, and distributed databases.' },
  { code: 'CSC413', title: 'Numerical Methods', units: 3, type: 'Core', lecturer: 'Dr. A. O. Fasanya', description: 'Numerical analysis, error analysis, interpolation, numerical integration and differential equations.' },
  { code: 'CSC415', title: 'Research Methods', units: 2, type: 'Core', lecturer: 'Prof. K. O. Adeyemi', description: 'Scientific research methodology, literature review, data collection, analysis techniques and academic writing.' },
  { code: 'GNS401', title: 'Entrepreneurship Studies', units: 2, type: 'Elective', lecturer: 'Dr. O. O. Ogunyemi', description: 'Business planning, opportunity identification, venture creation, and small business management.' },
  { code: 'ENT401', title: 'Innovation Management', units: 2, type: 'Elective', lecturer: 'Dr. O. A. Ogunlade', description: 'Managing innovation processes, technology transfer, intellectual property, and commercialization.' },
  { code: 'CSC417', title: 'Human Computer Interaction', units: 2, type: 'Elective', lecturer: 'Dr. T. O. Ogunseye', description: 'Usability engineering, user-centered design, interface evaluation methods and accessibility.' }
];

const SEMESTER_DATA = [
  {
    id: '100L-1',
    label: '100 Level — First Semester',
    courses: [
      { code: 'CSC101', title: 'Introduction to Computing', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC103', title: 'Introductory Mathematics I', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC105', title: 'Logic & Linear Algebra', units: 3, grade: 'B', gradePoint: 4 },
      { code: 'GNS101', title: 'Use of English I', units: 2, grade: 'A', gradePoint: 5 },
      { code: 'GNS103', title: 'Nigerian Peoples & Culture', units: 2, grade: 'A', gradePoint: 5 },
      { code: 'PHY101', title: 'General Physics I', units: 3, grade: 'B', gradePoint: 4 }
    ]
  },
  {
    id: '100L-2',
    label: '100 Level — Second Semester',
    courses: [
      { code: 'CSC102', title: 'Computer Programming I', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC104', title: 'Introductory Mathematics II', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC106', title: 'Discrete Structures', units: 3, grade: 'B', gradePoint: 4 },
      { code: 'GNS102', title: 'Use of English II', units: 2, grade: 'A', gradePoint: 5 },
      { code: 'PHY102', title: 'General Physics II', units: 3, grade: 'B', gradePoint: 4 },
      { code: 'CHM101', title: 'General Chemistry', units: 3, grade: 'C', gradePoint: 3 }
    ]
  },
  {
    id: '200L-1',
    label: '200 Level — First Semester',
    courses: [
      { code: 'CSC201', title: 'Object Oriented Programming', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC203', title: 'Data Structures & Algorithms', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC205', title: 'Digital Logic Design', units: 3, grade: 'B', gradePoint: 4 },
      { code: 'CSC207', title: 'Web Technologies', units: 2, grade: 'A', gradePoint: 5 },
      { code: 'GNS201', title: 'Philosophy & Logic', units: 2, grade: 'B', gradePoint: 4 },
      { code: 'MTS201', title: 'Probability & Statistics', units: 3, grade: 'B', gradePoint: 4 }
    ]
  },
  {
    id: '200L-2',
    label: '200 Level — Second Semester',
    courses: [
      { code: 'CSC202', title: 'Computer Programming II', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC204', title: 'Computer Architecture', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC206', title: 'Software Engineering I', units: 3, grade: 'B', gradePoint: 4 },
      { code: 'CSC208', title: 'Database Management Sys.', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'GNS202', title: 'Peace & Conflict Studies', units: 2, grade: 'A', gradePoint: 5 }
    ]
  },
  {
    id: '300L-1',
    label: '300 Level — First Semester',
    courses: [
      { code: 'CSC301', title: 'Operating Systems I', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC303', title: 'Computer Networks I', units: 3, grade: 'B', gradePoint: 4 },
      { code: 'CSC305', title: 'Theory of Computation', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC307', title: 'Numerical Analysis', units: 3, grade: 'B', gradePoint: 4 },
      { code: 'CSC309', title: 'System Analysis & Design', units: 3, grade: 'B', gradePoint: 4 },
      { code: 'GNS301', title: 'Entrepreneurship I', units: 2, grade: 'A', gradePoint: 5 }
    ]
  },
  {
    id: '300L-2',
    label: '300 Level — Second Semester',
    courses: [
      { code: 'CSC302', title: 'Operating Systems II', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC304', title: 'Computer Networks II', units: 3, grade: 'A', gradePoint: 5 },
      { code: 'CSC306', title: 'Artificial Intelligence', units: 3, grade: 'B', gradePoint: 4 },
      { code: 'CSC308', title: 'Research Methodology', units: 2, grade: 'A', gradePoint: 5 },
      { code: 'CSC310', title: 'Compiler Construction', units: 3, grade: 'B', gradePoint: 4 }
    ]
  }
];

const SCHEDULE_DATA = [
  { day: 'Monday', time: '08:00 — 10:00', course: 'Software Engineering', code: 'CSC401', venue: 'NLecture Hall A', lecturer: 'Dr. T. O. Banjo' },
  { day: 'Monday', time: '12:00 — 14:00', course: 'Compiler Construction', code: 'CSC403', venue: 'CS Lab 2', lecturer: 'Dr. J. O. Ogundele' },
  { day: 'Tuesday', time: '09:00 — 11:00', course: 'Artificial Intelligence', code: 'CSC405', venue: 'NLecture Hall B', lecturer: 'Prof. M. A. Olanrewaju' },
  { day: 'Tuesday', time: '14:00 — 16:00', course: 'Computer Networks', code: 'CSC407', venue: 'CS Lab 1', lecturer: 'Dr. B. S. Ogunleye' },
  { day: 'Wednesday', time: '08:00 — 10:00', course: 'Operating Systems II', code: 'CSC409', venue: 'NLecture Hall A', lecturer: 'Dr. F. A. Odetola' },
  { day: 'Wednesday', time: '11:00 — 13:00', course: 'Database Systems', code: 'CSC411', venue: 'CS Lab 1', lecturer: 'Prof. O. O. Ogunlade' },
  { day: 'Thursday', time: '09:00 — 11:00', course: 'Numerical Methods', code: 'CSC413', venue: 'NLecture Hall B', lecturer: 'Dr. A. O. Fasanya' },
  { day: 'Thursday', time: '13:00 — 15:00', course: 'Research Methods', code: 'CSC415', venue: 'Seminar Room 3', lecturer: 'Prof. K. O. Adeyemi' },
  { day: 'Friday', time: '10:00 — 12:00', course: 'Entrepreneurship Studies', code: 'GNS401', venue: 'Business School Hall', lecturer: 'Dr. O. O. Ogunyemi' }
];

const EXAMS_DATA = [
  { code: 'CSC401', title: 'Software Engineering', dateTime: '2026-03-10 09:00 — 12:00', venue: 'Main Hall A', seat: 'A-042' },
  { code: 'CSC403', title: 'Compiler Construction', dateTime: '2026-03-13 09:00 — 12:00', venue: 'Main Hall B', seat: 'B-107' },
  { code: 'CSC405', title: 'Artificial Intelligence', dateTime: '2026-03-17 14:00 — 17:00', venue: 'Main Hall A', seat: 'A-056' },
  { code: 'CSC407', title: 'Computer Networks', dateTime: '2026-03-20 09:00 — 12:00', venue: 'CS Lab Complex', seat: 'LB-12' },
  { code: 'CSC409', title: 'Operating Systems II', dateTime: '2026-03-24 14:00 — 17:00', venue: 'NLecture Hall', seat: 'N-023' },
  { code: 'CSC411', title: 'Database Systems', dateTime: '2026-03-27 09:00 — 12:00', venue: 'Main Hall B', seat: 'B-088' },
  { code: 'CSC413', title: 'Numerical Methods', dateTime: '2026-04-01 14:00 — 17:00', venue: 'NLecture Hall', seat: 'N-045' },
  { code: 'CSC415', title: 'Research Methods', dateTime: '2026-04-03 09:00 — 11:00', venue: 'Seminar Room', seat: 'SR-08' },
  { code: 'GNS401', title: 'Entrepreneurship Studies', dateTime: '2026-04-07 09:00 — 12:00', venue: 'Business School Hall', seat: 'BZ-12' }
];

const HOSTEL_DATA = {
  hall: 'Redemption Hall',
  block: 'Block B',
  room: 'Room 104',
  bedspace: 'Bedspace 3',
  status: 'Allocated & Settled',
  warden: 'Mr. A. C. Obi',
  category: '4-Bedspace Standard',
  roommates: [
    { name: 'Okonkwo C. Chinedu', matric: 'RUN/CMP/22/1038', phone: '+234 803 123 4567', email: 'okonkwoc@run.edu.ng' },
    { name: 'Okafor M. Nnamdi', matric: 'RUN/CMP/22/1051', phone: '+234 806 234 5678', email: 'okaform@run.edu.ng' },
    { name: 'Adebayo K. Oluwaseun', matric: 'RUN/CMP/22/1067', phone: '+234 802 345 6789', email: 'adebayok@run.edu.ng' }
  ]
};

const INVOICES_DATA = [
  { id: 'INV-2026-001', description: 'Tuition Fee — Harmattan Semester', date: '2026-01-15', amount: 850.00, status: 'unpaid' },
  { id: 'INV-2026-002', description: 'Accommodation Fee', date: '2026-01-15', amount: 350.00, status: 'unpaid' },
  { id: 'INV-2026-003', description: 'Computer Science Lab Fee', date: '2026-01-15', amount: 120.00, status: 'unpaid' },
  { id: 'INV-2025-089', description: 'Library Development Levy', date: '2025-09-10', amount: 50.00, status: 'paid' },
  { id: 'INV-2025-090', description: 'Sports & Recreation Fee', date: '2025-09-10', amount: 30.00, status: 'paid' },
  { id: 'INV-2025-088', description: 'ICT Infrastructure Levy', date: '2025-09-10', amount: 80.00, status: 'paid' },
  { id: 'INV-2025-076', description: 'Tuition Fee — Rain Semester', date: '2025-08-20', amount: 800.00, status: 'paid' }
];

const NOTIFICATIONS_DATA = [
  { id: 1, title: 'Registration Deadline', message: 'Course registration for Harmattan semester closes on March 15th. Please complete your selection.', time: '2 hours ago', read: false },
  { id: 2, title: 'Tuition Payment Reminder', message: 'Your tuition balance of $1,400.00 is outstanding. Late payment attracts a penalty fee.', time: '1 day ago', read: false },
  { id: 3, title: 'Results Published', message: '300 Level Second Semester results are now available on the portal.', time: '3 days ago', read: false },
  { id: 4, title: 'Timetable Updated', message: 'Your lecture timetable has been updated for the Harmattan semester. Check the Portal Timetable section.', time: '1 week ago', read: false },
  { id: 5, title: 'Exam Schedule', message: 'Harmattan semester exams begin March 10, 2026. Download your exam slip.', time: '2 weeks ago', read: true }
];

// ─── TOAST SYSTEM ────────────────────────────────────────────
function showToast(message, type) {
  type = type || 'info';
  const container = document.getElementById('toast-container');
  if (!container) {
    const div = document.createElement('div');
    div.id = 'toast-container';
    div.className = 'toast-container';
    document.body.appendChild(div);
  }
  const c = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast toast-' + type + ' animate-toast-in';
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = '<span class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ' +
    (type === 'success' ? 'bg-emerald-100 text-emerald-700' : type === 'error' ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700') +
    '">' + (icons[type] || 'ℹ') + '</span>' +
    '<span class="text-xs font-semibold text-slate-700 dark:text-slate-300 flex-1">' + message + '</span>';
  c.appendChild(toast);
  setTimeout(function() {
    toast.classList.remove('animate-toast-in');
    toast.classList.add('animate-toast-out');
    setTimeout(function() { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 350);
  }, 3500);
}

// ─── THEME ───────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = theme === 'dark'
      ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'
      : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
  }
}

function toggleTheme() {
  var newTheme = window.STATE.theme === 'dark' ? 'light' : 'dark';
  window.STATE.theme = newTheme;
  saveState();
  applyTheme(newTheme);
  drawGpaChart();
}

// ─── LOGIN / LOGOUT ──────────────────────────────────────────
function handleLogin(e) {
  e.preventDefault();
  var matric = document.getElementById('login-matric').value.trim();
  var password = document.getElementById('login-password').value;
  if (matric === 'RUN/CMP/22/1042' && password === 'password') {
    window.STATE.loggedIn = true;
    window.STATE.user = STUDENT_DATA;
    saveState();
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('portal-container').style.display = 'flex';
    initApp();
  } else {
    showToast('Invalid matric number or password. Please try again.', 'error');
  }
}

function handleLogout() {
  window.STATE.loggedIn = false;
  window.STATE.user = null;
  window.STATE.currentTab = 'dashboard';
  window.STATE.selectedCourses = [];
  saveState();
  document.getElementById('portal-container').style.display = 'none';
  document.getElementById('login-page').style.display = 'flex';
  document.getElementById('login-form').reset();
}

// ─── TAB ROUTING ─────────────────────────────────────────────
function switchTab(tabName) {
  window.STATE.currentTab = tabName;
  saveState();

  // Hide all sections
  var sections = document.querySelectorAll('.tab-content-section');
  for (var i = 0; i < sections.length; i++) {
    sections[i].classList.add('hidden');
  }

  // Show target
  var targetMap = {
    dashboard: 'dashboard-section',
    course_registration: 'course_registration-section',
    result_checker: 'result_checker-section',
    attendance_timetable: 'attendance_timetable-section',
    hostel_allocation: 'hostel_allocation-section',
    payments: 'payments-section',
    settings: 'settings-section'
  };
  var target = document.getElementById(targetMap[tabName]);
  if (target) target.classList.remove('hidden');

  // Update sidebar active link
  var links = document.querySelectorAll('#sidebar [data-tab]');
  for (var j = 0; j < links.length; j++) {
    links[j].classList.remove('bg-indigo-50', 'text-indigo-600', 'dark:bg-slate-800', 'dark:text-indigo-400');
    links[j].classList.add('text-slate-600', 'dark:text-slate-400');
    if (links[j].getAttribute('data-tab') === tabName) {
      links[j].classList.remove('text-slate-600', 'dark:text-slate-400');
      links[j].classList.add('bg-indigo-50', 'text-indigo-600', 'dark:bg-slate-800', 'dark:text-indigo-400');
    }
  }

  // Render tab content
  if (tabName === 'dashboard') renderDashboard();
  else if (tabName === 'course_registration') renderCourseRegistration();
  else if (tabName === 'result_checker') renderResultChecker();
  else if (tabName === 'attendance_timetable') renderTimetable();
  else if (tabName === 'hostel_allocation') renderHostel();
  else if (tabName === 'payments') renderPayments();
  else if (tabName === 'settings') renderSettings();

  // Close mobile sidebar
  var sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.add('-translate-x-full');

  // Redraw chart if dashboard
  if (tabName === 'dashboard') setTimeout(drawGpaChart, 100);
}

// ─── DASHBOARD ───────────────────────────────────────────────
function renderDashboard() {
  var s = STUDENT_DATA;
  var els = document.querySelectorAll('.student-name');
  for (var i = 0; i < els.length; i++) els[i].textContent = s.name;
  var depts = document.querySelectorAll('.student-dept');
  for (var j = 0; j < depts.length; j++) depts[j].textContent = s.dept;
  var mats = document.querySelectorAll('.student-matric');
  for (var k = 0; k < mats.length; k++) mats[k].textContent = s.matric;
  var lvls = document.querySelectorAll('.student-level');
  for (var l = 0; l < lvls.length; l++) lvls[l].textContent = s.level;
  var cgp = document.querySelectorAll('.student-cgpa');
  for (var m = 0; m < cgp.length; m++) cgp[m].textContent = s.cgpa.toFixed(2);
  var bal = document.querySelectorAll('.dashboard-outstanding-text');
  for (var n = 0; n < bal.length; n++) bal[n].textContent = '$' + s.tuitionBalance.toFixed(2);

  // Metric cards
  var metricMappings = [
    { selector: '.metric-matric', value: s.matric },
    { selector: '.metric-level', value: s.level },
    { selector: '.metric-dept', value: s.dept },
    { selector: '.metric-faculty', value: s.faculty }
  ];
  for (var p = 0; p < metricMappings.length; p++) {
    var el = document.querySelector(metricMappings[p].selector);
    if (el) el.textContent = metricMappings[p].value;
  }

  // Advisor
  var advisorName = document.querySelector('.advisor-name');
  var advisorEmail = document.querySelector('.advisor-email');
  if (advisorName) advisorName.textContent = s.advisor.name;
  if (advisorEmail) {
    advisorEmail.textContent = s.advisor.email;
    advisorEmail.href = 'mailto:' + s.advisor.email;
  }

  // Today's schedule
  var todayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var todayIdx = new Date().getDay();
  var todayName = todayNames[todayIdx];
  var dayLabel = document.querySelector('#today-day-label');
  if (dayLabel) dayLabel.textContent = todayName;

  var todayClasses = SCHEDULE_DATA.filter(function(c) { return c.day === todayName; });
  var scheduleContainer = document.getElementById('schedule-cards-container');
  if (scheduleContainer) {
    scheduleContainer.innerHTML = '';
    var allDays = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
    for (var d = 0; d < allDays.length; d++) {
      var dayClasses = SCHEDULE_DATA.filter(function(c) { return c.day === allDays[d]; });
      if (dayClasses.length === 0) continue;
      var dayCard = document.createElement('div');
      dayCard.className = 'glass-panel p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80';
      var dayHeader = document.createElement('div');
      dayHeader.className = 'flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800';
      dayHeader.innerHTML = '<span class="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase">' + allDays[d] + '</span>';
      if (allDays[d] === todayName) {
        dayHeader.innerHTML += '<span class="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold">Today</span>';
      }
      dayCard.appendChild(dayHeader);
      for (var c = 0; c < dayClasses.length; c++) {
        var cl = dayClasses[c];
        var item = document.createElement('div');
        item.className = 'flex items-center gap-3 py-2';
        item.innerHTML = '<div class="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></div>' +
          '<div class="flex-1 min-w-0"><p class="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">' + cl.course + '</p>' +
          '<p class="text-[10px] text-slate-400">' + cl.time + ' · ' + cl.venue + '</p></div>' +
          '<span class="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded-md">' + cl.code + '</span>';
        dayCard.appendChild(item);
      }
      scheduleContainer.appendChild(dayCard);
    }
  }
}

// ─── CGPA CHART ──────────────────────────────────────────────
function drawGpaChart() {
  var canvas = document.getElementById('gpaChart');
  if (!canvas) return;
  var rect = canvas.getBoundingClientRect();
  var dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  var w = rect.width;
  var h = rect.height;

  var isDark = document.documentElement.classList.contains('dark');
  var textColor = isDark ? '#94a3b8' : '#64748b';
  var gridColor = isDark ? 'rgba(51,65,85,0.4)' : 'rgba(226,232,240,0.8)';
  var lineColor = '#4f46e5';
  var fillGrad = ctx.createLinearGradient(0, 0, 0, h);
  fillGrad.addColorStop(0, isDark ? 'rgba(79,70,229,0.25)' : 'rgba(79,70,229,0.15)');
  fillGrad.addColorStop(1, isDark ? 'rgba(79,70,229,0.02)' : 'rgba(79,70,229,0.01)');

  var data = STUDENT_DATA.gpaHistory;
  if (!data || data.length < 2) return;

  var pad = { top: 20, bottom: 30, left: 40, right: 20 };
  var chartW = w - pad.left - pad.right;
  var chartH = h - pad.top - pad.bottom;

  ctx.clearRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;
  ctx.font = '9px Outfit, sans-serif';
  ctx.fillStyle = textColor;
  ctx.textAlign = 'right';
  for (var g = 0; g <= 5; g++) {
    var y = pad.top + chartH - (g / 5) * chartH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    ctx.fillText(g.toFixed(1), pad.left - 5, y + 3);
  }

  // X labels
  ctx.textAlign = 'center';
  for (var x = 0; x < data.length; x++) {
    var xPos = pad.left + (x / (data.length - 1)) * chartW;
    ctx.fillText(data[x].semester, xPos, h - 5);
  }

  // Line
  ctx.beginPath();
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  for (var i = 0; i < data.length; i++) {
    var px = pad.left + (i / (data.length - 1)) * chartW;
    var py = pad.top + chartH - (data[i].gpa / 5) * chartH;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Fill
  ctx.lineTo(pad.left + chartW, pad.top + chartH);
  ctx.lineTo(pad.left, pad.top + chartH);
  ctx.closePath();
  ctx.fillStyle = fillGrad;
  ctx.fill();

  // Dots
  for (var d = 0; d < data.length; d++) {
    var dx = pad.left + (d / (data.length - 1)) * chartW;
    var dy = pad.top + chartH - (data[d].gpa / 5) * chartH;
    ctx.beginPath();
    ctx.arc(dx, dy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  }
}

// ─── COURSE REGISTRATION ─────────────────────────────────────
function renderCourseRegistration() {
  var tbody = document.getElementById('courses-selection-container');
  if (!tbody) return;
  tbody.innerHTML = '';
  var selected = window.STATE.selectedCourses || [];
  var totalUnits = selected.reduce(function(sum, code) {
    var c = COURSES_DATA.find(function(co) { return co.code === code; });
    return sum + (c ? c.units : 0);
  }, 0);

  for (var i = 0; i < COURSES_DATA.length; i++) {
    var c = COURSES_DATA[i];
    var isSelected = selected.indexOf(c.code) !== -1;
    var wouldExceed = !isSelected && (totalUnits + c.units > 24);
    var tr = document.createElement('tr');
    tr.className = 'border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors';
    tr.innerHTML = '<td class="px-6 py-4 text-center"><input type="checkbox" class="course-checkbox w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" data-code="' + c.code + '"' +
      (isSelected ? ' checked' : '') + (wouldExceed ? ' disabled' : '') + '></td>' +
      '<td class="px-6 py-4"><button class="text-indigo-600 dark:text-indigo-400 font-bold text-xs hover:underline bg-transparent border-0 cursor-pointer course-code-btn" data-code="' + c.code + '">' + c.code + '</button></td>' +
      '<td class="px-6 py-4 text-xs font-semibold text-slate-700 dark:text-slate-300">' + c.title + '</td>' +
      '<td class="px-6 py-4 text-center text-xs font-bold text-slate-600 dark:text-slate-400">' + c.units + '</td>' +
      '<td class="px-6 py-4 text-center"><span class="inline-block px-2 py-0.5 rounded-md text-[9px] font-bold ' +
      (c.type === 'Core' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400') +
      '">' + c.type + '</span></td>';
    tbody.appendChild(tr);
  }

  // Update counts
  document.getElementById('selected-courses-count').textContent = selected.length;
  var unitsEl = document.getElementById('selected-units-count');
  if (unitsEl) unitsEl.textContent = totalUnits + ' / 24';

  // Submit button
  validateRegistration();
}

function handleCourseCheckbox(e) {
  var code = e.target.getAttribute('data-code');
  var selected = window.STATE.selectedCourses || [];
  var idx = selected.indexOf(code);
  if (e.target.checked) {
    if (idx === -1) selected.push(code);
  } else {
    if (idx !== -1) selected.splice(idx, 1);
  }
  window.STATE.selectedCourses = selected;
  saveState();
  renderCourseRegistration();
}

function openCourseDrawer(code) {
  var c = COURSES_DATA.find(function(co) { return co.code === code; });
  if (!c) return;
  document.getElementById('drawer-course-code').textContent = c.code;
  document.getElementById('drawer-course-title').textContent = c.title;
  document.getElementById('drawer-course-lecturer').textContent = c.lecturer;
  document.getElementById('drawer-course-units').textContent = c.units + ' Units';
  document.getElementById('drawer-course-type').textContent = c.type;
  document.getElementById('drawer-course-desc').textContent = c.description;
  var drawer = document.getElementById('course-outline-drawer');
  drawer.classList.remove('drawer-closed');
}

function closeCourseDrawer() {
  document.getElementById('course-outline-drawer').classList.add('drawer-closed');
}

function validateRegistration() {
  var selected = window.STATE.selectedCourses || [];
  var totalUnits = selected.reduce(function(sum, code) {
    var c = COURSES_DATA.find(function(co) { return co.code === code; });
    return sum + (c ? c.units : 0);
  }, 0);
  var btn = document.getElementById('submit-registration-btn');
  if (btn) btn.disabled = (totalUnits < 12 || totalUnits > 24);
}

function submitRegistration() {
  var selected = window.STATE.selectedCourses || [];
  var totalUnits = selected.reduce(function(sum, code) {
    var c = COURSES_DATA.find(function(co) { return co.code === code; });
    return sum + (c ? c.units : 0);
  }, 0);

  if (totalUnits < 12) { showToast('Minimum of 12 credit units required.', 'error'); return; }
  if (totalUnits > 24) { showToast('Maximum of 24 credit units allowed.', 'error'); return; }
  if (STUDENT_DATA.tuitionBalance > 0) { showToast('Please clear outstanding tuition balance before registering.', 'error'); return; }

  // Populate slip
  var s = STUDENT_DATA;
  document.getElementById('slip-student-name').textContent = s.name;
  document.getElementById('slip-student-matric').textContent = s.matric;
  document.getElementById('slip-student-dept').textContent = s.dept;
  document.getElementById('slip-student-level').textContent = s.level;
  document.getElementById('slip-student-date').textContent = new Date().toLocaleString();

  var tbody = document.getElementById('slip-courses-table-body');
  tbody.innerHTML = '';
  var serial = 1;
  for (var i = 0; i < COURSES_DATA.length; i++) {
    if (selected.indexOf(COURSES_DATA[i].code) !== -1) {
      var c = COURSES_DATA[i];
      var tr = document.createElement('tr');
      tr.className = 'border-b border-slate-50 dark:border-slate-800/40';
      tr.innerHTML = '<td class="px-4 py-2 text-center text-xs text-slate-500">' + serial + '</td>' +
        '<td class="px-4 py-2 text-xs font-semibold text-slate-700">' + c.code + '</td>' +
        '<td class="px-4 py-2 text-xs text-slate-600">' + c.title + '</td>' +
        '<td class="px-4 py-2 text-center text-xs font-bold">' + c.units + '</td>' +
        '<td class="px-4 py-2 text-center text-xs">' + c.type + '</td>';
      tbody.appendChild(tr);
      serial++;
    }
  }
  document.getElementById('slip-total-units').textContent = totalUnits;
  document.getElementById('registration-slip-modal').style.display = 'flex';
}

function closeSlipModal() {
  document.getElementById('registration-slip-modal').style.display = 'none';
}

function printSlip() {
  window.print();
}

// ─── RESULT CHECKER ──────────────────────────────────────────
function renderResultChecker() {
  var selector = document.getElementById('semester-selector');
  if (!selector) return;
  selector.innerHTML = '';
  for (var i = 0; i < SEMESTER_DATA.length; i++) {
    var opt = document.createElement('option');
    opt.value = SEMESTER_DATA[i].id;
    opt.textContent = SEMESTER_DATA[i].label;
    selector.appendChild(opt);
  }
  displaySemesterResults(SEMESTER_DATA[0].id);
}

function displaySemesterResults(semId) {
  var sem = SEMESTER_DATA.find(function(s) { return s.id === semId; });
  if (!sem) return;

  // Table
  var tbody = document.getElementById('results-table-body');
  tbody.innerHTML = '';
  var totalWeighted = 0;
  var totalUnits = 0;

  for (var i = 0; i < sem.courses.length; i++) {
    var c = sem.courses[i];
    var weighted = c.units * c.gradePoint;
    totalWeighted += weighted;
    totalUnits += c.units;
    var tr = document.createElement('tr');
    tr.className = 'border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/20';
    tr.innerHTML = '<td class="px-6 py-4 text-xs font-semibold text-slate-700">' + c.code + '</td>' +
      '<td class="px-6 py-4 text-xs text-slate-600">' + c.title + '</td>' +
      '<td class="px-6 py-4 text-center text-xs font-bold">' + c.units + '</td>' +
      '<td class="px-6 py-4 text-center"><span class="inline-block px-2 py-0.5 rounded font-bold text-xs ' +
      (c.gradePoint >= 4 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' :
       c.gradePoint >= 3 ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400' :
       'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400') +
      '">' + c.grade + '</span></td>' +
      '<td class="px-6 py-4 text-center text-xs font-bold text-slate-700">' + c.gradePoint.toFixed(1) + '</td>' +
      '<td class="px-6 py-4 text-center text-xs font-bold text-slate-700">' + weighted.toFixed(1) + '</td>';
    tbody.appendChild(tr);
  }

  // Stats
  var gpa = totalUnits > 0 ? (totalWeighted / totalUnits) : 0;
  var semIdx = SEMESTER_DATA.indexOf(sem);
  var cumWeighted = 0;
  var cumUnits = 0;
  for (var j = 0; j <= semIdx; j++) {
    for (var k = 0; k < SEMESTER_DATA[j].courses.length; k++) {
      cumWeighted += SEMESTER_DATA[j].courses[k].units * SEMESTER_DATA[j].courses[k].gradePoint;
      cumUnits += SEMESTER_DATA[j].courses[k].units;
    }
  }
  var cgpa = cumUnits > 0 ? (cumWeighted / cumUnits) : 0;

  var statsContainer = document.getElementById('result-stats-container');
  statsContainer.innerHTML = '';
  var stats = [
    { label: 'Total Credit Units', value: totalUnits },
    { label: 'Semester GPA', value: gpa.toFixed(2) },
    { label: 'Cumulative CGPA', value: cgpa.toFixed(2) }
  ];
  for (var s = 0; s < stats.length; s++) {
    var card = document.createElement('div');
    card.className = 'glass-panel p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center';
    card.innerHTML = '<span class="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">' + stats[s].label + '</span>' +
      '<p class="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1">' + stats[s].value + '</p>';
    statsContainer.appendChild(card);
  }
  updateChartColor();
}

function updateChartColor() {
  drawGpaChart();
}

function generateTranscript() {
  var w = window.open('', '_blank');
  if (!w) { showToast('Please allow pop-ups for this site.', 'error'); return; }
  var s = STUDENT_DATA;
  var cumWeighted = 0;
  var cumUnits = 0;
  var rows = '';
  for (var i = 0; i < SEMESTER_DATA.length; i++) {
    var sem = SEMESTER_DATA[i];
    var semW = 0, semU = 0;
    for (var j = 0; j < sem.courses.length; j++) {
      semW += sem.courses[j].units * sem.courses[j].gradePoint;
      semU += sem.courses[j].units;
      cumWeighted += sem.courses[j].units * sem.courses[j].gradePoint;
      cumUnits += sem.courses[j].units;
    }
    var semGpa = semU > 0 ? (semW / semU).toFixed(2) : '0.00';
    rows += '<tr style="background:#f8fafc;"><td colspan="6" style="padding:10px 12px;font-weight:800;font-size:12px;color:#1e293b;">' + sem.label + ' — GPA: ' + semGpa + '</td></tr>';
    for (var k = 0; k < sem.courses.length; k++) {
      var c = sem.courses[k];
      rows += '<tr style="border-bottom:1px solid #e2e8f0;">' +
        '<td style="padding:6px 12px;font-size:11px;">' + c.code + '</td>' +
        '<td style="padding:6px 12px;font-size:11px;">' + c.title + '</td>' +
        '<td style="padding:6px 12px;text-align:center;font-size:11px;">' + c.units + '</td>' +
        '<td style="padding:6px 12px;text-align:center;font-size:11px;font-weight:700;">' + c.grade + '</td>' +
        '<td style="padding:6px 12px;text-align:center;font-size:11px;">' + c.gradePoint + '</td>' +
        '<td style="padding:6px 12px;text-align:center;font-size:11px;">' + (c.units * c.gradePoint) + '</td></tr>';
    }
  }
  var finalCgpa = cumUnits > 0 ? (cumWeighted / cumUnits).toFixed(2) : '0.00';

  w.document.write('<!DOCTYPE html><html><head><title>Transcript — ' + s.name + '</title>' +
    '<style>body{font-family:Georgia,serif;font-size:12pt;color:#000;padding:40px;max-width:800px;margin:auto;}' +
    'h1{font-size:18pt;text-align:center;margin-bottom:2px;}h2{font-size:11pt;text-align:center;color:#555;margin-top:0;font-weight:400;}' +
    '.info{display:flex;justify-content:space-between;font-size:10pt;margin:20px 0;padding:10px 0;border-top:2px solid #000;border-bottom:2px solid #000;}' +
    'table{width:100%;border-collapse:collapse;margin-top:10px;}th{background:#1e293b;color:#fff;padding:8px 12px;font-size:10px;text-align:left;}' +
    'td{padding:6px 12px;font-size:11px;} .cgpa{text-align:right;font-size:14pt;font-weight:800;margin-top:20px;}' +
    '.footer{text-align:center;font-size:9pt;color:#888;margin-top:40px;border-top:1px solid #ccc;padding-top:15px;}' +
    '@media print{body{padding:20px;}}</style></head><body>' +
    '<h1>REDEEMER\'S UNIVERSITY</h1><h2>Ede, Osun State, Nigeria — Official Academic Transcript</h2>' +
    '<div class="info"><span><strong>' + s.name + '</strong> — ' + s.matric + '</span><span><strong>Programme:</strong> B.Sc. ' + s.dept + '</span></div>' +
    '<table><tr><th>Code</th><th>Course Title</th><th>Units</th><th>Grade</th><th>GP</th><th>W.P.</th></tr>' + rows + '</table>' +
    '<div class="cgpa">Cumulative GPA: ' + finalCgpa + '</div>' +
    '<div class="footer">This is an unofficial transcript generated from the student portal for advisory purposes.</div>' +
    '</body></html>');
  w.document.close();
}

// ─── TIMETABLE & EXAMS ───────────────────────────────────────
function renderTimetable() {
  renderSchedule();
  renderExams();
}

function renderSchedule() {
  var container = document.getElementById('schedule-cards-container');
  if (!container) return;
  container.innerHTML = '';
  var days = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
  for (var d = 0; d < days.length; d++) {
    var dayClasses = SCHEDULE_DATA.filter(function(c) { return c.day === days[d]; });
    if (dayClasses.length === 0) continue;
    var card = document.createElement('div');
    card.className = 'glass-panel p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 glass-card-hover';
    var header = document.createElement('div');
    header.className = 'flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800';
    header.innerHTML = '<span class="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase">' + days[d] + '</span>';
    card.appendChild(header);
    for (var c = 0; c < dayClasses.length; c++) {
      var cl = dayClasses[c];
      var item = document.createElement('div');
      item.className = 'flex items-start gap-3 py-2';
      var timeColor = '#4f46e5';
      if (cl.code === 'CSC407') timeColor = '#0891b2';
      else if (cl.code === 'GNS401') timeColor = '#d97706';
      item.innerHTML = '<div class="w-0.5 h-full min-h-10 rounded-full flex-shrink-0" style="background:' + timeColor + '"></div>' +
        '<div class="flex-1 min-w-0"><p class="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">' + cl.course + '</p>' +
        '<p class="text-[10px] text-slate-400 mt-0.5">' + cl.time + '</p></div>' +
        '<div class="text-right flex-shrink-0"><p class="text-[9px] font-bold text-indigo-600 dark:text-indigo-400">' + cl.code + '</p>' +
        '<p class="text-[9px] text-slate-400">' + cl.venue + '</p></div>';
      card.appendChild(item);
    }
    container.appendChild(card);
  }
}

function renderExams() {
  var tbody = document.getElementById('exams-timetable-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  for (var i = 0; i < EXAMS_DATA.length; i++) {
    var e = EXAMS_DATA[i];
    var tr = document.createElement('tr');
    tr.className = 'border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/20';
    tr.innerHTML = '<td class="px-6 py-4 text-xs font-bold text-indigo-600">' + e.code + '</td>' +
      '<td class="px-6 py-4 text-xs text-slate-700 dark:text-slate-300">' + e.title + '</td>' +
      '<td class="px-6 py-4 text-xs text-slate-600">' + e.dateTime + '</td>' +
      '<td class="px-6 py-4 text-xs font-semibold">' + e.venue + '</td>' +
      '<td class="px-6 py-4 text-center"><span class="inline-block px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">' + e.seat + '</span></td>';
    tbody.appendChild(tr);
  }
}

function switchSubTab(tab) {
  var timetableBtn = document.getElementById('tab-sub-timetable');
  var examsBtn = document.getElementById('tab-sub-exams');
  var timetableView = document.getElementById('sub-timetable-view');
  var examsView = document.getElementById('sub-exams-view');

  if (tab === 'timetable') {
    timetableBtn.className = 'px-5 py-2.5 text-xs font-extrabold rounded-xl bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 transition-colors cursor-pointer border-0';
    examsBtn.className = 'px-5 py-2.5 text-xs font-extrabold rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border-0';
    timetableView.classList.remove('hidden');
    examsView.classList.add('hidden');
  } else {
    examsBtn.className = 'px-5 py-2.5 text-xs font-extrabold rounded-xl bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 transition-colors cursor-pointer border-0';
    timetableBtn.className = 'px-5 py-2.5 text-xs font-extrabold rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border-0';
    examsView.classList.remove('hidden');
    timetableView.classList.add('hidden');
  }
}

// ─── HOSTEL ALLOCATION ──────────────────────────────────────
function renderHostel() {
  var h = HOSTEL_DATA;
  document.getElementById('hostel-assigned-name').textContent = h.hall;
  document.getElementById('hostel-room-detail').textContent = h.block + ', ' + h.room + ' (' + h.bedspace + ')';
  document.getElementById('hostel-room-status').textContent = h.status;

  var container = document.getElementById('roommates-container');
  container.innerHTML = '';
  for (var i = 0; i < h.roommates.length; i++) {
    var r = h.roommates[i];
    var initials = r.name.split(' ').map(function(n) { return n[0]; }).join('');
    var card = document.createElement('div');
    card.className = 'flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60';
    card.innerHTML = '<div class="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black text-xs flex-shrink-0">' + initials + '</div>' +
      '<div class="flex-1 min-w-0"><p class="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">' + r.name + '</p>' +
      '<p class="text-[10px] text-slate-400">' + r.matric + '</p></div>' +
      '<div class="flex gap-2"><a href="tel:' + r.phone + '" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-colors" title="Call">' +
      '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></a>' +
      '<a href="mailto:' + r.email + '" class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-indigo-600 transition-colors" title="Email">' +
      '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></a></div>';
    container.appendChild(card);
  }
}

// ─── PAYMENTS ───────────────────────────────────────────────
function renderPayments() {
  renderBillingSummary();
  renderInvoices();
}

function renderBillingSummary() {
  var container = document.getElementById('billing-summary-container');
  if (!container) return;
  container.innerHTML = '';
  var paid = 0, outstanding = 0, count = INVOICES_DATA.length;
  for (var i = 0; i < INVOICES_DATA.length; i++) {
    if (INVOICES_DATA[i].status === 'paid') paid += INVOICES_DATA[i].amount;
    else outstanding += INVOICES_DATA[i].amount;
  }
  var cards = [
    { label: 'Total Paid', value: '$' + paid.toFixed(2), color: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Outstanding', value: '$' + outstanding.toFixed(2), color: 'text-rose-600 dark:text-rose-400' },
    { label: 'Total Invoices', value: count.toString(), color: 'text-indigo-600 dark:text-indigo-400' }
  ];
  for (var j = 0; j < cards.length; j++) {
    var card = document.createElement('div');
    card.className = 'glass-panel p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center';
    card.innerHTML = '<span class="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500">' + cards[j].label + '</span>' +
      '<p class="text-2xl font-black mt-1 ' + cards[j].color + '">' + cards[j].value + '</p>';
    container.appendChild(card);
  }

  // Show/hide pay button
  var btn = document.getElementById('pay-fees-btn');
  if (btn) btn.style.display = outstanding > 0 ? 'inline-flex' : 'none';
}

function renderInvoices() {
  var tbody = document.getElementById('invoices-ledger-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  for (var i = 0; i < INVOICES_DATA.length; i++) {
    var inv = INVOICES_DATA[i];
    var isPaid = inv.status === 'paid';
    var tr = document.createElement('tr');
    tr.className = 'border-b border-slate-50 dark:border-slate-800/40 hover:bg-slate-50/50 dark:hover:bg-slate-800/20';
    tr.innerHTML = '<td class="px-6 py-4 text-xs font-bold text-slate-700">' + inv.id + '</td>' +
      '<td class="px-6 py-4 text-xs text-slate-600">' + inv.description + '</td>' +
      '<td class="px-6 py-4 text-xs text-slate-500">' + inv.date + '</td>' +
      '<td class="px-6 py-4 text-center text-xs font-bold text-slate-700">$' + inv.amount.toFixed(2) + '</td>' +
      '<td class="px-6 py-4 text-center"><span class="inline-block px-2 py-0.5 rounded text-[9px] font-bold ' +
      (isPaid ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400') +
      '">' + (isPaid ? 'Paid' : 'Unpaid') + '</span></td>' +
      '<td class="px-6 py-4 text-center">' +
      (isPaid ? '<button onclick="showToast(\'Receipt downloaded: ' + inv.id + '\', \'success\')" class="text-[10px] font-bold text-indigo-600 hover:underline bg-transparent border-0 cursor-pointer">Receipt</button>' : '<span class="text-[10px] text-slate-400">—</span>') +
      '</td>';
    tbody.appendChild(tr);
  }
}

function openPayModal() {
  var outstanding = 0;
  for (var i = 0; i < INVOICES_DATA.length; i++) {
    if (INVOICES_DATA[i].status === 'unpaid') outstanding += INVOICES_DATA[i].amount;
  }
  document.getElementById('amount-to-pay-label').textContent = '$' + outstanding.toFixed(2);
  document.getElementById('payment-modal').style.display = 'flex';
}

function closePayModal() {
  document.getElementById('payment-modal').style.display = 'none';
}

function handleCheckout(e) {
  e.preventDefault();
  var cardNum = document.getElementById('card-number-input').value.replace(/\s/g, '');
  var expiry = document.getElementById('card-expiry-input').value;
  var cvv = document.getElementById('card-cvv-input').value;

  if (cardNum.length < 16) { showToast('Please enter a valid 16-digit card number.', 'error'); return; }
  if (!/^\d{2}\/\d{2}$/.test(expiry)) { showToast('Please enter a valid expiry date (MM/YY).', 'error'); return; }
  if (cvv.length < 3) { showToast('Please enter a valid CVV.', 'error'); return; }

  var btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Processing...';

  setTimeout(function() {
    for (var i = 0; i < INVOICES_DATA.length; i++) {
      if (INVOICES_DATA[i].status === 'unpaid') INVOICES_DATA[i].status = 'paid';
    }
    STUDENT_DATA.tuitionBalance = 0;
    showToast('Payment successful! Outstanding balance cleared.', 'success');
    closePayModal();
    renderPayments();
    btn.disabled = false;
    btn.textContent = 'Submit Tuition Payment';
    document.getElementById('checkout-card-form').reset();
  }, 1500);
}

// ─── SETTINGS ────────────────────────────────────────────────
function renderSettings() {
  var s = STUDENT_DATA;
  var emailEl = document.getElementById('settings-email');
  var phoneEl = document.getElementById('settings-phone');
  var addrEl = document.getElementById('settings-address');
  if (emailEl) emailEl.value = s.email;
  if (phoneEl) phoneEl.value = s.phone;
  if (addrEl) addrEl.value = s.address;

  // ID Card auto-flip
  setTimeout(function() {
    var inner = document.querySelector('.id-card-inner');
    if (inner) inner.classList.add('flipped');
    setTimeout(function() {
      if (inner) inner.classList.remove('flipped');
    }, 1000);
  }, 3000);
}

function handleProfileSave(e) {
  e.preventDefault();
  STUDENT_DATA.email = document.getElementById('settings-email').value;
  STUDENT_DATA.phone = document.getElementById('settings-phone').value;
  STUDENT_DATA.address = document.getElementById('settings-address').value;
  saveState();
  showToast('Profile updated successfully.', 'success');
}

function handlePasswordChange(e) {
  e.preventDefault();
  var cur = document.getElementById('settings-cur-pass').value;
  var newP = document.getElementById('settings-new-pass').value;
  var conf = document.getElementById('settings-conf-pass').value;

  if (cur !== 'password') { showToast('Current password is incorrect.', 'error'); return; }
  if (newP.length < 6) { showToast('New password must be at least 6 characters.', 'error'); return; }
  if (newP !== conf) { showToast('Passwords do not match.', 'error'); return; }

  showToast('Password updated successfully.', 'success');
  document.getElementById('security-settings-form').reset();
}

function toggleIdCard() {
  var inner = document.querySelector('.id-card-inner');
  if (inner) inner.classList.toggle('flipped');
}

function handlePhotoUpload(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    var imgs = document.querySelectorAll('.student-photo');
    for (var i = 0; i < imgs.length; i++) {
      imgs[i].src = ev.target.result;
    }
    showToast('Profile photo updated.', 'success');
  };
  reader.readAsDataURL(file);
}

function printIdCard() {
  window.print();
}

// ─── NOTIFICATIONS ──────────────────────────────────────────
function renderNotifications() {
  var list = document.getElementById('notif-list');
  if (!list) return;
  list.innerHTML = '';
  var unreadCount = 0;
  for (var i = 0; i < NOTIFICATIONS_DATA.length; i++) {
    var n = NOTIFICATIONS_DATA[i];
    var isUnread = !n.read;
    if (isUnread) unreadCount++;
    var item = document.createElement('div');
    item.className = 'p-4 border-b border-slate-100 dark:border-slate-800/60' + (isUnread ? ' bg-indigo-50/30 dark:bg-indigo-950/10' : '');
    item.innerHTML = '<div class="flex items-start gap-3"><div class="flex-1 min-w-0">' +
      '<div class="flex items-center gap-2"><p class="text-xs font-bold text-slate-700 dark:text-slate-300">' + n.title + '</p>' +
      (isUnread ? '<span class="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0"></span>' : '') +
      '</div><p class="text-[10px] text-slate-500 mt-1">' + n.message + '</p>' +
      '<p class="text-[9px] text-slate-400 mt-1.5">' + n.time + '</p></div></div>';
    list.appendChild(item);
  }
  var badge = document.getElementById('notif-badge');
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }
}

function toggleNotifications() {
  var dd = document.getElementById('notif-dropdown');
  dd.classList.toggle('hidden');
}

function markAllRead() {
  for (var i = 0; i < NOTIFICATIONS_DATA.length; i++) {
    NOTIFICATIONS_DATA[i].read = true;
  }
  renderNotifications();
  showToast('All notifications marked as read.', 'success');
}

// ─── MOBILE ──────────────────────────────────────────────────
function toggleMobileMenu() {
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('-translate-x-full');
}

// ─── EVENT SETUP ─────────────────────────────────────────────
function setupEvents() {
  // Login
  var loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  // Logout
  var logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  // Theme toggle
  var themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Tab routing
  var tabLinks = document.querySelectorAll('#sidebar [data-tab]');
  for (var i = 0; i < tabLinks.length; i++) {
    tabLinks[i].addEventListener('click', function(e) {
      e.preventDefault();
      var tab = this.getAttribute('data-tab');
      if (tab) switchTab(tab);
    });
  }

  // Mobile menu
  var mobileBtn = document.getElementById('mobile-menu-toggle');
  if (mobileBtn) mobileBtn.addEventListener('click', toggleMobileMenu);

  // Notifications
  var notifBtn = document.getElementById('notif-toggle-btn');
  if (notifBtn) notifBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleNotifications();
  });
  var markReadBtn = document.getElementById('notif-mark-read');
  if (markReadBtn) markReadBtn.addEventListener('click', markAllRead);

  // Close notif dropdown on outside click
  document.addEventListener('click', function() {
    var dd = document.getElementById('notif-dropdown');
    if (dd && !dd.classList.contains('hidden')) dd.classList.add('hidden');
  });
  var notifToggle = document.getElementById('notif-toggle-btn');
  if (notifToggle) {
    notifToggle.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  var notifDropdown = document.getElementById('notif-dropdown');
  if (notifDropdown) {
    notifDropdown.addEventListener('click', function(e) { e.stopPropagation(); });
  }

  // Course registration events (delegated)
  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('course-checkbox')) handleCourseCheckbox(e);
  });
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('course-code-btn')) {
      openCourseDrawer(e.target.getAttribute('data-code'));
    }
  });

  // Submit registration
  var submitBtn = document.getElementById('submit-registration-btn');
  if (submitBtn) submitBtn.addEventListener('click', submitRegistration);

  // Slip modal
  var closeSlip = document.getElementById('close-slip-modal');
  if (closeSlip) closeSlip.addEventListener('click', closeSlipModal);
  var printSlipBtn = document.getElementById('print-slip-btn');
  if (printSlipBtn) printSlipBtn.addEventListener('click', printSlip);
  var slipModal = document.getElementById('registration-slip-modal');
  if (slipModal) slipModal.addEventListener('click', function(e) {
    if (e.target === this) closeSlipModal();
  });

  // Payment modal
  var payBtn = document.getElementById('pay-fees-btn');
  if (payBtn) payBtn.addEventListener('click', openPayModal);
  var closePay = document.getElementById('close-pay-modal');
  if (closePay) closePay.addEventListener('click', closePayModal);
  var payModal = document.getElementById('payment-modal');
  if (payModal) payModal.addEventListener('click', function(e) {
    if (e.target === this) closePayModal();
  });
  var checkoutForm = document.getElementById('checkout-card-form');
  if (checkoutForm) checkoutForm.addEventListener('submit', handleCheckout);

  // Course outline drawer
  var closeDrawer = document.getElementById('close-drawer-btn');
  if (closeDrawer) closeDrawer.addEventListener('click', closeCourseDrawer);

  // Timetable sub-tabs
  var tabTim = document.getElementById('tab-sub-timetable');
  if (tabTim) tabTim.addEventListener('click', function() { switchSubTab('timetable'); });
  var tabEx = document.getElementById('tab-sub-exams');
  if (tabEx) tabEx.addEventListener('click', function() { switchSubTab('exams'); });

  // Settings forms
  var profileForm = document.getElementById('profile-settings-form');
  if (profileForm) profileForm.addEventListener('submit', handleProfileSave);
  var securityForm = document.getElementById('security-settings-form');
  if (securityForm) securityForm.addEventListener('submit', handlePasswordChange);

  // ID Card
  var idCard = document.querySelector('.id-card-view');
  if (idCard) idCard.addEventListener('click', toggleIdCard);
  var printIdBtn = document.getElementById('print-id-card-btn');
  if (printIdBtn) printIdBtn.addEventListener('click', printIdCard);

  // Photo upload
  var photoInput = document.getElementById('settings-photo-upload');
  if (photoInput) photoInput.addEventListener('change', handlePhotoUpload);

  // Semester selector
  var semSelector = document.getElementById('semester-selector');
  if (semSelector) semSelector.addEventListener('change', function() {
    displaySemesterResults(this.value);
  });

  // Transcript
  var transBtn = document.getElementById('view-transcript-btn');
  if (transBtn) transBtn.addEventListener('click', generateTranscript);

  // Window resize → redraw chart
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawGpaChart, 200);
  });
}

// ─── INIT ────────────────────────────────────────────────────
function initApp() {
  applyTheme(window.STATE.theme);
  renderNotifications();
  switchTab(window.STATE.currentTab || 'dashboard');
}

// ─── DOM READY ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  loadState();

  // Auto-login check
  if (window.STATE.loggedIn && window.STATE.user) {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('portal-container').style.display = 'flex';
    initApp();
  } else {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('portal-container').style.display = 'none';
  }

  setupEvents();

  // Card number formatting
  var cardInput = document.getElementById('card-number-input');
  if (cardInput) {
    cardInput.addEventListener('input', function() {
      var v = this.value.replace(/[^\d]/g, '').substring(0, 16);
      var parts = [];
      for (var i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
      this.value = parts.join(' ');
    });
  }

  // Expiry formatting
  var expiryInput = document.getElementById('card-expiry-input');
  if (expiryInput) {
    expiryInput.addEventListener('input', function() {
      var v = this.value.replace(/[^\d]/g, '').substring(0, 4);
      if (v.length >= 3) v = v.substring(0, 2) + '/' + v.substring(2);
      this.value = v;
    });
  }
});
