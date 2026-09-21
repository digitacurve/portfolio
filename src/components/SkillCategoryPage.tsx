/**
 * Crawlable Skill Category Detail Page Component
 * 
 * Semantic, accessible, dark-themed Skill Category page rendering verified
 * capability information from src/data/portfolio.ts with full SEO metadata,
 * schema markup, and internal linking.
 */

import React, { useEffect } from 'react';
import { portfolioData, SkillCategoryDetail } from '../data/portfolio';
import { caseStudiesData } from '../data/caseStudies';
import { servicesData } from '../data/services';
import { buildPageSEO, applySEOToHead } from '../data/seo';
import '../styles/caseStudyPage.css';

interface SkillCategoryPageProps {
  slug: string;
  onNavigate?: (path: string) => void;
}

export const SkillCategoryPage: React.FC<SkillCategoryPageProps> = ({ slug, onNavigate }) => {
  const { name, role, skillCategories } = portfolioData;

  const category: SkillCategoryDetail | undefined = skillCategories?.find(
    (c) => c.slug === slug || c.route === `/skills/${slug}`
  );

  useEffect(() => {
    if (!category) return;

    const seoConfig = buildPageSEO({
      title: `${category.title} | ${name} · Digital Marketer & Web Developer`,
      description: category.fullDescription,
      canonicalUrl: `https://digitacurve.com${category.route}`,
      keywords: [
        category.title,
        `${category.title} Vivek Singh`,
        ...category.items,
        'DIGITA CURVE Skills'
      ],
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Skills', url: '/skills' },
        { name: category.title, url: category.route }
      ]
    });

    applySEOToHead(seoConfig);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category, name]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  if (!category) {
    return (
      <div className="case-study-page-container">
        <header className="case-study-nav-bar">
          <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="case-study-brand">
            Vivek Singh · DIGITA CURVE
          </a>
          <a href="/skills" onClick={(e) => handleLinkClick(e, '/skills')} className="case-study-back-btn">
            ← Back to Skills
          </a>
        </header>
        <main className="case-study-main-content">
          <section className="case-study-hero-section">
            <h1 className="case-study-h1">Skill Category Not Found</h1>
            <p className="case-study-hero-desc">The requested skill category could not be located.</p>
            <a href="/skills" onClick={(e) => handleLinkClick(e, '/skills')} className="service-primary-cta">
              View All Skills
            </a>
          </section>
        </main>
      </div>
    );
  }

  // Find related skill categories
  const otherCategories = skillCategories.filter((c) => c.slug !== category.slug);

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
          <a
            href="/skills"
            onClick={(e) => handleLinkClick(e, '/skills')}
            className="case-study-nav-link active"
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
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href="/skills" onClick={(e) => handleLinkClick(e, '/skills')}>
              <span itemProp="name">Skills</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <span className="separator" aria-hidden="true">/</span>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="current">
            <span itemProp="name">{category.title}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Main Semantic Content */}
      <main className="case-study-main-content">
        {/* Hero Section */}
        <section className="case-study-hero-section" aria-labelledby="skill-detail-title">
          <div className="case-study-badges-row">
            <span className="case-study-badge">Capability Domain</span>
            <span className="work-count-badge">{category.clientName}</span>
          </div>

          <h1 id="skill-detail-title" className="case-study-h1">{category.heading}</h1>
          <p className="case-study-hero-desc" style={{ color: `#${category.color}`, fontWeight: 600, fontSize: '1.15rem' }}>
            {name} — {role}
          </p>
          <p className="case-study-hero-desc">
            {category.fullDescription}
          </p>
        </section>

        {/* Skill Items Breakdown */}
        <section className="case-study-tri-grid" aria-label="Core Competencies Breakdown" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <article className="case-study-card-block" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="case-study-card-label">Core Competencies</span>
            <h2 className="case-study-card-title">{category.title} Toolkit</h2>
            <p className="case-study-card-body" style={{ color: '#99a8ba', marginBottom: '1.5rem' }}>
              Technologies, execution methodologies, and domain frameworks applied across client campaigns and engineering workflows.
            </p>
            <div className="case-study-tech-tags" style={{ marginTop: 'auto' }}>
              {category.items.map((item, idx) => (
                <span key={idx} className="case-study-tech-pill" style={{ borderColor: `#${category.color}40`, color: '#ffffff' }}>
                  {item}
                </span>
              ))}
            </div>
          </article>

          <article className="case-study-card-block" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="case-study-card-label">Execution Strategy</span>
            <h2 className="case-study-card-title">Production Methodology</h2>
            <p className="case-study-card-body" style={{ color: '#99a8ba', lineHeight: '1.7' }}>
              Each project begins with measurable baseline definitions, structured intent modeling, clean semantic code standards, and transparent telemetry tracking to ensure high deliverable quality.
            </p>
            <div style={{ marginTop: 'auto' }}>
              <a
                href="/services"
                onClick={(e) => handleLinkClick(e, '/services')}
                className="case-study-related-link-text"
                style={{ color: `#${category.color}` }}
              >
                View Applied Services →
              </a>
            </div>
          </article>
        </section>

        {/* Navigation to Other Skill Categories */}
        <section className="case-study-links-section" aria-labelledby="other-skills-heading">
          <h2 id="other-skills-heading" className="case-study-section-title">Explore All Skill Categories</h2>
          <div className="case-study-related-grid">
            {otherCategories.slice(0, 4).map((other) => (
              <a
                key={other.slug}
                href={other.route}
                onClick={(e) => handleLinkClick(e, other.route)}
                className="case-study-related-card"
              >
                <span className="case-study-related-badge">Skill</span>
                <h3 className="case-study-related-title">{other.title}</h3>
                <p className="case-study-related-desc">{other.shortDescription.split('\n')[0]}</p>
                <span className="case-study-related-link-text">Explore Capability →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Cross-Link to Case Studies */}
        <section className="case-study-links-section" aria-labelledby="related-case-studies-heading">
          <h2 id="related-case-studies-heading" className="case-study-section-title">Applied in Real Case Studies</h2>
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
            <h2 id="cta-heading" className="service-final-cta-title">Discuss a Project in {category.title}</h2>
            <p className="service-final-cta-desc">
              Looking to deploy high-performance campaigns, frontend development, or AI automation? Reach out directly.
            </p>
            <div className="service-cta-group" style={{ justifyContent: 'center' }}>
              <a href="mailto:viveksingh.dmark@gmail.com" className="service-primary-cta">
                Send Inquiries
              </a>
              <a href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="service-secondary-cta">
                View Contact Channels
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
