/**
 * Portfolio Content Layer
 * 
 * Single source of truth for personal information, bio, skills, experience,
 * contact details, and resume-backed About Me, Skills, Experience & Contact data.
 */

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
}

export interface AboutHighlight {
  label: string;
  value: string;
}

export interface AboutData {
  name: string;
  role: string;
  location: string;
  shortIntroduction: string;
  fullIntroduction: string;
  focusAreas: string[];
  highlights: AboutHighlight[];
  story: string[];
}

export interface SkillCategory {
  category: string;
  description?: string;
  items: string[];
}

export interface SkillCategoryDetail {
  slug: string;
  title: string;
  heading: string;
  shortDescription: string;
  fullDescription: string;
  items: string[];
  route: string;
  clientName: string;
  color: string;
  media: {
    videoUrl: string;
    thumbnailUrl: string;
  };
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  highlights?: string[];
}

export interface PortfolioProject {
  /** Unique identifier / URL slug */
  id: string;
  /** Main project title rendered in 3D WebGL space */
  title: string;
  /** Subtitle / short summary */
  subtitle: string;
  /** Display date / tag format (supports newlines for 3D card layout) */
  date: string;
  /** In-depth case study and project description */
  description: string;
  /** Tags / Tech stack */
  tags: string[];
  /** External live URL */
  projectUrl?: string;
  /** Case study or repository URL */
  caseStudyUrl?: string;
  /** SEO meta description */
  seoDescription: string;
  /** Highlight accent color (Hex without #) */
  accentColor?: string;
}

export interface PortfolioData {
  name: string;
  role: string;
  headline: string;
  shortIntroduction: string;
  aboutText: string[];
  about: AboutData;
  email: string;
  phone?: string;
  location: {
    city: string;
    state?: string;
    code: string; // e.g. "NYC", "SFO", "LDN", "VNS"
    country: string;
  };
  social: SocialLinks;
  skills: SkillCategory[];
  skillCategories: SkillCategoryDetail[];
  experience: ExperienceItem[];
  projects: PortfolioProject[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

export const portfolioData: PortfolioData = {
  name: "Vivek Singh",
  role: "Digital Marketer • Web Developer • Founding Member, DIGITA CURVE",
  headline: "Building high-performance digital marketing campaigns, responsive web applications, and AI workflows.",
  shortIntroduction:
    "Digital Marketer, Web Developer and Founding Member of DIGITA CURVE, working across digital marketing, web development and AI-assisted automation.",
  
  about: {
    name: "Vivek Singh",
    role: "Digital Marketer • Web Developer • Founding Member, DIGITA CURVE",
    location: "Varanasi, Uttar Pradesh, India",
    shortIntroduction:
      "Digital Marketer, Web Developer and Founding Member of DIGITA CURVE, working across digital marketing, web development and AI-assisted automation.",
    fullIntroduction:
      "Digital Marketer, Web Developer and Founding Member of DIGITA CURVE, working across performance digital advertising, search engine optimization structure, custom responsive web development, and AI-assisted engineering workflows.",
    focusAreas: [
      "Digital Marketing",
      "Web Development",
      "AI & Automation"
    ],
    highlights: [
      { label: "Ad Budget Managed", value: "₹10L+" },
      { label: "Verified Conversions", value: "500+" },
      { label: "Paid Clicks Generated", value: "10.6K+" },
      { label: "Live Client Projects", value: "8+" }
    ],
    story: [
      "As a Founding Member and Digital Marketing & Web Development Lead at DIGITA CURVE, I specialize in engineering high-performing digital platforms and intent-driven acquisition campaigns.",
      "My work bridges the technical gap between full-stack frontend development and conversion-focused performance marketing—ensuring every landing page, web application, and campaign is built with speed, precision, and measurable return on investment.",
      "I actively explore local AI model integrations and automation pipelines to streamline frontend development and deliver modern digital experiences."
    ]
  },

  aboutText: [
    "Digital Marketer, Web Developer and Founding Member of DIGITA CURVE, working across digital marketing, web development and AI-assisted automation.",
    "Specialized in Google Search Ads, Performance Max, technical SEO structures, responsive landing page architectures, and interactive digital experiences.",
    "Leading web development initiatives with modern frameworks and exploring AI-driven development workflows."
  ],

  email: "viveksingh.dmark@gmail.com",
  phone: "+91 96961 90574",

  location: {
    city: "Varanasi",
    state: "Uttar Pradesh",
    code: "VNS",
    country: "India"
  },

  social: {
    github: "https://github.com/digitacurve",
    linkedin: "https://www.linkedin.com/in/viveksingh-digital-marketer",
    website: "https://digitacurve.com"
  },

  skills: [
    {
      category: "Digital Marketing",
      description: "Intent-driven customer acquisition across search, display, and algorithmic campaign types.",
      items: [
        "Google Ads",
        "Meta Ads",
        "PPC",
        "Search Ads",
        "Display Ads",
        "Performance Max",
        "Campaign Planning",
        "Ad Copy",
        "Landing Page Optimization",
        "AI-Assisted Advertising"
      ]
    },
    {
      category: "Tracking & Analytics",
      description: "Measurement infrastructure and behavioral event architecture for clear attribution.",
      items: [
        "Google Tag Manager",
        "Tag Implementation",
        "Event Tracking",
        "Conversion Tracking",
        "Google Analytics",
        "Google Search Console"
      ]
    },
    {
      category: "SEO",
      description: "Search engine discoverability across technical crawling, keywords, and AI engines.",
      items: [
        "Technical SEO",
        "On-Page SEO",
        "Off-Page SEO",
        "Keyword Research",
        "Backlinking",
        "AEO",
        "GEO"
      ]
    },
    {
      category: "Social Media",
      description: "Multi-platform brand storytelling and conversion-aligned creative planning.",
      items: [
        "Social Media Management",
        "Content Calendar",
        "Trends",
        "Scripts",
        "Creative Planning",
        "Instagram",
        "YouTube",
        "Conversion CTAs"
      ]
    },
    {
      category: "Web Development",
      description: "Modern, responsive frontend architectures and headless content management systems.",
      items: [
        "React",
        "Next.js",
        "JavaScript",
        "HTML/CSS",
        "Custom Websites",
        "E-commerce",
        "SaaS",
        "Shopify",
        "WordPress",
        "Elementor"
      ]
    },
    {
      category: "Advanced Web & Motion",
      description: "Fluid micro-interactions, smooth scrolling dynamics, and engaging UI choreography.",
      items: [
        "GSAP",
        "Lenis",
        "Framer Motion",
        "Interactive Animation",
        "Smooth Scrolling",
        "Interactive UI"
      ]
    },
    {
      category: "E-Commerce & Business Systems",
      description: "Transactional web portals, payment processing pipelines, and administration tools.",
      items: [
        "Admin Panels",
        "Payment Gateways",
        "E-commerce Functionality"
      ]
    },
    {
      category: "AI & Automation",
      description: "Autonomous agents, local LLM orchestration via Ollama, and engineering automation.",
      items: [
        "AI Agents",
        "Ollama",
        "AI-Assisted Development",
        "Workflow Automation",
        "ChatGPT",
        "Claude"
      ]
    }
  ],

  skillCategories: [
    {
      slug: "google-ads",
      title: "GOOGLE ADS",
      heading: "Google Ads & Performance Advertising",
      shortDescription: "Search Ads • Display Ads • Performance Max\nPPC • Campaign Planning • Ad Copy\nLanding Page Optimization • AI-Assisted Advertising",
      fullDescription: "Architecting and managing high-intent acquisition campaigns across Google Search, Display, and Performance Max channels. Focuses on audience targeting, conversion-optimized copy, landing page alignment, and AI-assisted performance iteration.",
      items: [
        "Google Ads",
        "Meta Ads",
        "PPC",
        "Search Ads",
        "Display Ads",
        "Performance Max",
        "Campaign Planning",
        "Ad Copy",
        "Landing Page Optimization",
        "AI-Assisted Advertising"
      ],
      route: "/skills/google-ads",
      clientName: "DIGITA CURVE / ADS",
      color: "4285f4",
      media: {
        videoUrl: "/assets/video/custom/google-ads.mp4",
        thumbnailUrl: "/assets/images/custom/google-ads.jpg"
      }
    },
    {
      slug: "seo",
      title: "SEO",
      heading: "Search Engine Optimization (SEO, AEO & GEO)",
      shortDescription: "Technical SEO • On-Page SEO • Off-Page SEO\nKeyword Research • Backlinking • AEO • GEO",
      fullDescription: "Holistic organic discoverability covering technical crawl efficiency, structured data markup, semantic content hierarchy, keyword research, backlink acquisition, and emerging AI answer-engine optimization.",
      items: [
        "Technical SEO",
        "On-Page SEO",
        "Off-Page SEO",
        "Keyword Research",
        "Backlinking",
        "AEO",
        "GEO"
      ],
      route: "/skills/seo",
      clientName: "DIGITA CURVE / SEARCH",
      color: "34a853",
      media: {
        videoUrl: "/assets/video/custom/seo.mp4",
        thumbnailUrl: "/assets/images/custom/seo.jpg"
      }
    },
    {
      slug: "web-development",
      title: "WEB DEVELOPMENT",
      heading: "Full-Stack & Frontend Web Development",
      shortDescription: "React • Next.js • JavaScript • HTML/CSS\nCustom Websites • E-commerce • SaaS\nShopify • WordPress • Elementor",
      fullDescription: "Engineering scalable, accessible, and fast web experiences using modern TypeScript, React, Next.js, and headless CMS integrations alongside custom WordPress and Shopify platforms.",
      items: [
        "React",
        "Next.js",
        "JavaScript",
        "HTML/CSS",
        "Custom Websites",
        "E-commerce",
        "SaaS",
        "Shopify",
        "WordPress",
        "Elementor"
      ],
      route: "/skills/web-development",
      clientName: "DIGITA CURVE / CODE",
      color: "61dafb",
      media: {
        videoUrl: "/assets/video/custom/web-development.mp4",
        thumbnailUrl: "/assets/images/custom/web-development.jpg"
      }
    },
    {
      slug: "tracking",
      title: "TRACKING & ANALYTICS",
      heading: "Telemetry, Attribution & Tracking Infrastructure",
      shortDescription: "GTM • Tag Implementation • Event Tracking\nConversion Tracking • GA • Search Console",
      fullDescription: "Measurement infrastructure and telemetry design using Google Tag Manager, custom JavaScript event listeners, GA4 property modeling, enhanced conversion tracking, and Google Search Console index diagnostics.",
      items: [
        "Google Tag Manager",
        "Tag Implementation",
        "Event Tracking",
        "Conversion Tracking",
        "Google Analytics",
        "Google Search Console"
      ],
      route: "/skills/tracking",
      clientName: "DIGITA CURVE / ANALYTICS",
      color: "ea4335",
      media: {
        videoUrl: "/assets/video/custom/tracking.mp4",
        thumbnailUrl: "/assets/images/custom/tracking.jpg"
      }
    },
    {
      slug: "social-media",
      title: "SOCIAL MEDIA",
      heading: "Social Media Strategy & Content Calendars",
      shortDescription: "Management • Content Calendar • Trends\nScripts • Creative Planning • Instagram • YouTube\nConversion CTAs",
      fullDescription: "Strategic social channel execution, trend-focused content calendars, short-form video scripting, and high-conversion call-to-action frameworks across Instagram and YouTube.",
      items: [
        "Social Media Management",
        "Content Calendar",
        "Trends",
        "Scripts",
        "Creative Planning",
        "Instagram",
        "YouTube",
        "Conversion CTAs"
      ],
      route: "/skills/social-media",
      clientName: "DIGITA CURVE / SOCIAL",
      color: "e1306c",
      media: {
        videoUrl: "/assets/video/custom/social-media.mp4",
        thumbnailUrl: "/assets/images/custom/social-media.jpg"
      }
    },
    {
      slug: "web-motion",
      title: "ADVANCED WEB & MOTION",
      heading: "Interactive Animation & Motion Engineering",
      shortDescription: "GSAP • Lenis • Framer Motion\nInteractive Animation • Smooth Scrolling\nInteractive UI",
      fullDescription: "Crafting fluid, cinematic web choreography using GSAP timelines, Lenis inertial smooth scrolling, Framer Motion component transitions, and interactive WebGL canvas bindings.",
      items: [
        "GSAP",
        "Lenis",
        "Framer Motion",
        "Interactive Animation",
        "Smooth Scrolling",
        "Interactive UI"
      ],
      route: "/skills/web-motion",
      clientName: "DIGITA CURVE / MOTION",
      color: "ba7cde",
      media: {
        videoUrl: "/assets/video/custom/web-motion.mp4",
        thumbnailUrl: "/assets/images/custom/web-motion.jpg"
      }
    },
    {
      slug: "ai-automation",
      title: "AI & AUTOMATION",
      heading: "Autonomous Agents & Workflow Automation",
      shortDescription: "AI Agents • Ollama • AI-Assisted Development\nWorkflow Automation • ChatGPT • Claude",
      fullDescription: "Integrating local AI models via Ollama, agentic tool workflows, prompt architectures with Claude and ChatGPT, and AI-assisted web engineering pipelines.",
      items: [
        "AI Agents",
        "Ollama",
        "AI-Assisted Development",
        "Workflow Automation",
        "ChatGPT",
        "Claude"
      ],
      route: "/skills/ai-automation",
      clientName: "DIGITA CURVE / INTELLIGENCE",
      color: "00e5ff",
      media: {
        videoUrl: "/assets/video/custom/ai-automation.mp4",
        thumbnailUrl: "/assets/images/custom/ai-automation.jpg"
      }
    },
    {
      slug: "ecommerce",
      title: "E-COMMERCE SYSTEMS",
      heading: "Transactional Systems & Payment Integrations",
      shortDescription: "Admin Panels • Payment Gateways\nE-commerce Functionality",
      fullDescription: "Custom transactional platforms featuring secure payment gateway integrations, product inventory control, administrative dashboard panels, and conversion-optimized checkout funnels.",
      items: [
        "Admin Panels",
        "Payment Gateways",
        "E-commerce Functionality"
      ],
      route: "/skills/ecommerce",
      clientName: "DIGITA CURVE / COMMERCE",
      color: "ffb74d",
      media: {
        videoUrl: "/assets/video/custom/ecommerce.mp4",
        thumbnailUrl: "/assets/images/custom/ecommerce.jpg"
      }
    }
  ],

  experience: [
    {
      role: "Founding Member & Digital Marketing / Web Development Lead",
      company: "DIGITA CURVE",
      period: "2025 — Present",
      location: "Varanasi, Uttar Pradesh, India",
      description:
        "Leading performance digital advertising, technical search engine optimization, modern frontend engineering, and AI-assisted automation pipelines.",
      highlights: [
        "Google Ads: Search, Display, and Performance Max campaign architecture",
        "Meta Ads campaign planning and intent-aligned landing page optimization",
        "GTM, GA4, Search Console telemetry and conversion tracking implementation",
        "Technical, on-page, and off-page SEO strategy",
        "Social media strategy, content calendars, trends, scripts, and creatives",
        "Custom responsive web development with React, Next.js, WordPress, and Shopify",
        "E-commerce functionality, payment gateway integrations, and admin panels",
        "AI-assisted engineering with local models via Ollama, React, Next.js, GSAP, and Lenis"
      ]
    }
  ],

  projects: [],

  seo: {
    title: "Vivek Singh · Digital Marketer & Web Developer",
    description:
      "Digital Marketer, Web Developer and Founding Member of DIGITA CURVE. Performance marketing, web development, and AI-assisted automation.",
    keywords: [
      "Vivek Singh",
      "Digital Marketer",
      "Web Developer",
      "DIGITA CURVE",
      "Performance Marketing",
      "Google Ads Specialist"
    ]
  }
};
