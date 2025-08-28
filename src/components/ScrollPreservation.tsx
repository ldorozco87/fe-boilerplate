'use client';

import { useScrollPreservation } from '@/hooks/useScrollPreservation';

/**
 * Component to preserve scroll position during client-side navigation
 * This is used to maintain scroll position when changing language
 */
export default function ScrollPreservation() {
  useScrollPreservation();
  return null; // This component doesn't render anything
}
