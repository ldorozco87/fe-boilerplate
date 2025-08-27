import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Layout } from '@/components/layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FE Boilerplate',
  description: 'Frontend boilerplate with Next.js, TypeScript and Material-UI',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Material-UI',
    'Frontend',
    'Boilerplate',
  ],
  authors: [{ name: 'FE Boilerplate Team' }],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
