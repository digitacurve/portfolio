/**
 * Schema.org JSON-LD Generators
 * 
 * Generates standards-compliant, validateable structured data for
 * Service, FAQPage, BreadcrumbList, Person, and Organization schemas.
 */

import type { FAQItem, BreadcrumbItem, ServiceItem, SchemaJsonLd } from './types';

const DEFAULT_BASE_URL = 'https://digitacurve.com';

/**
 * Generates Schema.org "Service" JSON-LD
 */
export function generateServiceSchema(
  service: ServiceItem,
  baseUrl: string = DEFAULT_BASE_URL
): SchemaJsonLd {
  const serviceUrl = service.canonicalUrl || `${baseUrl}/services/${service.slug}`;

  const offers = (service.includes || []).map((item, idx) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: item,
      description: `${item} deliverable as part of ${service.name}`
    },
    position: idx + 1
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    headline: service.h1,
    description: service.shortDescription || service.fullDescription,
    url: serviceUrl,
    provider: {
      '@type': 'Organization',
      name: 'DIGITA CURVE',
      url: baseUrl
    },

    serviceType: service.name,
    areaServed: {
      '@type': 'Country',
      name: 'India'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.name} Deliverables`,
      itemListElement: offers
    }
  };
}


/**
 * Generates Schema.org "FAQPage" JSON-LD
 */
export function generateFAQSchema(faqs: FAQItem[]): SchemaJsonLd | null {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Generates Schema.org "BreadcrumbList" JSON-LD
 */
export function generateBreadcrumbSchema(
  items: BreadcrumbItem[],
  baseUrl: string = DEFAULT_BASE_URL
): SchemaJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };
}

/**
 * Generates Schema.org "Person" JSON-LD for Vivek Singh
 */
export function generatePersonSchema(baseUrl: string = DEFAULT_BASE_URL): SchemaJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vivek Singh',
    jobTitle: 'Founding Member & Digital Marketing / Web Development Lead',
    worksFor: {
      '@type': 'Organization',
      name: 'DIGITA CURVE',
      url: baseUrl
    },
    url: baseUrl,
    email: 'mailto:viveksingh.dmark@gmail.com',
    telephone: '+919696190574',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Varanasi',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'India'
    },
    knowsAbout: [
      'Google Ads',
      'Meta Ads',
      'Search Engine Optimization (SEO)',
      'AEO',
      'GEO',
      'React',
      'Next.js',
      'Web Development',
      'E-commerce Development',
      'Local AI Agents',
      'Performance Marketing'
    ],
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Mahatma Gandhi Kashi Vidyapith University, Varanasi'
      }
    ]
  };
}

/**
 * Generates Schema.org "Organization" JSON-LD for DIGITA CURVE
 */
export function generateOrganizationSchema(baseUrl: string = DEFAULT_BASE_URL): SchemaJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DIGITA CURVE',
    url: baseUrl,
    member: {
      '@type': 'Person',
      name: 'Vivek Singh',
      jobTitle: 'Founding Member & Digital Marketing / Web Development Lead'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'viveksingh.dmark@gmail.com',
      telephone: '+919696190574',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi']
    }
  };
}

/**
 * Generates Schema.org "CreativeWork" JSON-LD for Case Studies
 */
export function generateCaseStudySchema(
  caseStudy: import('./types').CaseStudyItem,
  baseUrl: string = DEFAULT_BASE_URL
): SchemaJsonLd {
  const caseStudyUrl = caseStudy.seo.canonicalUrl || `${baseUrl}/work/${caseStudy.slug}`;

  const allKeywords = [
    ...caseStudy.keywords.primary.map((k) => k.term),
    ...caseStudy.keywords.secondary.map((k) => k.term),
    ...(caseStudy.keywords.relatedTerms || [])
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: caseStudy.title,
    headline: caseStudy.title,
    description: caseStudy.shortDescription || caseStudy.fullDescription,
    url: caseStudyUrl,
    genre: caseStudy.category,
    creator: {
      '@type': 'Person',
      name: 'Vivek Singh',
      jobTitle: 'Founding Member & Digital Marketing / Web Development Lead',
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'DIGITA CURVE',
      url: baseUrl
    },
    keywords: allKeywords.join(', '),
    abstract: caseStudy.shortDescription
  };
}

