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

type RawAnalytic = {
  metric?: string;
  description?: string;
};

type RawSimpleCard = {
  title?: string;
  description?: string;
  image?: StrapiImageResponse;
};

type RawListItem = {
  key?: string;
  value?: string;
};

type RawListCard = {
  title?: string;
  description?: string;
  items?: RawListItem[];
};

type RawBenefits = {
  title?: string;
  description?: string;
  card?: RawListCard;
  buttonLabel?: string;
  bottomDescription?: string;
};

type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
  analytics?: RawAnalytic[];
  cards?: RawSimpleCard[];
  card?: RawListCard;
  buttonLabel?: string;
  bottomDescription?: string;
};

//MAPPERS

const toHero = (s?: RawStrapiSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url,
});

const toAnalytic = (a: RawAnalytic): Analytic => ({
  metric: a.metric ?? "",
  description: a.description ?? "",
});

const toAnalyticsSection = (s?: RawStrapiSection): AnalyticsSection => ({
  __component: "programs.analytics-section",
  title: s?.title ?? "",
  description: s?.description ?? "",
  analytics: (s?.analytics ?? []).map(toAnalytic),
});

const toSimpleCard = (c: RawSimpleCard): SimpleCard => ({
  __component: "common.simple-card",
  title: c.title ?? "",
  description: c.description ?? "",
  image:
    c.image ??
    ({
      url: "",
      alternativeText: null,
      caption: null,
    } as StrapiImageResponse),
});

const toCardsCarousel = (s?: RawStrapiSection): CardsCarousel => ({
  __component: "common.cards-carousel",
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map(toSimpleCard),
});

const toListCard = (c: RawListCard): ListCard => ({
  title: c.title ?? "",
  description: c.description ?? "",
  items: (c.items ?? []).map((it) => ({
    key: it.key ?? "",
    value: it.value ?? "",
  })),
});

const toBenefitsSection = (s?: RawBenefits): BenefitsSection => ({
  __component: "programs.benefits-section",
  title: s?.title ?? "",
  description: s?.description ?? "",
  card: toListCard(s?.card ?? { items: [] }),
  buttonLabel: s?.buttonLabel ?? "",
  bottomDescription: s?.bottomDescription ?? "",
});

//MAIN FUNCTION 

export async function fetchProgramsHousingPage(locale: string): Promise<HousingSection | null> {
  const pageRes = await fetchProgramsHousingSections(locale);
  const page = pageRes?.data?.[0];

  // console.log("Housing Page Response:", pageRes);
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find((s) => s.__component === "common.hero");

  const analyticsRaw = sections.find(
    (s) => s.__component === "programs.analytics-section"
  );

  const featuresRaw = sections.find(
    (s) => s.__component === "common.cards-carousel"
  );

  const benefitsRaw = sections.find(
    (s) => s.__component === "programs.benefits-section"
  );

  const hero = toHero(heroRaw);

  const analyticsSection: AnalyticsSection = analyticsRaw
    ? toAnalyticsSection(analyticsRaw)
    : {
        __component: "programs.analytics-section",
        title: "",
        description: "",
        analytics: [],
      };

  const featuresSection = toCardsCarousel(featuresRaw);
  const benefitsSection = toBenefitsSection(benefitsRaw);

  return {
    identifier: page.identifier,
    title: page.title,
    hero,
    analyticsSection,
    featuresSection,
    benefitsSection,
  };
}