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
  alpha,
} from '@mui/material';
import { 
  Language as LanguageIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme as useCustomTheme } from '@/components/providers/ThemeProvider';
import { useScrollSpy } from '@/hooks/useScrollSpy';



export default function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const { mode, toggleTheme } = useCustomTheme();
  const t = useTranslations('Navigation');
  
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = React.useState(false);

  // Add scroll listener to change navbar appearance
  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if we're on the home page for scroll spy
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
  
  // Use scroll spy for home page navigation
  const activeSection = useScrollSpy(
    isHomePage ? ['hero', 'about', 'showcase', 'contact'] : [],
    100
  );

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
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

  const handleSmoothScroll = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    handleMobileMenuClose();
  };

  const navigationItems = isHomePage ? [
    { key: 'home', href: '#hero', label: t('home') },
    { key: 'about', href: '#about', label: t('about') },
    { key: 'showcase', href: '#showcase', label: t('features') },
    { key: 'contact', href: '#contact', label: t('contact') },
    { key: 'ecommerce', href: `/${locale}/ecommerce`, label: t('ecommerce') },
  ] : [
    { key: 'home', href: `/${locale}`, label: t('home') },
    { key: 'ecommerce', href: `/${locale}/ecommerce`, label: t('ecommerce') },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 4 : 0}
      sx={{
        backgroundColor: (theme) => alpha(
          theme.palette.background.paper, 
          scrolled ? 0.95 : 0.8
        ),
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? 0 : 1,
        borderColor: 'divider',
        zIndex: 1300,
        transition: 'all 0.3s ease-in-out',
        boxShadow: scrolled 
          ? (theme) => `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`
          : 'none',
      }}
    >
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

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
              {navigationItems.map((item) => {
                const isActive = isHomePage && item.href.startsWith('#') 
                  ? activeSection === item.href.slice(1)
                  : pathname === item.href;
                
                return (
                  <Button
                    key={item.key}
                    component={item.href.startsWith('#') ? 'button' : Link}
                    href={item.href.startsWith('#') ? undefined : item.href}
                    onClick={item.href.startsWith('#') 
                      ? () => handleSmoothScroll(item.href.slice(1))
                      : undefined
                    }
                    sx={{
                      color: isActive ? 'primary.main' : 'text.primary',
                      textTransform: 'none',
                      fontWeight: isActive ? 600 : 500,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      position: 'relative',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                      '&::after': isActive ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 20,
                        height: 2,
                        backgroundColor: 'primary.main',
                        borderRadius: 1,
                      } : {},
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}

              {/* Theme Toggle */}
              <IconButton
                onClick={toggleTheme}
                sx={{ 
                  color: 'text.primary',
                  ml: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
                aria-label="toggle theme"
              >
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>

              {/* Language Menu */}
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
            </Box>

            {/* Mobile Menu Button */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={toggleTheme}
                sx={{ color: 'text.primary' }}
                aria-label="toggle theme"
              >
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              
              <IconButton
                size="large"
                aria-label="open navigation menu"
                aria-controls="mobile-menu"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* Language Menu */}
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

            {/* Mobile Navigation Menu */}
            <Menu
              id="mobile-menu"
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMobileMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {navigationItems.map((item) => (
                <MenuItem
                  key={item.key}
                  component={item.href.startsWith('#') ? 'button' : Link}
                  href={item.href.startsWith('#') ? undefined : item.href}
                  onClick={item.href.startsWith('#') 
                    ? () => handleSmoothScroll(item.href.slice(1))
                    : handleMobileMenuClose
                  }
                  sx={{
                    color: 'text.primary',
                    fontWeight: 500,
                    py: 1.5,
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
              <MenuItem onClick={handleLanguageMenuOpen}>
                <LanguageIcon sx={{ mr: 1 }} />
                {t('language')}
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
  );
}
