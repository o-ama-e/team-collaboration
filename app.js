/* ============================================================
   AMA'S UNIVERSITY STUDENT PORTAL — app.js
   Single-file vanilla JS SPA
   ============================================================ */

// ─── STATE MANAGEMENT ─────────────────────────────────────────
const STORAGE_KEY = 'AMAS_PORTAL_STATE_V4.2';

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
      if (window.STATE.user) {
        // Sync STUDENT_DATA properties with active session state
        Object.assign(STUDENT_DATA, window.STATE.user);
      }
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
  matric: 'AMA/CMP/22/1042',
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
  email: 'emmanuel.ama@ama.edu.ng',
  phone: '+234 803 456 7890',
  address: '12, Peace Estate, Ede, Osun State',
  advisor: {
    name: 'Prof. K. O. Adeyemi',
    email: 'adeyemiko@ama.edu.ng'
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
    { name: 'Okonkwo C. Chinedu', matric: 'AMA/CMP/22/1038', phone: '+234 803 123 4567', email: 'okonkwoc@ama.edu.ng' },
    { name: 'Okafor M. Nnamdi', matric: 'AMA/CMP/22/1051', phone: '+234 806 234 5678', email: 'okaform@ama.edu.ng' },
    { name: 'Adebayo K. Oluwaseun', matric: 'AMA/CMP/22/1067', phone: '+234 802 345 6789', email: 'adebayok@ama.edu.ng' }
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

const ACADEMIC_EVENTS_DATA = [
  { date: '2025-09-01', title: 'Faculty Reporting & Academic Board Meeting', type: 'academic', desc: 'All faculty report for session planning.' },
  { date: '2025-09-08', title: 'Freshmen Orientation Week', type: 'orientation', desc: 'Welcome programme for new intakes across all colleges.' },
  { date: '2025-09-08', title: 'Late Registration with Penalty Begins', type: 'deadline', desc: 'Late registration attracts a late fee.' },
  { date: '2025-09-15', title: 'Harmattan Semester Lectures Begin', type: 'academic', desc: 'Full academic activities commence for all levels.' },
  { date: '2025-09-22', title: 'Registration Closes (All Levels)', type: 'deadline', desc: 'Online portal registration closes definitively.' },
  { date: '2025-10-01', title: 'Nigeria Independence Day — No Lectures', type: 'holiday', desc: 'Public holiday observed.' },
  { date: '2025-10-13', title: 'Continuous Assessment Week I', type: 'academic', desc: 'First round of CA tests across all courses.' },
  { date: '2025-11-03', title: 'Course Registration Appeal Deadline', type: 'deadline', desc: 'Last day to file course registration appeals.' },
  { date: '2025-11-17', title: 'Continuous Assessment Week II', type: 'academic', desc: 'Second round of CA tests.' },
  { date: '2025-12-08', title: 'Lecture Ends / Revision Week', type: 'academic', desc: 'Lectures conclude. Revision week begins.' },
  { date: '2025-12-15', title: 'Harmattan Semester Examinations Begin', type: 'exam', desc: 'Written examinations across all courses.' },
  { date: '2025-12-22', title: 'Christmas Break — University Closed', type: 'holiday', desc: 'University closes for Christmas.' },
  { date: '2026-01-05', title: 'University Reopens / Exams Continue', type: 'exam', desc: 'Post-Christmas examination schedule resumes.' },
  { date: '2026-01-19', title: 'End of Semester Examinations', type: 'exam', desc: 'Last day of Harmattan semester exams.' },
  { date: '2026-01-26', title: 'Semester Break Begins', type: 'holiday', desc: 'Inter-semester break.' },
  { date: '2026-02-09', title: 'Rain Semester Lectures Begin', type: 'academic', desc: 'Rain semester academic activities commence.' },
  { date: '2026-02-16', title: 'Matriculation Ceremony', type: 'orientation', desc: 'Formal matriculation for all fresh students.' },
  { date: '2026-03-09', title: 'Rain Semester CA Week I', type: 'academic', desc: 'First CA tests for rain semester.' },
  { date: '2026-03-20', title: 'Course Withdrawal Deadline', type: 'deadline', desc: 'Last day to withdraw from courses without academic penalty.' },
  { date: '2026-04-06', title: 'Easter Break', type: 'holiday', desc: 'Easter holiday observed.' },
  { date: '2026-04-20', title: 'Rain Semester CA Week II', type: 'academic', desc: 'Second CA tests for rain semester.' },
  { date: '2026-05-11', title: 'Rain Semester Exams Begin', type: 'exam', desc: 'Rain semester written examinations.' },
  { date: '2026-05-25', title: 'Rain Semester Exams End', type: 'exam', desc: 'Last day of rain semester exams.' },
  { date: '2026-06-08', title: 'Session Ends / Vacation Begins', type: 'holiday', desc: 'Academic session concludes.' },
  { date: '2026-06-22', title: 'Result Publication Deadline', type: 'deadline', desc: 'All results must be published by this date.' }
];

const CATALOG_COURSES_DATA = [
  { code: 'CSC101', title: 'Introduction to Computing', units: 3, type: 'Core', level: 100 },
  { code: 'CSC102', title: 'Computer Programming I', units: 3, type: 'Core', level: 100 },
  { code: 'CSC103', title: 'Introductory Mathematics I', units: 3, type: 'Core', level: 100 },
  { code: 'CSC104', title: 'Introductory Mathematics II', units: 3, type: 'Core', level: 100 },
  { code: 'CSC105', title: 'Logic & Linear Algebra', units: 3, type: 'Core', level: 100 },
  { code: 'CSC106', title: 'Discrete Structures', units: 3, type: 'Core', level: 100 },
  { code: 'GNS101', title: 'Use of English I', units: 2, type: 'General', level: 100 },
  { code: 'GNS102', title: 'Use of English II', units: 2, type: 'General', level: 100 },
  { code: 'GNS103', title: 'Nigerian Peoples & Culture', units: 2, type: 'General', level: 100 },
  { code: 'PHY101', title: 'General Physics I', units: 3, type: 'Core', level: 100 },
  { code: 'PHY102', title: 'General Physics II', units: 3, type: 'Core', level: 100 },
  { code: 'CHM101', title: 'General Chemistry', units: 3, type: 'Core', level: 100 },
  { code: 'CSC201', title: 'Object Oriented Programming', units: 3, type: 'Core', level: 200 },
  { code: 'CSC202', title: 'Computer Programming II', units: 3, type: 'Core', level: 200 },
  { code: 'CSC203', title: 'Data Structures & Algorithms', units: 3, type: 'Core', level: 200 },
  { code: 'CSC204', title: 'Computer Architecture', units: 3, type: 'Core', level: 200 },
  { code: 'CSC205', title: 'Digital Logic Design', units: 3, type: 'Core', level: 200 },
  { code: 'CSC206', title: 'Software Engineering I', units: 3, type: 'Core', level: 200 },
  { code: 'CSC207', title: 'Web Technologies', units: 2, type: 'Core', level: 200 },
  { code: 'CSC208', title: 'Database Management Sys.', units: 3, type: 'Core', level: 200 },
  { code: 'GNS201', title: 'Philosophy & Logic', units: 2, type: 'General', level: 200 },
  { code: 'GNS202', title: 'Peace & Conflict Studies', units: 2, type: 'General', level: 200 },
  { code: 'MTS201', title: 'Probability & Statistics', units: 3, type: 'Core', level: 200 },
  { code: 'CSC301', title: 'Operating Systems', units: 3, type: 'Core', level: 300 },
  { code: 'CSC302', title: 'Computer Networks', units: 3, type: 'Core', level: 300 },
  { code: 'CSC303', title: 'Design & Analysis of Algorithms', units: 3, type: 'Core', level: 300 },
  { code: 'CSC304', title: 'Human Computer Interaction', units: 2, type: 'Core', level: 300 },
  { code: 'CSC305', title: 'Numerical Methods', units: 3, type: 'Core', level: 300 },
  { code: 'CSC306', title: 'Formal Languages & Automata', units: 3, type: 'Core', level: 300 },
  { code: 'CSC307', title: 'Cybersecurity Fundamentals', units: 3, type: 'Elective', level: 300 },
  { code: 'CSC308', title: 'Mobile Application Dev.', units: 3, type: 'Elective', level: 300 },
  { code: 'GNS301', title: 'Entrepreneurship Studies', units: 2, type: 'General', level: 300 },
  { code: 'GNS302', title: 'Research Methodology', units: 2, type: 'General', level: 300 },
  { code: 'CSC401', title: 'Software Engineering', units: 3, type: 'Core', level: 400 },
  { code: 'CSC403', title: 'Compiler Construction', units: 3, type: 'Core', level: 400 },
  { code: 'CSC405', title: 'Artificial Intelligence', units: 3, type: 'Core', level: 400 },
  { code: 'CSC407', title: 'Programming Lang. Paradigms', units: 3, type: 'Core', level: 400 },
  { code: 'CSC409', title: 'Project Management', units: 3, type: 'Core', level: 400 },
  { code: 'CSC411', title: 'Machine Learning', units: 3, type: 'Elective', level: 400 },
  { code: 'CSC413', title: 'Distributed Systems', units: 3, type: 'Elective', level: 400 },
  { code: 'CSC415', title: 'Cloud Computing', units: 3, type: 'Elective', level: 400 },
  { code: 'GNS401', title: 'Ethics & Civic Responsibility', units: 2, type: 'General', level: 400 }
];

const DOWNLOAD_RESOURCES_DATA = [
  { id: 'DL001', title: 'CSC 401 Past Questions (2022-2025)', category: 'past_questions', desc: 'Compiled past examination questions for Software Engineering.', fileType: 'PDF', fileSize: '2.4 MB', level: '400' },
  { id: 'DL002', title: 'CSC 403 Past Questions (2022-2025)', category: 'past_questions', desc: 'Compiled past questions for Compiler Construction.', fileType: 'PDF', fileSize: '1.8 MB', level: '400' },
  { id: 'DL003', title: 'CSC 405 Past Questions (2022-2025)', category: 'past_questions', desc: 'Compiled past questions for Artificial Intelligence.', fileType: 'PDF', fileSize: '2.1 MB', level: '400' },
  { id: 'DL004', title: 'CSC 301 Past Questions (2021-2025)', category: 'past_questions', desc: 'Past questions for Operating Systems.', fileType: 'PDF', fileSize: '1.5 MB', level: '300' },
  { id: 'DL005', title: 'CSC 203 Past Questions (2021-2024)', category: 'past_questions', desc: 'Past questions for Data Structures & Algorithms.', fileType: 'PDF', fileSize: '1.2 MB', level: '200' },
  { id: 'DL006', title: 'Software Engineering Lecture Notes', category: 'course_materials', desc: 'Comprehensive lecture notes covering the full CSC401 syllabus.', fileType: 'PDF', fileSize: '4.6 MB', level: '400' },
  { id: 'DL007', title: 'AI Study Guide & Slides', category: 'course_materials', desc: 'Lecture slides and study guide for CSC405 Artificial Intelligence.', fileType: 'ZIP', fileSize: '8.2 MB', level: '400' },
  { id: 'DL008', title: 'Data Structures Reference Sheet', category: 'course_materials', desc: 'Quick reference for common data structures and their complexities.', fileType: 'PDF', fileSize: '0.8 MB', level: '200' },
  { id: 'DL009', title: 'Operating Systems Lab Manual', category: 'course_materials', desc: 'Lab practical manual for CSC301 Operating Systems.', fileType: 'PDF', fileSize: '3.1 MB', level: '300' },
  { id: 'DL010', title: 'Course Registration Form', category: 'forms', desc: 'Official course registration form for manual submission.', fileType: 'PDF', fileSize: '0.3 MB', level: 'all' },
  { id: 'DL011', title: 'Course Withdrawal Form', category: 'forms', desc: 'Form for withdrawing from registered courses.', fileType: 'PDF', fileSize: '0.2 MB', level: 'all' },
  { id: 'DL012', title: 'Grade Appeal Form', category: 'forms', desc: 'Form to file a formal grade appeal with the academic board.', fileType: 'PDF', fileSize: '0.3 MB', level: 'all' },
  { id: 'DL013', title: 'Leave of Absence Form', category: 'forms', desc: 'Application for leave of absence from the programme.', fileType: 'PDF', fileSize: '0.3 MB', level: 'all' },
  { id: 'DL014', title: 'Student Handbook 2025/2026', category: 'handbooks', desc: 'Comprehensive guide to university policies, code of conduct, and student life.', fileType: 'PDF', fileSize: '12.5 MB', level: 'all' },
  { id: 'DL015', title: 'Academic Regulations & Guidelines', category: 'handbooks', desc: 'Official academic rules, grading policies, and degree requirements.', fileType: 'PDF', fileSize: '5.2 MB', level: 'all' },
  { id: 'DL016', title: 'IT Services & Portal Guide', category: 'handbooks', desc: 'Guide to using the student portal, email, and university IT services.', fileType: 'PDF', fileSize: '3.8 MB', level: 'all' }
];

const FAQ_DATA = [
  { q: 'How do I register for courses?', a: 'Navigate to Course Registration from the sidebar, select your desired courses ensuring you meet the minimum 12 units, then click Submit. You must have a zero tuition balance to complete registration.' },
  { q: 'When are results published?', a: 'Results are typically published within 4 weeks after the end of semester examinations. Check the Result Checker tab for updates.' },
  { q: 'How do I reset my portal password?', a: 'Go to ID & Settings → Security Settings. Enter your current password and your new password (minimum 6 characters), then confirm.' },
  { q: 'What do I do if payment fails?', a: 'Ensure your card details are correct and you have sufficient funds. If the issue persists, contact the ICT Help Desk or visit the Bursary Department.' },
  { q: 'How do I access my hostel allocation?', a: 'Your residence allocation appears in the Hostel Allocation tab. Roommate contact details and hall warden information are displayed there.' },
  { q: 'Can I change my registered courses?', a: 'Course changes are permitted during the registration window. After the deadline, file a Course Registration Appeal through the Academic office.' },
  { q: 'How is my CGPA calculated?', a: 'CGPA = Total Weighted Score (sum of units × grade points) ÷ Total Credit Units attempted. Grade points: A=5, B=4, C=3, D=2, E=1, F=0.' },
  { q: 'Who is my faculty advisor?', a: 'Your assigned advisor is displayed on the Dashboard. You can contact them via email for academic guidance and course selection advice.' }
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
  const icons = {
    success: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',
    error: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',
    info: '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
  };
  toast.innerHTML = '<span class="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ' +
    (type === 'success' ? 'bg-emerald-100 text-emerald-700' : type === 'error' ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700') +
    '">' + (icons[type] || icons.info) + '</span>' +
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
      ? '<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>'
      : '<svg class="w-5 h-5 text-slate-600 dark:text-slate-350" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
  }
  var landingThemeBtn = document.getElementById('landing-theme-toggle');
  if (landingThemeBtn) {
    landingThemeBtn.innerHTML = theme === 'dark'
      ? '<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z"></path></svg>'
      : '<svg class="w-5 h-5 text-slate-600 dark:text-slate-350" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>';
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

  if (matric.length > 0) {
    window.STATE.loggedIn = true;
    
    // Parse user input and update STUDENT_DATA properties dynamically
    var name = STUDENT_DATA.name;
    var matricNo = STUDENT_DATA.matric;

    if (matric.includes('/') || matric.match(/\d/)) {
      matricNo = matric.toUpperCase();
    } else {
      // If it's a name (e.g. "John Doe"), split and capitalize
      name = matric.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
      matricNo = "AMA/CMP/22/" + Math.floor(1000 + Math.random() * 9000);
    }

    STUDENT_DATA.name = name;
    STUDENT_DATA.matric = matricNo;
    STUDENT_DATA.email = name.toLowerCase().replace(/\s+/g, '.') + "@ama.edu.ng";

    window.STATE.user = {
      name: STUDENT_DATA.name,
      matric: STUDENT_DATA.matric,
      email: STUDENT_DATA.email,
      phone: STUDENT_DATA.phone,
      address: STUDENT_DATA.address
    };

    saveState();
    
    var landingPage = document.getElementById('landing-page');
    if (landingPage) landingPage.classList.add('hidden');
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('portal-container').style.display = 'flex';
    
    showToast('Authentication successful. Welcome, ' + STUDENT_DATA.name);
    initApp();
  } else {
    showToast('Please enter a matric number or student name.', 'error');
  }
}

function handleLogout() {
  window.STATE.loggedIn = false;
  window.STATE.user = null;
  window.STATE.currentTab = 'dashboard';
  window.STATE.selectedCourses = [];
  saveState();

  // Reset STUDENT_DATA back to default properties on logout
  STUDENT_DATA.name = 'Ama O. Emmanuel';
  STUDENT_DATA.matric = 'AMA/CMP/22/1042';
  STUDENT_DATA.email = 'emmanuel.ama@ama.edu.ng';
  
  var landingPage = document.getElementById('landing-page');
  if (landingPage) {
    landingPage.classList.remove('hidden');
    document.getElementById('login-page').style.display = 'none';
  } else {
    document.getElementById('login-page').style.display = 'flex';
  }

  document.getElementById('portal-container').style.display = 'none';
  document.getElementById('login-form').reset();
  showToast('Session terminated successfully.');
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
    settings: 'settings-section',
    academic_calendar: 'academic_calendar-section',
    course_catalog: 'course_catalog-section',
    downloads: 'downloads-section',
    help_desk: 'help_desk-section'
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
  else if (tabName === 'academic_calendar') renderAcademicCalendar();
  else if (tabName === 'course_catalog') renderCourseCatalog();
  else if (tabName === 'downloads') renderDownloads();
  else if (tabName === 'help_desk') renderHelpDesk();

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
    '<h1>AMA\'S UNIVERSITY</h1><h2>Ede, Osun State, Nigeria — Official Academic Transcript</h2>' +
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
  if (!sidebar) return;
  if (window.innerWidth >= 1024) {
    sidebar.classList.toggle('desktop-collapsed');
  } else {
    sidebar.classList.toggle('-translate-x-full');
  }
}

// ─── EVENT SETUP ─────────────────────────────────────────────
function setupEvents() {
  // Landing page routing
  var goToLoginBtn = document.getElementById('go-to-login-btn');
  var heroPortalBtn = document.getElementById('hero-portal-btn');
  var landingPage = document.getElementById('landing-page');

  if (goToLoginBtn) {
    goToLoginBtn.addEventListener('click', function() {
      if (landingPage) landingPage.classList.add('hidden');
      document.getElementById('login-page').style.display = 'flex';
    });
  }

  if (heroPortalBtn) {
    heroPortalBtn.addEventListener('click', function() {
      if (landingPage) landingPage.classList.add('hidden');
      document.getElementById('login-page').style.display = 'flex';
    });
  }

  var landingLogo = document.querySelector('#landing-page nav .flex.items-center');
  if (landingLogo) {
    landingLogo.style.cursor = 'pointer';
    landingLogo.addEventListener('click', function() {
      if (landingPage) landingPage.classList.remove('hidden');
      document.getElementById('login-page').style.display = 'none';
    });
  }

  var loginLogo = document.querySelector('#login-page .text-center');
  if (loginLogo) {
    loginLogo.style.cursor = 'pointer';
    loginLogo.addEventListener('click', function() {
      if (landingPage) landingPage.classList.remove('hidden');
      document.getElementById('login-page').style.display = 'none';
    });
  }

  // Landing page theme toggle
  var landingThemeBtn = document.getElementById('landing-theme-toggle');
  if (landingThemeBtn) {
    landingThemeBtn.addEventListener('click', toggleTheme);
  }

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

  // Mobile/desktop menu toggle
  var mobileBtn = document.getElementById('mobile-menu-toggle');
  if (mobileBtn) mobileBtn.addEventListener('click', toggleMobileMenu);

  var sidebarCollapseBtn = document.getElementById('sidebar-collapse-btn');
  if (sidebarCollapseBtn) sidebarCollapseBtn.addEventListener('click', toggleMobileMenu);

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

  // Calendar navigation
  var calPrev = document.getElementById('cal-prev-month');
  if (calPrev) calPrev.addEventListener('click', calendarPrevMonth);
  var calNext = document.getElementById('cal-next-month');
  if (calNext) calNext.addEventListener('click', calendarNextMonth);

  // Course Catalog filters
  var catSearch = document.getElementById('catalog-search-input');
  if (catSearch) catSearch.addEventListener('input', renderCatalogCourses);
  var catLevel = document.getElementById('catalog-level-filter');
  if (catLevel) catLevel.addEventListener('change', renderCatalogCourses);
  var catType = document.getElementById('catalog-type-filter');
  if (catType) catType.addEventListener('change', renderCatalogCourses);

  // Download category tabs (delegated)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('download-cat-tab')) {
      switchDownloadCategory(e.target.getAttribute('data-cat'));
    }
  });
  // Download file buttons (delegated)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('download-file-btn')) {
      handleDownloadFile(e);
    }
  });

  // Help Desk ticket form
  var ticketForm = document.getElementById('helpdesk-ticket-form');
  if (ticketForm) ticketForm.addEventListener('submit', handleTicketSubmit);
  var ticketDesc = document.getElementById('ticket-description');
  if (ticketDesc) ticketDesc.addEventListener('input', updateTicketCharCount);
  // FAQ toggles (delegated)
  document.addEventListener('click', function(e) {
    if (e.target.closest('.faq-toggle')) {
      toggleFAQ(e);
    }
  });
  // Ticket detail (delegated)
  document.addEventListener('click', function(e) {
    if (e.target.closest('.ticket-detail-btn')) {
      showTicketDetail(e);
    }
  });

  // Window resize → redraw chart
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawGpaChart, 200);
  });
}

// ─── ACADEMIC CALENDAR ─────────────────────────────────────────
var CALENDAR_CURRENT_MONTH = new Date().getMonth();
var CALENDAR_CURRENT_YEAR = new Date().getFullYear();

function renderAcademicCalendar() {
  renderCalendarGrid(CALENDAR_CURRENT_MONTH, CALENDAR_CURRENT_YEAR);
  renderCalendarEventsSidebar(CALENDAR_CURRENT_MONTH, CALENDAR_CURRENT_YEAR);
}

function renderCalendarGrid(month, year) {
  var tbody = document.getElementById('calendar-grid-body');
  if (!tbody) return;
  tbody.innerHTML = '';
  var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('cal-month-label').textContent = monthNames[month] + ' ' + year;

  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var today = new Date();
  var todayStr = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

  var cells = [];
  for (var i = 0; i < firstDay; i++) cells.push('<td class="px-2 py-3 text-center text-[10px] text-slate-300 dark:text-slate-700"></td>');
  for (var d = 1; d <= daysInMonth; d++) {
    var dateStr = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
    var isToday = dateStr === todayStr;
    var dayEvents = ACADEMIC_EVENTS_DATA.filter(function(e) { return e.date === dateStr; });

    var typeColors = { academic: 'bg-indigo-500', exam: 'bg-emerald-500', deadline: 'bg-amber-500', holiday: 'bg-rose-500', orientation: 'bg-sky-500' };
    var dots = '';
    for (var e = 0; e < Math.min(dayEvents.length, 3); e++) {
      var color = typeColors[dayEvents[e].type] || 'bg-slate-400';
      dots += '<span class="inline-block w-1.5 h-1.5 rounded-full ' + color + '"></span>';
    }
    if (dayEvents.length > 3) dots += '<span class="text-[8px] text-slate-400">+' + (dayEvents.length - 3) + '</span>';

    var tdClass = 'px-2 py-3 text-center text-xs align-top border border-slate-100 dark:border-slate-800/60 ' + (isToday ? 'bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-400/40 rounded-lg' : '');
    cells.push('<td class="' + tdClass + '"><span class="font-bold text-slate-700 dark:text-slate-300' + (isToday ? ' text-indigo-600 dark:text-indigo-400' : '') + '">' + d + '</span><div class="flex items-center justify-center gap-0.5 mt-1 min-h-4 flex-wrap">' + dots + '</div></td>');
    if ((firstDay + d) % 7 === 0 && d < daysInMonth) {
      cells.push('</tr><tr>');
    }
  }
  var remaining = 7 - ((firstDay + daysInMonth) % 7 || 7);
  for (var r = 0; r < remaining; r++) cells.push('<td class="px-2 py-3 text-center text-[10px] text-slate-300 dark:text-slate-700"></td>');

  tbody.innerHTML = '<tr>' + cells.join('') + '</tr>';
}

function renderCalendarEventsSidebar(month, year) {
  var container = document.getElementById('calendar-events-sidebar');
  if (!container) return;
  container.innerHTML = '';
  var prefix = year + '-' + String(month + 1).padStart(2, '0');
  var monthEvents = ACADEMIC_EVENTS_DATA.filter(function(e) { return e.date.indexOf(prefix) === 0; });
  monthEvents.sort(function(a, b) { return a.date.localeCompare(b.date); });

  if (monthEvents.length === 0) {
    container.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">No events this month.</p>';
    return;
  }
  for (var i = 0; i < monthEvents.length; i++) {
    var ev = monthEvents[i];
    var d = new Date(ev.date + 'T00:00:00');
    var dayNum = d.getDate();
    var dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var typeColors = { academic: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800', exam: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800', deadline: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800', holiday: 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800', orientation: 'bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800' };
    var card = document.createElement('div');
    card.className = 'flex gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60';
    card.innerHTML = '<div class="flex-shrink-0 w-10 text-center"><span class="block font-black text-sm text-slate-700 dark:text-slate-300">' + dayNum + '</span><span class="block text-[8px] font-bold text-slate-400 uppercase">' + dayNames[d.getDay()] + '</span></div>' +
      '<div class="flex-1 min-w-0"><p class="text-xs font-bold text-slate-700 dark:text-slate-300 leading-tight">' + ev.title + '</p><p class="text-[9px] text-slate-400 mt-0.5">' + (ev.desc || '') + '</p></div>' +
      '<span class="flex-shrink-0 self-start px-2 py-0.5 rounded-full text-[8px] font-bold border ' + (typeColors[ev.type] || 'bg-slate-100 text-slate-500') + '">' + ev.type + '</span>';
    container.appendChild(card);
  }
}

function calendarPrevMonth() {
  CALENDAR_CURRENT_MONTH--;
  if (CALENDAR_CURRENT_MONTH < 0) { CALENDAR_CURRENT_MONTH = 11; CALENDAR_CURRENT_YEAR--; }
  renderAcademicCalendar();
}

function calendarNextMonth() {
  CALENDAR_CURRENT_MONTH++;
  if (CALENDAR_CURRENT_MONTH > 11) { CALENDAR_CURRENT_MONTH = 0; CALENDAR_CURRENT_YEAR++; }
  renderAcademicCalendar();
}

// ─── COURSE CATALOG ───────────────────────────────────────────
function renderCourseCatalog() {
  renderCatalogCourses();
}

function renderCatalogCourses() {
  var grid = document.getElementById('catalog-courses-grid');
  if (!grid) return;
  var query = (document.getElementById('catalog-search-input').value || '').toLowerCase();
  var levelFilter = document.getElementById('catalog-level-filter').value;
  var typeFilter = document.getElementById('catalog-type-filter').value;

  var filtered = CATALOG_COURSES_DATA.filter(function(c) {
    if (levelFilter !== 'all' && c.level !== parseInt(levelFilter)) return false;
    if (typeFilter !== 'all' && c.type !== typeFilter) return false;
    if (query && c.code.toLowerCase().indexOf(query) === -1 && c.title.toLowerCase().indexOf(query) === -1) return false;
    return true;
  });

  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-sm text-slate-400">No courses match your search criteria.</p></div>';
    return;
  }
  for (var i = 0; i < filtered.length; i++) {
    var c = filtered[i];
    var typeColor = c.type === 'Core' ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400' : c.type === 'Elective' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400';
    var card = document.createElement('div');
    card.className = 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all glass-card-hover';
    card.innerHTML = '<div class="flex justify-between items-start mb-3"><div><span class="text-xs font-black text-indigo-600 dark:text-indigo-400">' + c.code + '</span><h4 class="font-bold text-sm text-slate-800 dark:text-slate-200 mt-0.5">' + c.title + '</h4></div><span class="px-2.5 py-1 rounded-full text-[9px] font-bold ' + typeColor + '">' + c.type + '</span></div>' +
      '<div class="flex items-center gap-4 text-[10px] text-slate-400"><span>' + c.units + ' Units</span><span>Level ' + c.level + '</span></div>';
    grid.appendChild(card);
  }
}

// ─── RESOURCE LIBRARY ─────────────────────────────────────────
var DOWNLOAD_ACTIVE_CATEGORY = 'all';

function renderDownloads() {
  renderDownloadsGrid();
}

function renderDownloadsGrid() {
  var grid = document.getElementById('downloads-grid');
  if (!grid) return;
  var filtered = DOWNLOAD_ACTIVE_CATEGORY === 'all' ? DOWNLOAD_RESOURCES_DATA : DOWNLOAD_RESOURCES_DATA.filter(function(d) { return d.category === DOWNLOAD_ACTIVE_CATEGORY; });

  grid.innerHTML = '';
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="col-span-full text-center py-12"><p class="text-sm text-slate-400">No resources in this category yet.</p></div>';
    return;
  }
  for (var i = 0; i < filtered.length; i++) {
    var r = filtered[i];
    var icons = { PDF: 'M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z', ZIP: 'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l3 3h7a2 2 0 012 2v1M5 12h14M5 12v2m14-2v2', DOC: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' };
    var iconPath = icons[r.fileType] || icons.PDF;
    var card = document.createElement('div');
    card.className = 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all glass-card-hover flex flex-col';
    card.innerHTML = '<div class="flex items-start gap-3 mb-3"><div class="w-10 h-10 rounded-xl bg-indigo-55 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="' + iconPath + '"/></svg></div><div class="flex-1 min-w-0"><h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">' + r.title + '</h4><p class="text-[9px] text-slate-400 mt-0.5">' + r.desc + '</p></div></div>' +
      '<div class="flex items-center justify-between mt-auto pt-3 border-t border-slate-200 dark:border-slate-800"><span class="text-[9px] text-slate-400">' + r.fileType + ' · ' + r.fileSize + '</span>' +
      '<button class="download-file-btn px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold transition-colors cursor-pointer border-0 flex items-center gap-1" data-id="' + r.id + '">' +
      '<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg> Download</button></div>';
    grid.appendChild(card);
  }
}

function switchDownloadCategory(cat) {
  DOWNLOAD_ACTIVE_CATEGORY = cat;
  var tabs = document.querySelectorAll('.download-cat-tab');
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('bg-indigo-600', 'text-white');
    tabs[i].classList.add('bg-slate-200', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400');
    if (tabs[i].getAttribute('data-cat') === cat) {
      tabs[i].classList.remove('bg-slate-200', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-400');
      tabs[i].classList.add('bg-indigo-600', 'text-white');
    }
  }
  renderDownloadsGrid();
}

function handleDownloadFile(e) {
  var id = e.target.getAttribute('data-id');
  var resource = DOWNLOAD_RESOURCES_DATA.find(function(r) { return r.id === id; });
  if (resource) {
    showToast('Downloading "' + resource.title + '" (' + resource.fileSize + ')...', 'success');
  }
}

// ─── HELP DESK ───────────────────────────────────────────────
var SUPPORT_TICKETS_DATA = [];
var TICKET_COUNTER = 1000;

function renderHelpDesk() {
  renderFAQs();
  renderTicketsList();
  updateTicketBadge();
}

function renderFAQs() {
  var container = document.getElementById('helpdesk-faq-container');
  if (!container) return;
  container.innerHTML = '';
  for (var i = 0; i < FAQ_DATA.length; i++) {
    var faq = FAQ_DATA[i];
    var item = document.createElement('div');
    item.className = 'faq-item rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 overflow-hidden';
    item.innerHTML = '<button class="faq-toggle w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-transparent border-0 cursor-pointer" data-index="' + i + '">' +
      '<span class="text-xs font-bold text-slate-700 dark:text-slate-300 flex-1">' + faq.q + '</span>' +
      '<svg class="faq-chevron w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg></button>' +
      '<div class="faq-answer hidden px-4 pb-4"><p class="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">' + faq.a + '</p></div>';
    container.appendChild(item);
  }
}

function toggleFAQ(e) {
  var btn = e.target.closest('.faq-toggle');
  if (!btn) return;
  var answer = btn.nextElementSibling;
  var chevron = btn.querySelector('.faq-chevron');
  if (answer.classList.contains('hidden')) {
    answer.classList.remove('hidden');
    chevron.classList.add('rotate-180');
  } else {
    answer.classList.add('hidden');
    chevron.classList.remove('rotate-180');
  }
}

function handleTicketSubmit(e) {
  e.preventDefault();
  var category = document.getElementById('ticket-category').value;
  var priority = document.getElementById('ticket-priority').value;
  var subject = document.getElementById('ticket-subject').value.trim();
  var description = document.getElementById('ticket-description').value.trim();

  if (!category) { showToast('Please select a ticket category.', 'error'); return; }
  if (!subject) { showToast('Please enter a subject.', 'error'); return; }
  if (!description) { showToast('Please describe your issue.', 'error'); return; }

  TICKET_COUNTER++;
  var ticket = {
    id: 'TKT-' + TICKET_COUNTER,
    category: category,
    priority: priority,
    subject: subject,
    description: description,
    status: 'Open',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    updates: [{ date: new Date().toLocaleString(), message: 'Ticket created and submitted for review.' }]
  };
  SUPPORT_TICKETS_DATA.unshift(ticket);

  document.getElementById('helpdesk-ticket-form').reset();
  document.getElementById('ticket-char-count').textContent = '0/2000';
  renderTicketsList();
  updateTicketBadge();
  showToast('Support ticket ' + ticket.id + ' submitted successfully.', 'success');
}

function renderTicketsList() {
  var container = document.getElementById('tickets-list-container');
  if (!container) return;
  container.innerHTML = '';
  if (SUPPORT_TICKETS_DATA.length === 0) {
    container.innerHTML = '<p class="text-xs text-slate-400 text-center py-8">No tickets submitted yet.</p>';
    return;
  }
  for (var i = 0; i < SUPPORT_TICKETS_DATA.length; i++) {
    var t = SUPPORT_TICKETS_DATA[i];
    var priorityColors = { Low: 'bg-slate-100 dark:bg-slate-800 text-slate-500', Medium: 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400', High: 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400', Urgent: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400' };
    var statusColors = { Open: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400', 'In Progress': 'bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400', Resolved: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400', Closed: 'bg-slate-100 dark:bg-slate-800 text-slate-400' };
    var card = document.createElement('div');
    card.className = 'p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60';
    card.innerHTML = '<div class="flex items-start justify-between gap-3 mb-2"><div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span class="text-[10px] font-black text-indigo-600 dark:text-indigo-400">' + t.id + '</span><span class="px-2 py-0.5 rounded-full text-[8px] font-bold border ' + (priorityColors[t.priority] || '') + '">' + t.priority + '</span><span class="px-2 py-0.5 rounded-full text-[8px] font-bold ' + (statusColors[t.status] || '') + '">' + t.status + '</span></div><h4 class="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">' + t.subject + '</h4></div><span class="text-[9px] text-slate-400 flex-shrink-0">' + t.date + '</span></div>' +
      '<div class="flex items-center gap-2 text-[9px] text-slate-400"><span>' + t.category + '</span><span>·</span><span>' + t.updates.length + ' update(s)</span></div>' +
      '<button class="ticket-detail-btn mt-2 text-[9px] font-bold text-indigo-600 hover:text-indigo-700 bg-transparent border-0 cursor-pointer p-0" data-id="' + t.id + '">View details →</button>';
    container.appendChild(card);
  }
}

function updateTicketBadge() {
  var badge = document.getElementById('ticket-count-badge');
  if (badge) badge.textContent = SUPPORT_TICKETS_DATA.length + ' ticket' + (SUPPORT_TICKETS_DATA.length !== 1 ? 's' : '');
}

function showTicketDetail(e) {
  var btn = e.target.closest('.ticket-detail-btn');
  if (!btn) return;
  var id = btn.getAttribute('data-id');
  var ticket = SUPPORT_TICKETS_DATA.find(function(t) { return t.id === id; });
  if (!ticket) return;

  var updatesHtml = '';
  for (var i = 0; i < ticket.updates.length; i++) {
    updatesHtml += '<div class="flex gap-3 pb-3 border-b border-slate-100 dark:border-slate-800 last:border-0"><span class="text-[9px] text-slate-400 flex-shrink-0 w-20">' + ticket.updates[i].date + '</span><p class="text-[10px] text-slate-600 dark:text-slate-400">' + ticket.updates[i].message + '</p></div>';
  }

  showToast(
    '<div class="text-left"><p class="font-bold text-xs">' + ticket.id + ': ' + ticket.subject + '</p><p class="text-[10px] text-slate-500 mt-1">' + ticket.category + ' · ' + ticket.priority + ' priority · Status: ' + ticket.status + '</p><div class="mt-2 space-y-1">' + updatesHtml + '</div></div>',
    'info'
  );
}

function updateTicketCharCount() {
  var textarea = document.getElementById('ticket-description');
  var count = document.getElementById('ticket-char-count');
  if (textarea && count) count.textContent = textarea.value.length + '/2000';
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
  applyTheme(window.STATE.theme);

  var landingPage = document.getElementById('landing-page');

  // Auto-login check
  if (window.STATE.loggedIn && window.STATE.user) {
    if (landingPage) landingPage.classList.add('hidden');
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('portal-container').style.display = 'flex';
    initApp();
  } else {
    if (landingPage) landingPage.classList.remove('hidden');
    document.getElementById('login-page').style.display = 'none';
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
