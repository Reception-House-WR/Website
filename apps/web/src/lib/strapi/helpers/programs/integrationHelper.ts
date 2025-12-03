import { GalleryCarousel } from "../../models/common/galleryCarousel";
import { Hero } from "../../models/common/hero";
import { Feature } from "../../models/programs/feature";
import { IntegrationSections } from "../../models/programs/integrationSections";
import { ProgramCard } from "../../models/programs/programCard";
import { ServiceOverview } from "../../models/programs/serviceOverview";
import { StrapiImageResponse } from "../../models/strapi/image";
import { fetchProgramsIntegrationSections } from "../../services/programs/integrationService";


type RawFeature = {
  title?: string;
  description?: string;
  icon?: string;
};

type RawGalleryImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
};

type RawStep = {
  key?: string;
  value?: string;
};

type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
  features?: RawFeature[];
  gallery?: RawGalleryImage[];
  time?: string;
  steps?: RawStep[];
  image?: StrapiImageResponse | null;
};

const toHero = (s?: RawStrapiSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url,
});

const toFeature = (f: RawFeature): Feature => ({
  title: f.title ?? "",
  description: f.description ?? "",
  icon: f.icon ?? "",
});

const toServiceOverview = (s?: RawStrapiSection): ServiceOverview => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  features: (s?.features ?? []).map(toFeature),
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

const toProgramCard = (p: RawStrapiSection): ProgramCard => ({
  time: p.time ?? "",
  title: p.title ?? "",
  description: p.description ?? "",
  steps: (p.steps ?? []).map((st) => ({
    key: st.key ?? "",
    value: st.value ?? "",
  })),
  image: p.image ?? null,
});

export async function fetchProgramsIntegrationPage(locale: string): Promise<IntegrationSections | null> {
  const pageRes = await fetchProgramsIntegrationSections(locale);
  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero"
  );

  const barriersRaw = sections.find(
    (s) => s.__component === "programs.service-overview"
  );

  const galleryRaw = sections.find(
    (s) => s.__component === "common.gallery-carousel"
  );

  const programCardsRaw = sections.filter(
    (s) => s.__component === "programs.program-card"
  );

  const rapRaw = programCardsRaw[0];
  const cssRaw = programCardsRaw[1];

  const hero = toHero(heroRaw);
  const barriersSection = toServiceOverview(barriersRaw);
  const gallerySection = toGalleryCarousel(galleryRaw);

  const rap = toProgramCard(rapRaw ?? {});
  const css = toProgramCard(cssRaw ?? {});

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    barriersSection,
    gallerySection,
    programsSection: {
      rap,
      css,
    },
  };
}
