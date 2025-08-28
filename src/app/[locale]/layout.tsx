import type { Metadata } from 'next';
import { getTranslations, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import { siteConfig } from '@/config/site';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/providers/ThemeProvider';
import HtmlLangProvider from '@/components/providers/HtmlLangProvider';
import Analytics from '@/components/analytics/Analytics';
import DevTools from '@/components/dev/DevTools';
import { generateWebSiteSchema, generateOrganizationSchema, generateSoftwareApplicationSchema } from '@/lib/structured-data';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  // Generate hreflang alternates
  const alternates: Record<string, string> = {};
  locales.forEach(loc => {
    alternates[loc] = `${siteConfig.url}/${loc}`;
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: alternates,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteConfig.url}/${locale}`,
      locale: locale === 'en' ? 'en_US' : 'es_ES',
      alternateLocale: locales.filter(l => l !== locale).map(l => l === 'en' ? 'en_US' : 'es_ES'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  // Generate structured data
  const websiteSchema = generateWebSiteSchema();
  const organizationSchema = generateOrganizationSchema();
  const softwareSchema = generateSoftwareApplicationSchema();

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      
      <NextIntlClientProvider messages={messages} locale={locale}>
        <HtmlLangProvider />
        <ThemeProvider>
          <Analytics />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <DevTools />
        </ThemeProvider>
      </NextIntlClientProvider>
    </>
  );
}
