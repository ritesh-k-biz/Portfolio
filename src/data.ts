/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, Experience, Certification, Education, BlogPost, SkillCategory, RoadmapStep } from './types';

export const personalInfo = {
  name: 'Ritesh Kumar',
  headline: 'Aspiring Software Engineer | Python Developer | Django Enthusiast',
  shortBio: 'I am an Information Technology student passionate about software engineering, problem-solving, and building real-world applications. I have experience with Python, Django, HTML, CSS, SQLite, Git, and backend development through academic projects and industrial training. Currently, I am focused on mastering computer science fundamentals, data structures, algorithms, and software engineering principles.',
  detailedBio: 'My journey in technology started with a deep curiosity about how digital systems operate. Over the past few years, specializing in Information Technology, I have built a strong grasp of both computer science theory and backend software practice. Interning as a Python & Django Developer provided real-world insights into developing structured APIs, managing persistent relational databases, and architecting reliable web services.',
  location: 'Uttar Pradesh, India',
  phone: '8512857131',
  email: 'riteshk.bizz@gmail.com',
  linkedin: 'https://linkedin.com/in/riteshk-bizz',
  github: 'https://github.com/riteshk-bizz',
  resumeUrl: '/ritesh-resume.pdf',
};

export const skillsData: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'HTML5 & CSS3', level: 85 },
      { name: 'JavaScript', level: 65 },
      { name: 'SQL', level: 75 },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks & Databases',
    skills: [
      { name: 'Django', level: 85 },
      { name: 'SQLite', level: 80 },
      { name: 'PostgreSQL (Learning)', level: 45 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Environments',
    skills: [
      { name: 'Git & GitHub', level: 85 },
      { name: 'VS Code', level: 90 },
      { name: 'Debian / Ubuntu Linux', level: 70 },
    ],
  },
  {
    id: 'concepts',
    title: 'Core Concepts & Theory',
    skills: [
      { name: 'Object-Oriented Programming (OOP)', level: 85 },
      { name: 'Data Structures & Algorithms', level: 75 },
      { name: 'Database Design & CRUD', level: 80 },
      { name: 'Problem Solving', level: 80 },
    ],
  },
];

export const experienceData: Experience[] = [
  {
    id: 'softpro-intern',
    company: 'Softpro India Computer Technologies Pvt. Ltd.',
    role: 'Python & Django Intern',
    location: 'Lucknow, India',
    duration: 'Jun 2025 – Aug 2025',
    responsibilities: [
      'Completed an intensive 2-month industrial training program focusing on backend structures and Python standards.',
      'Developed and structured a robust mini web application using the Django framework.',
      'Designed and coded the full SQLite database model, integrating it cleanly via the Django ORM.',
      'Implemented secure user authentication modules (signup, login, logout, and session controls) that protected user routes.',
      'Coordinated with team members using Git for version control to deliver final project modules ahead of scheduled reviews.',
    ],
    skills: ['Python', 'Django', 'SQLite', 'Git', 'HTML/CSS', 'Authentication'],
  },
];

export const educationData: Education[] = [
  {
    id: 'diploma',
    degree: 'Diploma in Information Technology',
    institution: 'Chhatrapati Shahuji Maharaj Govt. Polytechnic',
    location: 'Ambedkar Nagar, UP, India',
    duration: 'Class of 2026 (Expected)',
    grade: 'Pursuing',
    details: 'Rigorous studies focused on Systems Analysis, Software Engineering, OOP in Python/C, Web Technologies, Database Systems, Computer Networks, and practical lab projects.',
  },
  {
    id: 'intermediate',
    degree: 'Intermediate (12th Grade - Science & Mathematics)',
    institution: 'SRS Inter College',
    location: 'Gautam Budh Nagar, UP, India',
    duration: 'Completed 2023',
    details: 'Focused on physics, chemistry, and higher mathematics with a strong focus on logical problem-solving.',
  },
  {
    id: 'highschool',
    degree: 'High School (10th Grade)',
    institution: 'Dujana Public Inter College',
    location: 'G.B. Nagar, UP, India',
    duration: 'Completed 2021',
  },
];

export const projectsData: Project[] = [
  {
    id: 'django-web-app',
    title: 'Django Web Application',
    description: 'A responsive and secured web portal implementing complex multi-model CRUD and user authentication.',
    longDescription: 'Developed during industrial training, this web application acts as a blueprint for production-grade Django architecture. It utilizes SQLite as the database engine and the Django ORM to define clear entity-relationship mapping. It features interactive forms, secure cookie-based auth, dynamic content rendering based on permissions, and a polished frontend built with custom semantic classes.',
    category: 'Backend',
    techStack: ['Python', 'Django', 'SQLite', 'HTML5', 'Tailwind CSS'],
    features: [
      'Bespoke User Authentication using custom wrappers',
      'Advanced CRUD operations with data schema safety',
      'Optimized SQLite database queries reducing load times by 40%',
      'Fully responsive UI styled with custom transition properties',
    ],
    githubUrl: 'https://github.com/riteshk-bizz/django-web-app',
    liveUrl: '#',
  },
  {
    id: 'student-mgmt',
    title: 'Student Management System',
    description: 'An advanced administrative utility overseeing student enrollment, progress logging, and attendance metrics.',
    longDescription: 'Created to solve real-world polytechnic coordination issues. This platform allows instructors to manage course registrations, verify identity parameters, and update grades. On the other hand, students can login to view courses, track attendance cards, and print progress summaries.',
    category: 'Full-Stack',
    techStack: ['Python', 'Django', 'SQLite', 'CSS3', 'JavaScript'],
    features: [
      'Multi-user login nodes (Admins, Faculty, Students)',
      'Attendance tracker displaying visual dynamic pie matrices',
      'Report card compilation module with direct printer views',
      'Course enrollment logic respecting prerequisite rules',
    ],
    githubUrl: 'https://github.com/riteshk-bizz/student-management',
    liveUrl: '#',
  },
  {
    id: 'expense-tracker',
    title: 'Smart Expense Tracker',
    description: 'Analytical personal finance assistant compiling daily financial data into rich charts and categorization summaries.',
    longDescription: 'A custom personal ledger built to keep tabs on student expenditure. Built on Django, this tool implements dynamic filters allowing users to view expenses by time ranges (weekly, monthly, annual) or categories (food, books, travel, rent). It outputs statistical graphs illustrating allocation percentages.',
    category: 'Full-Stack',
    techStack: ['Python', 'Django', 'ChartJS', 'SQLite', 'Tailwind CSS'],
    features: [
      'Interactive Chart.js visualizations built client-side',
      'Monthly budget cap warnings sent through notifications',
      'Data exports to CSV tables and Excel spreadsheets',
      'Interactive transaction logging with instant state feedback',
    ],
    githubUrl: 'https://github.com/riteshk-bizz/expense-tracker',
    liveUrl: '#',
  },
  {
    id: 'lead-crm',
    title: 'Lead Management CRM',
    description: 'B2B CRM pipeline tracking customer aquisitions, team assignments, and automated engagement notes.',
    longDescription: 'A project designed to replicate industrial sales pipelines. Admins can create customer records (leads), assign them to agents, schedule follow-ups, and transition lead statuses (Interested, Contacted, Converted, Lost). Includes action audit log tracking who updated each lead and when.',
    category: 'Backend',
    techStack: ['Python', 'Django', 'SQLite', 'JS', 'Tailwind CSS'],
    features: [
      'Draggable Kanban-style status pipeline dashboard',
      'Activity timeline logger recording conversation milestones',
      'Internal team message board connected to lead workflows',
      'Visual metrics showing monthly salesperson close rates',
    ],
    githubUrl: 'https://github.com/riteshk-bizz/lead-crm',
    liveUrl: '#',
  },
  {
    id: 'ai-chatbot',
    title: 'AI Computer Science Chatbot',
    description: 'An API-driven chatbot powered by Gemini, trained specifically to guide users on algorithms and core CS topics.',
    longDescription: 'Built as a smart learning companion. Utilizing the advanced Gemini API server-side, this chatbot acts as a virtual tutor. It returns clean explanations, code examples in multiple languages, time-complexity analysis, and guides users with targeted hints rather than giving raw answers directly.',
    category: 'Generative AI',
    techStack: ['Python', 'Django', 'Gemini API', 'Markdown', 'React'],
    features: [
      'Fully-integrated Gemini API with custom instructions',
      'Syntax highlighted code blocks supporting Python, JavaScript, SQL',
      'Fast client-side streaming response simulations',
      'Topics bookmarking and session history preservation',
    ],
    githubUrl: 'https://github.com/riteshk-bizz/ai-chatbot',
    liveUrl: '#',
  },
  {
    id: 'portfolio-website',
    title: 'Premium Developer Portfolio',
    description: 'This gorgeous portfolio showcasing advanced animation layouts, dark mode aesthetics, and live terminal widgets.',
    longDescription: 'A premium, fully responsive, and highly optimized web platform showcasing Ritesh’s technical resume in an engaging way. Developed using modern React, TypeScript, and Framer Motion, it features seamless visual transitions, embedded statistical models for GitHub/LeetCode data, and a live blog reader.',
    category: 'Frontend',
    techStack: ['React', 'TypeScript', 'Tailwind V4', 'Framer Motion'],
    features: [
      'Interactive, high-fidelity developer dashboards',
      'Smooth scroll sections with synchronized navigation indicators',
      'Stateful user message terminal persisting drafts in Cache',
      'Full-featured client slide MD rendering engine for blog logs',
    ],
    githubUrl: 'https://github.com/riteshk-bizz/ritesh-portfolio',
    liveUrl: '#',
  },
];

export const certificationsData: Certification[] = [
  {
    id: 'python-django-training',
    title: 'Python with Django Industrial Training Certificate',
    issuer: 'Softpro India Computer Technologies Pvt. Ltd.',
    date: 'August 2025',
    credentialId: 'SP-PYDJ-2025-8842',
    verificationUrl: '#',
    badgeType: 'python',
  },
  {
    id: 'deloitte-analytics',
    title: 'Data Analytics Job Simulation Certificate',
    issuer: 'Deloitte (via Forage)',
    date: 'March 2026',
    credentialId: 'DEL-DA-FORAGE-9913',
    verificationUrl: 'https://www.theforage.com/simulations/deloitte/data-analytics',
    badgeType: 'analytics',
  },
  {
    id: 'bcg-consulting',
    title: 'Strategy Consulting Job Simulation Certificate',
    issuer: 'BCG (via Forage)',
    date: 'March 2026',
    credentialId: 'BCG-SC-FORAGE-1941',
    verificationUrl: 'https://www.theforage.com/simulations/bcg/strategy-consulting',
    badgeType: 'consulting',
  },
  {
    id: 'cs50-python',
    title: 'CS50\'s Introduction to Programming with Python',
    issuer: 'HarvardX (via edX)',
    date: 'Currently Pursuing (Expected 2026)',
    credentialId: 'CS50P-IP-2026',
    verificationUrl: 'https://cs50.harvard.edu/python',
    badgeType: 'cs50',
  },
];

export const learningJourneyData: RoadmapStep[] = [
  {
    id: 'current-cs50p',
    title: 'CS50 Python Mastery',
    status: 'in-progress',
    description: 'Perfecting advanced Python syntax, unit testing with pytest, regular expressions, files manipulation, and OOP fundamentals with Harvard curriculum and strict test models.',
    techs: ['Python', 'pytest', 'Regex', 'OOP'],
    timeline: 'Q1-Q2 2026',
  },
  {
    id: 'current-dsa',
    title: 'Data Structures & Algorithms',
    status: 'in-progress',
    description: 'Practicing algorithmic complexities, recursion, sorting, binary trees, linked lists, and pathfinding arrays. Consistently active solving puzzles.',
    techs: ['Time Complexity', 'Trees/Graphs', 'Searching/Sorting'],
    timeline: 'Ongoing',
  },
  {
    id: 'current-leetcode',
    title: 'LeetCode Problem Solving',
    status: 'in-progress',
    description: 'Maintaining a study sequence of standard questions. Enhancing mathematical analytics and debugging speeds under code execution metrics.',
    techs: ['Arrays', 'Two Pointers', 'Dijkstra', 'Hashing'],
    timeline: 'Daily',
  },
  {
    id: 'next-drf',
    title: 'Django REST Framework',
    status: 'planned',
    description: 'Planning to master Serializers, API viewsets, custom throttling, JWT token authentications, and REST API standards to power frontend frameworks.',
    techs: ['Django REST Framework', 'JWT Auth', 'WebSockets'],
    timeline: 'Q3 2026',
  },
  {
    id: 'next-postgres',
    title: 'PostgreSQL Migration & Integration',
    status: 'planned',
    description: 'Moving projects from simple SQLite files to production-centric multi-process relational databases. Learning indexes, trigger nodes, and advanced SQL tuning.',
    techs: ['PostgreSQL', 'DBMS', 'Indexing', 'SQL Triggers'],
    timeline: 'Q4 2026',
  },
  {
    id: 'next-react',
    title: 'Full-Stack SPA Engineering with React',
    status: 'planned',
    description: 'Acquiring professional fluency in component architectures, state hooks, react router, and API bridges to seamlessly integrate React client portals with Django REST backends.',
    techs: ['React', 'TypeScript', 'Tailwind', 'Redux / Context'],
    timeline: 'Q4 2026',
  },
  {
    id: 'next-sysdesign',
    title: 'System Design Fundamentals',
    status: 'planned',
    description: 'Understanding distributed architectures, proxy routing, microservices, horizontal scaling, memory caching with Redis, and message queues.',
    techs: ['System Design', 'Redis Caching', 'Cloud Containers'],
    timeline: 'Q1 2027',
  },
];

export const blogPostsData: BlogPost[] = [
  {
    id: 'django-mvt-demystified',
    title: 'Demystifying Django\'s MVT Architecture for Beginners',
    excerpt: 'An interactive handbook diving deep into Django\'s Model-View-Template cycle, mapping relational schemas straight to browser templates.',
    content: `When transitioning from standard procedural programming to scalable web frameworks, Django can feel overwhelming. One of the principal concepts developers must grasp is the **Model-View-Template (MVT)** architecture pattern.

While similar to the classical Model-View-Controller (MVC) design, Django implements a subtle twist where **the framework itself acts as the Controller**, leaving you to focus solely on the data structure, routing logic, and visualization.

### Understanding the Pillars

1. **Model (The Data):** This represents your database structure written in pure declarative Python. You never write manual SQL schemas; Django's Object-Relational Mapper (ORM) handles migrations, definitions, and queries.
2. **View (The Controller Logic):** Despite the name "View", this is actually where your backend *business logic* lives. It processes requests, pulls relevant variables from the Models, and packages them into context dictionaries.
3. **Template (The Interface):** This is the user-facing HTML containing special **Django Template Language (DTL)** tags to dynamically insert information computed in your Views.

### Step-by-Step Cycle of a Django Request

Let's visualize exactly what happens when on-demand users request a page:

\`\`\`
[User Browser] ---> (URL Router) ---> [Django View]
                                            |   (Queries Database)
                                            v
[Rendered HTML] <--- (DTL Engine) <--- [SQLite / PostgreSQL]
\`\`\`

Here is a simple example of a Django View declaring student updates:

\`\`\`python
# views.py
from django.shortcuts import render, get_object_or_400
from .models import Student

def student_details_view(request, student_id):
    # Fetch student object or return clean 404
    student = get_object_or_400(Student, id=student_id)
    
    # Store relevant database details in a context payload
    context = {
        "student_name": student.name,
        "current_grade": student.grade,
        "is_enrolled": student.is_active,
    }
    
    # Render page joining HTML and context data
    return render(request, "students/profile.html", context)
\`\`\`

### Why Django's MVT is Amazing for Interns

During my industrial training at **Softpro India**, using Django meant I could build complete user databases, protect them with login gates, and display dynamic records in minutes. It completely abstracts raw database drivers, preventing injection attacks and syntax errors right out of the box!

If you're eager to build full-stack tools, start with simple Django CRUD applications. The structure it forces on your code will teach you software architectural patterns that apply throughout your engineering career!`,
    date: 'Oct 14, 2025',
    readTime: '5 min read',
    category: 'Backend',
    likes: 42,
    comments: 8,
  },
  {
    id: 'deloitte-data-insights',
    title: 'Bridging Data & Strategy: Reflections on Deloitte\'s Job Simulation',
    excerpt: 'How cleaning raw parameters and mapping business variables in a consulting simulation informed my software engineering practices.',
    content: `In March 2026, I completed the **Deloitte Data Analytics Job Simulation** hosted through Forage. For a developer accustomed to writing CRUD scripts and organizing lists, stepping into the shoes of a Deloitte strategy analyst was an eye-opener.

Software engineers frequently focus on the *efficiency* of the algorithms they write. However, this simulation taught me how to pivot my perspective toward the *purpose* of the code: **generating business insights and solving client pain points.**

### The Core Assignment

The simulation placed me in a consulting squad tasked with reviewing operation parameters for a major global retailer. The main objectives were:

1. **Analytical Parsing:** Sifting through messy CSV files with invalid entries, inconsistent casing, and duplicated timestamps.
2. **Data Wrangling:** Designing structured schemas to bridge fragmented product tables, transaction logs, and customer details.
3. **Strategic Formulation:** Connecting clean metrics to strategic business actions, like inventory planning and customer churn predictions.

### Key Learnings for Software Engineers

* **Garbage In, Garbage Out:** Standard database integrity constraints are vital. If the input routes lack sanitization, the analytical graphs rendered upstream become highly skewed and useless for decision-makers.
* **SQL is Everything:** Mastering relational querying is not just for backend routes. Understanding how to perform nested queries, conditional aggregates, and indices improves system capabilities at every tier.
* **Simplifying the Complex:** Clients do not care about how intricate your database tables are. They want intuitive dashboards that indicate exactly where they are leaking profitability.

### Transitioning to Ritesh\'s Projects

Completing this simulation inspired me to upgrade my **Smart Expense Tracker** project! Instead of just simple lists, I implemented detailed monthly budget cap warnings, dynamic allocation graphs, and analytical alerts based on month-over-month increases.

Looking forward, I intend to bridge my software systems with data processing tools. Real value originates from software that is not only clean and error-free but also strategically optimized to empower the user.`,
    date: 'Mar 18, 2026',
    readTime: '4 min read',
    category: 'Data Analytics',
    likes: 29,
    comments: 3,
  },
  {
    id: 'pythonic-dsa-structures',
    title: 'Mastering DSA: Pythonic Implementations of Common Data Structures',
    excerpt: 'A clean, code-first lookup guide to writing stacks, double queues, and binary search trees natively in pure Python.',
    content: `As an Information Technology student targeting software engineering roles, practicing **Data Structures and Algorithms (DSA)** is a foundational requirement.

Because of its legible syntax, Python is one of the most powerful languages to express complex structural logic. However, many developers rely on high-level Python utilities (like standard lists) without understanding how list modifications degrade to linear complexity behind the scenes.

In this lookup guide, we'll rewrite three foundational structures entirely with primitive objects to understand their mechanics:

---

### 1. The Stack (Last-In, First-Out)
While we can use Python's list \`.append()\` and \`.pop()\`, let's wrap it in an OOP class to lock down access limits:

\`\`\`python
class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pop empty stack")
        return self._items.pop()

    def peek(self):
        return self._items[-1] if not self.is_empty() else None

    def is_empty(self):
        return len(self._items) == 0

    def size(self):
        return len(self._items)
\`\`\`

### 2. The Queue (First-In, First-Out)
Using basic lists for queues is inefficient because popping from index \`0\` causes Python to shift all other elements left in $O(N)$ time. Instead, we use a doubly linked list node representation:

\`\`\`python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class Queue:
    def __init__(self):
        self.front = None
        self.rear = None
        self._size = 0

    def enqueue(self, item):
        new_node = Node(item)
        if self.rear is None:
            self.front = self.rear = new_node
        else:
            self.rear.next = new_node
            self.rear = new_node
        self._size += 1

    def dequeue(self):
        if self.front is None:
            raise IndexError("Dequeue from empty queue")
        temp = self.front
        self.front = temp.next
        if self.front is None:
            self.rear = None
        self._size -= 1
        return temp.data

    def size(self):
        return self._size
\`\`\`

---

### 3. Binary Search Tree (BST)
Let's see how elements organize recursively to guarantee $O(\\log N)$ average retrieval profiles:

\`\`\`python
class TreeNode:
    def __init__(self, key):
        self.left = None
        self.right = None
        self.val = key

def insert(root, key):
    if root is None:
        return TreeNode(key)
    else:
        if root.val < key:
            root.right = insert(root.right, key)
        else:
            root.left = insert(root.left, key)
    return root

def search(root, key):
    # Base Cases: root is null or key is present
    if root is None or root.val == key:
        return root
 
    # Key is greater than root's key
    if root.val < key:
        return search(root.right, key)
   
    # Key is smaller than root's key
    return search(root.left, key)
\`\`\`

### Next Milestone: Algorithmic Runtime Optimization
Building my own nodes and pointers gave me deep muscle memory for arrays manipulations. Currently, I am practicing standard **LeetCode** challenges daily, improving my code execution time and memory profiles. 

Practice these implementations by hand—they will give you unparalleled clarity during technical interviews!`,
    date: 'May 02, 2026',
    readTime: '6 min read',
    category: 'Computer Science',
    likes: 54,
    comments: 12,
  },
];
