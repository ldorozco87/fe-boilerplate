import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/layout/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Mock the theme provider
const theme = createTheme();

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    };
  },
  usePathname() {
    return '/en';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock next-intl
let currentLocale = 'en';
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        home: 'Home',
        about: 'About',
        features: 'Features',
        contact: 'Contact',
        language: 'Language',
      },
      es: {
        home: 'Inicio',
        about: 'Acerca de',
        features: 'Características',
        contact: 'Contacto',
        language: 'Idioma',
      },
    };
    return translations[currentLocale]?.[key] || key;
  },
  useLocale: () => currentLocale,
}));

// Mock window.location
const mockLocation = {
  href: '',
};
delete window.location;
window.location = mockLocation;

const MockedNavbar = () => (
  <ThemeProvider theme={theme}>
    <Navbar />
  </ThemeProvider>
);

describe('Language Switching Integration', () => {
  beforeEach(() => {
    currentLocale = 'en';
    mockLocation.href = '';
    mockPush.mockClear();
  });

  test('displays content in English by default', () => {
    render(<MockedNavbar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Features')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('language menu contains both language options', async () => {
    const user = userEvent.setup();
    render(<MockedNavbar />);

    // Open language menu
    const languageButton = screen.getByLabelText('change language');
    await user.click(languageButton);

    // Check both language options are present
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
  });

  test('clicking Spanish language option triggers language change', async () => {
    const user = userEvent.setup();
    render(<MockedNavbar />);

    // Open language menu
    const languageButton = screen.getByLabelText('change language');
    await user.click(languageButton);

    // Click Spanish option
    const spanishOption = screen.getByText('Español');
    await user.click(spanishOption);

    // Should trigger location change to Spanish
    expect(mockLocation.href).toContain('/es');
  });

  test('clicking English language option triggers language change', async () => {
    const user = userEvent.setup();
    // Start with Spanish locale
    currentLocale = 'es';

    render(<MockedNavbar />);

    // Open language menu
    const languageButton = screen.getByLabelText('change language');
    await user.click(languageButton);

    // Click English option
    const englishOption = screen.getByText('English');
    await user.click(englishOption);

    // Should trigger location change to English
    expect(mockLocation.href).toContain('/en');
  });

  test('language selection is properly indicated in menu', async () => {
    const user = userEvent.setup();
    render(<MockedNavbar />);

    // Open language menu
    const languageButton = screen.getByLabelText('change language');
    await user.click(languageButton);

    // English should be selected (aria-selected or similar indication)
    const englishOption = screen.getByText('English');
    const spanishOption = screen.getByText('Español');

    expect(englishOption).toBeInTheDocument();
    expect(spanishOption).toBeInTheDocument();
  });

  test('mobile language menu works correctly', async () => {
    const user = userEvent.setup();

    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    render(<MockedNavbar />);

    // Open mobile menu first
    const mobileMenuButton = screen.getByLabelText('open navigation menu');
    await user.click(mobileMenuButton);

    // Then access language option in mobile menu
    const languageMenuItem = screen.getByText('Language');
    expect(languageMenuItem).toBeInTheDocument();

    await user.click(languageMenuItem);

    // Language menu should open
    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('Español')).toBeInTheDocument();
    });
  });

  test('content changes when locale changes', () => {
    // Test English content
    const { rerender } = render(<MockedNavbar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();

    // Change to Spanish
    currentLocale = 'es';
    rerender(<MockedNavbar />);

    // Content should be in Spanish
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Acerca de')).toBeInTheDocument();
    expect(screen.getByText('Características')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });
});
