'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  BugReport as TestingIcon,
  Search as SearchIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

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
    },
    {
      title: t('features.zustand.title'),
      description: t('features.zustand.description'),
      link: `/${locale}/zustand-demo`,
      icon: StorageIcon,
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    },
    {
      title: t('features.seo.title'),
      description: t('features.seo.description'),
      link: '#',
      icon: SearchIcon,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      title: t('features.multilang.title'),
      description: t('features.multilang.description'),
      link: '#',
      icon: LanguageIcon,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
  ];

  return (
    <Box
      id="showcase"
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.03)} 0%, ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
      }}
    >
      <Container maxWidth="lg" sx={{ width: '100%' }}>
        <Stack spacing={6} alignItems="center" textAlign="center">
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
                mb: 3,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              {t('title')}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 300,
              }}
            >
              {t('subtitle')}
            </Typography>
          </MotionBox>

          {/* Showcase Grid */}
          <Box sx={{ maxWidth: 1000, width: '100%' }}>
            <Grid container spacing={4} justifyContent="center">
              {showcaseItems.map((item, index) => {
                const IconComponent = item.icon;
                const isExternal = item.link.startsWith('http');
                const href =
                  item.link.startsWith('/') && !item.link.startsWith('/#')
                    ? `/${locale}${item.link}`
                    : item.link;

                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
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
                        p: 4,
                        borderRadius: 4,
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
                          p: 2.5,
                          borderRadius: '50%',
                          background: item.gradient,
                          color: 'white',
                          mb: 3,
                          boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.2)}`,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 36 }} />
                      </MotionBox>

                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        {item.title}
                      </Typography>

                      <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 4, lineHeight: 1.6 }}
                      >
                        {item.description}
                      </Typography>

                      {/* Action Button */}
                      <Button
                        variant="outlined"
                        component={item.link.startsWith('#') ? 'a' : Link}
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          px: 3,
                          py: 1.5,
                          borderRadius: 3,
                          textTransform: 'none',
                          fontWeight: 600,
                          borderColor: alpha(theme.palette.primary.main, 0.3),
                          color: theme.palette.primary.main,
                          '&:hover': {
                            background: item.gradient,
                            color: 'white',
                            borderColor: 'transparent',
                            transform: 'translateY(-2px)',
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {item.link.startsWith('#') ? t('tryIt') : t('explore')}
                      </Button>
                    </MotionBox>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Call to Action */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, fontWeight: 400 }}
            >
              {t('readyToBuild')}
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="https://github.com/nextjs-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<ArrowForwardIcon />}
              sx={{
                px: 4,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.3)}`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              {t('startBuilding')}
            </Button>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
