import { onCLS, onFCP, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and sends to analytics
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

/**
 * Send metric to analytics service
 */
const sendToAnalytics = (metric: PerformanceMetric) => {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 [Performance] ${metric.name}:`, {
      value: Math.round(metric.value),
      rating: metric.rating,
    });
  }

  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.value),
      metric_rating: metric.rating,
      non_interaction: true,
    });
  }

  // Send to custom analytics if available
  if (typeof window !== 'undefined' && (window as any).analytics) {
    (window as any).analytics.track('Web Vitals', {
      metric: metric.name,
      value: Math.round(metric.value),
      rating: metric.rating,
      id: metric.id,
    });
  }
};

/**
 * Process and send web vitals
 */
const reportWebVitals = (metric: Metric) => {
  sendToAnalytics({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
  });
};

/**
 * Initialize performance monitoring
 * Call this once in your app entry point (main.tsx)
 */
export const initPerformanceMonitoring = () => {
  // Core Web Vitals
  onCLS(reportWebVitals); // Cumulative Layout Shift
  onINP(reportWebVitals); // Interaction to Next Paint (replaces FID)
  onLCP(reportWebVitals); // Largest Contentful Paint
  onFCP(reportWebVitals); // First Contentful Paint
  onTTFB(reportWebVitals); // Time to First Byte

  // Log performance info
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 Performance monitoring initialized');
  }
};

/**
 * Measure and log custom performance marks
 */
export const measurePerformance = (markName: string) => {
  if (typeof window === 'undefined' || !window.performance) return;

  try {
    window.performance.mark(markName);
    console.log(`⏱️ [Performance Mark] ${markName}`);
  } catch (error) {
    console.error('Failed to create performance mark:', error);
  }
};

/**
 * Get performance metrics summary
 */
export const getPerformanceMetrics = () => {
  if (typeof window === 'undefined' || !window.performance) {
    return null;
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');

  return {
    // Navigation Timing
    dns: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
    tcp: Math.round(navigation.connectEnd - navigation.connectStart),
    ttfb: Math.round(navigation.responseStart - navigation.requestStart),
    download: Math.round(navigation.responseEnd - navigation.responseStart),
    domInteractive: Math.round(navigation.domInteractive),
    domComplete: Math.round(navigation.domComplete),
    loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),

    // Paint Timing
    fcp: paint.find((entry) => entry.name === 'first-contentful-paint')?.startTime || 0,
    
    // Total page load time
    totalLoadTime: Math.round(performance.now()),
  };
};

/**
 * Report performance metrics on page unload (optional)
 */
export const reportOnUnload = () => {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeunload', () => {
    const metrics = getPerformanceMetrics();
    if (metrics && process.env.NODE_ENV === 'development') {
      console.log('📈 Performance Summary:', metrics);
    }
  });
};

export default {
  initPerformanceMonitoring,
  measurePerformance,
  getPerformanceMetrics,
  reportOnUnload,
};
