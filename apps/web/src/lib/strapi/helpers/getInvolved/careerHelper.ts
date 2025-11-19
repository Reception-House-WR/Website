import { Hero } from "../../models/common/hero";
import { IconCard } from "../../models/common/iconCard";
import { Section } from "../../models/common/section";
import { BenefitCard } from "../../models/getInvolved/benefitCard";
import { BenefitCardSection } from "../../models/getInvolved/benefitCardSection";
import { CardsSection } from "../../models/getInvolved/cardsSection";
import { CareersSections } from "../../models/getInvolved/careersSection";
import { JobOpening } from "../../models/getInvolved/jobPosting";
import { StrapiImageResponse } from "../../models/strapi/image";
import { fetchGetInvolvedCareersPageSections, fetchJobOpenings } from "../../services/getInvolved/careersService";

const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toSection = (s: any): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

const toIconCard = (c: any): IconCard => ({
  title: c?.title ?? "",
  description: c?.description ?? "",
  icon: c?.icon ?? "",
  button: {
    label: c?.button?.label ?? "",
    url: c?.button?.url ?? "",
  },
});

const toCardsSection = (s: any): CardsSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map(toIconCard),
});

const toBenefitCard = (b: any): BenefitCard => ({
  title: b?.title ?? "",
  description: b?.description ?? "",
  icon: b?.icon ?? "",
  backgroundImageUrl:
    (b?.backgroundImage as StrapiImageResponse | undefined)?.url ?? "",
});

const toBenefitCardSection = (s: any): BenefitCardSection => ({
  title: s?.title ?? "",
  benefits: (s?.benefits ?? []).map(toBenefitCard),
});

const toJobOpening = (j: any): JobOpening => ({
  role: j?.role ?? "",
  description: j?.description ?? "",
  department: j?.department ?? "",
  contract: j?.contract ?? "",
  mode: j?.mode ?? "",
  url: j?.url ?? "",
});

export async function fetchCareersPage(): Promise<CareersSections | null> {
  const [pageRes, jobsRes] = await Promise.all([
    fetchGetInvolvedCareersPageSections(),
    fetchJobOpenings(),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero",
  ) as any;

  const workingRaw = sections.find(
    (s: any) => s.__component === "get-involved.cards-section",
  ) as any;

  const benefitsRaw = sections.find(
    (s: any) => s.__component === "get-involved.benefits-card-section",
  ) as any;

  const openingsSectionRaw = sections.find(
    (s: any) => s.__component === "common.section",
  ) as any;

  const hero = toHero(heroRaw ?? {});
  const workingHereSection = toCardsSection(workingRaw ?? {});
  const benefitsSection = toBenefitCardSection(benefitsRaw ?? {});
  const openingsSection = {
    section: toSection(openingsSectionRaw ?? {}),
    jobs: (jobsRes?.data ?? []).map(toJobOpening),
  };

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    workingHereSection,
    benefitsSection,
    openingsSection,
  };
}