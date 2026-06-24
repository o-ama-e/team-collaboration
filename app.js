// Academic Student Portal App - Core Javascript

// LocalStorage Persistence Configuration
const STORAGE_KEY = "RUN_PORTAL_STATE_V4";

// Default Database State (used as fallback)
const DEFAULT_STATE = {
  student: {
    name: "Ama O. Emmanuel",
    matricNo: "RUN/CMP/22/1042",
    email: "emmanuel.ama@run.edu.ng",
    phone: "+234 812 345 6789",
    address: "Redemption City, Mowe, Ogun State, Nigeria",
    department: "Computer Science & Engineering",
    programme: "B.Sc. Computer Science",
    level: "400 Level",
    advisor: "Dr. A. B. Adekunle",
    photo: "student_profile.jpg",
    standing: "Excellent",
    cgpa: 3.82,
    outstandingBalance: 1400.00,
    paidBalance: 0.00,
    registrationSubmitted: false,
    registrationDate: null,
    isDark: false
  },

  notifications: [
    { id: 1, title: "Course Registration Deadline", message: "Registration for the 2025/2026 Harmattan Semester closes in 3 days. Settle all tuition before submitting.", time: "2 hrs ago", read: false },
    { id: 2, title: "SIWES Defense Schedule", message: "400 Level Industrial Training defenses commence next week Monday at 09:00 AM.", time: "1 day ago", read: false },
    { id: 3, title: "Senate Results Approval", message: "Rain Semester 2024/2025 official transcript grade indices have been approved by the Senate.", time: "4 days ago", read: true }
  ],

  pastResults: {
    "Y1S1": {
      name: "Year 1 - Semester 1 (Harmattan 2022/2023)",
      gpa: 3.75,
      courses: [
        { code: "MTH101", title: "General Mathematics I", units: 3, grade: "A", points: 5 },
        { code: "PHY101", title: "General Physics I", units: 3, grade: "B", points: 4 },
        { code: "CHM101", title: "General Chemistry I", units: 3, grade: "B", points: 4 },
        { code: "CSC101", title: "Introduction to Computer Science", units: 3, grade: "A", points: 5 },
        { code: "GST101", title: "Communication in English", units: 2, grade: "C", points: 3 }
      ]
    },
    "Y1S2": {
      name: "Year 1 - Semester 2 (Rain 2022/2023)",
      gpa: 3.68,
      courses: [
        { code: "MTH102", title: "General Mathematics II", units: 3, grade: "B", points: 4 },
        { code: "PHY102", title: "General Physics II", units: 3, grade: "A", points: 5 },
        { code: "CSC102", title: "Structured Programming", units: 3, grade: "B", points: 4 },
        { code: "GST102", title: "Philosophy and Logic", units: 2, grade: "A", points: 5 },
        { code: "CHM102", title: "General Chemistry II", units: 3, grade: "C", points: 3 }
      ]
    },
    "Y2S1": {
      name: "Year 2 - Semester 1 (Harmattan 2023/2024)",
      gpa: 3.80,
      courses: [
        { code: "MTH201", title: "Linear Algebra", units: 3, grade: "A", points: 5 },
        { code: "CSC201", title: "Computer Programming I", units: 3, grade: "A", points: 5 },
        { code: "CSC205", title: "Operating Systems I", units: 3, grade: "B", points: 4 },
        { code: "EEE201", title: "Applied Electricity I", units: 3, grade: "B", points: 4 },
        { code: "STA201", title: "Statistics for Physical Sciences", units: 3, grade: "A", points: 5 }
      ]
    },
    "Y2S2": {
      name: "Year 2 - Semester 2 (Rain 2023/2024)",
      gpa: 3.90,
      courses: [
        { code: "CSC202", title: "Computer Programming II", units: 3, grade: "A", points: 5 },
        { code: "CSC204", title: "Data Structures & Algorithms", units: 3, grade: "A", points: 5 },
        { code: "CSC206", title: "Database Systems I", units: 3, grade: "A", points: 5 },
        { code: "MTH202", title: "Mathematical Methods", units: 3, grade: "B", points: 4 },
        { code: "GST222", title: "Peace and Conflict Resolution", units: 2, grade: "B", points: 4 }
      ]
    },
    "Y3S1": {
      name: "Year 3 - Semester 1 (Harmattan 2024/2025)",
      gpa: 3.80,
      courses: [
        { code: "CSC301", title: "Object-Oriented Programming", units: 3, grade: "A", points: 5 },
        { code: "CSC305", title: "Software Engineering I", units: 3, grade: "B", points: 4 },
        { code: "CSC311", title: "Web Technologies", units: 3, grade: "A", points: 5 },
        { code: "CSC315", title: "Computer Architecture", units: 3, grade: "B", points: 4 },
        { code: "EEE303", title: "Electronics II", units: 3, grade: "B", points: 4 }
      ]
    },
    "Y3S2": {
      name: "Year 3 - Semester 2 (Rain 2024/2025)",
      gpa: 4.00,
      courses: [
        { code: "CSC302", title: "Software Engineering II", units: 3, grade: "A", points: 5 },
        { code: "CSC304", title: "Algorithms & Complexity", units: 3, grade: "A", points: 5 },
        { code: "CSC306", title: "Database Systems II", units: 3, grade: "A", points: 5 },
        { code: "CSC310", title: "Computer Networks", units: 3, grade: "A", points: 5 },
        { code: "CSC399", title: "Industrial Training (SIWES)", units: 6, grade: "A", points: 5 }
      ]
    }
  },

  availableCourses: [
    { code: "CSC401", title: "Research Project", units: 6, type: "Core", selected: true, disabled: true, lecturer: "Prof. O. A. Adebayo", desc: "Independent research project under faculty supervision. Demands structured compilation, system design, coding implementation, literature reviews, and an oral presentation slide deck defense." },
    { code: "CSC403", title: "Compiler Construction", units: 3, type: "Core", selected: true, disabled: true, lecturer: "Dr. J. O. Ogundele", desc: "Study of parsing methodologies, lexical analyses, abstract syntax trees, semantic checkers, intermediate representations, code optimizations, and target instruction set generation." },
    { code: "CSC405", title: "Artificial Intelligence", units: 3, type: "Core", selected: true, disabled: true, lecturer: "Dr. Mrs. A. A. Alao", desc: "Introduction to logical agents, search heuristics, machine learning neural models, natural language processing concepts, genetic algorithms, and utility decision logic matrices." },
    { code: "CSC407", title: "Computer Graphics & Visualization", units: 3, type: "Core", selected: true, disabled: true, lecturer: "Dr. G. B. Onyeka", desc: "Mathematics of 2D/3D transformations, illumination shaders, rendering pipelines, ray tracing models, rasterization algorithms, and WebGL implementations." },
    { code: "CSC411", title: "Distributed Systems", units: 3, type: "Elective", selected: false, disabled: false, lecturer: "Mr. T. O. Johnson", desc: "Design details of microservices, RPCs, replication consensus algorithms (Paxos/Raft), consistency indices, clock synchs, and cloud scalability architectures." },
    { code: "CSC413", title: "Cybersecurity Fundamentals", units: 3, type: "Elective", selected: false, disabled: false, lecturer: "Dr. K. C. Nwachukwu", desc: "Principles of symmetric/asymmetric cryptography, network firewalls, penetration testing vectors, secure coding practices, and digital forensic models." },
    { code: "CSC415", title: "Mobile Application Development", units: 3, type: "Elective", selected: false, disabled: false, lecturer: "Mr. F. A. Adekeye", desc: "Native and cross-platform mobile development using Flutter/Swift. Covers state management models, storage caches, background services, and offline sync strategies." },
    { code: "CSC417", title: "Human-Computer Interaction", units: 2, type: "Elective", selected: false, disabled: false, lecturer: "Mrs. O. E. Ebube", desc: "User-centric design theories, rapid wireframing, cognitive walkthrough heuristics, A/B testing validations, accessibility compliances, and empirical feedback analysis." }
  ],

  weeklySchedule: [
    { day: "Monday", slots: [{ time: "09:00 - 11:00", course: "CSC403", title: "Compiler Construction", venue: "LH-A2", color: "indigo" }, { time: "14:00 - 16:00", course: "CSC405", title: "Artificial Intelligence", venue: "Lab 3", color: "emerald" }] },
    { day: "Tuesday", slots: [{ time: "11:00 - 13:00", course: "CSC407", title: "Computer Graphics", venue: "LH-A1", color: "amber" }] },
    { day: "Wednesday", slots: [{ time: "09:00 - 11:00", course: "CSC403", title: "Compiler Construction", venue: "LH-A2", color: "indigo" }, { time: "14:00 - 17:00", course: "CSC401", title: "Project Seminar", venue: "Auditorium", color: "purple" }] },
    { day: "Thursday", slots: [{ time: "11:00 - 13:00", course: "CSC407", title: "Computer Graphics", venue: "Lab 3", color: "amber" }, { time: "14:00 - 16:00", course: "CSC405", title: "Artificial Intelligence", venue: "LH-A1", color: "emerald" }] },
    { day: "Friday", slots: [{ time: "09:00 - 11:00", course: "CSC411", title: "Distributed Systems", venue: "LH-B3", color: "sky" }] }
  ],

  paymentInvoices: [
    { id: "INV-2025-001", title: "400 Level Tuition Fee (First Semester)", amount: 1250.00, date: "2025-10-15", status: "Unpaid" },
    { id: "INV-2025-002", title: "Library & IT Resources Levy", amount: 150.00, date: "2025-10-15", status: "Unpaid" },
    { id: "INV-2024-002", title: "300 Level Tuition Fee (Second Semester)", amount: 1250.00, date: "2025-04-10", status: "Paid" },
    { id: "INV-2024-001", title: "300 Level Tuition Fee (First Semester)", amount: 1250.00, date: "2024-10-22", status: "Paid" }
  ],

  attendance: {
    "CSC401": { code: "CSC401", title: "Research Project", attended: 19, total: 20 },
    "CSC403": { code: "CSC403", title: "Compiler Construction", attended: 22, total: 25 },
    "CSC405": { code: "CSC405", title: "Artificial Intelligence", attended: 18, total: 24 },
    "CSC407": { code: "CSC407", title: "Computer Graphics", attended: 13, total: 22 }, // Below 70%!
    "CSC411": { code: "CSC411", title: "Distributed Systems", attended: 8, total: 10 }
  },

  libraryFiles: [
    { id: 1, type: "Book", code: "CSC403", name: "Compilers: Principles, Techniques, and Tools", author: "Aho & Ullman", size: "14.2 MB", preview: "COMPILER PRINCIPLES\n\nChapter 1: Introduction to Compiling\nCompilers are software programs that translate source code written in a high-level language into machine code or assembly.\n\nKey compiler phases:\n1. Lexical Analysis (Scanner)\n2. Syntax Analysis (Parser)\n3. Semantic Analysis\n4. Intermediate Code Generation\n5. Code Optimization\n6. Target Code Generation" },
    { id: 2, type: "Notes", code: "CSC405", name: "Lecture Slide-Deck: Neural Architectures", author: "Dr. Mrs. Alao", size: "3.8 MB", preview: "ARTIFICIAL INTELLIGENCE LECTURE\n\nDeep Neural Networks:\nNetworks consisting of an input layer, multiple hidden layers, and an output layer. Units are neurons with activation functions like ReLU or Sigmoid.\n\nLearning Rules:\nGradient Descent computes gradients of a loss function relative to network weights, updating them iteratively using backpropagation errors." },
    { id: 3, type: "Exam", code: "CSC407", name: "Past Paper Question Pack (2023 - 2025)", author: "Department Board", size: "1.2 MB", preview: "CSC407 EXAM QUESTIONS 2024\n\nSection A:\n1. Explain the 3D viewing pipeline from object coordinates to screen coordinates.\n2. Formulate the matrix transformation required to perform a 3D rotation of theta degrees about an arbitrary axis.\n3. Discuss the differences between Phong and Gouraud shading models." },
    { id: 4, type: "Book", code: "CSC411", name: "Distributed Systems: Principles and Paradigms", author: "Andrew S. Tanenbaum", size: "18.5 MB", preview: "DISTRIBUTED SYSTEMS\n\nChapter 1: Characterization\nA distributed system is a collection of independent computers that appears to its users as a single coherent system.\n\nKey properties:\n- Heterogeneity\n- Openness\n- Security\n- Scalability\n- Failure handling concurrency transparency" },
    { id: 5, type: "Notes", code: "CSC401", name: "Senior Seminar Formatting Guidelines", author: "Dean Office", size: "0.9 MB", preview: "SENIOR SEMINAR GUIDELINES\n\nAll final projects must be styled according to the IEEE template. Margins must be exactly 1 inch on all sides. Font sizes must correspond to:\n- Paper Title: 24pt Bold\n- Header 1: 10pt Small Caps\n- Text: 10pt Regular" },
    { id: 6, type: "Exam", code: "CSC403", name: "Mock Test Practice Questions", author: "Dr. Ogundele", size: "1.5 MB", preview: "COMPILER MOCK EXAM\n\n1. Formulate a Context-Free Grammar (CFG) for parsing nested arithmetic expressions supporting addition and multiplication.\n2. Design an LL(1) parsing table for your grammar, showing first and follow sets.\n3. Convert the regular expression (a|b)*abb into an equivalent NFA." }
  ],

  supportTickets: [
    { id: "TKT-3920", category: "ICT / Portal Issues", subject: "Harmattan course outline error", status: "Resolved", date: "2026-06-20", messages: [
      { sender: "student", message: "Hello, I cannot see the outline details for CSC411 Distributed Systems in my timetable. Please assist.", time: "10:30 AM" },
      { sender: "admin", message: "Hi Ama, the database index has been updated. Kindly check again and confirm.", time: "02:15 PM" },
      { sender: "student", message: "Thank you, it's visible now!", time: "03:00 PM" }
    ]},
    { id: "TKT-4829", category: "Finance & Payments", subject: "IT Resources Invoice Double Billing", status: "Resolved", date: "2026-06-22", messages: [
      { sender: "student", message: "Hi, I was billed twice for the Library and IT Levy. One invoice is INV-2025-002, and there was a double invoice INV-2025-003. Kindly cancel the double charge.", time: "08:15 AM" },
      { sender: "admin", message: "Hello Ama, we have verified this system anomaly and removed the duplicate invoice. Only INV-2025-002 is outstanding now.", time: "11:45 AM" }
    ]}
  ]
};

// Global App State
let STATE = {};
let selectedTab = "dashboard";
let activeTicketId = null;

// Load state from localstorage or load default
function loadState() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      STATE = JSON.parse(stored);
      // Ensure missing keys are initialized
      if (!STATE.attendance) STATE.attendance = DEFAULT_STATE.attendance;
      if (!STATE.libraryFiles) STATE.libraryFiles = DEFAULT_STATE.libraryFiles;
      if (!STATE.supportTickets) STATE.supportTickets = DEFAULT_STATE.supportTickets;
    } catch (e) {
      STATE = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }
  } else {
    STATE = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(STATE));
}

// Initialization on DOM load
document.addEventListener("DOMContentLoaded", () => {
  loadState();
  initTheme();
  setupSidebarNavigation();
  setupMobileDrawerHandlers();
  initDashboard();
  initNotificationPanel();
  initCourseRegistration();
  initResultChecker();
  initTimetableAttendance();
  initLibraryModule();
  initPaymentPanel();
  initHelpdeskModule();
  initSettings();
  drawCGPAChart();
  
  // Set tab defaults
  switchTab("dashboard");
});

// Helper for UI Toasts
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `fixed bottom-5 right-5 flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border animate-slide-in-right z-50 transition-all ${
    type === "success" 
      ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800/50" 
      : "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/80 dark:text-rose-300 dark:border-rose-800/50"
  }`;
  
  const icon = type === "success" 
    ? `<svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>` 
    : `<svg class="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

  toast.innerHTML = `
    ${icon}
    <span class="font-bold text-xs leading-normal">${message}</span>
  `;
  
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(60px)";
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// Light & Dark Themes
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("theme");
  
  const applyTheme = (dark) => {
    if (dark) {
      document.documentElement.classList.add("dark");
      toggleBtn.innerHTML = `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path></svg>`;
    } else {
      document.documentElement.classList.remove("dark");
      toggleBtn.innerHTML = `<svg class="w-5 h-5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;
    }
    STATE.student.isDark = dark;
    saveState();
    drawCGPAChart();
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = storedTheme === "dark" || (!storedTheme && prefersDark);
  applyTheme(isDark);

  toggleBtn.addEventListener("click", () => {
    const nextDark = !document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", nextDark ? "dark" : "light");
    applyTheme(nextDark);
  });
}

// Navigation & Tab Switching
function setupSidebarNavigation() {
  const sidebarLinks = document.querySelectorAll("#sidebar nav a");
  
  sidebarLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const tabId = link.getAttribute("data-tab");
      switchTab(tabId);
      
      const sidebar = document.getElementById("sidebar");
      const backdrop = document.getElementById("sidebar-backdrop");
      if (!sidebar.classList.contains("-translate-x-full")) {
        sidebar.classList.add("-translate-x-full");
        backdrop.classList.add("hidden");
      }
    });
  });
}

// Mobile Toggles & Backdrop Overlay
function setupMobileDrawerHandlers() {
  const burgerBtn = document.getElementById("mobile-menu-toggle");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  
  burgerBtn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
    backdrop.classList.toggle("hidden");
  });

  backdrop.addEventListener("click", () => {
    sidebar.classList.add("-translate-x-full");
    backdrop.classList.add("hidden");
  });
}

// Global programmatic Tab switching with sidebar sync
function switchTab(tabId) {
  selectedTab = tabId;
  const sections = document.querySelectorAll(".tab-content-section");
  sections.forEach(sec => sec.classList.add("hidden"));
  
  const targetSection = document.getElementById(`${tabId}-section`);
  if (targetSection) {
    targetSection.classList.remove("hidden");
    targetSection.classList.add("animate-fade-in");
  }

  // Sync Sidebar Active Classes
  const sidebarLinks = document.querySelectorAll("#sidebar nav a");
  sidebarLinks.forEach(link => {
    const linkTab = link.getAttribute("data-tab");
    if (linkTab === tabId) {
      link.className = "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 transition-colors";
    } else {
      link.className = "flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors";
    }
  });

  // Re-run context details
  if (tabId === "dashboard") {
    drawCGPAChart();
    renderDashboardClasses();
  }
}

// Course details slide-in Drawer
const drawer = document.getElementById("course-outline-drawer");
const drawerCloseBtn = document.getElementById("close-drawer-btn");

drawerCloseBtn.addEventListener("click", () => {
  drawer.classList.add("translate-x-full");
});

function openCourseDrawer(courseCode) {
  const course = STATE.availableCourses.find(c => c.code === courseCode);
  if (!course) return;

  document.getElementById("drawer-course-code").textContent = course.code;
  document.getElementById("drawer-course-title").textContent = course.title;
  document.getElementById("drawer-course-lecturer").textContent = course.lecturer;
  document.getElementById("drawer-course-units").textContent = `${course.units} Credits`;
  document.getElementById("drawer-course-description").textContent = course.desc;

  drawer.classList.remove("translate-x-full");
}

// Dashboard Module
function initDashboard() {
  updateProfileDisplays();
  renderDashboardClasses();
  updateOutstandingDisplays();
  updateRegistrationStatus();
}

function updateProfileDisplays() {
  document.querySelectorAll(".student-name").forEach(el => el.textContent = STATE.student.name);
  document.querySelectorAll(".student-matric").forEach(el => el.textContent = STATE.student.matricNo);
  document.querySelectorAll(".student-dept").forEach(el => el.textContent = STATE.student.department);
  document.querySelectorAll(".student-standing").forEach(el => el.textContent = STATE.student.standing);
  document.querySelectorAll(".student-cgpa").forEach(el => el.textContent = STATE.student.cgpa.toFixed(2));
  document.querySelectorAll(".student-level").forEach(el => el.textContent = STATE.student.level);
  document.querySelectorAll(".student-photo").forEach(el => el.src = STATE.student.photo);
}

function updateOutstandingDisplays() {
  const balText = `$${STATE.student.outstandingBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
  document.querySelectorAll(".dashboard-outstanding-text").forEach(el => el.textContent = balText);
  
  const paymentsBadge = document.getElementById("payments-outstanding-dot");
  if (STATE.student.outstandingBalance > 0) {
    paymentsBadge.classList.remove("hidden");
  } else {
    paymentsBadge.classList.add("hidden");
  }
}

function updateRegistrationStatus() {
  const badgeContainers = document.querySelectorAll(".dashboard-reg-status-badge");
  const sidebarIndicator = document.getElementById("course-reg-nav-indicator");

  badgeContainers.forEach(badge => {
    if (STATE.student.registrationSubmitted) {
      badge.className = "dashboard-reg-status-badge px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300";
      badge.textContent = "Approved & Registered";
      if (sidebarIndicator) {
        sidebarIndicator.className = "w-2.5 h-2.5 rounded-full bg-emerald-500";
      }
    } else {
      badge.className = "dashboard-reg-status-badge px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300";
      badge.textContent = "Registration In Progress";
      if (sidebarIndicator) {
        sidebarIndicator.className = "w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse";
      }
    }
  });
}

function renderDashboardClasses() {
  const container = document.getElementById("today-classes-container");
  const dayLabel = document.getElementById("today-day-label");
  
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let todayIndex = new Date().getDay();
  if (todayIndex === 0 || todayIndex === 6) todayIndex = 1; 
  const todayDay = dayNames[todayIndex];
  
  dayLabel.textContent = todayDay;
  container.innerHTML = "";

  const todaySchedule = STATE.weeklySchedule.find(s => s.day === todayDay);
  if (!todaySchedule || todaySchedule.slots.length === 0) {
    container.innerHTML = `<div class="text-xs text-slate-400 py-6 text-center">No scheduled lectures today.</div>`;
    return;
  }

  todaySchedule.slots.forEach(slot => {
    let colorClasses = "bg-indigo-50 border-indigo-150 text-indigo-805 dark:bg-indigo-950/20 dark:border-indigo-900/40 dark:text-indigo-300";
    if (slot.color === "emerald") colorClasses = "bg-emerald-50 border-emerald-150 text-emerald-805 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-300";
    if (slot.color === "amber") colorClasses = "bg-amber-50 border-amber-150 text-amber-805 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-300";
    if (slot.color === "purple") colorClasses = "bg-purple-50 border-purple-150 text-purple-805 dark:bg-purple-950/20 dark:border-purple-900/40 dark:text-purple-300";

    const slotEl = document.createElement("div");
    slotEl.className = `p-3 rounded-2xl border flex items-center justify-between gap-3 ${colorClasses}`;
    slotEl.innerHTML = `
      <div class="overflow-hidden">
        <span onclick="openCourseDrawer('${slot.course.split('/')[0]}')" class="font-extrabold text-xs cursor-pointer hover:underline">${slot.course}</span>
        <div class="text-[10px] opacity-80 font-medium truncate mt-0.5 max-w-40">${slot.title}</div>
        <div class="text-[9px] opacity-75 mt-1 font-semibold flex items-center gap-1">
          📍 ${slot.venue}
        </div>
      </div>
      <div class="text-right flex flex-col items-end gap-1.5 flex-shrink-0">
        <span class="text-[9px] font-bold px-2 py-0.5 rounded bg-white/60 dark:bg-slate-900/40">${slot.time}</span>
        <button onclick="checkInClass('${slot.course.split('/')[0]}')" class="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white text-[8px] font-bold rounded-lg transition-colors cursor-pointer">Check-in Present</button>
      </div>
    `;
    container.appendChild(slotEl);
  });
}

function checkInClass(courseCode) {
  const attData = STATE.attendance[courseCode];
  if (!attData) {
    showToast(`No attendance ledger initialized for ${courseCode}.`, "error");
    return;
  }

  if (attData.attended < attData.total) {
    attData.attended++;
    saveState();
    showToast(`Class check-in processed for ${courseCode}! Attendance registered.`);
    
    // Refresh both views
    initTimetableAttendance();
    renderDashboardClasses();
  } else {
    showToast("Class presence already registered as full for today.", "error");
  }
}

// Announcements & Notifications
function initNotificationPanel() {
  const notifBtn = document.getElementById("notif-toggle-btn");
  const notifDropdown = document.getElementById("notif-dropdown");
  const notifList = document.getElementById("notif-list");
  const notifBadge = document.getElementById("notif-badge");

  const updateBadge = () => {
    const unreadCount = STATE.notifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
      notifBadge.classList.remove("hidden");
      notifBadge.textContent = unreadCount;
    } else {
      notifBadge.classList.add("hidden");
    }
  };

  const populateNotifications = () => {
    notifList.innerHTML = "";
    if (STATE.notifications.length === 0) {
      notifList.innerHTML = `<div class="p-4 text-center text-xs text-slate-500 dark:text-slate-400">No new announcements.</div>`;
      return;
    }
    
    STATE.notifications.forEach(notif => {
      const item = document.createElement("div");
      item.className = `p-3.5 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors ${!notif.read ? 'bg-indigo-50/30 dark:bg-indigo-950/10' : ''}`;
      item.innerHTML = `
        <div class="flex justify-between items-start gap-2">
          <h4 class="font-semibold text-xs text-slate-805 dark:text-slate-205 ${!notif.read ? 'pr-2' : ''}">${notif.title}</h4>
          <span class="text-[9px] text-slate-400 whitespace-nowrap">${notif.time}</span>
        </div>
        <p class="text-xs text-slate-505 dark:text-slate-400 mt-1 leading-relaxed">${notif.message}</p>
      `;
      
      item.addEventListener("click", () => {
        notif.read = true;
        saveState();
        updateBadge();
        populateNotifications();
      });
      notifList.appendChild(item);
    });
  };

  notifBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle("hidden");
    populateNotifications();
    updateBadge();
  });

  document.addEventListener("click", (e) => {
    if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
      notifDropdown.classList.add("hidden");
    }
  });

  updateBadge();
}

// Course Registration Module
function initCourseRegistration() {
  const container = document.getElementById("courses-selection-container");
  const liveCountElements = document.querySelectorAll("#selected-courses-count");
  const liveUnitsElements = document.querySelectorAll("#selected-units-count");
  const submitBtn = document.getElementById("submit-registration-btn");
  const modal = document.getElementById("registration-slip-modal");
  const cancelBtn = document.getElementById("close-slip-modal");
  const printBtn = document.getElementById("print-slip-btn");

  const minUnits = 12;
  const maxUnits = 24;

  const renderCourses = () => {
    container.innerHTML = "";
    
    STATE.availableCourses.forEach((course) => {
      const isRegistered = STATE.student.registrationSubmitted;
      
      const row = document.createElement("tr");
      row.className = "border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors";
      row.innerHTML = `
        <td class="px-6 py-4 text-center">
          <input 
            type="checkbox" 
            id="chk-${course.code}" 
            class="w-4.5 h-4.5 text-indigo-600 bg-slate-50 border-slate-300 rounded focus:ring-indigo-500 focus:ring-2 dark:bg-slate-700 dark:border-slate-600 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            ${course.selected ? "checked" : ""} 
            ${course.disabled || isRegistered ? "disabled" : ""}
          >
        </td>
        <td class="px-6 py-4">
          <span onclick="openCourseDrawer('${course.code}')" class="font-extrabold text-xs text-indigo-600 hover:underline cursor-pointer">${course.code}</span>
        </td>
        <td class="px-6 py-4 text-xs text-slate-750 dark:text-slate-300 font-medium">${course.title}</td>
        <td class="px-6 py-4 text-center text-xs text-slate-600 dark:text-slate-400 font-semibold">${course.units}</td>
        <td class="px-6 py-4 text-center">
          <span class="px-2.5 py-1 text-[10px] font-bold rounded-full ${
            course.type === "Core" 
              ? "bg-slate-100 text-slate-800 dark:bg-slate-850 dark:text-slate-300" 
              : "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300"
          }">
            ${course.type}
          </span>
        </td>
      `;
      
      const checkbox = row.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", (e) => {
        course.selected = e.target.checked;
        saveState();
        recalculateUnits();
        initGPAValPlanner(); 
      });

      container.appendChild(row);
    });

    recalculateUnits();
  };

  const recalculateUnits = () => {
    const selected = STATE.availableCourses.filter(c => c.selected);
    const totalCredits = selected.reduce((sum, c) => sum + c.units, 0);
    
    liveCountElements.forEach(el => el.textContent = selected.length);
    
    liveUnitsElements.forEach(el => {
      el.textContent = `${totalCredits} / 24`;
      if (totalCredits >= minUnits && totalCredits <= maxUnits) {
        el.className = "font-extrabold text-emerald-600 dark:text-emerald-400";
        submitBtn.disabled = false;
        submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
      } else {
        el.className = "font-extrabold text-rose-600 dark:text-rose-450";
        submitBtn.disabled = true;
        submitBtn.classList.add("opacity-50", "cursor-not-allowed");
      }
    });

    if (STATE.student.registrationSubmitted) {
      submitBtn.textContent = "View Registration Slip";
      submitBtn.disabled = false;
      submitBtn.classList.remove("opacity-50", "cursor-not-allowed");
    } else {
      submitBtn.textContent = "Submit Registration";
    }
  };

  submitBtn.addEventListener("click", () => {
    if (STATE.student.registrationSubmitted) {
      showRegistrationSlip();
      return;
    }

    if (STATE.student.outstandingBalance > 0) {
      showToast("Cannot submit registration: Outstanding balance requires clearance. Settle fees in Tuition & Payments tab first.", "error");
      switchTab("payments");
      return;
    }

    const selected = STATE.availableCourses.filter(c => c.selected);
    const totalCredits = selected.reduce((sum, c) => sum + c.units, 0);
    
    if (totalCredits < minUnits || totalCredits > maxUnits) {
      showToast(`Invalid credit units! Registered credits must range between ${minUnits} and ${maxUnits} credits.`, "error");
      return;
    }

    STATE.student.registrationSubmitted = true;
    STATE.student.registrationDate = new Date().toLocaleString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
    
    saveState();
    showToast("Registration submitted and advisor-approved successfully!");
    updateRegistrationStatus();
    renderCourses();
    showRegistrationSlip();
  });

  const showRegistrationSlip = () => {
    document.getElementById("slip-student-name").textContent = STATE.student.name;
    document.getElementById("slip-student-matric").textContent = STATE.student.matricNo;
    document.getElementById("slip-student-dept").textContent = STATE.student.department;
    document.getElementById("slip-student-level").textContent = STATE.student.level;
    document.getElementById("slip-student-date").textContent = STATE.student.registrationDate || new Date().toLocaleString();
    
    const slipTable = document.getElementById("slip-courses-table-body");
    slipTable.innerHTML = "";
    
    const selected = STATE.availableCourses.filter(c => c.selected);
    let totalCredits = 0;
    
    selected.forEach((course, index) => {
      totalCredits += course.units;
      const row = document.createElement("tr");
      row.className = "border-b border-slate-200 dark:border-slate-700/80 text-xs";
      row.innerHTML = `
        <td class="px-4 py-2.5 text-center font-medium">${index + 1}</td>
        <td class="px-4 py-2.5 font-bold">${course.code}</td>
        <td class="px-4 py-2.5">${course.title}</td>
        <td class="px-4 py-2.5 text-center font-semibold">${course.units}</td>
        <td class="px-4 py-2.5 text-center font-medium">${course.type}</td>
      `;
      slipTable.appendChild(row);
    });

    document.getElementById("slip-total-units").textContent = totalCredits;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  };

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  printBtn.addEventListener("click", () => {
    window.print();
  });

  renderCourses();
}

// Result Checker & GPA Planner Module
function initResultChecker() {
  const select = document.getElementById("semester-selector");
  const table = document.getElementById("results-table-body");
  const statsContainer = document.getElementById("result-stats-container");
  const transcriptBtn = document.getElementById("view-transcript-btn");

  const tabResultsBtn = document.getElementById("tab-sub-results");
  const tabPlannerBtn = document.getElementById("tab-sub-planner");
  const resultsView = document.getElementById("sub-results-view");
  const plannerView = document.getElementById("sub-planner-view");

  tabResultsBtn.addEventListener("click", () => {
    tabResultsBtn.className = "px-5 py-2.5 text-xs font-extrabold rounded-xl bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 transition-colors cursor-pointer";
    tabPlannerBtn.className = "px-5 py-2.5 text-xs font-extrabold rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer";
    resultsView.classList.remove("hidden");
    plannerView.classList.add("hidden");
  });

  tabPlannerBtn.addEventListener("click", () => {
    tabPlannerBtn.className = "px-5 py-2.5 text-xs font-extrabold rounded-xl bg-indigo-50 text-indigo-600 dark:bg-slate-800 dark:text-indigo-400 transition-colors cursor-pointer";
    tabResultsBtn.className = "px-5 py-2.5 text-xs font-extrabold rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer";
    plannerView.classList.remove("hidden");
    resultsView.classList.add("hidden");
    initGPAValPlanner();
  });
  
  select.innerHTML = "";
  Object.keys(STATE.pastResults).forEach(key => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = STATE.pastResults[key].name;
    select.appendChild(option);
  });
  
  const keys = Object.keys(STATE.pastResults);
  if (keys.length > 0) {
    select.value = keys[keys.length - 1];
  }

  const renderResults = () => {
    const key = select.value;
    const data = STATE.pastResults[key];
    table.innerHTML = "";

    if (!data) return;

    data.courses.forEach(c => {
      const row = document.createElement("tr");
      row.className = "border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors";
      row.innerHTML = `
        <td class="px-6 py-4 font-bold text-xs text-slate-800 dark:text-slate-200">
          <span onclick="openCourseDrawer('${c.code}')" class="hover:underline text-indigo-605 cursor-pointer">${c.code}</span>
        </td>
        <td class="px-6 py-4 text-xs text-slate-705 dark:text-slate-300 font-medium">${c.title}</td>
        <td class="px-6 py-4 text-center text-xs text-slate-600 dark:text-slate-400 font-semibold">${c.units}</td>
        <td class="px-6 py-4 text-center font-bold text-xs ${
          c.grade === "A" ? "text-emerald-600 dark:text-emerald-400" :
          c.grade === "B" ? "text-indigo-600 dark:text-indigo-400" :
          c.grade === "C" ? "text-amber-600 dark:text-amber-400" :
          "text-rose-600 dark:text-rose-400"
        }">${c.grade}</td>
        <td class="px-6 py-4 text-center text-xs text-slate-600 dark:text-slate-400 font-medium">${c.points}</td>
        <td class="px-6 py-4 text-center text-xs text-slate-600 dark:text-slate-400 font-medium">${c.units * c.points}</td>
      `;
      table.appendChild(row);
    });

    const totalUnits = data.courses.reduce((sum, c) => sum + c.units, 0);
    const weightedPoints = data.courses.reduce((sum, c) => sum + (c.units * c.points), 0);
    const semGpa = (weightedPoints / totalUnits).toFixed(2);
    
    let cumulativeUnits = 0;
    let cumulativePoints = 0;
    
    const semOrder = Object.keys(STATE.pastResults);
    const currentIdx = semOrder.indexOf(key);
    
    for (let i = 0; i <= currentIdx; i++) {
      const sData = STATE.pastResults[semOrder[i]];
      sData.courses.forEach(c => {
        cumulativeUnits += c.units;
        cumulativePoints += (c.units * c.points);
      });
    }
    const computedCgpa = (cumulativePoints / cumulativeUnits).toFixed(2);

    statsContainer.innerHTML = `
      <div class="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center">
        <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Credits Completed</span>
        <span class="text-xl font-bold text-slate-800 dark:text-slate-200 mt-1">${totalUnits} Units</span>
      </div>
      <div class="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center border-l-4 border-l-indigo-600">
        <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Semester GPA</span>
        <span class="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">${semGpa}</span>
      </div>
      <div class="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center border-l-4 border-l-emerald-600">
        <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Cumulative CGPA</span>
        <span class="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">${computedCgpa}</span>
      </div>
    `;
  };

  select.addEventListener("change", renderResults);
  renderResults();

  transcriptBtn.addEventListener("click", () => {
    const printWindow = window.open("", "_blank");
    let transcriptHtml = `
      <html>
        <head>
          <title>Academic Transcript - ${STATE.student.name}</title>
          <link href="https://cdn.tailwindcss.com" rel="stylesheet">
          <style>
            body { font-family: 'Outfit', sans-serif; padding: 40px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 25px; }
            th, td { border: 1px solid #e2e8f0; padding: 8px 12px; font-size: 12px; }
            th { background-color: #f8fafc; text-align: left; }
            .header-info div { margin-bottom: 6px; }
          </style>
        </head>
        <body onload="window.print()">
          <div class="text-center mb-6">
            <h1 class="text-2xl font-bold text-slate-900">REDEEMER'S UNIVERSITY</h1>
            <p class="text-xs text-slate-500">OFFICE OF THE REGISTRAR (ACADEMIC REGISTRY)</p>
            <h2 class="text-md font-bold text-slate-700 mt-2 underline">OFFICIAL INTERIM GRADE TRANSCRIPT</h2>
          </div>
          
          <div class="grid grid-cols-2 gap-4 text-xs mb-6 header-info">
            <div><strong>NAME:</strong> ${STATE.student.name}</div>
            <div><strong>MATRIC NO:</strong> ${STATE.student.matricNo}</div>
            <div><strong>DEPARTMENT:</strong> ${STATE.student.department}</div>
            <div><strong>PROGRAMME:</strong> ${STATE.student.programme}</div>
            <div><strong>CURRENT LEVEL:</strong> ${STATE.student.level}</div>
            <div><strong>CUMULATIVE CGPA:</strong> ${STATE.student.cgpa.toFixed(2)}</div>
          </div>
    `;

    let totalCredits = 0;
    let totalGPPoints = 0;

    Object.keys(STATE.pastResults).forEach(semKey => {
      const semester = STATE.pastResults[semKey];
      transcriptHtml += `
        <div class="font-bold text-xs text-indigo-700 mt-4 border-b pb-1">${semester.name}</div>
        <table>
          <thead>
            <tr>
              <th style="width: 15%">Course Code</th>
              <th style="width: 50%">Course Title</th>
              <th style="width: 10%; text-align: center">Units</th>
              <th style="width: 10%; text-align: center">Grade</th>
              <th style="width: 15%; text-align: center">GP Score</th>
            </tr>
          </thead>
          <tbody>
      `;

      let semCredits = 0;
      let semPoints = 0;

      semester.courses.forEach(c => {
        const score = c.units * c.points;
        semCredits += c.units;
        semPoints += score;
        totalCredits += c.units;
        totalGPPoints += score;

        transcriptHtml += `
          <tr>
            <td>${c.code}</td>
            <td>${c.title}</td>
            <td class="text-center">${c.units}</td>
            <td class="text-center font-bold">${c.grade}</td>
            <td class="text-center">${score}</td>
          </tr>
        `;
      });

      const semGPA = (semPoints / semCredits).toFixed(2);
      transcriptHtml += `
          </tbody>
        </table>
        <div class="flex justify-end gap-6 text-xs font-semibold mb-6">
          <span>Semester Credits: ${semCredits}</span>
          <span>Semester GPA: ${semGPA}</span>
        </div>
      `;
    });

    const finalCGPA = (totalGPPoints / totalCredits).toFixed(2);
    transcriptHtml += `
          <div class="border-t-2 border-slate-900 pt-4 mt-6 flex justify-between items-center text-sm font-bold">
            <span>Cumulative Registered Credits: ${totalCredits}</span>
            <span>Cumulative Grade Points Earned: ${totalGPPoints}</span>
            <span class="text-lg text-emerald-700">FINAL CUMULATIVE CGPA: ${finalCGPA}</span>
          </div>
          <div class="text-[9px] text-slate-400 mt-12 text-center">
            * This document is an unofficial copy of the student academic record, generated electronically from the student portal.
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(transcriptHtml);
    printWindow.document.close();
  });
}

// GPA Simulator
function initGPAValPlanner() {
  const container = document.getElementById("planner-inputs-container");
  container.innerHTML = "";

  const selected = STATE.availableCourses.filter(c => c.selected);
  
  if (selected.length === 0) {
    container.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-xs text-slate-450 font-semibold">Please select courses in Course Registration first to simulate results.</td></tr>`;
    calculateSimulatedGPA();
    return;
  }

  selected.forEach(course => {
    const row = document.createElement("tr");
    row.className = "border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors";
    row.innerHTML = `
      <td class="px-6 py-4">
        <span onclick="openCourseDrawer('${course.code}')" class="font-bold text-xs text-indigo-600 hover:underline cursor-pointer">${course.code}</span>
      </td>
      <td class="px-6 py-4 text-xs text-slate-700 dark:text-slate-300 font-medium">${course.title}</td>
      <td class="px-6 py-4 text-center text-xs text-slate-600 dark:text-slate-400 font-semibold">${course.units}</td>
      <td class="px-6 py-4 text-center">
        <select data-units="${course.units}" class="sim-grade-select px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-indigo-650 dark:text-indigo-400 focus:outline-none cursor-pointer">
          <option value="5">A (5.00)</option>
          <option value="4">B (4.00)</option>
          <option value="3">C (3.00)</option>
          <option value="2">D (2.00)</option>
          <option value="1">E (1.00)</option>
          <option value="0">F (0.00)</option>
        </select>
      </td>
    `;
    
    const select = row.querySelector("select");
    select.addEventListener("change", calculateSimulatedGPA);
    container.appendChild(row);
  });

  calculateSimulatedGPA();
}

function calculateSimulatedGPA() {
  const selects = document.querySelectorAll(".sim-grade-select");
  
  let totalUnits = 0;
  let weightedPoints = 0;
  
  selects.forEach(select => {
    const units = parseInt(select.getAttribute("data-units"));
    const val = parseInt(select.value);
    totalUnits += units;
    weightedPoints += (units * val);
  });
  
  const simulatedGPA = totalUnits > 0 ? (weightedPoints / totalUnits) : 0.00;
  
  let cumulativeUnits = 0;
  let cumulativePoints = 0;
  
  Object.keys(STATE.pastResults).forEach(key => {
    STATE.pastResults[key].courses.forEach(c => {
      cumulativeUnits += c.units;
      cumulativePoints += (c.units * c.points);
    });
  });
  
  const currentCGPA = cumulativePoints / cumulativeUnits;
  
  const newCumulativeUnits = cumulativeUnits + totalUnits;
  const newCumulativePoints = cumulativePoints + weightedPoints;
  const simulatedCGPA = newCumulativeUnits > 0 ? (newCumulativePoints / newCumulativeUnits) : 0.00;
  
  const delta = simulatedCGPA - currentCGPA;

  document.getElementById("sim-gpa-val").textContent = simulatedGPA.toFixed(2);
  document.getElementById("sim-cgpa-val").textContent = simulatedCGPA.toFixed(2);
  
  const deltaEl = document.getElementById("sim-cgpa-delta");
  if (delta >= 0) {
    deltaEl.textContent = `+${delta.toFixed(2)}`;
    deltaEl.className = "text-sm font-black text-emerald-605 dark:text-emerald-400";
  } else {
    deltaEl.textContent = `${delta.toFixed(2)}`;
    deltaEl.className = "text-sm font-black text-rose-600 dark:text-rose-450";
  }

  const ring = document.getElementById("sim-gpa-ring");
  if (ring) {
    const offset = 440 - (simulatedGPA / 5) * 440;
    ring.style.strokeDashoffset = offset;
  }
}

// Draw line graph
function drawCGPAChart() {
  const canvas = document.getElementById("gpaChart");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  
  const isDark = document.documentElement.classList.contains("dark");
  const textColor = isDark ? "#94a3b8" : "#475569";
  const gridColor = isDark ? "rgba(71, 85, 105, 0.2)" : "rgba(226, 232, 240, 0.6)";

  const semKeys = Object.keys(STATE.pastResults);
  const dataGPAs = semKeys.map(k => STATE.pastResults[k].gpa);

  if (semKeys.length === 0) return;

  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const graphWidth = width - paddingLeft - paddingRight;
  const graphHeight = height - paddingTop - paddingBottom;

  ctx.clearRect(0, 0, width, height);

  ctx.font = "10px Outfit, sans-serif";
  ctx.fillStyle = textColor;
  ctx.strokeStyle = gridColor;
  ctx.lineWidth = 1;

  for (let i = 0; i <= 5; i++) {
    const yValue = i;
    const y = paddingTop + graphHeight - (yValue / 5) * graphHeight;
    
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - paddingRight, y);
    ctx.stroke();

    ctx.textAlign = "right";
    ctx.fillText(yValue.toFixed(1), paddingLeft - 10, y + 3);
  }

  const points = [];
  const stepX = graphWidth / (semKeys.length - 1 || 1);

  semKeys.forEach((key, idx) => {
    const gpa = dataGPAs[idx];
    const x = paddingLeft + idx * stepX;
    const y = paddingTop + graphHeight - (gpa / 5) * graphHeight;
    points.push({ x, y, label: key, val: gpa });
  });

  if (points.length > 1) {
    const areaGrad = ctx.createLinearGradient(0, paddingTop, 0, paddingTop + graphHeight);
    areaGrad.addColorStop(0, "rgba(99, 102, 241, 0.2)");
    areaGrad.addColorStop(1, "rgba(99, 102, 241, 0.0)");
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[points.length - 1].x, paddingTop + graphHeight);
    ctx.lineTo(points[0].x, paddingTop + graphHeight);
    ctx.closePath();
    ctx.fillStyle = areaGrad;
    ctx.fill();
  }

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = "#4f46e5";
  ctx.lineWidth = 3;
  ctx.stroke();

  points.forEach((pt) => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = "#4f46e5";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = isDark ? "#0f172a" : "#ffffff";
    ctx.stroke();

    ctx.fillStyle = isDark ? "#e2e8f0" : "#0f172a";
    ctx.font = "bold 9px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(pt.val.toFixed(2), pt.x, pt.y - 10);

    ctx.fillStyle = textColor;
    ctx.font = "9px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(pt.label, pt.x, paddingTop + graphHeight + 15);
  });
}

// Attendance & Timetable
function initTimetableAttendance() {
  const tableContainer = document.getElementById("schedule-cards-container");
  const attendanceContainer = document.getElementById("attendance-progress-container");
  const alertBanner = document.getElementById("attendance-alert-banner");

  tableContainer.innerHTML = "";
  attendanceContainer.innerHTML = "";
  
  let showWarning = false;

  Object.keys(STATE.attendance).forEach(code => {
    const data = STATE.attendance[code];
    const percent = (data.attended / data.total) * 100;
    
    if (percent < 70) {
      showWarning = true;
    }

    const item = document.createElement("div");
    item.className = "flex items-center justify-between gap-4 p-3 bg-slate-50/50 dark:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-800/80";
    
    const circumference = 150.8;
    const offset = circumference - (percent / 100) * circumference;
    
    const ringColor = percent >= 85 ? "stroke-emerald-500" : percent >= 70 ? "stroke-indigo-500" : "stroke-rose-500";

    item.innerHTML = `
      <div class="overflow-hidden">
        <span onclick="openCourseDrawer('${data.code}')" class="font-bold text-xs hover:underline text-indigo-605 cursor-pointer">${data.code}</span>
        <h4 class="text-[10px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5 max-w-44">${data.title}</h4>
        <span class="text-[9px] font-bold mt-1 inline-block ${percent >= 70 ? 'text-slate-400' : 'text-rose-550 animate-pulse'}">
          Presence: ${data.attended} / ${data.total} lectures
        </span>
      </div>
      
      <div class="relative w-16 h-16 flex items-center justify-center flex-shrink-0">
        <svg class="w-full h-full transform -rotate-90">
          <circle cx="32" cy="32" r="24" class="stroke-slate-200 dark:stroke-slate-800 fill-none" stroke-width="4.5"/>
          <circle cx="32" cy="32" r="24" class="progress-ring__circle ${ringColor} fill-none" stroke-width="4.5" stroke-dasharray="${circumference}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
        </svg>
        <span class="absolute text-[10px] font-black ${percent >= 70 ? 'text-slate-700 dark:text-slate-200' : 'text-rose-600 dark:text-rose-400'}">${Math.round(percent)}%</span>
      </div>
    `;
    attendanceContainer.appendChild(item);
  });

  if (showWarning) {
    alertBanner.classList.remove("hidden");
  } else {
    alertBanner.classList.add("hidden");
  }

  STATE.weeklySchedule.forEach(item => {
    const dayCard = document.createElement("div");
    dayCard.className = "glass-panel p-5 rounded-3xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4";
    
    let slotsHtml = "";
    if (item.slots.length === 0) {
      slotsHtml = `<div class="text-xs text-slate-400 py-4 text-center">No scheduled lectures.</div>`;
    } else {
      item.slots.forEach(slot => {
        let badgeColor = "bg-indigo-50 border-indigo-100 text-indigo-700 dark:bg-indigo-950/20 dark:border-indigo-900/40 dark:text-indigo-300";
        if (slot.color === "emerald") badgeColor = "bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:border-emerald-900/40 dark:text-emerald-300";
        if (slot.color === "amber") badgeColor = "bg-amber-50 border-amber-100 text-amber-700 dark:bg-amber-950/20 dark:border-amber-900/40 dark:text-amber-300";
        if (slot.color === "purple") badgeColor = "bg-purple-50 border-purple-100 text-purple-700 dark:bg-purple-950/20 dark:border-purple-900/40 dark:text-purple-300";

        slotsHtml += `
          <div class="p-3.5 rounded-2xl border flex justify-between items-center gap-3 hover:translate-x-1.5 transition-transform duration-300 ${badgeColor}">
            <div>
              <span onclick="openCourseDrawer('${slot.course.split('/')[0]}')" class="font-black text-xs hover:underline cursor-pointer">${slot.course}</span>
              <div class="text-[9px] opacity-80 font-semibold truncate mt-0.5 max-w-40">${slot.title}</div>
              <div class="text-[9px] opacity-75 mt-1 font-bold flex items-center gap-1">
                📍 ${slot.venue}
              </div>
            </div>
            <span class="text-[9px] font-bold px-2 py-0.5 rounded bg-white/60 dark:bg-slate-900/40 whitespace-nowrap">${slot.time}</span>
          </div>
        `;
      });
    }

    dayCard.innerHTML = `
      <div class="border-b border-slate-100 dark:border-slate-800 pb-2.5 flex justify-between items-center">
        <h3 class="font-extrabold text-xs text-slate-850 dark:text-slate-200">${item.day}</h3>
        <span class="text-[9px] text-slate-400 font-bold uppercase tracking-wider">${item.slots.length} Lectures</span>
      </div>
      <div class="flex flex-col gap-2.5">
        ${slotsHtml}
      </div>
    `;
    tableContainer.appendChild(dayCard);
  });
}

// Digital Library
function initLibraryModule() {
  const container = document.getElementById("library-list-container");
  const searchInput = document.getElementById("library-search-input");
  const typeFilter = document.getElementById("library-type-filter");

  const renderFiles = () => {
    container.innerHTML = "";
    
    const query = searchInput.value.toLowerCase();
    const type = typeFilter.value;

    const filtered = STATE.libraryFiles.filter(file => {
      const matchSearch = file.name.toLowerCase().includes(query) || file.code.toLowerCase().includes(query) || file.author.toLowerCase().includes(query);
      const matchType = type === "All" || file.type === type;
      return matchSearch && matchType;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<div class="col-span-full text-center text-xs text-slate-400 py-12 font-bold">No lecture files or reference materials found.</div>`;
      return;
    }

    filtered.forEach(file => {
      const card = document.createElement("div");
      card.className = "glass-panel p-5 rounded-3xl flex flex-col justify-between gap-4 border border-slate-100 dark:border-slate-800/80 shadow-xs glass-card-hover";
      
      let badgeType = "bg-indigo-50 text-indigo-750 dark:bg-indigo-950 dark:text-indigo-400";
      if (file.type === "Book") badgeType = "bg-amber-50 text-amber-750 dark:bg-amber-950 dark:text-indigo-400";
      if (file.type === "Exam") badgeType = "bg-emerald-50 text-emerald-750 dark:bg-emerald-950 dark:text-emerald-400";

      card.innerHTML = `
        <div>
          <div class="flex justify-between items-start mb-3">
            <span onclick="openCourseDrawer('${file.code}')" class="font-extrabold text-xs text-indigo-650 hover:underline cursor-pointer">${file.code}</span>
            <span class="px-2 py-0.5 text-[8px] font-bold rounded ${badgeType} uppercase">${file.type}</span>
          </div>
          <h4 class="font-bold text-xs text-slate-800 dark:text-slate-200 mt-1 leading-snug truncate-2-lines">${file.name}</h4>
          <p class="text-[9px] text-slate-400 dark:text-slate-500 font-semibold mt-1">Author: ${file.author}</p>
        </div>
        <div class="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-3">
          <span class="text-[9px] font-bold text-slate-400">${file.size}</span>
          <div class="flex gap-2">
            <button onclick="previewLibraryFile('${file.id}')" class="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-400 rounded-lg text-[9px] font-extrabold cursor-pointer">
              Read Notes
            </button>
            <button onclick="downloadLibraryFile(this, '${file.name}')" class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[9px] font-extrabold transition-all cursor-pointer">
              Download PDF
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  };

  searchInput.addEventListener("input", renderFiles);
  typeFilter.addEventListener("change", renderFiles);
  renderFiles();
}

function previewLibraryFile(fileId) {
  const file = STATE.libraryFiles.find(f => f.id == fileId);
  if (!file) return;

  const previewModal = document.createElement("div");
  previewModal.className = "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4";
  previewModal.innerHTML = `
    <div class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[80vh] animate-fade-in">
      <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <span class="text-[10px] font-bold text-indigo-600 uppercase">${file.code} - ${file.type}</span>
          <h3 class="font-extrabold text-sm text-slate-850 dark:text-slate-200 mt-0.5">${file.name}</h3>
        </div>
        <button onclick="this.closest('.fixed').remove()" class="p-1 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-6 md:p-8 font-mono text-xs text-slate-700 dark:text-slate-305 bg-slate-50/30 dark:bg-slate-950/20 whitespace-pre-wrap leading-relaxed">
        ${file.preview}
      </div>
      <div class="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end gap-3">
        <button onclick="this.closest('.fixed').remove()" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-colors cursor-pointer">
          Close Reader
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(previewModal);
}

function downloadLibraryFile(button, filename) {
  const originalText = button.textContent;
  button.disabled = true;
  button.classList.add("opacity-50", "cursor-not-allowed");
  
  let percent = 0;
  const interval = setInterval(() => {
    percent += 20;
    button.textContent = `${percent}%`;
    
    if (percent >= 100) {
      clearInterval(interval);
      button.textContent = originalText;
      button.disabled = false;
      button.classList.remove("opacity-50", "cursor-not-allowed");
      showToast(`Finished downloading: ${filename}`);
    }
  }, 200);
}

// Payment & Invoice Module
function initPaymentPanel() {
  const ledger = document.getElementById("invoices-ledger-body");
  const modal = document.getElementById("payment-modal");
  const payBtn = document.getElementById("pay-fees-btn");
  const cancelBtn = document.getElementById("close-pay-modal");
  const checkoutForm = document.getElementById("checkout-card-form");
  const billingSummary = document.getElementById("billing-summary-container");

  const renderLedger = () => {
    ledger.innerHTML = "";
    
    const invoices = [...STATE.paymentInvoices].sort((a,b) => {
      if (a.status === "Unpaid" && b.status === "Paid") return -1;
      if (a.status === "Paid" && b.status === "Unpaid") return 1;
      return 0;
    });

    invoices.forEach(inv => {
      const row = document.createElement("tr");
      row.className = "border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors";
      row.innerHTML = `
        <td class="px-6 py-4 font-bold text-xs text-slate-800 dark:text-slate-200">${inv.id}</td>
        <td class="px-6 py-4 text-xs text-slate-700 dark:text-slate-300 font-medium">${inv.title}</td>
        <td class="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 font-medium">${new Date(inv.date).toLocaleDateString()}</td>
        <td class="px-6 py-4 text-center text-xs text-slate-800 dark:text-slate-200 font-black">$${inv.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
        <td class="px-6 py-4 text-center">
          <span class="px-2.5 py-1 text-[10px] font-bold rounded-full ${
            inv.status === "Paid" 
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300" 
              : "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
          }">
            ${inv.status}
          </span>
        </td>
      `;
      ledger.appendChild(row);
    });

    billingSummary.innerHTML = `
      <div class="glass-panel p-5 rounded-3xl flex flex-col shadow-xs">
        <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Total Invoiced</span>
        <span class="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1">
          $${STATE.paymentInvoices.reduce((sum, i) => sum + i.amount, 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
        </span>
      </div>
      <div class="glass-panel p-5 rounded-3xl flex flex-col border border-emerald-100 dark:border-emerald-900/30 shadow-xs">
        <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Amount Settled</span>
        <span class="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
          $${STATE.paymentInvoices.filter(i => i.status === "Paid").reduce((sum, i) => sum + i.amount, 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
        </span>
      </div>
      <div class="glass-panel p-5 rounded-3xl flex flex-col border border-rose-100 dark:border-rose-900/30 shadow-xs">
        <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Outstanding Balance</span>
        <span class="text-2xl font-black text-rose-605 dark:text-rose-400 mt-1">
          $${STATE.student.outstandingBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}
        </span>
      </div>
    `;

    if (STATE.student.outstandingBalance > 0) {
      payBtn.classList.remove("hidden");
    } else {
      payBtn.classList.add("hidden");
    }
  };

  payBtn.addEventListener("click", () => {
    document.getElementById("amount-to-pay-label").textContent = `$${STATE.student.outstandingBalance.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });

  cancelBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  });

  const cardInput = document.getElementById("card-number-input");
  cardInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = v.match(/\d{4,16}/g);
    let match = matches && matches[0] || '';
    let parts = [];

    for (let i=0, len=match.length; i<len; i+=4) {
      parts.push(match.substring(i, i+4));
    }

    if (parts.length > 0) {
      e.target.value = parts.join(' ');
    } else {
      e.target.value = v;
    }
  });

  const cardExpiry = document.getElementById("card-expiry-input");
  cardExpiry.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      e.target.value = v.substring(0,2) + '/' + v.substring(2,4);
    } else {
      e.target.value = v;
    }
  });

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const submitBtn = checkoutForm.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Settle Secure Payment...
    `;

    setTimeout(() => {
      STATE.student.paidBalance += STATE.student.outstandingBalance;
      STATE.student.outstandingBalance = 0;
      
      STATE.paymentInvoices.forEach(inv => {
        if (inv.status === "Unpaid") inv.status = "Paid";
      });
      
      saveState();
      checkoutForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      
      showToast("Fees transaction approved. Outstanding tuition balance cleared!");
      
      initDashboard();
      renderLedger();
      initCourseRegistration();
    }, 2000);
  });

  renderLedger();
}

// Support Helpdesk Module
function initHelpdeskModule() {
  const ledger = document.getElementById("tickets-ledger-body");
  const ticketForm = document.getElementById("helpdesk-ticket-form");
  const chatModal = document.getElementById("ticket-chat-modal");
  const chatCloseBtn = document.getElementById("close-chat-modal");
  const chatMessagesContainer = document.getElementById("chat-messages-container");
  const chatInputForm = document.getElementById("chat-input-form");
  const chatTextInput = document.getElementById("chat-text-input");
  const unreadBadge = document.getElementById("helpdesk-alert-badge");

  const renderLedger = () => {
    ledger.innerHTML = "";
    
    STATE.supportTickets.forEach(ticket => {
      const row = document.createElement("tr");
      row.className = "border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors";
      row.innerHTML = `
        <td class="px-4 py-3 font-bold text-xs text-slate-850 dark:text-slate-200">${ticket.id}</td>
        <td class="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 font-semibold">${ticket.category}</td>
        <td class="px-4 py-3 text-xs text-slate-705 dark:text-slate-305 font-medium truncate max-w-40">${ticket.subject}</td>
        <td class="px-4 py-3 text-center">
          <span class="px-2 py-0.5 text-[9px] font-bold rounded-full ${
            ticket.status === "Resolved" 
              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300" 
              : "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
          }">
            ${ticket.status}
          </span>
        </td>
        <td class="px-4 py-3 text-center">
          <button onclick="openChatWindow('${ticket.id}')" class="px-2.5 py-1 text-[10px] font-extrabold bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 rounded-lg transition-colors cursor-pointer">
            Open Chat
          </button>
        </td>
      `;
      ledger.appendChild(row);
    });
  };

  ticketForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const cat = document.getElementById("ticket-category").value;
    const sub = document.getElementById("ticket-subject").value;
    const msg = document.getElementById("ticket-message").value;

    const id = `TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket = {
      id,
      category: cat,
      subject: sub,
      status: "Open",
      date: new Date().toISOString().split('T')[0],
      messages: [
        { sender: "student", message: msg, time: new Date().toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'}) }
      ]
    };

    STATE.supportTickets.unshift(newTicket);
    saveState();
    ticketForm.reset();
    showToast(`Ticket ${id} registered. Portal support will respond in a moment.`);
    renderLedger();

    // Automated contextual response simulation
    setTimeout(() => {
      let reply = "Hello Ama, we have logged this ticket and assigned it to the academic registry desk.";
      if (cat.includes("Finance")) {
        reply = "Hello Ama, our payment logs are being reconciled. If you have completed transaction pings, please send the reference ID.";
      } else if (cat.includes("ICT")) {
        reply = "Hi Ama, we have flushed your portal session logs. Please refresh your browser window and check your outline again.";
      }
      
      newTicket.messages.push({
        sender: "admin",
        message: reply,
        time: new Date().toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'})
      });
      saveState();
      showToast(`Support Admin replied to ticket ${id}!`);
      unreadBadge.classList.remove("hidden");
      
      if (activeTicketId === id) {
        renderChatMessages();
      }
    }, 3500);
  });

  window.openChatWindow = (ticketId) => {
    activeTicketId = ticketId;
    unreadBadge.classList.add("hidden");
    const ticket = STATE.supportTickets.find(t => t.id === ticketId);
    if (!ticket) return;

    document.getElementById("chat-ticket-id").textContent = ticket.id;
    document.getElementById("chat-ticket-subject").textContent = ticket.subject;

    renderChatMessages();
    chatModal.classList.remove("hidden");
    chatModal.classList.add("flex");
  };

  const renderChatMessages = () => {
    const ticket = STATE.supportTickets.find(t => t.id === activeTicketId);
    if (!ticket) return;

    chatMessagesContainer.innerHTML = "";
    
    ticket.messages.forEach(m => {
      const msgRow = document.createElement("div");
      msgRow.className = `flex ${m.sender === "student" ? "justify-end" : "justify-start"}`;
      
      const isStudent = m.sender === "student";
      const bgBox = isStudent 
        ? "bg-indigo-600 text-white rounded-tr-none" 
        : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-205 rounded-tl-none";

      msgRow.innerHTML = `
        <div class="max-w-[75%] p-3.5 rounded-2xl shadow-xs ${bgBox}">
          <p class="text-xs leading-relaxed font-medium">${m.message}</p>
          <span class="text-[8px] opacity-70 block text-right mt-1.5 font-bold">${m.time}</span>
        </div>
      `;
      chatMessagesContainer.appendChild(msgRow);
    });

    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  };

  chatInputForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatTextInput.value.trim();
    if (!text) return;

    const ticket = STATE.supportTickets.find(t => t.id === activeTicketId);
    if (!ticket) return;

    ticket.messages.push({
      sender: "student",
      message: text,
      time: new Date().toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'})
    });

    saveState();
    chatTextInput.value = "";
    renderChatMessages();

    // Simulated reply back after short delay
    setTimeout(() => {
      ticket.messages.push({
        sender: "admin",
        message: "Thank you for the update. This has been appended to the ticket log. We will contact you soon.",
        time: new Date().toLocaleTimeString(undefined, {hour: '2-digit', minute:'2-digit'})
      });
      saveState();
      if (activeTicketId === ticket.id) {
        renderChatMessages();
      }
    }, 2000);
  });

  chatCloseBtn.addEventListener("click", () => {
    chatModal.classList.add("hidden");
    chatModal.classList.remove("flex");
    activeTicketId = null;
  });

  renderLedger();
}

// Settings & ID Card Badge Module
function initSettings() {
  const profileForm = document.getElementById("profile-settings-form");
  const securityForm = document.getElementById("security-settings-form");
  const uploadInput = document.getElementById("settings-photo-upload");
  const printIdBtn = document.getElementById("print-id-card-btn");

  document.getElementById("settings-email").value = STATE.student.email;
  document.getElementById("settings-phone").value = STATE.student.phone;
  document.getElementById("settings-address").value = STATE.student.address;

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    STATE.student.email = document.getElementById("settings-email").value;
    STATE.student.phone = document.getElementById("settings-phone").value;
    STATE.student.address = document.getElementById("settings-address").value;
    
    saveState();
    showToast("Profile details updated successfully!");
    updateProfileDisplays();
  });

  securityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const cur = document.getElementById("settings-cur-pass").value;
    const nPass = document.getElementById("settings-new-pass").value;
    const conf = document.getElementById("settings-confirm-pass").value;

    if (!cur || !nPass || !conf) {
      showToast("All security fields are required.", "error");
      return;
    }

    if (nPass !== conf) {
      showToast("Passwords do not match.", "error");
      return;
    }

    showToast("Password updated successfully.");
    securityForm.reset();
  });

  uploadInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2000000) {
      showToast("Selected image file exceeds the 2MB portal cap limit.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      STATE.student.photo = event.target.result;
      saveState();
      updateProfileDisplays();
      showToast("Portal avatar uploaded successfully.");
    };
    reader.readAsDataURL(file);
  });

  printIdBtn.addEventListener("click", () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Student ID Badge - Print Preview</title>
          <link href="https://cdn.tailwindcss.com" rel="stylesheet">
          <style>
            body { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background-color: #f8fafc; font-family: 'Outfit', sans-serif; }
            .id-card-print { width: 3.375in; height: 2.125in; border-radius: 12px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); margin: 20px; overflow: hidden; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); color: white; display: flex; flex-direction: column; justify-content: space-between; padding: 16px; border: 1px solid #e2e8f0; position: relative; }
            @media print {
              body { background: white !important; }
              .no-print { display: none !important; }
              .id-card-print { margin: 0; border: 1px solid #000; box-shadow: none !important; page-break-after: always; }
            }
          </style>
        </head>
        <body onload="window.print()">
          <div class="no-print text-center text-sm font-bold text-slate-500 mb-6">
            Press print dialog. Back card is printed on subsequent sheets if duplex is desired.
          </div>
          
          <!-- Front -->
          <div class="id-card-print">
            <div class="flex justify-between items-start border-b border-white/10 pb-1">
              <span class="font-extrabold text-[9px] tracking-tight">REDEEMER'S UNIVERSITY</span>
              <span class="text-[7px] font-bold bg-white/10 px-1.5 py-0.5 rounded text-indigo-200">STUDENT</span>
            </div>
            <div class="flex gap-3 my-2 flex-1 items-center">
              <img class="w-14 h-16 rounded object-cover border border-white/10" src="${STATE.student.photo}">
              <div>
                <h4 class="font-bold text-[11px] leading-tight">${STATE.student.name}</h4>
                <span class="text-[8px] font-mono text-slate-400 tracking-wider">${STATE.student.matricNo}</span>
                <span class="text-[7px] text-indigo-300 block mt-1">B.Sc. Computer Science</span>
              </div>
            </div>
            <div class="flex justify-between items-center text-[6px] text-slate-400 border-t border-white/10 pt-1">
              <span>Class: First Class</span>
              <span>Blood: O+</span>
              <span>Expiry: 10/2026</span>
            </div>
          </div>

          <!-- Back -->
          <div class="id-card-print" style="background: #020617;">
            <div class="w-full h-3.5 bg-slate-800 mt-2"></div>
            <div class="text-[6px] text-slate-400 text-center px-4 leading-normal">
              This card is the property of Redeemer's University. If found, please return to office of Registrar, Ede, Osun.
            </div>
            <div class="flex justify-between items-end border-t border-slate-900 pt-2">
              <div class="bg-slate-200 h-5 w-32 flex items-center justify-around overflow-hidden rounded">
                <div class="h-full bg-slate-950 w-0.5"></div><div class="h-full bg-slate-950 w-1.5"></div><div class="h-full bg-slate-950 w-0.5"></div><div class="h-full bg-slate-950 w-2"></div><div class="h-full bg-slate-950 w-0.5"></div>
              </div>
              <span class="text-[7px] text-slate-500 font-mono">CMP2026</span>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  });
}
