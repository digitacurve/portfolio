/**
 * SEO Engine & Metadata Generator
 * 
 * Central utility to generate, assemble, and inject page metadata,
 * OpenGraph, Twitter Cards, canonical tags, and JSON-LD structured data.
 */

import type { BaseSEOMetadata, ServiceItem, BreadcrumbItem, SchemaJsonLd } from './types';
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generatePersonSchema,
  generateOrganizationSchema,
  generateCaseStudySchema
} from './schemaGenerators';


export interface PageSEOConfig {
  title: string;
  description: string;
  canonicalUrl: string;
  keywords?: string[];
  ogImage?: string;
  type?: 'website' | 'article' | 'profile';
  breadcrumbs?: BreadcrumbItem[];
  schemas?: SchemaJsonLd[];
}

export interface GeneratedPageSEO {
  meta: BaseSEOMetadata;
  jsonLdSchemas: SchemaJsonLd[];
}

const DEFAULT_BASE_URL = 'https://digitacurve.com';

/**
 * Builds standard SEO configuration for a generic page
 */
export function buildPageSEO(config: PageSEOConfig, baseUrl: string = DEFAULT_BASE_URL): GeneratedPageSEO {
  const fullCanonical = config.canonicalUrl.startsWith('http')
    ? config.canonicalUrl
    : `${baseUrl}${config.canonicalUrl.startsWith('/') ? config.canonicalUrl : `/${config.canonicalUrl}`}`;

  const meta: BaseSEOMetadata = {
    title: config.title,
    metaDescription: config.description,
    canonicalUrl: fullCanonical,
    keywords: config.keywords,
    og: {
      title: config.title,
      description: config.description,
      url: fullCanonical,
      type: config.type || 'website',
      image: config.ogImage || `${baseUrl}/assets/meta/social.jpg`,
      siteName: 'DIGITA CURVE'
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      image: config.ogImage || `${baseUrl}/assets/meta/social.jpg`
    }
  };

  const schemas: SchemaJsonLd[] = [
    generateOrganizationSchema(baseUrl),
    generatePersonSchema(baseUrl),
    ...(config.schemas || [])
  ];

  if (config.breadcrumbs && config.breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(config.breadcrumbs, baseUrl));
  }

  return {
    meta,
    jsonLdSchemas: schemas
  };
}

/**
 * Builds complete SEO configuration and JSON-LD schemas for a specific ServiceItem
 */
export function buildServiceSEO(service: ServiceItem, baseUrl: string = DEFAULT_BASE_URL): GeneratedPageSEO {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/#services' },
    { name: service.name, url: `/services/${service.slug}` }
  ];

  const serviceSchema = generateServiceSchema(service, baseUrl);
  const faqSchema = generateFAQSchema(service.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs, baseUrl);

  const schemas: SchemaJsonLd[] = [
    serviceSchema,
    breadcrumbSchema,
    generateOrganizationSchema(baseUrl)
  ];

  if (faqSchema) {
    schemas.push(faqSchema);
  }

  // Attach generated schemas back to the ServiceItem for export/inspection
  service.serviceSchema = serviceSchema;
  service.faqSchema = faqSchema || undefined;
  service.breadcrumbSchema = breadcrumbSchema;

  return {
    meta: {
      title: service.seoTitle,
      metaDescription: service.metaDescription,
      canonicalUrl: service.canonicalUrl || `${baseUrl}/services/${service.slug}`,
      keywords: [
        ...service.keywords.primary.map((k) => k.term),
        ...service.keywords.secondary.map((k) => k.term),
        ...service.keywords.relatedTerms
      ],
      og: {
        title: service.ogTitle || service.seoTitle,
        description: service.ogDescription || service.metaDescription,
        url: service.canonicalUrl || `${baseUrl}/services/${service.slug}`,
        type: 'website',
        siteName: 'DIGITA CURVE'
      },
      twitter: {
        card: 'summary_large_image',
        title: service.ogTitle || service.seoTitle,
        description: service.ogDescription || service.metaDescription
      }

    },
    jsonLdSchemas: schemas
  };
}

/**
 * Builds complete SEO configuration and JSON-LD schemas for a specific CaseStudyItem
 */
export function buildCaseStudySEO(
  caseStudy: import('./types').CaseStudyItem,
  baseUrl: string = DEFAULT_BASE_URL
): GeneratedPageSEO {
  const fullCanonical = caseStudy.seo.canonicalUrl || `${baseUrl}/work/${caseStudy.slug}`;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
    { name: caseStudy.title, url: `/work/${caseStudy.slug}` }
  ];

  const caseStudySchema = generateCaseStudySchema(caseStudy, baseUrl);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs, baseUrl);
  const faqSchema = caseStudy.faqs ? generateFAQSchema(caseStudy.faqs) : null;

  const schemas: SchemaJsonLd[] = [
    caseStudySchema,
    breadcrumbSchema,
    generateOrganizationSchema(baseUrl),
    generatePersonSchema(baseUrl)
  ];

  if (faqSchema) {
    schemas.push(faqSchema);
  }

  // Attach schemas back to the case study
  caseStudy.caseStudySchema = caseStudySchema;
  caseStudy.breadcrumbSchema = breadcrumbSchema;

  const allKeywords = [
    ...caseStudy.keywords.primary.map((k) => k.term),
    ...caseStudy.keywords.secondary.map((k) => k.term),
    ...(caseStudy.keywords.relatedTerms || [])
  ];

  return {
    meta: {
      title: caseStudy.seo.seoTitle,
      metaDescription: caseStudy.seo.metaDescription,
      canonicalUrl: fullCanonical,
      keywords: allKeywords,
      og: {
        title: caseStudy.seo.ogTitle || caseStudy.seo.seoTitle,
        description: caseStudy.seo.ogDescription || caseStudy.seo.metaDescription,
        url: fullCanonical,
        type: 'article',
        image: caseStudy.seo.image || `${baseUrl}/assets/meta/social.jpg`,
        siteName: 'DIGITA CURVE'
      },
      twitter: {
        card: 'summary_large_image',
        title: caseStudy.seo.ogTitle || caseStudy.seo.seoTitle,
        description: caseStudy.seo.ogDescription || caseStudy.seo.metaDescription,
        image: caseStudy.seo.image || `${baseUrl}/assets/meta/social.jpg`
      }
    },
    jsonLdSchemas: schemas
  };
}

/**
 * Safely applies SEO metadata and JSON-LD script tags to the DOM document head.
 */
export function applySEOToHead(seo: GeneratedPageSEO): void {

  if (typeof document === 'undefined') return;

  // Title
  document.title = seo.meta.title;

  // Helper function to update/create meta tags
  const setMeta = (attr: string, key: string, content?: string) => {
    if (!content) return;
    let elem = document.querySelector(`meta[${attr}="${key}"]`);
    if (!elem) {
      elem = document.createElement('meta');
      elem.setAttribute(attr, key);
      document.head.appendChild(elem);
    }
    elem.setAttribute('content', content);
  };

  // Helper function for link tags (canonical)
  const setLink = (rel: string, href: string) => {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', rel);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };

  setMeta('name', 'description', seo.meta.metaDescription);
  if (seo.meta.keywords && seo.meta.keywords.length > 0) {
    setMeta('name', 'keywords', seo.meta.keywords.join(', '));
  }
  setLink('canonical', seo.meta.canonicalUrl);

  // OpenGraph
  setMeta('property', 'og:title', seo.meta.og.title);
  setMeta('property', 'og:description', seo.meta.og.description);
  setMeta('property', 'og:url', seo.meta.og.url);
  setMeta('property', 'og:type', seo.meta.og.type || 'website');
  if (seo.meta.og.image) setMeta('property', 'og:image', seo.meta.og.image);
  if (seo.meta.og.siteName) setMeta('property', 'og:site_name', seo.meta.og.siteName);

  // Twitter
  setMeta('name', 'twitter:card', seo.meta.twitter.card || 'summary_large_image');
  setMeta('name', 'twitter:title', seo.meta.twitter.title);
  setMeta('name', 'twitter:description', seo.meta.twitter.description);
  if (seo.meta.twitter.image) setMeta('name', 'twitter:image', seo.meta.twitter.image);

  // JSON-LD Scripts injection
  const SCRIPT_ID_PREFIX = 'seo-jsonld-schema-';
  // Remove existing injected JSON-LD scripts
  document.querySelectorAll(`script[id^="${SCRIPT_ID_PREFIX}"]`).forEach((el) => el.remove());

  // Inject current schemas
  seo.jsonLdSchemas.forEach((schema, idx) => {
    const script = document.createElement('script');
    script.id = `${SCRIPT_ID_PREFIX}${idx}`;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  });
}
