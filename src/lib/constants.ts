/**
 * Application Constants
 * Centralized configuration for the entire application
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.zyflows.com',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
} as const;

// Contact Information
export const CONTACT = {
  EMAIL: 'contact@zyflows.com',
  PHONE: '+972-58-422-9255',
  WHATSAPP: '+972584229255',
  ADDRESS: 'Tel Aviv, Israel',
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  LINKEDIN: 'https://www.linkedin.com/company/zyflows',
  FACEBOOK: 'https://www.facebook.com/zyflows',
  TWITTER: 'https://twitter.com/zyflows',
  GITHUB: 'https://github.com/zyflows',
} as const;

// Performance Thresholds (Core Web Vitals)
export const PERFORMANCE_THRESHOLDS = {
  LCP: {
    GOOD: 2500, // milliseconds
    NEEDS_IMPROVEMENT: 4000,
  },
  FID: {
    GOOD: 100,
    NEEDS_IMPROVEMENT: 300,
  },
  CLS: {
    GOOD: 0.1,
    NEEDS_IMPROVEMENT: 0.25,
  },
  TTFB: {
    GOOD: 800,
    NEEDS_IMPROVEMENT: 1800,
  },
} as const;

// Image Optimization
export const IMAGE_CONFIG = {
  FORMATS: ['avif', 'webp', 'jpg'] as const,
  QUALITY: 80,
  RESPONSIVE_WIDTHS: [360, 480, 640, 800, 1200] as const,
  LAZY_LOAD_OFFSET: '200px', // IntersectionObserver rootMargin
} as const;

// Cache Configuration
export const CACHE_CONFIG = {
  STATIC_ASSETS: 'static-assets-v1',
  IMAGES: 'images-v1',
  API_RESPONSES: 'api-responses-v1',
  TTL: {
    STATIC: 365 * 24 * 60 * 60, // 1 year
    IMAGES: 30 * 24 * 60 * 60, // 30 days
    API: 5 * 60, // 5 minutes
  },
} as const;

// Animation Durations (ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000,
} as const;

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_MESSAGE_LENGTH: 1000,
} as const;

// Feature Flags
export const FEATURES = {
  ENABLE_ANALYTICS: true,
  ENABLE_SERVICE_WORKER: true,
  ENABLE_ERROR_BOUNDARY: true,
  ENABLE_PERFORMANCE_MONITORING: true,
  ENABLE_DARK_MODE: false, // Currently disabled
} as const;

// SEO Configuration
export const SEO = {
  SITE_NAME: 'zyFlows',
  SITE_URL: 'https://zyflows.com',
  DEFAULT_TITLE: 'zyFlows - Innovative Digital Solutions',
  DEFAULT_DESCRIPTION: 'Tech company specializing in AI integration, and business automation, custom web development, mobile apps.',
  DEFAULT_IMAGE: 'https://zyflows.com/lovable-uploads/95bff906-bd37-4d87-8782-3fcce7069157.png',
  TWITTER_HANDLE: '@zyflows',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'zyflows-theme',
  LANGUAGE: 'zyflows-language',
  CONSENT: 'zyflows-cookie-consent',
  ACCESSIBILITY: 'zyflows-accessibility',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/#about',
  SERVICES: '/#services',
  PROJECTS: '/#projects',
  CONTACT: '/#contact',
  PRIVACY: '/privacy-policy',
  ACCESSIBILITY: '/accessibility-statement',
  NOT_FOUND: '*',
} as const;

// Demo Routes
export const DEMO_ROUTES = {
  FASHION: '/demo/fashion',
  ECOMMERCE: '/demo/ecommerce',
  SAAS: '/demo/saas',
  TECH_SAAS: '/demo/tech-saas',
  LEGAL_FIRM: '/demo/legal-firm',
  PORTFOLIO: '/demo/portfolio',
  LIFESTYLE_BLOG: '/demo/lifestyle-blog',
  REAL_ESTATE: '/demo/real-estate',
  LEGAL_GPT: '/demo/legal-gpt',
  RESTAURANT: '/demo/restaurant',
  AGENCY: '/demo/agency',
  AUTOMATION: '/demo/automation',
} as const;

export default {
  API_CONFIG,
  CONTACT,
  SOCIAL_LINKS,
  PERFORMANCE_THRESHOLDS,
  IMAGE_CONFIG,
  CACHE_CONFIG,
  ANIMATION_DURATION,
  BREAKPOINTS,
  VALIDATION,
  FEATURES,
  SEO,
  STORAGE_KEYS,
  ROUTES,
  DEMO_ROUTES,
};
