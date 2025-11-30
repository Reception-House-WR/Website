import { GalleryCarousel } from "../../models/common/galleryCarousel";
import { Hero } from "../../models/common/hero";
import { ListCard } from "../../models/common/listCard";
import { SimpleCard } from "../../models/common/simpleCard";
import { Analytic } from "../../models/programs/analytic";
import { AnalyticsSection } from "../../models/programs/analyticsSection";
import { CardsCarousel } from "../../models/programs/cardsCarousel";
import { ChildrenSection } from "../../models/programs/childrenSections";
import { InfoCard } from "../../models/programs/infoCard";
import { Item } from "../../models/programs/item";
import { StrapiImageResponse } from "../../models/strapi/image";
import { fetchProgramsChildrenSections } from "../../services/programs/childrenService";

//RAW TYPES 
type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
  analytics?: RawAnalytic[];
  cards?: RawSimpleCard[];
  items?: RawItem[];
  gallery?: RawImage[];
};

type RawAnalytic = {
  metric?: string;
  description?: string;
};

type RawSimpleCard = {
  title?: string;
  description?: string;
  image?: StrapiImageResponse;
};

type RawItem = {
  value?: string;
};

type RawImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
};

type RawListCard = {
  title?: string;
  description?: string;
  items?: { key?: string; value?: string }[];
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
  image: c.image ?? { url: "", alternativeText: null, caption: null },
});

const toCardsCarousel = (s?: RawStrapiSection): CardsCarousel => ({
  __component: "common.cards-carousel",
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map(toSimpleCard),
});

const toItem = (i: RawItem): Item => ({
  value: i.value ?? "",
});

const toInfoCard = (s?: RawStrapiSection): InfoCard => ({
  title: s?.title ?? "",
  subtitle: (s as any)?.subtitle ?? "",
  description: s?.description ?? "",
  subtitle2: (s as any)?.subtitle2 ?? "",
  items: (s?.items ?? []).map(toItem),
  description2: (s as any)?.description2 ?? "",
});

const toGalleryCarousel = (s?: RawStrapiSection): GalleryCarousel => ({
  id: s?.id ?? 0,
  __component: "common.gallery-carousel",
  title: s?.title ?? "",
  description: s?.description ?? "",
  gallery: (s?.gallery ?? []).map((item) => ({
    url: item.url ?? "",
    alternativeText: item.alternativeText ?? "",
    caption: item.caption ?? "",
  })),
});

const toListCard = (c: RawListCard): ListCard => ({
  title: c.title ?? "",
  description: c.description ?? "",
  items: (c.items ?? []).map((it) => ({
    key: it.key ?? "",
    value: it.value ?? "",
  })),
});

export async function fetchProgramsChildrenPage(locale: string): Promise<ChildrenSection | null> {
  const pageRes = await fetchProgramsChildrenSections(locale);
  const page = pageRes?.data?.[0];

  console.log("Fetched Programs Children Page:", page);
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find((s) => s.__component === "common.hero");
  const analyticsRaw = sections.find((s) => s.__component === "programs.analytics-section");
  const featuresRaw = sections.find((s) => s.__component === "common.cards-carousel");
  const youthAdvisoryRaw = sections.find((s) => s.__component === "programs.info-card");
  const galleryRaw = sections.find((s) => s.__component === "common.gallery-carousel");
  const barriersRaw = sections.find((s) => s.__component === "common.list-card");

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
  const youthAdvisorySection = toInfoCard(youthAdvisoryRaw);
  const gallerySection = toGalleryCarousel(galleryRaw);
  const barriersSection = toListCard((barriersRaw as unknown as RawListCard) ?? {});

  return {
    identifier: page.identifier,
    title: page.title,
    hero,
    analyticsSection,
    featuresSection,
    youthAdvisorySection,
    gallerySection,
    barriersSection,
  };
}