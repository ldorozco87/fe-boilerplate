'use client';

import React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  Alert,
} from '@/lib/mui';
import { Send as SendIcon } from '@mui/icons-material';
import { Controller } from 'react-hook-form';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { trackFormSubmission } from '@/components/analytics/Analytics';
import { useFormValidation } from '@/hooks/useFormValidation';
import {
  createCardStyles,
  createFormStyles,
  createButtonStyles,
} from '@/lib/styles';
import { useTheme } from '@/lib/mui';

// Validation schema using common schemas
const createContactSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t('fieldRequired')),
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
    message: z.string().min(1, t('fieldRequired')).min(10, t('minLength')),
  });

type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const theme = useTheme();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const contactSchema = createContactSchema(t);

  const {
    control,
    handleSubmit,
    reset,
    hasFieldError,
    getFieldHelperText,
    isSubmitting,
  } = useFormValidation(contactSchema, {
    name: '',
    email: '',
    message: '',
  });

  // Style objects
  const cardStyles = createCardStyles(theme);
  const formStyles = createFormStyles(theme);
  const buttonStyles = createButtonStyles(theme);

  const onSubmit = async (data: ContactFormData) => {
    try {
      console.log('📧 Contact form submission:', {
        timestamp: new Date().toISOString(),
        formData: data,
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'Direct',
        locale: window.location.pathname.split('/')[1] || 'en',
      });

      // Simulate API call with realistic timing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In a real application, you would send this to:
      // - Your backend API endpoint
      // - Email service like SendGrid, Mailgun, etc.
      // - CRM like HubSpot, Salesforce, etc.
      // - Form handling service like Formspree, Netlify Forms, etc.

      console.log('✅ Form submitted successfully! In production, this would:');
      console.log('• Send email notification to your team');
      console.log('• Store submission in database');
      console.log('• Send auto-reply to customer');
      console.log('• Trigger CRM/analytics events');

      // Track successful form submission
      trackFormSubmission('contact_form', true);

      setIsSubmitted(true);
      reset();

      // Reset success message after 8 seconds
      setTimeout(() => setIsSubmitted(false), 8000);
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      // Track failed form submission
      trackFormSubmission('contact_form', false);
      // In production, you would handle this with proper error states
    }
  };

  return (
    <Card sx={{ ...cardStyles.card, maxWidth: 600, mx: 'auto' }}>
      <CardContent sx={cardStyles.cardContent}>
        <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
          {t('submit')}
        </Typography>

        {isSubmitted && (
          <Alert
            severity="success"
            sx={{
              mb: 3,
              '& .MuiAlert-message': {
                width: '100%',
              },
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Message sent successfully! 🎉
            </Typography>
            <Typography variant="body2">
              We&apos;ll get back to you within 24 hours. Check the console to
              see the simulated API call details.
            </Typography>
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit as (data: ContactFormData) => void)}
          noValidate
        >
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('name')}
                    error={hasFieldError('name')}
                    helperText={getFieldHelperText('name')}
                    variant="outlined"
                    sx={formStyles.field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('email')}
                    type="email"
                    error={hasFieldError('email')}
                    helperText={getFieldHelperText('email')}
                    variant="outlined"
                    sx={formStyles.field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('message')}
                    multiline
                    rows={4}
                    error={hasFieldError('message')}
                    helperText={getFieldHelperText('message')}
                    variant="outlined"
                    sx={formStyles.field}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                startIcon={<SendIcon />}
                sx={{
                  ...buttonStyles.primary,
                  mt: 2,
                }}
              >
                {isSubmitting ? 'Sending...' : t('submit')}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
