import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key) => key,
  useLocale: () => 'en',
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    create: (component) => component,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock custom ThemeProvider hook specifically
global.mockTheme = {
  mode: 'light',
  toggleTheme: jest.fn(),
};

// Mock Material UI theme
jest.mock('@mui/material/styles', () => ({
  ...jest.requireActual('@mui/material/styles'),
  useTheme: () => ({
    palette: {
      primary: { main: '#1976d2', dark: '#1565c0' },
      secondary: { main: '#dc004e', dark: '#9c0037' },
      background: { paper: '#fff' },
      text: { primary: '#000' },
      action: { hover: 'rgba(0, 0, 0, 0.04)' },
      common: { black: '#000' },
      divider: 'rgba(0, 0, 0, 0.12)',
    },
    breakpoints: {
      up: () => '@media (min-width: 600px)',
      down: () => '@media (max-width: 600px)',
    },
  }),
}));

// Mock window.scrollTo
global.scrollTo = jest.fn();

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
