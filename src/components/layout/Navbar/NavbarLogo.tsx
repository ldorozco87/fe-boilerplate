import { Box } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

export function NavbarLogo() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
        backgroundColor: 'primary.main',
        color: 'white',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'primary.dark',
          transform: 'scale(1.05)',
        },
      }}
      aria-hidden='true'
    >
      <RocketLaunch
        sx={{
          fontSize: 24,
          color: 'white',
        }}
      />
    </Box>
  );
}
