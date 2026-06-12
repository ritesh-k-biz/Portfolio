/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flame, BrainCircuit, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleArrowTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12 relative z-10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Logo & Slogan */}
          <div className="text-left space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-sans font-extrabold text-white text-xs">
                RK
              </div>
              <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
                RITESH KUMAR
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-normal max-w-sm">
              Built with passion for software engineering. Fully optimized backend and client layers. UP, India.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-6 text-[10px] text-neutral-600 font-mono">
            <div className="flex items-center gap-1">
              <Flame size={12} className="text-amber-500" />
              <span>STABLE RELEASE</span>
            </div>
            <div className="flex items-center gap-1">
              <BrainCircuit size={12} className="text-blue-500" />
              <span>CS MASTER STRUCT</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>COMPILER PASS</span>
            </div>
          </div>

          {/* Copyright & ToTop */}
          <div className="text-left md:text-right space-y-1.5">
            <div className="text-xs text-neutral-400">
              &copy; {currentYear} Ritesh Kumar. All rights reserved.
            </div>
            <button
              onClick={handleArrowTop}
              className="text-[10px] text-blue-400 hover:text-blue-300 font-mono uppercase tracking-wider font-semibold cursor-pointer"
            >
              ❯ SCROLL TO TOP [HOME]
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
