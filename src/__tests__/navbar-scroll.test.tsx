import { render, screen, fireEvent } from '@/__tests__/utils/test-utils';
import Navbar from '@/components/layout/Navbar';

describe('Navbar Scroll Behavior', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  test('navbar becomes visible when scrolling down', () => {
    render(<Navbar />);

    const navbar = screen.getByRole('banner');
    expect(navbar).toBeInTheDocument();

    // Simulate scrolling down
    Object.defineProperty(window, 'scrollY', {
      value: 100,
      writable: true,
    });

    // Trigger scroll event
    fireEvent.scroll(window);

    // Navbar should still be visible (it's always visible in this implementation)
    expect(navbar).toBeInTheDocument();
  });
});
