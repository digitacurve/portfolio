/**
 * Reusable Case Study Page Component
 * 
 * Renders real, accessible, crawlable semantic HTML for any case-study route
 * (/work/:slug) by dynamically consuming src/data/caseStudies.ts and applying
 * the centralized SEO metadata and JSON-LD schema generators.
 */

import React, { useEffect } from 'react';
import { getCaseStudyBySlug, caseStudiesData } from '../data/caseStudies';
import { getServiceBySlug } from '../data/services';
import { buildCaseStudySEO, applySEOToHead } from '../data/seo';
import '../styles/caseStudyPage.css';

interface CaseStudyPageProps {
  slug: string;
  onNavigate?: (path: string) => void;
}

export const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ slug, onNavigate }) => {
  const caseStudy = getCaseStudyBySlug(slug);

  useEffect(() => {
    if (caseStudy) {
      const seoConfig = buildCaseStudySEO(caseStudy);
      applySEOToHead(seoConfig);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [caseStudy, slug]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  if (!caseStudy) {
    return (
      <div className="case-study-page-container">
        <header className="case-study-nav-bar">
          <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="case-study-brand">
            Vivek Singh · DIGITA CURVE
          </a>
          <a href="/work" onClick={(e) => handleLinkClick(e, '/work')} className="case-study-back-btn">
            ← All Work
          </a>
        </header>

        <main className="case-study-main-content" style={{ textAlign: 'center', paddingTop: '5rem' }}>
          <h1 className="case-study-h1">Project Not Found</h1>
          <p className="case-study-hero-desc" style={{ margin: '0 auto 2rem' }}>
            The requested case study could not be located. Explore our documented projects below:
          </p>
          <div className="work-index-grid">
            {caseStudiesData.map((p) => (
              <a
                key={p.id}
                href={`/work/${p.slug}`}
                onClick={(e) => handleLinkClick(e, `/work/${p.slug}`)}
                className="work-card"
              >
                <div className="work-card-header">
                  <span className="work-card-cat">{p.category}</span>
                  {p.status && <span className="work-card-status">{p.status}</span>}
                </div>
                <h2 className="work-card-title">{p.title}</h2>
                <p className="work-card-desc">{p.shortDescription}</p>
                <span className="work-card-link-text">Read Case Study →</span>
              </a>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Resolve related projects
  const relatedProjectSlugs = caseStudy.relatedProjects || [];
  const relatedProjects = caseStudiesData.filter(
    (p) => relatedProjectSlugs.includes(p.id) || relatedProjectSlugs.includes(p.slug)
  );

  // Resolve related services for internal linking
  const relatedServices = (caseStudy.relatedServices || [])
    .map((sSlug) => getServiceBySlug(sSlug))
    .filter((s): s is NonNullable<typeof s> => s !== undefined);

  return (
    <div className="case-study-page-container">
      {/* Header Navigation */}
      <header className="case-study-nav-bar">
        <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="case-study-brand">
          Vivek Singh · DIGITA CURVE
        </a>

        <nav aria-label="Work Navigation" className="case-study-nav-links">
          <a
            href="/work"
            onClick={(e) => handleLinkClick(e, '/work')}
            className="case-study-nav-link"
          >
            All Work ({caseStudiesData.length})
          </a>
          <a
            href="/services/google-ads-management"
            onClick={(e) => handleLinkClick(e, '/services/google-ads-management')}
            className="case-study-nav-link"
          >
            Services
          </a>
        </nav>

        <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="case-study-back-btn">
          ← 3D Experience
        </a>
      </header>

      {/* 1. Breadcrumb Navigation */}
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
            <a itemProp="item" href="/work" onClick={(e) => handleLinkClick(e, '/work')}>
              <span itemProp="name">Work</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
          <span className="separator" aria-hidden="true">/</span>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" className="current">
            <span itemProp="name">{caseStudy.title}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Main Semantic Content */}
      <main className="case-study-main-content">
        {/* 2 & 3 & 4. Hero Section */}
        <section className="case-study-hero-section" aria-labelledby="case-study-title">
          <div className="case-study-badges-row">
            <span className="case-study-badge">{caseStudy.category}</span>
            {caseStudy.status && <span className="case-study-status-badge">{caseStudy.status}</span>}
          </div>

          <h1 id="case-study-title" className="case-study-h1">{caseStudy.title}</h1>
          <p className="case-study-hero-desc">{caseStudy.shortDescription}</p>

          {/* 5. Project Metadata Grid */}
          <div className="case-study-meta-grid">
            {caseStudy.clientOrBusiness && (
              <div className="case-study-meta-item">
                <span className="case-study-meta-label">Project / Brand</span>
                <span className="case-study-meta-val">{caseStudy.clientOrBusiness}</span>
              </div>
            )}
            <div className="case-study-meta-item">
              <span className="case-study-meta-label">Role</span>
              <span className="case-study-meta-val">{caseStudy.role}</span>
            </div>
            {caseStudy.year && (
              <div className="case-study-meta-item">
                <span className="case-study-meta-label">Timeline / Year</span>
                <span className="case-study-meta-val">{caseStudy.year}</span>
              </div>
            )}
            <div className="case-study-meta-item">
              <span className="case-study-meta-label">Type</span>
              <span className="case-study-meta-val">{caseStudy.projectType}</span>
            </div>
          </div>

          {/* 6. Project URL / Visit CTA (only if projectUrl exists) */}
          {caseStudy.projectUrl && (
            <div style={{ marginTop: '1.5rem' }}>
              <a
                href={caseStudy.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="service-primary-cta"
              >
                Visit Live Project ({caseStudy.projectUrl.replace('https://', '')}) ↗
              </a>
            </div>
          )}
        </section>

        {/* 7. Full Overview / Narrative Section */}
        {caseStudy.fullDescription && (
          <section className="case-study-narrative-section" aria-labelledby="overview-heading">
            <h2 id="overview-heading" className="case-study-section-title">Project Overview</h2>
            <p className="case-study-narrative-text">{caseStudy.fullDescription}</p>
          </section>
        )}

        {/* 8, 9, 10. Challenge, Approach, Solution (Tri-Block) */}
        {(caseStudy.challenge || caseStudy.approach || caseStudy.solution) && (
          <section className="case-study-tri-grid" aria-label="Project Case Architecture">
            {caseStudy.challenge && (
              <article className="case-study-card-block">
                <span className="case-study-card-label">The Challenge</span>
                <h3 className="case-study-card-title">Problem Context</h3>
                <p className="case-study-card-body">{caseStudy.challenge}</p>
              </article>
            )}

            {caseStudy.approach && (
              <article className="case-study-card-block">
                <span className="case-study-card-label">The Approach</span>
                <h3 className="case-study-card-title">Strategy & Planning</h3>
                <p className="case-study-card-body">{caseStudy.approach}</p>
              </article>
            )}

            {caseStudy.solution && (
              <article className="case-study-card-block">
                <span className="case-study-card-label">The Solution</span>
                <h3 className="case-study-card-title">Execution & Build</h3>
                <p className="case-study-card-body">{caseStudy.solution}</p>
              </article>
            )}
          </section>
        )}

        {/* 11. Technologies Used */}
        {caseStudy.technologies && caseStudy.technologies.length > 0 && (
          <section className="case-study-tech-section" aria-labelledby="tech-heading">
            <h2 id="tech-heading" className="case-study-section-title">Technologies & Tools</h2>
            <div className="case-study-tech-pills">
              {caseStudy.technologies.map((tech, index) => (
                <span key={index} className="case-study-tech-pill">{tech}</span>
              ))}
            </div>
          </section>
        )}

        {/* 12. Deliverables Section */}
        {caseStudy.deliverables && caseStudy.deliverables.length > 0 && (
          <section className="case-study-deliverables-section" aria-labelledby="deliverables-heading">
            <h2 id="deliverables-heading" className="case-study-section-title">Key Deliverables</h2>
            <ul className="case-study-deliverables-grid">
              {caseStudy.deliverables.map((item, index) => (
                <li key={index} className="case-study-deliverable-item">
                  <span className="case-study-check-icon" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 13. Outcome / Project Status */}
        {caseStudy.outcome && (
          <section className="case-study-narrative-section" aria-labelledby="outcome-heading">
            <h2 id="outcome-heading" className="case-study-section-title">Outcome & Status</h2>
            <p className="case-study-narrative-text">{caseStudy.outcome}</p>
          </section>
        )}

        {/* 14. Related Services (Internal Linking) */}
        {relatedServices.length > 0 && (
          <section className="case-study-links-section" aria-labelledby="services-link-heading">
            <h2 id="services-link-heading" className="case-study-section-title">Related Services Delivered</h2>
            <div className="case-study-related-grid">
              {relatedServices.map((service) => (
                <a
                  key={service.id}
                  href={`/services/${service.slug}`}
                  onClick={(e) => handleLinkClick(e, `/services/${service.slug}`)}
                  className="case-study-related-card"
                >
                  <span className="case-study-related-badge">Service Capability</span>
                  <h3 className="case-study-related-title">{service.name}</h3>
                  <p className="case-study-related-desc">{service.shortDescription}</p>
                  <span className="case-study-related-link-text">Learn more about {service.name} →</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 14. Related Case Studies (Internal Linking) */}
        {relatedProjects.length > 0 && (
          <section className="case-study-links-section" aria-labelledby="related-projects-heading">
            <h2 id="related-projects-heading" className="case-study-section-title">Explore Other Projects</h2>
            <div className="case-study-related-grid">
              {relatedProjects.map((related) => (
                <a
                  key={related.id}
                  href={`/work/${related.slug}`}
                  onClick={(e) => handleLinkClick(e, `/work/${related.slug}`)}
                  className="case-study-related-card"
                >
                  <span className="case-study-related-badge">{related.category}</span>
                  <h3 className="case-study-related-title">{related.title}</h3>
                  <p className="case-study-related-desc">{related.shortDescription}</p>
                  <span className="case-study-related-link-text">Read Case Study →</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 15. Final CTA */}
        <section className="service-final-cta-section" aria-labelledby="final-cta-heading">
          <div className="service-final-cta-card">
            <h2 id="final-cta-heading" className="service-final-cta-title">Discuss Your Next Project</h2>
            <p className="service-final-cta-desc">
              Looking to develop a performance landing page, custom web application, or targeted marketing campaign? Let’s connect.
            </p>
            <div className="service-cta-group" style={{ justifyContent: 'center' }}>
              <a href="mailto:viveksingh.dmark@gmail.com" className="service-primary-cta">
                Get In Touch via Email
              </a>
              <a href="/work" onClick={(e) => handleLinkClick(e, '/work')} className="service-secondary-cta">
                View All Case Studies
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
