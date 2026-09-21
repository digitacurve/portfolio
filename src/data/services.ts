/**
 * Services Data Architecture
 * 
 * Final service-page content layer strictly structured around documented capabilities,
 * comprehensive keyword datasets, step-by-step processes, and schema generators.
 */

import type { ServiceItem } from './seo/types';
import { generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from './seo/schemaGenerators';

const BASE_URL = 'https://digitacurve.com';

export const servicesData: ServiceItem[] = [
  // 1. GOOGLE ADS MANAGEMENT
  {
    id: 'google-ads-management',
    name: 'Google Ads Management',
    slug: 'google-ads-management',
    h1: 'Google Ads Management That Turns Search Intent Into Leads',
    shortDescription:
      'Run Google Ads with a strategy built around the way your customers actually search. From campaign structure and ad copy to conversion tracking and ongoing optimisation, I build paid search campaigns designed around measurable business goals.',
    fullDescription:
      'Run Google Ads with a strategy built around the way your customers actually search. From campaign structure and ad copy to conversion tracking and ongoing optimisation, I build paid search campaigns designed around measurable business goals.',

    includes: [
      'Google Search Ads',
      'Display Ads',
      'Performance Max',
      'Keyword research & campaign structure',
      'Ad copywriting',
      'Landing page alignment',
      'Conversion tracking',
      'Campaign optimisation',
      'Budget & bid optimisation',
      'Performance analysis'
    ],

    process: [
      { step: 1, title: 'Understand Business & Offer', description: 'Analyze the business model, unit economics, value propositions, and specific campaign targets.' },
      { step: 2, title: 'Research Search Intent', description: 'Evaluate how high-intent prospects search and identify terms with clear commercial intent.' },
      { step: 3, title: 'Build Campaign Structure', description: 'Architect tightly clustered ad groups, match types, campaign tiers, and negative keyword lists.' },
      { step: 4, title: 'Create Ads and Targeting', description: 'Write compelling, relevant ad copy with tailored extensions, demographic filters, and geo-targeting.' },
      { step: 5, title: 'Set Up Conversion Tracking', description: 'Implement Google Tag Manager triggers and Google Analytics events for purchases, calls, and leads.' },
      { step: 6, title: 'Launch', description: 'Deploy campaigns with calibrated initial bidding strategies and verify tracking telemetry.' },
      { step: 7, title: 'Analyse Performance', description: 'Review actual search term queries, cost per acquisition (CPA), conversion rates, and click quality.' },
      { step: 8, title: 'Continuously Optimise', description: 'Iterate bids, prune non-performing search terms, test ad copy variations, and scale winning segments.' }
    ],

    targetAudience: [
      'Local businesses',
      'Service businesses',
      'E-commerce',
      'Travel businesses',
      'Real estate',
      'Businesses looking for measurable paid traffic'
    ],

    keywords: {
      primary: [
        { term: 'Google Ads Management', intent: 'commercial' },
        { term: 'Google Ads Agency India', intent: 'commercial' }
      ],
      secondary: [
        { term: 'Google Ads Services', intent: 'commercial' },
        { term: 'Google Ads Management Services', intent: 'commercial' },
        { term: 'PPC Management', intent: 'commercial' },
        { term: 'PPC Agency India', intent: 'commercial' },
        { term: 'Google Ads Expert India', intent: 'commercial' },
        { term: 'Google Search Ads', intent: 'commercial' },
        { term: 'Performance Max Management', intent: 'commercial' },
        { term: 'Google Ads Campaign Management', intent: 'commercial' },
        { term: 'Google Ads Lead Generation', intent: 'commercial' }
      ],
      longTail: [
        { term: 'Google Ads management services in India', intent: 'commercial' },
        { term: 'Google Ads agency for small businesses', intent: 'commercial' },
        { term: 'Google Ads expert for lead generation', intent: 'commercial' },
        { term: 'Google Ads management for ecommerce', intent: 'commercial' },
        { term: 'Google Search Ads management India', intent: 'commercial' },
        { term: 'Performance Max management services India', intent: 'commercial' },
        { term: 'Google Ads lead generation agency India', intent: 'commercial' },
        { term: 'PPC management services for businesses', intent: 'commercial' }
      ],
      relatedTerms: [
        'paid search',
        'PPC advertising',
        'conversion tracking',
        'negative keywords',
        'ad copy',
        'landing page optimisation',
        'ROAS',
        'CPL',
        'Google Shopping',
        'YouTube Ads',
        'remarketing'
      ]
    },

    searchIntent: 'commercial',

    faqs: [
      {
        question: 'What types of Google Ads campaigns do you set up?',
        answer: 'We build Google Search Ads, Display Ads, and Performance Max campaigns customized to your customer acquisition goals.'
      },
      {
        question: 'How is conversion tracking handled?',
        answer: 'We configure complete conversion tracking using Google Tag Manager and Google Analytics to track form submissions, calls, and sales.'
      },
      {
        question: 'Do you help align landing pages with ads?',
        answer: 'Yes. Ad relevance, message match, and landing page user experience are reviewed to improve quality scores and conversion rates.'
      }
    ],

    seoTitle: 'Google Ads Management Services | Vivek Singh',
    metaDescription:
      'Google Ads management focused on Search, Performance Max, conversion tracking, campaign optimisation and measurable lead generation.',
    ogTitle: 'Google Ads Management Services | Vivek Singh',
    ogDescription:
      'Google Ads management focused on Search, Performance Max, conversion tracking, campaign optimisation and measurable lead generation.',
    canonicalUrl: `${BASE_URL}/services/google-ads-management`
  },

  // 2. SEO SERVICES
  {
    id: 'seo',
    name: 'SEO Services',
    slug: 'seo',
    h1: 'SEO That Makes Your Website Easier to Find, Understand and Trust',
    shortDescription:
      'Build sustainable organic visibility with technical, on-page and off-page SEO focused on search intent, useful content and a strong website foundation.',
    fullDescription:
      'Build sustainable organic visibility with technical, on-page and off-page SEO focused on search intent, useful content and a strong website foundation.',


    includes: [
      'Technical SEO',
      'Keyword research',
      'Search-intent mapping',
      'On-page SEO',
      'Content optimisation',
      'Internal linking',
      'Off-page SEO',
      'Backlink strategy',
      'Local SEO',
      'AEO',
      'GEO',
      'Search Console analysis',
      'SEO performance tracking'
    ],

    process: [
      { step: 1, title: 'Website & SEO Audit', description: 'Examine site architecture, indexing status, Core Web Vitals, and technical health.' },
      { step: 2, title: 'Keyword Research', description: 'Identify primary, secondary, and long-tail keyword queries relevant to user intent.' },
      { step: 3, title: 'Search-Intent Mapping', description: 'Assign discovered search queries to specific URLs based on commercial or informational intent.' },
      { step: 4, title: 'Technical Fixes', description: 'Resolve crawl bottlenecks, canonical issues, sitemap errors, and mobile responsiveness obstacles.' },
      { step: 5, title: 'On-Page Optimisation', description: 'Refine heading hierarchy, metadata, image alt tags, internal links, and semantic JSON-LD schema.' },
      { step: 6, title: 'Content Optimisation', description: 'Structure readable, natural page copy addressing user questions without keyword stuffing.' },
      { step: 7, title: 'Authority Building', description: 'Implement ethical backlink strategies, local business citations, and off-page signals.' },
      { step: 8, title: 'Performance Monitoring', description: 'Track indexation, impressions, clicks, and ranking trajectories using Google Search Console.' }
    ],

    targetAudience: [
      'Businesses looking to establish dependable organic search presence',
      'Websites requiring technical SEO audits and crawl error resolution',
      'Brands preparing content for traditional search, AEO, and GEO',
      'Local businesses and e-commerce stores wanting sustained organic growth'
    ],

    keywords: {
      primary: [
        { term: 'SEO Services', intent: 'commercial' },
        { term: 'SEO Agency India', intent: 'commercial' }
      ],
      secondary: [
        { term: 'SEO Services India', intent: 'commercial' },
        { term: 'SEO Company India', intent: 'commercial' },
        { term: 'Technical SEO', intent: 'commercial' },
        { term: 'On-Page SEO', intent: 'commercial' },
        { term: 'Off-Page SEO', intent: 'commercial' },
        { term: 'SEO Audit', intent: 'commercial' },
        { term: 'Keyword Research', intent: 'commercial' },
        { term: 'Local SEO', intent: 'commercial' },
        { term: 'SEO Optimization', intent: 'commercial' }
      ],
      longTail: [
        { term: 'SEO services for small businesses', intent: 'commercial' },
        { term: 'affordable SEO services India', intent: 'commercial' },
        { term: 'technical SEO services India', intent: 'commercial' },
        { term: 'on page SEO services India', intent: 'commercial' },
        { term: 'off page SEO services India', intent: 'commercial' },
        { term: 'local SEO services for businesses', intent: 'commercial' },
        { term: 'SEO agency for ecommerce website', intent: 'commercial' },
        { term: 'SEO services for new website', intent: 'commercial' },
        { term: 'SEO consultant India', intent: 'commercial' },
        { term: 'SEO audit services India', intent: 'commercial' }
      ],
      relatedTerms: [
        'keyword mapping',
        'search intent',
        'internal linking',
        'schema markup',
        'structured data',
        'Core Web Vitals',
        'crawlability',
        'indexation',
        'backlink building',
        'content optimisation',
        'AEO',
        'GEO'
      ]
    },

    searchIntent: 'commercial',

    faqs: [
      {
        question: 'What does technical SEO involve?',
        answer: 'Technical SEO includes resolving indexation, crawl errors, sitemaps, canonical tags, page speed, mobile compatibility, and structured data.'
      },
      {
        question: 'What are AEO and GEO?',
        answer: 'AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) structure website content and entities so AI engines can easily reference and cite your site in search summaries.'
      },
      {
        question: 'How do you prevent keyword stuffing in SEO content?',
        answer: 'We keep keyword datasets isolated for strategy and write natural, helpful copy centered around search intent, topical relevance, and semantic entities.'
      }
    ],

    seoTitle: 'SEO Services | Technical, On-Page & Off-Page SEO | Vivek Singh',
    metaDescription:
      'SEO services covering technical SEO, keyword research, on-page optimisation, off-page SEO, AEO and GEO for modern websites.',
    ogTitle: 'SEO Services | Technical, On-Page & Off-Page SEO | Vivek Singh',
    ogDescription:
      'SEO services covering technical SEO, keyword research, on-page optimisation, off-page SEO, AEO and GEO for modern websites.',
    canonicalUrl: `${BASE_URL}/services/seo`
  },


  // 3. WEBSITE DEVELOPMENT
  {
    id: 'website-development',
    name: 'Website Development',
    slug: 'website-development',
    h1: 'Websites Built for Performance, Experience and Conversion',
    shortDescription:
      'I build modern websites and digital experiences using technologies such as React, Next.js, WordPress and Shopify — with responsive UX, conversion-focused structure and interactive motion where it adds value.',
    fullDescription:
      'I build modern websites and digital experiences using technologies such as React, Next.js, WordPress and Shopify — with responsive UX, conversion-focused structure and interactive motion where it adds value.',
    positioning: 'Not just a website. A digital experience built around what the business needs it to do.',

    includes: [
      'Business websites',
      'Landing pages',
      'E-commerce websites',
      'Custom websites',
      'React websites',
      'Next.js websites',
      'Shopify stores',
      'WordPress websites',
      'Admin panels',
      'Payment gateway integration',
      'Interactive websites',
      'Motion-focused interfaces'
    ],

    process: [
      { step: 1, title: 'Understand Business Objective', description: 'Clarify the commercial purpose, target user personas, and technical requirements.' },
      { step: 2, title: 'Plan Information Architecture', description: 'Design URL structures, page hierarchies, navigation flows, and conversion paths.' },
      { step: 3, title: 'Design User Experience', description: 'Structure wireframes and responsive UI components focused on visual clarity and user engagement.' },
      { step: 4, title: 'Develop the Website', description: 'Code the application using clean React, Next.js, WordPress, or Shopify architectures.' },
      { step: 5, title: 'Integrate Required Functionality', description: 'Connect payment gateways, custom admin panels, APIs, forms, and database services.' },
      { step: 6, title: 'Optimise Performance', description: 'Tune Core Web Vitals, asset loading, bundle size, caching, and smooth motion states.' },
      { step: 7, title: 'Test Responsive Behaviour', description: 'Perform thorough testing across mobile, tablet, and desktop viewports and browsers.' },
      { step: 8, title: 'Deploy', description: 'Publish to production environments with live domain routing, SSL security, and search console setup.' }
    ],

    targetAudience: [
      'Businesses requiring custom, high-converting digital storefronts',
      'Startups needing modern React and Next.js applications',
      'E-commerce brands seeking custom Shopify or WordPress solutions',
      'Companies wanting interactive motion experiences that maintain fast load times'
    ],

    keywords: {
      primary: [
        { term: 'Website Development', intent: 'commercial' },
        { term: 'Web Development Services', intent: 'commercial' }
      ],
      secondary: [
        { term: 'Website Development Company', intent: 'commercial' },
        { term: 'Web Development Company', intent: 'commercial' },
        { term: 'Custom Website Development', intent: 'commercial' },
        { term: 'Web Development Agency', intent: 'commercial' },
        { term: 'Ecommerce Website Development', intent: 'commercial' },
        { term: 'Custom Web Development', intent: 'commercial' },
        { term: 'React Development', intent: 'commercial' },
        { term: 'Next.js Development', intent: 'commercial' },
        { term: 'Business Website Development', intent: 'commercial' }
      ],
      longTail: [
        { term: 'website development services in India', intent: 'commercial' },
        { term: 'custom website development India', intent: 'commercial' },
        { term: 'ecommerce website development services', intent: 'commercial' },
        { term: 'business website development India', intent: 'commercial' },
        { term: 'React website development services', intent: 'commercial' },
        { term: 'Next.js website development', intent: 'commercial' },
        { term: 'custom ecommerce website development', intent: 'commercial' },
        { term: 'SEO friendly website development', intent: 'commercial' },
        { term: 'responsive website development services', intent: 'commercial' },
        { term: 'website development for small businesses', intent: 'commercial' }
      ],
      relatedTerms: [
        'React',
        'Next.js',
        'JavaScript',
        'WordPress',
        'Shopify',
        'Elementor',
        'ecommerce',
        'admin panel',
        'payment gateway',
        'landing pages',
        'responsive design',
        'interactive websites'
      ]
    },

    searchIntent: 'commercial',

    faqs: [
      {
        question: 'Which platforms and frameworks do you use for web development?',
        answer: 'We build custom applications using React, Next.js, and JavaScript, as well as CMS platforms like WordPress/Elementor and Shopify for e-commerce.'
      },
      {
        question: 'Can you integrate payment gateways and custom admin panels?',
        answer: 'Yes. We implement secure payment gateway integrations and custom admin panels for order, lead, and content management.'
      },
      {
        question: 'How do you ensure websites perform well on mobile devices?',
        answer: 'Every website is engineered mobile-first with responsive layout testing, fast asset loading, and optimized smooth scrolling.'
      }
    ],

    seoTitle: 'Website Development Services | React, Next.js & E-commerce',
    metaDescription:
      'Modern website development using React, Next.js, WordPress and Shopify with responsive UX, e-commerce functionality and interactive experiences.',
    ogTitle: 'Website Development Services | React, Next.js & E-commerce',
    ogDescription:
      'Modern website development using React, Next.js, WordPress and Shopify with responsive UX, e-commerce functionality and interactive experiences.',
    canonicalUrl: `${BASE_URL}/services/website-development`
  },

  // 4. SOCIAL MEDIA MARKETING
  {
    id: 'social-media-marketing',
    name: 'Social Media Marketing',
    slug: 'social-media-marketing',
    h1: 'Social Media Built Around Content, Attention and Action',
    shortDescription:
      'Build a stronger social presence with content planning, trend research, scripts, creative direction and conversion-focused calls to action across platforms such as Instagram and YouTube.',
    fullDescription:
      'Build a stronger social presence with content planning, trend research, scripts, creative direction and conversion-focused calls to action across platforms such as Instagram and YouTube.',
    positioning: 'Content should not exist just to fill a feed. It should have a reason to exist.',

    includes: [
      'Social media management',
      'Content calendars',
      'Trend research',
      'Content strategy',
      'Script writing',
      'Instagram content',
      'YouTube content',
      'Reels planning',
      'Ad creative concepts',
      'CTA strategy',
      'Social media campaigns'
    ],

    process: [
      { step: 1, title: 'Understand Brand & Audience', description: 'Define the target demographic, core brand voice, positioning, and content pillars.' },
      { step: 2, title: 'Research Trends and Competitors', description: 'Analyze high-performing industry formats, trending audio, visual hooks, and audience conversations.' },
      { step: 3, title: 'Build Content Strategy', description: 'Structure themes balanced across awareness, education, trust building, and conversion calls-to-action.' },
      { step: 4, title: 'Create Content Calendar', description: 'Establish consistent posting schedules and batch production timelines across channels.' },
      { step: 5, title: 'Develop Scripts & Creative Concepts', description: 'Write engaging video scripts for Reels/YouTube and design compelling visual creative concepts.' },
      { step: 6, title: 'Publish / Manage Content', description: 'Deploy content according to schedule with optimized captions, hashtags, and engagement hooks.' },
      { step: 7, title: 'Analyse Engagement', description: 'Evaluate retention rates, shares, saves, profile visits, and inbound message volume.' },
      { step: 8, title: 'Improve the Strategy', description: 'Iterate formats and scale top-performing creative angles based on actual audience data.' }
    ],

    targetAudience: [
      'Brands aiming to build active communities on Instagram and YouTube',
      'Businesses requiring structured monthly content calendars and video scripts',
      'Companies wanting creative ad concepts for organic and paid social distribution',
      'Founders seeking a strategic, conversion-focused social media presence'
    ],

    keywords: {
      primary: [
        { term: 'Social Media Marketing', intent: 'commercial' },
        { term: 'Social Media Marketing Services', intent: 'commercial' }
      ],
      secondary: [
        { term: 'Social Media Marketing Agency', intent: 'commercial' },
        { term: 'Social Media Management', intent: 'commercial' },
        { term: 'Social Media Management Services', intent: 'commercial' },
        { term: 'Instagram Marketing', intent: 'commercial' },
        { term: 'Facebook Marketing', intent: 'commercial' },
        { term: 'YouTube Marketing', intent: 'commercial' },
        { term: 'Social Media Strategy', intent: 'commercial' },
        { term: 'Social Media Content', intent: 'commercial' },
        { term: 'Social Media Advertising', intent: 'commercial' }
      ],
      longTail: [
        { term: 'social media marketing services India', intent: 'commercial' },
        { term: 'social media management for small businesses', intent: 'commercial' },
        { term: 'Instagram marketing services India', intent: 'commercial' },
        { term: 'social media marketing agency India', intent: 'commercial' },
        { term: 'social media management services India', intent: 'commercial' },
        { term: 'social media content strategy', intent: 'commercial' },
        { term: 'social media marketing for ecommerce', intent: 'commercial' },
        { term: 'Instagram and Facebook marketing services', intent: 'commercial' },
        { term: 'YouTube marketing services India', intent: 'commercial' }
      ],
      relatedTerms: [
        'content calendar',
        'content strategy',
        'Instagram',
        'Facebook',
        'YouTube',
        'Reels',
        'ad creatives',
        'script writing',
        'community management',
        'engagement',
        'CTA strategy',
        'paid social'
      ]
    },

    searchIntent: 'commercial',

    faqs: [
      {
        question: 'What social channels do you specialize in?',
        answer: 'We focus on Instagram, YouTube, and Facebook with content planning, script writing, creative development, and CTA strategies.'
      },
      {
        question: 'Do you provide video script writing for Reels and YouTube?',
        answer: 'Yes. We research platform trends and draft hook-driven, structured scripts designed for high retention and engagement.'
      },
      {
        question: 'How does social content drive business actions?',
        answer: 'Every piece of content is aligned with clear call-to-action (CTA) frameworks directing attention towards profile visits, link clicks, and enquiries.'
      }
    ],

    seoTitle: 'Social Media Marketing Services | Content & Social Strategy',
    metaDescription:
      'Social media marketing covering content strategy, calendars, trend research, scripts, creatives and conversion-focused social campaigns.',
    ogTitle: 'Social Media Marketing Services | Content & Social Strategy',
    ogDescription:
      'Social media marketing covering content strategy, calendars, trend research, scripts, creatives and conversion-focused social campaigns.',
    canonicalUrl: `${BASE_URL}/services/social-media-marketing`
  },

  // 5. PERFORMANCE MARKETING
  {
    id: 'performance-marketing',
    name: 'Performance Marketing',
    slug: 'performance-marketing',
    h1: 'Performance Marketing Built Around Measurable Growth',
    shortDescription:
      'Connect paid advertising, landing pages, tracking and optimisation into one performance-focused system designed around measurable business objectives.',
    fullDescription:
      'Connect paid advertising, landing pages, tracking and optimisation into one performance-focused system designed around measurable business objectives.',
    positioning: 'Traffic is only the beginning. The real question is what happens after the click.',

    includes: [
      'Google Ads',
      'Meta Ads',
      'Paid search',
      'Paid social',
      'Lead generation',
      'Landing page optimisation',
      'Conversion tracking',
      'Campaign optimisation',
      'Funnel optimisation',
      'Performance analysis',
      'Retargeting strategy',
      'ROAS / CPL-focused optimisation'
    ],

    process: [
      { step: 1, title: 'Define Business Objective', description: 'Define campaign objectives, KPI benchmarks, and target metrics aligned with business goals.' },
      { step: 2, title: 'Identify Audience & Intent', description: 'Segment search intent on Google Ads and demographic/interest behavioral segments on Meta Ads.' },
      { step: 3, title: 'Build Acquisition Strategy', description: 'Map out the full-funnel customer journey from prospecting to retargeting.' },
      { step: 4, title: 'Create Campaigns', description: 'Build structured ad sets, creative variants, compelling copy hooks, and bidding configurations.' },
      { step: 5, title: 'Connect Landing Pages', description: 'Ensure destination landing pages feature tight message-match, fast speeds, and clear conversion paths.' },
      { step: 6, title: 'Implement Tracking', description: 'Implement tracking using Google Tag Manager, Google Analytics 4, platform tracking and relevant conversion events.' },
      { step: 7, title: 'Analyse Performance', description: 'Evaluate cost per lead, click-through rates, conversion friction points, and attribution flow.' },
      { step: 8, title: 'Optimise and Iterate', description: 'Review underperforming ad sets, iterate creative variations, adjust budgets, and optimize campaign performance.' }
    ],

    targetAudience: [
      'Businesses looking for measurable lead generation through paid search and paid social',
      'E-commerce and D2C brands managing campaigns across Google and Meta',
      'Travel and real estate operators seeking targeted buyer and booking enquiries',
      'Businesses wanting structured, data-informed paid advertising management'
    ],

    keywords: {
      primary: [
        { term: 'Performance Marketing', intent: 'commercial' },
        { term: 'Performance Marketing Agency India', intent: 'commercial' }
      ],
      secondary: [
        { term: 'Performance Marketing Services', intent: 'commercial' },
        { term: 'Performance Marketing Agency', intent: 'commercial' },
        { term: 'Paid Advertising', intent: 'commercial' },
        { term: 'PPC Advertising', intent: 'commercial' },
        { term: 'Google Ads', intent: 'commercial' },
        { term: 'Meta Ads', intent: 'commercial' },
        { term: 'Paid Media', intent: 'commercial' },
        { term: 'Conversion Rate Optimization', intent: 'commercial' },
        { term: 'ROAS Optimization', intent: 'commercial' }
      ],
      longTail: [
        { term: 'performance marketing services India', intent: 'commercial' },
        { term: 'performance marketing agency India', intent: 'commercial' },
        { term: 'performance marketing for ecommerce', intent: 'commercial' },
        { term: 'performance marketing for small businesses', intent: 'commercial' },
        { term: 'Google and Meta ads management India', intent: 'commercial' },
        { term: 'ROI driven performance marketing', intent: 'commercial' },
        { term: 'performance marketing for lead generation', intent: 'commercial' },
        { term: 'paid advertising agency India', intent: 'commercial' },
        { term: 'performance marketing for D2C brands', intent: 'commercial' },
        { term: 'performance marketing for ecommerce businesses', intent: 'commercial' }
      ],
      relatedTerms: [
        'Google Ads',
        'Meta Ads',
        'paid search',
        'paid social',
        'media buying',
        'conversion tracking',
        'CRO',
        'remarketing',
        'ROAS',
        'CPA',
        'CPL',
        'funnel optimisation',
        'attribution'
      ]
    },

    searchIntent: 'commercial',

    faqs: [
      {
        question: 'What is the focus of performance marketing?',
        answer: 'Performance marketing aligns paid traffic across Google and Meta, landing page experience, and conversion tracking to evaluate campaign performance against business goals.'
      },
      {
        question: 'How do Google Ads and Meta Ads complement each other in a funnel?',
        answer: 'Google Ads captures active search intent from prospects looking for solutions right now, while Meta Ads builds awareness, tests creative angles, and retargets interested visitors.'
      },
      {
        question: 'How is performance measured and reported?',
        answer: 'Conversion tracking can be implemented using Google Tag Manager and Google Analytics 4 to measure relevant events and evaluate campaign performance.'
      }
    ],

    seoTitle: 'Performance Marketing Services | Google & Meta Ads',
    metaDescription:
      'Performance marketing combining Google Ads, Meta Ads, landing pages, conversion tracking and campaign optimisation around measurable goals.',
    ogTitle: 'Performance Marketing Services | Google & Meta Ads',
    ogDescription:
      'Performance marketing combining Google Ads, Meta Ads, landing pages, conversion tracking and campaign optimisation around measurable goals.',
    canonicalUrl: `${BASE_URL}/services/performance-marketing`
  }

];

// Automatically generate standards-compliant schemas for each service
servicesData.forEach((service) => {
  service.serviceSchema = generateServiceSchema(service, BASE_URL);
  service.faqSchema = generateFAQSchema(service.faqs) || undefined;
  service.breadcrumbSchema = generateBreadcrumbSchema(
    [
      { name: 'Home', url: '/' },
      { name: 'Services', url: '/#services' },
      { name: service.name, url: `/services/${service.slug}` }
    ],
    BASE_URL
  );
});

/**
 * Utility helper to get a single service by slug
 */
export function getServiceBySlug(slug: string): ServiceItem | undefined {
  const normalized = slug === 'seo-services' ? 'seo' : slug;
  return servicesData.find((s) => s.slug === normalized || s.slug === slug || s.id === normalized || s.id === slug);
}

