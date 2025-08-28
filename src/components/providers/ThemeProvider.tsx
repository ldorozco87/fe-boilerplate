'use client';

import React, { useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { createAppTheme } from '@/styles/theme';
import { useThemeStore } from '@/stores/themeStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { isDark, initializeTheme } = useThemeStore();

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  // Convert Zustand mode to MUI theme mode
  const muiMode: 'light' | 'dark' = isDark ? 'dark' : 'light';

  const theme = createAppTheme(muiMode);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

// Export a hook for backward compatibility
export const useTheme = () => {
  const { mode, toggleMode } = useThemeStore();
  return {
    mode,
    toggleTheme: toggleMode,
  };
};
