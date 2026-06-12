/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Terminal, Shield, ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';

// Lazy load heavy components below the fold for bundle and loading speedups
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Certifications = lazy(() => import('./components/Certifications'));
const LearningJourney = lazy(() => import('./components/LearningJourney'));
const GithubStats = lazy(() => import('./components/GithubStats'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const ResumeModal = lazy(() => import('./components/ResumeModal'));

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Phase 8: scroll progress & back-to-top button
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Loading animation simulation matching developer aesthetic
  const [loadStep, setLoadStep] = useState(0);
  const loadLogs = [
    'Initializingitesh_kumar_env...',
    'Loading Python compilers & Django modules...',
    'Resolving static components & layout assets...',
    'Constructing analytical grids & contribution maps...',
    'Launching secure server connections...',
    'System ready. Portfolio active.'
  ];

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadStep((prev) => {
        if (prev < loadLogs.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(interval);
  }, [loading]);

  // Phase 8 & 9: Watch window scroll position and auto-initialize analytics
  useEffect(() => {
    if (loading) return;

    // GA init
    import('./utils/analytics').then(({ initAnalytics }) => {
      initAnalytics();
    });

    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress(window.scrollY / windowHeight);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  // Section Observer Tracker
  useEffect(() => {
    if (loading) return;

    const sections = [
      'hero',
      'about',
      'skills',
      'projects',
      'experience',
      'certifications',
      'blog',
      'contact',
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // trigger active tab when section occupies center core
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [loading]);

  const handleScrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
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
    <div className="relative font-sans text-neutral-300 selection:bg-blue-600/35 selection:text-white bg-neutral-950 min-h-screen xl:text-justify overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          /* 1. Terminal Splash loading screen */
          <motion.div
            key="splash-screen"
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-950 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-lg aspect-video rounded-2xl bg-neutral-900 border border-neutral-850 p-6 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden font-mono text-[10px] text-left">
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

              {/* Header indicators */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-850 mb-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-neutral-500 select-none flex items-center gap-1">
                  <Terminal size={11} />
                  rk_bootloader.sh
                </span>
              </div>

              {/* Logs area */}
              <div className="flex-1 space-y-1.5 pt-2">
                {loadLogs.slice(0, loadStep + 1).map((log, idx) => (
                  <div
                    key={idx}
                    className={`${
                      idx === loadStep && idx !== loadLogs.length - 1
                        ? 'text-blue-400 animate-pulse'
                        : idx === loadLogs.length - 1
                        ? 'text-emerald-400 font-bold'
                        : 'text-neutral-500'
                    }`}
                  >
                    <span className="text-neutral-700">❯</span> {log}
                  </div>
                ))}
              </div>

              {/* Loading progress bar indicator */}
              <div className="space-y-1.5 select-none">
                <div className="flex justify-between text-[9px] text-neutral-600 font-bold">
                  <span>COMPILING DATA LAYERS</span>
                  <span>{Math.round(((loadStep + 1) / loadLogs.length) * 100)}%</span>
                </div>
                <div className="w-full h-1 bg-neutral-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-sky-500 shadow-[0_0_10px_rgba(37,99,235,0.4)] transition-all duration-300"
                    style={{ width: `${((loadStep + 1) / loadLogs.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* 2. Main Site content wrapper */
          <motion.div
            key="site-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col min-h-screen text-neutral-300 selection:bg-blue-600/35"
          >
            {/* Phase 8: Scroll progress indicator bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-neutral-950 z-50 pointer-events-none">
              <div
                className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-emerald-400 shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-75"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* Nav Header */}
            <Header activeSection={activeSection} setActiveSection={setActiveSection} />

            {/* Content Sections */}
            <main className="flex-1">
              <Hero
                onScrollToSection={handleScrollToSection}
                onOpenResumeModal={() => setIsResumeOpen(true)}
              />
              <Suspense fallback={
                <div className="py-24 text-center text-xs font-mono text-neutral-500 flex flex-col items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span>Synchronizing section core...</span>
                </div>
              }>
                <About />
                <Skills />
                <Projects />
                <Experience />
                <Certifications />
                <LearningJourney />
                <GithubStats />
                <Blog />
                <Contact />
              </Suspense>
            </main>

            {/* Static Footer */}
            <Footer />

            {/* Back to Top Floating Trigger button */}
            <AnimatePresence>
              {showScrollTop && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 border border-blue-500/20 cursor-pointer flex items-center justify-center transition-transform hover:-translate-y-0.5 active:scale-95"
                  aria-label="Back to top"
                >
                  <ArrowUp size={18} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ATS Resume Modal overlay */}
            <AnimatePresence>
              {isResumeOpen && (
                <Suspense fallback={null}>
                  <ResumeModal onClose={() => setIsResumeOpen(false)} />
                </Suspense>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

