/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, ExternalLink, Calendar, X, Sparkles, QrCode } from 'lucide-react';
import { certificationsData } from '../data';
import { Certification } from '../types';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Styling helper for badges
  const badgeStyles: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    python: {
      bg: 'bg-blue-500/5',
      text: 'text-blue-400',
      border: 'border-blue-500/20',
      glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]',
    },
    analytics: {
      bg: 'bg-violet-500/5',
      text: 'text-violet-400',
      border: 'border-violet-500/20',
      glow: 'shadow-[0_0_15px_rgba(139,92,246,0.15)]',
    },
    consulting: {
      bg: 'bg-emerald-500/5',
      text: 'text-emerald-400',
      border: 'border-emerald-500/20',
      glow: 'shadow-[0_0_15px_rgba(16,185,129,0.15)]',
    },
    cs50: {
      bg: 'bg-red-500/5',
      text: 'text-red-400',
      border: 'border-red-500/20',
      glow: 'shadow-[0_0_15px_rgba(239,68,68,0.15)]',
    },
  };

  return (
    <section id="certifications" className="py-24 bg-neutral-950 border-b border-neutral-900 relative">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-[7rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            05 . VERIFICATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Industrial Certifications
          </h2>
          <div className="h-0.5 w-16 bg-blue-600 rounded"></div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificationsData.map((cert) => {
            const style = badgeStyles[cert.badgeType] || badgeStyles.python;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => setSelectedCert(cert)}
                className={`group bg-neutral-900/40 hover:bg-neutral-900/60 border border-neutral-850 hover:border-neutral-800 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer h-72 text-left relative overflow-hidden ${style.glow}`}
              >
                {/* Top background accent on group hover */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-600/5 group-hover:bg-blue-600/10 rounded-full blur-[2rem] transition-all"></div>

                <div className="space-y-4 relative z-10">
                  {/* Category badge */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${style.bg} ${style.border} ${style.text}`}>
                    <Award size={20} className="group-hover:animate-[spin_4s_infinite]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-all line-clamp-3 leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-neutral-500 text-3xs font-mono uppercase tracking-wider mt-1.5 font-semibold">
                      ISSUED BY: {cert.issuer}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 relative z-10 border-t border-neutral-850 pt-4 mt-4">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      {cert.date}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCert(cert);
                    }}
                    className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 rounded-xl text-3xs font-mono tracking-widest uppercase transition-all flex items-center justify-center gap-1.5 font-bold cursor-pointer"
                  >
                    <ShieldCheck size={12} className="text-emerald-500 animate-pulse" />
                    Verify Credential
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Verification Certificate Modal Overlay */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-neutral-950/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative text-left"
            >
              {/* Scanline line background */}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full border border-neutral-800 bg-neutral-950 text-neutral-500 font-mono text-3xs uppercase tracking-widest z-10 select-none">
                AUTHENTIC NODE ID: OK
              </div>

              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-neutral-850 hover:border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={15} />
              </button>

              {/* Certificate Inner Frame */}
              <div className="border border-neutral-800 rounded-xl p-5 sm:p-8 bg-neutral-950 flex flex-col space-y-6 relative overflow-hidden select-none">
                {/* Visual badge backdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/[0.015] rounded-full blur-[4rem] pointer-events-none"></div>

                {/* Certificate layout */}
                <div className="text-center space-y-1 text-neutral-400">
                  <div className="font-mono text-4xs uppercase tracking-widest font-extrabold text-blue-500">
                    Industrial Training Certification Node
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-widest font-mono uppercase">
                    Certificate of Accomplishment
                  </h4>
                </div>

                <div className="text-center py-4 border-y border-neutral-850 space-y-3">
                  <div className="text-3xs text-neutral-500 uppercase tracking-wider">
                    THIS ACCREDITATION GRANTS CONFIRMATION TO
                  </div>
                  <h5 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                    Ritesh Kumar
                  </h5>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                    Successfully finished all required courses, lab milestones, and evaluations for:
                  </p>
                  <p className="text-xs font-semibold text-white mt-1 max-w-sm mx-auto">
                    {selectedCert.title}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2 font-mono text-3xs">
                  {/* Left: signature simulation */}
                  <div className="space-y-1 text-center sm:text-left">
                    <div className="font-serif italic text-neutral-300 text-[13px] tracking-wide">
                      {selectedCert.issuer.includes('Softpro') ? 'Director RK Singh' : 'Forage verification panel'}
                    </div>
                    <div className="h-[1px] w-28 bg-neutral-800 hover:bg-neutral-700"></div>
                    <div className="text-neutral-500">{selectedCert.issuer} Authority</div>
                  </div>

                  {/* Center: QR Code / ID */}
                  <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-850 p-2.5 rounded-lg">
                    <QrCode size={32} className="text-neutral-400" />
                    <div className="text-left leading-tight">
                      <div className="text-neutral-500 uppercase text-[8px] tracking-widest font-bold">Credential ID</div>
                      <div className="text-neutral-300 font-bold">{selectedCert.credentialId || 'N/A'}</div>
                      <div className="text-[8px] text-emerald-400 font-semibold mt-0.5">STATUS: SECURED ✓</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-2 text-neutral-400 hover:text-white text-xs font-semibold hover:bg-neutral-905 rounded-xl cursor-pointer"
                >
                  Close Accreditation
                </button>
                {selectedCert.verificationUrl && selectedCert.verificationUrl !== '#' && (
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow shadow-blue-900/10 cursor-pointer"
                  >
                    Official Verification Page
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
