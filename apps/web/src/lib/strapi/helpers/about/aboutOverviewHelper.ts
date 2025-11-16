import { AboutOverviewSections } from "../../models/about/overviewSections";
import { Card } from "../../models/common/card";
import { GalleryCarousel } from "../../models/common/galleryCarousel";
import { Hero } from "../../models/common/hero";
import { Section } from "../../models/common/section";
import { fetchAboutOverview } from "../../services/about/overviewService";

//common.section
const toSection = (s: any): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

//common.hero
const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

//common.gallery-carousel
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

//common.card
const toCard = (s: any): Card => ({
  id: s?.id ?? 0,
  __component: "common.card",
  title: s?.title ?? "",
  description: s?.description ?? "",
  buttonLabel: s?.buttonLabel ?? "",
  buttonUrl: s?.buttonUrl ?? s?.buttonURL ?? "",

  image: {
    url: s?.image?.url ?? "",
    alternativeText: s?.image?.alternativeText ?? null,
    caption: s?.image?.caption ?? null,
  },
});


export async function fetchAboutOverviewPage(): Promise<AboutOverviewSections | null> {
  const pageRes = await fetchAboutOverview();

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero",
  ) as any;

  const whoWeAreRaw = sections.find(
    (s: any) => s.__component === "common.section",
  ) as any;

  const communityRaw = sections.find(
    (s: any) => s.__component === "common.gallery-carousel",
  ) as any;

  const boardCardRaw = sections.find(
    (s: any) => s.__component === "common.card",
  ) as any;

  const hero = toHero(heroRaw);
  const whoWeAreSection = whoWeAreRaw ? toSection(whoWeAreRaw) : toSection({});
  const galleryCarousel = communityRaw
    ? toGalleryCarousel(communityRaw)
    : toGalleryCarousel({});
  const card = boardCardRaw ? toCard(boardCardRaw) : toCard({});

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    whoWeAreSection: whoWeAreSection,
    communitySection: galleryCarousel,
    boardOfDirectorsSection: card
    
  };
}
