/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { Github, FolderGit2, Flame, Award, Cpu, Eye, ExternalLink, Calendar } from 'lucide-react';

export default function GithubStats() {
  const [hoveredSquare, setHoveredSquare] = useState<string | null>(null);

  // Simulated Commit Contributions Grids (for a mini contribution grid representation: 15 weeks * 7 days)
  const totalWeeks = 24;
  const days = 7;
  const dates = [
    'Aug 12', 'Aug 24', 'Sep 02', 'Sep 15', 'Oct 04', 'Oct 14', 'Nov 02', 'Nov 18', 'Dec 05', 'Dec 18',
    'Jan 02', 'Jan 16', 'Feb 05', 'Feb 20', 'Mar 08', 'Mar 18', 'Apr 02', 'Apr 18', 'May 02', 'May 16'
  ];

  // Helper to generate a reliable matrix
  const matrix: { count: number; date: string; shade: string }[][] = [];
  for (let w = 0; w < totalWeeks; w++) {
    const weekData = [];
    for (let d = 0; d < days; d++) {
      const idx = (w * days + d) % dates.length;
      const count = (w % 3 === 0 && d % 2 === 0) ? Math.floor(Math.random() * 8) + 1 : 0;
      const shade = count === 0
        ? 'bg-neutral-900 border-neutral-950/20'
        : count < 3
        ? 'bg-emerald-900/40 border-emerald-900/10'
        : count < 6
        ? 'bg-emerald-700/60 border-emerald-700/20'
        : 'bg-emerald-500/90 border-emerald-500/30 shadow-[0_0_8px_rgba(16,185,129,0.2)]';

      weekData.push({
        count,
        date: `${dates[idx]}, 2025`,
        shade,
      });
    }
    matrix.push(weekData);
  }

  // Language shares
  const languages = [
    { name: 'Python', share: 65, color: 'bg-blue-500', glow: 'shadow-blue-500/30' },
    { name: 'HTML5 & CSS3', share: 18, color: 'bg-orange-500', glow: 'shadow-orange-500/30' },
    { name: 'SQLite / SQL', share: 15, color: 'bg-sky-400', glow: 'shadow-sky-400/30' },
    { name: 'JavaScript', share: 2, color: 'bg-yellow-400', glow: 'shadow-yellow-400/30' },
  ];

  return (
    <section id="github-stats" className="py-24 bg-neutral-900/15 border-b border-neutral-900 relative">
      <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[6rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            07 . INTEGRATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Developer Statistics
          </h2>
          <div className="h-0.5 w-16 bg-blue-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Contribution Box & Stats (Col-8) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Heatmap Card */}
            <div className="bg-neutral-900/40 border border-neutral-850 p-6 sm:p-8 rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-neutral-850 mb-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-950 flex items-center justify-center border border-neutral-800 text-neutral-400">
                    <Github size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">
                      GitHub Activity Heatmap
                    </h3>
                    <p className="text-[10px] text-neutral-500 font-mono">
                      git@github.com:riteshk-bizz/activity (Simulated)
                    </p>
                  </div>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-left">
                    <div className="text-neutral-500 text-[10px]">TOTAL COMMITS</div>
                    <div className="text-white font-bold leading-tight">342 commits</div>
                  </div>
                  <div className="h-6 w-[1px] bg-neutral-800"></div>
                  <div className="text-left">
                    <div className="text-neutral-500 text-[10px]">DAILY STREAK</div>
                    <div className="text-emerald-400 font-bold leading-tight flex items-center gap-1">
                      <Flame size={12} className="fill-emerald-500/20" />
                      14 days
                    </div>
                  </div>
                </div>
              </div>

              {/* Heatmap Grid Wrapper */}
              <div className="overflow-x-auto pb-2 scrollbar-none">
                <div className="flex gap-1.5 min-w-[560px]">
                  {matrix.map((week, wIdx) => (
                    <div key={wIdx} className="flex flex-col gap-1.5">
                      {week.map((day, dIdx) => (
                        <div
                          key={dIdx}
                          onMouseEnter={() => setHoveredSquare(`${wIdx}-${dIdx}`)}
                          onMouseLeave={() => setHoveredSquare(null)}
                          className={`w-[13px] h-[13px] rounded-sm cursor-pointer transition-all ${day.shade} relative`}
                        >
                          {/* Rich interactive Tooltip */}
                          {hoveredSquare === `${wIdx}-${dIdx}` && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-neutral-950 border border-neutral-800 text-neutral-300 px-2.5 py-1.5 rounded-lg text-4xs font-mono w-28 text-center leading-normal shadow-[0_5px_15px_rgba(0,0,0,0.6)] select-none">
                              <span className="font-semibold text-white block mb-0.5">{day.count} commits</span>
                              <span className="text-neutral-500 text-[9px]">{day.date}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid Legend */}
              <div className="flex justify-between items-center text-4xs font-mono text-neutral-500 mt-4 px-1 select-none">
                <span>Aug 24, 2025</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-sm bg-neutral-900 border border-neutral-950/20"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-900/40 border-emerald-900/10"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-700/60 border-emerald-700/20"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/90 border-emerald-500/30"></div>
                  <span>More</span>
                </div>
                <span>May 16, 2026</span>
              </div>
            </div>

            {/* Git repositories list simulation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-neutral-900/40 border border-neutral-850 p-5 rounded-2xl flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider font-semibold">Active Repos</div>
                  <div className="text-xl font-bold text-white font-mono">8</div>
                </div>
                <FolderGit2 className="text-blue-500/30" size={24} />
              </div>

              <div className="bg-neutral-900/40 border border-neutral-850 p-5 rounded-2xl flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider font-semibold">PRs Accepted</div>
                  <div className="text-xl font-bold text-white font-mono">14</div>
                </div>
                <Eye className="text-blue-500/30" size={24} />
              </div>

              <div className="bg-neutral-900/40 border border-neutral-850 p-5 rounded-2xl flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider font-semibold">Avg. Accuracy</div>
                  <div className="text-xl font-bold text-white font-mono">98.4%</div>
                </div>
                <Cpu className="text-blue-500/30" size={24} />
              </div>
            </div>
          </div>

          {/* Languages Share & LeetCode (Col-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Lang Share Card */}
            <div className="bg-neutral-900/40 border border-neutral-850 p-6 rounded-2xl">
              <h3 className="font-bold text-white text-sm pb-4 border-b border-neutral-850 mb-5 flex items-center gap-2">
                <Cpu size={15} className="text-blue-400" />
                Most Used Languages
              </h3>

              <div className="space-y-4">
                {languages.map((lang) => (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-3xs font-mono">
                      <span className="text-neutral-300 font-semibold">{lang.name}</span>
                      <span className="text-neutral-400">{lang.share}%</span>
                    </div>

                    {/* Progress track */}
                    <div className="w-full h-1.5 rounded-full bg-neutral-950 overflow-hidden">
                      <div className={`h-full rounded-full ${lang.color} ${lang.glow}`} style={{ width: `${lang.share}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* LeetCode stats indicator */}
            <div className="bg-neutral-900/40 border border-neutral-850 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 font-mono text-[9px] text-amber-500/30 font-semibold">
                LEETCODE.COM
              </div>

              <h3 className="font-bold text-white text-sm pb-4 border-b border-neutral-850 mb-5 flex items-center gap-2">
                <Award size={15} className="text-amber-500 animate-pulse" />
                LeetCode Profile
              </h3>

              <div className="flex items-center justify-between gap-4 font-mono">
                <div className="text-left space-y-3">
                  <div>
                    <div className="text-neutral-500 text-4xs uppercase tracking-wider font-bold">Solved Problems</div>
                    <div className="text-white text-2xl font-black leading-none mt-1">142</div>
                    <span className="text-[10px] text-amber-400 mt-0.5 block font-semibold">Top 15% Rank</span>
                  </div>

                  {/* Solved details */}
                  <div className="space-y-1.5 text-3xs">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span className="text-neutral-400 font-semibold">Easy:</span>
                      <span className="text-white font-bold">82</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                      <span className="text-neutral-400 font-semibold">Medium:</span>
                      <span className="text-white font-bold">52</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      <span className="text-neutral-400 font-semibold">Hard:</span>
                      <span className="text-white font-bold">8</span>
                    </div>
                  </div>
                </div>

                {/* Donut progress visual placeholder */}
                <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="38" stroke="#171717" strokeWidth="8" fill="transparent" />
                    <circle
                      cx="48"
                      cy="48"
                      r="38"
                      stroke="#f59e0b"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="238"
                      strokeDashoffset="100"
                      className="shadow-glow"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-white text-xs font-bold leading-none font-sans">142</span>
                    <span className="text-neutral-500 text-[8px] tracking-wide mt-0.5">PROBLEMS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
