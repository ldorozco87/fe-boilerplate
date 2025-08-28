/**
 * Simple Contact Form tests covering requirement #3
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/forms/ContactForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const MockedContactForm = () => (
  <ThemeProvider theme={theme}>
    <ContactForm />
  </ThemeProvider>
);

describe('Contact Form Core Tests', () => {
  test('3. Contact form basic functionality works', async () => {
    render(<MockedContactForm />);

    // All form fields should be present
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('Form validation works for empty fields', async () => {
    const user = userEvent.setup();
    render(<MockedContactForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Submit empty form
    await user.click(submitButton);

    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/nameRequired/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/emailRequired/i)).toBeInTheDocument();
    expect(screen.getByText(/messageRequired/i)).toBeInTheDocument();
  });

  test('Form accepts valid input and submits', async () => {
    const user = userEvent.setup();
    render(<MockedContactForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Fill form with valid data
    await user.type(nameInput, 'John Doe');
    await user.type(emailInput, 'john@example.com');
    await user.type(
      messageInput,
      'This is a test message with enough characters.'
    );

    // Submit form
    await user.click(submitButton);

    // Form should accept the data (no validation errors)
    await waitFor(() => {
      expect(screen.queryByText(/nameRequired/i)).not.toBeInTheDocument();
    });
  });

  test('Email validation works correctly', async () => {
    const user = userEvent.setup();
    render(<MockedContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Enter invalid email
    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    // Should show email validation error
    await waitFor(() => {
      expect(screen.getByText(/emailInvalid/i)).toBeInTheDocument();
    });
  });

  test('Message length validation works', async () => {
    const user = userEvent.setup();
    render(<MockedContactForm />);

    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Enter message that's too short
    await user.type(messageInput, 'short');
    await user.click(submitButton);

    // Should show length validation error
    await waitFor(() => {
      expect(screen.getByText(/messageMinLength/i)).toBeInTheDocument();
    });
  });
});
