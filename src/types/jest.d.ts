import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toBeVisible(): R;
      toHaveStyle(style: Record<string, string | number>): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveValue(value: string): R;
    }
  }
}
