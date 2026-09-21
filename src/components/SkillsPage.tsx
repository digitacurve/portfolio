/**
 * Crawlable Skills & Capabilities Page Component
 * 
 * Semantic, accessible, dark-themed Skills page rendering 8 resume-backed
 * capability categories from src/data/portfolio.ts with full SEO metadata,
 * schema markup, and internal linking.
 */

import React, { useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { caseStudiesData } from '../data/caseStudies';
import { servicesData } from '../data/services';
import { buildPageSEO, applySEOToHead } from '../data/seo';
import '../styles/caseStudyPage.css';

interface SkillsPageProps {
  onNavigate?: (path: string) => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({ onNavigate }) => {
  const { name, skills } = portfolioData;

  useEffect(() => {
    const seoConfig = buildPageSEO({
      title: `Skills & Capabilities | ${name} · Digital Marketer & Web Developer`,
      description: 'Comprehensive technical skills across digital marketing, tracking infrastructure, technical SEO, responsive web development, and AI-assisted engineering.',
      canonicalUrl: 'https://digitacurve.com/skills',
      keywords: [
        'Vivek Singh Skills',
        'Digital Marketing Skills',
        'Google Ads Specialist',
        'React Next.js Developer',
        'Tracking GA4 GTM Specialist',
        'SEO Strategy India',
        'DIGITA CURVE Capabilities'
      ],
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Skills', url: '/skills' }
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

        <nav aria-label="Skills Navigation Links" className="case-study-nav-links">
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
          <a href="/skills" className="case-study-nav-link active">
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
            <span itemProp="name">Skills</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Main Semantic Content */}
      <main className="case-study-main-content">
        {/* Hero Section */}
        <section className="case-study-hero-section" aria-labelledby="skills-title">
          <div className="case-study-badges-row">
            <span className="case-study-badge">Technical Toolkit · Capabilities</span>
            <span className="work-count-badge">8 Core Domains</span>
          </div>

          <h1 id="skills-title" className="case-study-h1">Skills & Capabilities</h1>
          <p className="case-study-hero-desc" style={{ color: '#00e5ff', fontWeight: 600, fontSize: '1.15rem' }}>
            Full-Spectrum Digital Marketing, Frontend Engineering & AI Automation
          </p>
          <p className="case-study-hero-desc">
            Working across digital marketing, tracking infrastructure, technical SEO, modern web development, and local AI automation to deliver high-performing digital platforms and measurable campaign results.
          </p>
        </section>

        {/* 8 Skills Categories Grid */}
        <section className="case-study-tri-grid" aria-label="Skill Categories Grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {skills.map((cat, idx) => (
            <article key={idx} className="case-study-card-block" style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="case-study-card-label">Category 0{idx + 1}</span>
              <h2 className="case-study-card-title">{cat.category}</h2>
              {cat.description && (
                <p className="case-study-card-body" style={{ marginBottom: '1.25rem', fontSize: '0.92rem', color: '#99a8ba' }}>
                  {cat.description}
                </p>
              )}
              <div className="case-study-tech-tags" style={{ marginTop: 'auto' }}>
                {cat.items.map((skill, sIdx) => (
                  <span key={sIdx} className="case-study-tech-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        {/* Cross-Link to Services */}
        <section className="case-study-links-section" aria-labelledby="skills-services-heading">
          <h2 id="skills-services-heading" className="case-study-section-title">Applied Service Capabilities</h2>
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
        <section className="case-study-links-section" aria-labelledby="skills-work-heading">
          <h2 id="skills-work-heading" className="case-study-section-title">Documented Case Studies</h2>
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
            <h2 id="cta-heading" className="service-final-cta-title">Ready to Collaborate on Your Next Initiative?</h2>
            <p className="service-final-cta-desc">
              Whether you need performance advertising setups, custom web application development, or AI automation pipelines, let’s connect.
            </p>
            <div className="service-cta-group" style={{ justifyContent: 'center' }}>
              <a href="mailto:viveksingh.dmark@gmail.com" className="service-primary-cta">
                Get In Touch via Email
              </a>
              <a href="/work" onClick={(e) => handleLinkClick(e, '/work')} className="service-secondary-cta">
                View Project Index
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
