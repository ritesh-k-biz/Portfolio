/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, Printer, ShieldCheck, Mail, Linkedin, Smartphone, MapPin, Download } from 'lucide-react';
import { personalInfo, educationData, experienceData, projectsData, certificationsData } from '../data';
import { trackEvent } from '../utils/analytics';

interface ResumeModalProps {
  onClose: () => void;
}

export default function ResumeModal({ onClose }: ResumeModalProps) {
  const [copied, setCopied] = useState(false);

  // Raw plain text for copying to ATS
  const rawResumeText = `${personalInfo.name}
${personalInfo.headline}
Email: ${personalInfo.email} | Phone: ${personalInfo.phone} | Location: ${personalInfo.location}
LinkedIn: linkedin.com/in/riteshk-bizz | GitHub: github.com/riteshk-bizz

========================================
PROFESSIONAL SUMMARY
========================================
${personalInfo.shortBio}

========================================
TECHNICAL SKILLS
========================================
- Languages: Python, HTML5, CSS3, SQL, JavaScript (Learning)
- Frameworks & Databases: Django, SQLite, PostgreSQL (Learning)
- Tools: Git, GitHub, VS Code, Linux
- Core Concepts: Object-Oriented Programming (OOP), Data Structures & Algorithms, CRM, Database Design

========================================
EXPERIENCE
========================================
Python & Django Intern
Softpro India Computer Technologies Pvt. Ltd., Lucknow, India
Duration: Jun 2025 - Aug 2025
- Completed an intensive 2-month industrial training program focusing on backend structures and Python standards.
- Developed and structured a robust mini web application using the Django framework.
- Designed and coded the full SQLite database model, integrating it cleanly via the Django ORM.
- Implemented secure user authentication modules (signup, login, logout, and session controls).

========================================
PROJECTS
========================================
1. Django Web Application
   - Built a web application using Django framework.
   - Implemented authentication and CRUD operations.
   - Integrated SQLite database and designed interfaces.

2. Student Management System
   - Coordinates academic progress logging and attendance trackers using Django & SQLite.

3. Smart Expense Tracker
   - Multi-model ledger using Django and ChartJS to render daily expenses.

4. Lead Management CRM
   - Corporate sales tracking pipeline with status lanes and logs.

5. AI Computer Science Chatbot
   - High-fidelity Gemini API powered CS tutor chatbot.

========================================
EDUCATION
========================================
- Diploma in Information Technology
  Chhatrapati Shahuji Maharaj Govt. Polytechnic, Expected Jun 2026
- Intermediate (PCM)
  SRS Inter College, Gautam Budh Nagar, Completed 2023
- High School (10th Grade)
  Dujana Public Inter College, Completed 2021

========================================
CERTIFICATIONS
========================================
- Python with Django Industrial Training, Softpro India, August 2025
- Deloitte Data Analytics Job Simulation (Forage), March 2026
- BCG Strategy Consulting Job Simulation (Forage), March 2026
- CS50\'s Intro to Python (HarvardX), Currently Pursuing

========================================
LANGUAGES
========================================
- English: B2 (Upper Intermediate)
- Hindi: C2 (Proficient)
`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(rawResumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-neutral-950/85 backdrop-blur-sm print:bg-white print:p-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden print:border-none print:shadow-none print:rounded-none print:max-h-full print:w-full print:h-full"
      >
        {/* Controls bar (Hidden in print) */}
        <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/40 shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-blue-500" />
            <span className="font-mono text-3xs text-neutral-500 font-extrabold tracking-widest uppercase">
              ATS-FRIENDLY COMPILER SHEET
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyText}
              className="px-3.5 py-1.5 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer font-sans"
              title="Copy Plain Text for ATS systems"
            >
              {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
              <span>{copied ? 'Copied Plain Text!' : 'Copy Plain Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer font-sans"
              title="Print Resume Page"
            >
              <Printer size={12} />
              <span>Print Page</span>
            </button>

            <a
              href="/ritesh-resume.pdf"
              download="Ritesh_Kumar_Resume.pdf"
              onClick={() => {
                trackEvent('resume_download', 'Resume', '/ritesh-resume.pdf');
              }}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer font-sans decoration-none"
              title="Download PDF version of Resume"
            >
              <Download size={12} />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-neutral-805 hover:border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Resume Content Wrapper (Paper Sheet Style) */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 bg-neutral-950/10 text-left cursor-text select-text print:bg-white print:text-black">
          {/* Paper Frame */}
          <div className="bg-white text-neutral-900 p-6 sm:p-8 rounded-xl shadow-inner border border-neutral-200/50 space-y-6 max-w-2xl mx-auto print:shadow-none print:border-none print:p-0">
            {/* Header Identity */}
            <div className="text-center space-y-2 border-b border-neutral-200 pb-5">
              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight uppercase">
                {personalInfo.name}
              </h1>
              <p className="font-sans text-xs font-semibold text-blue-600 uppercase tracking-widest leading-none">
                {personalInfo.headline}
              </p>

              {/* Contacts info row */}
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 text-4xs sm:text-3xs font-mono text-neutral-500 pt-1.5 leading-none">
                <span className="flex items-center gap-1">
                  <MapPin size={10} className="text-neutral-400" />
                  Uttar Pradesh, India
                </span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  <Smartphone size={10} className="text-neutral-400" />
                  +91 {personalInfo.phone}
                </span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  <Mail size={10} className="text-neutral-400" />
                  {personalInfo.email}
                </span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  <Linkedin size={10} className="text-neutral-400" />
                  linkedin.com/in/riteshk-bizz
                </span>
              </div>
            </div>

            {/* 1. Summary */}
            <div className="space-y-1.5">
              <h3 className="font-sans text-2xs sm:text-xs font-extrabold text-neutral-950 uppercase tracking-widest border-l-2 border-blue-600 pl-2 leading-none">
                Professional Summary
              </h3>
              <p className="text-3xs sm:text-2xs text-neutral-700 leading-relaxed font-sans font-medium">
                Motivated Information Technology graduate with hands-on experience in Python, Django, web development, and database integration. Completed industrial training at Softpro India Computer Technologies Pvt. Ltd., where I developed a web application using Django and SQLite. Strong foundation in programming, problem-solving, and software development principles.
              </p>
            </div>

            {/* 2. Technical Skills */}
            <div className="space-y-2">
              <h3 className="font-sans text-2xs sm:text-xs font-extrabold text-neutral-950 uppercase tracking-widest border-l-2 border-blue-600 pl-2 leading-none">
                Technical Skillsets
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-3xs sm:text-2xs text-neutral-800">
                <div className="flex gap-1.5">
                  <span className="font-bold text-neutral-950 w-24 shrink-0 font-sans">Programming:</span>
                  <span className="font-medium">Python</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="font-bold text-neutral-950 w-24 shrink-0 font-sans">Web Dev:</span>
                  <span className="font-medium">HTML, CSS, Django, JS (Learning)</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="font-bold text-neutral-950 w-24 shrink-0 font-sans">Databases:</span>
                  <span className="font-medium">SQLite (Basic), SQL</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="font-bold text-neutral-950 w-24 shrink-0 font-sans">Tools/Env:</span>
                  <span className="font-medium">Git, GitHub, VS Code</span>
                </div>
                <div className="flex gap-1.5 sm:col-span-2">
                  <span className="font-bold text-neutral-950 w-24 shrink-0 font-sans">Core Concepts:</span>
                  <span className="font-medium">OOP, Data Structures & Algorithms, CRUD Operations, Database Design</span>
                </div>
              </div>
            </div>

            {/* 3. Experiences */}
            <div className="space-y-3">
              <h3 className="font-sans text-2xs sm:text-xs font-extrabold text-neutral-950 uppercase tracking-widest border-l-2 border-blue-600 pl-2 leading-none">
                Professional Experience
              </h3>

              <div className="space-y-1.5">
                <div className="flex justify-between items-start font-sans text-3xs sm:text-2xs">
                  <div>
                    <span className="font-bold text-neutral-950">Python & Django Intern</span>
                    <span className="text-neutral-500 block text-[10px]">
                      Softpro India Computer Technologies Pvt. Ltd., Lucknow
                    </span>
                  </div>
                  <span className="font-mono text-neutral-500 font-bold text-[10px]">Jun 2025 – Aug 2025</span>
                </div>
                <ul className="list-disc pl-4 text-3xs sm:text-2xs text-neutral-700 space-y-1">
                  <li>Completed 2-month industrial training focusing on backend standards.</li>
                  <li>Developed structured mini web applications using the Django framework.</li>
                  <li>Implemented cookie security, user authentications, and session triggers.</li>
                  <li>Designed full relational entity models leveraging the SQLite interface.</li>
                </ul>
              </div>
            </div>

            {/* 4. Projects */}
            <div className="space-y-3">
              <h3 className="font-sans text-2xs sm:text-xs font-extrabold text-neutral-950 uppercase tracking-widest border-l-2 border-blue-600 pl-2 leading-none">
                Featured Projects
              </h3>

              <div className="space-y-2.5">
                <div className="space-y-1">
                  <div className="flex justify-between font-sans text-3xs sm:text-2xs leading-none">
                    <span className="font-bold text-neutral-950">Django Web Application</span>
                    <span className="font-mono text-neutral-400">Python, Django, SQLite, HTML5, CSS3</span>
                  </div>
                  <ul className="list-disc pl-4 text-4xs sm:text-3xs text-neutral-700 space-y-0.5">
                    <li>Built a web application using Django framework.</li>
                    <li>Implemented authentication and CRUD operations.</li>
                    <li>Integrated SQLite database and designed interfaces using HTML/CSS.</li>
                  </ul>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-sans text-3xs sm:text-2xs leading-none">
                    <span className="font-bold text-neutral-950">Student Management System</span>
                    <span className="font-mono text-neutral-400">Python, Django, SQL</span>
                  </div>
                  <p className="text-4xs sm:text-3xs text-neutral-700 pl-4 font-medium leading-normal">
                    Designed dynamic admin panels to register rosters, manage courses, and aggregate progress grids.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between font-sans text-3xs sm:text-2xs leading-none">
                    <span className="font-bold text-neutral-950">Smart Expense Tracker</span>
                    <span className="font-mono text-neutral-400">Django, ChartJS, SQLite</span>
                  </div>
                  <p className="text-4xs sm:text-3xs text-neutral-700 pl-4 font-medium leading-normal">
                    Compiled daily financial ledgers with custom client-side analytics tracking categorical budgets.
                  </p>
                </div>
              </div>
            </div>

            {/* 5. Educations */}
            <div className="space-y-3">
              <h3 className="font-sans text-2xs sm:text-xs font-extrabold text-neutral-950 uppercase tracking-widest border-l-2 border-blue-600 pl-2 leading-none">
                Formal Education
              </h3>

              <div className="space-y-2 text-3xs sm:text-2xs">
                {educationData.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-start leading-snug">
                    <div className="text-left">
                      <span className="font-bold text-neutral-950">{edu.degree}</span>
                      <span className="text-neutral-500 block text-[10px]">{edu.institution}, {edu.location}</span>
                    </div>
                    <span className="font-mono text-neutral-500 font-bold text-[10px] shrink-0 text-right">{edu.duration === 'Completed 2023' ? 'Class of 2023' : edu.duration === 'Completed 2021' ? 'Class of 2021' : 'Expected Jun 2026'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Certifications */}
            <div className="space-y-2.5">
              <h3 className="font-sans text-2xs sm:text-xs font-extrabold text-neutral-950 uppercase tracking-widest border-l-2 border-blue-600 pl-2 leading-none">
                Certifications
              </h3>
              <ul className="list-disc pl-4 text-3xs sm:text-2xs text-neutral-700 space-y-1">
                <li>Python with Django Training — Softpro India Computer Technologies Pvt. Ltd., Aug 2025</li>
                <li>Deloitte Data Analytics Job Simulation — Forage simulator validation node, Mar 2026</li>
                <li>BCG Strategy Consulting Job Simulation — Forage strategy analysis completion, Mar 2026</li>
                <li>CS50\'s Introduction to Programming with Python — HarvardX, In Active Pursuit</li>
              </ul>
            </div>

            {/* 7. Languages */}
            <div className="space-y-1.5">
              <h3 className="font-sans text-2xs sm:text-xs font-extrabold text-neutral-950 uppercase tracking-widest border-l-2 border-blue-600 pl-2 leading-none">
                Language Proficiencies
              </h3>
              <p className="text-3xs sm:text-2xs text-neutral-700 font-medium pl-2 leading-none">
                English (B2 — Upper Intermediate) &nbsp;|&nbsp; Hindi (C2 — Proficient Native Speaker)
              </p>
            </div>
          </div>
        </div>

        {/* Modal Close Footer (Hidden in print) */}
        <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/45 flex items-center justify-end shrink-0 print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow shadow-blue-900/15 cursor-pointer font-sans"
          >
            Close Resume Panel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
