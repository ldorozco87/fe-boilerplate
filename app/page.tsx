'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import {
  RocketLaunch,
  Code,
  Palette,
  Router,
  TypeSpecimen,
} from '@mui/icons-material';

export default function Home() {
  return (
    <Box
      component='section'
      sx={{
        minHeight: 'calc(100vh - 64px)', // Account for navbar height
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        mt: { xs: 0, md: 0 }, // No margin top needed with navbar
      }}
    >
      <Container maxWidth='md'>
        <Card
          elevation={8}
          sx={{
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <Stack spacing={4} alignItems='center'>
              {/* Header */}
              <Box>
                <RocketLaunch
                  sx={{
                    fontSize: 60,
                    color: 'primary.main',
                    mb: 2,
                  }}
                />
                <Typography
                  variant='h2'
                  component='h1'
                  color='primary.main'
                  gutterBottom
                  sx={{ fontWeight: 'bold' }}
                >
                  FE Boilerplate
                </Typography>
                <Typography
                  variant='h5'
                  color='text.secondary'
                  sx={{ maxWidth: 600, mx: 'auto' }}
                >
                  Next.js + TypeScript + Material-UI boilerplate ready to go!
                </Typography>
              </Box>

              {/* Features Grid */}
              <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Code sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                    <Typography variant='body2' color='text.secondary'>
                      Next.js 14 configured
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <TypeSpecimen
                      sx={{ fontSize: 40, color: 'primary.main', mb: 1 }}
                    />
                    <Typography variant='body2' color='text.secondary'>
                      TypeScript ready
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Router
                      sx={{ fontSize: 40, color: 'primary.main', mb: 1 }}
                    />
                    <Typography variant='body2' color='text.secondary'>
                      App Router enabled
                    </Typography>
                  </Box>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Palette
                      sx={{ fontSize: 40, color: 'primary.main', mb: 1 }}
                    />
                    <Typography variant='body2' color='text.secondary'>
                      Material-UI included
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Action Buttons */}
              <Stack direction='row' spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant='contained'
                  size='large'
                  href='https://nextjs.org/docs'
                  target='_blank'
                >
                  Next.js Docs
                </Button>
                <Button
                  variant='outlined'
                  size='large'
                  href='https://mui.com/material-ui/getting-started/'
                  target='_blank'
                >
                  MUI Docs
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
