// lib/footerCopy.ts

export type FooterCopy = {
  orgName: string;
  addressLine: string;
  accessibilityTitle: string;
  accessibilityText: string;
  charityNumber: string;
  moreColumnTitle: string;
  legalPrivacy: string;
  legalAccessibility: string;
  legalTerms: string;
  legalCopyright: string;
};

const baseFooterEn: FooterCopy = {
  orgName: "Reception House Waterloo Region",
  addressLine: "101 Frederick St, Kitchener, ON N2H 6R2",
  accessibilityTitle: "Accessibility at Reception House",
  accessibilityText:
    "We are committed to providing accessible services in accordance with the Accessibility for Ontarians with Disabilities Act (AODA). For alternate formats or accessibility inquiries, contact info@receptionhouse.ca.",
  charityNumber: "Charitable Registration No. 11890 5297 RR0001",
  moreColumnTitle: "More",
  legalPrivacy: "Privacy Policy",
  legalAccessibility: "Accessibility",
  legalTerms: "Terms of Use",
  legalCopyright:
    "© 2025 Reception House Waterloo Region | All rights reserved",
};

/**
 * Translates the footer static text using the internal /api/translate route.
 * Uses English as the base language and only calls the API when locale !== "en".
 */
export async function getFooterCopy(locale: string): Promise<FooterCopy> {
  // English: no translation needed
  if (!locale || locale === "en") {
    return baseFooterEn;
  }

  const texts = [
    baseFooterEn.orgName,
    baseFooterEn.addressLine,
    baseFooterEn.accessibilityTitle,
    baseFooterEn.accessibilityText,
    baseFooterEn.charityNumber,
    baseFooterEn.moreColumnTitle,
    baseFooterEn.legalPrivacy,
    baseFooterEn.legalAccessibility,
    baseFooterEn.legalTerms,
    baseFooterEn.legalCopyright,
  ];

  // IMPORTANT: this runs on the server (layout/page), not in the browser
  const res = await fetch(`${process.env["NEXT_PUBLIC_BASE_URL"]}/api/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts, from: "en", to: locale }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(
      "[getFooterCopy] Translation failed, falling back to English"
    );
    return baseFooterEn;
  }

  const { translations } = (await res.json()) as { translations: string[] };

  const [
    orgName,
    addressLine,
    accessibilityTitle,
    accessibilityText,
    charityNumber,
    moreColumnTitle,
    legalPrivacy,
    legalAccessibility,
    legalTerms,
    legalCopyright,
  ] = translations;

  return {
    orgName,
    addressLine,
    accessibilityTitle,
    accessibilityText,
    charityNumber,
    moreColumnTitle,
    legalPrivacy,
    legalAccessibility,
    legalTerms,
    legalCopyright,
  };
}
