/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { skillsData } from '../data';
import { BrainCircuit, Code, Settings, Database, Sliders } from 'lucide-react';

export default function Skills() {
  // Map category IDs to specific beautiful icons
  const categoryIcons: Record<string, React.ReactNode> = {
    languages: <Code size={18} className="text-blue-400" />,
    frameworks: <Database size={18} className="text-blue-400" />,
    tools: <Settings size={18} className="text-blue-400" />,
    concepts: <BrainCircuit size={18} className="text-blue-400" />,
  };

  return (
    <section id="skills" className="py-24 bg-neutral-900/20 border-b border-neutral-900 relative">
      {/* Mesh Background Accent */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            02 . EXPERTISE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Technical Skillsets
          </h2>
          <div className="h-0.5 w-16 bg-blue-600 rounded"></div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.4 }}
              className="bg-neutral-900/50 border border-neutral-850 hover:border-neutral-800 p-6 sm:p-8 rounded-2xl transition-all duration-300 relative group overflow-hidden"
            >
              {/* Top ambient highlight on parent hover */}
              <div className="absolute -top-20 -left-20 w-44 h-44 bg-blue-500/5 rounded-full blur-[4rem] group-hover:bg-blue-500/10 transition-all duration-500"></div>

              <div className="flex items-center gap-3 pb-5 border-b border-neutral-850 mb-6 relative z-10">
                <div className="w-9 h-9 rounded-xl bg-neutral-950 flex items-center justify-center border border-neutral-800">
                  {categoryIcons[category.id] || <Sliders size={18} />}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base text-left">
                    {category.title}
                  </h3>
                  <p className="text-neutral-500 text-3xs text-left font-mono uppercase tracking-wider mt-0.5">
                    {category.skills.length} parameters configured
                  </p>
                </div>
              </div>

              {/* Progress Bar Lists */}
              <div className="space-y-5 relative z-10">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-neutral-300 font-semibold">{skill.name}</span>
                      <span className="text-blue-400 font-medium">{skill.level}%</span>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-2 rounded-full bg-neutral-950 overflow-hidden border border-neutral-850/40">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
