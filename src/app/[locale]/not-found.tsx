import { Typography, Button, Container } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        py: 8,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '4rem', md: '6rem' },
          fontWeight: 800,
          color: 'primary.main',
          mb: 2,
        }}
      >
        404
      </Typography>

      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontSize: { xs: '1.5rem', md: '2rem' },
          fontWeight: 600,
          mb: 2,
        }}
      >
        {locale === 'es' ? 'Página no encontrada' : 'Page Not Found'}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: 500 }}
      >
        {locale === 'es'
          ? 'Lo sentimos, la página que buscas no existe o ha sido movida.'
          : 'Sorry, the page you are looking for does not exist or has been moved.'}
      </Typography>

      <Button
        variant="contained"
        size="large"
        component={Link}
        href={`/${locale}`}
        startIcon={<HomeIcon />}
        sx={{
          px: 4,
          py: 1.5,
          fontSize: '1.1rem',
          borderRadius: 3,
        }}
      >
        {locale === 'es' ? 'Volver al inicio' : 'Back to Home'}
      </Button>
    </Container>
  );
}
