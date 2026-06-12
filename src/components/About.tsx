/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, MapPin, Milestone, ArrowRight } from 'lucide-react';
import { personalInfo, educationData } from '../data';
import AvatarImage from './AvatarImage';

export default function About() {
  const [activeStep, setActiveStep] = useState<number>(2);

  // Career Roadmap Stages
  const steps = [
    {
      year: '2021',
      title: 'High School Matriculation',
      desc: 'Completed secondary certification at Dujana Public Inter College, setting logical and scientific benchmarks.',
    },
    {
      year: '2023',
      title: 'Intermediate (PCM)',
      desc: 'Finished collegiate math and science at SRS Inter College, establishing analytical problem-solving skills.',
    },
    {
      year: '2025',
      title: 'Django Mastery & Internship',
      desc: 'Completed 2-month professional training at Softpro, engineering custom databases and learning CRUD architectures.',
    },
    {
      year: '2026',
      title: 'CS Graduate & Job seeker',
      desc: 'Completing IT Diploma, practicing CS50 Python, and targeting internship & junior software engineering placements.',
    },
  ];

  return (
    <section id="about" className="py-24 relative bg-neutral-950 border-b border-neutral-900 overflow-hidden">
      <div className="absolute top-1/2 left-1/3 w-[25rem] h-[25rem] bg-indigo-500/5 rounded-full blur-[7rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            01 . BACKGROUND
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            About Me & Education
          </h2>
          <div className="h-0.5 w-16 bg-blue-600 rounded"></div>
        </div>

        {/* 2 Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Biography & Roadmap (Col-7) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-neutral-900/40 border border-neutral-850 p-6 sm:p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-xs text-neutral-600 select-none">
                bio_instance.md
              </div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-blue-500/30 overflow-hidden shrink-0 shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                  <AvatarImage
                    className="w-full h-full object-cover"
                  />
                </div>
                My Story
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                {personalInfo.shortBio}
              </p>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                {personalInfo.detailedBio}
              </p>

              {/* Core Attributes Panel */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6 pt-6 border-t border-neutral-800">
                <div className="text-left">
                  <div className="text-lg font-bold text-blue-400 font-mono">100%</div>
                  <div className="text-xs text-neutral-500">Python Centric</div>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-blue-400 font-mono">CS50P</div>
                  <div className="text-xs text-neutral-500">Active Pursuit</div>
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-blue-400 font-mono">Lucknow</div>
                  <div className="text-xs text-neutral-500">Intern Trained</div>
                </div>
              </div>
            </div>

            {/* Interactive Career Roadmap */}
            <div className="bg-neutral-900/40 border border-neutral-850 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Milestone size={18} className="text-blue-400" />
                Engineering Roadmap
              </h3>

              <div className="space-y-4">
                {steps.map((step, idx) => {
                  const isCompleted = idx <= activeStep;
                  return (
                    <div
                      key={step.title}
                      onClick={() => setActiveStep(idx)}
                      className={`group p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                        activeStep === idx
                          ? 'bg-blue-955/35 border-blue-500/40 shadow-md shadow-blue-950/20'
                          : 'bg-neutral-950/50 border-neutral-850 hover:border-neutral-800'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Interactive bullet */}
                        <div className="mt-1">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-3xs font-extrabold ${
                              activeStep === idx
                                ? 'bg-blue-600 text-white shadow-[0_0_8px_rgba(37,99,235,0.5)]'
                                : isCompleted
                                ? 'bg-neutral-800 text-neutral-300'
                                : 'bg-neutral-900 text-neutral-600 border border-neutral-800'
                            }`}
                          >
                            {idx + 1}
                          </div>
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between gap-2">
                            <h4
                              className={`text-sm font-semibold transition-colors ${
                                activeStep === idx ? 'text-white' : 'text-neutral-300'
                              }`}
                            >
                              {step.title}
                            </h4>
                            <span className="font-mono text-xs text-blue-400 font-medium">
                              {step.year}
                            </span>
                          </div>
                          <p
                            className={`text-xs mt-1 leading-relaxed transition-colors ${
                              activeStep === idx ? 'text-neutral-300' : 'text-neutral-500'
                            }`}
                          >
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Education Timeline & Profile (Col-5) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Developer Identity Card */}
            <div className="bg-neutral-900/40 border border-neutral-850 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 font-mono text-[10px] text-neutral-600 select-none">
                id_sec_01.crt
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Photo frame */}
                <div className="relative w-28 h-28 rounded-xl border border-blue-500/30 overflow-hidden shrink-0 shadow-[0_0_20px_rgba(37,99,235,0.15)] group-hover:border-blue-500/50 transition-all duration-300">
                  <AvatarImage
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse border border-neutral-950"></div>
                </div>

                {/* Identity Info */}
                <div className="text-left space-y-2">
                  <div className="text-xs uppercase font-mono text-blue-400 tracking-wider">Candidate Profile</div>
                  <h4 className="text-xl font-bold text-white tracking-tight">Ritesh Kumar</h4>
                  <p className="text-xs text-neutral-400 font-mono">Information Technology Specialist</p>
                  
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <MapPin size={12} className="text-blue-500/70" />
                    <span>Uttar Pradesh, India</span>
                  </div>
                </div>
              </div>

              {/* Status footer inside the card */}
              <div className="mt-4 pt-4 border-t border-neutral-800/60 flex flex-wrap justify-between items-center gap-3 text-2xs font-mono text-neutral-500">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Active Portfolio Seeker
                </span>
                <span>ID: RK-2026-IT</span>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 text-left px-1">
                <GraduationCap size={18} className="text-blue-400" />
                Academic History
              </h3>

              <div className="relative pl-6 border-l border-neutral-850 space-y-8 text-left">
              {educationData.map((edu, index) => (
                <div key={edu.id} className="relative group">
                  {/* Outer Dot */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-neutral-950 border-2 border-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                  </div>

                  <span className="font-mono text-2xs text-neutral-500 block mb-1">
                    {edu.duration}
                  </span>

                  <div className="bg-neutral-900/30 hover:bg-neutral-900/50 border border-neutral-850 hover:border-neutral-800 p-5 rounded-xl transition-all duration-200">
                    <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {edu.degree}
                    </h4>
                    <span className="text-xs text-neutral-400 mt-1 block">
                      {edu.institution}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10px] text-neutral-500 font-mono mt-2 bg-neutral-950/60 px-2 py-0.5 rounded border border-neutral-850">
                      <MapPin size={10} />
                      {edu.location}
                    </span>

                    {edu.details && (
                      <p className="text-neutral-400 text-xs mt-3 leading-relaxed border-t border-neutral-850/60 pt-3">
                        {edu.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
