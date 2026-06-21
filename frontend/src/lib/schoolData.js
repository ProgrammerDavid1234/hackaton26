/**
 * CAMPUSMIND AI — KDU School Knowledge Base
 * ─────────────────────────────────────────
 * This file is the AI's "brain" about your school.
 * Edit this with REAL data before your hackathon presentation.
 * The more real data you add here, the smarter the AI appears.
 */

export const SCHOOL_DATA = {

  // ── Basic info ──────────────────────────────────────────────────
  university: {
    name:     'Koladaisi University (KDU)',
    location: 'KM 18 Ibadan-Oyo, ExpressWay, Onidudun 200138, Oyo State, Nigeria',
    website:  'koladaisiuniversity.edu.ng',
    portal:   'koladaisiuniversityportal.com/gups/portal/student/login',
    founded:  'November 2016',
    vc:       'Prof. Adeniyi Olatunbosun',
  },

  // ── Departments & HODs ─────────────────────────────────────────
  // REPLACE with real names and offices
  departments: [
    {
      code:   'CSC',
      name:   'Computer Science & Digital Technology',
      faculty:'Applied Sciences',
      hod:    'Dr. Odeniyi Lateefat',
      office: 'Block C, Room 204',
      officeHours: 'Tue & Thu, 10:00 AM – 12:00 PM',
      email:  'f.adeyemi@kdu.edu.ng',
      phone:  '+234 803 ••• ••42',
    },
    {
      code:   'CPE',
      name:   'Computer Engineering',
      faculty:'Engineering',
      hod:    'Dr. [HOD Name]',
      office: 'Engineering Block, Room [X]',
      officeHours: '[Days and times]',
      email:  '[email]@kdu.edu.ng',
    },
    {
      code:   'EEE',
      name:   'Electrical & Electronics Engineering',
      faculty:'Engineering',
      hod:    'Prof. [HOD Name]',
      office: 'Engineering Block, Room [X]',
      officeHours: '[Days and times]',
      email:  '[email]@kdu.edu.ng',
    },
    // Add more departments...
  ],

  // ── Lecturers ──────────────────────────────────────────────────
  // REPLACE with real lecturer info
  lecturers: [
    {
      name:        'Dr. Folake Adeyemi',
      title:       'HOD, Computer Science',
      department:  'CSC',
      courses:     ['CSC 423', 'CSC 301'],
      office:      'Block C, Room 204',
      officeHours: 'Tue & Thu, 10:00 AM – 12:00 PM',
      email:       'f.adeyemi@kdu.edu.ng',
    },
    {
      name:        'Dr. [Lecturer Name]',
      title:       'Senior Lecturer',
      department:  'CSC',
      courses:     ['CSC 415', 'CSC 411'],
      office:      'Block C, Room [X]',
      officeHours: '[Days and times]',
      email:       '[email]@kdu.edu.ng',
    },
    // Add more lecturers...
  ],

  // ── Courses (400 Level CSC example) ────────────────────────────
  // REPLACE with real course list
  courses: [
    {
      code:       'CSC 423',
      name:       'Artificial Intelligence Fundamentals',
      units:      3,
      level:      '400',
      department: 'CSC',
      lecturer:   'Dr. Folake Adeyemi',
      schedule:   'Mon & Wed, 9:00 AM – 10:30 AM, Hall A',
      description:'Neural networks, search algorithms, knowledge representation, machine learning basics.',
    },
    {
      code:       'CSC 415',
      name:       'Distributed Systems',
      units:      3,
      level:      '400',
      department: 'CSC',
      lecturer:   'Dr. [Name]',
      schedule:   'Tue & Thu, 11:00 AM – 12:30 PM, Lab 4',
      description:'Distributed computing, consensus protocols, fault tolerance, microservices.',
    },
    {
      code:       'CSC 401',
      name:       'Software Engineering',
      units:      3,
      level:      '400',
      department: 'CSC',
      lecturer:   'Dr. [Name]',
      schedule:   'Mon & Fri, 2:00 PM – 3:30 PM, Hall B',
      description:'SDLC, agile methods, design patterns, testing, project management.',
    },
    // Add more courses...
  ],

  // ── Academic Calendar ──────────────────────────────────────────
  // REPLACE with real dates for current semester
  academicCalendar: {
    currentSemester: '2nd Semester, 2024/2025',
    semesterStart:   '14 January 2025',
    semesterEnd:     '4 July 2025',
    examStart:       '7 July 2025',
    examEnd:         '25 July 2025',
    resultDate:      'Mid August 2025',
    nextSemesterStart: 'September 2025',
    importantDates: [
      { date: 'March 14', event: 'Mid-semester break begins' },
      { date: 'March 24', event: 'Lectures resume' },
      { date: 'April 30', event: 'Course registration deadline' },
      { date: 'May 5',    event: 'Clearance form collection begins' },
      { date: 'June 20',  event: 'Last day of lectures' },
      { date: 'July 7',   event: 'Exams begin' },
    ],
  },

  // ── Campus Locations ───────────────────────────────────────────
  locations: [
    { name: 'Main Library',            location: 'Central Campus',          hours: 'Mon–Fri 8AM–10PM, Sat 9AM–5PM' },
    { name: 'ICT Centre',              location: 'Block D, Ground Floor',   hours: 'Mon–Fri 8AM–8PM' },
    { name: 'Student Affairs Office',  location: 'Admin Block, Room 101',   hours: 'Mon–Fri 8AM–4PM' },
    { name: 'Bursary',                 location: 'Admin Block, Room 105',   hours: 'Mon–Fri 8AM–3PM' },
    { name: 'Health Centre',           location: 'Near Female Hostel',      hours: '24/7 Emergency, Mon–Fri 8AM–5PM' },
    { name: 'Sports Complex',          location: 'South Campus',            hours: 'Mon–Sat 6AM–9PM' },
    { name: 'Faculty of Applied Sci',  location: 'Block A & B',             hours: 'Mon–Fri 7AM–6PM' },
    { name: 'Engineering Block',       location: 'East Campus',             hours: 'Mon–Fri 7AM–6PM' },
    // Add more locations...
  ],

  // ── Student Organisations ──────────────────────────────────────
  organisations: [
    {
      name:      'NACOS (Nigeria Association of Computer Science Students)',
      president: '[President Name]',
      meetingDay:'Every Tuesday, 4PM, CSC Seminar Room',
      email:     'nacos.kdu@gmail.com',
      activities:'Tech workshops, coding competitions, career talks',
    },
    {
      name:      'SUG (Student Union Government)',
      president: '[President Name]',
      office:    'Student Centre, Ground Floor',
      meetingDay:'Fridays',
    },
    // Add more organisations...
  ],

  // ── Fees & Payments ────────────────────────────────────────────
  fees: {
    portal:      'pay.kdu.edu.ng',
    acceptedMethods: ['Remita', 'Bank transfer', 'Debit card'],
    schoolFees: {
      '100 Level': '₦[amount]',
      '200 Level': '₦[amount]',
      '300 Level': '₦[amount]',
      '400 Level': '₦[amount]',
    },
    note: 'Fees must be paid before course registration each semester.',
  },

  // ── Procedures ─────────────────────────────────────────────────
  procedures: {
    courseRegistration: [
      '1. Pay school fees on the Remita portal',
      '2. Log into student portal at portal.kdu.edu.ng',
      '3. Click "Course Registration" and select your courses',
      '4. Print your registration slip',
      '5. Submit slip to your department office for signing',
    ],
    clearance: [
      '1. Collect clearance form from Student Affairs (Admin Block)',
      '2. Get sign-off from Library (return all books)',
      '3. Get sign-off from Bursary (no outstanding fees)',
      '4. Get sign-off from your Department',
      '5. Submit completed form to Exams & Records',
    ],
    resultCheck: [
      '1. Log into student portal',
      '2. Click "Academic Records" → "Semester Results"',
      '3. Results are usually uploaded 4–6 weeks after exams',
    ],
    transcriptRequest: [
      '1. Visit Exams & Records office (Admin Block, Room 108)',
      '2. Fill transcript request form',
      '3. Pay ₦[amount] at Bursary',
      '4. Collect after 2 working weeks',
    ],
  },

  // ── Upcoming events (update regularly) ────────────────────────
  upcomingEvents: [
    {
      title:     'AI & Robotics Workshop',
      organiser: 'NACOS',
      date:      'Saturday, 21 June 2025',
      time:      '10:00 AM',
      venue:     'CSC Seminar Room, Block C',
      rsvp:      'nacos.kdu@gmail.com',
    },
    {
      title:     'Career Fair 2025',
      organiser: 'Student Affairs',
      date:      'Friday, 27 June 2025',
      time:      '9:00 AM – 4:00 PM',
      venue:     'Main Auditorium',
      rsvp:      'student.affairs@kdu.edu.ng',
    },
    // Add more events...
  ],

  // ── Emergency contacts ─────────────────────────────────────────
  emergency: {
    security:      '0800-KDU-SAFE',
    healthCentre:  '[Phone number]',
    studentAffairs:'[Phone number]',
    deanOfStudents:'[Phone number]',
  },
}

/**
 * Converts the school data object into a formatted string
 * that gets injected into the AI system prompt.
 * The AI reads this and uses it to answer questions accurately.
 */
export function buildKnowledgeBase() {
  const d = SCHOOL_DATA

  return `
== UNIVERSITY INFORMATION ==
Name: ${d.university.name}
Location: ${d.university.location}
Student Portal: ${d.university.portal}
Vice Chancellor: ${d.university.vc}

== CURRENT ACADEMIC CALENDAR ==
Semester: ${d.academicCalendar.currentSemester}
Semester runs: ${d.academicCalendar.semesterStart} → ${d.academicCalendar.semesterEnd}
Exams: ${d.academicCalendar.examStart} → ${d.academicCalendar.examEnd}
Results expected: ${d.academicCalendar.resultDate}

Key dates:
${d.academicCalendar.importantDates.map(e => `• ${e.date}: ${e.event}`).join('\n')}

== DEPARTMENTS ==
${d.departments.map(dep => `
${dep.code} — ${dep.name} (${dep.faculty})
  HOD: ${dep.hod} | Office: ${dep.office} | Hours: ${dep.officeHours}
  Email: ${dep.email}
`).join('')}

== LECTURERS ==
${d.lecturers.map(l => `
${l.name} (${l.title}, ${l.department})
  Courses: ${l.courses.join(', ')}
  Office: ${l.office} | Hours: ${l.officeHours}
  Email: ${l.email}
`).join('')}

== COURSES (Current Semester) ==
${d.courses.map(c => `
${c.code} — ${c.name} (${c.units} units, ${c.level}L)
  Lecturer: ${c.lecturer}
  Schedule: ${c.schedule}
  Topics: ${c.description}
`).join('')}

== CAMPUS LOCATIONS & HOURS ==
${d.locations.map(l => `• ${l.name}: ${l.location} — ${l.hours}`).join('\n')}

== STUDENT ORGANISATIONS ==
${d.organisations.map(o => `• ${o.name}: meets ${o.meetingDay}`).join('\n')}

== UPCOMING EVENTS ==
${d.upcomingEvents.map(e => `• ${e.title} — ${e.date}, ${e.time} @ ${e.venue} (by ${e.organiser})`).join('\n')}

== KEY PROCEDURES ==
Course Registration: ${d.procedures.courseRegistration.join(' → ')}
Clearance: ${d.procedures.clearance.join(' → ')}

== FEES ==
Payment portal: ${d.fees.portal}
Payment methods: ${d.fees.acceptedMethods.join(', ')}

== EMERGENCY CONTACTS ==
Security: ${d.emergency.security}
Health Centre: ${d.emergency.healthCentre}
`.trim()
}
