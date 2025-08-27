import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import {
  Login as LoginIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Container maxWidth='lg' sx={{ py: 8 }}>
      <Paper
        elevation={2}
        sx={{
          p: 6,
          textAlign: 'center',
          borderRadius: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Box sx={{ mb: 4 }}>
          <LoginIcon
            sx={{
              fontSize: 80,
              color: 'primary.main',
              mb: 3,
            }}
          />
          <Typography
            variant='h1'
            component='h1'
            color='primary.main'
            gutterBottom
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Login
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            This is a dummy Login page for demonstration purposes.
          </Typography>
        </Box>

        <Typography
          variant='body1'
          color='text.secondary'
          sx={{
            maxWidth: 800,
            mx: 'auto',
            lineHeight: 1.8,
            fontSize: '1.1rem',
            mb: 4,
          }}
        >
          This page demonstrates that the action buttons in our navbar are
          working correctly. You can navigate between different pages using the
          navbar.
        </Typography>

        <Stack direction='row' spacing={2} justifyContent='center'>
          <Button
            component={Link}
            href='/'
            variant='outlined'
            startIcon={<ArrowBackIcon />}
            size='large'
          >
            Back to Home
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
