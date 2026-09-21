/**
 * Portfolio Knowledge Layer
 * 
 * Factual indexing engine dynamically derived from authoritative sources:
 * - src/data/portfolio.ts (Bio, Stats, Skills, Experience, Contact)
 * - src/data/services.ts (5 Services, Deliverables, Processes, FAQs)
 * - src/data/caseStudies.ts (8 Projects, Scopes, Technologies, Outcomes)
 * 
 * Strictly zero hallucinated stats, awards, client revenues or unverified claims.
 */

import { portfolioData } from '../data/portfolio';
import { servicesData } from '../data/services';
import { caseStudiesData } from '../data/caseStudies';
import type { CaseStudyItem } from '../data/seo/types';
import type { KnowledgeEntity } from './types';

export interface PortfolioKnowledgeBase {
  profile: {
    name: string;
    role: string;
    headline: string;
    location: string;
    email: string;
    phone: string;
    highlights: Array<{ label: string; value: string }>;
    story: string[];
    focusAreas: string[];
  };
  skills: Array<{
    category: string;
    items: string[];
    description: string;
    slug?: string;
  }>;
  services: Array<{
    id: string;
    name: string;
    slug: string;
    h1: string;
    shortDescription: string;
    fullDescription: string;
    includes: string[];
    process: Array<{ step: number; title: string; description: string }>;
    targetAudience: string[];
    faqs: Array<{ question: string; answer: string }>;
  }>;
  caseStudies: CaseStudyItem[];
  entities: KnowledgeEntity[];
}

/**
 * Builds the verified knowledge base singleton
 */
export function getPortfolioKnowledge(): PortfolioKnowledgeBase {
  const { about, phone, email, skills, skillCategories } = portfolioData;

  const entities: KnowledgeEntity[] = [
    // Core Profile Entity
    {
      id: 'profile',
      name: 'Vivek Singh',
      category: 'Profile',
      summary: 'Digital Marketer, Web Developer and Founding Member of DIGITA CURVE.',
      details: about.fullIntroduction,
      targetSlug: 'about'
    },
    // Experience Entity
    {
      id: 'experience',
      name: 'DIGITA CURVE Founding Member',
      category: 'Experience',
      summary: 'Founding Member & Digital Marketing / Web Development Lead at DIGITA CURVE (2025 — Present).',
      details: 'Leading performance digital advertising, technical search engine optimization, modern frontend engineering, and AI-assisted automation pipelines.',
      targetSlug: 'experience'
    },
    // Contact Entity
    {
      id: 'contact',
      name: 'Contact Vivek Singh',
      category: 'Contact',
      summary: `Email: ${email} | Phone: ${phone || '+91 96961 90574'} | Location: ${about.location}`,
      details: `Reach Vivek directly via email at ${email} or phone at ${phone || '+91 96961 90574'} for performance marketing, SEO, web development, and AI consulting.`,
      targetSlug: 'contact'
    }
  ];

  // Index Skill Categories as Entities
  skillCategories.forEach((sc) => {
    entities.push({
      id: `skill-${sc.slug}`,
      name: sc.title,
      category: 'Skill',
      summary: sc.heading,
      details: sc.fullDescription,
      technologies: sc.items,
      targetSlug: sc.slug === 'google-ads' ? 'skills/google-ads' : `skills/${sc.slug}`
    });
  });

  // Index Services as Entities
  servicesData.forEach((svc) => {
    entities.push({
      id: `service-${svc.slug}`,
      name: svc.name,
      category: 'Service',
      summary: svc.shortDescription,
      details: svc.fullDescription,
      targetSlug: 'services'
    });
  });

  // Index Case Studies as Entities
  caseStudiesData.forEach((cs) => {
    entities.push({
      id: `project-${cs.slug}`,
      name: cs.title,
      category: 'Project',
      summary: cs.shortDescription,
      details: cs.fullDescription,
      technologies: cs.technologies,
      targetSlug: 'work',
      url: cs.projectUrl
    });
  });

  return {
    profile: {
      name: about.name,
      role: about.role,
      headline: portfolioData.headline,
      location: about.location,
      email: portfolioData.email,
      phone: portfolioData.phone || '+91 96961 90574',
      highlights: about.highlights,
      story: about.story,
      focusAreas: about.focusAreas
    },
    skills: skills.map((s) => ({
      category: s.category,
      items: s.items,
      description: s.description || ''
    })),
    services: servicesData.map((s) => ({
      id: s.id,
      name: s.name,
      slug: s.slug,
      h1: s.h1,
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      includes: s.includes || [],
      process: s.process || [],
      targetAudience: s.targetAudience || [],
      faqs: s.faqs || []
    })),
    caseStudies: caseStudiesData,
    entities
  };
}
