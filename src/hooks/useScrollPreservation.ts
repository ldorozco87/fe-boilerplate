'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Hook to preserve scroll position during client-side navigation
 * This is used to maintain scroll position when changing language
 */
export function useScrollPreservation() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if there's a saved scroll position
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      try {
        const { x, y, timestamp } = JSON.parse(savedPosition);
        const now = Date.now();

        // Only restore if saved recently (within 2 seconds)
        if (now - timestamp < 2000) {
          // Use requestAnimationFrame to ensure DOM is ready
          requestAnimationFrame(() => {
            window.scrollTo(x, y);
            // Clear the saved position
            sessionStorage.removeItem('scrollPosition');
          });
        } else {
          // Clear old position
          sessionStorage.removeItem('scrollPosition');
        }
      } catch (error) {
        console.warn('Failed to restore scroll position:', error);
        sessionStorage.removeItem('scrollPosition');
      }
    }
  }, [pathname]);
}
