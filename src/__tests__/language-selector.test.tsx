import { render, screen, waitFor } from '@/__tests__/utils/test-utils';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/layout/Navbar';

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

describe('Language Selector', () => {
  beforeEach(() => {
    currentLocale = 'en';
    mockPush.mockClear();
  });

  test('language selector opens and shows language options', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Find language button
    const languageButton = screen.getByLabelText('change language');
    expect(languageButton).toBeInTheDocument();

    // Click to open language menu
    await user.click(languageButton);

    // Should show language options
    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('Español')).toBeInTheDocument();
    });
  });

  test('language selector shows both language options', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Open language menu
    const languageButton = screen.getByLabelText('change language');
    await user.click(languageButton);

    // Should show both language options
    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('Español')).toBeInTheDocument();
    });
  });
});
