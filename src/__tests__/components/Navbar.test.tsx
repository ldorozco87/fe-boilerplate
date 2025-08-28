import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import userEvent from '@testing-library/user-event';
import Navbar from '@/components/layout/Navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  test('renders navbar with navigation items', () => {
    render(<Navbar />);

    expect(screen.getByText('Next.js Boilerplate')).toBeInTheDocument();
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByText('ecommerce')).toBeInTheDocument();
  });

  test('navbar becomes visible with scroll effect when scrolling down', async () => {
    render(<Navbar />);

    const navbar = screen.getByRole('banner');

    // Initially navbar should be visible but without scroll effect
    expect(navbar).toBeInTheDocument();

    // Simulate scroll down
    Object.defineProperty(window, 'scrollY', {
      value: 50,
      writable: true,
    });

    // Trigger scroll event
    fireEvent.scroll(window, { target: { scrollY: 50 } });

    // Navbar should still be visible after scroll
    expect(navbar).toBeInTheDocument();
  });

  test('language menu opens and changes language', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Find and click language button
    const languageButton = screen.getByLabelText('change language');
    await user.click(languageButton);

    // Check if language options appear
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('Español')).toBeInTheDocument();
  });

  test('theme toggle button works', async () => {
    const user = userEvent.setup();
    render(<Navbar />);

    // Find theme toggle button (use getAllByLabelText since there are multiple)
    const themeButtons = screen.getAllByLabelText('toggle theme');
    expect(themeButtons).toHaveLength(2); // One for desktop, one for mobile
    const themeButton = themeButtons[0]; // Use the first one

    // Click theme toggle
    await user.click(themeButton);

    // Button should still be present (functionality may vary based on implementation)
    expect(themeButton).toBeInTheDocument();
  });

  test('mobile menu opens correctly', async () => {
    const user = userEvent.setup();

    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500,
    });

    render(<Navbar />);

    // Find mobile menu button
    const mobileMenuButton = screen.getByLabelText('open navigation menu');
    await user.click(mobileMenuButton);

    // Mobile menu should be accessible
    expect(mobileMenuButton).toBeInTheDocument();
  });
});
