/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectId {
  id: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  techStack: string[];
  features: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  responsibilities: string[];
  skills: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verificationUrl?: string;
  badgeType: 'python' | 'consulting' | 'analytics' | 'cs50';
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  duration: string;
  grade?: string;
  details?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  likes: number;
  comments: number;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: { name: string; level: number }[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  description: string;
  techs: string[];
  timeline: string;
}
