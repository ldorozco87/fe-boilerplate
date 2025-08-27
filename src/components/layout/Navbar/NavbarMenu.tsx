import { Box, Button } from '@mui/material';
import { NAVIGATION_ITEMS } from '@/constants/navigation';

interface NavbarMenuProps {
  onNavigate: (path: string) => void;
}

export function NavbarMenu({ onNavigate }: NavbarMenuProps) {
  return (
    <Box
      component='nav'
      sx={{
        display: 'flex',
        gap: 1,
        alignItems: 'center',
      }}
      aria-label='Main navigation menu'
    >
      {NAVIGATION_ITEMS.map(item => {
        const Icon = item.icon;
        return (
          <Button
            key={item.path}
            variant='text'
            color='inherit'
            onClick={() => onNavigate(item.path)}
            startIcon={<Icon />}
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              px: 2,
              py: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
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
