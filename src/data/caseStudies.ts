/**
 * Case Studies / Projects Data Architecture
 * 
 * Single source of truth for documented portfolio projects.
 * Strictly adheres to documented capabilities, tools, and project scopes without
 * fabricated statistics, unverified numbers, or unsupported claims.
 */

import type { CaseStudyItem } from './seo/types';
import { generateCaseStudySchema, generateBreadcrumbSchema } from './seo/schemaGenerators';

const BASE_URL = 'https://digitacurve.com';

export const caseStudiesData: CaseStudyItem[] = [
  // 1. SiteSupply
  {
    id: 'sitesupply',
    slug: 'sitesupply',
    title: 'SiteSupply',
    category: 'Construction Materials',
    projectType: 'Google Ads Landing Page & Lead Capture',
    year: '2025',
    clientOrBusiness: 'SiteSupply',
    projectUrl: 'https://sale.sitesupply.in',
    shortDescription:
      'Google Ads landing page for cement and TMT steel sales, featuring trust sections, mobile-first UX, and lead capture.',
    fullDescription:
      'SiteSupply is a construction materials supplier. Developed a dedicated Google Ads landing page for cement and TMT steel sales, incorporating trust sections, mobile-first UX, and lead capture workflows.',
    role: 'Digital Marketer & Web Developer',
    servicesProvided: ['Google Ads Management', 'Website Development'],
    technologies: ['Google Ads', 'Landing Page Optimization', 'Mobile-first UX', 'Lead Capture'],
    challenge:
      'Presenting cement and TMT steel specifications clearly to buyers on mobile devices while facilitating direct lead capture from Google Ads traffic.',
    approach:
      'Structured a mobile-first landing page with dedicated cement and TMT steel product sections, transparent trust elements, and streamlined lead capture forms.',
    solution:
      'Built a focused landing page (sale.sitesupply.in) designed for Google Ads traffic with clear product highlights, credibility sections, and lead capture mechanisms.',
    deliverables: [
      'Google Ads landing page (sale.sitesupply.in)',
      'Cement and TMT steel sales sections',
      'Trust and credibility sections',
      'Mobile-first UX design',
      'Lead capture implementation'
    ],
    outcome:
      'Deployed Google Ads landing page for cement and TMT steel sales.',
    relatedServices: ['google-ads-management', 'website-development'],
    relatedProjects: ['golden-age-landbase', 'varanasi-travelers'],
    keywords: {
      primary: [
        { term: 'SiteSupply Construction Materials', intent: 'commercial' },
        { term: 'Cement and TMT Steel Landing Page', intent: 'commercial' }
      ],
      secondary: [
        { term: 'Construction Materials Lead Capture', intent: 'commercial' },
        { term: 'Google Ads Landing Page Development', intent: 'commercial' }
      ],
      longTail: [
        { term: 'Google Ads landing page for building materials', intent: 'commercial' }
      ],
      relatedTerms: ['TMT Steel', 'Cement Supply', 'PPC Landing Page', 'Mobile Lead Capture'],
      searchIntent: 'commercial'
    },
    seo: {
      seoTitle: 'SiteSupply Case Study | Construction Materials Landing Page',
      metaDescription:
        'Case study of SiteSupply: Google Ads landing page development for cement and TMT steel sales with mobile-first lead capture by Vivek Singh.',
      ogTitle: 'SiteSupply Case Study | Construction Materials Landing Page',
      ogDescription:
        'Explore how SiteSupply was built with a mobile-first lead capture structure and aligned Google Ads search strategy.'
    }
  },

  // 2. Kashi Darshan
  {
    id: 'kashi-darshan',
    slug: 'kashi-darshan',
    title: 'Kashi Darshan',
    category: 'Travel',
    projectType: 'Pilgrimage Booking Website & SEO',
    year: '2025',
    clientOrBusiness: 'Kashi Darshan',
    projectUrl: 'https://yatra.kashidharshan.com',
    shortDescription:
      'Pilgrimage-booking landing page and website support structured for SEO, paid campaign alignment, and SEO support.',
    fullDescription:
      'Kashi Darshan is a pilgrimage travel service. The project included developing a pilgrimage-booking landing page, establishing SEO structure, aligning paid ad campaigns, and providing ongoing website and SEO support.',
    role: 'Digital Marketer & SEO / Web Lead',
    servicesProvided: ['SEO Services', 'Google Ads Management', 'Website Development'],
    technologies: ['SEO Structure', 'Paid Campaign Alignment', 'Landing Page Development', 'Website Support', 'SEO Support'],
    challenge:
      'Structuring a pilgrimage booking landing page for search discoverability and coordinating it with paid acquisition campaigns.',
    approach:
      'Implemented an SEO-structured landing page format aligned with paid campaign search queries and travel booking requirements.',
    solution:
      'Delivered yatra.kashidharshan.com with structured pilgrimage booking details, SEO implementation, paid campaign alignment, and website support.',
    deliverables: [
      'Pilgrimage-booking landing page (yatra.kashidharshan.com)',
      'SEO structure and on-page optimization',
      'Paid campaign alignment',
      'Website support',
      'SEO support'
    ],
    outcome:
      'Active pilgrimage-booking landing page with SEO structure and paid campaign alignment.',
    relatedServices: ['seo-services', 'google-ads-management', 'website-development'],
    relatedProjects: ['ayodhya-darshan', 'varanasi-travelers'],
    keywords: {
      primary: [
        { term: 'Kashi Darshan Pilgrimage Booking', intent: 'commercial' },
        { term: 'Varanasi Tour Landing Page', intent: 'commercial' }
      ],
      secondary: [
        { term: 'Kashi Tour SEO Optimization', intent: 'commercial' },
        { term: 'Pilgrimage Travel Website Development', intent: 'commercial' }
      ],
      longTail: [
        { term: 'SEO and booking landing page for Varanasi tours', intent: 'commercial' }
      ],
      relatedTerms: ['Varanasi Yatra', 'Pilgrimage SEO', 'Travel Booking Page', 'On-Page SEO'],
      searchIntent: 'commercial'
    },
    seo: {
      seoTitle: 'Kashi Darshan Case Study | Pilgrimage Booking & SEO',
      metaDescription:
        'Case study of Kashi Darshan: Pilgrimage booking landing page development, SEO structure, and paid ad alignment by Vivek Singh.',
      ogTitle: 'Kashi Darshan Case Study | Pilgrimage Booking & SEO',
      ogDescription:
        'Detailed case study on building the Kashi Darshan pilgrimage booking platform with on-page SEO and ad alignment.'
    }
  },

  // 3. Ayodhya Darshan
  {
    id: 'ayodhya-darshan',
    slug: 'ayodhya-darshan',
    title: 'Ayodhya Darshan',
    category: 'Travel / Booking',
    projectType: 'Booking Landing Page & Multi-Channel Ads',
    year: '2025',
    clientOrBusiness: 'Ayodhya Darshan',
    projectUrl: 'https://book.ayodhyadharshan.com',
    shortDescription:
      'Booking landing page with Google Ads traffic, Meta Ads traffic, and social content and creatives.',
    fullDescription:
      'Ayodhya Darshan is a travel booking service. The project focused on building a booking landing page, managing Google Ads and Meta Ads traffic alignment, and producing social media content and creatives.',
    role: 'Digital Marketer & Web Developer',
    servicesProvided: ['Google Ads Management', 'Social Media Marketing', 'Performance Marketing'],
    technologies: ['Google Ads', 'Meta Ads', 'Social Content & Creatives', 'Booking Landing Page Design'],
    challenge:
      'Aligning travel booking landing page UX with multi-channel traffic coming from Google Ads and Meta Ads.',
    approach:
      'Developed a dedicated booking page and aligned creative messaging across Google Ads search and Meta Ads social campaigns.',
    solution:
      'Built book.ayodhyadharshan.com with booking workflows, synchronized with Google Ads traffic, Meta Ads traffic, and social creatives.',
    deliverables: [
      'Booking landing page (book.ayodhyadharshan.com)',
      'Google Ads traffic alignment',
      'Meta Ads traffic alignment',
      'Social content and ad creatives'
    ],
    outcome:
      'Deployed booking landing page supported by Google Ads, Meta Ads, and social creatives.',
    relatedServices: ['google-ads-management', 'social-media-marketing', 'performance-marketing'],
    relatedProjects: ['kashi-darshan', 'varanasi-travelers'],
    keywords: {
      primary: [
        { term: 'Ayodhya Darshan Booking', intent: 'commercial' },
        { term: 'Ayodhya Tour Package Landing Page', intent: 'commercial' }
      ],
      secondary: [
        { term: 'Ayodhya Tour Ads Campaign', intent: 'commercial' },
        { term: 'Travel Booking Landing Page', intent: 'commercial' }
      ],
      longTail: [
        { term: 'Google and Meta ads landing page for Ayodhya tours', intent: 'commercial' }
      ],
      relatedTerms: ['Ayodhya Yatra', 'Meta Ads Creatives', 'Google Search Ads', 'Travel Marketing'],
      searchIntent: 'commercial'
    },
    seo: {
      seoTitle: 'Ayodhya Darshan Case Study | Travel Booking & Paid Ads',
      metaDescription:
        'Case study of Ayodhya Darshan: Booking landing page design, Google Ads, Meta Ads, and social creative strategy by Vivek Singh.',
      ogTitle: 'Ayodhya Darshan Case Study | Travel Booking & Paid Ads',
      ogDescription:
        'See how Ayodhya Darshan was developed with a dedicated booking landing page and multi-channel ad alignment.'
    }
  },

  // 4. Varanasi Travelers
  {
    id: 'varanasi-travelers',
    slug: 'varanasi-travelers',
    title: 'Varanasi Travelers',
    category: 'Travel',
    projectType: 'Responsive Landing Page & Tour Leads',
    year: '2025',
    clientOrBusiness: 'Varanasi Travelers',
    projectUrl: 'https://tour.varanasitravelers.com',
    shortDescription:
      'Responsive landing page for tour-package leads, supported by Google Ads, Meta Ads, and social media support.',
    fullDescription:
      'Varanasi Travelers is a travel service. The project involved developing a responsive landing page for tour-package lead generation, supported by Google Ads, Meta Ads, and social media support.',
    role: 'Digital Marketer & Web Developer',
    servicesProvided: ['Google Ads Management', 'Social Media Marketing', 'Website Development'],
    technologies: ['Google Ads', 'Meta Ads', 'Social Media Support', 'Responsive Web Design', 'Lead Generation'],
    challenge:
      'Capturing tour-package leads across mobile and desktop devices from search and social traffic.',
    approach:
      'Designed a responsive landing page showcasing tour packages with direct lead capture and coordinated Google and Meta advertising.',
    solution:
      'Launched tour.varanasitravelers.com featuring responsive tour package layouts, integrated lead generation, and social media marketing support.',
    deliverables: [
      'Responsive landing page (tour.varanasitravelers.com)',
      'Tour-package lead generation structure',
      'Google Ads campaign alignment',
      'Meta Ads campaign alignment',
      'Social media support'
    ],
    outcome:
      'Launched responsive tour landing page with integrated lead capture and paid media support.',
    relatedServices: ['google-ads-management', 'social-media-marketing', 'website-development'],
    relatedProjects: ['kashi-darshan', 'ayodhya-darshan'],
    keywords: {
      primary: [
        { term: 'Varanasi Travelers Tour Website', intent: 'commercial' },
        { term: 'Varanasi Tour Package Lead Generation', intent: 'commercial' }
      ],
      secondary: [
        { term: 'Varanasi Sightseeing Website', intent: 'commercial' },
        { term: 'Travel PPC Campaigns India', intent: 'commercial' }
      ],
      longTail: [
        { term: 'Tour package website and ad management for Varanasi travel', intent: 'commercial' }
      ],
      relatedTerms: ['Varanasi Tours', 'Tour Packages', 'Google Ads Travel', 'Meta Ads Social'],
      searchIntent: 'commercial'
    },
    seo: {
      seoTitle: 'Varanasi Travelers Case Study | Tour Package Website & Ads',
      metaDescription:
        'Case study of Varanasi Travelers: Responsive tour package website development, Google Ads, and Meta Ads management by Vivek Singh.',
      ogTitle: 'Varanasi Travelers Case Study | Tour Package Website & Ads',
      ogDescription:
        'Explore the development and marketing strategy behind the Varanasi Travelers tour platform.'
    }
  },

  // 5. Golden Age Landbase
  {
    id: 'golden-age-landbase',
    slug: 'golden-age-landbase',
    title: 'Golden Age Landbase',
    category: 'Real Estate',
    projectType: 'Lead-Generation Website, Ads & Video Content',
    year: '2025',
    clientOrBusiness: 'Golden Age Landbase',
    projectUrl: 'https://sale.goldenagelandbase.com',
    shortDescription:
      'Lead-generation website backed by Google Ads, social ad creatives, Instagram content, and YouTube video content.',
    fullDescription:
      'Golden Age Landbase is a real estate venture. The project encompassed developing a lead-generation website, running Google Ads, designing social ad creatives, and producing Instagram and YouTube video content.',
    role: 'Digital Marketer & Web Developer',
    servicesProvided: ['Google Ads Management', 'Social Media Marketing', 'Website Development'],
    technologies: ['Google Ads', 'Lead-Generation Web Development', 'Social Ad Creatives', 'Instagram Content', 'YouTube Video Content'],
    challenge:
      'Engaging prospective real estate buyers across video platforms and paid search, directing them to a structured lead-generation website.',
    approach:
      'Created video content for Instagram and YouTube, developed social ad creatives, and built a dedicated property landing page connected to Google Ads.',
    solution:
      'Delivered sale.goldenagelandbase.com backed by Google Ads campaigns, social ad creatives, and property showcase videos on Instagram and YouTube.',
    deliverables: [
      'Lead-generation website (sale.goldenagelandbase.com)',
      'Google Ads campaigns',
      'Social ad creatives',
      'Instagram video content',
      'YouTube video content'
    ],
    outcome:
      'Deployed real estate lead-generation website with integrated Google Ads and video content across Instagram and YouTube.',
    relatedServices: ['google-ads-management', 'social-media-marketing', 'website-development'],
    relatedProjects: ['sitesupply', 'varanasi-travelers'],
    keywords: {
      primary: [
        { term: 'Golden Age Landbase Real Estate', intent: 'commercial' },
        { term: 'Real Estate Lead Generation Website', intent: 'commercial' }
      ],
      secondary: [
        { term: 'Real Estate Google Ads', intent: 'commercial' },
        { term: 'Property Video Marketing India', intent: 'commercial' }
      ],
      longTail: [
        { term: 'Real estate landing page and video content marketing strategy', intent: 'commercial' }
      ],
      relatedTerms: ['Property Marketing', 'Real Estate Ads', 'YouTube Real Estate', 'Lead Capture'],
      searchIntent: 'commercial'
    },
    seo: {
      seoTitle: 'Golden Age Landbase Case Study | Real Estate Web & Ads',
      metaDescription:
        'Case study of Golden Age Landbase: Real estate website development, Google Ads, social creatives, and YouTube video marketing by Vivek Singh.',
      ogTitle: 'Golden Age Landbase Case Study | Real Estate Web & Ads',
      ogDescription:
        'Discover how Golden Age Landbase combined real estate web development with video content and paid ad campaigns.'
    }
  },

  // 6. Trip Customizer
  {
    id: 'trip-customizer',
    slug: 'trip-customizer',
    title: 'Trip Customizer',
    category: 'Travel / E-commerce',
    projectType: 'Custom Web Build, E-commerce & Animation',
    year: '2024 — 2025',
    clientOrBusiness: 'Trip Customizer',
    projectUrl: 'https://tripcustomizer.com',
    shortDescription:
      'Custom web build featuring e-commerce functionality, UX design, and advanced interactive animation.',
    fullDescription:
      'Trip Customizer is an interactive travel platform. The project encompassed a custom web build, e-commerce functionality, user experience (UX) design, and advanced interactive animations.',
    role: 'Lead Frontend & Custom Web Developer',
    servicesProvided: ['Website Development'],
    technologies: ['Custom Web Development', 'E-commerce Functionality', 'User Experience (UX)', 'Advanced Interactive Animation'],
    challenge:
      'Building an interactive travel customization flow with seamless e-commerce functionality and responsive animations.',
    approach:
      'Developed a custom web architecture focused on smooth user experience, e-commerce integration, and interactive motion.',
    solution:
      'Engineered a custom web platform featuring itinerary customization, e-commerce functionality, and advanced interactive animations.',
    deliverables: [
      'Custom web build (tripcustomizer.com)',
      'E-commerce functionality',
      'Interactive travel customization UX',
      'Advanced interactive animation system'
    ],
    outcome:
      'Delivered custom travel web build with integrated e-commerce and interactive animation.',
    relatedServices: ['website-development'],
    relatedProjects: ['local-ai-agent', 'kashi-prasad'],
    keywords: {
      primary: [
        { term: 'Trip Customizer Web App', intent: 'commercial' },
        { term: 'Interactive Travel Web Development', intent: 'commercial' }
      ],
      secondary: [
        { term: 'Custom React Travel Application', intent: 'commercial' },
        { term: 'GSAP Lenis Web Development', intent: 'commercial' }
      ],
      longTail: [
        { term: 'Custom interactive e-commerce travel website with smooth scrolling', intent: 'commercial' }
      ],
      relatedTerms: ['GSAP Animation', 'Lenis Scroll', 'React App', 'E-commerce Customizer'],
      searchIntent: 'commercial'
    },
    seo: {
      seoTitle: 'Trip Customizer Case Study | Custom Web Development & Motion',
      metaDescription:
        'Case study of Trip Customizer: Custom web build, e-commerce, UX, and advanced interactive animation by Vivek Singh.',
      ogTitle: 'Trip Customizer Case Study | Custom Web Development & Motion',
      ogDescription:
        'See how Trip Customizer was built with custom web development, UX, and advanced interactive animations.'
    }
  },

  // 7. Kashi Prasad
  {
    id: 'kashi-prasad',
    slug: 'kashi-prasad',
    title: 'Kashi Prasad',
    category: 'E-commerce',
    projectType: 'E-commerce Storefront',
    year: '2025',
    status: 'In development',
    clientOrBusiness: 'Kashi Prasad',
    projectUrl: 'https://kashiprasad.in',
    shortDescription:
      'E-commerce platform currently in development, focused on product listings, UX, and a conversion-focused structure.',
    fullDescription:
      'Kashi Prasad is an e-commerce platform currently in development. The project focuses on product listings, user experience (UX) design, and a conversion-focused structure for spiritual offerings.',
    role: 'E-commerce & Web Developer',
    servicesProvided: ['Website Development'],
    technologies: ['E-commerce', 'Product Listings', 'Conversion-Focused Structure', 'UX Design'],
    challenge:
      'Designing an intuitive product catalog and conversion-focused e-commerce structure for sacred offerings.',
    approach:
      'Structuring clear product listings, intuitive navigation, and conversion-focused layouts.',
    solution:
      'Currently building the e-commerce storefront with structured product listings and a conversion-focused UX.',
    deliverables: [
      'Product listings architecture',
      'Conversion-focused UX design',
      'E-commerce storefront (In development)'
    ],
    outcome:
      'Project is currently in development.',
    relatedServices: ['website-development'],
    relatedProjects: ['trip-customizer', 'kashi-darshan'],
    keywords: {
      primary: [
        { term: 'Kashi Prasad E-commerce', intent: 'commercial' },
        { term: 'Spiritual Offerings Online Store', intent: 'commercial' }
      ],
      secondary: [
        { term: 'E-commerce Website Development India', intent: 'commercial' },
        { term: 'Varanasi Prasad Delivery Website', intent: 'commercial' }
      ],
      longTail: [
        { term: 'E-commerce website development for spiritual products and prasad delivery', intent: 'commercial' }
      ],
      relatedTerms: ['E-commerce Development', 'Product Listings', 'Payment Gateway', 'Conversion UX'],
      searchIntent: 'commercial'
    },
    seo: {
      seoTitle: 'Kashi Prasad Project Overview | E-commerce Storefront (In Development)',
      metaDescription:
        'Project overview of Kashi Prasad: E-commerce platform development for spiritual offerings and prasad delivery by Vivek Singh.',
      ogTitle: 'Kashi Prasad Project Overview | E-commerce Storefront (In Development)',
      ogDescription:
        'Overview of the ongoing development of the Kashi Prasad e-commerce storefront by Vivek Singh.'
    }
  },

  // 8. Local AI Agent for Automated E-commerce Development
  {
    id: 'local-ai-agent',
    slug: 'local-ai-agent',
    title: 'Local AI Agent for Automated E-commerce Development',
    category: 'AI / Internal Tool',
    projectType: 'Local AI Automation & E-commerce Scaffolding',
    year: '2025',
    clientOrBusiness: 'Internal R&D / DIGITA CURVE',
    shortDescription:
      'Local AI agent using Ollama, React, Next.js, GSAP, and Lenis for AI-assisted e-commerce website generation.',
    fullDescription:
      'An internal tool project focused on developing a local AI agent using Ollama to assist in automated e-commerce website generation with React, Next.js, GSAP, and Lenis.',
    role: 'AI & Web Development Lead',
    servicesProvided: ['Website Development'],
    technologies: ['Local AI Agents', 'Ollama', 'React', 'Next.js', 'GSAP', 'Lenis', 'AI Code Generation'],
    challenge:
      'Streamlining repetitive e-commerce website development and motion integration through local AI automation.',
    approach:
      'Configured local AI agent workflows using Ollama to assist in scaffolding React and Next.js e-commerce structures with GSAP and Lenis animations.',
    solution:
      'Built a local AI agent workflow that assists in automated e-commerce website generation, component scaffolding, and animation integration.',
    deliverables: [
      'Local AI agent workflow with Ollama',
      'AI-assisted e-commerce website generation pipelines',
      'React and Next.js component templates',
      'GSAP and Lenis animation scaffolding'
    ],
    outcome:
      'Implemented local AI agent workflow for AI-assisted e-commerce website development.',
    relatedServices: ['website-development'],
    relatedProjects: ['trip-customizer', 'sitesupply'],
    keywords: {
      primary: [
        { term: 'Local AI Agent E-commerce', intent: 'informational' },
        { term: 'AI Assisted Web Development', intent: 'informational' }
      ],
      secondary: [
        { term: 'Ollama React Development Workflow', intent: 'informational' },
        { term: 'AI Code Generation Next.js', intent: 'informational' }
      ],
      longTail: [
        { term: 'Local AI agent for automated React and Next.js e-commerce development', intent: 'informational' }
      ],
      relatedTerms: ['Ollama LLM', 'AI Automation', 'React Scaffolding', 'GSAP Motion Generation'],
      searchIntent: 'informational'
    },
    seo: {
      seoTitle: 'Local AI Agent for Web Development Case Study | Vivek Singh',
      metaDescription:
        'Case study on building a local AI agent workflow using Ollama, React, Next.js, and GSAP for automated e-commerce scaffolding by Vivek Singh.',
      ogTitle: 'Local AI Agent for Web Development Case Study | Vivek Singh',
      ogDescription:
        'Explore how local AI models with Ollama were integrated to streamline React and Next.js e-commerce development.'
    }
  }
];

// Automatically generate standards-compliant schemas for each case study
caseStudiesData.forEach((caseStudy) => {
  caseStudy.caseStudySchema = generateCaseStudySchema(caseStudy, BASE_URL);
  caseStudy.breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', url: '/' },
      { name: 'Work', url: '/work' },
      { name: caseStudy.title, url: `/work/${caseStudy.slug}` }
    ],
    BASE_URL
  );
});

/**
 * Utility helper to get a single case study by slug
 */
export function getCaseStudyBySlug(slug: string): CaseStudyItem | undefined {
  return caseStudiesData.find((item) => item.slug === slug || item.id === slug);
}
