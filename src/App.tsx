import { useState, useEffect } from 'react';
import { initPortfolioBridge } from './bridge/portfolioBridge';
import { ServicePage } from './components/ServicePage';
import { ServicesIndexPage } from './components/ServicesIndexPage';
import { CaseStudyPage } from './components/CaseStudyPage';
import { WorkIndexPage } from './components/WorkIndexPage';
import { AboutPage } from './components/AboutPage';
import { SkillsPage } from './components/SkillsPage';
import { SkillCategoryPage } from './components/SkillCategoryPage';
import { ExperiencePage } from './components/ExperiencePage';
import { ContactPage } from './components/ContactPage';

const ACTIVE_THEORY_CONFIG = {
  cacheKey: '1746999829739', // 原站构建缓存号，用于定位完全一致的 JS bundle。
  appScriptPath: '/assets/js/app.1746999829739.js', // 原站核心 WebGL 与页面动效入口。
  preloadLinkId: 'active-theory-app-preload', // 预加载标签 ID，避免 React 热更新重复创建。
  appScriptId: 'active-theory-app-script', // 主脚本标签 ID，避免重复执行原站 bundle。
  analyticsScriptId: 'active-theory-analytics-script', // 统计脚本标签 ID，保持原站加载顺序。
  analyticsScriptPath: '/vendor/www.googletagmanager.com/gtag/js_id=G-J7TMDT4F8N', // 本地化后的 Google Tag 脚本路径。
  analyticsId: 'G-J7TMDT4F8N', // 原站统计 ID，仅用于复刻原始运行环境。
  unsupportedPage: '/unsupported.html', // 原站低版本浏览器兜底页。
  uilStaticPath: '/assets/data/uil.1746999829739.json', // 原站静态 UI 数据文件。
} as const;

declare global {
  interface Window {
    _ENV_: 'production';
    _CMS_: string;
    _CACHE_: string;
    _UNSUPPORTED_PAGE_: string;
    UIL_STATIC_PATH: string;
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function ensurePreloadLink(id: string, href: string): void {
  if (document.getElementById(id)) {
    return;
  }

  const preloadLink = document.createElement('link');
  preloadLink.id = id;
  preloadLink.href = href;
  preloadLink.rel = 'preload';
  preloadLink.as = 'script';
  document.head.appendChild(preloadLink);
}

function ensureScript(id: string, src: string, async = true): void {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.async = async;
  document.head.appendChild(script);
}

function configureOriginalRuntime(): void {
  window._ENV_ = 'production';
  window._CMS_ = '%CMS%';
  window._CACHE_ = ACTIVE_THEORY_CONFIG.cacheKey;
  window._UNSUPPORTED_PAGE_ = ACTIVE_THEORY_CONFIG.unsupportedPage;
  window.UIL_STATIC_PATH = ACTIVE_THEORY_CONFIG.uilStaticPath;
}

function configureAnalytics(): void {
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => {
    window.dataLayer.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', ACTIVE_THEORY_CONFIG.analyticsId);
}

function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  return window.location.pathname;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);

  // Listen to browser navigation events
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Determine active route
  const isServicesIndexRoute = currentPath === '/services' || currentPath === '/services/';
  const isServiceRoute = currentPath.startsWith('/services/') && currentPath.length > 10;
  const serviceSlug = isServiceRoute
    ? currentPath.replace('/services/', '').replace(/\/$/, '')
    : null;

  const isWorkIndexRoute = currentPath === '/work' || currentPath === '/work/' || currentPath === '/work/projects' || currentPath === '/projects' || currentPath === '/projects/';
  const isWorkItemRoute = currentPath.startsWith('/work/') && currentPath.length > 6 && currentPath !== '/work/projects';
  const workSlug = isWorkItemRoute
    ? currentPath.replace('/work/', '').replace(/\/$/, '')
    : null;

  const isAboutRoute = currentPath === '/about' || currentPath === '/about/';
  const isSkillsIndexRoute = currentPath === '/skills' || currentPath === '/skills/';
  const isSkillCategoryRoute = currentPath.startsWith('/skills/') && currentPath.length > 8;
  const skillSlug = isSkillCategoryRoute
    ? currentPath.replace('/skills/', '').replace(/\/$/, '')
    : null;

  const isExperienceRoute = currentPath === '/experience' || currentPath === '/experience/';
  const isContactRoute = currentPath === '/contact' || currentPath === '/contact/';

  const isDomRoute = isServicesIndexRoute || isServiceRoute || isWorkItemRoute || isWorkIndexRoute || isAboutRoute || isSkillsIndexRoute || isSkillCategoryRoute || isExperienceRoute || isContactRoute;

  // Manage Active Theory 3D Canvas initialization and visibility
  useEffect(() => {
    const stageElement = document.getElementById('Stage');

    if (isDomRoute) {
      // Hide 3D Canvas when viewing DOM pages
      if (stageElement) {
        stageElement.style.display = 'none';
      }
      document.body.style.overflow = 'auto';
    } else {
      // Show and restore 3D Canvas when viewing main experience
      if (stageElement) {
        stageElement.style.display = 'block';
      }
      document.body.style.overflow = 'hidden';

      // Initialize runtime on home experience
      initPortfolioBridge();
      configureOriginalRuntime();
      configureAnalytics();
      ensurePreloadLink(ACTIVE_THEORY_CONFIG.preloadLinkId, ACTIVE_THEORY_CONFIG.appScriptPath);
      ensureScript(ACTIVE_THEORY_CONFIG.appScriptId, ACTIVE_THEORY_CONFIG.appScriptPath);
      ensureScript(ACTIVE_THEORY_CONFIG.analyticsScriptId, ACTIVE_THEORY_CONFIG.analyticsScriptPath);
    }
  }, [isDomRoute]);

  if (isServicesIndexRoute) {
    return <ServicesIndexPage onNavigate={navigateTo} />;
  }

  if (isServiceRoute && serviceSlug) {
    return <ServicePage slug={serviceSlug} onNavigate={navigateTo} />;
  }

  if (isWorkItemRoute && workSlug) {
    return <CaseStudyPage slug={workSlug} onNavigate={navigateTo} />;
  }

  if (isWorkIndexRoute) {
    return <WorkIndexPage onNavigate={navigateTo} />;
  }

  if (isAboutRoute) {
    return <AboutPage onNavigate={navigateTo} />;
  }

  if (isSkillsIndexRoute) {
    return <SkillsPage onNavigate={navigateTo} />;
  }

  if (isSkillCategoryRoute && skillSlug) {
    return <SkillCategoryPage slug={skillSlug} onNavigate={navigateTo} />;
  }

  if (isExperienceRoute) {
    return <ExperiencePage onNavigate={navigateTo} />;
  }

  if (isContactRoute) {
    return <ContactPage onNavigate={navigateTo} />;
  }

  return null;
}
