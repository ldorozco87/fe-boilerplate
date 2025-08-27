import '@testing-library/jest-dom'

// Mock básico para Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock básico para MUI
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(() => false),
}))

// Mock básico para Zustand
jest.mock('zustand', () => ({
  create: jest.fn(() => {
    const mockStore = {
      isDrawerOpen: false,
      activePath: '/',
      openDrawer: jest.fn(),
      closeDrawer: jest.fn(),
      toggleDrawer: jest.fn(),
      setActivePath: jest.fn(),
    }
    
    // Return a function that returns the mock store
    return () => mockStore
  }),
}))

// Mock básico para Zustand middleware
jest.mock('zustand/middleware', () => ({
  devtools: jest.fn((fn) => fn),
}))

// Mock básico para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
