'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Devices as DevicesIcon,
  Code as CodeIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';


const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const features = [
  {
    icon: SpeedIcon,
    title: 'High Performance',
    description: 'Optimized for speed with Next.js 15, static generation, and modern build tools.',
    color: '#4caf50',
  },
  {
    icon: SecurityIcon,
    title: 'Production Ready',
    description: 'Built with TypeScript, ESLint, and best practices for enterprise applications.',
    color: '#f44336',
  },
  {
    icon: DevicesIcon,
    title: 'Responsive Design',
    description: 'Mobile-first approach with Material UI for consistent cross-device experience.',
    color: '#2196f3',
  },
  {
    icon: CodeIcon,
    title: 'Developer Experience',
    description: 'Hot reload, TypeScript support, and comprehensive tooling for productivity.',
    color: '#ff9800',
  },
  {
    icon: LanguageIcon,
    title: 'Internationalization',
    description: 'Multi-language support with next-intl for global applications.',
    color: '#9c27b0',
  },
  {
    icon: PaletteIcon,
    title: 'Modern UI/UX',
    description: 'Beautiful components with Material Design and custom theming system.',
    color: '#00bcd4',
  },
];

export default function AboutSection() {
  const theme = useTheme();

  return (
    <Box
      id="about"
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
              Why Choose This Boilerplate?
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              A comprehensive foundation for modern web applications, combining cutting-edge 
              technologies with battle-tested patterns for rapid development.
            </Typography>
          </MotionBox>

          {/* Features Grid */}
          <Grid container spacing={4}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.title}>
                  <MotionCard
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    sx={{
                      height: '100%',
                      background: `linear-gradient(135deg, ${alpha(feature.color, 0.05)}, ${alpha(feature.color, 0.02)})`,
                      border: `1px solid ${alpha(feature.color, 0.1)}`,
                      borderRadius: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: `1px solid ${alpha(feature.color, 0.3)}`,
                        boxShadow: `0 10px 40px ${alpha(feature.color, 0.2)}`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${feature.color}, ${alpha(feature.color, 0.7)})`,
                          color: 'white',
                          mb: 3,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 32 }} />
                      </Box>
                      
                      <Typography
                        variant="h6"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        {feature.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </Grid>
              );
            })}
          </Grid>

          {/* Tech Stack */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600, mb: 4 }}
            >
              Built With Modern Technologies
            </Typography>
            
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
                mt: 4,
              }}
            >
              {[
                'Next.js 15', 'React 19', 'TypeScript', 'Material UI', 
                'Framer Motion', 'React Hook Form', 'Zod', 'SASS'
              ].map((tech, index) => (
                <MotionBox
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 25,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.2)}, ${alpha(theme.palette.secondary.main, 0.2)})`,
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: theme.palette.primary.main }}
                  >
                    {tech}
                  </Typography>
                </MotionBox>
              ))}
            </Box>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
