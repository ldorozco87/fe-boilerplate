'use client';

import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

interface ThemeRegistryProps {
  children: React.ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  return <AppRouterCacheProvider>{children}</AppRouterCacheProvider>;
}
