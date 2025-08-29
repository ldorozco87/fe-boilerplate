'use client';

import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
  useTheme,
  alpha,
} from '@/lib/mui';
import {
  CheckCircle as CheckIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Search as SearchIcon,
  BugReport as TestingIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const MotionBox = motion.create(Box);

interface AboutFeatureModalProps {
  feature: 'performance' | 'production' | 'responsive' | 'developer';
}

const featureConfig = {
  performance: {
    icon: SpeedIcon,
    color: '#4caf50',
    gradient: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
  },
  production: {
    icon: SecurityIcon,
    color: '#f44336',
    gradient: 'linear-gradient(135deg, #f44336 0%, #ef5350 100%)',
  },
  responsive: {
    icon: SearchIcon,
    color: '#2196f3',
    gradient: 'linear-gradient(135deg, #2196f3 0%, #42a5f5 100%)',
  },
  developer: {
    icon: TestingIcon,
    color: '#ff9800',
    gradient: 'linear-gradient(135deg, #ff9800 0%, #ffb74d 100%)',
  },
};

export default function AboutFeatureModal({ feature }: AboutFeatureModalProps) {
  const theme = useTheme();
  const t = useTranslations('AboutSection');
  const config = featureConfig[feature];
  const IconComponent = config.icon;

  const getFeatureDetails = () => {
    switch (feature) {
      case 'performance':
        return {
          benefits: [
            'Next.js 15 with App Router for optimal performance',
            'Static Site Generation (SSG) for fast loading',
            'Image optimization with next/image',
            'Code splitting and lazy loading',
            'Optimized bundle size with tree shaking',
            'Server-side rendering capabilities',
          ],
          technologies: [
            'Next.js 15',
            'App Router',
            'SSG',
            'Image Optimization',
            'Code Splitting',
          ],
        };
      case 'production':
        return {
          benefits: [
            'Production-ready configuration',
            'Environment variables management',
            'Error boundaries for robust error handling',
            'SEO optimization with metadata API',
            'Security headers and best practices',
            'Performance monitoring ready',
          ],
          technologies: [
            'Environment Config',
            'Error Boundaries',
            'SEO',
            'Security',
            'Monitoring',
          ],
        };
      case 'responsive':
        return {
          benefits: [
            'Mobile-first responsive design',
            'Material-UI breakpoint system',
            'Flexible grid layouts',
            'Touch-friendly interactions',
            'Cross-browser compatibility',
            'Accessibility compliance',
          ],
          technologies: [
            'Material-UI',
            'Responsive Design',
            'Grid System',
            'Accessibility',
            'Cross-browser',
          ],
        };
      case 'developer':
        return {
          benefits: [
            'TypeScript for type safety',
            'ESLint and Prettier for code quality',
            'Jest testing framework setup',
            'Hot reloading for development',
            'Comprehensive error handling',
            'Developer tools integration',
          ],
          technologies: [
            'TypeScript',
            'ESLint',
            'Prettier',
            'Jest',
            'Hot Reload',
            'DevTools',
          ],
        };
      default:
        return { benefits: [], technologies: [] };
    }
  };

  const { benefits, technologies } = getFeatureDetails();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header with Icon */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          p: 3,
          borderRadius: 2,
          background: `linear-gradient(135deg, ${alpha(config.color, 0.1)} 0%, ${alpha(config.color, 0.05)} 100%)`,
          border: `1px solid ${alpha(config.color, 0.2)}`,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            p: 2,
            borderRadius: '50%',
            background: config.gradient,
            color: 'white',
            mr: 3,
            boxShadow: `0 8px 32px ${alpha(config.color, 0.3)}`,
          }}
        >
          <IconComponent sx={{ fontSize: 32 }} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            component="h3"
            sx={{ fontWeight: 600, mb: 1 }}
          >
            {t(`features.${feature}.title`)}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {t(`features.${feature}.description`)}
          </Typography>
        </Box>
      </Box>

      {/* Benefits List */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Key Benefits
        </Typography>
        <List sx={{ p: 0 }}>
          {benefits.map((benefit) => (
            <ListItem key={benefit} sx={{ px: 0, py: 1 }}>
              <ListItemIcon sx={{ minWidth: 40 }}>
                <CheckIcon sx={{ color: theme.palette.success.main }} />
              </ListItemIcon>
              <ListItemText
                primary={benefit}
                primaryTypographyProps={{
                  variant: 'body1',
                  color: 'text.primary',
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Technologies */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Technologies Used
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {technologies.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              variant="outlined"
              sx={{
                borderColor: alpha(config.color, 0.3),
                color: config.color,
                '&:hover': {
                  backgroundColor: alpha(config.color, 0.1),
                },
              }}
            />
          ))}
        </Stack>
      </Box>
    </MotionBox>
  );
}
