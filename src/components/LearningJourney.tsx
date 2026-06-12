/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Milestone, BookOpen, Clock, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';
import { learningJourneyData } from '../data';

export default function LearningJourney() {
  const [activeStepId, setActiveStepId] = useState<string>('current-cs50p');

  // Group roadmap steps
  const activeMilestones = learningJourneyData.filter(s => s.status === 'in-progress');
  const futureMilestones = learningJourneyData.filter(s => s.status === 'planned');

  // Sub-checklists simulation for interactive roadmap
  const subChecklists: Record<string, string[]> = {
    'current-cs50p': [
      'Master OOP structures (Classes, inheritances, properties)',
      'Construct automated test modules via pytest suite',
      'Execute regex validators and strings transformers',
      'Understand files structures (CSV parsing & binary assets)',
    ],
    'current-dsa': [
      'Formulate time complexity constraints ($O(1)$ to $O(2^N)$)',
      'Code recursion loops & divide-and-conquer methodologies',
      'Build custom Stacks, Double-ended Queues, and Lists',
      'Construct deep Tree Traversals (DFS, BFS, Binary Search Trees)',
    ],
    'current-leetcode': [
      'Maintain an active question streak daily',
      'Formulate analytical hashing models & arrays patterns',
      'Practicing binary queries & standard mathematical algorithms',
      'Refining runtimes and memory allocations per case',
    ],
    'next-drf': [
      'Understand serializers modeling database records',
      'Configure throttle restrictions & page distributions',
      'Secure routes with JWT sessions & token authentications',
      'Establish WebSocket channels for real-time data syncs',
    ],
    'next-postgres': [
      'Define database migration paths from SQLite files',
      'Structure custom tables indices to quicken select lookups',
      'Program trigger functions protecting database operations',
      'Optimize complex joined query planners for analytics',
    ],
    'next-react': [
      'Deconstruct DOM UI templates into reusable Hook elements',
      'Bridge Django backend rest endpoints of data arrays',
      'Control global states securely using Context nodes',
      'Design seamless web page layouts with Framer elements',
    ],
    'next-sysdesign': [
      'Trace distributed microservices messaging structures',
      'Deploy caching configurations using Redis servers',
      'Set load distribution proxies and container instances',
      'Formulate failover databases and clusters structures',
    ],
  };

  const selectedStep = learningJourneyData.find(s => s.id === activeStepId) || learningJourneyData[0];

  return (
    <section id="learning" className="py-24 bg-neutral-905 border-b border-neutral-900 relative">
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[6rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            06 . SCHEDULERS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Learning Journey & Roadmap
          </h2>
          <div className="h-0.5 w-16 bg-blue-600 rounded"></div>
        </div>

        {/* 2 Column Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Roadmap Tracks (Col-5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active section */}
            <div className="space-y-3">
              <h3 className="text-3xs font-mono font-bold text-neutral-500 uppercase tracking-widest px-1 flex items-center gap-1">
                <Clock size={11} className="text-amber-500 animate-spin-slow" />
                Currently Practicing:
              </h3>

              <div className="space-y-2.5">
                {activeMilestones.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      activeStepId === step.id
                        ? 'bg-blue-600/15 border-blue-500/40 text-white'
                        : 'bg-neutral-900/40 border-neutral-850 hover:border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-semibold">{step.title}</h4>
                      <p className="text-3xs font-mono text-blue-400/80 mt-1">{step.timeline}</p>
                    </div>
                    <ChevronRight size={14} className="text-neutral-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>

            {/* Next target section */}
            <div className="space-y-3 pt-4">
              <h3 className="text-3xs font-mono font-bold text-neutral-500 uppercase tracking-widest px-1 flex items-center gap-1">
                <Bookmark size={11} className="text-blue-400" />
                Planned Target Tracks:
              </h3>

              <div className="space-y-2.5">
                {futureMilestones.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStepId(step.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group ${
                      activeStepId === step.id
                        ? 'bg-blue-600/15 border-blue-500/40 text-white'
                        : 'bg-neutral-900/40 border-neutral-850 hover:border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-sm font-semibold">{step.title}</h4>
                      <p className="text-3xs font-mono text-neutral-500 mt-1">{step.timeline}</p>
                    </div>
                    <ChevronRight size={14} className="text-neutral-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Selected Roadmap Parameters (Col-7) */}
          <div className="lg:col-span-7 bg-neutral-900/40 border border-neutral-850 p-6 sm:p-8 rounded-2xl min-h-[440px] flex flex-col justify-between">
            <div className="space-y-6">
              {/* Header Details */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-neutral-850/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Milestone size={18} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white leading-tight">
                      {selectedStep.title}
                    </h4>
                    <span className="font-mono text-3xs text-neutral-500 block mt-0.5 uppercase tracking-wider font-semibold">
                      TIMEFRAME: {selectedStep.timeline}
                    </span>
                  </div>
                </div>

                <span
                  className={`font-mono text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                    selectedStep.status === 'completed'
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                      : selectedStep.status === 'in-progress'
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-500'
                  }`}
                >
                  {selectedStep.status === 'completed'
                    ? 'COMPLETED'
                    : selectedStep.status === 'in-progress'
                    ? 'IN ACTIVE PROGRESS'
                    : 'PLANNED'}
                </span>
              </div>

              {/* Text Narrative */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                  Milestone Narrative:
                </h5>
                <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-sans">
                  {selectedStep.description}
                </p>
              </div>

              {/* Sub-checklists */}
              <div className="space-y-3">
                <h5 className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                  Syllabus Checklist:
                </h5>
                <div className="space-y-2">
                  {(subChecklists[selectedStep.id] || []).map((sub, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-2xs bg-neutral-950/40 border border-neutral-850/30 p-2.5 rounded-xl leading-relaxed text-neutral-400 hover:text-white transition-colors"
                    >
                      <CheckCircle2
                        size={14}
                        className={`mt-0.5 shrink-0 ${selectedStep.status === 'in-progress' ? 'text-amber-500' : 'text-blue-500'}`}
                      />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technologies tags used on this node */}
            <div className="flex flex-wrap gap-1.5 pt-6 border-t border-neutral-850/60 mt-6 md:mt-0">
              {selectedStep.techs.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded border border-neutral-800 bg-neutral-950 text-neutral-400 font-mono text-[9px] font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
