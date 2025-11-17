import { Hero } from "../../models/common/hero";
import { ListCard } from "../../models/common/listCard";
import { SimpleCard } from "../../models/common/simpleCard";
import { Analytic } from "../../models/programs/analytic";
import { AnalyticsSection } from "../../models/programs/analyticsSection";
import { BenefitsSection } from "../../models/programs/benefitsSection";
import { CardsCarousel } from "../../models/programs/cardsCarousel";
import { HousingSection } from "../../models/programs/housingSections";
import { StrapiImageResponse } from "../../models/strapi/image";
import { fetchProgramsHousingSections } from "../../services/programs/housingService";

const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toAnalytic = (a: any): Analytic => ({
  metric: a?.metric ?? "",
  description: a?.description ?? "",
});

const toAnalyticsSection = (s: any): AnalyticsSection => ({
  __component: "programs.analytics-section",
  title: s?.title ?? "",
  description: s?.description ?? "",
  analytics: (s?.analytics ?? []).map(toAnalytic),
});

const toSimpleCard = (c: any): SimpleCard => ({
  __component: "common.simple-card",
  title: c?.title ?? "",
  description: c?.description ?? "",
  image: (c?.image as StrapiImageResponse) ?? null,
});

const toCardsCarousel = (s: any): CardsCarousel => ({
  __component: "common.cards-carousel",
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map(toSimpleCard),
});

const toListCard = (c: any): ListCard => ({
  title: c?.title ?? "",
  description: c?.description ?? "",
  items: (c?.items ?? []).map((it: any) => ({
    key: it?.key ?? "",
    value: it?.value ?? "",
  })),
});



const toBenefitsSection = (s: any): BenefitsSection => ({
  __component: "programs.benefits-section",
  title: s?.title ?? "",
  description: s?.description ?? "",
  card: toListCard(s?.card ?? {}),   
  buttonLabel: s?.buttonLabel ?? "",
  bottomDescription: s?.bottomDescription ?? "",
});



export async function fetchProgramsHousingPage(): Promise<HousingSection | null> {
  const pageRes = await fetchProgramsHousingSections();
  const page = pageRes?.data?.[0];

  console.log("Housing Page Response:", pageRes);
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const analyticsRaw = sections.find(
    (s: any) => s.__component === "programs.analytics-section"
  ) as any;

  const featuresRaw = sections.find(
    (s: any) => s.__component === "common.cards-carousel"
  ) as any;

  const benefitsRaw = sections.find(
    (s: any) => s.__component === "programs.benefits-section"
  ) as any;

  const hero = toHero(heroRaw ?? {});
  const analyticsSection: AnalyticsSection = analyticsRaw
  ? toAnalyticsSection(analyticsRaw)
  : {
      __component: "programs.analytics-section",
      title: "",
      description: "",
      analytics: [] as Analytic[],
    };
  const featuresSection = toCardsCarousel(featuresRaw ?? {});
  const benefitsSection = toBenefitsSection(benefitsRaw ?? {});

  return {
    identifier: page.identifier,
    title: page.title,
    hero,
    analyticsSection,
    featuresSection,
    benefitsSection,
  };
}