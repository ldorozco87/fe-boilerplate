import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from '@/components/forms/ContactForm';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Mock the theme provider
const theme = createTheme();

const MockedContactForm = () => (
  <ThemeProvider theme={theme}>
    <ContactForm />
  </ThemeProvider>
);

describe('ContactForm Component', () => {
  test('renders all form fields', () => {
    render(<MockedContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<MockedContactForm />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getByText(/fieldRequired/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/emailRequired/i)).toBeInTheDocument();
    expect(screen.getByText(/fieldRequired/i)).toBeInTheDocument();
  });

  test('shows email validation error for invalid email', async () => {
    const user = userEvent.setup();
    render(<MockedContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(emailInput, 'invalid-email');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/emailInvalid/i)).toBeInTheDocument();
    });
  });

  test('shows message length validation error', async () => {
    const user = userEvent.setup();
    render(<MockedContactForm />);

    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(messageInput, 'short'); // Less than 10 characters
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/minLength/i)).toBeInTheDocument();
    });
  });

  test('successfully submits form with valid data', async () => {
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
      'This is a test message with more than 10 characters.'
    );

    await user.click(submitButton);

    // Form should be submitted (no validation errors)
    await waitFor(() => {
      expect(screen.queryByText(/nameRequired/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/emailRequired/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/messageRequired/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/emailInvalid/i)).not.toBeInTheDocument();
    });
  });

  test('form fields can be typed in', async () => {
    const user = userEvent.setup();
    render(<MockedContactForm />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);

    await user.type(nameInput, 'Test Name');
    await user.type(emailInput, 'test@email.com');
    await user.type(messageInput, 'Test message content');

    expect(nameInput).toHaveValue('Test Name');
    expect(emailInput).toHaveValue('test@email.com');
    expect(messageInput).toHaveValue('Test message content');
  });

  test('form can be cleared and refilled', async () => {
    const user = userEvent.setup();
    render(<MockedContactForm />);

    const nameInput = screen.getByLabelText(/name/i);

    // Type, clear, and type again
    await user.type(nameInput, 'First Name');
    expect(nameInput).toHaveValue('First Name');

    await user.clear(nameInput);
    expect(nameInput).toHaveValue('');

    await user.type(nameInput, 'Second Name');
    expect(nameInput).toHaveValue('Second Name');
  });
});
