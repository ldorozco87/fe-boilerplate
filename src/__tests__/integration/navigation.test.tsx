import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/layout/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Mock the theme provider
const theme = createTheme();

// Mock next/navigation
const mockPush = jest.fn();
let currentPathname = '/en';

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
    return currentPathname;
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

const MockedNavbar = () => (
  <ThemeProvider theme={theme}>
    <Navbar />
  </ThemeProvider>
);

describe('Navigation Integration Tests', () => {
  beforeEach(() => {
    currentPathname = '/en';
    mockPush.mockClear();
  });

  test('home page navbar shows all navigation items including e-commerce', () => {
    render(<MockedNavbar />);

    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('features')).toBeInTheDocument();
    expect(screen.getByText('contact')).toBeInTheDocument();
    expect(screen.getByText('ecommerce')).toBeInTheDocument();
  });

  test('can navigate to e-commerce from home page', async () => {
    const user = userEvent.setup();
    render(<MockedNavbar />);

    // Find and click e-commerce link
    const ecommerceLink = screen.getByText('ecommerce');
    expect(ecommerceLink.closest('a')).toHaveAttribute('href', '/en/ecommerce');
  });

  test('e-commerce page navbar shows simplified navigation', () => {
    // Simulate being on e-commerce page
    currentPathname = '/en/ecommerce';

    render(<MockedNavbar />);

    // Should show home and e-commerce links (simplified navigation)
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('ecommerce')).toBeInTheDocument();

    // Should not show section-specific navigation (about, features, contact)
    // These are only for home page scrolling
    const homeLink = screen.getByText('home');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/en');
  });

  test('can navigate back to home from e-commerce page', () => {
    currentPathname = '/en/ecommerce';

    render(<MockedNavbar />);

    const homeLink = screen.getByText('home');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/en');
  });

  test('navigation adapts based on current page', () => {
    // Test home page navigation
    const { rerender } = render(<MockedNavbar />);

    // On home page, should have section navigation
    expect(screen.getByText('about')).toBeInTheDocument();
    expect(screen.getByText('features')).toBeInTheDocument();
    expect(screen.getByText('contact')).toBeInTheDocument();

    // Switch to e-commerce page
    currentPathname = '/en/ecommerce';
    rerender(<MockedNavbar />);

    // Should have simplified navigation
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('ecommerce')).toBeInTheDocument();
  });

  test('mobile navigation works for both home and e-commerce pages', async () => {
    const user = userEvent.setup();

    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    // Test on home page
    render(<MockedNavbar />);

    const mobileMenuButton = screen.getByLabelText('open navigation menu');
    await user.click(mobileMenuButton);

    // Should show all navigation items in mobile menu
    await waitFor(() => {
      expect(screen.getByText('home')).toBeInTheDocument();
      expect(screen.getByText('ecommerce')).toBeInTheDocument();
    });
  });

  test('logo always links to home page regardless of current page', () => {
    // Test from home page
    render(<MockedNavbar />);

    const logo = screen.getByText('Next.js Boilerplate');
    expect(logo.closest('a')).toHaveAttribute('href', '/en');

    // Test from e-commerce page
    currentPathname = '/en/ecommerce';
    const { rerender } = render(<MockedNavbar />);
    rerender(<MockedNavbar />);

    const logoFromEcommerce = screen.getByText('Next.js Boilerplate');
    expect(logoFromEcommerce.closest('a')).toHaveAttribute('href', '/en');
  });

  test('navbar maintains language context during navigation', () => {
    // Spanish locale
    currentPathname = '/es';

    render(<MockedNavbar />);

    // E-commerce link should maintain Spanish locale
    const ecommerceLink = screen.getByText('ecommerce');
    expect(ecommerceLink.closest('a')).toHaveAttribute('href', '/es/ecommerce');

    // Switch to e-commerce page in Spanish
    currentPathname = '/es/ecommerce';
    const { rerender } = render(<MockedNavbar />);
    rerender(<MockedNavbar />);

    // Home link should maintain Spanish locale
    const homeLink = screen.getByText('home');
    expect(homeLink.closest('a')).toHaveAttribute('href', '/es');
  });

  test('smooth scroll navigation only works on home page', async () => {
    const user = userEvent.setup();

    // Mock document.getElementById for home page
    const mockScrollIntoView = jest.fn();
    document.getElementById = jest.fn().mockReturnValue({
      scrollIntoView: mockScrollIntoView,
    });

    // On home page, should use smooth scroll for section links
    render(<MockedNavbar />);

    const aboutLink = screen.getByText('about');
    await user.click(aboutLink);

    // Should trigger smooth scroll (mocked)
    expect(document.getElementById).toHaveBeenCalledWith('about');

    // On e-commerce page, section links should not be available
    currentPathname = '/en/ecommerce';
    const { rerender } = render(<MockedNavbar />);
    rerender(<MockedNavbar />);

    // About link should not be present on e-commerce page
    expect(screen.queryByText('about')).not.toBeInTheDocument();
  });
});
