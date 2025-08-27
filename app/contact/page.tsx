'use client';

import { Box, Container, Typography, Paper } from '@mui/material';
import { ContactSupport as ContactIcon } from '@mui/icons-material';

export default function ContactPage() {
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
          <ContactIcon
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
            Contact
          </Typography>
          <Typography
            variant='h5'
            color='text.secondary'
            sx={{ maxWidth: 600, mx: 'auto' }}
          >
            This is a dummy Contact page for demonstration purposes.
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
          }}
        >
          This page demonstrates that the navigation in our navbar is working
          correctly. You can navigate between different pages using the navbar
          menu.
        </Typography>
      </Paper>
    </Container>
  );
}
