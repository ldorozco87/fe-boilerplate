import { Box, Button } from '@mui/material';
import { NAVIGATION_ITEMS } from '@/constants/navigation';

interface NavbarMenuProps {
  onNavigate: (path: string) => void;
}

export function NavbarMenu({ onNavigate }: NavbarMenuProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component='nav'
      sx={{
        display: 'flex',
        gap: 0.5,
        alignItems: 'center',
      }}
      aria-label='Main navigation menu'
    >
      {NAVIGATION_ITEMS.map(item => {
        const Icon = item.icon;

        // Special handling for home - scroll to top
        if (item.path === '/') {
          return (
            <Button
              key={item.path}
              variant='text'
              color='inherit'
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              startIcon={<Icon sx={{ fontSize: { xs: 18, md: 20 } }} />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: { xs: 1.5, md: 2.5 },
                py: { xs: 1, md: 1.25 },
                borderRadius: 1.5,
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                color: 'text.primary',
                transition: 'all 0.2s ease',
                minHeight: 'auto',
                lineHeight: 1.2,
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                  transform: 'translateY(-1px)',
                },
              }}
              aria-label={`Scroll to ${item.label} section`}
            >
              {item.label}
            </Button>
          );
        }

        // For features, about, and get-started, use smooth scroll
        if (
          item.path === '/features' ||
          item.path === '/about' ||
          item.path === '/get-started'
        ) {
          const sectionId = item.path.slice(1);
          return (
            <Button
              key={item.path}
              variant='text'
              color='inherit'
              onClick={() => scrollToSection(sectionId)}
              startIcon={<Icon sx={{ fontSize: { xs: 18, md: 20 } }} />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                px: { xs: 1.5, md: 2.5 },
                py: { xs: 1, md: 1.25 },
                borderRadius: 1.5,
                fontSize: { xs: '0.8rem', md: '0.9rem' },
                color: 'text.primary',
                transition: 'all 0.2s ease',
                minHeight: 'auto',
                lineHeight: 1.2,
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'white',
                  transform: 'translateY(-1px)',
                },
              }}
              aria-label={`Scroll to ${item.label} section`}
            >
              {item.label}
            </Button>
          );
        }

        // For other items (login, signup), use normal navigation
        return (
          <Button
            key={item.path}
            variant='text'
            color='inherit'
            onClick={() => onNavigate(item.path)}
            startIcon={<Icon sx={{ fontSize: { xs: 18, md: 20 } }} />}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              px: { xs: 1.5, md: 2.5 },
              py: { xs: 1, md: 1.25 },
              borderRadius: 1.5,
              fontSize: { xs: '0.8rem', md: '0.9rem' },
              color: 'text.primary',
              transition: 'all 0.2s ease',
              minHeight: 'auto',
              lineHeight: 1.2,
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white',
                transform: 'translateY(-1px)',
              },
            }}
            aria-label={`Navigate to ${item.label} page`}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );
}
