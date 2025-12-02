import { DonateButton } from "@/components/common/DonateButton";
import Footer from "@/components/common/Footer";
import {
  LOCALES,
  DEFAULT_LOCALE,
  isValidLocale,
} from "@/lib/strapi/internationalization/i18n";
import ToolbarServer from "@/components/common/header/ToolbarServer";
import { fetchStrapiLocales } from "@/lib/strapi/helpers/localesHelper";
import { buildLocalizedNav } from "@/lib/strapi/helpers/navHelper";
import { getFooterCopy } from "@/lib/footerCopy";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale: rawLocale } = await params;
  const locale = isValidLocale(rawLocale)
    ? rawLocale
    : DEFAULT_LOCALE;
  
  const locales = fetchStrapiLocales();
  const nav = await buildLocalizedNav(locale);
  const footerCopy = await getFooterCopy(locale);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <ToolbarServer locales={locales} nav={nav} currentLocale={locale} />

      <main id="main-content">{children}</main>

      <DonateButton lang={locale} />
      <Footer nav={nav} copy={footerCopy} />
    </>
  );
}
