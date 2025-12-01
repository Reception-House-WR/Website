export type StrapiLocale = {
  code: string;
  name: string;
  isDefault?: boolean;
};

export function fetchStrapiLocales(): StrapiLocale[] {
    return [
        { code: "ar", name: "Arabic" },
        { code: "en", name: "English", isDefault: true },
        { code: "fr", name: "French" },
        { code: "fa", name: "Persian" },
        { code: "pt", name: "Portuguese" },
        { code: "so", name: "Somali" },
        { code: "es", name: "Spanish" },
    ];
}
