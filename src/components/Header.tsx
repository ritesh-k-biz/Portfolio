/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Linkedin, Github, Mail, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '../data';
import AvatarImage from './AvatarImage';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Header({ activeSection, setActiveSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-850 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="group flex items-center gap-2.5 text-lg font-mono font-bold tracking-tight text-white cursor-pointer"
            >
              <div className="relative w-9 h-9 rounded-lg border border-blue-500/30 overflow-hidden flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300 group-hover:scale-105 group-hover:border-blue-400 shrink-0">
                <AvatarImage
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-sans text-sm tracking-wide text-neutral-100 group-hover:text-blue-400 transition-colors">
                  Ritesh Kumar
                </span>
                <span className="text-[10px] text-neutral-400 font-normal">
                  Software Engineer
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-blue-600/95 rounded-full -z-10 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action Widgets */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:border-blue-500 hover:shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin size={14} />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-neutral-800 bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:border-blue-500 hover:shadow-[0_0_10px_rgba(37,99,235,0.2)] transition-all"
                title="GitHub Profile"
              >
                <Github size={14} />
              </a>
            </div>

            {/* Glowing Available For Work Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[11px] font-mono select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AVAILABLE FOR HIRE
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[9px] font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              ACTIVE
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-neutral-800 bg-neutral-950/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)] font-semibold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-neutral-900 flex items-center justify-between px-4">
                <div className="flex gap-4">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <Mail size={18} />
                  </a>
                </div>
                <div className="text-xs text-neutral-500 font-mono">
                  {personalInfo.email}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
