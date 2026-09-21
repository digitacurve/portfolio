/**
 * Crawlable About Page Component
 * 
 * Semantic, accessible, dark-themed About page rendering resume-backed
 * professional information from src/data/portfolio.ts with full SEO metadata
 * and internal linking.
 */

import React, { useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { caseStudiesData } from '../data/caseStudies';
import { servicesData } from '../data/services';
import { buildPageSEO, applySEOToHead } from '../data/seo';
import '../styles/caseStudyPage.css';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const { about } = portfolioData;

  useEffect(() => {
    const seoConfig = buildPageSEO({
      title: `About ${about.name} | Digital Marketer & Web Developer · DIGITA CURVE`,
      description: about.shortIntroduction,
      canonicalUrl: 'https://digitacurve.com/about',
      keywords: [
        'Vivek Singh',
        'Vivek Singh Digital Marketer',
        'Vivek Singh Web Developer',
        'DIGITA CURVE Founding Member',
        'Digital Marketing Lead Varanasi',
        'Google Ads Specialist India'
      ],
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' }
      ]
    });

    applySEOToHead(seoConfig);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [about]);

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

        <nav aria-label="About Navigation Links" className="case-study-nav-links">
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
          <a href="/about" className="case-study-nav-link active">
            About
          </a>
          <a
            href="/skills"
            onClick={(e) => handleLinkClick(e, '/skills')}
            className="case-study-nav-link"
          >
            Skills
          </a>
          <a
            href="/experience"
            onClick={(e) => handleLinkClick(e, '/experience')}
            className="case-study-nav-link"
          >
            Experience
          </a>
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="case-study-nav-link"
          >
            Contact
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
            <span itemProp="name">About</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Main Semantic Content */}
      <main className="case-study-main-content">
        {/* Hero Section */}
        <section className="case-study-hero-section" aria-labelledby="about-title">
          <div className="case-study-badges-row">
            <span className="case-study-badge">About Me · Founding Member</span>
            <span className="work-count-badge">{about.location}</span>
          </div>

          <h1 id="about-title" className="case-study-h1">{about.name}</h1>
          <p className="case-study-hero-desc" style={{ color: '#00e5ff', fontWeight: 600, fontSize: '1.15rem' }}>
            {about.role}
          </p>
          <p className="case-study-hero-desc">
            {about.fullIntroduction}
          </p>

          {/* Experience Highlights Grid */}
          <div className="case-study-meta-grid" style={{ marginTop: '2rem' }}>
            {about.highlights.map((h, i) => (
              <div key={i} className="case-study-meta-item">
                <span className="case-study-meta-label">{h.label}</span>
                <span className="case-study-meta-val" style={{ fontSize: '1.4rem', color: '#00e5ff', fontWeight: 700 }}>
                  {h.value}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Core Focus Areas */}
        <section className="case-study-tri-grid" aria-label="Core Focus Areas">
          <article className="case-study-card-block">
            <span className="case-study-card-label">Focus Area 01</span>
            <h2 className="case-study-card-title">Digital Marketing</h2>
            <p className="case-study-card-body">
              Specialized in intent-driven Google Search Ads, Performance Max campaigns, Meta Ads traffic alignment, and technical SEO structure to drive qualified inquiries.
            </p>
          </article>

          <article className="case-study-card-block">
            <span className="case-study-card-label">Focus Area 02</span>
            <h2 className="case-study-card-title">Web Development</h2>
            <p className="case-study-card-body">
              Engineering modern, responsive web platforms and landing pages with clear UX hierarchy, mobile-first design, fast loading speeds, and interactive motion.
            </p>
          </article>

          <article className="case-study-card-block">
            <span className="case-study-card-label">Focus Area 03</span>
            <h2 className="case-study-card-title">AI & Automation</h2>
            <p className="case-study-card-body">
              Integrating local AI models via Ollama to accelerate frontend scaffolding, automated component creation, and interactive motion templates with high privacy and zero latency.
            </p>
          </article>
        </section>

        {/* Professional Background & Philosophy */}
        <section className="case-study-narrative-section" aria-labelledby="story-heading">
          <h2 id="story-heading" className="case-study-section-title">Background & Approach</h2>
          {about.story.map((paragraph, index) => (
            <p key={index} className="case-study-narrative-text" style={{ marginBottom: '1.25rem' }}>
              {paragraph}
            </p>
          ))}
        </section>

        {/* Featured Case Studies */}
        <section className="case-study-links-section" aria-labelledby="featured-work-heading">
          <h2 id="featured-work-heading" className="case-study-section-title">Documented Case Studies</h2>
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

        {/* Core Services */}
        <section className="case-study-links-section" aria-labelledby="about-services-heading">
          <h2 id="about-services-heading" className="case-study-section-title">Service Capabilities</h2>
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
                <span className="case-study-related-link-text">Learn More →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="service-final-cta-section" aria-labelledby="cta-heading">
          <div className="service-final-cta-card">
            <h2 id="cta-heading" className="service-final-cta-title">Let’s Discuss Your Next Initiative</h2>
            <p className="service-final-cta-desc">
              Whether you need targeted paid acquisition campaigns, a high-converting website, or automated development pipelines, I’m ready to collaborate.
            </p>
            <div className="service-cta-group" style={{ justifyContent: 'center' }}>
              <a href="mailto:viveksingh.dmark@gmail.com" className="service-primary-cta">
                Get In Touch via Email
              </a>
              <a href="/work" onClick={(e) => handleLinkClick(e, '/work')} className="service-secondary-cta">
                Explore All Projects
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
