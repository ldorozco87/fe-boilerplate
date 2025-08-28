import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

// Force static generation for export
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/ecommerce', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  ];

  const currentDate = new Date();

  return siteConfig.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${siteConfig.url}/${locale}${route.path}`,
      lastModified: currentDate,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          siteConfig.locales.map((loc) => [
            loc === 'en' ? 'x-default' : loc,
            `${siteConfig.url}/${loc}${route.path}`,
          ])
        ),
      },
    }))
  );
}
