import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Enable static export only when NEXT_OUTPUT=export is set
  ...(process.env.NEXT_OUTPUT === 'export' && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    // Unoptimize images only for static export
    ...(process.env.NEXT_OUTPUT === 'export' && { unoptimized: true }),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    // Enable experimental features if needed
  },
  // Enable SASS support
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  // Note: Security headers are not supported with static export
  // Configure them at the server level (Apache/Nginx) instead
  // Compression for better performance
  compress: true,
};

export default withNextIntl(nextConfig);
