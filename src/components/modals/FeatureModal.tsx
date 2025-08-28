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
  Language as LanguageIcon,
  BugReport as TestingIcon,
  Search as SearchIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const MotionBox = motion.create(Box);

interface FeatureModalProps {
  feature: 'testing' | 'zustand' | 'seo' | 'multilang';
}

const featureConfig = {
  testing: {
    icon: TestingIcon,
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#667eea',
  },
  zustand: {
    icon: StorageIcon,
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    color: '#ff9a9e',
  },
  seo: {
    icon: SearchIcon,
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f093fb',
  },
  multilang: {
    icon: LanguageIcon,
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#4facfe',
  },
};

export default function FeatureModal({ feature }: FeatureModalProps) {
  const theme = useTheme();
  const t = useTranslations('ShowcaseSection');
  const config = featureConfig[feature];
  const IconComponent = config.icon;

  const getFeatureDetails = () => {
    switch (feature) {
      case 'testing':
        return {
          benefits: [
            'Jest configuration with TypeScript support',
            'React Testing Library integration',
            'Component testing utilities',
            'Mock and spy utilities',
            'Coverage reporting setup',
            'E2E testing ready',
          ],
          technologies: [
            'Jest',
            'React Testing Library',
            'TypeScript',
            'Coverage',
          ],
        };
      case 'zustand':
        return {
          benefits: [
            'Lightweight state management',
            'TypeScript-first approach',
            'DevTools integration',
            'Persistent state options',
            'Middleware support',
            'Zero boilerplate',
          ],
          technologies: ['Zustand', 'TypeScript', 'DevTools', 'Persistence'],
        };
      case 'seo':
        return {
          benefits: [
            'Next.js App Router optimization',
            'Dynamic metadata generation',
            'Structured data (JSON-LD)',
            'Open Graph tags',
            'Twitter Cards',
            'Sitemap generation',
          ],
          technologies: ['Next.js', 'Metadata API', 'JSON-LD', 'Open Graph'],
        };
      case 'multilang':
        return {
          benefits: [
            'next-intl integration',
            'Dynamic language switching',
            'Route-based localization',
            'Type-safe translations',
            'Pluralization support',
            'RTL language support',
          ],
          technologies: ['next-intl', 'i18n', 'TypeScript', 'RTL'],
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
          {benefits.map((benefit, index) => (
            <ListItem key={index} sx={{ px: 0, py: 1 }}>
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
