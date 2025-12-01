export type StrapiLocale = {
  code: string;
  name: string;
  isDefault?: boolean;
};

const STRAPI_URL = process.env.STRAPI_URL || "https://localhost:1337";

export async function fetchStrapiLocales(): Promise<StrapiLocale[]> {
  if (!STRAPI_URL) {
    throw new Error("Missing STRAPI_URL env var");
  }

//   const res = await fetch(`${STRAPI_URL}/i18n/locales`, {
//     next: { revalidate: 3600 },
//   });

//   if (!res.ok) {
//     throw new Error(
//       `Failed to fetch locales from Strapi: ${res.status} ${res.statusText}`
//     );
//   }

//   const data = await res.json();

//   return data.map((loc: any) => ({
//     code: loc.code,
//     name: loc.name,
//     isDefault: loc.isDefault,
//   }));
    return [
        { code: "en", name: "English", isDefault: true },
        { code: "fr", name: "French" },
        { code: "es", name: "Spanish" },
    ];
}
