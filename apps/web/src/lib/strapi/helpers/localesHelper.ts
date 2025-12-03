export type StrapiLocale = {
  code: string;
  name: string;
  isDefault?: boolean;
};

export function fetchStrapiLocales(): StrapiLocale[] {
    return [
      { code: "am", name: "Amharic" },
      { code: "ar", name: "Arabic" },
      { code: "bn", name: "Bengali" },
      { code: "en", name: "English", isDefault: true },
      { code: "fr", name: "French" },
      { code: "zh-Hans", name: "Mandarin" },
      { code: "ne", name: "Nepali" },
      { code: "ps", name: "Pashto" },
      { code: "fa", name: "Persian" },
      { code: "pt", name: "Portuguese" },
      { code: "pa", name: "Punjabi" },
      { code: "so", name: "Somali" },
      { code: "es", name: "Spanish" },
      { code: "sw", name: "Swahili" },
      { code: "ti", name: "Tigrinya" },
      { code: "ur", name: "Urdu" },
    ];
}
