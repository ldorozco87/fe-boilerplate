import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  initializeTheme: () => void;
  isDark: boolean;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'system',
      isDark: false,

      setMode: (mode: ThemeMode) => {
        set({ mode });

        // Update isDark based on mode
        if (mode === 'dark') {
          set({ isDark: true });
        } else if (mode === 'light') {
          set({ isDark: false });
        } else {
          // system mode - check system preference
          const systemPrefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)'
          ).matches;
          set({ isDark: systemPrefersDark });
        }
      },

      toggleMode: () => {
        const currentMode = get().mode;
        if (currentMode === 'light') {
          get().setMode('dark');
        } else if (currentMode === 'dark') {
          get().setMode('system');
        } else {
          get().setMode('light');
        }
      },

      initializeTheme: () => {
        // This function is called on mount to ensure theme is properly initialized
        const currentMode = get().mode;
        get().setMode(currentMode);
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

// Listen to system theme changes
if (typeof window !== 'undefined') {
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const { mode } = useThemeStore.getState();
      if (mode === 'system') {
        useThemeStore.setState({ isDark: e.matches });
      }
    });
}
