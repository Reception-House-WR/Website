import { GalleryCarousel } from "../../models/common/galleryCarousel";
import { Hero } from "../../models/common/hero";
import { Feature } from "../../models/programs/feature";
import { IntegrationSections } from "../../models/programs/integrationSections";
import { ProgramCard } from "../../models/programs/programCard";
import { ServiceOverview } from "../../models/programs/serviceOverview";
import { StrapiImageResponse } from "../../models/strapi/image";
import { fetchProgramsIntegrationSections } from "../../services/programs/integrationService";


const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toFeature = (f: any): Feature => ({
  title: f?.title ?? "",
  description: f?.description ?? "",
  icon: f?.icon ?? "",
});

const toServiceOverview = (s: any): ServiceOverview => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  features: (s?.features ?? []).map(toFeature),
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

const toProgramCard = (p: any): ProgramCard => ({
  time: p?.time ?? "",
  title: p?.title ?? "",
  description: p?.description ?? "",
  steps: (p?.steps ?? []).map((st: any) => ({
    key: st?.key ?? "",
    value: st?.value ?? "",
  })),
  image: (p?.image as StrapiImageResponse) ?? null,
});


export async function fetchProgramsIntegrationPage(): Promise<IntegrationSections | null> {
  const pageRes = await fetchProgramsIntegrationSections();
  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const barriersRaw = sections.find(
    (s: any) => s.__component === "programs.service-overview"
  ) as any;

  const galleryRaw = sections.find(
    (s: any) => s.__component === "common.gallery-carousel"
  ) as any;

  const programCardsRaw = sections.filter(
    (s: any) => s.__component === "programs.program-card"
  ) as any[];

  const rapRaw = programCardsRaw[0] ?? {};
  const cssRaw = programCardsRaw[1] ?? {};

  const hero = toHero(heroRaw ?? {});
  const barriersSection = toServiceOverview(barriersRaw ?? {});
  const gallerySection = toGalleryCarousel(galleryRaw ?? {});

  const rap = toProgramCard(rapRaw);
  const css = toProgramCard(cssRaw);

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
