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

const toAnalyticsSection = (s: any): AnalyticsSection => {
  const analyticsRaw = Array.isArray(s?.analytics) ? s.analytics : [];

  return {
    __component: "programs.analytics-section",
    title: s?.title ?? "",
    description: s?.description ?? "",
    analytics: analyticsRaw.map(toAnalytic),
  };
};

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

const toItem = (i: any): Item => ({
  value: i?.value ?? "",
});

const toInfoCard = (s: any): InfoCard => ({
  title: s?.title ?? "",
  subtitle: s?.subtitle ?? "",
  description: s?.description ?? "",
  subtitle2: s?.subtitle2 ?? "",
  items: (s?.items ?? []).map(toItem),
  description2: s?.description2 ?? "",
});

const toGalleryCarousel = (s: any): GalleryCarousel => ({
  id: s?.id ?? 0,
  __component: "common.gallery-carousel",
  title: s?.title ?? "",
  description: s?.description ?? "",
  gallery: (s?.gallery ?? []).map((item: any) => ({
    url: item?.url ?? null,
    alternativeText: item?.alternativeText ?? "",
    caption: item?.caption ?? "",
  })),
});

const toListCard = (c: any): ListCard => ({
  title: c?.title ?? "",
  description: c?.description ?? "",
  items: (c?.items ?? []).map((it: any) => ({
    key: it?.key ?? "",
    value: it?.value ?? "",
  })),
});


export async function fetchProgramsChildrenPage(): Promise<ChildrenSection | null> {
  const pageRes = await fetchProgramsChildrenSections();
  const page = pageRes?.data?.[0];

  console.log("Fetched Programs Children Page:", page);
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

  const youthAdvisoryRaw = sections.find(
    (s: any) => s.__component === "programs.info-card"
  ) as any;

  const galleryRaw = sections.find(
    (s: any) => s.__component === "common.gallery-carousel"
  ) as any;

  const barriersRaw = sections.find(
    (s: any) => s.__component === "common.list-card"
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
  const youthAdvisorySection = toInfoCard(youthAdvisoryRaw ?? {});
  const gallerySection = toGalleryCarousel(galleryRaw ?? {});
  const barriersSection = toListCard(barriersRaw ?? {});

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