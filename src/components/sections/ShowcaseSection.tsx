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
  BugReport as TestingIcon,
  Search as SearchIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

const MotionBox = motion.create(Box);

export default function ShowcaseSection() {
  const theme = useTheme();
  const locale = useLocale();
  const t = useTranslations('ShowcaseSection');

  const showcaseItems = [
    {
      title: t('features.testing.title'),
      description: t('features.testing.description'),
      link: '#',
      icon: TestingIcon,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      feature: 'testing' as const,
    },
    {
      title: t('features.zustand.title'),
      description: t('features.zustand.description'),
      link: `/${locale}/zustand-demo`,
      icon: StorageIcon,
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      feature: 'zustand' as const,
    },
    {
      title: t('features.seo.title'),
      description: t('features.seo.description'),
      link: '#',
      icon: SearchIcon,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      feature: 'seo' as const,
    },
    {
      title: t('features.multilang.title'),
      description: t('features.multilang.description'),
      link: '#',
      icon: LanguageIcon,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      feature: 'multilang' as const,
    },
  ];

  return (
    <Box
      id="showcase"
      sx={{
        // Mobile: altura automática para evitar solapamiento
        minHeight: { xs: 'auto', md: '100vh' },
        height: { xs: 'auto', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 0 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.03)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
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

          {/* Showcase Grid */}
          <Box
            sx={{ maxWidth: { xs: 1200, md: 1000, lg: 1200 }, width: '100%' }}
          >
            <Grid
              container
              spacing={{ xs: 3, md: 2, lg: 4 }}
              justifyContent="center"
            >
              {showcaseItems.map((item, index) => {
                const IconComponent = item.icon;

                return (
                  <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={item.title}>
                    <MotionBox
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      whileHover={{
                        y: -12,
                        transition: { duration: 0.3 },
                      }}
                      sx={{
                        p: { xs: 4, md: 3, lg: 4 },
                        borderRadius: { xs: 4, md: 3, lg: 4 },
                        background: `linear-gradient(135deg, ${alpha('#ffffff', 0.8)} 0%, ${alpha('#ffffff', 0.4)} 100%)`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.4s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                          boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.15)}`,
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 4,
                          background: item.gradient,
                          borderRadius: '4px 4px 0 0',
                        },
                      }}
                    >
                      {/* Icon */}
                      <MotionBox
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        sx={{
                          display: 'inline-flex',
                          p: { xs: 2.5, md: 2, lg: 2.5 },
                          borderRadius: '50%',
                          background: item.gradient,
                          color: 'white',
                          mb: { xs: 3, md: 2, lg: 3 },
                          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}
                      >
                        <IconComponent
                          sx={{ fontSize: { xs: 36, md: 28, lg: 36 } }}
                        />
                      </MotionBox>

                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          mb: { xs: 2, md: 1.5, lg: 2 },
                          fontSize: {
                            xs: '1.5rem',
                            md: '1.3rem',
                            lg: '1.5rem',
                          },
                        }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{
                          mb: { xs: 4, md: 3, lg: 4 },
                          lineHeight: 1.6,
                          fontSize: { xs: '1rem', md: '0.9rem', lg: '1rem' },
                        }}
                      >
                        {item.description}
                      </Typography>
                    </MotionBox>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
