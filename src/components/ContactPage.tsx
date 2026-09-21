/**
 * Crawlable Contact Page Component
 * 
 * Semantic, accessible, dark-themed Contact page rendering verified
 * contact information from src/data/portfolio.ts with full SEO metadata,
 * schema markup, and internal linking.
 */

import React, { useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { buildPageSEO, applySEOToHead } from '../data/seo';
import '../styles/caseStudyPage.css';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { name, role, email, phone, location, social } = portfolioData;

  useEffect(() => {
    const seoConfig = buildPageSEO({
      title: `Contact | ${name} · Digital Marketer & Web Developer`,
      description: `Get in touch with ${name} (${role}) for performance marketing, SEO, web development, and AI-assisted automation initiatives.`,
      canonicalUrl: 'https://digitacurve.com/contact',
      keywords: [
        'Contact Vivek Singh',
        'Hire Digital Marketer India',
        'Google Ads Specialist Contact',
        'Web Developer Varanasi Contact',
        'DIGITA CURVE Contact',
        'Performance Marketing Inquiries'
      ],
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact' }
      ]
    });

    applySEOToHead(seoConfig);

    // Inject Person Schema with strict non-founder wording
    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: name,
      jobTitle: 'Founding Member, DIGITA CURVE',
      email: `mailto:${email}`,
      telephone: phone,
      url: social.website,
      sameAs: [
        social.linkedin,
        social.github
      ].filter(Boolean),
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.city,
        addressRegion: location.state,
        addressCountry: location.country
      }
    };

    const scriptId = 'contact-person-schema';
    let scriptEl = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(personSchema);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [name, role, email, phone, location, social]);

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

        <nav aria-label="Contact Navigation Links" className="case-study-nav-links">
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
          <a
            href="/experience"
            onClick={(e) => handleLinkClick(e, '/experience')}
            className="case-study-nav-link"
          >
            Experience
          </a>
          <a href="/contact" className="case-study-nav-link active">
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
            <span itemProp="name">Contact</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* Main Semantic Content */}
      <main className="case-study-main-content">
        {/* Hero Section */}
        <section className="case-study-hero-section" aria-labelledby="contact-title">
          <div className="case-study-badges-row">
            <span className="case-study-badge">Get In Touch</span>
            <span className="work-count-badge">{location.city}, {location.country}</span>
          </div>

          <h1 id="contact-title" className="case-study-h1">Let’s Build Something Together</h1>
          <p className="case-study-hero-desc" style={{ color: '#00e5ff', fontWeight: 600, fontSize: '1.15rem' }}>
            {name} — {role}
          </p>
          <p className="case-study-hero-desc">
            Available for performance digital marketing campaigns, conversion rate optimization, modern responsive web engineering, and AI automation consulting. Reach out directly through any of the channels below.
          </p>
        </section>

        {/* Contact Channels Grid */}
        <section className="case-study-tri-grid" aria-label="Contact Channels" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Email Channel */}
          <article className="case-study-card-block" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="case-study-card-label">Primary Communication</span>
            <h2 className="case-study-card-title">Email</h2>
            <p className="case-study-card-body" style={{ color: '#99a8ba', marginBottom: '1.5rem' }}>
              Direct email for campaign proposals, web development inquiries, and project discussions.
            </p>
            <div style={{ marginTop: 'auto' }}>
              <a
                href={`mailto:${email}`}
                className="case-study-related-link-text"
                style={{ color: '#00e5ff', fontSize: '1.05rem', wordBreak: 'break-all' }}
              >
                {email} ↗
              </a>
            </div>
          </article>

          {/* Phone Channel */}
          {phone && (
            <article className="case-study-card-block" style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="case-study-card-label">Direct Line</span>
              <h2 className="case-study-card-title">Phone & WhatsApp</h2>
              <p className="case-study-card-body" style={{ color: '#99a8ba', marginBottom: '1.5rem' }}>
                For consultations, urgent project alignment, and business discussions.
              </p>
              <div style={{ marginTop: 'auto' }}>
                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="case-study-related-link-text"
                  style={{ color: '#00e5ff', fontSize: '1.05rem' }}
                >
                  {phone} ↗
                </a>
              </div>
            </article>
          )}

          {/* Website Channel */}
          <article className="case-study-card-block" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="case-study-card-label">Digital Agency</span>
            <h2 className="case-study-card-title">DIGITA CURVE</h2>
            <p className="case-study-card-body" style={{ color: '#99a8ba', marginBottom: '1.5rem' }}>
              Official website for agency initiatives, services, and creative platforms.
            </p>
            <div style={{ marginTop: 'auto' }}>
              <a
                href={social.website}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study-related-link-text"
                style={{ color: '#00e5ff', fontSize: '1.05rem' }}
              >
                digitacurve.com ↗
              </a>
            </div>
          </article>

          {/* LinkedIn Channel */}
          <article className="case-study-card-block" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="case-study-card-label">Professional Network</span>
            <h2 className="case-study-card-title">LinkedIn</h2>
            <p className="case-study-card-body" style={{ color: '#99a8ba', marginBottom: '1.5rem' }}>
              Connect for professional networking, industry insights, and career updates.
            </p>
            <div style={{ marginTop: 'auto' }}>
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study-related-link-text"
                style={{ color: '#00e5ff', fontSize: '1.05rem' }}
              >
                linkedin.com/in/viveksingh-digital-marketer ↗
              </a>
            </div>
          </article>

          {/* GitHub Channel */}
          <article className="case-study-card-block" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="case-study-card-label">Source Code & Projects</span>
            <h2 className="case-study-card-title">GitHub</h2>
            <p className="case-study-card-body" style={{ color: '#99a8ba', marginBottom: '1.5rem' }}>
              Explore open codebases, frontend templates, and automation repositories.
            </p>
            <div style={{ marginTop: 'auto' }}>
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="case-study-related-link-text"
                style={{ color: '#00e5ff', fontSize: '1.05rem' }}
              >
                github.com/digitacurve ↗
              </a>
            </div>
          </article>

          {/* Location Details */}
          <article className="case-study-card-block" style={{ display: 'flex', flexDirection: 'column' }}>
            <span className="case-study-card-label">Operating Base</span>
            <h2 className="case-study-card-title">Location</h2>
            <p className="case-study-card-body" style={{ color: '#99a8ba', marginBottom: '1.5rem' }}>
              Based in Varanasi, Uttar Pradesh, India. Collaborating remotely across global timezones.
            </p>
            <div style={{ marginTop: 'auto' }}>
              <span style={{ color: '#00e5ff', fontSize: '1.05rem', fontWeight: 600 }}>
                {location.city}, {location.state}, {location.country}
              </span>
            </div>
          </article>
        </section>

        {/* Navigation Hub */}
        <section className="case-study-links-section" aria-labelledby="portfolio-sections-heading">
          <h2 id="portfolio-sections-heading" className="case-study-section-title">Explore More of the Portfolio</h2>
          <div className="case-study-related-grid">
            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, '/about')}
              className="case-study-related-card"
            >
              <span className="case-study-related-badge">Profile</span>
              <h3 className="case-study-related-title">About Vivek Singh</h3>
              <p className="case-study-related-desc">Professional background, core values, and founding role at DIGITA CURVE.</p>
              <span className="case-study-related-link-text">Read Bio →</span>
            </a>

            <a
              href="/services"
              onClick={(e) => handleLinkClick(e, '/services')}
              className="case-study-related-card"
            >
              <span className="case-study-related-badge">Offerings</span>
              <h3 className="case-study-related-title">Digital Marketing & Web Services</h3>
              <p className="case-study-related-desc">Google Ads, SEO, web development, social media, and performance marketing.</p>
              <span className="case-study-related-link-text">Explore Services →</span>
            </a>

            <a
              href="/work"
              onClick={(e) => handleLinkClick(e, '/work')}
              className="case-study-related-card"
            >
              <span className="case-study-related-badge">Work</span>
              <h3 className="case-study-related-title">Documented Case Studies</h3>
              <p className="case-study-related-desc">Real client projects, technologies used, solutions, and key deliverables.</p>
              <span className="case-study-related-link-text">View Projects →</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};
