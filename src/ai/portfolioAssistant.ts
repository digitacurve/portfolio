/**
 * Portfolio Assistant Engine (BANKAI)
 * 
 * Fully local, secure, factually-grounded conversational engine for Vivek Singh / DIGITA CURVE.
 * 
 * - Grounded strictly in src/ai/portfolioKnowledge.ts (Bio, Stats, Skills, Services, Case Studies)
 * - Zero client-side API keys or external server dependencies
 * - Anti-hallucination guardrails for undocumented metrics, personal queries, or out-of-scope claims
 * - Natural-language intent matching powered by Google Ads search intent patterns & aliases
 * - Resolves queries to one of the 14 verified WebGL card targetSlugs or null for out-of-scope queries
 * - Returns concise natural responses (< 290 chars) optimized for ChatDOM
 */

import { getPortfolioKnowledge, type PortfolioKnowledgeBase } from './portfolioKnowledge';
import type { AssistantResponse, IntentDefinition } from './types';

// The 14 official card target slugs matching the WebGL WorkItem sequence
export const VALID_TARGET_SLUGS = [
  'about',
  'skills',
  'skills/google-ads',
  'skills/seo',
  'skills/web-development',
  'skills/tracking',
  'skills/social-media',
  'skills/web-motion',
  'skills/ai-automation',
  'skills/ecommerce',
  'services',
  'work',
  'experience',
  'contact'
] as const;

export type ValidTargetSlug = typeof VALID_TARGET_SLUGS[number];

/**
 * Truncate response safely to remain within ChatDOM container aesthetic limit (< 290 chars)
 */
function formatResponse(
  text: string,
  targetSlug: string | null = null,
  confidence = 1.0,
  matchedCategory?: string
): AssistantResponse {
  const trimmed = text.length > 290 ? text.substring(0, 287) + '...' : text;
  return {
    text: trimmed,
    targetSlug,
    confidence,
    matchedCategory
  };
}

/**
 * Normalizes input text for resilient natural language pattern matching
 */
function normalizeQuery(raw: string): string {
  return (raw || '')
    .toLowerCase()
    .replace(/'s\b/g, '')
    .replace(/[^\w\s.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Intent Registry mapping search query themes and natural language aliases to grounded responses and target slugs.
 */
interface AssistantIntent extends IntentDefinition {
  handler: (query: string, kb: PortfolioKnowledgeBase) => string;
}

const INTENT_REGISTRY: AssistantIntent[] = [
  // 1. Google Ads / Paid Ads
  {
    id: 'google-ads',
    category: 'Google & Meta Ads',
    targetSlug: 'skills/google-ads',
    priority: 8,
    aliases: [
      'google ads', 'google ad', 'google advertising', 'search ads', 'display ads',
      'performance max', 'pmax', 'ppc', 'pay per click', 'paid search', 'paid ads',
      'paid advertising', 'cpc', 'roas', 'cpl', 'ad copy', 'ad campaign', 'adwords',
      'google adwords', 'run google ads', 'manage google ads', 'advertise on google',
      'advertise my business on google', 'google ads management', 'paid search ads',
      'leads from google', 'get leads from google', 'generate leads through google',
      'get customers through google', 'advertise on google for leads', 'leads through google'
    ],
    patterns: [
      /\b(google\s*(ads?|adwords|advertising)|paid\s*(search|ads?|advertising)|ppc|pmax|performance\s*max|search\s*ads?|display\s*ads?)\b/i,
      /\b(manage|run|create|optimize|set\s*up|handle|provide)\s+(ppc|paid\s*ads|google\s*ads?|search\s*ads|pmax|performance\s*max|ad\s*campaigns?)\b/i,
      /\b(advertise|promote|market)\s+(my\s+)?(business\s+)?(on\s+google|via\s+google|through\s+google)\b/i,
      /\b(get|generate|acquire|capture|bring)\s+(me\s+)?(more\s+)?(leads?|customers?|clients?|sales)\s+(from|through|via|on)\s+google\b/i,
      /\b(leads?|customers?)\s+(from|through|via)\s+google\b/i,
      /\badvertise\s+(on|via)\s+google\s+(for\s+leads?|for\s+customers?)\b/i
    ],
    handler: () =>
      "Vivek manages Google Ads campaigns specializing in Search Ads, Display, Performance Max, PPC campaign structures, ROAS scaling, A/B ad copy testing, and lead generation."
  },

  // 2. SEO & Organic Search Growth
  {
    id: 'seo',
    category: 'SEO & Growth',
    targetSlug: 'skills/seo',
    priority: 10,
    aliases: [
      'seo', 'search engine optimization', 'technical seo', 'on-page seo', 'off-page seo',
      'local seo', 'aeo', 'geo', 'keyword research', 'backlink', 'backlinks', 'ranking',
      'google ranking', 'organic traffic', 'organic search', 'organic growth', 'search console',
      'website audit', 'seo audit', 'improve ranking', 'rank on google', 'rank higher',
      'improve google ranking', 'get more organic traffic', 'search visibility'
    ],
    patterns: [
      /\b(seo|search\s*engine\s*optimization|technical\s*seo|on[- ]page\s*seo|off[- ]page\s*seo|local\s*seo|aeo|geo)\b/i,
      /\b(improve|increase|boost|get).*(google\s*ranking|ranking\s*on\s*google|rank\s*higher|organic\s*traffic|organic\s*growth|search\s*visibility)\b/i,
      /\b(keyword\s*research|backlinks?|search\s*console|site\s*audit|seo\s*audit|audit\s*(my|the)?\s*website\s*for\s*seo)\b/i,
      /\b(do|provide|handle|offer)\s+seo\b/i
    ],
    handler: () =>
      "Vivek provides Technical SEO, On-Page & Off-Page optimization, search intent mapping, keyword research, SEO audits, AEO, and GEO to build sustainable organic search visibility."
  },

  // 3. Social Media Marketing & Meta Ads
  {
    id: 'social-media',
    category: 'Social Media',
    targetSlug: 'skills/social-media',
    priority: 9,
    aliases: [
      'social media', 'social media marketing', 'instagram', 'instagram ads', 'meta ads',
      'facebook ads', 'social growth', 'reels', 'content calendar', 'social media management',
      'grow instagram', 'social content', 'youtube marketing', 'social campaigns', 'social accounts',
      'manage instagram', 'run instagram ads', 'social media accounts',
      'insta marketing', 'insta ads', 'insta management', 'instagram marketing', 'instagram management',
      'insta growth', 'insta content', 'insta'
    ],
    patterns: [
      /\b(social\s*media|instagram|insta|meta\s*ads|facebook\s*ads|youtube\s*content|reels\s*planning|social\s*growth)\b/i,
      /\b(manage|run|grow|handle|create).*(instagram|insta|social\s*media|meta\s*ads|facebook\s*ads|social\s*accounts?|reels)\b/i,
      /\b((social\s*media|instagram|insta)\s*(marketing|management|strategy|content|campaigns?|ads?))\b/i
    ],
    handler: () =>
      "Vivek develops organic and paid social strategies across Instagram, Meta Ads, and YouTube—covering content calendars, video scripts, ad creatives, and conversion CTAs."
  },


  // 4. Tracking & Analytics
  {
    id: 'tracking',
    category: 'Tracking & Analytics',
    targetSlug: 'skills/tracking',
    priority: 10,
    aliases: [
      'gtm', 'google tag manager', 'ga4', 'google analytics', 'conversion tracking',
      'event tracking', 'pixel', 'meta pixel', 'analytics', 'track conversions',
      'track leads', 'attribution', 'tag implementation', 'set up gtm', 'set up ga4',
      'track leads from google ads', 'analytics for my website', 'track conversions'
    ],
    patterns: [
      /\b(gtm|google\s*tag\s*manager|ga4|google\s*analytics|conversion\s*tracking|event\s*tracking|meta\s*pixel|pixel\s*setup|attribution)\b/i,
      /\b(track|measure|set\s*up).*(conversions?|leads?|events?|analytics|gtm|ga4|pixel|tag\s*manager)\b/i,
      /\b(handle|do|implement)\s+(conversion\s*tracking|tracking|analytics)\b/i,
      /\btrack\s+leads?\b/i
    ],
    handler: () =>
      "Vivek implements end-to-end tracking architectures using Google Tag Manager, GA4 conversion tracking, Meta Pixel events, and custom user attribution funnels."
  },

  // 5. Advanced Web & Motion
  {
    id: 'web-motion',
    category: 'Web & Motion',
    targetSlug: 'skills/web-motion',
    priority: 9,
    aliases: [
      'motion', 'gsap', 'lenis', 'framer motion', 'smooth scroll', 'smooth scrolling',
      'interactive animation', 'interactive website', 'webgl', 'canvas', 'animated websites',
      'web animation', 'interactive web animation', 'animated website'
    ],
    patterns: [
      /\b(motion|gsap|lenis|framer\s*motion|smooth\s*scroll(ing)?|interactive\s*animations?|webgl|shaders?|canvas)\b/i,
      /\b(build|create|make).*(animated\s*websites?|interactive\s*websites?|smooth\s*scrolling\s*websites?|motion\s*interfaces?)\b/i,
      /\b(work\s*with|use)\s+(gsap|lenis|webgl|interactive\s*web\s*animation)\b/i
    ],
    handler: () =>
      "Vivek crafts interactive digital experiences with GSAP, Lenis smooth scrolling, Framer Motion, and WebGL micro-animations designed for visual impact and fluid performance."
  },

  // 6. AI & Automation
  {
    id: 'ai-automation',
    category: 'AI & Automation',
    targetSlug: 'skills/ai-automation',
    priority: 9,
    aliases: [
      'ai', 'artificial intelligence', 'ai agents', 'automation', 'automate workflows',
      'ollama', 'local llm', 'n8n', 'langchain', 'prompt engineering', 'ai development',
      'ai-powered website', 'automate website development', 'ai tools', 'ai agent'
    ],
    patterns: [
      /\b(ai\s*agents?|automation|automate\s*workflows?|ollama|local\s*llms?|n8n|langchain|ai[- ]assisted)\b/i,
      /\b(build|create|develop|use).*(ai\s*agents?|ai\s*workflows?|automation\s*pipelines?|ai[- ]powered\s*website)\b/i,
      /\b(work\s*with|use)\s+ollama\b/i,
      /\b(can\s+ai\s+help|use\s+ai\s+for)\s+(development|automate\s*website)\b/i
    ],
    handler: () =>
      "Vivek develops AI automation workflows, autonomous task agents, and local LLM pipelines with Ollama to streamline business operations and modern web engineering."
  },

  // 7. E-Commerce Systems (Generic Payment Gateways & Storefronts)
  {
    id: 'ecommerce',
    category: 'E-Commerce Systems',
    targetSlug: 'skills/ecommerce',
    priority: 9,
    aliases: [
      'ecommerce', 'e-commerce', 'shopify', 'online store', 'storefront',
      'payment gateway', 'payment gateways', 'admin panels', 'shopping cart',
      'e-commerce admin panels', 'custom e-commerce', 'e-commerce website'
    ],
    patterns: [
      /\b(e[- ]?commerce|shopify|online\s*stores?|storefronts?|payment\s*gateways?|admin\s*panels?|shopping\s*cart)\b/i,
      /\b(build|create|develop).*(e[- ]?commerce\s*website|online\s*store|shopify\s*website|custom\s*e[- ]?commerce)\b/i,
      /\b(integrate\s+payment\s+gateways?|build\s+e[- ]?commerce\s+admin\s+panels?)\b/i
    ],
    handler: () =>
      "Vivek engineers custom e-commerce platforms and Shopify stores featuring multi-step checkouts, payment gateway integrations, product catalogs, and admin panels."
  },

  // 8. Web Development (General & Custom)
  {
    id: 'web-development',
    category: 'Web Development',
    targetSlug: 'skills/web-development',
    priority: 8,
    aliases: [
      'web development', 'website', 'websites', 'build website', 'build a website',
      'create website', 'landing page', 'landing pages', 'react', 'next.js', 'nextjs',
      'frontend', 'fullstack', 'typescript', 'javascript', 'wordpress', 'elementor',
      'custom website', 'web developer', 'lead generation website', 'improve my website',
      'build websites', 'create landing pages'
    ],
    patterns: [
      /\b(web\s*development|web\s*developer|react|next\.?js|typescript|javascript|frontend|fullstack|wordpress|elementor)\b/i,
      /\b(build|create|develop|code|make|redesign|improve).*(website|web\s*app|landing\s*pages?|custom\s*site|web\s*application)\b/i,
      /\b(landing\s*page\s*(design|development|optimization)|custom\s*websites?)\b/i
    ],
    handler: () =>
      "Vivek builds high-performance responsive websites and landing pages using React, Next.js, TypeScript, WordPress, and Shopify, engineered for speed, UX, and conversion."
  },

  // 9. Performance Marketing & Services Overview
  {
    id: 'services',
    category: 'Services',
    targetSlug: 'services',
    priority: 7,
    aliases: [
      'performance marketing', 'business growth', 'grow my business', 'grow business online',
      'generate more leads', 'get more customers', 'digital marketing help', 'marketing packages',
      'what services do you offer', 'what does digita curve do', 'how can digital marketing help',
      'can you help my business', 'can you handle multiple marketing services', 'what do you do',
      'services overview', 'digital marketing solutions'
    ],
    patterns: [
      /\b(performance\s*marketing|business\s*growth|digital\s*marketing\s*packages?)\b/i,
      /\b(grow\s*(my|a)?\s*business|generate\s*(more)?\s*leads|get\s*(more)?\s*customers|help\s*(my)?\s*business)\b/i,
      /\b(what\s*(services|solutions|packages)\s*(do\s*you\s*offer|are\s*available))\b/i,
      /\b(what\s*does\s*digita\s*curve\s*do|what\s*do\s*you\s*do|how\s*can\s*you\s*help)\b/i,
      /\b(can\s+you\s+handle\s+multiple\s+marketing\s+services)\b/i
    ],
    handler: () =>
      "Vivek offers 5 comprehensive services at DIGITA CURVE: Google & Meta Ads, Technical SEO & AEO, Website Development, Tracking & Analytics, and AI Automation Systems."
  },

  // 10. Skills Overview & Capabilities (Routes to skills card)
  {
    id: 'skills',
    category: 'Skills Overview',
    targetSlug: 'skills',
    priority: 9,
    aliases: [
      'skills', 'capabilities', 'expertise', 'tech stack', 'technologies', 'tools',
      'what are vivek skills', 'what skills does vivek have', 'what are vivek main skills',
      'tell me about vivek skills', 'what does vivek specialize in', 'vivek skills', 'skills overview'
    ],
    patterns: [
      /\b(what\s*(are\s*)?vivek.*skills?|what\s*skills\s*does\s*vivek\s*have|what\s*are\s*vivek.*main\s*skills?|tell\s*me\s*about\s*vivek.*skills?|what\s*does\s*vivek\s*specialize\s*in)\b/i,
      /\b(skills\s*overview|core\s*skills|key\s*skills|technical\s*skills|what\s*are\s*your\s*skills)\b/i
    ],
    handler: () =>
      "Vivek's core capabilities span Google & Meta Ads, Technical SEO, Full-Stack Web Development (React/Next.js), Analytics (GTM/GA4), Motion (GSAP), and AI Automation."
  },

  // 11. Experience & Founding Member Role
  {
    id: 'experience',
    category: 'Experience',
    targetSlug: 'experience',
    priority: 8,
    aliases: [
      'experience', 'work experience', 'career history', 'job history', 'past roles',
      'digita curve role', 'founding member', 'what experience does vivek have',
      'vivek experience', 'career journey'
    ],
    patterns: [
      /\b(what\s*experience\s*does\s*vivek\s*have|vivek.*(experience|career|work\s*history)|work\s*experience|job\s*history|career\s*history|past\s*roles|role\s*at\s*digita\s*curve|founding\s*member)\b/i
    ],
    handler: () =>
      "Vivek Singh is a Founding Member at DIGITA CURVE (2025—Present), directing performance marketing, SEO, full-stack web development, and AI automation systems."
  },

  // 12. Profile & About Vivek (Routes to about card)
  {
    id: 'about',
    category: 'About Vivek',
    targetSlug: 'about',
    priority: 7,
    aliases: [
      'who is vivek', 'who is vivek singh', 'about vivek', 'tell me about vivek',
      'what does vivek do', 'vivek background', 'vivek bio', 'vivek profile',
      'about me'
    ],
    patterns: [
      /\b(who\s*is\s*vivek(\s*singh)?|tell\s*me\s*about\s*vivek|what\s*does\s*vivek\s*do|vivek.*(bio|story|profile|background)|about\s*vivek|about\s*me)\b/i
    ],
    handler: (q, kb) =>
      `Vivek Singh is a Digital Marketer, Web Developer, and Founding Member of DIGITA CURVE based in ${kb.profile.location}, bridging technical engineering with growth marketing.`
  },

  // 13. Projects & Case Studies Overview
  {
    id: 'projects',
    category: 'Projects',
    targetSlug: 'work',
    priority: 8,
    aliases: [
      'projects', 'case studies', 'work', 'portfolio', 'websites have you built',
      'show me your projects', 'what projects have you worked on', 'what projects have you built',
      'tell me about your work'
    ],
    patterns: [
      /\b(what\s*projects\s*have\s*you\s*(built|worked\s*on)|show\s*me\s*(your\s*)?projects|what\s*websites\s*have\s*you\s*built|tell\s*me\s*about\s*your\s*work|projects|case\s*studies)\b/i
    ],
    handler: () =>
      "Vivek has delivered 8 production case studies including SiteSupply, Kashi Darshan, Ayodhya Darshan, Varanasi Travelers, Golden Age Landbase, Trip Customizer, Kashi Prasad, and AI E-Commerce Agent."
  },

  // 14. Contact & Hiring Inquiries
  {
    id: 'contact',
    category: 'Contact',
    targetSlug: 'contact',
    priority: 10,
    aliases: [
      'contact', 'how can i contact you', 'how can i get in touch', 'how can i work with you',
      'where can i find your contact details', 'how do i get started', 'can i hire you',
      'email address', 'phone number', 'reach out', 'connect', 'let us connect'
    ],
    patterns: [
      /\b(contact|email|phone|call|hire|reach\s*out|connect|get\s*in\s*touch|work\s*with\s*(you|vivek)|get\s*started|contact\s*details?)\b/i,
      /\b(where\s*can\s*i\s*find\s*(your|contact)\s*details?|how\s*(can|do)\s*i\s*(contact|reach|hire|get\s*in\s*touch))\b/i
    ],
    handler: (_q, kb) =>
      `Reach Vivek directly via email at ${kb.profile.email} or phone ${kb.profile.phone}. Based in ${kb.profile.location}. Open for marketing, web development, and AI consulting.`
  }
];

/**
 * Main query processor for the portfolio assistant (BANKAI)
 */
export async function askPortfolioAssistant(rawQuery: string): Promise<AssistantResponse> {
  const raw = (rawQuery || '').trim();
  if (!raw) {
    return formatResponse(
      "Hello! I am BANKAI, Vivek Singh's AI assistant. Ask me about performance marketing, SEO, web development, case studies, or DIGITA CURVE experience.",
      'about',
      1.0,
      'Greeting'
    );
  }

  const q = normalizeQuery(raw);
  const kb = getPortfolioKnowledge();

  // 1. Guardrail / Anti-Hallucination checks for undocumented metrics & personal private queries
  const undocumentedPatterns = [
    /\b(favorite|favourite|movie|film|song|music|hobby|hobbies|food|password|pin|passcode|secret|how\s*old|birthday|birth\s*date|married|wife|girlfriend|family|religion|politics)\b/i,
    /\b(revenue|annual\s*revenue|turnover|profit|net\s*worth|salary|valuation|funding|investor|investments|crypto|bank\s*account|earnings)\b/i,
    /\b(gpa|cgpa|grades|marks|degree\s*certificate|award|trophy|nobel|oscar|guinness|patent)\b/i
  ];

  for (const pattern of undocumentedPatterns) {
    if (pattern.test(q)) {
      return formatResponse(
        "I don't have documented information about that in Vivek's portfolio. You can explore his verified skills in Google Ads, SEO, web development, or reach out directly via Contact.",
        null,
        0.99,
        'Undocumented Guardrail'
      );
    }
  }

  // 2. Greetings & Assistant Identity
  if (/^(hi|hello|hey|greetings|who are you|what is bankai|tell me about bankai|what can you do|help)\b/i.test(q)) {
    return formatResponse(
      "Hello! I am BANKAI, Vivek Singh's AI assistant. Ask me about his performance marketing, SEO, web development, case studies, or DIGITA CURVE experience.",
      'about',
      1.0,
      'Greeting'
    );
  }

  // 3. Specific Project Case Study Matchers
  for (const cs of kb.caseStudies) {
    const titleLower = cs.title.toLowerCase();
    const slugLower = cs.slug.toLowerCase();
    const isAiAgentMatch =
      cs.slug === 'local-ai-agent' &&
      (q.includes('ai project') || q.includes('local ai agent') || q.includes('ecommerce agent') || q.includes('ai agent project'));

    if (q.includes(titleLower) || q.includes(slugLower) || isAiAgentMatch) {
      const tech = cs.technologies.slice(0, 2).join(', ');
      const desc = `${cs.title}: ${cs.shortDescription} Built using ${tech}. Outcome: ${cs.outcome}`;
      return formatResponse(desc, 'work', 0.98, `Project: ${cs.title}`);
    }
  }

  // 4. Intent Matching against structured registry (with priority & confidence scoring)
  let bestMatch: { intent: AssistantIntent; score: number } | null = null;

  for (const intent of INTENT_REGISTRY) {
    let score = 0;

    // A. Direct alias or phrase inclusion
    for (const alias of intent.aliases) {
      if (q === alias) {
        score = Math.max(score, 100);
      } else if (q.includes(alias)) {
        score = Math.max(score, 60 + alias.length);
      }
    }

    // B. Pattern rule matching
    for (const pattern of intent.patterns) {
      if (pattern.test(q)) {
        score = Math.max(score, 70 + (intent.priority || 0) * 2);
      }
    }

    if (score > 0) {
      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { intent, score };
      }
    }
  }

  if (bestMatch && bestMatch.score >= 50) {
    const text = bestMatch.intent.handler(q, kb);
    const confidence = Math.min(0.98, 0.85 + bestMatch.score / 1000);
    return formatResponse(text, bestMatch.intent.targetSlug, confidence, bestMatch.intent.category);
  }

  // 5. Fallback with Non-Hallucinatory Portfolio Guidance
  return formatResponse(
    "I don't have documented information about that in Vivek's portfolio. You can ask about his Google Ads, SEO, web development, case studies, or reach out directly via Contact.",
    null,
    0.80,
    'Fallback'
  );
}
