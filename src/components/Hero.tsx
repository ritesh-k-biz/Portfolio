/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, Mail, Terminal, FileText, Code, Shield, HelpCircle, Laptop } from 'lucide-react';
import { personalInfo } from '../data';
import AvatarImage from './AvatarImage';

interface HeroProps {
  onScrollToSection: (id: string) => void;
  onOpenResumeModal: () => void;
}

export default function Hero({ onScrollToSection, onOpenResumeModal }: HeroProps) {
  // Mini tech icons for floating effect
  const floatingTechs = [
    { name: 'Python', color: 'from-blue-500 to-yellow-500', initialX: -100, initialY: -110 },
    { name: 'Django', color: 'from-emerald-600 to-teal-500', initialX: 180, initialY: -140 },
    { name: 'SQLite', color: 'from-sky-500 to-blue-400', initialX: -160, initialY: 100 },
    { name: 'Git', color: 'from-orange-500 to-red-500', initialX: 140, initialY: 120 },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-radial from-neutral-900 to-neutral-950"
    >
      {/* Background Tech Theme Layout */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0b0f19_1px,transparent_1px),linear-gradient(to_bottom,#0b0f19_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70"></div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-blue-600/10 rounded-full blur-[8rem] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[7rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Copy (Col-7) */}
          <div className="lg:col-span-7 flex flex-col text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-mono mb-6 w-fit select-none"
            >
              <SparklesIcon />
              SYSTEM PORTFOLIO ACTIVE v4.0.0
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.1]"
            >
              Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">{personalInfo.name}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-300 font-mono mb-6"
            >
              {personalInfo.headline}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
            >
              Building software, solving algorithms, and continuously learning computer science. Dedicated to creating high-fidelity Python systems, backend databases, and user-centered web tools.
            </motion.p>

            {/* Quick CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 items-center"
            >
              <button
                onClick={() => onScrollToSection('projects')}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-900/30 font-semibold cursor-pointer"
              >
                View Projects
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </button>

              <button
                onClick={() => onScrollToSection('contact')}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-850 hover:text-white text-neutral-300 border border-neutral-800 hover:border-neutral-700 font-medium text-sm transition-all duration-200 cursor-pointer"
              >
                <Mail size={16} className="text-neutral-500 group-hover:text-white transition-colors" />
                Contact Me
              </button>

              <button
                onClick={onOpenResumeModal}
                className="group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-none hover:bg-neutral-905 text-blue-400 hover:text-blue-300 font-medium text-sm transition-all duration-250 cursor-pointer border border-dashed border-blue-500/20 hover:border-blue-400/45"
              >
                <FileText size={16} />
                Interactive Resume
              </button>
            </motion.div>
          </div>

          {/* Interactive Visual Dashboard (Col-5) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Absolute floating stack pieces */}
            {floatingTechs.map((tech, idx) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: tech.initialX, y: tech.initialY }}
                animate={{
                  opacity: 1,
                  y: [tech.initialY, tech.initialY - 12, tech.initialY],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.2 + idx * 0.1 },
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: idx * 0.5,
                  },
                }}
                className="absolute z-20 pointer-events-none select-none hidden sm:block"
              >
                <div className={`px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950/90 text-xs font-mono text-neutral-300 shadow-2xl flex items-center gap-1.5`}>
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${tech.color}`}></div>
                  {tech.name}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[380px] aspect-square rounded-3xl bg-neutral-900/40 border border-neutral-800 backdrop-blur-md p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group"
            >
              {/* Scanline card glow effect */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[pulse_3s_infinite] opacity-50"></div>

              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800/85 mb-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-[10px] font-mono text-neutral-500 select-none flex items-center gap-1">
                  <Terminal size={10} />
                  ritesh_compiler.py
                </div>
              </div>

              {/* Terminal Code Simulator or Avatar Graphic */}
              <div className="space-y-3 font-mono text-xs text-left h-full flex flex-col justify-between">
                <div>
                  <span className="text-pink-400">class</span> <span className="text-blue-300">SoftwareEngineer</span>:
                  <div className="pl-4 text-neutral-400">
                    <span className="text-pink-400">def</span> <span className="text-yellow-300">__init__</span>(self):
                    <div className="pl-4">
                      self.name = <span className="text-emerald-400">"Ritesh Kumar"</span><br />
                      self.role = <span className="text-emerald-400">"Backend Enthusiast"</span><br />
                      self.origin = <span className="text-emerald-400">"Uttar Pradesh, IN"</span><br />
                      self.graduating = <span className="text-cyan-400">2026</span>
                    </div>
                  </div>
                  <div className="pl-4 text-neutral-400 mt-2">
                    <span className="text-pink-400">def</span> <span className="text-yellow-300">get_powers</span>(self):
                    <div className="pl-4">
                      <span className="text-pink-400">return</span> [
                      <span className="text-emerald-400">"Django"</span>, 
                      <span className="text-emerald-400">"Python"</span>,
                      <span className="text-emerald-400">"SQL"</span>
                      ]
                    </div>
                  </div>
                </div>

                {/* Simulated Interactive Avatar Screen */}
                <div className="pt-2 border-t border-neutral-800/60 mt-2">
                   <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl border border-blue-500/30 overflow-hidden flex items-center justify-center group-hover:border-blue-500 transition-all shadow-inner shrink-0">
                      <AvatarImage
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-[11px] text-white font-sans font-semibold">Compiler Output:</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">
                        <span className="animate-pulse">❯</span> running tests...
                      </div>
                      <div className="text-[9px] text-neutral-400 flex items-center gap-2 mt-0.5 select-none">
                        <span>Lints: OK</span>
                        <span>Coverage: 98%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Controls */}
                <div className="bg-neutral-950/60 rounded-xl p-2.5 border border-neutral-850 flex items-center justify-between text-[11px] font-sans mt-2">
                  <div className="flex items-center gap-1.5 text-neutral-300">
                    <Laptop size={12} className="text-blue-400" />
                    <span>Intern Status:</span>
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    Graduated
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SparklesIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-3.5 h-3.5 transition-transform group-hover:rotate-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 21l-.813-5.096L3 15l5.187-.813L9 9l.813 5.187L15 15l-5.187.813ZM18 10.5l-.75-2.25L15 7.5l2.25-.75L18 4.5l.75 2.25L21 7.5l-2.25.75-.75 2.25Z"
      />
    </svg>
  );
}
