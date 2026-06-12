/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, Heart, MessageSquare, ArrowUpRight, Search, X, Plus, Sparkles, Check } from 'lucide-react';
import { blogPostsData } from '../data';
import { BlogPost } from '../types';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  // Draft Creation State
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftExcerpt, setDraftExcerpt] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [draftCategory, setDraftCategory] = useState('Backend');
  const [draftSuccess, setDraftSuccess] = useState(false);

  // Load posts
  useEffect(() => {
    const cached = localStorage.getItem('ritesh_portfolio_blogs');
    if (cached) {
      try {
        setPosts(JSON.parse(cached));
      } catch (err) {
        setPosts(blogPostsData);
      }
    } else {
      setPosts(blogPostsData);
    }
  }, []);

  const savePostsToCache = (newPosts: BlogPost[]) => {
    localStorage.setItem('ritesh_portfolio_blogs', JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = posts.map(p => {
      if (p.id === id) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    savePostsToCache(updated);
  };

  const handleAddDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim() || !draftExcerpt.trim() || !draftContent.trim()) return;

    const newPost: BlogPost = {
      id: `draft-${Date.now()}`,
      title: draftTitle,
      excerpt: draftExcerpt,
      content: draftContent,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      readTime: `${Math.max(2, Math.ceil(draftContent.split(' ').length / 150))} min read`,
      category: draftCategory,
      likes: 0,
      comments: 0,
    };

    const updated = [newPost, ...posts];
    savePostsToCache(updated);

    // Clean states
    setDraftSuccess(true);
    setTimeout(() => {
      setDraftSuccess(false);
      setIsDrafting(false);
      setDraftTitle('');
      setDraftExcerpt('');
      setDraftContent('');
    }, 1500);
  };

  const filteredPosts = posts.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="blog" className="py-24 bg-neutral-950 border-b border-neutral-900 relative">
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[6rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-left">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              08 . JOURNALS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
              Developer Blog & Journals
            </h2>
            <div className="h-0.5 w-16 bg-blue-600 rounded"></div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles & topics..."
                className="w-full bg-neutral-900 border border-neutral-800 focus:border-blue-500 focus:outline-none pl-9 pr-4 py-2 rounded-xl text-xs text-white placeholder-neutral-500 font-sans"
              />
            </div>

            {/* Compose Draft Button */}
            <button
              onClick={() => setIsDrafting(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs tracking-wide flex items-center gap-1.5 cursor-pointer shadow shadow-blue-900/30 font-sans"
            >
              <Plus size={14} />
              Contribute Draft
            </button>
          </div>
        </div>

        {/* Blog Posts Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <motion.div
              layout
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-neutral-900/40 border border-neutral-850 hover:border-neutral-800 p-6 rounded-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 cursor-pointer h-[260px] relative group"
            >
              {/* Draft badge indicator */}
              {post.id.startsWith('draft-') && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md border border-amber-500/20 bg-amber-500/5 text-amber-500 font-mono text-[8px] tracking-widest font-extrabold select-none">
                  LOCAL_DRAFT
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-3xs font-mono uppercase tracking-wider text-blue-400 font-extrabold select-none">
                  <span className="w-1 h-1 rounded-full bg-blue-400"></span>
                  {post.category}
                </div>

                <div className="space-y-2.5">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-450 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Foot stats indicators */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-850/60 font-mono text-3xs text-neutral-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className="flex items-center gap-1 hover:text-red-400 transition-colors group/like"
                  >
                    <Heart size={11} className="group-hover/like:fill-red-500/10" />
                    <span>{post.likes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 1. Article Reader Overlay Frame */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-neutral-950/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden"
            >
              {/* Title Header */}
              <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/40 shrink-0">
                <div className="flex items-center gap-2 text-3xs font-mono uppercase tracking-widest text-blue-400 font-black">
                  <span>JOURNAL TRACK</span>
                  <span>/</span>
                  <span>{selectedPost.category}</span>
                </div>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 rounded-lg border border-neutral-850 hover:border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white transition-all cursor-pointer animate-[pulse_5s_infinite]"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Content Main Panel */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left flex-1 bg-neutral-950/25">
                <div className="space-y-3 pb-6 border-b border-neutral-850/60">
                  <h1 className="text-xl sm:text-3xl font-extrabold text-white leading-tight">
                    {selectedPost.title}
                  </h1>

                  <div className="flex flex-wrap gap-4 text-3xs font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-neutral-500" />
                      {selectedPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-neutral-500" />
                      {selectedPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart size={12} className="text-neutral-500" />
                      {selectedPost.likes} likes
                    </span>
                  </div>
                </div>

                {/* Excerpt wrapper */}
                <div className="p-4 bg-blue-955/20 border-l-4 border-blue-600 rounded-r-xl text-neutral-300 text-xs sm:text-sm leading-relaxed italic">
                  {selectedPost.excerpt}
                </div>

                {/* Full Article Text Block */}
                <div className="prose prose-invert prose-xs sm:prose-sm max-w-none text-neutral-300 space-y-5 leading-relaxed text-xs sm:text-sm select-text whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>

              {/* Reader Overlay Footer */}
              <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950/40 flex items-center justify-end shrink-0 gap-3">
                <button
                  onClick={() => {
                    const fakeEvent = { stopPropagation: () => {} } as React.MouseEvent;
                    handleLike(selectedPost.id, fakeEvent);
                    setSelectedPost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
                  }}
                  className="px-4 py-2 rounded-xl border border-neutral-800 hover:border-neutral-700 hover:text-red-400 bg-neutral-950 text-neutral-400 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Heart size={13} className="fill-transparent" />
                  Like Article
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Close Reader
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Draft Post Contribution Panel */}
      <AnimatePresence>
        {isDrafting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-neutral-950/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-xl w-full shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative overflow-hidden"
            >
              {/* Modal Header */}
              <div className="px-5 py-4 border-b border-neutral-850 flex items-center justify-between bg-neutral-950/40">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <BookOpen size={16} />
                  </div>
                  <div className="text-left">
                    <div className="font-mono text-3xs text-neutral-500 font-bold uppercase tracking-wider">Draft Composer</div>
                    <div className="text-sm font-bold text-white mt-0.5">Contribute Article</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrafting(false)}
                  className="p-1.5 rounded-lg border border-neutral-850 hover:border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {draftSuccess ? (
                <div className="p-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 mx-auto flex items-center justify-center text-emerald-400">
                    <Check size={20} />
                  </div>
                  <h4 className="font-bold text-white">DRAFT COMPILED SUCCESSFULLY!</h4>
                  <p className="text-2xs text-neutral-500 font-mono">
                    Article node built and synchronized with client-side cached databases.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddDraft} className="p-6 space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-8 space-y-1.5">
                      <label className="font-mono text-3xs text-neutral-500 uppercase tracking-widest">Article Title</label>
                      <input
                        type="text"
                        required
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        placeholder="E.g. Mastering Python decors..."
                        className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2.5 rounded-xl text-xs text-white"
                      />
                    </div>
                    <div className="sm:col-span-4 space-y-1.5">
                      <label className="font-mono text-3xs text-neutral-500 uppercase tracking-widest">Topic Category</label>
                      <select
                        value={draftCategory}
                        onChange={(e) => setDraftCategory(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2.5 rounded-xl text-xs text-white cursor-pointer"
                      >
                        <option>Backend</option>
                        <option>Generative AI</option>
                        <option>Frontend</option>
                        <option>Computer Science</option>
                        <option>Data Analytics</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-3xs text-neutral-500 uppercase tracking-widest">Brief Abstract / Summary</label>
                    <input
                      type="text"
                      required
                      value={draftExcerpt}
                      onChange={(e) => setDraftExcerpt(e.target.value)}
                      placeholder="Write a brief scannable 1-line hook description..."
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2.5 rounded-xl text-xs text-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-3xs text-neutral-500 uppercase tracking-widest">Markdown Narrative Content</label>
                    <textarea
                      required
                      value={draftContent}
                      onChange={(e) => setDraftContent(e.target.value)}
                      placeholder="Write your guide content..."
                      rows={6}
                      className="w-full bg-neutral-950 border border-neutral-850 focus:border-blue-500 focus:outline-none p-2.5 rounded-xl text-xs text-white family-mono"
                    />
                  </div>

                  <div className="pt-4 border-t border-neutral-850 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsDrafting(false)}
                      className="px-4 py-2.5 text-neutral-400 hover:text-white text-xs font-semibold cursor-pointer"
                    >
                      Discard Draft
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow shadow-blue-900/10 cursor-pointer"
                    >
                      Assemble and Compile
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
