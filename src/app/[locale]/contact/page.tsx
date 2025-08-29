import { Container, Typography, Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactForm from '@/components/forms/ContactForm';
import AnimatedBox from '@/components/ui/AnimatedBox';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default function ContactPage() {
  const t = useTranslations('ContactPage');

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <AnimatedBox>
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 3,
            }}
          >
            {t('title')}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            {t('subtitle')}
          </Typography>
        </Box>
      </AnimatedBox>

      <AnimatedBox delay={0.2}>
        <ContactForm />
      </AnimatedBox>
    </Container>
  );
}
