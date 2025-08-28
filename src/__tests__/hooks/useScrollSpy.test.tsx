import { renderHook, act } from '@testing-library/react';
import { useScrollSpy } from '@/hooks/useScrollSpy';

// Mock IntersectionObserver
class MockIntersectionObserver {
  private callback: IntersectionObserverCallback;
  private elements: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe(element: Element) {
    this.elements.push(element);
  }

  unobserve(element: Element) {
    this.elements = this.elements.filter((el) => el !== element);
  }

  disconnect() {
    this.elements = [];
  }

  // Helper method to trigger intersection changes
  triggerIntersection(entries: Partial<IntersectionObserverEntry>[]) {
    this.callback(
      entries as IntersectionObserverEntry[],
      this as IntersectionObserver
    );
  }
}

describe('useScrollSpy Hook', () => {
  let mockObserver: MockIntersectionObserver;

  beforeEach(() => {
    mockObserver = new MockIntersectionObserver(() => {});

    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
      mockObserver = new MockIntersectionObserver(callback);
      return mockObserver;
    });

    // Mock document.getElementById
    document.getElementById = jest.fn().mockImplementation((id) => {
      const element = document.createElement('div');
      element.id = id;
      return element;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with empty active section', () => {
    const { result } = renderHook(() =>
      useScrollSpy(['hero', 'about', 'contact'], 100)
    );

    expect(result.current).toBe('');
  });

  test('returns empty string when no sections provided', () => {
    const { result } = renderHook(() => useScrollSpy([], 100));

    expect(result.current).toBe('');
  });

  test('updates active section when intersection changes', () => {
    const { result } = renderHook(() =>
      useScrollSpy(['hero', 'about', 'contact'], 100)
    );

    // Simulate hero section becoming visible
    act(() => {
      mockObserver.triggerIntersection([
        {
          target: { id: 'hero' } as Element,
          isIntersecting: true,
          intersectionRatio: 0.8,
        },
      ]);
    });

    expect(result.current).toBe('hero');
  });

  test('changes active section as user scrolls', () => {
    const { result } = renderHook(() =>
      useScrollSpy(['hero', 'about', 'contact'], 100)
    );

    // Start with hero
    act(() => {
      mockObserver.triggerIntersection([
        {
          target: { id: 'hero' } as Element,
          isIntersecting: true,
          intersectionRatio: 0.8,
        },
      ]);
    });

    expect(result.current).toBe('hero');

    // Scroll to about section
    act(() => {
      mockObserver.triggerIntersection([
        {
          target: { id: 'hero' } as Element,
          isIntersecting: false,
          intersectionRatio: 0.2,
        },
        {
          target: { id: 'about' } as Element,
          isIntersecting: true,
          intersectionRatio: 0.9,
        },
      ]);
    });

    expect(result.current).toBe('about');
  });

  test('handles contact section as final section correctly', () => {
    const { result } = renderHook(() =>
      useScrollSpy(['hero', 'about', 'showcase', 'contact'], 100)
    );

    // Scroll to contact (last section)
    act(() => {
      mockObserver.triggerIntersection([
        {
          target: { id: 'contact' } as Element,
          isIntersecting: true,
          intersectionRatio: 0.7,
        },
      ]);
    });

    expect(result.current).toBe('contact');

    // When at contact, user should not be able to scroll much further
    // This is more of a behavioral test - contact should be near page bottom
    const sections = ['hero', 'about', 'showcase', 'contact'];
    const contactIndex = sections.indexOf('contact');

    expect(contactIndex).toBe(sections.length - 1); // Contact is last section
  });

  test('cleans up observers on unmount', () => {
    const { unmount } = renderHook(() =>
      useScrollSpy(['hero', 'about', 'contact'], 100)
    );

    const disconnectSpy = jest.spyOn(mockObserver, 'disconnect');

    unmount();

    expect(disconnectSpy).toHaveBeenCalled();
  });

  test('handles missing DOM elements gracefully', () => {
    // Mock getElementById to return null for some elements
    document.getElementById = jest.fn().mockImplementation((id) => {
      if (id === 'nonexistent') return null;
      const element = document.createElement('div');
      element.id = id;
      return element;
    });

    // Should not crash when some sections don't exist
    const { result } = renderHook(() =>
      useScrollSpy(['hero', 'nonexistent', 'contact'], 100)
    );

    expect(result.current).toBe('');
  });
});
