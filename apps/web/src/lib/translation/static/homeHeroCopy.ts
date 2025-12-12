import { translateWithCache } from "@/lib/translation/service";

export type HomeHeroCopy = {
  contactUs: string;
  learnMore: string;
};

const baseHeroEn: HomeHeroCopy = {
  contactUs: "Contact Us",
  learnMore: "Learn More",
};

export async function getHomeHeroCopy(locale: string): Promise<HomeHeroCopy> {
  if (!locale || locale === "en") {
    return baseHeroEn;
  }

  const texts = [
    baseHeroEn.contactUs,
    baseHeroEn.learnMore,
  ];

  try {
    const translated = await translateWithCache(texts, "en", locale);
    const [contactUs, learnMore] = translated;

    return { contactUs, learnMore };
  } catch (err) {
    console.error("[getHomeHeroCopy] translation failed:", err);
    return baseHeroEn;
  }
}
