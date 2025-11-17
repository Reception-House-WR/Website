import { GalleryCarousel } from "../../models/common/galleryCarousel";
import { Hero } from "../../models/common/hero";
import { Partner } from "../../models/home/partner";
import { Analytic } from "../../models/programs/analytic";
import { AnalyticsOverview } from "../../models/programs/analyticOverview";
import { Feature } from "../../models/programs/feature";
import { HealthSections } from "../../models/programs/healthSections";
import { PartnerSection } from "../../models/programs/partnerSection";
import { ServiceOverview } from "../../models/programs/serviceOverview";
import { StrapiImageResponse } from "../../models/strapi/image";
import { fetchProgramsHealthSections } from "../../services/programs/healthService";

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

const toPartner = (p: any): Partner => ({
  name: p?.name ?? "",
  logo: (p?.logo as StrapiImageResponse) ?? null,
  url: p?.url ?? "",
});

const toPartnerSection = (s: any): PartnerSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  partners: (s?.partners ?? []).map(toPartner),
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

const toAnalytic = (a: any): Analytic => ({
  metric: a?.metric ?? "",
  description: a?.description ?? "",
});

const toAnalyticsSection = (s: any): AnalyticsOverview => ({
  __component: "programs.analytics-overview",
  analytics: (s?.analytics ?? []).map(toAnalytic),
});



export async function fetchProgramsHealthPage(): Promise<HealthSections | null> {
  const pageRes = await fetchProgramsHealthSections();
  const page = pageRes?.data?.[0];

  console.log("RAW HEALTH PAGE DATA:", page);

  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const serviceRaw = sections.find(
    (s: any) => s.__component === "programs.service-overview"
  ) as any;

  const partnerRaw = sections.find(
    (s: any) => s.__component === "programs.partner-section"
  ) as any;

  const galleryRaw = sections.find(
    (s: any) => s.__component === "common.gallery-carousel"
  ) as any;

    const analyticsRaw = sections.find(
    (s: any) => s.__component === "programs.analytics-overview"
    ) as any;

  const hero = toHero(heroRaw ?? {});
  const serviceSection = toServiceOverview(serviceRaw ?? {});
  const partnerSection = toPartnerSection(partnerRaw ?? {});
  const gallerySection = toGalleryCarousel(galleryRaw ?? {});
  const analyticsSection: AnalyticsOverview = analyticsRaw
  ? toAnalyticsSection(analyticsRaw)
  : {
      __component: "programs.analytics-overview",
      analytics: [] as Analytic[],
    };




  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    serviceSection,
    partnerSection,
    gallerySection,
    analyticsSection,
  };
}