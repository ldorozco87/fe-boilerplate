'use client';

import React from 'react';

interface ZustandProviderProps {
  children: React.ReactNode;
}

/**
 * ZustandProvider - A provider component for Zustand stores
 *
 * This provider is optional since Zustand stores work globally without providers.
 * However, it can be useful for:
 * - Initializing stores with server-side data
 * - Setting up store subscriptions
 * - Providing store context for testing
 */
export default function ZustandProvider({ children }: ZustandProviderProps) {
  // You can add store initialization logic here if needed
  // For example, hydrating stores with server-side data

  return <>{children}</>;
}
