import { siteConfig } from '@/config/site';

export interface WebSiteSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  potentialAction: {
    '@type': string;
    target: string;
    'query-input': string;
  };
  author: {
    '@type': string;
    name: string;
    url: string;
  };
  publisher: {
    '@type': string;
    name: string;
    url: string;
  };
}

export function generateWebSiteSchema(): WebSiteSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.authors[0].name,
      url: siteConfig.authors[0].url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.authors[0].name,
      url: siteConfig.authors[0].url,
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
