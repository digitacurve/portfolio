import { askPortfolioAssistant } from '../src/ai/portfolioAssistant';

interface TestCase {
  category: string;
  query: string;
  expectedSlug: string | null;
  mustContainText?: string[];
  mustNotContainText?: string[];
  isGuardrailOrUnknown?: boolean;
}

const TEST_CASES: TestCase[] = [
  // 1. GOOGLE ADS / PAID ADS
  {
    category: 'Google Ads',
    query: 'Do you manage Google Ads?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads', 'Search Ads', 'Performance Max']
  },
  {
    category: 'Google Ads',
    query: 'Can you run Google Ads for my business?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads']
  },
  {
    category: 'Google Ads',
    query: 'Can you help me get leads through Google Ads?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads']
  },
  {
    category: 'Google Ads',
    query: 'Can you manage PPC campaigns?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads', 'PPC']
  },
  {
    category: 'Google Ads',
    query: 'Can you optimize my Google Ads campaigns?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads']
  },
  {
    category: 'Google Ads',
    query: 'Can you advertise my business on Google?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads']
  },
  {
    category: 'Google Ads',
    query: 'Do you provide paid advertising services?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads', 'Search Ads']
  },
  {
    category: 'Google Ads',
    query: 'Can you manage Search Ads?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Search Ads']
  },
  {
    category: 'Google Ads',
    query: 'Can you run Performance Max campaigns?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Performance Max']
  },
  {
    category: 'Google Ads',
    query: 'Do you handle paid search?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads']
  },
  {
    category: 'Google Ads',
    query: 'Can you get me leads from Google?',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads']
  },
  {
    category: 'Google Ads',
    query: 'get leads from Google',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads']
  },
  {
    category: 'Google Ads',
    query: 'generate leads through Google',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads']
  },
  {
    category: 'Google Ads',
    query: 'get customers through Google',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads']
  },
  {
    category: 'Google Ads',
    query: 'advertise on Google for leads',
    expectedSlug: 'skills/google-ads',
    mustContainText: ['Google Ads']
  },

  // 2. SEO
  {
    category: 'SEO',
    query: 'Do you provide SEO services?',
    expectedSlug: 'skills/seo',
    mustContainText: ['SEO', 'Technical SEO']
  },
  {
    category: 'SEO',
    query: 'Can you do SEO for my website?',
    expectedSlug: 'skills/seo',
    mustContainText: ['SEO']
  },
  {
    category: 'SEO',
    query: 'How can I improve my Google ranking?',
    expectedSlug: 'skills/seo',
    mustContainText: ['SEO', 'organic search']
  },
  {
    category: 'SEO',
    query: 'How can I get more organic traffic?',
    expectedSlug: 'skills/seo',
    mustContainText: ['SEO', 'organic search']
  },
  {
    category: 'SEO',
    query: 'Do you provide technical SEO?',
    expectedSlug: 'skills/seo',
    mustContainText: ['Technical SEO']
  },
  {
    category: 'SEO',
    query: 'Do you provide on-page SEO?',
    expectedSlug: 'skills/seo',
    mustContainText: ['On-Page']
  },
  {
    category: 'SEO',
    query: 'Do you provide off-page SEO?',
    expectedSlug: 'skills/seo',
    mustContainText: ['Off-Page']
  },
  {
    category: 'SEO',
    query: 'Can you do keyword research?',
    expectedSlug: 'skills/seo',
    mustContainText: ['keyword research']
  },
  {
    category: 'SEO',
    query: 'Can you audit my website for SEO?',
    expectedSlug: 'skills/seo',
    mustContainText: ['SEO audits']
  },

  // 3. SOCIAL MEDIA / INSTAGRAM / META
  {
    category: 'Social Media',
    query: 'Do you provide social media marketing?',
    expectedSlug: 'skills/social-media',
    mustContainText: ['social', 'Instagram']
  },
  {
    category: 'Social Media',
    query: 'Can you manage Instagram for my business?',
    expectedSlug: 'skills/social-media',
    mustContainText: ['Instagram']
  },
  {
    category: 'Social Media',
    query: 'Can you run Instagram ads?',
    expectedSlug: 'skills/social-media',
    mustContainText: ['Instagram', 'Meta Ads']
  },
  {
    category: 'Social Media',
    query: 'Do you manage Meta Ads?',
    expectedSlug: 'skills/social-media',
    mustContainText: ['Meta Ads']
  },
  {
    category: 'Social Media',
    query: 'Can you create social media campaigns?',
    expectedSlug: 'skills/social-media',
    mustContainText: ['social']
  },
  {
    category: 'Social Media',
    query: 'Can you manage my social media accounts?',
    expectedSlug: 'skills/social-media',
    mustContainText: ['social']
  },
  {
    category: 'Social Media',
    query: 'How can I grow my Instagram page?',
    expectedSlug: 'skills/social-media',
    mustContainText: ['Instagram']
  },
  {
    category: 'Social Media',
    query: 'Can you create social media content?',
    expectedSlug: 'skills/social-media',
    mustContainText: ['social']
  },
  {
    category: 'Social Media',
    query: 'insta marketing karte ho?',
    expectedSlug: 'skills/social-media',
    mustContainText: ['Instagram', 'Meta Ads']
  },
  {
    category: 'Social Media',
    query: 'insta ads',
    expectedSlug: 'skills/social-media',
    mustContainText: ['Instagram', 'Meta Ads']
  },
  {
    category: 'Social Media',
    query: 'insta management',
    expectedSlug: 'skills/social-media',
    mustContainText: ['Instagram', 'social']
  },
  {
    category: 'Social Media',
    query: 'Instagram marketing',
    expectedSlug: 'skills/social-media',
    mustContainText: ['Instagram', 'social']
  },
  {
    category: 'Social Media',
    query: 'Instagram management',
    expectedSlug: 'skills/social-media',
    mustContainText: ['Instagram', 'social']
  },


  // 4. WEB DEVELOPMENT
  {
    category: 'Web Development',
    query: 'Do you build websites?',
    expectedSlug: 'skills/web-development',
    mustContainText: ['React', 'Next.js']
  },
  {
    category: 'Web Development',
    query: 'Can you build a website for my business?',
    expectedSlug: 'skills/web-development',
    mustContainText: ['React', 'Next.js']
  },
  {
    category: 'Web Development',
    query: 'Can you create landing pages?',
    expectedSlug: 'skills/web-development',
    mustContainText: ['landing pages']
  },
  {
    category: 'Web Development',
    query: 'Can you improve my existing website?',
    expectedSlug: 'skills/web-development',
    mustContainText: ['websites', 'React']
  },
  {
    category: 'Web Development',
    query: 'Can you create a custom website?',
    expectedSlug: 'skills/web-development',
    mustContainText: ['websites']
  },
  {
    category: 'Web Development',
    query: 'Can you build a website for lead generation?',
    expectedSlug: 'skills/web-development',
    mustContainText: ['websites']
  },

  // 5. TRACKING & ANALYTICS
  {
    category: 'Tracking & Analytics',
    query: 'Can you set up Google Tag Manager?',
    expectedSlug: 'skills/tracking',
    mustContainText: ['Google Tag Manager']
  },
  {
    category: 'Tracking & Analytics',
    query: 'Do you handle conversion tracking?',
    expectedSlug: 'skills/tracking',
    mustContainText: ['conversion tracking']
  },
  {
    category: 'Tracking & Analytics',
    query: 'Can you track leads from Google Ads?',
    expectedSlug: 'skills/tracking',
    mustContainText: ['tracking']
  },
  {
    category: 'Tracking & Analytics',
    query: 'Do you work with GA4?',
    expectedSlug: 'skills/tracking',
    mustContainText: ['GA4']
  },
  {
    category: 'Tracking & Analytics',
    query: 'Can you set up analytics for my website?',
    expectedSlug: 'skills/tracking',
    mustContainText: ['tracking', 'GA4']
  },
  {
    category: 'Tracking & Analytics',
    query: 'How do you track conversions?',
    expectedSlug: 'skills/tracking',
    mustContainText: ['Google Tag Manager', 'GA4']
  },

  // 6. ADVANCED WEB / MOTION
  {
    category: 'Web Motion',
    query: 'Do you build interactive websites?',
    expectedSlug: 'skills/web-motion',
    mustContainText: ['GSAP', 'Lenis']
  },
  {
    category: 'Web Motion',
    query: 'Do you use GSAP?',
    expectedSlug: 'skills/web-motion',
    mustContainText: ['GSAP']
  },
  {
    category: 'Web Motion',
    query: 'Can you create animated websites?',
    expectedSlug: 'skills/web-motion',
    mustContainText: ['GSAP', 'Framer Motion']
  },
  {
    category: 'Web Motion',
    query: 'Do you build WebGL experiences?',
    expectedSlug: 'skills/web-motion',
    mustContainText: ['WebGL']
  },
  {
    category: 'Web Motion',
    query: 'Can you create smooth scrolling websites?',
    expectedSlug: 'skills/web-motion',
    mustContainText: ['Lenis', 'smooth scrolling']
  },
  {
    category: 'Web Motion',
    query: 'Do you work with interactive web animation?',
    expectedSlug: 'skills/web-motion',
    mustContainText: ['GSAP', 'micro-animations']
  },

  // 7. AI & AUTOMATION
  {
    category: 'AI & Automation',
    query: 'Do you build AI agents?',
    expectedSlug: 'skills/ai-automation',
    mustContainText: ['AI', 'Ollama']
  },
  {
    category: 'AI & Automation',
    query: 'Can you automate workflows?',
    expectedSlug: 'skills/ai-automation',
    mustContainText: ['automation']
  },
  {
    category: 'AI & Automation',
    query: 'Do you use AI for development?',
    expectedSlug: 'skills/ai-automation',
    mustContainText: ['AI']
  },
  {
    category: 'AI & Automation',
    query: 'Have you built an AI-powered website system?',
    expectedSlug: 'skills/ai-automation',
    mustContainText: ['AI']
  },
  {
    category: 'AI & Automation',
    query: 'Do you work with Ollama?',
    expectedSlug: 'skills/ai-automation',
    mustContainText: ['Ollama']
  },
  {
    category: 'AI & Automation',
    query: 'Can AI help automate website development?',
    expectedSlug: 'skills/ai-automation',
    mustContainText: ['AI']
  },

  // 8. E-COMMERCE (VERIFIED: NO UNSUPPORTED RAZORPAY / STRIPE CLAIMS)
  {
    category: 'E-Commerce',
    query: 'Can you build an e-commerce website?',
    expectedSlug: 'skills/ecommerce',
    mustContainText: ['e-commerce', 'Shopify'],
    mustNotContainText: ['Razorpay', 'Stripe']
  },
  {
    category: 'E-Commerce',
    query: 'Do you build Shopify websites?',
    expectedSlug: 'skills/ecommerce',
    mustContainText: ['Shopify'],
    mustNotContainText: ['Razorpay', 'Stripe']
  },
  {
    category: 'E-Commerce',
    query: 'Can you create custom e-commerce systems?',
    expectedSlug: 'skills/ecommerce',
    mustContainText: ['e-commerce'],
    mustNotContainText: ['Razorpay', 'Stripe']
  },
  {
    category: 'E-Commerce',
    query: 'Can you build an online store?',
    expectedSlug: 'skills/ecommerce',
    mustContainText: ['e-commerce', 'Shopify'],
    mustNotContainText: ['Razorpay', 'Stripe']
  },
  {
    category: 'E-Commerce',
    query: 'Do you build e-commerce admin panels?',
    expectedSlug: 'skills/ecommerce',
    mustContainText: ['admin panels'],
    mustNotContainText: ['Razorpay', 'Stripe']
  },
  {
    category: 'E-Commerce',
    query: 'Can you integrate payment gateways?',
    expectedSlug: 'skills/ecommerce',
    mustContainText: ['payment gateway'],
    mustNotContainText: ['Razorpay', 'Stripe']
  },

  // 9. PERFORMANCE MARKETING / BUSINESS GROWTH
  {
    category: 'Services',
    query: 'What is performance marketing?',
    expectedSlug: 'services',
    mustContainText: ['services', 'Google & Meta Ads']
  },
  {
    category: 'Services',
    query: 'Do you provide performance marketing?',
    expectedSlug: 'services',
    mustContainText: ['services']
  },
  {
    category: 'Services',
    query: 'How can I grow my business online?',
    expectedSlug: 'services',
    mustContainText: ['services']
  },
  {
    category: 'Services',
    query: 'How can I generate more leads?',
    expectedSlug: 'services',
    mustContainText: ['services']
  },
  {
    category: 'Services',
    query: 'How can digital marketing help my business?',
    expectedSlug: 'services',
    mustContainText: ['services']
  },
  {
    category: 'Services',
    query: 'How can I get more customers online?',
    expectedSlug: 'services',
    mustContainText: ['services']
  },

  // 10. SERVICES / HIRING
  {
    category: 'Services',
    query: 'What services do you offer?',
    expectedSlug: 'services',
    mustContainText: ['5 comprehensive services', 'DIGITA CURVE']
  },
  {
    category: 'Services',
    query: 'What does DIGITA CURVE do?',
    expectedSlug: 'services',
    mustContainText: ['DIGITA CURVE', 'services']
  },
  {
    category: 'Contact',
    query: 'Can I hire you?',
    expectedSlug: 'contact',
    mustContainText: ['viveksingh.dmark@gmail.com']
  },
  {
    category: 'Contact',
    query: 'How can I work with you?',
    expectedSlug: 'contact',
    mustContainText: ['viveksingh.dmark@gmail.com']
  },
  {
    category: 'Services',
    query: 'Do you offer digital marketing packages?',
    expectedSlug: 'services',
    mustContainText: ['services']
  },
  {
    category: 'Services',
    query: 'Can you handle multiple marketing services?',
    expectedSlug: 'services',
    mustContainText: ['services']
  },

  // 11. SKILLS ROUTING (VERIFIED: ROUTES TO skills CARD)
  {
    category: 'Skills Routing',
    query: "What are Vivek's skills?",
    expectedSlug: 'skills',
    mustContainText: ['capabilities', 'Google & Meta Ads', 'Technical SEO']
  },
  {
    category: 'Skills Routing',
    query: 'What skills does Vivek have?',
    expectedSlug: 'skills',
    mustContainText: ['capabilities']
  },
  {
    category: 'Skills Routing',
    query: "What are Vivek's main skills?",
    expectedSlug: 'skills',
    mustContainText: ['capabilities']
  },
  {
    category: 'Skills Routing',
    query: "Tell me about Vivek's skills.",
    expectedSlug: 'skills',
    mustContainText: ['capabilities']
  },
  {
    category: 'Skills Routing',
    query: 'What does Vivek specialize in?',
    expectedSlug: 'skills',
    mustContainText: ['capabilities']
  },

  // 12. ABOUT / EXPERIENCE (ROUTES TO about / experience CARDS)
  {
    category: 'About & Profile',
    query: 'Who is Vivek Singh?',
    expectedSlug: 'about',
    mustContainText: ['Vivek Singh', 'DIGITA CURVE']
  },
  {
    category: 'About & Profile',
    query: 'What does Vivek do?',
    expectedSlug: 'about',
    mustContainText: ['Vivek Singh']
  },
  {
    category: 'About & Profile',
    query: "What is Vivek's background?",
    expectedSlug: 'about',
    mustContainText: ['Vivek Singh']
  },
  {
    category: 'Experience',
    query: 'What experience does Vivek have?',
    expectedSlug: 'experience',
    mustContainText: ['Founding Member at DIGITA CURVE']
  },
  {
    category: 'Experience',
    query: "What is Vivek's role at DIGITA CURVE?",
    expectedSlug: 'experience',
    mustContainText: ['Founding Member at DIGITA CURVE']
  },

  // 13. PROJECTS
  {
    category: 'Projects',
    query: 'What projects have you worked on?',
    expectedSlug: 'work',
    mustContainText: ['8 production case studies', 'SiteSupply']
  },
  {
    category: 'Projects',
    query: 'Show me your projects.',
    expectedSlug: 'work',
    mustContainText: ['8 production case studies']
  },
  {
    category: 'Projects',
    query: 'What websites have you built?',
    expectedSlug: 'work',
    mustContainText: ['8 production case studies']
  },
  {
    category: 'Projects',
    query: 'Tell me about SiteSupply.',
    expectedSlug: 'work',
    mustContainText: ['SiteSupply', 'cement and TMT steel']
  },
  {
    category: 'Projects',
    query: 'Tell me about Kashi Darshan.',
    expectedSlug: 'work',
    mustContainText: ['Kashi Darshan', 'Pilgrimage']
  },
  {
    category: 'Projects',
    query: 'Tell me about Ayodhya Darshan.',
    expectedSlug: 'work',
    mustContainText: ['Ayodhya Darshan', 'Booking']
  },
  {
    category: 'Projects',
    query: 'Tell me about Varanasi Travelers.',
    expectedSlug: 'work',
    mustContainText: ['Varanasi Travelers']
  },
  {
    category: 'Projects',
    query: 'Tell me about Golden Age Landbase.',
    expectedSlug: 'work',
    mustContainText: ['Golden Age Landbase', 'Real estate']
  },
  {
    category: 'Projects',
    query: 'What is Kashi Prasad?',
    expectedSlug: 'work',
    mustContainText: ['Kashi Prasad', 'E-commerce']
  },
  {
    category: 'Projects',
    query: 'What AI project have you built?',
    expectedSlug: 'work',
    mustContainText: ['Local AI Agent', 'Ollama']
  },

  // 14. CONTACT / HIRING
  {
    category: 'Contact',
    query: 'How can I contact you?',
    expectedSlug: 'contact',
    mustContainText: ['viveksingh.dmark@gmail.com', '+91 96961 90574']
  },
  {
    category: 'Contact',
    query: 'How can I get in touch?',
    expectedSlug: 'contact',
    mustContainText: ['viveksingh.dmark@gmail.com']
  },
  {
    category: 'Contact',
    query: 'Where can I find your contact details?',
    expectedSlug: 'contact',
    mustContainText: ['email', 'phone']
  },
  {
    category: 'Contact',
    query: 'How do I get started?',
    expectedSlug: 'contact',
    mustContainText: ['viveksingh.dmark@gmail.com']
  },

  // 15. UNKNOWN & ANTI-HALLUCINATION GUARDRAILS (VERIFIED: targetSlug IS NULL)
  {
    category: 'Unknown Guardrail',
    query: "What is Vivek's favorite movie?",
    expectedSlug: null,
    isGuardrailOrUnknown: true,
    mustContainText: ["I don't have documented information about that in Vivek's portfolio"],
    mustNotContainText: ['favorite movie', 'Inception', 'Titanic', 'Hollywood', 'Bollywood', 'contact/']
  },
  {
    category: 'Unknown Guardrail',
    query: "What is Vivek's personal phone password?",
    expectedSlug: null,
    isGuardrailOrUnknown: true,
    mustContainText: ["I don't have documented information about that in Vivek's portfolio"],
    mustNotContainText: ['password is', '1234', 'secret']
  },
  {
    category: 'Unknown Guardrail',
    query: "What was Vivek's revenue last year?",
    expectedSlug: null,
    isGuardrailOrUnknown: true,
    mustContainText: ["I don't have documented information about that in Vivek's portfolio"],
    mustNotContainText: ['crore', 'lakhs revenue', 'dollar', 'turnover was']
  }
];

async function runTests() {
  console.log(`\n==================================================`);
  console.log(`RUNNING BANKAI FULL SEARCH INTENT SUITE (${TEST_CASES.length} Tests)`);
  console.log(`==================================================\n`);

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < TEST_CASES.length; i++) {
    const tc = TEST_CASES[i];
    const res = await askPortfolioAssistant(tc.query);

    let testPass = true;
    const errors: string[] = [];

    // 1. Slug check (strict check including null vs string)
    const normalizedActualSlug = res.targetSlug === undefined ? null : res.targetSlug;
    if (tc.expectedSlug !== normalizedActualSlug) {
      testPass = false;
      errors.push(`Target Slug mismatch: expected ${JSON.stringify(tc.expectedSlug)}, got ${JSON.stringify(normalizedActualSlug)}`);
    }

    // 2. Length check (< 290 chars)
    if (res.text.length > 290) {
      testPass = false;
      errors.push(`Response exceeded length limit: ${res.text.length} chars`);
    }

    // 3. Must contain checks
    if (tc.mustContainText) {
      for (const reqText of tc.mustContainText) {
        if (!res.text.toLowerCase().includes(reqText.toLowerCase())) {
          testPass = false;
          errors.push(`Response missing required text: "${reqText}"`);
        }
      }
    }

    // 4. Must not contain checks (anti-hallucination / unverified claims)
    if (tc.mustNotContainText) {
      for (const forbidText of tc.mustNotContainText) {
        if (res.text.toLowerCase().includes(forbidText.toLowerCase())) {
          testPass = false;
          errors.push(`Response contained forbidden text: "${forbidText}"`);
        }
      }
    }

    if (testPass) {
      passed++;
      console.log(`✔ [PASS] [${tc.category}] "${tc.query}" -> ${res.targetSlug ?? 'null'} (${res.text.length} chars)`);
    } else {
      failed++;
      console.error(`✖ [FAIL] [${tc.category}] "${tc.query}"`);
      errors.forEach((e) => console.error(`   - ${e}`));
      console.error(`   Actual Response: "${res.text}"`);
    }
  }

  console.log(`\n==================================================`);
  console.log(`RESULTS: ${passed}/${TEST_CASES.length} PASSED (${failed} FAILED)`);
  console.log(`==================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error("Test Suite Fatal Error:", e);
  process.exit(1);
});
