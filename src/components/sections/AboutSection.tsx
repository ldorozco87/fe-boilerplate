'use client';

import React, { useState } from 'react';
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
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Search as SearchIcon,
  BugReport as TestingIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Modal from '@/components/ui/Modal';
import AboutFeatureModal from '@/components/modals/AboutFeatureModal';

const MotionBox = motion.create(Box);

export default function AboutSection() {
  const theme = useTheme();
  const t = useTranslations('AboutSection');
  const [openModal, setOpenModal] = useState<
    'performance' | 'production' | 'responsive' | 'developer' | null
  >(null);

  const handleOpenModal = (
    feature: 'performance' | 'production' | 'responsive' | 'developer'
  ) => {
    setOpenModal(feature);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const coreFeatures: Array<{
    icon: React.ComponentType<{ sx?: object }>;
    title: string;
    description: string;
    color: string;
    key: 'performance' | 'production' | 'responsive' | 'developer';
  }> = [
    {
      icon: SpeedIcon,
      title: t('features.performance.title'),
      description: t('features.performance.description'),
      color: '#4caf50',
      key: 'performance',
    },
    {
      icon: SecurityIcon,
      title: t('features.production.title'),
      description: t('features.production.description'),
      color: '#f44336',
      key: 'production',
    },
    {
      icon: SearchIcon,
      title: t('features.responsive.title'),
      description: t('features.responsive.description'),
      color: '#2196f3',
      key: 'responsive',
    },
    {
      icon: TestingIcon,
      title: t('features.developer.title'),
      description: t('features.developer.description'),
      color: '#ff9800',
      key: 'developer',
    },
  ];

  return (
    <Box
      id="about"
      sx={{
        // Mobile: altura automática para evitar solapamiento
        minHeight: { xs: 'auto', md: '100vh' },
        height: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 0 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.03)} 0%, ${alpha(theme.palette.secondary.main, 0.03)} 100%)`,
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Stack
          spacing={{ xs: 4, md: 3, lg: 6 }}
          alignItems="center"
          textAlign="center"
          sx={{ height: '100%', justifyContent: 'center' }}
        >
          {/* Header */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: { xs: 3, md: 2, lg: 3 },
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '2.8rem', lg: '3.5rem' },
              }}
            >
              {t('title')}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: { xs: 700, md: 600, lg: 700 },
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 300,
                fontSize: { xs: '1.25rem', md: '1.1rem', lg: '1.25rem' },
              }}
            >
              {t('subtitle')}
            </Typography>
          </MotionBox>

          {/* Core Features Grid - More Condensed */}
          <Box
            sx={{ maxWidth: { xs: 1000, md: 800, lg: 1000 }, width: '100%' }}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 1.5, lg: 2 }}
              justifyContent="center"
            >
              {coreFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.title}>
                    <MotionBox
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                      onClick={() => handleOpenModal(feature.key)}
                      sx={{
                        p: { xs: 2.5, md: 2, lg: 2.5 },
                        borderRadius: 2,
                        background: `linear-gradient(135deg, ${alpha(feature.color, 0.06)}, ${alpha(feature.color, 0.02)})`,
                        border: `1px solid ${alpha(feature.color, 0.12)}`,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '&:hover': {
                          border: `1px solid ${alpha(feature.color, 0.3)}`,
                          boxShadow: `0 4px 20px ${alpha(feature.color, 0.15)}`,
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: { xs: 1, md: 0.8, lg: 1 },
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${feature.color}, ${alpha(feature.color, 0.8)})`,
                          color: 'white',
                          mb: { xs: 1.5, md: 1, lg: 1.5 },
                        }}
                      >
                        <IconComponent
                          sx={{ fontSize: { xs: 24, md: 20, lg: 24 } }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          mb: { xs: 1, md: 0.5, lg: 1 },
                          fontSize: { xs: '1.1rem', md: '1rem', lg: '1.1rem' },
                          lineHeight: 1.3,
                        }}
                      >
                        {feature.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.4,
                          fontSize: {
                            xs: '0.875rem',
                            md: '0.8rem',
                            lg: '0.875rem',
                          },
                          flexGrow: 1,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </MotionBox>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Tech Stack Pills */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: { xs: 3, md: 2, lg: 3 },
                fontWeight: 500,
                fontSize: { xs: '1rem', md: '0.9rem', lg: '1rem' },
              }}
            >
              {t('builtWithTech')}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 1.5,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              {[
                'Next.js 15',
                'React 19',
                'TypeScript',
                'Material UI',
                'Framer Motion',
              ].map((tech, index) => (
                <MotionBox
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  sx={{
                    px: 2.5,
                    py: 1,
                    borderRadius: 20,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.15)}, ${alpha(theme.palette.secondary.main, 0.15)})`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      fontSize: '0.875rem',
                    }}
                  >
                    {tech}
                  </Typography>
                </MotionBox>
              ))}
            </Box>
          </MotionBox>
        </Stack>
      </Container>

      {/* Feature Modal */}
      <Modal
        open={openModal !== null}
        onClose={handleCloseModal}
        title={openModal || ''}
        maxWidth="md"
      >
        {openModal && <AboutFeatureModal feature={openModal} />}
      </Modal>
    </Box>
  );
}
