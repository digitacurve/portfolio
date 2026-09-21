/**
 * SEO & Schema Core Type Definitions
 * 
 * Reusable type system for Services, Case Studies, Pages,
 * Structured Data (JSON-LD), and Keyword Architecture.
 */

export type SearchIntent = 'commercial' | 'transactional' | 'informational' | 'navigational';

export interface KeywordItem {
  term: string;
  intent?: SearchIntent;
  // Architecture prepared for researched data to be plugged in later
  searchVolume?: number | null;
  difficulty?: number | null; // 0 - 100
  cpc?: number | null;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ServiceProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceKeywordData {
  primary: KeywordItem[];
  secondary: KeywordItem[];
  longTail: KeywordItem[];
  relatedTerms: string[];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface OpenGraphMetadata {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  siteName?: string;
  locale?: string;
}

export interface TwitterMetadata {
  card?: 'summary' | 'summary_large_image';
  title: string;
  description: string;
  image?: string;
}

export interface BaseSEOMetadata {
  title: string;
  metaDescription: string;
  canonicalUrl: string;
  og: OpenGraphMetadata;
  twitter: TwitterMetadata;
  keywords?: string[];
  robots?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  h1: string;
  shortDescription: string;
  fullDescription: string;
  positioning?: string;
  includes: string[];

  // Keyword Architecture (Separated from copy to prevent keyword stuffing)
  keywords: ServiceKeywordData;
  searchIntent: SearchIntent;
  targetAudience: string[];

  // Structured Core Content
  benefits?: ServiceBenefit[];
  process: ServiceProcessStep[];
  faqs: FAQItem[];

  // SEO & Metadata
  seoTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  canonicalUrl: string;

  // Structured Data / Schema Generators
  serviceSchema?: Record<string, unknown>;
  faqSchema?: Record<string, unknown>;
  breadcrumbSchema?: Record<string, unknown>;
}


export interface CaseStudyKeywordData {
  primary: KeywordItem[];
  secondary: KeywordItem[];
  longTail?: KeywordItem[];
  relatedTerms?: string[];
  searchIntent?: SearchIntent;
}

export interface CaseStudySEOConfig {
  seoTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  image?: string;
  type?: 'case-study';
}

export interface CaseStudyItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  technologies: string[];
  servicesProvided: string[];
  projectUrl?: string;
  year?: string;
  clientOrBusiness?: string;
  projectType: string;
  challenge?: string;
  approach?: string;
  solution?: string;
  deliverables: string[];
  outcome?: string;
  status?: string; // e.g., "In development" for Kashi Prasad

  // Keyword Architecture
  keywords: CaseStudyKeywordData;

  // SEO & Metadata
  seo: CaseStudySEOConfig;

  // FAQs (optional where applicable)
  faqs?: FAQItem[];

  // Internal Linking Architecture
  relatedServices?: string[]; // Slugs of services e.g. ['google-ads-management', 'website-development']
  relatedProjects?: string[]; // Slugs of other case studies

  // Structured Data / Schema
  caseStudySchema?: Record<string, unknown>;
  breadcrumbSchema?: Record<string, unknown>;
}

export interface SchemaJsonLd {
  '@context': 'https://schema.org';
  [key: string]: unknown;
}

