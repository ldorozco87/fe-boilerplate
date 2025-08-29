export const siteConfig = {
  name: 'Next.js Boilerplate',
  description:
    'A high-performance static site generator built with Next.js 15, Material UI, and TypeScript.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.jpg',
  creator: '@frontend-architects',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Material UI',
    'Static Site Generator',
    'Boilerplate',
    'Frontend',
    'Architecture',
    'Performance',
  ],
  authors: [
    {
      name: 'Frontend Architecture Team',
      url: 'https://github.com/your-org/nextjs-boilerplate',
    },
  ],
  links: {
    github: 'https://github.com/your-org/nextjs-boilerplate',
    twitter: 'https://twitter.com/frontend-architects',
    docs: 'https://docs.your-org.com/nextjs-boilerplate',
  },
  defaultLocale: 'en' as const,
  locales: ['en', 'es'] as const,
};

export type SiteConfig = typeof siteConfig;
