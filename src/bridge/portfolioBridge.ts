/**
 * Portfolio Runtime Bridge
 * 
 * Connects the TypeScript portfolio data layer (src/data/portfolio.ts) to the
 * Active Theory Hydra runtime without modifying any core WebGL shaders, math,
 * physics, or scene animation logic.
 */

import { portfolioData } from '../data/portfolio';
import { buildPageSEO, applySEOToHead } from '../data/seo/seoEngine';
import { askPortfolioAssistant } from '../ai/portfolioAssistant';
import { bankaiVoice } from '../ai/bankaiVoice';
import { createBankaiCoreElement } from '../components/BankaiCore';

interface RawCMSProject {
  id: string;
  name: string;
  slug: string;
  description: string;
  clientName: string;
  completionDate: string;
  projectLogo: { url: string; sizes?: Record<string, unknown> } | null;
  video: {
    url: string;
    thumbnail: string;
    sizes?: Record<string, unknown>;
  };
  uiColor: string;
  tags: string;
  priority: number;
  caseStudyURL?: string;
  projectURL?: string;
}

export interface ReshapedWorkItem {
  seo: string;
  title: string;
  subhead: string;
  priority: number;
  color: string;
  date: string;
  projectLogo: { url: string; sizes?: Record<string, unknown> } | null;
  clientName: string;
  body: string;
  perma: string;
  caseStudyURL: string;
  projectURL: string;
  videoURL: string;
  thumbnailURL: string;
  tags: string;
  index: number;
}

/**
 * Reshape raw CMS project into the exact object structure expected by
 * Active Theory WorkItem, WorkPaneUI, and shader uniforms.
 */
function reshapeCMSProject(data: RawCMSProject, index: number): ReshapedWorkItem {
  const year = data.completionDate ? new Date(data.completionDate).getFullYear() : 2025;
  const dateString = `${year}\n${data.clientName || 'PROJECT'}\n${(data.tags || '').toLowerCase()}`;

  return {
    seo: data.name,
    title: data.name,
    subhead: data.description,
    priority: data.priority,
    color: data.uiColor || 'ba7cde',
    date: dateString,
    projectLogo: data.projectLogo,
    clientName: data.clientName || 'DIGITA CURVE',
    body: data.description,
    perma: data.slug,
    caseStudyURL: data.caseStudyURL || `/work/${data.slug}`,
    projectURL: data.projectURL || `/work/${data.slug}`,
    videoURL: data.video?.url || '/assets/video/custom/contact.mp4',
    thumbnailURL: data.video?.thumbnail || '/assets/images/custom/contact.jpg',
    tags: (data.tags || '').toLowerCase(),
    index
  };
}

/**
 * Creates the 100% schema-compliant ABOUT ME project object for the native Active Theory
 * CMSData / WorkItem pipeline.
 */
function createAboutMeCMSProject(): RawCMSProject {
  const { about } = portfolioData;

  return {
    id: "about-vivek-singh",
    name: about.name,
    slug: "about",
    description: `${about.role} — ${about.shortIntroduction}`,
    clientName: "DIGITA CURVE / VARANASI",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/about-me.mp4",
      thumbnail: "/assets/images/custom/about-me.jpg"
    },
    uiColor: "00e5ff",
    tags: "About Me",
    priority: 0,
    caseStudyURL: "/about",
    projectURL: "/about"
  };
}

/**
 * Creates the 100% schema-compliant SKILLS project object for the native Active Theory
 * CMSData / WorkItem pipeline.
 */
function createSkillsCMSProject(): RawCMSProject {
  return {
    id: "skills-vivek-singh",
    name: "Skills & Capabilities",
    slug: "skills",
    description: "Digital Marketing • Web Development • Advanced Web & Motion • AI & Automation",
    clientName: "DIGITA CURVE / CAPABILITIES",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/skills.mp4",
      thumbnail: "/assets/images/custom/skills.jpg"
    },
    uiColor: "ba7cde",
    tags: "Digital Marketing, Web Development, Advanced Web, AI Automation",
    priority: 0.1,
    caseStudyURL: "/skills",
    projectURL: "/skills"
  };
}

/**
 * Creates the GOOGLE ADS native WorkItem card
 */
function createGoogleAdsCMSProject(): RawCMSProject {
  return {
    id: "skill-google-ads",
    name: "GOOGLE ADS",
    slug: "skills/google-ads",
    description: "Search Ads • Display Ads • Performance Max\nPPC • Campaign Planning • Ad Copy\nLanding Page Optimization • AI-Assisted Advertising",
    clientName: "DIGITA CURVE / ADS",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/google-ads.mp4",
      thumbnail: "/assets/images/custom/google-ads.jpg"
    },
    uiColor: "4285f4",
    tags: "Search Ads, Display Ads, Performance Max, PPC",
    priority: 0.2,
    caseStudyURL: "/skills/google-ads",
    projectURL: "/skills/google-ads"
  };
}

/**
 * Creates the SEO native WorkItem card
 */
function createSeoCMSProject(): RawCMSProject {
  return {
    id: "skill-seo",
    name: "SEO",
    slug: "skills/seo",
    description: "Technical SEO • On-Page SEO • Off-Page SEO\nKeyword Research • Backlinking • AEO • GEO",
    clientName: "DIGITA CURVE / SEARCH",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/seo.mp4",
      thumbnail: "/assets/images/custom/seo.jpg"
    },
    uiColor: "34a853",
    tags: "Technical SEO, On-Page SEO, Keyword Research, AEO, GEO",
    priority: 0.3,
    caseStudyURL: "/skills/seo",
    projectURL: "/skills/seo"
  };
}

/**
 * Creates the WEB DEVELOPMENT native WorkItem card
 */
function createWebDevelopmentCMSProject(): RawCMSProject {
  return {
    id: "skill-web-development",
    name: "WEB DEVELOPMENT",
    slug: "skills/web-development",
    description: "React • Next.js • JavaScript • HTML/CSS\nCustom Websites • E-commerce • SaaS\nShopify • WordPress • Elementor",
    clientName: "DIGITA CURVE / CODE",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/web-development.mp4",
      thumbnail: "/assets/images/custom/web-development.jpg"
    },
    uiColor: "61dafb",
    tags: "React, Next.js, JavaScript, Custom Websites, Shopify, WordPress",
    priority: 0.4,
    caseStudyURL: "/skills/web-development",
    projectURL: "/skills/web-development"
  };
}

/**
 * Creates the TRACKING & ANALYTICS native WorkItem card
 */
function createTrackingCMSProject(): RawCMSProject {
  return {
    id: "skill-tracking",
    name: "TRACKING & ANALYTICS",
    slug: "skills/tracking",
    description: "GTM • Tag Implementation • Event Tracking\nConversion Tracking • GA • Search Console",
    clientName: "DIGITA CURVE / ANALYTICS",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/tracking.mp4",
      thumbnail: "/assets/images/custom/tracking.jpg"
    },
    uiColor: "ea4335",
    tags: "Google Tag Manager, Tag Implementation, Event Tracking, GA4",
    priority: 0.5,
    caseStudyURL: "/skills/tracking",
    projectURL: "/skills/tracking"
  };
}

/**
 * Creates the SOCIAL MEDIA native WorkItem card
 */
function createSocialMediaCMSProject(): RawCMSProject {
  return {
    id: "skill-social-media",
    name: "SOCIAL MEDIA",
    slug: "skills/social-media",
    description: "Management • Content Calendar • Trends\nScripts • Creative Planning • Instagram • YouTube\nConversion CTAs",
    clientName: "DIGITA CURVE / SOCIAL",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/social-media.mp4",
      thumbnail: "/assets/images/custom/social-media.jpg"
    },
    uiColor: "e1306c",
    tags: "Social Media Management, Content Calendar, Instagram, YouTube",
    priority: 0.6,
    caseStudyURL: "/skills/social-media",
    projectURL: "/skills/social-media"
  };
}

/**
 * Creates the ADVANCED WEB & MOTION native WorkItem card
 */
function createWebMotionCMSProject(): RawCMSProject {
  return {
    id: "skill-web-motion",
    name: "ADVANCED WEB & MOTION",
    slug: "skills/web-motion",
    description: "GSAP • Lenis • Framer Motion\nInteractive Animation • Smooth Scrolling\nInteractive UI",
    clientName: "DIGITA CURVE / MOTION",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/web-motion.mp4",
      thumbnail: "/assets/images/custom/web-motion.jpg"
    },
    uiColor: "ba7cde",
    tags: "GSAP, Lenis, Framer Motion, Smooth Scrolling, Micro-Animations",
    priority: 0.7,
    caseStudyURL: "/skills/web-motion",
    projectURL: "/skills/web-motion"
  };
}

/**
 * Creates the AI & AUTOMATION native WorkItem card
 */
function createAiAutomationCMSProject(): RawCMSProject {
  return {
    id: "skill-ai-automation",
    name: "AI & AUTOMATION",
    slug: "skills/ai-automation",
    description: "AI Agents • Ollama • AI-Assisted Development\nWorkflow Automation • ChatGPT • Claude",
    clientName: "DIGITA CURVE / INTELLIGENCE",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/ai-automation.mp4",
      thumbnail: "/assets/images/custom/ai-automation.jpg"
    },
    uiColor: "00e5ff",
    tags: "AI Agents, Ollama, AI-Assisted Development, Claude, ChatGPT",
    priority: 0.8,
    caseStudyURL: "/skills/ai-automation",
    projectURL: "/skills/ai-automation"
  };
}

/**
 * Creates the E-COMMERCE SYSTEMS native WorkItem card
 */
function createEcommerceCMSProject(): RawCMSProject {
  return {
    id: "skill-ecommerce",
    name: "E-COMMERCE SYSTEMS",
    slug: "skills/ecommerce",
    description: "Admin Panels • Payment Gateways\nE-commerce Functionality",
    clientName: "DIGITA CURVE / COMMERCE",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/ecommerce.mp4",
      thumbnail: "/assets/images/custom/ecommerce.jpg"
    },
    uiColor: "ffb74d",
    tags: "Admin Panels, Payment Gateways, E-commerce",
    priority: 0.85,
    caseStudyURL: "/skills/ecommerce",
    projectURL: "/skills/ecommerce"
  };
}

/**
 * Creates the 100% schema-compliant SERVICES project object for the native Active Theory
 * CMSData / WorkItem pipeline.
 */
function createServicesCMSProject(): RawCMSProject {
  return {
    id: "services-vivek-singh",
    name: "SERVICES",
    slug: "services",
    description: "Google Ads • SEO • Web Development\nSocial Media • Performance Marketing",
    clientName: "DIGITA CURVE / SERVICES",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/services.mp4",
      thumbnail: "/assets/images/custom/services.jpg"
    },
    uiColor: "ffaa00",
    tags: "Google Ads, SEO, Web Development, Social Media, Performance Marketing",
    priority: 0.9,
    caseStudyURL: "/services",
    projectURL: "/services"
  };
}

/**
 * Creates the 100% schema-compliant PROJECTS project object for the native Active Theory
 * CMSData / WorkItem pipeline.
 */
function createProjectsCMSProject(): RawCMSProject {
  return {
    id: "projects-vivek-singh",
    name: "PROJECTS",
    slug: "work",
    description: "SiteSupply • Kashi Darshan • Ayodhya Darshan • Varanasi Travelers\nGolden Age Landbase • Trip Customizer • Kashi Prasad • AI E-commerce Agent",
    clientName: "DIGITA CURVE / PORTFOLIO",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/projects.mp4",
      thumbnail: "/assets/images/custom/projects.jpg"
    },
    uiColor: "00ff88",
    tags: "Case Studies, Client Projects, Web Applications",
    priority: 0.93,
    caseStudyURL: "/work",
    projectURL: "/work"
  };
}

/**
 * Creates the 100% schema-compliant EXPERIENCE project object for the native Active Theory
 * CMSData / WorkItem pipeline.
 */
function createExperienceCMSProject(): RawCMSProject {
  return {
    id: "experience-vivek-singh",
    name: "EXPERIENCE",
    slug: "experience",
    description: "DIGITA CURVE • Founding Member\nDigital Marketing • Web Development • AI & Automation",
    clientName: "DIGITA CURVE / ROLES",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/experience.mp4",
      thumbnail: "/assets/images/custom/experience.jpg"
    },
    uiColor: "00e5ff",
    tags: "Founding Member, Digital Marketing, Web Development, AI Automation",
    priority: 0.96,
    caseStudyURL: "/experience",
    projectURL: "/experience"
  };
}

/**
 * Creates the 100% schema-compliant CONTACT project object for the native Active Theory
 * CMSData / WorkItem pipeline.
 */
function createContactCMSProject(): RawCMSProject {
  return {
    id: "contact-vivek-singh",
    name: "CONTACT",
    slug: "contact",
    description: "LET'S BUILD SOMETHING\nDIGITAL MARKETING • WEB • AI",
    clientName: "DIGITA CURVE / CONNECT",
    completionDate: "2025-01-01T12:00:00.000Z",
    projectLogo: null,
    video: {
      url: "/assets/video/custom/contact.mp4",
      thumbnail: "/assets/images/custom/contact.jpg"
    },
    uiColor: "00ffcc",
    tags: "Contact, Get In Touch, Digital Marketing, Web, AI",
    priority: 0.98,
    caseStudyURL: "/contact",
    projectURL: "/contact"
  };
}

/**
 * Build the exact 14-item array of custom portfolio cards:
 * - Card 0: ABOUT ME
 * - Card 1: SKILLS
 * - Card 2: GOOGLE ADS
 * - Card 3: SEO
 * - Card 4: WEB DEVELOPMENT
 * - Card 5: TRACKING & ANALYTICS
 * - Card 6: SOCIAL MEDIA
 * - Card 7: ADVANCED WEB & MOTION
 * - Card 8: AI & AUTOMATION
 * - Card 9: E-COMMERCE SYSTEMS
 * - Card 10: SERVICES
 * - Card 11: PROJECTS
 * - Card 12: EXPERIENCE
 * - Card 13: CONTACT
 */
async function build14WorkItems(): Promise<ReshapedWorkItem[]> {
  const customCardsRaw = [
    createAboutMeCMSProject(),
    createSkillsCMSProject(),
    createGoogleAdsCMSProject(),
    createSeoCMSProject(),
    createWebDevelopmentCMSProject(),
    createTrackingCMSProject(),
    createSocialMediaCMSProject(),
    createWebMotionCMSProject(),
    createAiAutomationCMSProject(),
    createEcommerceCMSProject(),
    createServicesCMSProject(),
    createProjectsCMSProject(),
    createExperienceCMSProject(),
    createContactCMSProject()
  ];

  return customCardsRaw.map((card, idx) =>
    reshapeCMSProject(card, idx)
  );
}

/**
 * Updates DOM document title, meta descriptions, OpenGraph, and JSON-LD schemas.
 */
export function syncHeadMetadata(): void {
  const { seo } = portfolioData;

  const generatedSEO = buildPageSEO({
    title: seo.title,
    description: seo.description,
    canonicalUrl: 'https://digitacurve.com',
    keywords: seo.keywords,
    type: 'website'
  });

  applySEOToHead(generatedSEO);
}

/**
 * Installs the portfolio text assistant & question menu bridge
 */
function installAssistantAndChatHooks(): void {
  const portfolioCategories = [
    { title: "→ GOOGLE & META ADS", slug: "skills/google-ads", query: "Tell me about Google Ads and Meta Ads campaigns" },
    { title: "→ SEO & GROWTH", slug: "skills/seo", query: "Tell me about Technical SEO, On-Page SEO, and organic search growth" },
    { title: "→ WEB DEVELOPMENT", slug: "skills/web-development", query: "Tell me about full-stack web development with React and Next.js" },
    { title: "→ TRACKING & ANALYTICS", slug: "skills/tracking", query: "Tell me about Google Tag Manager and GA4 conversion tracking" },
    { title: "→ AI & AUTOMATION", slug: "skills/ai-automation", query: "Tell me about AI agents and workflow automation" },
    { title: "→ PROJECTS & EXPERIENCE", slug: "work", query: "Tell me about featured projects and DIGITA CURVE experience" },
    { title: "→ LET'S CONNECT", slug: "contact", query: "How can I contact Vivek Singh directly?" }
  ];

  const portfolioOnce = async function (formText: string): Promise<string> {
    bankaiVoice.cancelSpeech();
    const rawWindow = window as any;
    const AppState = rawWindow.AppState;
    if (AppState) {
      AppState.set("InteractAIAssistant/isThinking", true);
    }
    try {
      const result = await askPortfolioAssistant(formText);
      if (AppState) {
        AppState.set("InteractAIAssistant/isThinking", false);
        if (result.targetSlug) {
          AppState.set("CMSData/slug", { slug: result.targetSlug, message: result.text }, true);
        }
      }
      return result.text;
    } catch (err) {
      console.error("Portfolio Assistant Error:", err);
      if (AppState) {
        AppState.set("InteractAIAssistant/isThinking", false);
      }
      return "BANKAI is ready. Ask about performance marketing, SEO, web development, or projects.";
    }
  };

  // Helper to render the static BANKAI menu and isolate the conversation history scroll container
  const renderCustomPortfolioMenu = (messagesDiv: HTMLElement, chatInst?: any) => {
    if (!messagesDiv) return;

    // Attach scroll containment and event isolation to messagesDiv
    if (!messagesDiv.dataset.scrollHooked) {
      messagesDiv.dataset.scrollHooked = "true";
      messagesDiv.classList.add("chat-messages-scroll-container");

      // Prevent wheel bubbling to the 3D WebGL camera
      messagesDiv.addEventListener("wheel", (e) => {
        e.stopPropagation();
      }, { passive: true });

      // Track scroll position to prevent interrupting user when reading history
      messagesDiv.addEventListener("scroll", () => {
        const isAtBottom = Math.abs(messagesDiv.scrollTop) < 60 ||
          (messagesDiv.scrollHeight - messagesDiv.scrollTop - messagesDiv.clientHeight < 60);
        messagesDiv.dataset.isAtBottom = isAtBottom ? "true" : "false";
      }, { passive: true });

      // Auto-scroll when new messages arrive only if user is at the bottom
      const msgObserver = new MutationObserver(() => {
        if (messagesDiv.dataset.isAtBottom !== "false") {
          messagesDiv.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      msgObserver.observe(messagesDiv, { childList: true });
    }

    // Mount or synchronize the STATIC BANKAI MENU above messagesDiv
    const wrapperDiv = messagesDiv.parentElement;
    if (wrapperDiv) {
      const rawWindow = window as any;
      const isCardOpen = !!(rawWindow.AppState?.get && rawWindow.AppState.get("Work/project", true));

      let menuContainer = wrapperDiv.querySelector('.bankai-static-menu') as HTMLElement | null;
      if (!menuContainer) {
        menuContainer = document.createElement('div');
        menuContainer.className = 'bankai-static-menu';
        if (isCardOpen) {
          menuContainer.setAttribute('data-hidden', 'true');
          menuContainer.classList.add('card-open-hidden');
          menuContainer.style.setProperty('display', 'none', 'important');
        } else {
          menuContainer.removeAttribute('data-hidden');
          menuContainer.classList.remove('card-open-hidden');
          menuContainer.style.setProperty('display', 'flex', 'important');
        }
        wrapperDiv.insertBefore(menuContainer, messagesDiv);
      } else {
        if (isCardOpen) {
          menuContainer.setAttribute('data-hidden', 'true');
          menuContainer.classList.add('card-open-hidden');
          menuContainer.style.setProperty('display', 'none', 'important');
        }
      }

      if (!menuContainer.dataset.eventsHooked) {
        menuContainer.dataset.eventsHooked = "true";
        menuContainer.addEventListener("pointerdown", (e) => e.stopPropagation());
        menuContainer.addEventListener("mousedown", (e) => e.stopPropagation());
        menuContainer.addEventListener("click", (e) => e.stopPropagation());
      }

      // Check if menu is already built with all 7 links
      if (menuContainer.querySelectorAll('a.home').length !== 7) {
        while (menuContainer.firstChild) {
          menuContainer.removeChild(menuContainer.firstChild);
        }

        // 1. Header Element
        const header = document.createElement("p");
        header.className = "bankai-menu-header";
        header.textContent = "WHAT CAN I HELP YOU WITH?";
        menuContainer.appendChild(header);

        // 2. Native BANKAI Holographic Core & Voice Control Hero Row
        const heroRow = document.createElement("div");
        heroRow.className = "bankai-core-interactive-row";

        // Shared query execution pipeline (strictly once per query)
        const executeAssistantQuery = async (queryText: string) => {
          const raw = (queryText || '').trim();
          if (!raw) return;

          bankaiVoice.setThinking();

          const userMsg = document.createElement("p");
          userMsg.textContent = raw;
          userMsg.style.color = "#00ffff";
          messagesDiv.prepend(userMsg);

          const rawWindow = window as any;
          const AppState = rawWindow.AppState;
          if (AppState) {
            AppState.set("InteractAIAssistant/isThinking", true);
          }

          try {
            const result = await askPortfolioAssistant(raw);
            if (AppState) {
              AppState.set("InteractAIAssistant/isThinking", false);
              if (result.targetSlug) {
                AppState.set("CMSData/slug", { slug: result.targetSlug, message: result.text }, true);
              }
            }

            const respElem = document.createElement("p");
            respElem.textContent = result.text;
            respElem.style.color = "#ffffff";
            messagesDiv.prepend(respElem);

            if (messagesDiv.dataset.isAtBottom !== "false") {
              messagesDiv.scrollTo({ top: 0, behavior: 'smooth' });
            }

            bankaiVoice.speak(result.text);
          } catch (err) {
            console.error("[BANKAI Voice] Query error:", err);
            if (AppState) {
              AppState.set("InteractAIAssistant/isThinking", false);
            }
            const fallbackText = "BANKAI is ready. Ask about performance marketing, SEO, web development, or projects.";
            const respElem = document.createElement("p");
            respElem.textContent = fallbackText;
            respElem.style.color = "#ffffff";
            messagesDiv.prepend(respElem);
            bankaiVoice.speak(fallbackText);
          }
        };

        // Shared voice trigger action strictly single-source
        const handleVoiceTrigger = () => {
          const currentState = bankaiVoice.getState();

          if (currentState === 'speaking') {
            bankaiVoice.cancelSpeech();
            return;
          }

          if (currentState === 'listening') {
            bankaiVoice.stopListening();
            return;
          }

          if (currentState === 'thinking') {
            return;
          }

          // Start speech recognition
          bankaiVoice.startListening((transcript) => {
            executeAssistantQuery(transcript);
          });
        };

        // Holographic Living Core (62px diameter)
        const coreInst = createBankaiCoreElement({
          size: 62,
          onClick: handleVoiceTrigger
        });
        heroRow.appendChild(coreInst.element);

        // Identity and Action Container
        const identityCol = document.createElement("div");
        identityCol.className = "bankai-identity-column";

        const badge = document.createElement("div");
        badge.className = "bankai-assistant-badge";
        const dot = document.createElement("span");
        dot.className = "bankai-dot";
        const nameText = document.createTextNode("ASK BANKAI");
        badge.appendChild(dot);
        badge.appendChild(nameText);
        identityCol.appendChild(badge);

        // Button action group (Tap to speak + Wake toggle)
        const btnGroup = document.createElement("div");
        btnGroup.className = "bankai-voice-btn-group";

        // Voice Trigger Button
        const voiceBtn = document.createElement("button");
        voiceBtn.type = "button";
        voiceBtn.className = "bankai-voice-trigger";
        voiceBtn.setAttribute("aria-label", "Tap to speak with BANKAI");

        const iconContainer = document.createElement("div");
        iconContainer.className = "bankai-voice-icon-container";
        iconContainer.innerHTML = `
          <svg class="bankai-mic-icon" viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
            <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
            <line x1="12" y1="19" x2="12" y2="22"></line>
          </svg>
          <span class="bankai-voice-waves">
            <span></span><span></span><span></span>
          </span>
        `;

        const voiceStatusText = document.createElement("span");
        voiceStatusText.className = "bankai-voice-label";
        voiceStatusText.textContent = "TAP TO SPEAK";

        voiceBtn.appendChild(iconContainer);
        voiceBtn.appendChild(voiceStatusText);
        btnGroup.appendChild(voiceBtn);

        // Wake Word Toggle Button
        const wakeBtn = document.createElement("button");
        wakeBtn.type = "button";
        wakeBtn.className = "bankai-wake-toggle";

        const updateWakeBtnUI = () => {
          if (!bankaiVoice.isWakeSupported()) {
            wakeBtn.setAttribute("disabled", "true");
            wakeBtn.classList.add("unsupported");
            wakeBtn.innerHTML = `<span>⚡ WAKE: N/A</span>`;
            wakeBtn.setAttribute("title", "Speech recognition not supported in this browser");
            return;
          }

          const active = bankaiVoice.isWakeModeActive();
          wakeBtn.dataset.wakeActive = active ? "true" : "false";
          wakeBtn.innerHTML = active
            ? `<span class="bankai-wake-dot"></span><span>WAKE: ACTIVE</span>`
            : `<span>⚡ WAKE: OFF</span>`;
        };

        updateWakeBtnUI();

        wakeBtn.onclick = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();

          if (!bankaiVoice.isWakeSupported()) return;

          if (bankaiVoice.isWakeModeActive()) {
            bankaiVoice.disableWakeMode();
            updateWakeBtnUI();
          } else {
            bankaiVoice.enableWakeMode((query) => {
              executeAssistantQuery(query);
            });
            updateWakeBtnUI();
          }
        };

        btnGroup.appendChild(wakeBtn);
        identityCol.appendChild(btnGroup);
        heroRow.appendChild(identityCol);
        menuContainer.appendChild(heroRow);

        // Subscribe to voice state changes
        bankaiVoice.subscribe((change) => {
          coreInst.updateState(change.state);
          voiceBtn.dataset.voiceState = change.state;
          updateWakeBtnUI();

          switch (change.state) {
            case 'wake-ready':
              voiceStatusText.textContent = 'LISTENING FOR "BANKAI"...';
              break;
            case 'listening':
              voiceStatusText.textContent = "LISTENING...";
              break;
            case 'thinking':
              voiceStatusText.textContent = "THINKING...";
              break;
            case 'speaking':
              voiceStatusText.textContent = "BANKAI SPEAKING...";
              break;
            case 'error':
              voiceStatusText.textContent = change.message || "VOICE UNAVAILABLE";
              break;
            case 'idle':
            default:
              voiceStatusText.textContent = "TAP TO SPEAK";
              break;
          }
        });

        // Voice click interaction
        voiceBtn.onclick = (e: MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
          handleVoiceTrigger();
        };

        // 4. 7 Category Links in exact top-to-bottom order
        const catList = document.createElement("div");
        catList.className = "bankai-categories-list";

        portfolioCategories.forEach((cat) => {
          const link = document.createElement("a");
          link.textContent = cat.title;
          link.setAttribute("title", cat.title);
          link.classList.add("home");

          link.onclick = async (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            bankaiVoice.cancelSpeech();

            if (chatInst?.get && chatInst.get("disableFiltering", true)) return;
            if (chatInst?.set) {
              chatInst.set("disableFiltering", true);
              chatInst.delayedCall?.(() => {
                chatInst.set("disableFiltering", false);
              }, 1000);
            }

            // Active class management
            menuContainer!.querySelectorAll('a.home').forEach((el) => el.classList.remove("active"));
            link.classList.add("active");

            if (chatInst?.fire) chatInst.fire("clickFilter");
            if (chatInst) {
              chatInst.active = link.text;
              if (chatInst.set) {
                chatInst.set("Work/project", null);
                chatInst.set("lastClick", Date.now());
              }
            }

            const rawWindow = window as any;
            const AppState = rawWindow.AppState;
            const result = await askPortfolioAssistant(cat.query);
            const targetSlug = cat.slug || result.targetSlug;

            if (AppState && targetSlug) {
              AppState.set("CMSData/slug", { slug: targetSlug, message: result.text }, true);
            }

            // Display clicked category and assistant response in conversation history
            const userMsg = document.createElement("p");
            userMsg.textContent = cat.title;
            userMsg.style.color = "#00ffff";
            messagesDiv.prepend(userMsg);

            const respElem = document.createElement("p");
            respElem.textContent = result.text;
            respElem.style.color = "#ffffff";
            messagesDiv.prepend(respElem);

            // Smart auto-scroll if user is near bottom
            if (messagesDiv.dataset.isAtBottom !== "false") {
              messagesDiv.scrollTo({ top: 0, behavior: 'smooth' });
            }
          };

          catList.appendChild(link);
        });

        menuContainer.appendChild(catList);
      }
    }

    // Clean any legacy links or duplicate headers inside the messagesDiv conversation container
    const legacyElements = Array.from(messagesDiv.children).filter((el) => {
      const txt = el.textContent || '';
      return (
        txt.includes('websites') ||
        txt.includes('installations') ||
        txt.includes('XR / VR / AI') ||
        txt.includes('multiplayer') ||
        txt.includes('games') ||
        txt.includes('What are you looking for?') ||
        txt.includes('WHAT CAN I HELP YOU WITH?') ||
        (el.tagName === 'A' && el.classList.contains('home'))
      );
    });
    legacyElements.forEach((el) => messagesDiv.removeChild(el));
  };

  const applyChatDOMOnInit = function (this: any) {
    const _this = this;
    if (_this.messages?.div) {
      renderCustomPortfolioMenu(_this.messages.div, _this);
    }
  };

  const setupHooks = () => {
    const rawWindow = window as any;

    // 1. Hook InteractAI.Assistant prototype & constructor
    if (rawWindow.InteractAI) {
      if (rawWindow.InteractAI.Assistant && !rawWindow.InteractAI.Assistant.__portfolioHooked) {
        const OriginalAssistant = rawWindow.InteractAI.Assistant;
        if (OriginalAssistant.prototype) {
          OriginalAssistant.prototype.once = portfolioOnce;
        }

        const WrappedAssistant = function (this: any, _props: any) {
          const inst = new OriginalAssistant(_props);
          inst.once = portfolioOnce;
          return inst;
        };
        WrappedAssistant.prototype = OriginalAssistant.prototype;
        (WrappedAssistant as any).__portfolioHooked = true;
        rawWindow.InteractAI.Assistant = WrappedAssistant;
      }

      if (typeof rawWindow.InteractAI.Class === 'function' && !rawWindow.InteractAI.Class.__portfolioHooked) {
        const origAIClass = rawWindow.InteractAI.Class;
        rawWindow.InteractAI.Class = function (fn: any) {
          if (fn && fn.name === 'Assistant') {
            const origAssistant = fn;
            const wrappedAssistant = function Assistant(this: any, ...args: any[]) {
              const inst = new origAssistant(...args);
              inst.once = portfolioOnce;
              return inst;
            };
            wrappedAssistant.prototype = origAssistant.prototype;
            origAssistant.prototype.once = portfolioOnce;
            (wrappedAssistant as any).__portfolioHooked = true;
            return origAIClass(wrappedAssistant);
          }
          return origAIClass(fn);
        };
        rawWindow.InteractAI.Class.__portfolioHooked = true;
      }
    }

    // 2. Hook ChatDOM
    if (rawWindow.ChatDOM && !rawWindow.ChatDOM.__portfolioHooked) {
      const OriginalChatDOM = rawWindow.ChatDOM;
      OriginalChatDOM.prototype.onInit = applyChatDOMOnInit;

      const WrappedChatDOM = function (this: any, ...args: any[]) {
        const inst = new OriginalChatDOM(...args);
        inst.onInit = applyChatDOMOnInit.bind(inst);
        if (inst.assistant) {
          inst.assistant.once = portfolioOnce;
        }
        inst.listen?.("resetOptions", () => {
          const isCardOpen = !!(rawWindow.AppState?.get && rawWindow.AppState.get("Work/project", true));
          if (!isCardOpen) {
            document.body.removeAttribute('data-card-open');
            const menus = document.querySelectorAll('.bankai-static-menu') as NodeListOf<HTMLElement>;
            menus.forEach((menu) => {
              menu.removeAttribute('data-hidden');
              menu.classList.remove('card-open-hidden');
              menu.style.setProperty('display', 'flex', 'important');
            });
          }
        });
        inst.listen?.("clearText", () => {
          const isCardOpen = !!(rawWindow.AppState?.get && rawWindow.AppState.get("Work/project", true));
          if (isCardOpen) {
            document.body.setAttribute('data-card-open', 'true');
            const menus = document.querySelectorAll('.bankai-static-menu') as NodeListOf<HTMLElement>;
            menus.forEach((menu) => {
              menu.setAttribute('data-hidden', 'true');
              menu.classList.add('card-open-hidden');
              menu.style.setProperty('display', 'none', 'important');
            });
          }
        });
        if (inst.messages?.div) {
          setTimeout(() => {
            renderCustomPortfolioMenu(inst.messages.div, inst);
          }, 50);
        }
        return inst;
      };
      WrappedChatDOM.prototype = OriginalChatDOM.prototype;
      (WrappedChatDOM as any).__portfolioHooked = true;
      rawWindow.ChatDOM = WrappedChatDOM;
    }

    // 3. Hook Work/project state to hide BANKAI menu when viewing an opened WebGL card
    if (rawWindow.AppState && !rawWindow.AppState.__bankaiCardVisibilityHooked) {
      const updateVisibility = (projectData: any) => {
        const isCardOpen = !!projectData;
        if (typeof document !== 'undefined') {
          if (isCardOpen) {
            document.body.setAttribute('data-card-open', 'true');
          } else {
            document.body.removeAttribute('data-card-open');
          }
          const menus = document.querySelectorAll('.bankai-static-menu') as NodeListOf<HTMLElement>;
          menus.forEach((menu) => {
            if (isCardOpen) {
              menu.setAttribute('data-hidden', 'true');
              menu.classList.add('card-open-hidden');
              menu.style.setProperty('display', 'none', 'important');
            } else {
              menu.removeAttribute('data-hidden');
              menu.classList.remove('card-open-hidden');
              menu.style.setProperty('display', 'flex', 'important');
            }
          });
        }
      };

      rawWindow.AppState.bind("Work/project", updateVisibility);
      rawWindow.AppState.__bankaiCardVisibilityHooked = true;
    }

    // 3. Fallback for CMSData.filter
    if (rawWindow.CMSData && !rawWindow.CMSData.__portfolioHooked) {
      const OriginalFilter = typeof rawWindow.CMSData.filter === 'function' ? rawWindow.CMSData.filter.bind(rawWindow.CMSData) : null;
      rawWindow.CMSData.filter = function (tag: string) {
        const AppState = rawWindow.AppState;
        const tagLower = (tag || '').toLowerCase();

        const slugMap: Record<string, string> = {
          'google-ads': 'skills/google-ads',
          'skills/google-ads': 'skills/google-ads',
          'seo': 'skills/seo',
          'skills/seo': 'skills/seo',
          'web-development': 'skills/web-development',
          'skills/web-development': 'skills/web-development',
          'tracking': 'skills/tracking',
          'skills/tracking': 'skills/tracking',
          'social-media': 'skills/social-media',
          'skills/social-media': 'skills/social-media',
          'web-motion': 'skills/web-motion',
          'skills/web-motion': 'skills/web-motion',
          'ai-automation': 'skills/ai-automation',
          'skills/ai-automation': 'skills/ai-automation',
          'ecommerce': 'skills/ecommerce',
          'skills/ecommerce': 'skills/ecommerce',
          'services': 'services',
          'work': 'work',
          'experience': 'experience',
          'contact': 'contact',
          'about': 'about',
          'skills': 'skills'
        };

        if (slugMap[tagLower] && AppState) {
          AppState.set("CMSData/slug", { slug: slugMap[tagLower], message: "" }, true);
          return;
        }

        if (OriginalFilter) {
          try {
            return OriginalFilter(tag);
          } catch {
            // graceful fallback
          }
        }
      };
      rawWindow.CMSData.__portfolioHooked = true;
    }

    // 4. DOM Synchronizer & Sanitizer (Inspects ChatDOM DOM container directly)
    const textarea = document.querySelector('textarea[placeholder="Ask me anything..."]');
    if (textarea && textarea.parentElement) {
      const wrapper = textarea.parentElement;
      const messagesDiv = wrapper.querySelector('div') as HTMLElement | null;
      if (messagesDiv) {
        const hasLegacy = Array.from(messagesDiv.children).some((el) => {
          const txt = el.textContent || '';
          return txt.includes('websites') || txt.includes('installations') || txt.includes('XR / VR / AI') || txt.includes('multiplayer') || txt.includes('games') || txt.includes('What are you looking for?');
        });

        if (hasLegacy || messagesDiv.children.length === 0) {
          renderCustomPortfolioMenu(messagesDiv);
        }
      }
    }
  };

  setupHooks();
  const interval = setInterval(setupHooks, 100);

  // Setup DOM MutationObserver to guard against any late legacy render
  if (typeof MutationObserver !== 'undefined') {
    const domObserver = new MutationObserver(() => {
      const textarea = document.querySelector('textarea[placeholder="Ask me anything..."]');
      if (textarea && textarea.parentElement) {
        const wrapper = textarea.parentElement;
        const messagesDiv = wrapper.querySelector('div') as HTMLElement | null;
        if (messagesDiv) {
          const hasLegacy = Array.from(messagesDiv.children).some((el) => {
            const txt = el.textContent || '';
            return txt.includes('websites') || txt.includes('installations') || txt.includes('XR / VR / AI') || txt.includes('multiplayer') || txt.includes('games') || txt.includes('What are you looking for?');
          });

          if (hasLegacy) {
            renderCustomPortfolioMenu(messagesDiv);
          }
        }
      }
    });

    domObserver.observe(document.body, { childList: true, subtree: true });
  }

  setTimeout(() => clearInterval(interval), 30000);
}

/**
 * Installs data handlers and link redirects before the Active Theory runtime executes.
 */
export function initPortfolioBridge(): void {
  syncHeadMetadata();
  installAssistantAndChatHooks();

  let cached14Items: ReshapedWorkItem[] | null = null;
  build14WorkItems().then((items) => {
    cached14Items = items;
  });

  // Intercept window.get for CMS data to serve local cached CMS data
  if (typeof window !== 'undefined') {
    const rawWindow = window as unknown as Record<string, unknown>;
    const originalGet = typeof rawWindow.get === 'function' ? (rawWindow.get as (url: string, opts?: unknown) => Promise<unknown>) : null;

    rawWindow.get = async function (url: string, options?: unknown) {
      if (typeof url === 'string') {
        if (url.includes('cms/projects-') || url.includes('/projects-')) {
          const customCards = [
            createAboutMeCMSProject(),
            createSkillsCMSProject(),
            createGoogleAdsCMSProject(),
            createSeoCMSProject(),
            createWebDevelopmentCMSProject(),
            createTrackingCMSProject(),
            createSocialMediaCMSProject(),
            createWebMotionCMSProject(),
            createAiAutomationCMSProject(),
            createEcommerceCMSProject(),
            createServicesCMSProject(),
            createProjectsCMSProject(),
            createExperienceCMSProject(),
            createContactCMSProject()
          ];
          return customCards;
        }
        if (url.includes('cms/metadata-') || url.includes('/metadata-')) {
          try {
            const res = await fetch('/assets/data/cms/metadata-dev.json');
            return await res.json();
          } catch (err) {
            console.warn('Fallback loading metadata-dev.json:', err);
          }
        }
        if (url.includes('cms/contact-') || url.includes('/contact-')) {
          try {
            const res = await fetch('/assets/data/cms/contact-dev.json');
            return await res.json();
          } catch (err) {
            console.warn('Fallback loading contact-dev.json:', err);
          }
        }
      }

      if (originalGet) {
        return originalGet(url, options);
      }
      return fetch(url, options as RequestInit).then((r) => r.json());
    };

    // Hook into Data.handleRequest('workItems') to provide the full 14-item StateArray
    const installDataHook = () => {
      const globalData = (window as unknown as { Data?: { handleRequest?: (type: string, cb: (data?: unknown, mockData?: () => unknown) => unknown) => void } }).Data;
      if (globalData && typeof globalData.handleRequest === 'function') {
        const originalHandleRequest = globalData.handleRequest.bind(globalData);
        globalData.handleRequest = function (type: string, cb: (data?: unknown, mockData?: () => unknown) => unknown) {
          if (type === 'workItems') {
            return originalHandleRequest('workItems', async (_data?: unknown, mockData?: () => unknown) => {
              const items = cached14Items || (await build14WorkItems());
              const StateArrayClass = (window as unknown as { StateArray?: new (src?: unknown[]) => unknown }).StateArray;
              if (StateArrayClass && items.length) {
                return new StateArrayClass(items);
              }
              return cb ? cb(_data, mockData) : items;
            });
          }
          return originalHandleRequest(type, cb);
        };
        return true;
      }
      return false;
    };

    if (!installDataHook()) {
      let currentData = (window as unknown as { Data?: unknown }).Data;
      Object.defineProperty(window, 'Data', {
        configurable: true,
        enumerable: true,
        get() {
          return currentData;
        },
        set(val) {
          currentData = val;
          if (val && typeof val.handleRequest === 'function') {
            const originalHandle = val.handleRequest.bind(val);
            val.handleRequest = function (type: string, cb: (data?: unknown, mockData?: () => unknown) => unknown) {
              if (type === 'workItems') {
                return originalHandle('workItems', async (_data?: unknown, mockData?: () => unknown) => {
                  const items = cached14Items || (await build14WorkItems());
                  const StateArrayClass = (window as unknown as { StateArray?: new (src?: unknown[]) => unknown }).StateArray;
                  if (StateArrayClass && items.length) {
                    return new StateArrayClass(items);
                  }
                  return cb ? cb(_data, mockData) : items;
                });
              }
              return originalHandle(type, cb);
            };
          }
        }
      });
    }
  }

  // Intercept window.open calls from UI components to direct to user social/contact links
  const originalWindowOpen = window.open.bind(window);
  window.open = function (url?: string | URL, target?: string, features?: string) {
    if (typeof url === 'string') {
      // Intercept Email
      if (url.includes('mailto:hello@activetheory.net') || url.startsWith('mailto:')) {
        return originalWindowOpen(`mailto:${portfolioData.email}`, target, features);
      }
      // Intercept Instagram
      if (url.includes('instagram.com/activetheory') && portfolioData.social.instagram) {
        return originalWindowOpen(portfolioData.social.instagram, target, features);
      }
      // Intercept LinkedIn
      if (url.includes('linkedin.com/company/active-theory') && portfolioData.social.linkedin) {
        return originalWindowOpen(portfolioData.social.linkedin, target, features);
      }
      // Intercept Twitter
      if (url.includes('twitter.com/active_theory')) {
        const targetUrl = portfolioData.social.twitter || portfolioData.social.github || portfolioData.social.website;
        if (targetUrl) {
          return originalWindowOpen(targetUrl, target, features);
        }
      }
    }
    return originalWindowOpen(url, target, features);
  };
}
