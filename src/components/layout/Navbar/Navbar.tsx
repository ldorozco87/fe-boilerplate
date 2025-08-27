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
import { Menu as MenuIcon } from '@mui/icons-material';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AppBar
      position='fixed'
      elevation={4}
      sx={{
        color: 'text.primary',
        borderBottom: `1px solid ${theme.palette.divider}`,
        zIndex: theme.zIndex.appBar,
        backgroundColor: 'background.paper',
      }}
      component='nav'
      aria-label='Main navigation'
    >
      <Container maxWidth='xl'>
        <Toolbar
          sx={{
            minHeight: { xs: 56, md: 64 },
            px: { xs: 1, md: 2 },
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              mr: { xs: 1, md: 3 },
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
            <Typography
              variant='h6'
              component='h1'
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                display: { xs: 'none', sm: 'block' },
                ml: 1,
              }}
            >
              FE Boilerplate
            </Typography>
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
              sx={{ ml: 'auto' }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, ml: { xs: 1, md: 2 } }}>
            <Button
              variant='outlined'
              size='small'
              onClick={() => handleNavigation('/login')}
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
            >
              Login
            </Button>
            <Button
              variant='contained'
              size='small'
              onClick={() => handleNavigation('/signup')}
              sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
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
