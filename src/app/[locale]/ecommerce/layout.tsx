import type { Metadata } from 'next';


interface EcommerceLayoutProps {
  children: React.ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  
  return {
    title: 'E-commerce Demo - Next.js Boilerplate',
    description: 'Experience a fully functional e-commerce interface with cart management, product filtering, and checkout simulation. Built with Next.js, TypeScript, and Material UI.',
    keywords: [
      'e-commerce',
      'shopping cart',
      'online store',
      'Next.js',
      'React',
      'TypeScript',
      'Material UI',
      'checkout',
      'product catalog',
    ],
    openGraph: {
      title: 'E-commerce Demo - Next.js Boilerplate',
      description: 'A modern e-commerce demo showcasing cart management, product filtering, and checkout simulation.',
      type: 'website',
      images: [
        {
          url: '/api/placeholder/1200/630',
          width: 1200,
          height: 630,
          alt: 'E-commerce Demo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'E-commerce Demo - Next.js Boilerplate',
      description: 'A modern e-commerce demo showcasing cart management, product filtering, and checkout simulation.',
    },
  };
}

export default function EcommerceLayout({
  children,
}: EcommerceLayoutProps) {
  return <>{children}</>;
}
