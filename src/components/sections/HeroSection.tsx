'use client';

import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  Code as CodeIcon,
  Rocket as RocketIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';

const MotionBox = motion.create(Box);

export default function HeroSection() {
  const theme = useTheme();
  const t = useTranslations('HomePage');
  const locale = useLocale();

  return (
    <Box
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, ${alpha(theme.palette.primary.main, 0.05)} 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, ${alpha(theme.palette.secondary.main, 0.05)} 0%, transparent 50%)`,
          zIndex: 0,
        }}
      />

      {/* Floating Elements */}
      <MotionBox
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          color: theme.palette.primary.main,
          opacity: 0.3,
          zIndex: 1,
        }}
      >
        <CodeIcon sx={{ fontSize: 80 }} />
      </MotionBox>

      <MotionBox
        animate={{
          y: [20, -20, 20],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          color: theme.palette.secondary.main,
          opacity: 0.3,
          zIndex: 1,
        }}
      >
        <RocketIcon sx={{ fontSize: 60 }} />
      </MotionBox>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack
          spacing={4}
          alignItems="center"
          textAlign="center"
          sx={{ py: 8 }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 800,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                lineHeight: 1.1,
              }}
            >
              {t('title')}
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography
              variant="h5"
              component="h2"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                lineHeight: 1.4,
                mb: 2,
              }}
            >
              {t('subtitle')}
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: 600,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                mb: 4,
              }}
            >
              {t('description')}
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={3}
              justifyContent="center"
            >
              <Button
                variant="contained"
                size="large"
                component={Link}
                href={`/${locale}/ecommerce`}
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
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {t('exploreEcommerce')}
              </Button>

              <Button
                variant="contained"
                size="large"
                component={Link}
                href={`/${locale}/zustand-demo`}
                endIcon={<ArrowForwardIcon />}
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {t('exploreZustand')}
              </Button>

              <Button
                variant="outlined"
                size="large"
                component={Link}
                href="#contact"
                sx={{
                  px: 4,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {t('getStarted')}
              </Button>
            </Stack>
          </MotionBox>

          {/* Scroll indicator */}
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            sx={{
              position: 'absolute',
              bottom: 30,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <MotionBox
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              sx={{
                width: 2,
                height: 40,
                background: `linear-gradient(to bottom, ${theme.palette.primary.main}, transparent)`,
                borderRadius: 1,
              }}
            />
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
