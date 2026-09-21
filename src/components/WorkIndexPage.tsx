/**
 * Crawlable Work Index Page Component
 * 
 * Lists all documented portfolio projects and case studies dynamically from
 * src/data/caseStudies.ts with real semantic HTML, rich visual hierarchy,
 * category filters, and complete SEO metadata.
 */

import React, { useState, useEffect } from 'react';
import { caseStudiesData } from '../data/caseStudies';
import { servicesData } from '../data/services';
import { buildPageSEO, applySEOToHead } from '../data/seo';
import '../styles/caseStudyPage.css';

interface WorkIndexPageProps {
  onNavigate?: (path: string) => void;
}

export const WorkIndexPage: React.FC<WorkIndexPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const seoConfig = buildPageSEO({
      title: 'Selected Work & Case Studies | Vivek Singh · DIGITA CURVE',
      description:
        'Explore documented case studies across web development, Google Ads, SEO, and interactive digital experiences by Vivek Singh.',
      canonicalUrl: 'https://digitacurve.com/work',
      keywords: [
        'Vivek Singh Portfolio',
        'DIGITA CURVE Case Studies',
        'Web Development Projects',
        'Google Ads Case Studies',
        'React Next.js Projects',
        'Digital Marketing Projects'
      ],
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Work', url: '/work' }
      ]
    });

    applySEOToHead(seoConfig);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Filter projects based on selected filter
  const filteredProjects = caseStudiesData.filter((project) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'ads') {
      return (
        project.servicesProvided.includes('Google Ads Management') ||
        project.servicesProvided.includes('Social Media Marketing') ||
        project.servicesProvided.includes('Performance Marketing')
      );
    }
    if (selectedCategory === 'web') {
      return project.servicesProvided.includes('Website Development');
    }
    if (selectedCategory === 'ecommerce') {
      return project.category.toLowerCase().includes('e-commerce') || project.projectType.toLowerCase().includes('e-commerce');
    }
    if (selectedCategory === 'ai') {
      return project.category.toLowerCase().includes('ai');
    }
    return true;
  });

  return (
    <div className="work-index-page-container">
      {/* Navigation Header */}
      <header className="case-study-nav-bar">
        <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="case-study-brand">
          Vivek Singh · DIGITA CURVE
        </a>

        <nav aria-label="Work Header Navigation" className="case-study-nav-links">
          <a
            href="/services"
            onClick={(e) => handleLinkClick(e, '/services')}
            className="case-study-nav-link"
          >
            Services
          </a>
          <a href="/work" className="case-study-nav-link active">
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

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="case-study-breadcrumb-nav">
        <ol className="case-study-breadcrumbs">
          <li>
            <a href="/" onClick={(e) => handleLinkClick(e, '/')}>Home</a>
          </li>
          <span className="separator" aria-hidden="true">/</span>
          <li className="current">Work</li>
        </ol>
      </nav>

      {/* Main Content */}
      <main className="work-index-main-content">
        {/* Hero Section */}
        <section aria-labelledby="work-heading" className="work-index-hero">
          <div className="case-study-badges-row">
            <span className="case-study-badge">Portfolio · Selected Work</span>
            <span className="work-count-badge">{caseStudiesData.length} Documented Projects</span>
          </div>

          <h1 id="work-heading" className="case-study-h1">
            Case Studies & Project Index
          </h1>
          <p className="case-study-hero-desc">
            Documented real-world deliverables spanning custom web engineering, Google and Meta paid media, SEO architecture, and local AI development workflows.
          </p>

          {/* Quick Category Filter Pills */}
          <div className="work-filter-bar" role="group" aria-label="Project category filters">
            <button
              type="button"
              className={`work-filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Projects ({caseStudiesData.length})
            </button>
            <button
              type="button"
              className={`work-filter-btn ${selectedCategory === 'ads' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ads')}
            >
              Paid Ads & Marketing
            </button>
            <button
              type="button"
              className={`work-filter-btn ${selectedCategory === 'web' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('web')}
            >
              Website Development
            </button>
            <button
              type="button"
              className={`work-filter-btn ${selectedCategory === 'ecommerce' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ecommerce')}
            >
              E-commerce
            </button>
            <button
              type="button"
              className={`work-filter-btn ${selectedCategory === 'ai' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('ai')}
            >
              AI & Automation
            </button>
          </div>
        </section>

        {/* Projects Grid */}
        <section aria-label="Documented Projects List" className="work-index-grid">
          {filteredProjects.map((project, idx) => {
            const projectIndexStr = String(idx + 1).padStart(2, '0');
            const totalProjectsStr = String(caseStudiesData.length).padStart(2, '0');

            return (
              <article key={project.id} className="work-card-wrapper">
                <a
                  href={`/work/${project.slug}`}
                  onClick={(e) => handleLinkClick(e, `/work/${project.slug}`)}
                  className="work-card"
                >
                  <div className="work-card-header">
                    <div className="work-card-meta-left">
                      <span className="work-card-num">{projectIndexStr} / {totalProjectsStr}</span>
                      <span className="work-card-cat">{project.category}</span>
                    </div>
                    {project.status && <span className="work-card-status">{project.status}</span>}
                  </div>

                  <h2 className="work-card-title">{project.title}</h2>
                  <p className="work-card-desc">{project.shortDescription}</p>

                  {/* Technology / Capability Tags Preview */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="work-card-tags">
                      {project.technologies.slice(0, 4).map((tech, tIdx) => (
                        <span key={tIdx} className="work-card-tag">{tech}</span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="work-card-tag-more">+{project.technologies.length - 4} more</span>
                      )}
                    </div>
                  )}

                  <div className="work-card-footer">
                    <span className="work-card-year">{project.year || '2025'}</span>
                    <span className="work-card-link-text">
                      Read Case Study <span className="arrow-icon" aria-hidden="true">→</span>
                    </span>
                  </div>
                </a>
              </article>
            );
          })}
        </section>

        {/* Services Showcase Section for Internal Linking */}
        <section className="work-services-showcase" aria-labelledby="services-overview-heading">
          <h2 id="services-overview-heading" className="case-study-section-title">
            Core Service Capabilities
          </h2>
          <p className="work-services-intro">
            Every project in this index is backed by specialized competencies across performance advertising, SEO structure, and modern web application development.
          </p>

          <div className="case-study-related-grid">
            {servicesData.map((service) => (
              <a
                key={service.id}
                href={`/services/${service.slug}`}
                onClick={(e) => handleLinkClick(e, `/services/${service.slug}`)}
                className="case-study-related-card"
              >
                <span className="case-study-related-badge">Service Capability</span>
                <h3 className="case-study-related-title">{service.name}</h3>
                <p className="case-study-related-desc">{service.shortDescription}</p>
                <span className="case-study-related-link-text">Explore {service.name} →</span>
              </a>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="service-final-cta-section" style={{ marginTop: '4rem' }} aria-labelledby="cta-heading">
          <div className="service-final-cta-card">
            <h2 id="cta-heading" className="service-final-cta-title">Discuss Your Next Project</h2>
            <p className="service-final-cta-desc">
              Looking to develop a performance landing page, custom web application, or targeted marketing campaign? Let’s connect.
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
