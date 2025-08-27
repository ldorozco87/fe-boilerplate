'use client';

import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Stack,
  Card,
  CardContent,
  Chip,
  Divider,
} from '@mui/material';
import {
  RocketLaunch,
  Code,
  Palette,
  TypeSpecimen,
  Speed,
  Security,
  Devices,
  GitHub,
  Launch,
  CheckCircle,
  Star,
} from '@mui/icons-material';
import { useRef } from 'react';

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const getStartedRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Code sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Next.js 15',
      description: 'App Router, Server Components, and latest features',
      color: '#0070f3',
    },
    {
      icon: <TypeSpecimen sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'TypeScript 5',
      description: 'Full type safety and better developer experience',
      color: '#3178c6',
    },
    {
      icon: <Palette sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Material-UI 7',
      description: 'Beautiful, accessible components out of the box',
      color: '#0081cb',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Performance',
      description: 'Optimized for speed and SEO',
      color: '#00c853',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Security',
      description: 'Built-in security best practices',
      color: '#ff6f00',
    },
    {
      icon: <Devices sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Responsive',
      description: 'Mobile-first design approach',
      color: '#9c27b0',
    },
  ];

  const techStack = [
    'Next.js 15', 'React 19', 'TypeScript 5', 'Material-UI 7', 'ESLint', 'Jest'
  ];

  return (
    <Box component='main'>
      {/* Hero Section */}
      <Box
        component='section'
        id='hero'
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          pt: { xs: 9, md: 11 }, // Increased top padding to account for navbar
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(circle at 25% 25%, #fff 2px, transparent 2px), radial-gradient(circle at 75% 75%, #fff 2px, transparent 2px)',
            backgroundSize: '50px 50px',
          }}
        />
        
        <Container maxWidth='lg'>
          <Grid container spacing={4} alignItems='center'>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={4}>
                <Box>
                  <Chip
                    label="🚀 Ready to Launch"
                    color="primary"
                    variant="filled"
                    sx={{ mb: 2, fontWeight: 'bold' }}
                  />
                  <Typography
                    variant='h1'
                    component='h1'
                    color='white'
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                      lineHeight: 1.2,
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}
                  >
                    Modern Web
                    <br />
                    <Box component="span" sx={{ color: 'primary.light' }}>
                      Boilerplate
                    </Box>
                  </Typography>
                  <Typography
                    variant='h5'
                    color='rgba(255,255,255,0.9)'
                    sx={{
                      maxWidth: 600,
                      lineHeight: 1.6,
                      mb: 3,
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    Kickstart your next web project with Next.js 15, React 19, TypeScript 5, and Material-UI 7. 
                    Production-ready, developer-friendly, and beautifully designed.
                  </Typography>
                </Box>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant='contained'
                    size='large'
                    onClick={() => scrollToSection(featuresRef)}
                    startIcon={<RocketLaunch />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: 3,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    Explore Features
                  </Button>
                  <Button
                    variant='outlined'
                    size='large'
                    href='https://github.com'
                    target='_blank'
                    startIcon={<GitHub />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: 3,
                      borderColor: 'rgba(255,255,255,0.5)',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    View on GitHub
                  </Button>
                </Stack>
              </Stack>
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 300, md: 400 },
                    height: { xs: 300, md: 400 },
                  }}
                >
                  <RocketLaunch
                    sx={{
                      fontSize: { xs: 200, md: 300 },
                      color: 'rgba(255,255,255,0.2)',
                      animation: 'float 6s ease-in-out infinite',
                      '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-20px)' },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        component='section'
        id='features'
        ref={featuresRef}
        sx={{
          py: 10,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth='lg'>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant='h2'
              component='h2'
              color='primary.main'
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                mb: 3,
                pt: 2, // Add top padding for better spacing from navbar
              }}
            >
              Why Choose This Boilerplate?
            </Typography>
            <Typography
              variant='h6'
              color='text.secondary'
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Built with modern technologies and best practices for the best developer experience
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant='h5'
                      component='h3'
                      gutterBottom
                      sx={{ fontWeight: 'bold' }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant='body1'
                      color='text.secondary'
                      sx={{ lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box
        component='section'
        id='about'
        ref={aboutRef}
        sx={{
          py: 12, // Increased padding to make section taller
          backgroundColor: 'background.paper',
        }}
      >
        <Container maxWidth='lg'>
          <Grid container spacing={6} alignItems='center'>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  variant='h2'
                  component='h2'
                  color='primary.main'
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 3,
                    pt: 2, // Add top padding for better spacing from navbar
                  }}
                >
                  Built for Developers
                </Typography>
                <Typography
                  variant='h6'
                  color='text.secondary'
                  sx={{ mb: 4, lineHeight: 1.6 }}
                >
                  This boilerplate is designed to get you up and running quickly with a modern, 
                  scalable web application foundation using the latest technologies.
                </Typography>
                
                <Stack spacing={3} sx={{ mb: 5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle color="primary" />
                    <Typography variant="body1">
                      Zero configuration setup
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle color="primary" />
                    <Typography variant="body1">
                      TypeScript 5 for type safety
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle color="primary" />
                    <Typography variant="body1">
                      Material-UI 7 components
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle color="primary" />
                    <Typography variant="body1">
                      Testing setup with Jest
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle color="primary" />
                    <Typography variant="body1">
                      Hot reload development
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CheckCircle color="primary" />
                    <Typography variant="body1">
                      Production optimization ready
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  variant='contained'
                  size='large'
                  href='https://nextjs.org/docs'
                  target='_blank'
                  endIcon={<Launch />}
                  sx={{
                    py: 1.5,
                    px: 4,
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    borderRadius: 3,
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, md: 6 }}>
              <Card elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Tech Stack
                </Typography>
                <Divider sx={{ mb: 3 }} />
                <Grid container spacing={2}>
                  {techStack.map((tech, index) => (
                    <Grid size={{ xs: 6, sm: 4 }} key={index}>
                      <Chip
                        label={tech}
                        variant="outlined"
                        color="primary"
                        sx={{ width: '100%', fontWeight: 500 }}
                      />
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ mt: 4, p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Ready to use with:
                  </Typography>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Star color="warning" />
                    <Typography variant="body2" color="text.secondary">
                      Hot reload development
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Star color="warning" />
                    <Typography variant="body2" color="text.secondary">
                      Production optimization
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Star color="warning" />
                    <Typography variant="body2" color="text.secondary">
                      SEO ready
                    </Typography>
                  </Stack>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Get Started Section */}
      <Box
        component='section'
        id='get-started'
        ref={getStartedRef}
        sx={{
          py: 10,
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth='lg'>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant='h2'
              component='h2'
              color='primary.main'
              gutterBottom
              sx={{ 
                fontWeight: 'bold',
                mb: 3,
                pt: 2, // Add top padding for better spacing from navbar
              }}
            >
              Ready to Get Started?
            </Typography>
            <Typography
              variant='h6'
              color='text.secondary'
              sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
            >
              Clone this boilerplate and start building your next amazing web application
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <GitHub sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Clone & Start
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Get the source code and start building immediately
                </Typography>
                <Button
                  variant='contained'
                  fullWidth
                  href='https://github.com'
                  target='_blank'
                  startIcon={<GitHub />}
                >
                  View Repository
                </Button>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Code sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Documentation
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Learn how to use and customize this boilerplate
                </Typography>
                <Button
                  variant='outlined'
                  fullWidth
                  href='https://nextjs.org/docs'
                  target='_blank'
                  startIcon={<Launch />}
                >
                  Read Docs
                </Button>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <RocketLaunch sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Deploy
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Deploy your app to Vercel, Netlify, or any platform
                </Typography>
                <Button
                  variant='contained'
                  fullWidth
                  onClick={() => scrollToSection(aboutRef)}
                  startIcon={<RocketLaunch />}
                >
                  Learn More
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
