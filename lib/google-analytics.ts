/**
 * Google Analytics utility functions
 */

// Track conversion events
export function trackConversion(conversionLabel: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': `AW-17850891164/${conversionLabel}`
    });
  }
}

// Track page view
export function trackPageView(pagePath: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'AW-17850891164', {
      'page_path': pagePath
    });
  }
}

// Add gtag to window type
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}
