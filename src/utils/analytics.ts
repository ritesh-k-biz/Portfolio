/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Google Analytics 4 Custom Utility
// Tracks actions, routing, downloads, and form events securely and provides modular instrumentation.

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, any>) => void;
    dataLayer?: any[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

/**
 * Initializes GA4 scripts dynamically and securely in client runtime
 */
export function initAnalytics() {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) return;

  // Prevent duplicate insertion
  if (window.gtag) return;

  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', {
      page_path: window.location.pathname,
      anonymize_ip: true
    });
  `;
  document.head.appendChild(script2);
}

/**
 * Custom track event function for professional behavioral metrics
 */
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  } else {
    // Elegant system console logs for developer metrics
    console.debug(`[Analytics Tracking]: Action: "${action}" | Category: "${category}" | Label: "${label || 'none'}"`);
  }
}
