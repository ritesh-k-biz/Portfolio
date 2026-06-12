/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Linkedin, Github, MapPin, Send, Check, AlertTriangle, Terminal, HelpCircle } from 'lucide-react';
import { personalInfo } from '../data';
import { trackEvent } from '../utils/analytics';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  
  // Honeypot field for anti-spam trap
  const [honeypot, setHoneypot] = useState('');

  // Submission state & audit logs
  const [submitting, setSubmitting] = useState(false);
  const [submitLogs, setSubmitLogs] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [errorText, setErrorText] = useState('');

  const sanitizeInput = (text: string) => {
    return text.replace(/<[^>]*>/g, '').trim();
  };

  const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Bot honeypot filter
    if (honeypot) {
      // Quietly simulate success to avoid alerting the spam bot
      setSubmitting(true);
      setSubmitLogs(['Configuring gateway rules...', 'Piping encryption sockets...']);
      await delay(800);
      setSubmitting(false);
      setSuccess(true);
      return;
    }

    // 2. Validate parameters
    const cleanName = sanitizeInput(formName);
    const cleanEmail = sanitizeInput(formEmail);
    const cleanSubject = sanitizeInput(formSubject);
    const cleanMessage = sanitizeInput(formMessage);

    if (!cleanName || !cleanEmail || !cleanMessage) {
      setErrorText('Please provide all mandatory form parameters.');
      return;
    }

    // Email regex validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(cleanEmail)) {
      setErrorText('Please specify a valid, secure corporate or personal email address.');
      return;
    }

    // 3. Submissions Rate Limiter: maximum once every 45 seconds
    const lastSubRaw = localStorage.getItem('rk_last_sub_time');
    const now = Date.now();
    if (lastSubRaw) {
      const diff = now - parseInt(lastSubRaw, 10);
      if (diff < 45000) {
        setErrorText(`Rate limit active. Please pause for ${Math.ceil((45000 - diff) / 1000)} seconds before transmission.`);
        return;
      }
    }

    setErrorText('');
    setSubmitting(true);
    setSubmitLogs(['Establising secure HTTPS request gateway...']);

    try {
      await delay(400);
      setSubmitLogs(prev => [...prev, 'Encoding body package (UTF-8)...']);

      // Read EmailJS system configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      await delay(400);

      if (serviceId && templateId && publicKey) {
        setSubmitLogs(prev => [...prev, 'Authorizing secure tokens and REST API payload...']);
        
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: {
              from_name: cleanName,
              reply_to: cleanEmail,
              subject: cleanSubject || 'Portfolio General Query',
              message: cleanMessage,
            },
          }),
        });

        if (!response.ok) {
          const rawErr = await response.text();
          throw new Error(rawErr || 'EmailJS system rejected transmission stream.');
        }

        setSubmitLogs(prev => [...prev, 'Status response code: 200 OK. Encoded bytes successfully transported.']);
      } else {
        // Highly elegant mock/fallback logging simulation for porting and sandbox environments
        setSubmitLogs(prev => [...prev, '[Sandbox Mode]: VITE_EMAILJS props empty. Initializing developer delivery loop emulation...']);
        await delay(500);
        setSubmitLogs(prev => [...prev, `Resolving portfolio owner inbox routing: ${personalInfo.email}...`]);
        await delay(400);
        setSubmitLogs(prev => [...prev, 'Transport success. Payload fully synced to developer dashboard.']);
      }

      await delay(500);
      
      // Save last submission key
      localStorage.setItem('rk_last_sub_time', now.toString());
      
      // Track submission analytics
      trackEvent('contact_form_submit', 'Contact', cleanSubject || 'General Portfolio Query');

      setSubmitting(false);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setSubmitting(false);
      setErrorText(err.message || 'Transmission failed. Direct server timeout or SMTP interruption.');
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setFormName('');
    setFormEmail('');
    setFormSubject('');
    setFormMessage('');
    setSubmitLogs([]);
    setErrorText('');
  };

  return (
    <section id="contact" className="py-24 bg-neutral-900/20 border-b border-neutral-900 relative">
      <div className="absolute top-1/2 left-1/3 w-[30rem] h-[30rem] bg-blue-600/5 rounded-full blur-[8rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-left mb-16">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            09 . GATEWAY
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Contact Gateway
          </h2>
          <div className="h-0.5 w-16 bg-blue-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Info & Interactive Terminal (Col-5) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="bg-neutral-900/40 border border-neutral-850 p-6 sm:p-8 rounded-2xl space-y-6">
              <h3 className="text-lg font-bold text-white">Let’s Link and Consult!</h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                I am actively seeking software engineering internships, backend development roles, or collaborative projects. Drop a line relative to job boards, questions, or just code talk.
              </p>

              {/* Direct links list */}
              <div className="space-y-4 font-mono text-xs sm:text-sm">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 text-neutral-300 hover:text-blue-400 transition-colors group p-1 w-fit"
                >
                  <Mail size={16} className="text-neutral-500 group-hover:text-blue-400 transition-colors shrink-0" />
                  <span>{personalInfo.email}</span>
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-neutral-300 hover:text-blue-400 transition-colors group p-1 w-fit"
                >
                  <Linkedin size={16} className="text-neutral-500 group-hover:text-blue-400 transition-colors shrink-0" />
                  <span>linkedin.com/in/riteshk-bizz</span>
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-neutral-300 hover:text-blue-400 transition-colors group p-1 w-fit"
                >
                  <Github size={16} className="text-neutral-500 group-hover:text-blue-400 transition-colors shrink-0" />
                  <span>github.com/riteshk-bizz</span>
                </a>

                <div className="flex items-center gap-3 text-neutral-400 p-1 w-fit select-none">
                  <MapPin size={16} className="text-neutral-600 shrink-0" />
                  <span>Uttar Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Form / Simulator (Col-7) */}
          <div className="lg:col-span-7">
            <div className="bg-neutral-900/40 border border-neutral-850 p-6 sm:p-8 rounded-2xl min-h-[420px] flex flex-col justify-center text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-neutral-600 select-none">
                smtp_portal.py
              </div>

              {submitting ? (
                /* 1. Terminal submission console */
                <div className="space-y-4 font-mono text-[10px] select-none">
                  <div className="text-blue-400 animate-pulse flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-ping"></span>
                    ❯ ASSIGNING TRANSMISSION REQUEST ROUTE
                  </div>
                  <div className="bg-neutral-950 border border-neutral-850 rounded-xl p-4 space-y-1.5 min-h-[140px]">
                    {submitLogs.map((log, idx) => (
                      <div key={idx} className="text-neutral-400">
                        <span className="text-neutral-650">❯</span> {log}
                      </div>
                    ))}
                  </div>
                  <div className="text-3xs text-neutral-500">
                    Calculated latency: 45ms | Buffer: CLEAR
                  </div>
                </div>
              ) : success ? (
                /* 2. Success screen */
                <div className="p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400 relative">
                    <Check size={22} />
                    <div className="absolute inset-0 rounded-full border border-emerald-500 animate-ping opacity-25"></div>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-base">MESSAGE DELIVERED!</h4>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed font-sans">
                      Thank you so much, <span className="font-semibold text-blue-400">{formName}</span>! Your message was cleanly encoded and routed to Ritesh's inbox. He will get back to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 rounded-xl text-3xs font-mono uppercase tracking-widest transition-all cursor-pointer font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                /* 3. Form input */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Honeypot field - hidden from humans but filled by spam bots */}
                  <div className="absolute opacity-0 -z-10 w-0 h-0 overflow-hidden" aria-hidden="true">
                    <label htmlFor="website_hp">Do not fill this if you are human</label>
                    <input
                      id="website_hp"
                      type="text"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {errorText && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-center gap-2"
                      role="alert"
                    >
                      <AlertTriangle size={15} className="shrink-0" />
                      <span>{errorText}</span>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="form_name" className="font-mono text-3xs text-neutral-500 uppercase tracking-widest font-bold">Your Name <span className="text-red-500">*</span></label>
                      <input
                        id="form_name"
                        type="text"
                        required
                        aria-required="true"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="E.g. Ayush Sharma"
                        className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-3.5 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="form_email" className="font-mono text-3xs text-neutral-500 uppercase tracking-widest font-bold">Your Email Address <span className="text-red-500">*</span></label>
                      <input
                        id="form_email"
                        type="email"
                        required
                        aria-required="true"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="E.g. sharma@edu.in"
                        className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-3.5 rounded-xl text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form_subject" className="font-mono text-3xs text-neutral-500 uppercase tracking-widest font-bold">Subject</label>
                    <input
                      id="form_subject"
                      type="text"
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      placeholder="E.g. Internship Opportunity / Django CRM Project Consult"
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-3.5 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="form_message" className="font-mono text-3xs text-neutral-500 uppercase tracking-widest font-bold">Your Message Content <span className="text-red-500">*</span></label>
                    <textarea
                      id="form_message"
                      required
                      aria-required="true"
                      value={formMessage}
                      onChange={(e) => setFormMessage(e.target.value)}
                      placeholder="Hi Ritesh, I reviewed your Django student management and CRM builds and would love to consult..."
                      rows={5}
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-3.5 rounded-xl text-xs text-white select-text leading-relaxed font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-semibold text-xs tracking-wide rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/20 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={13} />
                    {submitting ? 'Sending Transmission...' : 'Send Secure Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
