'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Menu as MenuIcon, GitHub } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useNavbarStore } from '@/stores/navbarStore';
import { NavbarLogo } from './NavbarLogo';
import { NavbarMenu } from './NavbarMenu';
import { NavbarDrawer } from './NavbarDrawer';

export function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  const { isDrawerOpen, openDrawer, closeDrawer } = useNavbarStore();

  const handleNavigation = (path: string) => {
    router.push(path);
    if (isMobile) {
      closeDrawer();
    }
  };

  const handleLogoClick = () => {
    const heroElement = document.getElementById('hero');
    if (heroElement) {
      heroElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar
      position='fixed'
      elevation={0}
      sx={{
        color: 'text.primary',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        zIndex: theme.zIndex.appBar,
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'rgba(255, 255, 255, 0.98)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
      component='nav'
      aria-label='Main navigation'
    >
      <Container maxWidth='xl'>
        <Toolbar
          sx={{
            minHeight: { xs: 56, md: 64 },
            px: { xs: 1.5, md: 2 },
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              mr: { xs: 1.5, md: 3 },
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
            onClick={handleLogoClick}
            role='button'
            tabIndex={0}
            aria-label='Go to homepage'
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleLogoClick();
              }
            }}
          >
            <NavbarLogo />
            <Box sx={{ ml: 1.5, display: { xs: 'none', sm: 'block' } }}>
              <Typography
                variant='h6'
                component='h1'
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.2,
                }}
              >
                Modern Web
              </Typography>
              <Typography
                variant='caption'
                sx={{
                  fontWeight: 600,
                  color: 'text.secondary',
                  fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  lineHeight: 1.2,
                }}
              >
                Boilerplate
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1 }}>
              <NavbarMenu onNavigate={handleNavigation} />
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton
              edge='end'
              color='inherit'
              aria-label='Open navigation menu'
              aria-expanded={isDrawerOpen}
              aria-controls='navigation-drawer'
              onClick={openDrawer}
              sx={{ 
                ml: 'auto',
                color: 'primary.main',
                p: 1,
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                },
              }}
            >
              <MenuIcon sx={{ fontSize: { xs: 20, sm: 22 } }} />
            </IconButton>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1.5, ml: { xs: 1.5, md: 2 } }}>
            <Button
              variant='outlined'
              size='small'
              onClick={() => handleNavigation('/login')}
              sx={{ 
                display: { xs: 'none', sm: 'inline-flex' },
                borderRadius: 1.5,
                px: { xs: 2, md: 2.5 },
                py: { xs: 0.75, md: 1 },
                fontWeight: 600,
                fontSize: { xs: '0.8rem', md: '0.875rem' },
                borderColor: 'primary.main',
                color: 'primary.main',
                minHeight: 'auto',
                lineHeight: 1.2,
                '&:hover': {
                  borderColor: 'primary.dark',
                  backgroundColor: 'primary.light',
                  color: 'white',
                },
              }}
            >
              Login
            </Button>
            <Button
              variant='contained'
              size='small'
              onClick={() => handleNavigation('/signup')}
              startIcon={<GitHub sx={{ fontSize: { xs: 16, md: 18 } }} />}
              sx={{ 
                display: { xs: 'none', sm: 'inline-flex' },
                borderRadius: 1.5,
                px: { xs: 2, md: 2.5 },
                py: { xs: 0.75, md: 1 },
                fontWeight: 600,
                fontSize: { xs: '0.8rem', md: '0.875rem' },
                minHeight: 'auto',
                lineHeight: 1.2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.5)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Navigation Drawer */}
      <NavbarDrawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        onNavigate={handleNavigation}
      />
    </AppBar>
  );
}
