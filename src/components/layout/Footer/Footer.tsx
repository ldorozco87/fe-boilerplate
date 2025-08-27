'use client'

import React from 'react'
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
} from '@mui/icons-material'

interface FooterLink {
  label: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Producto',
    links: [
      { label: 'Características', href: '/features' },
      { label: 'Precios', href: '/pricing' },
      { label: 'Documentación', href: '/docs' },
      { label: 'API', href: '/api' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Acerca de', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Carreras', href: '/careers' },
      { label: 'Contacto', href: '/contact' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Centro de Ayuda', href: '/help' },
      { label: 'Comunidad', href: '/community' },
      { label: 'Tutoriales', href: '/tutorials' },
      { label: 'Estado del Servicio', href: '/status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos de Servicio', href: '/terms' },
      { label: 'Política de Privacidad', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Licencias', href: '/licenses' },
  ],
  },
]

const socialLinks = [
  { icon: GitHubIcon, href: 'https://github.com', label: 'GitHub' },
  { icon: LinkedInIcon, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: TwitterIcon, href: 'https://twitter.com', label: 'Twitter' },
  { icon: EmailIcon, href: 'mailto:contact@example.com', label: 'Email' },
]

const Footer: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const currentYear = new Date().getFullYear()

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        mt: 'auto',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4, 
          mb: 4 
        }}>
          {/* Company Info */}
          <Box sx={{ flex: '1 1 300px', minWidth: '250px' }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mb: 2,
                }}
              >
                🚀 Boilerplate
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2, lineHeight: 1.6 }}
              >
                Una base sólida para construir aplicaciones web modernas y escalables.
                Diseñado para desarrolladores que quieren empezar rápido.
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: '0.875rem' }}
              >
                Construido con Next.js, TypeScript, MUI y más.
              </Typography>
            </Box>
          </Box>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <Box key={section.title} sx={{ flex: '1 1 150px', minWidth: '120px' }}>
              <Typography
                variant="subtitle2"
                component="h3"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: theme.palette.text.primary,
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.label} sx={{ mb: 1 }}>
                    <Link
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      sx={{
                        color: theme.palette.text.secondary,
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          textDecoration: 'underline',
                        },
                        transition: 'color 0.2s ease-in-out',
                      }}
                    >
                      {link.label}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Bottom Footer */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: 2,
          }}
        >
          {/* Copyright */}
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: '0.875rem' }}
          >
            © {currentYear} Boilerplate. Todos los derechos reservados.
          </Typography>

          {/* Social Links */}
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignItems: 'center',
            }}
          >
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.action.hover,
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <social.icon fontSize="small" />
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
