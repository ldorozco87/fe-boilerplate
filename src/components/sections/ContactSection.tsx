'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import ContactForm from '@/components/forms/ContactForm';

const MotionBox = motion.create(Box);

export default function ContactSection() {
  const theme = useTheme();
  const t = useTranslations('ContactSection');

  const contactInfo = [
    {
      icon: EmailIcon,
      title: t('info.email'),
      value: 'hello@nextjs-boilerplate.com',
      color: '#1976d2',
    },
    {
      icon: LocationIcon,
      title: t('info.location'),
      value: 'San Francisco, CA',
      color: '#ed6c02',
    },
    {
      icon: PhoneIcon,
      title: t('info.phone'),
      value: '+1 (555) 123-4567',
      color: '#2e7d32',
    },
  ];

  return (
    <Box
      id="contact"
      sx={{
        // Configuración para que Contact + Footer = 100vh exacto
        flex: '1 0 auto',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 2, md: 3 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        // Usar viewport units más precisos
        minHeight: '60vh', // Mínimo para que se vea bien
        '@media (min-height: 700px)': {
          minHeight: 'calc(100vh - 145px)', // Incluyendo border del footer (1px) + margen
        },
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Grid container spacing={6} alignItems="center">
          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 5 }}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '2.5rem', md: '3rem' },
                }}
              >
                {t('title')}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 4, lineHeight: 1.6, fontWeight: 300 }}
              >
                {t('subtitle')}
              </Typography>

              <Stack spacing={3}>
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <MotionBox
                      key={info.title}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ x: 8 }}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${alpha(info.color, 0.05)}, ${alpha(info.color, 0.02)})`,
                        border: `1px solid ${alpha(info.color, 0.1)}`,
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          border: `1px solid ${alpha(info.color, 0.3)}`,
                          boxShadow: `0 8px 30px ${alpha(info.color, 0.15)}`,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 45,
                          height: 45,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${info.color}, ${alpha(info.color, 0.8)})`,
                          color: 'white',
                          mr: 3,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: '0.875rem' }}
                        >
                          {info.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 500,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {info.value}
                        </Typography>
                      </Box>
                    </MotionBox>
                  );
                })}
              </Stack>
            </MotionBox>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <MotionBox
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <ContactForm />
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
