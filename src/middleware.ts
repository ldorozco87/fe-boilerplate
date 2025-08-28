import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

// Create the middleware
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always',
});

export default intlMiddleware;

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es)/:path*'],
};
