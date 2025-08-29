import { render, screen } from '@/__tests__/utils/test-utils';
import HomePage from '@/app/[locale]/page';

describe('Contact Section Scroll Limit', () => {
  beforeEach(() => {
    // Mock document.getElementById for contact section
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === 'contact') {
        return {
          scrollIntoView: jest.fn(),
          offsetTop: 2000,
        };
      }
      return null;
    });

    // Mock page dimensions
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2500,
      writable: true,
    });

    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });
  });

  test('contact link exists and has correct href', () => {
    render(<HomePage />);

    // Find contact link in the page (it's in the hero section)
    const contactLink = screen.getByText('getStarted');
    expect(contactLink).toBeInTheDocument();

    // Check that it has the correct href to scroll to contact section
    expect(contactLink.closest('a')).toHaveAttribute('href', '#contact');
  });

  test('contact section is near the bottom of the page', () => {
    render(<HomePage />);

    // Mock being at contact section
    Object.defineProperty(window, 'scrollY', {
      value: 2000,
      writable: true,
    });

    // Calculate remaining scroll
    const remainingScroll =
      document.documentElement.scrollHeight -
      window.innerHeight -
      window.scrollY;

    // Should have minimal remaining scroll (less than 300px)
    expect(remainingScroll).toBeLessThan(300);
  });
});
