import { AboutOverviewSections } from "../../models/about/overviewSections";
import { Card } from "../../models/common/card";
import { GalleryCarousel } from "../../models/common/galleryCarousel";
import { Hero } from "../../models/common/hero";
import { Section } from "../../models/common/section";
import { fetchAboutOverview } from "../../services/about/overviewService";

type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
  gallery?: {
    url?: string;
    alternativeText?: string | null;
    caption?: string | null;
  }[];
  image?: {
    url?: string;
    alternativeText?: string | null;
    caption?: string | null;
  };
  buttonLabel?: string;
  buttonUrl?: string;
  buttonURL?: string;
};

//common.section
const toSection = (s?: RawStrapiSection): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

//common.hero
const toHero = (s?: RawStrapiSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? undefined,
});

//common.gallery-carousel
const toGalleryCarousel = (s?: RawStrapiSection): GalleryCarousel => ({
  id: s?.id ?? 0,
  __component: "common.gallery-carousel",
  title: s?.title ?? "",
  description: s?.description ?? "",
  gallery: (s?.gallery ?? []).map((item) => ({
    url: item?.url ?? "",
    alternativeText: item?.alternativeText ?? "",
    caption: item?.caption ?? "",
  })),
});

//common.card
const toCard = (s?: RawStrapiSection): Card => ({
  id: s?.id ?? 0,
  __component: "common.card",
  title: s?.title ?? "",
  description: s?.description ?? "",
  buttonLabel: s?.buttonLabel ?? "",
  buttonUrl: s?.buttonUrl ?? s?.buttonURL ?? "",
  image: s?.image
    ? {
        url: s.image.url ?? "",
        alternativeText: s.image.alternativeText ?? null,
        caption: s.image.caption ?? null,
      }
    : undefined,
});

export async function fetchAboutOverviewPage(): Promise<AboutOverviewSections | null> {
  const pageRes = await fetchAboutOverview();

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero"
  );

  const whoWeAreRaw = sections.find(
    (s) => s.__component === "common.section"
  );

  const communityRaw = sections.find(
    (s) => s.__component === "common.gallery-carousel"
  );

  const boardCardRaw = sections.find(
    (s) => s.__component === "common.card"
  );

  const hero = toHero(heroRaw);
  const whoWeAreSection = toSection(whoWeAreRaw);
  const galleryCarousel = toGalleryCarousel(communityRaw);
  const card = toCard(boardCardRaw);

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    whoWeAreSection,
    communitySection: galleryCarousel,
    boardOfDirectorsSection: card
  };
}