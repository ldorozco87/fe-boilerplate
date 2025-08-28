'use client';

import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,

  Button,
  Stack,
  useTheme,
  alpha,
  Chip,
} from '@mui/material';
import {
  ArrowForward as ArrowForwardIcon,
  ShoppingCart as ShoppingCartIcon,
  ContactMail as ContactMailIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Link from 'next/link';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const showcaseItems = [
  {
    title: 'E-commerce Platform',
    description: 'Complete shopping experience with cart, checkout, and product management. Demonstrates state management and complex UI patterns.',
    image: '/api/placeholder/600/400',
    link: '/ecommerce',
    icon: ShoppingCartIcon,
    tags: ['React Query', 'Local Storage', 'Forms', 'State Management'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    title: 'Contact System',
    description: 'Professional contact form with validation, internationalization, and beautiful animations. Perfect for business websites.',
    image: '/api/placeholder/600/400',
    link: '#contact',
    icon: ContactMailIcon,
    tags: ['React Hook Form', 'Zod Validation', 'Animations', 'i18n'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    title: 'Multi-language Support',
    description: 'Seamless internationalization with next-intl. Switch between languages with persistent user preferences.',
    image: '/api/placeholder/600/400',
    link: '#',
    icon: LanguageIcon,
    tags: ['next-intl', 'SSR', 'Dynamic Routes', 'Localization'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    title: 'Theme System',
    description: 'Advanced theming with light/dark mode, custom colors, and Material UI customization. Fully responsive design system.',
    image: '/api/placeholder/600/400',
    link: '#',
    icon: PaletteIcon,
    tags: ['Material UI', 'Dark Mode', 'Responsive', 'Custom Themes'],
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
];

export default function ShowcaseSection() {
  const theme = useTheme();
  const locale = useLocale();

  return (
    <Box
      id="showcase"
      sx={{
        py: { xs: 8, md: 12 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
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
              Live Examples & Features
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
            >
              Explore real-world implementations and see how this boilerplate handles 
              complex scenarios with elegant solutions.
            </Typography>
          </MotionBox>

          {/* Showcase Grid */}
          <Grid container spacing={4}>
            {showcaseItems.map((item, index) => {
              const IconComponent = item.icon;
              const isExternal = item.link.startsWith('http');
              const href = item.link.startsWith('/') && !item.link.startsWith('/#') 
                ? `/${locale}${item.link}` 
                : item.link;

              return (
                <Grid size={{ xs: 12, md: 6 }} key={item.title}>
                  <MotionCard
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    sx={{
                      height: '100%',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[20],
                      },
                    }}
                  >
                    {/* Card Header with Gradient */}
                    <Box
                      sx={{
                        height: 200,
                        background: item.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <MotionBox
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        sx={{
                          color: 'white',
                          opacity: 0.9,
                        }}
                      >
                        <IconComponent sx={{ fontSize: 80 }} />
                      </MotionBox>
                      
                      {/* Decorative circles */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -50,
                          right: -50,
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          background: alpha('#ffffff', 0.1),
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: -30,
                          left: -30,
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: alpha('#ffffff', 0.1),
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="h5"
                        component="h3"
                        gutterBottom
                        sx={{ fontWeight: 600, mb: 2 }}
                      >
                        {item.title}
                      </Typography>
                      
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3, lineHeight: 1.6, flexGrow: 1 }}
                      >
                        {item.description}
                      </Typography>

                      {/* Tags */}
                      <Box sx={{ mb: 3 }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {item.tags.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontWeight: 500,
                                fontSize: '0.75rem',
                              }}
                            />
                          ))}
                        </Stack>
                      </Box>

                      {/* Action Button */}
                      <Button
                        variant="contained"
                        component={item.link.startsWith('#') ? 'a' : Link}
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          alignSelf: 'flex-start',
                          px: 3,
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontWeight: 600,
                          background: item.gradient,
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {item.link.startsWith('#') ? 'Try It' : 'Explore'}
                      </Button>
                    </CardContent>
                  </MotionCard>
                </Grid>
              );
            })}
          </Grid>

          {/* Call to Action */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            textAlign="center"
            sx={{
              p: 6,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Ready to Build Something Amazing?
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
            >
              This boilerplate provides everything you need to start building modern, 
              scalable web applications with confidence.
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
                },
                transition: 'all 0.3s ease',
              }}
            >
              Start Building
            </Button>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}
