'use client';

import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import {
  Rocket as RocketIcon,
  Speed as SpeedIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import AnimatedBox from '@/components/ui/AnimatedBox';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const locale = useLocale();

  const features = [
    {
      icon: RocketIcon,
      title: t('features.nextjs.title'),
      description: t('features.nextjs.description'),
    },
    {
      icon: SpeedIcon,
      title: t('features.performance.title'),
      description: t('features.performance.description'),
    },
    {
      icon: LanguageIcon,
      title: t('features.i18n.title'),
      description: t('features.i18n.description'),
    },
    {
      icon: PaletteIcon,
      title: t('features.ui.title'),
      description: t('features.ui.description'),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <AnimatedBox>
        <Box textAlign="center" sx={{ mb: 8 }}>
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
            }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            color="text.secondary"
            gutterBottom
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            {t('subtitle')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}
          >
            {t('description')}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              component={Link}
              href={`/${locale}/contact`}
              sx={{
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              {t('getStarted')}
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="https://github.com/nextjs-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              {t('viewGithub')}
            </Button>
          </Stack>
        </Box>
      </AnimatedBox>

      {/* Features Section */}
      <AnimatedBox delay={0.2}>
        <Typography
          variant="h3"
          component="h2"
          textAlign="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          {t('featuresTitle')}
        </Typography>
      </AnimatedBox>

      <Grid container spacing={4}>
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={feature.title}>
              <AnimatedBox delay={0.1 * (index + 3)}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: 'primary.main',
                        color: 'white',
                        mb: 2,
                      }}
                    >
                      <IconComponent fontSize="large" />
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </AnimatedBox>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}