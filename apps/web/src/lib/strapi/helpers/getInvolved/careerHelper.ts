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

type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
  cards?: RawIconCard[];
  benefits?: RawBenefitCard[];
};

type RawIconCard = {
  title?: string;
  description?: string;
  icon?: string;
  button?: {
    label?: string;
    url?: string;
  };
};

type RawBenefitCard = {
  title?: string;
  description?: string;
  icon?: string;
  backgroundImage?: StrapiImageResponse;
};

type RawJobOpening = {
  role?: string;
  description?: string;
  department?: string;
  contract?: string;
  mode?: string;
  url?: string;
};

const toHero = (s?: RawStrapiSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url,
});

const toSection = (s?: RawStrapiSection): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

const toIconCard = (c: RawIconCard): IconCard => ({
  title: c.title ?? "",
  description: c.description ?? "",
  icon: c.icon ?? "",
  button: {
    label: c.button?.label ?? "",
    url: c.button?.url ?? "",
  },
});

const toCardsSection = (s?: RawStrapiSection): CardsSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map((c) => toIconCard(c)),
});

const toBenefitCard = (b: RawBenefitCard): BenefitCard => ({
  title: b.title ?? "",
  description: b.description ?? "",
  icon: b.icon ?? "",
  backgroundImageUrl: b.backgroundImage?.url ?? "",
});

const toBenefitCardSection = (s?: RawStrapiSection): BenefitCardSection => ({
  title: s?.title ?? "",
  benefits: (s?.benefits ?? []).map((b) => toBenefitCard(b)),
});

const toJobOpening = (j: RawJobOpening): JobOpening => ({
  role: j.role ?? "",
  description: j.description ?? "",
  department: j.department ?? "",
  contract: j.contract ?? "",
  mode: j.mode ?? "",
  url: j.url ?? "",
});

export async function fetchCareersPage(locale: string): Promise<CareersSections | null> {
  const [pageRes, jobsRes] = await Promise.all([
    fetchGetInvolvedCareersPageSections(locale),
    fetchJobOpenings(locale),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero",
  );

  const workingRaw = sections.find(
    (s) => s.__component === "get-involved.cards-section",
  );

  const benefitsRaw = sections.find(
    (s) => s.__component === "get-involved.benefits-card-section",
  );

  const openingsSectionRaw = sections.find(
    (s) => s.__component === "common.section",
  );

  const hero = toHero(heroRaw);
  const workingHereSection = toCardsSection(workingRaw);
  const benefitsSection = toBenefitCardSection(benefitsRaw);
  const openingsSection = {
    section: toSection(openingsSectionRaw),
    jobs: (jobsRes?.data ?? []).map((j) => toJobOpening(j as RawJobOpening)),
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