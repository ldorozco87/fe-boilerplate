import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@/__tests__/utils/test-utils';
import ContactForm from '@/components/forms/ContactForm';

describe('Contact Form - Simple Test', () => {
  test('contact form renders and submits successfully', async () => {
    render(<ContactForm />);

    // Check form fields are present
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

    // Fill out form
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, {
      target: { value: 'This is a test message' },
    });

    // Submit form
    fireEvent.click(submitButton);

    // Wait for form submission - check that button shows "Sending..." state
    await waitFor(() => {
      expect(screen.getByText('Sending...')).toBeInTheDocument();
    });
  });
});
