'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';

export default function HtmlLangProvider() {
  const locale = useLocale();

  useEffect(() => {
    // Update the html lang attribute when locale changes
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
