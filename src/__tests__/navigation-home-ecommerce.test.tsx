import { render, screen } from '@/__tests__/utils/test-utils';
import Navbar from '@/components/layout/Navbar';

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

describe('Navigation: Home ↔ Ecommerce', () => {
  beforeEach(() => {
    currentPathname = '/en';
    mockPush.mockClear();
  });

  test('can navigate from home to ecommerce', () => {
    render(<Navbar />);

    // Find ecommerce link
    const ecommerceLink = screen.getByText('ecommerce');
    expect(ecommerceLink).toBeInTheDocument();

    // Check that the link has the correct href
    expect(ecommerceLink.closest('a')).toHaveAttribute('href', '/en/ecommerce');
  });

  test('can navigate from ecommerce back to home', () => {
    // Set current path to ecommerce
    currentPathname = '/en/ecommerce';

    render(<Navbar />);

    // Find home link (logo or home button)
    const homeLink = screen.getByText('home');
    expect(homeLink).toBeInTheDocument();

    // Check that the link has the correct href
    expect(homeLink.closest('a')).toHaveAttribute('href', '/en');
  });

  test('logo always links to home page', () => {
    // Test from home page
    currentPathname = '/en';
    const { rerender } = render(<Navbar />);

    const logo = screen.getByText('Next.js Boilerplate');
    expect(logo.closest('a')).toHaveAttribute('href', '/en');

    // Test from ecommerce page
    currentPathname = '/en/ecommerce';
    rerender(<Navbar />);

    const logoFromEcommerce = screen.getByText('Next.js Boilerplate');
    expect(logoFromEcommerce.closest('a')).toHaveAttribute('href', '/en');
  });
});
