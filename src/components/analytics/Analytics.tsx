'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Analytics tracking function
const trackPageView = (url: string) => {
  if (typeof window !== 'undefined') {
    // Google Analytics 4 tracking
    if (window.gtag) {
      window.gtag(
        'config',
        process.env.NEXT_PUBLIC_GA_ID || 'GA_MEASUREMENT_ID',
        {
          page_path: url,
        }
      );
    }

    // Performance monitoring
    if ('performance' in window) {
      // Track page load time
      const navigationEntry = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const loadTime =
          navigationEntry.loadEventEnd - navigationEntry.loadEventStart;
        console.log('📊 Page Load Time:', Math.round(loadTime), 'ms');
      }

      // Track Core Web Vitals
      if ('web-vitals' in window) {
        // In production, you would use the actual web-vitals library
        console.log('📈 Core Web Vitals tracking enabled');
      }
    }

    console.log('📊 Analytics: Page view tracked -', url);
  }
};

// Custom event tracking
export const trackEvent = (
  eventName: string,
  parameters?: Record<string, unknown>
) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', eventName, parameters);
    }

    console.log('📊 Analytics: Event tracked -', eventName, parameters);
  }
};

// E-commerce tracking
export const trackPurchase = (
  transactionId: string,
  items: Record<string, unknown>[],
  value: number
) => {
  if (typeof window !== 'undefined') {
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: 'USD',
        items: items,
      });
    }

    console.log('📊 Analytics: Purchase tracked -', {
      transactionId,
      value,
      items,
    });
  }
};

// Cart events
export const trackAddToCart = (item: Record<string, unknown>) => {
  trackEvent('add_to_cart', {
    currency: 'USD',
    value: item.price,
    items: [item],
  });
};

export const trackRemoveFromCart = (item: Record<string, unknown>) => {
  trackEvent('remove_from_cart', {
    currency: 'USD',
    value: item.price,
    items: [item],
  });
};

// Form tracking
export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success,
  });
};

// Performance tracking
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Track important performance metrics
    const navigation = performance.getEntriesByType(
      'navigation'
    )[0] as PerformanceNavigationTiming;

    if (navigation) {
      const metrics = {
        dns_lookup: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp_connection: navigation.connectEnd - navigation.connectStart,
        server_response: navigation.responseEnd - navigation.requestStart,
        dom_processing:
          navigation.domContentLoadedEventEnd - navigation.responseEnd,
        page_load: navigation.loadEventEnd - navigation.loadEventStart,
      };

      console.log('📊 Performance Metrics:', metrics);

      // Track slow performance
      if (metrics.page_load > 3000) {
        trackEvent('slow_page_load', {
          load_time: metrics.page_load,
          page: window.location.pathname,
        });
      }
    }
  }
};

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    // Track performance metrics after component mount
    const timer = setTimeout(trackPerformance, 1000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
