import { Button } from "../../models/common/button";
import { Hero } from "../../models/common/hero";
import { IconCard } from "../../models/common/iconCard";
import { BenefitCard } from "../../models/getInvolved/benefitCard";
import { BenefitCardSection } from "../../models/getInvolved/benefitCardSection";
import { CardsSection } from "../../models/getInvolved/cardsSection";
import { VolunteerSections } from "../../models/getInvolved/volunteerSections";
import { VolunteerTestimonial } from "../../models/getInvolved/volunteerTestimonial";
import { VolunteerTestimonialCarousel } from "../../models/getInvolved/volunteerTestimonialCarousel";
import { StrapiImageResponse } from "../../models/strapi/image";
import { fetchGetInvolvedVolunteerPageSections } from "../../services/getInvolved/volunteerService";

const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toButton = (b: any): Button => ({
  label: b?.label ?? "",
  url: b?.url ?? "",
});

const toIconCard = (c: any): IconCard => ({
  title: c?.title ?? "",
  description: c?.description ?? "",
  icon: c?.icon ?? "",
  button: toButton(c?.button ?? {}),
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

const toVolunteerTestimonial = (t: any): VolunteerTestimonial => ({
  name: t?.name ?? "",
  role: t?.role ?? "",
  quote: t?.quote ?? "",
  imageUrl:
    (t?.image as StrapiImageResponse | undefined)?.url ?? "",
});

const toVolunteerTestimonialCarousel = (
  s: any,
): VolunteerTestimonialCarousel => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  testimonials: (s?.testimonials ?? []).map(toVolunteerTestimonial),
});

export async function fetchGetInvolvedVolunteerPage(): Promise<VolunteerSections | null> {
  const pageRes = await fetchGetInvolvedVolunteerPageSections();
  const page = pageRes?.data?.[0];

  console.log(page)
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero",
  ) as any;

  const cardsSectionsRaw = sections.filter(
    (s: any) => s.__component === "get-involved.cards-section",
  ) as any[];

  const vomeRaw = cardsSectionsRaw[0];
  const opportunitiesRaw = cardsSectionsRaw[1];

  const benefitsRaw = sections.find(
    (s: any) => s.__component === "get-involved.benefits-card-section",
  ) as any;

  const testimonialsRaw = sections.find(
    (s: any) =>
      s.__component === "get-involved.volunteer-testimonials-carousel",
  ) as any;

  const hero = toHero(heroRaw ?? {});
  const vomeSection = toCardsSection(vomeRaw ?? {});
  const opportunitiesSection = toCardsSection(opportunitiesRaw ?? {});
  const whyVolunteerSection = toBenefitCardSection(benefitsRaw ?? {});
  const testimonialsSection = testimonialsRaw
    ? toVolunteerTestimonialCarousel(testimonialsRaw)
    : { title: "", description: "", testimonials: [] };

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    vomeSection,
    whyVolunteerSection,
    opportunitiesSection,
    testimonialsSection,
  };
}