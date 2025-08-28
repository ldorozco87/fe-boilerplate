'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';

/**
 * Legacy useScrollSpy hook - now uses Zustand as backend
 *
 * @deprecated Consider using useAppStore directly for new components
 */
export function useScrollSpy(sectionIds: string[], offset: number = 0): string {
  const { activeSection, setActiveSection } = useAppStore();

  useEffect(() => {
    if (sectionIds.length === 0) {
      if (activeSection !== '') {
        setActiveSection('');
      }
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the section that is currently in view
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            if (activeSection !== sectionIds[i]) {
              setActiveSection(sectionIds[i]);
            }
            return;
          }
        }
      }

      // If we're at the top, set the first section as active
      if (scrollPosition < 100) {
        const firstSection = sectionIds[0] || '';
        if (activeSection !== firstSection) {
          setActiveSection(firstSection);
        }
      }
    };

    // Set initial active section
    handleScroll();

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset, setActiveSection, activeSection]);

  return activeSection;
}
