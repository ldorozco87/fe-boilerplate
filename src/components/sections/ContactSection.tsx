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
  Card,
  CardContent,
} from '@mui/material';
import {
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

import ContactForm from '@/components/forms/ContactForm';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const contactInfo = [
  {
    icon: EmailIcon,
    title: 'Email Us',
    description: 'Get in touch via email',
    value: 'hello@nextjs-boilerplate.com',
    color: '#1976d2',
  },
  {
    icon: PhoneIcon,
    title: 'Call Us',
    description: 'Speak with our team',
    value: '+1 (555) 123-4567',
    color: '#2e7d32',
  },
  {
    icon: LocationIcon,
    title: 'Visit Us',
    description: 'Our office location',
    value: 'San Francisco, CA',
    color: '#ed6c02',
  },
  {
    icon: ScheduleIcon,
    title: 'Working Hours',
    description: 'Monday to Friday',
    value: '9:00 AM - 6:00 PM PST',
    color: '#9c27b0',
  },
];

export default function ContactSection() {
  const theme = useTheme();

  return (
    <Box
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background: alpha(theme.palette.background.paper, 0.5),
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={8}>
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              Have questions about the boilerplate? Want to collaborate? 
              We&apos;d love to hear from you!
            </Typography>
          </MotionBox>

          <Grid container spacing={6}>
            {/* Contact Information */}
            <Grid size={{ xs: 12, md: 5 }}>
              <Stack spacing={4}>
                <MotionBox
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 3 }}
                  >
                    Let&apos;s Connect
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 4, lineHeight: 1.7 }}
                  >
                    Whether you&apos;re interested in using this boilerplate for your next project, 
                    have suggestions for improvements, or want to contribute to the open-source 
                    community, we&apos;re here to help.
                  </Typography>
                </MotionBox>

                <Stack spacing={3}>
                  {contactInfo.map((info, index) => {
                    const IconComponent = info.icon;
                    return (
                      <MotionCard
                        key={info.title}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        whileHover={{ x: 8 }}
                        sx={{
                          background: `linear-gradient(135deg, ${alpha(info.color, 0.05)}, ${alpha(info.color, 0.02)})`,
                          border: `1px solid ${alpha(info.color, 0.1)}`,
                          borderRadius: 2,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            border: `1px solid ${alpha(info.color, 0.3)}`,
                            boxShadow: `0 8px 30px ${alpha(info.color, 0.15)}`,
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Stack direction="row" spacing={3} alignItems="center">
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${info.color}, ${alpha(info.color, 0.7)})`,
                                color: 'white',
                              }}
                            >
                              <IconComponent />
                            </Box>
                            <Box>
                              <Typography
                                variant="h6"
                                component="h4"
                                sx={{ fontWeight: 600, mb: 0.5 }}
                              >
                                {info.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 0.5 }}
                              >
                                {info.description}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ 
                                  fontWeight: 500,
                                  color: info.color,
                                }}
                              >
                                {info.value}
                              </Typography>
                            </Box>
                          </Stack>
                        </CardContent>
                      </MotionCard>
                    );
                  })}
                </Stack>
              </Stack>
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

          {/* Additional Info */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            sx={{
              p: 4,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <Typography
              variant="h5"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Open Source & Community
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
            >
              This boilerplate is open source and constantly evolving with community contributions. 
              Found a bug? Have a feature request? Check out our GitHub repository or join our 
              community discussions.
            </Typography>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
