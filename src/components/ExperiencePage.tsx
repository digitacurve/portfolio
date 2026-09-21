/**
 * Crawlable Experience Page Component
 * 
 * Semantic, accessible, dark-themed Experience page rendering resume-backed
 * professional history from src/data/portfolio.ts with full SEO metadata,
 * schema markup, and internal linking.
 */

import React, { useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { caseStudiesData } from '../data/caseStudies';
import { servicesData } from '../data/services';
import { buildPageSEO, applySEOToHead } from '../data/seo';
import '../styles/caseStudyPage.css';

interface ExperiencePageProps {
  onNavigate?: (path: string) => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onNavigate }) => {
  const { name, experience } = portfolioData;
  const primaryExp = experience[0];

  useEffect(() => {
    const seoConfig = buildPageSEO({
      title: `Experience | ${name} · DIGITA CURVE Founding Member`,
      description: 'Documented professional experience of Vivek Singh as Founding Member and Digital Marketing / Web Development Lead at DIGITA CURVE.',
      canonicalUrl: 'https://digitacurve.com/experience',
      keywords: [
        'Vivek Singh Experience',
        'DIGITA CURVE Founding Member',
        'Digital Marketing Lead Experience',
        'Web Developer Experience Varanasi',
        'Google Ads Specialist Portfolio',
        'Performance Marketer Career'
      ],
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Experience', url: '/experience' }
      ]
    });

    applySEOToHead(seoConfig);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [name]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <div className="case-study-page-container">
      {/* Header Navigation */}
      <header className="case-study-nav-bar">
        <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="case-study-brand">
          Vivek Singh · DIGITA CURVE
        </a>

        <nav aria-label="Experience Navigation Links" className="case-study-nav-links">
          <a
            href="/services"
            onClick={(e) => handleLinkClick(e, '/services')}
            className="case-study-nav-link"
          >
            Services
          </a>
          <a
            href="/work"
            onClick={(e) => handleLinkClick(e, '/work')}
            className="case-study-nav-link"
          >
            Work
          </a>
          <a
            href="/about"
            onClick={(e) => handleLinkClick(e, '/about')}
            className="case-study-nav-link"
          >
            About
          </a>
          <a
            href="/skills"
            onClick={(e) => handleLinkClick(e, '/skills')}
            className="case-study-nav-link"
          >
            Skills
          </a>
          <a href="/experience" className="case-study-nav-link active">
            Experience
          </a>
        </nav>

        <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="case-study-back-btn">
          ← 3D Experience
        </a>
      </header>

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="case-study-breadcrumb-nav">
        <ol className="case-study-breadcrumbs" itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href="/" onClick={(e) => handleLinkClick(e, '/')}>
              <span itemProp="name">Home</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <span className="separator" aria-hidden="true">/</span>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="current">
            <span itemProp="name">Experience</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Main Semantic Content */}
      <main className="case-study-main-content">
        {/* Hero Section */}
        <section className="case-study-hero-section" aria-labelledby="experience-title">
          <div className="case-study-badges-row">
            <span className="case-study-badge">Career & Roles</span>
            <span className="work-count-badge">Founding Member</span>
          </div>

          <h1 id="experience-title" className="case-study-h1">Professional Experience</h1>
          <p className="case-study-hero-desc" style={{ color: '#00e5ff', fontWeight: 600, fontSize: '1.15rem' }}>
            {primaryExp?.role || 'Founding Member & Digital Marketing / Web Development Lead'}
          </p>
          <p className="case-study-hero-desc">
            {primaryExp?.description || 'Leading performance digital advertising, technical search engine optimization, modern frontend engineering, and AI-assisted automation pipelines.'}
          </p>
        </section>

        {/* Primary Role Card */}
        {primaryExp && (
          <section className="case-study-narrative-section" aria-labelledby="company-heading">
            <div className="case-study-badges-row" style={{ marginBottom: '1rem' }}>
              <span className="case-study-badge">{primaryExp.company}</span>
              <span className="work-count-badge">{primaryExp.period}</span>
              {primaryExp.location && <span className="work-count-badge">{primaryExp.location}</span>}
            </div>

            <h2 id="company-heading" className="case-study-section-title" style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
              {primaryExp.role}
            </h2>

            <div className="case-study-tri-grid" style={{ marginTop: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
              <article className="case-study-card-block">
                <span className="case-study-card-label">Focus 01</span>
                <h3 className="case-study-card-title">Performance Marketing & Paid Acquisition</h3>
                <p className="case-study-card-body">
                  Structuring and scaling Google Ads (Search, Display, and Performance Max) and Meta Ads campaigns. Designing intent-aligned landing pages to maximize conversion quality and return on ad spend.
                </p>
              </article>

              <article className="case-study-card-block">
                <span className="case-study-card-label">Focus 02</span>
                <h3 className="case-study-card-title">Tracking, Telemetry & SEO Strategy</h3>
                <p className="case-study-card-body">
                  Implementing measurement infrastructure via Google Tag Manager, GA4, and Google Search Console. Executing technical, on-page, and off-page SEO pipelines to drive organic search visibility.
                </p>
              </article>

              <article className="case-study-card-block">
                <span className="case-study-card-label">Focus 03</span>
                <h3 className="case-study-card-title">Web Development & AI Workflows</h3>
                <p className="case-study-card-body">
                  Building responsive websites, e-commerce stores, and admin panels using React, Next.js, WordPress, and Shopify. Leveraging local AI agents via Ollama, GSAP, and Lenis to accelerate development.
                </p>
              </article>
            </div>

            {/* Documented Responsibilities List */}
            {primaryExp.highlights && primaryExp.highlights.length > 0 && (
              <div style={{ marginTop: '2.5rem' }}>
                <h3 className="case-study-section-title" style={{ fontSize: '1.4rem', marginBottom: '1.25rem' }}>
                  Documented Key Responsibilities
                </h3>
                <div className="case-study-deliverables-grid">
                  {primaryExp.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="case-study-deliverable-item">
                      <span className="case-study-bullet" aria-hidden="true">▸</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Cross-Link to Services */}
        <section className="case-study-links-section" aria-labelledby="experience-services-heading">
          <h2 id="experience-services-heading" className="case-study-section-title">Applied Services</h2>
          <div className="case-study-related-grid">
            {servicesData.slice(0, 3).map((service) => (
              <a
                key={service.id}
                href={`/services/${service.slug}`}
                onClick={(e) => handleLinkClick(e, `/services/${service.slug}`)}
                className="case-study-related-card"
              >
                <span className="case-study-related-badge">Service</span>
                <h3 className="case-study-related-title">{service.name}</h3>
                <p className="case-study-related-desc">{service.shortDescription}</p>
                <span className="case-study-related-link-text">Explore Service →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Cross-Link to Projects */}
        <section className="case-study-links-section" aria-labelledby="experience-work-heading">
          <h2 id="experience-work-heading" className="case-study-section-title">Case Studies & Deliverables</h2>
          <div className="case-study-related-grid">
            {caseStudiesData.slice(0, 3).map((study) => (
              <a
                key={study.id}
                href={`/work/${study.slug}`}
                onClick={(e) => handleLinkClick(e, `/work/${study.slug}`)}
                className="case-study-related-card"
              >
                <span className="case-study-related-badge">{study.category}</span>
                <h3 className="case-study-related-title">{study.title}</h3>
                <p className="case-study-related-desc">{study.shortDescription}</p>
                <span className="case-study-related-link-text">Read Case Study →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="service-final-cta-section" aria-labelledby="cta-heading">
          <div className="service-final-cta-card">
            <h2 id="cta-heading" className="service-final-cta-title">Ready to Discuss a Project or Partnership?</h2>
            <p className="service-final-cta-desc">
              Whether you need end-to-end digital marketing execution, technical SEO, or a custom-engineered web platform, let’s collaborate.
            </p>
            <div className="service-cta-group" style={{ justifyContent: 'center' }}>
              <a href="mailto:viveksingh.dmark@gmail.com" className="service-primary-cta">
                Get In Touch via Email
              </a>
              <a href="/work" onClick={(e) => handleLinkClick(e, '/work')} className="service-secondary-cta">
                Explore Project Index
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
