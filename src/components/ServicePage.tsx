/**
 * Reusable Service Page Component
 * 
 * Renders real, accessible, crawlable semantic HTML for any service route
 * (/services/:slug) by dynamically consuming src/data/services.ts and applying
 * the centralized SEO metadata and JSON-LD schema generators.
 */

import React, { useEffect } from 'react';
import { getServiceBySlug, servicesData } from '../data/services';
import { buildServiceSEO, applySEOToHead } from '../data/seo';
import '../styles/servicePage.css';

interface ServicePageProps {
  slug: string;
  onNavigate?: (path: string) => void;
}

// Map related service recommendations contextually for internal linking
const RELATED_SERVICES_MAP: Record<string, string[]> = {
  'google-ads-management': ['performance-marketing', 'website-development', 'seo-services'],
  'seo-services': ['website-development', 'google-ads-management', 'performance-marketing'],
  'website-development': ['seo-services', 'performance-marketing', 'google-ads-management'],
  'social-media-marketing': ['performance-marketing', 'google-ads-management', 'website-development'],
  'performance-marketing': ['google-ads-management', 'social-media-marketing', 'seo-services']
};

export const ServicePage: React.FC<ServicePageProps> = ({ slug, onNavigate }) => {
  const service = getServiceBySlug(slug);

  useEffect(() => {
    if (service) {
      const seoConfig = buildServiceSEO(service);
      applySEOToHead(seoConfig);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [service, slug]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  if (!service) {
    return (
      <div className="service-page-container">
        <header className="service-nav-bar">
          <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="service-brand">
            Vivek Singh · DIGITA CURVE
          </a>
          <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="service-back-btn">
            ← Back to Home
          </a>
        </header>

        <main className="service-main-content" style={{ textAlign: 'center', paddingTop: '5rem' }}>
          <h1 className="service-h1">Service Not Found</h1>
          <p className="service-hero-desc" style={{ margin: '0 auto 2rem' }}>
            The requested service could not be located. Explore our available services below:
          </p>
          <div className="service-related-grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {servicesData.map((s) => (
              <a
                key={s.id}
                href={`/services/${s.slug}`}
                onClick={(e) => handleLinkClick(e, `/services/${s.slug}`)}
                className="service-related-card"
              >
                <h2 className="service-related-name">{s.name}</h2>
                <p className="service-related-desc">{s.shortDescription}</p>
                <span className="service-related-link-text">Explore Service →</span>
              </a>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Resolve related services for internal linking
  const relatedSlugs = RELATED_SERVICES_MAP[service.id] || [];
  const relatedServices = servicesData.filter((s) => relatedSlugs.includes(s.id));

  return (
    <div className="service-page-container">
      {/* Navigation Bar */}
      <header className="service-nav-bar">
        <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="service-brand">
          Vivek Singh · DIGITA CURVE
        </a>

        <nav aria-label="Services Navigation" className="service-nav-links">
          {servicesData.map((s) => (
            <a
              key={s.id}
              href={`/services/${s.slug}`}
              onClick={(e) => handleLinkClick(e, `/services/${s.slug}`)}
              className={`service-nav-link ${s.id === service.id ? 'active' : ''}`}
            >
              {s.name}
            </a>
          ))}
        </nav>

        <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="service-back-btn">
          ← 3D Experience
        </a>
      </header>

      {/* 1. Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="service-breadcrumb-nav">
        <ol className="service-breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href="/" onClick={(e) => handleLinkClick(e, '/')}>
              <span itemProp="name">Home</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <span className="separator" aria-hidden="true">/</span>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href="/#services" onClick={(e) => handleLinkClick(e, '/')}>
              <span itemProp="name">Services</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <span className="separator" aria-hidden="true">/</span>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="current">
            <span itemProp="name">{service.name}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Main Semantic Content */}
      <main className="service-main-content">
        {/* 2. Hero Section */}
        <section className="service-hero-section" aria-labelledby="service-h1">
          <span className="service-badge">Service Capability</span>
          <h1 id="service-h1" className="service-h1">{service.h1}</h1>
          <p className="service-hero-desc">{service.shortDescription}</p>

          <div className="service-cta-group">
            <a href="mailto:viveksingh.dmark@gmail.com" className="service-primary-cta">
              Discuss Project / Growth Goals
            </a>
            <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="service-secondary-cta">
              Explore 3D Portfolio
            </a>
          </div>
        </section>

        {/* 3. What the Service Includes */}
        <section className="service-includes-section" aria-labelledby="includes-heading">
          <h2 id="includes-heading" className="service-section-title">What This Service Includes</h2>
          <ul className="service-includes-grid">
            {service.includes.map((item, index) => (
              <li key={index} className="service-include-item">
                <span className="service-include-icon" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Positioning Statement (if available) */}
        {service.positioning && (
          <section className="service-positioning-section" aria-label="Service Positioning">
            <div className="service-positioning-box">
              <p className="service-positioning-quote">“{service.positioning}”</p>
            </div>
          </section>
        )}

        {/* 5. Service Process (8-Step Workflow) */}
        <section className="service-process-section" aria-labelledby="process-heading">
          <h2 id="process-heading" className="service-section-title">8-Step Implementation Process</h2>
          <div className="service-process-grid">
            {service.process.map((step) => (
              <article key={step.step} className="service-process-card">
                <span className="service-step-num">Step {step.step}</span>
                <h3 className="service-step-title">{step.title}</h3>
                <p className="service-step-desc">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 6. Target Audience / Who the Service is For */}
        <section className="service-audience-section" aria-labelledby="audience-heading">
          <h2 id="audience-heading" className="service-section-title">Who This Service Is For</h2>
          <ul className="service-audience-list">
            {service.targetAudience.map((audience, index) => (
              <li key={index} className="service-audience-item">
                <span className="service-audience-bullet" aria-hidden="true">●</span>
                <span>{audience}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Frequently Asked Questions */}
        <section className="service-faqs-section" aria-labelledby="faqs-heading">
          <h2 id="faqs-heading" className="service-section-title">Frequently Asked Questions</h2>
          <div className="service-faqs-list">
            {service.faqs.map((faq, index) => (
              <article key={index} className="service-faq-item">
                <h3 className="service-faq-question">{faq.question}</h3>
                <p className="service-faq-answer">{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 8. Related Services (Internal Linking) */}
        {relatedServices.length > 0 && (
          <section className="service-related-section" aria-labelledby="related-heading">
            <h2 id="related-heading" className="service-section-title">Related Services & Complementary Capabilities</h2>
            <div className="service-related-grid">
              {relatedServices.map((related) => (
                <a
                  key={related.id}
                  href={`/services/${related.slug}`}
                  onClick={(e) => handleLinkClick(e, `/services/${related.slug}`)}
                  className="service-related-card"
                >
                  <h3 className="service-related-name">{related.name}</h3>
                  <p className="service-related-desc">{related.shortDescription}</p>
                  <span className="service-related-link-text">Learn more about {related.name} →</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 9. Final CTA */}
        <section className="service-final-cta-section" aria-labelledby="final-cta-heading">
          <div className="service-final-cta-card">
            <h2 id="final-cta-heading" className="service-final-cta-title">Ready to Discuss Your Objectives?</h2>
            <p className="service-final-cta-desc">
              Whether you need targeted paid acquisition, search visibility, custom web development, or a full performance marketing setup, let’s explore the right strategy.
            </p>
            <div className="service-cta-group" style={{ justifyContent: 'center' }}>
              <a href="mailto:viveksingh.dmark@gmail.com" className="service-primary-cta">
                Get In Touch via Email
              </a>
              <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="service-secondary-cta">
                Return to 3D Experience
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
