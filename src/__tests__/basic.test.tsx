import { render, screen } from '@testing-library/react';

// Simple component for basic testing
function TestComponent() {
  return <div>Hello Test</div>;
}

describe('Basic Test Setup', () => {
  test('renders a simple component', () => {
    render(<TestComponent />);
    expect(screen.getByText('Hello Test')).toBeInTheDocument();
  });

  test('basic math works', () => {
    expect(2 + 2).toBe(4);
  });
});
