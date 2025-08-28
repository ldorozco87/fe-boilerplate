'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Stack,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Language as WebsiteIcon,
} from '@mui/icons-material';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      href: siteConfig.links.github,
      icon: GitHubIcon,
    },
    {
      name: 'Twitter',
      href: siteConfig.links.twitter,
      icon: TwitterIcon,
    },
    {
      name: 'Docs',
      href: siteConfig.links.docs,
      icon: WebsiteIcon,
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={3}
        >
          <Box textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography
              variant="h6"
              gutterBottom
              fontWeight={700}
              color="primary.main"
            >
              {siteConfig.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {t('builtWith')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('copyright', { year: currentYear })}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <IconButton
                  key={link.name}
                  component={Link}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                >
                  <IconComponent />
                </IconButton>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
