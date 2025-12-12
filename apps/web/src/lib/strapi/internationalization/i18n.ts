export const LOCALES = ['es', 'en', 'fr', 'ar', 'fa', 'so', 'pt', 'ti', 'sw', 'zh-Hans', 'am', 'bn', 'ur', 'ps', 'pa', 'ne'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}
