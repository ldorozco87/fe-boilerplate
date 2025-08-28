'use client';

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] === locale) {
      segments.shift();
    }
    const newPath = `/${newLocale}/${segments.join('/')}`;
    
    // Use window.location for full page reload to ensure proper locale context
    window.location.href = newPath;
    handleLanguageMenuClose();
  };

  const navigationItems = [
    { key: 'home', href: `/${locale}` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ px: { xs: 0 } }}>
          <Typography
            variant="h6"
            component={Link}
            href={`/${locale}`}
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
              },
            }}
          >
            Next.js Boilerplate
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {navigationItems.map((item) => (
              <Button
                key={item.key}
                component={Link}
                href={item.href}
                sx={{
                  color: 'text.primary',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                {t(item.key as 'home' | 'contact')}
              </Button>
            ))}

            <IconButton
              size="large"
              aria-label="change language"
              aria-controls="language-menu"
              aria-haspopup="true"
              onClick={handleLanguageMenuOpen}
              sx={{ color: 'text.primary' }}
            >
              <LanguageIcon />
            </IconButton>
            <Menu
              id="language-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleLanguageMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem
                onClick={() => handleLanguageChange('en')}
                selected={locale === 'en'}
              >
                English
              </MenuItem>
              <MenuItem
                onClick={() => handleLanguageChange('es')}
                selected={locale === 'es'}
              >
                Español
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
