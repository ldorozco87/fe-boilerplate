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
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { trackFormSubmission } from '@/components/analytics/Analytics';

// Validation schema
const createContactSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, t('nameRequired')),
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
    message: z
      .string()
      .min(1, t('messageRequired'))
      .min(10, t('messageMinLength')),
  });

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const contactSchema = createContactSchema(t);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

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
    <Card elevation={2} sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent sx={{ p: 4 }}>
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

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label={t('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    variant="outlined"
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
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    variant="outlined"
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
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    variant="outlined"
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
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
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
