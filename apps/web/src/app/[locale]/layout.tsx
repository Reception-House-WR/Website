import ClientToolbar from "@/components/common/header/ClientToolbar";
import { DonateButton } from "@/components/common/DonateButton";
import Footer from "@/components/common/Footer";
import {
  LOCALES,
  DEFAULT_LOCALE,
  isValidLocale,
} from "@/lib/strapi/internationalization/i18n";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = isValidLocale(params.locale)
    ? params.locale
    : DEFAULT_LOCALE;

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>

      <ClientToolbar />

      <main id="main-content">{children}</main>

      <DonateButton lang={locale} />
      <Footer />
    </>
  );
}
