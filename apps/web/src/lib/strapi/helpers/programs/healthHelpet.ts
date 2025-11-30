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

type RawFeature = {
  title?: string;
  description?: string;
  icon?: string;
};

type RawPartner = {
  name?: string;
  logo?: StrapiImageResponse;
  url?: string;
};

type RawImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
};

type RawAnalytic = {
  metric?: string;
  description?: string;
};

type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
  features?: RawFeature[];
  partners?: RawPartner[];
  gallery?: RawImage[];
  analytics?: RawAnalytic[];
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

const toPartner = (p: RawPartner): Partner => ({
  name: p.name ?? "",
  logo:
    p.logo ?? {
      url: "",
      alternativeText: null,
      caption: null,
    },
  url: p.url ?? "",
});

const toPartnerSection = (s?: RawStrapiSection): PartnerSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  partners: (s?.partners ?? []).map(toPartner),
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

const toAnalytic = (a: RawAnalytic): Analytic => ({
  metric: a.metric ?? "",
  description: a.description ?? "",
});

const toAnalyticsSection = (s?: RawStrapiSection): AnalyticsOverview => ({
  __component: "programs.analytics-overview" as const,
  analytics: (s?.analytics ?? []).map(toAnalytic),
});

export async function fetchProgramsHealthPage(locale: string): Promise<HealthSections | null> {
  const pageRes = await fetchProgramsHealthSections(locale);
  const page = pageRes?.data?.[0];

  console.log("RAW HEALTH PAGE DATA:", page);

  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero"
  );

  const serviceRaw = sections.find(
    (s) => s.__component === "programs.service-overview"
  );

  const partnerRaw = sections.find(
    (s) => s.__component === "programs.partner-section"
  );

  const galleryRaw = sections.find(
    (s) => s.__component === "common.gallery-carousel"
  );

  const analyticsRaw = sections.find(
    (s) => s.__component === "programs.analytics-overview"
  );

  const hero = toHero(heroRaw);
  const serviceSection = toServiceOverview(serviceRaw);
  const partnerSection = toPartnerSection(partnerRaw);
  const gallerySection = toGalleryCarousel(galleryRaw);
  const analyticsSection: AnalyticsOverview = analyticsRaw
    ? toAnalyticsSection(analyticsRaw)
    : {
        __component: "programs.analytics-overview",
        analytics: [],
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