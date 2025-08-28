import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/contact'];

  return siteConfig.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
    }))
  );
}
