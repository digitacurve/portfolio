/**
 * Crawlable Services Index / Hub Page Component
 * 
 * Semantic, accessible, dark-themed Services overview hub rendering
 * the 5 core services from src/data/services.ts with full SEO metadata,
 * schema markup, and internal linking to each individual service route.
 */

import React, { useEffect } from 'react';
import { servicesData } from '../data/services';
import { portfolioData } from '../data/portfolio';
import { caseStudiesData } from '../data/caseStudies';
import { buildPageSEO, applySEOToHead } from '../data/seo';
import '../styles/caseStudyPage.css';

interface ServicesIndexPageProps {
  onNavigate?: (path: string) => void;
}

export const ServicesIndexPage: React.FC<ServicesIndexPageProps> = ({ onNavigate }) => {
  const { name } = portfolioData;

  useEffect(() => {
    const seoConfig = buildPageSEO({
      title: `Digital Marketing & Web Services | ${name} · DIGITA CURVE`,
      description: 'Comprehensive digital marketing, search engine optimization, modern web development, social media marketing, and performance marketing services.',
      canonicalUrl: 'https://digitacurve.com/services',
      keywords: [
        'Digital Marketing Services',
        'Google Ads Management',
        'SEO Services Varanasi India',
        'Website Development React Next.js',
        'Social Media Marketing',
        'Performance Marketing Services',
        'DIGITA CURVE Services'
      ],
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' }
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

        <nav aria-label="Services Navigation Links" className="case-study-nav-links">
          <a href="/services" className="case-study-nav-link active">
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
            <span itemProp="name">Services</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Main Semantic Content */}
      <main className="case-study-main-content">
        {/* Hero Section */}
        <section className="case-study-hero-section" aria-labelledby="services-hub-title">
          <div className="case-study-badges-row">
            <span className="case-study-badge">Specialized Offerings</span>
            <span className="work-count-badge">5 Core Services</span>
          </div>

          <h1 id="services-hub-title" className="case-study-h1">Digital Marketing & Web Services</h1>
          <p className="case-study-hero-desc" style={{ color: '#00e5ff', fontWeight: 600, fontSize: '1.15rem' }}>
            Intent-Driven Paid Acquisition, Search Engine Optimization, Modern Web Platforms & Growth Marketing
          </p>
          <p className="case-study-hero-desc">
            A comprehensive, execution-focused suite of digital services designed to turn online search intent into measurable conversions, qualified leads, and high-performance digital brand platforms.
          </p>
        </section>

        {/* 5 Services Cards Grid */}
        <section className="case-study-tri-grid" aria-label="Core Services List" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
          {servicesData.map((service, index) => (
            <article key={service.id} className="case-study-card-block" style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="case-study-card-label">Service 0{index + 1}</span>
              <h2 className="case-study-card-title">{service.name}</h2>
              <p className="case-study-card-body" style={{ marginBottom: '1.5rem', color: '#99a8ba' }}>
                {service.shortDescription}
              </p>

              {/* Service Highlights / Includes */}
              <div className="case-study-tech-tags" style={{ marginBottom: '1.5rem' }}>
                {service.includes.slice(0, 5).map((inc, iIdx) => (
                  <span key={iIdx} className="case-study-tech-pill">
                    {inc}
                  </span>
                ))}
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                <a
                  href={`/services/${service.slug}`}
                  onClick={(e) => handleLinkClick(e, `/services/${service.slug}`)}
                  className="case-study-related-link-text"
                  style={{ color: '#00e5ff', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  View Full Service Details →
                </a>
              </div>
            </article>
          ))}
        </section>

        {/* Case Studies Link Section */}
        <section className="case-study-links-section" aria-labelledby="services-case-studies-heading">
          <h2 id="services-case-studies-heading" className="case-study-section-title">Applied Project Case Studies</h2>
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
            <h2 id="cta-heading" className="service-final-cta-title">Let’s Elevate Your Digital Performance</h2>
            <p className="service-final-cta-desc">
              Whether you need performance Google Ads management, search engine optimization, or a fast, custom-engineered website, I’m ready to discuss your goals.
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
