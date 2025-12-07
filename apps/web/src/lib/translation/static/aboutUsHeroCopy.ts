import { translateWithCache } from "@/lib/translation/service";

export type AboutUsHeroCopy = {
  getInvolved: string;
  learnMore: string;
};

const baseHeroEn: AboutUsHeroCopy = {
  learnMore: "Contact Us",
  getInvolved: "Learn More",
};

export async function getAboutUsHeroCopy(locale: string): Promise<AboutUsHeroCopy> {
  if (!locale || locale === "en") {
    return baseHeroEn;
  }

  const texts = [
    baseHeroEn.getInvolved,
    baseHeroEn.learnMore,
  ];

  try {
    const translated = await translateWithCache(texts, "en", locale);
    const [getInvolved, learnMore] = translated;

    return { getInvolved, learnMore };
  } catch (err) {
    console.error("[getAboutUsHeroCopy] translation failed:", err);
    return baseHeroEn;
  }
}
