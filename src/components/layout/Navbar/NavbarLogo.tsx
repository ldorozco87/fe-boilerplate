import { Box } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

export function NavbarLogo() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: 36, sm: 40, md: 44 },
        height: { xs: 36, sm: 40, md: 44 },
        borderRadius: '12px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
        '&:hover': {
          transform: 'scale(1.05) rotate(3deg)',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.5)',
        },
      }}
      aria-hidden='true'
    >
      <RocketLaunch
        sx={{
          fontSize: { xs: 20, sm: 22, md: 24 },
          color: 'white',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
        }}
      />
    </Box>
  );
}
