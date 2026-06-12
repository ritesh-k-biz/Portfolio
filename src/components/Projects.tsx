/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Terminal, Play, X, Check, Code, Plus, ArrowRight, Sparkles, Send } from 'lucide-react';
import { projectsData } from '../data';
import { Project } from '../types';
import { trackEvent } from '../utils/analytics';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sandboxProject, setSandboxProject] = useState<Project | null>(null);

  // Categories
  const categories = ['All', 'Full-Stack', 'Backend', 'Generative AI', 'Frontend'];

  // Filter projects
  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  // Mock Sandbox State Holders
  const [chatbotInput, setChatbotInput] = useState('');
  const [chatbotHistory, setChatbotHistory] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! I am Ritesh\'s CS Tutor bot. Ask me anything about Python OOP, Django, or data structures.' },
  ]);

  const [studentList, setStudentList] = useState([
    { id: '101', name: 'Ayush Sharma', branch: 'Information Technology', semester: 'VI', status: 'Enrolled' },
    { id: '102', name: 'Nisha Singh', branch: 'Computer Science', semester: 'VI', status: 'Enrolled' },
  ]);
  const [newStudentName, setNewStudentName] = useState('');

  const [expenses, setExpenses] = useState([
    { title: 'Data Pack Recharge', amount: 299, category: 'Utilities' },
    { title: 'Python Reference Book', amount: 450, category: 'Education' },
    { title: 'CSJMG Hostel Msg Fee', amount: 2500, category: 'Food' },
  ]);
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Food');

  const [crmLeads, setCrmLeads] = useState([
    { id: 'L-01', client: 'EduCorp Ltd.', contact: 'edu@corp.in', status: 'Interested' },
    { id: 'L-02', client: 'TechNirvana Inc.', contact: 'sales@nirvana.com', status: 'Contacted' },
  ]);
  const [leadClient, setLeadClient] = useState('');
  const [leadContact, setLeadContact] = useState('');

  const [djangoSignedUser, setDjangoSignedUser] = useState<string | null>(null);
  const [djangoForm, setDjangoForm] = useState({ username: '', password: '', email: '' });

  // Handle chatbot simulation click
  const handleSendChat = () => {
    if (!chatbotInput.trim()) return;
    const userQuery = chatbotInput;
    const historyUpdate = [...chatbotHistory, { role: 'user' as const, text: userQuery }];
    setChatbotHistory(historyUpdate);
    setChatbotInput('');

    // Simulated responses based on keywords
    let botResponse = 'That\'s an excellent question! In computer science, that touches upon system architectures. Try asking about "decorators", "django orm", or "linked lists" for specialized outputs.';
    const queryLower = userQuery.toLowerCase();
    if (queryLower.includes('decorator')) {
      botResponse = 'In Python, a DECORATOR is a design pattern that allows you to extend or modify the behavior of a function without changing its source code. Syntactically, it is represented as `@decorator_name` above the function definition. Under the hood, it takes a function, adds some wrapper code, and returns it!';
    } else if (queryLower.includes('django')) {
      botResponse = 'Django utilizes the Model-View-Template (MVT) architecture. The Model handles database tables, the Dynamic template renders HTML templates, and the Views manage business logic. Django includes absolute security defaults out of the box, preventing typical SQL injection vulnerabilities.';
    } else if (queryLower.includes('list') || queryLower.includes('dsa') || queryLower.includes('structure')) {
      botResponse = 'Data structures organize memory so compilers can retrieve it quickly. For example, a Stacks is LIFO (Last-In, First-Out), useful for backtracks operations. A Queue is FIFO, managed using double pointers to allow Constant $O(1)$ operations!';
    }

    setTimeout(() => {
      setChatbotHistory(prev => [...prev, { role: 'bot' as const, text: botResponse }]);
    }, 600);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const randId = Math.floor(100 + Math.random() * 900).toString();
    setStudentList(prev => [
      ...prev,
      { id: randId, name: newStudentName, branch: 'IT Department', semester: 'VI', status: 'Enrolled' },
    ]);
    setNewStudentName('');
  };

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseTitle.trim() || !expenseAmount) return;
    setExpenses(prev => [
      ...prev,
      { title: expenseTitle, amount: parseFloat(expenseAmount), category: expenseCategory },
    ]);
    setExpenseTitle('');
    setExpenseAmount('');
  };

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadClient.trim() || !leadContact.trim()) return;
    const nextId = 'L-0' + (crmLeads.length + 1);
    setCrmLeads(prev => [
      ...prev,
      { id: nextId, client: leadClient, contact: leadContact, status: 'Interested' },
    ]);
    setLeadClient('');
    setLeadContact('');
  };

  const handleDjangoRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!djangoForm.username.trim() || !djangoForm.email.trim()) return;
    setDjangoSignedUser(djangoForm.username);
  };

  // Static Visual representation on cards
  const projectVectors: Record<string, React.ReactNode> = {
    'django-web-app': <div className="absolute inset-x-0 bottom-0 top-1/3 bg-radial from-blue-500/10 to-transparent flex items-center justify-center font-mono opacity-80 text-[10px] text-blue-500/70 border-t border-neutral-900 overflow-hidden"><pre className="text-left leading-tight">{'[auth_wrapper.py]\n@login_required\ndef query_db(req):\n  return sqlite.exec()'}</pre></div>,
    'student-mgmt': <div className="absolute inset-x-0 bottom-0 top-1/3 bg-radial from-violet-500/10 to-transparent flex items-center justify-center font-mono opacity-80 text-[10px] text-violet-500/70 border-t border-neutral-900 overflow-hidden"><pre className="text-left leading-tight">{'[SELECT * FROM students]\nFound 142 records...\nActive sessions: 11\nSystem status: Healthy'}</pre></div>,
    'expense-tracker': <div className="absolute inset-x-0 bottom-0 top-1/3 bg-radial from-amber-500/10 to-transparent flex items-center justify-center font-mono opacity-80 text-[10px] text-amber-500/70 border-t border-neutral-900 overflow-hidden"><pre className="text-left leading-tight">{'[Monthly Budget Allocation]\nFood: 45%\nUtilities: 14%\nFees: 31%'}</pre></div>,
    'lead-crm': <div className="absolute inset-x-0 bottom-0 top-1/3 bg-radial from-emerald-500/10 to-transparent flex items-center justify-center font-mono opacity-80 text-[10px] text-emerald-500/70 border-t border-neutral-900 overflow-hidden"><pre className="text-left leading-tight">{'[KANBAN PIPELINE ACTIVE]\nLead: EduCorp -> Contacted\nLead: SpaceTech -> Qualified'}</pre></div>,
    'ai-chatbot': <div className="absolute inset-x-0 bottom-0 top-1/3 bg-radial from-cyan-500/10 to-transparent flex items-center justify-center font-mono opacity-80 text-[10px] text-cyan-500/70 border-t border-neutral-900 overflow-hidden"><pre className="text-left leading-tight">{'[GEMINI SYSTEM NODE]\nUser: What is a Stack?\nBot: LIFO ordered pointer...'}</pre></div>,
    'portfolio-website': <div className="absolute inset-x-0 bottom-0 top-1/3 bg-radial from-sky-500/10 to-transparent flex items-center justify-center font-mono opacity-80 text-[10px] text-sky-500/70 border-t border-neutral-900 overflow-hidden"><pre className="text-left leading-tight">{'[portfolio_react_v4]\nCompiled: OK in 1.4s\nStatic files bundle: 42KB\nHMR service: STABLE'}</pre></div>,
  };

  return (
    <section id="projects" className="py-24 bg-neutral-900/10 border-b border-neutral-900 relative">
      <div className="absolute bottom-0 right-1/4 w-[28rem] h-[28rem] bg-blue-600/5 rounded-full blur-[7rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              04 . PRODUCTIONS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Featured Software Projects
            </h2>
            <div className="h-0.5 w-16 bg-blue-600 rounded"></div>
          </div>

          {/* Navigation filter tabs */}
          <div className="flex flex-wrap gap-1.5 bg-neutral-900/60 p-1 rounded-xl border border-neutral-850/80 w-fit">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-neutral-900/40 border border-neutral-850 hover:border-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group h-[440px] text-left relative"
            >
              {/* Card visual showcase area */}
              <div className="h-40 bg-neutral-950 flex items-center justify-center relative p-4 bg-[radial-gradient(#1e293b_1px,transparent_1px)] bg-[size:16px_16px] overflow-hidden select-none">
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md border border-neutral-800 bg-neutral-900 text-neutral-400 font-mono text-[9px] tracking-wider z-10">
                  {project.category}
                </div>

                {/* Simulated file structure mockup */}
                <div className="text-[11px] font-mono text-neutral-500 absolute top-2 right-2 flex items-center gap-1 opacity-70">
                  <Terminal size={10} />
                  {project.id === 'ai-chatbot' ? 'chatbot.py' : project.id === 'student-mgmt' ? 'system_db.sql' : 'app.py'}
                </div>

                {projectVectors[project.id]}
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between relative z-10 bg-gradient-to-b from-neutral-900/90 to-neutral-900/40 border-t border-neutral-850">
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Tech Pill List */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md border border-neutral-800 bg-neutral-950 text-neutral-400 font-mono text-[9px] font-semibold"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Operational Controls */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-neutral-850/60">
                    <button
                      onClick={() => {
                        trackEvent('launch_sandbox', 'Projects', project.title);
                        setSandboxProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-mono tracking-wider font-bold transition-colors cursor-pointer"
                    >
                      <Play size={12} className="animate-pulse" />
                      LAUNCH SANDBOX
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => {
                          trackEvent('view_github', 'Projects', project.title);
                        }}
                        className="w-7 h-7 rounded-md border border-neutral-800 hover:border-neutral-700 bg-neutral-950 flex items-center justify-center text-neutral-400 hover:text-white transition-all shadow"
                        title="GitHub Codebase"
                      >
                        <Github size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Sandbox Modal Overlay */}
      <AnimatePresence>
        {sandboxProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-neutral-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Modal Banner Title */}
              <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Terminal size={16} />
                  </div>
                  <div className="text-left">
                    <div className="font-mono text-3xs text-neutral-500 font-extrabold tracking-widest uppercase">
                      Interactive Sandbox Execution
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {sandboxProject.title} Console
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSandboxProject(null)}
                  className="p-1.5 rounded-lg border border-neutral-800 hover:border-neutral-700 bg-neutral-950 text-neutral-400 hover:text-white transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Sandbox Work Panel (Scrollable content) */}
              <div className="p-6 overflow-y-auto space-y-6 text-left flex-1 bg-neutral-950/20">
                {/* Meta details */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    Project Overview
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {sandboxProject.longDescription}
                  </p>
                </div>

                {/* Key Features List */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    Production Features (Real Code Specs)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {sandboxProject.features.map((feat) => (
                      <div
                        key={feat}
                        className="flex items-center gap-2 bg-neutral-900/50 border border-neutral-850 p-2.5 rounded-xl text-3xs sm:text-2xs text-neutral-300"
                      >
                        <Check size={12} className="text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dynamic Simulator Shell */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles size={12} className="text-blue-400 animate-pulse" />
                    LIVE INTERACTIVE SIMULATION
                  </h4>

                  {/* Conditionally render different sandbox modules */}

                  {/* 1. AI Chatbot Simulator */}
                  {sandboxProject.id === 'ai-chatbot' && (
                    <div className="border border-neutral-800 bg-neutral-950 rounded-2xl flex flex-col h-72">
                      <div className="flex items-center justify-between border-b border-neutral-900 px-3 py-2 bg-neutral-900/20 text-[10px] text-neutral-500 font-mono">
                        <span>Terminal Session: gemini_api_node_01</span>
                        <span>REST Gateway: ONLINE</span>
                      </div>
                      <div className="flex-1 p-3 overflow-y-auto space-y-2 text-2xs font-mono">
                        {chatbotHistory.map((chat, idx) => (
                          <div
                            key={idx}
                            className={`p-2 rounded-xl max-w-[85%] border leading-relaxed ${
                              chat.role === 'user'
                                ? 'bg-blue-600/10 border-blue-500/20 text-blue-300 ml-auto text-right'
                                : 'bg-neutral-900 border-neutral-850 text-neutral-300 mr-auto'
                            }`}
                          >
                            <span className="text-[9px] text-neutral-500 block mb-0.5">
                              {chat.role === 'user' ? 'USER' : 'GEMINI_AI_BOT'}
                            </span>
                            {chat.text}
                          </div>
                        ))}
                      </div>
                      <div className="p-2 border-t border-neutral-900 bg-neutral-900/20 flex gap-2">
                        <input
                          type="text"
                          value={chatbotInput}
                          onChange={(e) => setChatbotInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                          placeholder="Type or ask 'What is a decorator?'..."
                          className="flex-1 bg-neutral-950 border border-neutral-800 focus:border-blue-500 focus:outline-none p-2 rounded-lg text-2xs font-mono text-white placeholder-neutral-600"
                        />
                        <button
                          onClick={handleSendChat}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg cursor-pointer flex items-center justify-center shrink-0"
                        >
                          <Send size={12} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 2. Student Management System Simulator */}
                  {sandboxProject.id === 'student-mgmt' && (
                    <div className="border border-neutral-800 bg-neutral-950 rounded-2xl p-4 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
                        <div className="font-mono text-3xs text-neutral-500 font-semibold">
                          DATABASE STATUS: 2 RECORDS DETECTED
                        </div>
                        <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                          Active CRUD
                        </span>
                      </div>

                      {/* Student list */}
                      <div className="space-y-1.5 h-32 overflow-y-auto">
                        {studentList.map((st) => (
                          <div
                            key={st.id}
                            className="bg-neutral-900 border border-neutral-850 p-2.5 rounded-lg flex items-center justify-between text-2xs"
                          >
                            <div>
                              <div className="font-bold text-white">{st.name}</div>
                              <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">
                                ID: {st.id} | Department: {st.branch}
                              </div>
                            </div>
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400">
                              {st.status}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Add Form */}
                      <form onSubmit={handleAddStudent} className="flex gap-2 pt-2 border-t border-neutral-950">
                        <input
                          type="text"
                          value={newStudentName}
                          onChange={(e) => setNewStudentName(e.target.value)}
                          placeholder="Register student full name..."
                          className="flex-1 bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none px-3 py-2 rounded-lg text-2xs text-white placeholder-neutral-600 font-sans"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-2xs font-semibold rounded-lg flex items-center gap-1.5 cursor-pointer shrink-0"
                        >
                          <Plus size={12} /> Add Student
                        </button>
                      </form>
                    </div>
                  )}

                  {/* 3. Expense Tracker Simulator */}
                  {sandboxProject.id === 'expense-tracker' && (
                    <div className="border border-neutral-800 bg-neutral-950 rounded-2xl p-4 gap-4 grid grid-cols-1 sm:grid-cols-12">
                      <div className="sm:col-span-12 font-mono text-3xs text-neutral-500 font-semibold border-b border-neutral-900 pb-2 mb-2 flex justify-between">
                        <span>LEDGER CONNECTED (SQLITE WRAPPER)</span>
                        <span>TOTAL: ₹{expenses.reduce((sum, exp) => sum + exp.amount, 0)}</span>
                      </div>

                      {/* Left: list */}
                      <div className="sm:col-span-7 space-y-1.5 h-36 overflow-y-auto pr-1">
                        {expenses.map((e, idx) => (
                          <div
                            key={idx}
                            className="bg-neutral-900 border border-neutral-850 p-2.5 rounded-lg flex items-center justify-between text-2xs"
                          >
                            <div>
                              <div className="font-bold text-white text-left">{e.title}</div>
                              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-500 mt-1 inline-block">
                                {e.category}
                              </span>
                            </div>
                            <span className="font-mono text-2xs font-bold text-amber-400">
                              ₹{e.amount}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Right: add form */}
                      <form onSubmit={handleAddExpense} className="sm:col-span-5 flex flex-col gap-2.5 text-2xs justify-between">
                        <div className="space-y-1.5">
                          <input
                            type="text"
                            required
                            value={expenseTitle}
                            onChange={(e) => setExpenseTitle(e.target.value)}
                            placeholder="Expense title..."
                            className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2 rounded-lg text-white"
                          />
                          <input
                            type="number"
                            required
                            value={expenseAmount}
                            onChange={(e) => setExpenseAmount(e.target.value)}
                            placeholder="Amount (₹)..."
                            className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2 rounded-lg text-white"
                          />
                          <select
                            value={expenseCategory}
                            onChange={(e) => setExpenseCategory(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2 rounded-lg text-white"
                          >
                            <option>Food</option>
                            <option>Utilities</option>
                            <option>Education</option>
                            <option>Entertainment</option>
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 font-semibold text-white text-2xs rounded-lg cursor-pointer"
                        >
                          Log Expense
                        </button>
                      </form>
                    </div>
                  )}

                  {/* 4. Lead Management CRM Simulator */}
                  {sandboxProject.id === 'lead-crm' && (
                    <div className="border border-neutral-800 bg-neutral-950 rounded-2xl p-4 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-900 font-mono text-3xs text-neutral-500">
                        <span>LEADS PIPELINE ACTIVATED</span>
                        <span>MOCK BACKEND: STANDBY</span>
                      </div>

                      {/* Leads board */}
                      <div className="grid grid-cols-2 gap-3 h-32 overflow-y-auto">
                        <div>
                          <div className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest mb-1.5">
                            Stage: Interested
                          </div>
                          <div className="space-y-2">
                            {crmLeads.filter(l => l.status === 'Interested').map(l => (
                              <div key={l.id} className="p-2.5 rounded-xl border border-neutral-850 bg-neutral-900 text-left text-2xs">
                                <div className="font-bold text-white">{l.client}</div>
                                <div className="text-[10px] text-neutral-500 mt-0.5">{l.contact}</div>
                                <button
                                  type="button"
                                  onClick={() => setCrmLeads(prev => prev.map(cl => cl.id === l.id ? { ...cl, status: 'Contacted' } : cl))}
                                  className="mt-1.5 text-[9px] text-blue-400 hover:text-blue-300 font-mono flex items-center gap-1 cursor-pointer"
                                >
                                  Contact Lead <ArrowRight size={10} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest mb-1.5">
                            Stage: Contacted
                          </div>
                          <div className="space-y-2">
                            {crmLeads.filter(l => l.status === 'Contacted').map(l => (
                              <div key={l.id} className="p-2.5 rounded-xl border border-blue-500/20 bg-blue-950/15 text-left text-2xs">
                                <span className="font-mono text-[9px] text-emerald-400 mb-1 block">✓ Working</span>
                                <div className="font-bold text-white">{l.client}</div>
                                <div className="text-[10px] text-neutral-500 mt-0.5">{l.contact}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Form */}
                      <form onSubmit={handleAddLead} className="flex gap-2 pt-2 border-t border-neutral-950">
                        <input
                          type="text"
                          required
                          value={leadClient}
                          onChange={(e) => setLeadClient(e.target.value)}
                          placeholder="Client organization..."
                          className="flex-1 bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2 rounded-lg text-2xs text-white text-left font-sans"
                        />
                        <input
                          type="email"
                          required
                          value={leadContact}
                          onChange={(e) => setLeadContact(e.target.value)}
                          placeholder="Contact email..."
                          className="flex-1 bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2 rounded-lg text-2xs text-white text-left font-sans"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-2xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer shrink-0"
                        >
                          Add Lead
                        </button>
                      </form>
                    </div>
                  )}

                  {/* 5. Django Web Application Simulator */}
                  {sandboxProject.id === 'django-web-app' && (
                    <div className="border border-neutral-800 bg-neutral-950 rounded-2xl p-4 space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-900 font-mono text-3xs text-neutral-500">
                        <span>HTTPS GATEWAY LAYOUT (CSRF SECURED)</span>
                        <span>STATUS: OK</span>
                      </div>

                      {djangoSignedUser ? (
                        <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-xl text-center space-y-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
                            ✓
                          </div>
                          <div className="space-y-1">
                            <h5 className="font-bold text-white text-xs">REGISTRATION COMPLETE</h5>
                            <p className="text-3xs text-neutral-400 font-mono">
                              User: {djangoSignedUser} successfully committed to SQLite via Django ORM. Session tokens compiled.
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setDjangoSignedUser(null);
                              setDjangoForm({ username: '', password: '', email: '' });
                            }}
                            className="px-3 py-1 bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white rounded text-2xs font-mono select-none cursor-pointer"
                          >
                            Register Another User
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleDjangoRegister} className="space-y-2.5 max-w-sm mx-auto text-2xs">
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              required
                              value={djangoForm.username}
                              onChange={(e) => setDjangoForm(prev => ({ ...prev, username: e.target.value }))}
                              placeholder="Username..."
                              className="bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2 rounded-lg text-white"
                            />
                            <input
                              type="email"
                              required
                              value={djangoForm.email}
                              onChange={(e) => setDjangoForm(prev => ({ ...prev, email: e.target.value }))}
                              placeholder="Email address..."
                              className="bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2 rounded-lg text-white"
                            />
                          </div>
                          <input
                            type="password"
                            required
                            placeholder="Password hash block (min 8 chars)..."
                            className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2 rounded-lg text-white"
                          />
                          <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-2xs cursor-pointer tracking-wide"
                          >
                            HTTP POST Create User
                          </button>
                        </form>
                      )}
                    </div>
                  )}

                  {/* 6. Portfolio Website Compiler Simulator */}
                  {sandboxProject.id === 'portfolio-website' && (
                    <div className="border border-neutral-800 bg-neutral-950 rounded-2xl p-4 font-mono text-[10px] h-48 overflow-y-auto space-y-1 select-none">
                      <div className="text-neutral-500">❯ npm run build</div>
                      <div className="text-white">vite v6.2.3 building for production...</div>
                      <div className="text-neutral-400">✓ 42 modules transformed.</div>
                      <div className="text-emerald-400">✓ rendering chunks complete.</div>
                      <div className="text-neutral-400">dist/assets/index-388bdcf2.js   40.23 kB | gzip: 11.45 kB</div>
                      <div className="text-neutral-500">❯ npx eslint . --max-warnings 0</div>
                      <div className="text-emerald-400">✓ No issues or syntax warnings found in codebase!</div>
                      <div className="text-blue-400 mt-2">❯ System analysis: BUNDLE SIZE AT OPTIMUM PROFILE. Load speed calculated at &lt; 0.4s.</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sandbox Footer buttons */}
              <div className="px-5 py-4 border-t border-neutral-800 bg-neutral-950/40 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSandboxProject(null)}
                  className="px-4 py-2 text-neutral-400 hover:text-white text-xs font-semibold cursor-pointer"
                >
                  Close Console
                </button>
                <a
                  href={sandboxProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackEvent('view_github', 'Projects_Modal', sandboxProject.title);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow shadow-blue-900/10 cursor-pointer"
                >
                  <Code size={14} />
                  View Source Code
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
