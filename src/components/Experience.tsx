/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Briefcase, ChevronRight, Database, Terminal, CheckCircle2 } from 'lucide-react';
import { experienceData } from '../data';

export default function Experience() {
  const [activeTab, setActiveTab] = useState<string>('week-all');

  const logSteps = [
    {
      id: 'week-1',
      title: 'Weeks 1-2: OOP & Foundations',
      description: 'Strengthened core Python principles. Advanced class structures, decorators, exception models, syntax wrappers, and standard logging libraries.',
    },
    {
      id: 'week-4',
      title: 'Weeks 3-4: Django MVC & Models',
      description: 'Transitioned to Django. Configured settings blocks, migrations pipelines, and models. Managed entities and direct mapping with Django ORM modules.',
    },
    {
      id: 'week-6',
      title: 'Weeks 5-6: Authentication & Views',
      description: 'Integrated robust security gates. Coded session variables, login/logout decorators, and CSRF protective structures for restricted routes.',
    },
    {
      id: 'week-8',
      title: 'Weeks 7-8: Database Queries & CSS',
      description: 'Refined database performance. Reduced transaction latencies on nested queries. Polished frontend styling with adaptive CSS grids.',
    },
  ];

  return (
    <section id="experience" className="py-24 bg-neutral-950 border-b border-neutral-900 relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[6rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            03 . INDUSTRIAL CAREER
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Professional Experience
          </h2>
          <div className="h-0.5 w-16 bg-blue-600 rounded"></div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Internship Details (Col-7) */}
          <div className="lg:col-span-7 space-y-6">
            {experienceData.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-neutral-900/40 border border-neutral-850 p-6 sm:p-8 rounded-2xl relative overflow-hidden text-left hover:border-neutral-800 transition-all duration-300"
              >
                {/* Visual marker inside card */}
                <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-neutral-600 tracking-wider font-extrabold">
                  EXP_ID: SPRI_2025
                </div>

                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Briefcase size={22} className="animate-[pulse_4s_infinite]" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-neutral-300 text-sm font-semibold mt-1">
                      {exp.company}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 text-neutral-500 text-xs font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-neutral-600" />
                        {exp.duration}
                      </span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bullets */}
                <div className="space-y-4 mb-6">
                  <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
                    Core Contributions & Learnings:
                  </h4>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-neutral-300 text-xs sm:text-sm leading-relaxed">
                        <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skill badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-850/60">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md border border-neutral-800 bg-neutral-950 text-neutral-400 text-3xs font-mono font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Industrial Training log (Col-5) */}
          <div className="lg:col-span-5 bg-neutral-900/40 border border-neutral-850 p-6 sm:p-8 rounded-2xl relative text-left">
            <div className="flex items-center gap-2 pb-4 border-b border-neutral-850 mb-6">
              <Terminal size={16} className="text-blue-400" />
              <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
                Training Logbook
              </h3>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed mb-6">
              During my industrial training, my progress was structured into biweekly milestones reviewed by senior engineers. Interact below to view curriculum accomplishments:
            </p>

            {/* Quick Week Controls */}
            <div className="flex flex-col gap-2.5">
              {logSteps.map((step) => {
                const isActive = activeTab === step.id;
                return (
                  <div key={step.id}>
                    <button
                      onClick={() => setActiveTab(isActive ? 'week-all' : step.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs text-left font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-blue-600/90 border-blue-500/30 text-white font-semibold'
                          : 'bg-neutral-950/60 border-neutral-850 hover:border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span>{step.title}</span>
                      <ChevronRight
                        size={14}
                        className={`transition-transform duration-200 ${isActive ? 'rotate-90' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3.5 bg-neutral-950/20 border-x border-b border-neutral-850 rounded-b-xl text-xs text-neutral-400 leading-relaxed select-none">
                            {step.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
