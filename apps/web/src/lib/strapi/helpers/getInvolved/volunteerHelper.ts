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

type RawButton = {
  label?: string;
  url?: string;
};

type RawIconCard = {
  title?: string;
  description?: string;
  icon?: string;
  button?: RawButton;
};

type RawBenefitCard = {
  title?: string;
  description?: string;
  icon?: string;
  backgroundImage?: StrapiImageResponse;
};

type RawVolunteerTestimonial = {
  name?: string;
  role?: string;
  quote?: string;
  image?: StrapiImageResponse;
};

type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
  cards?: RawIconCard[];
  benefits?: RawBenefitCard[];
  testimonials?: RawVolunteerTestimonial[];
};

const toHero = (s?: RawStrapiSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url,
});

const toButton = (b?: RawButton): Button => ({
  label: b?.label ?? "",
  url: b?.url ?? "",
});

const toIconCard = (c: RawIconCard): IconCard => ({
  title: c.title ?? "",
  description: c.description ?? "",
  icon: c.icon ?? "",
  button: toButton(c.button),
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

const toVolunteerTestimonial = (
  t: RawVolunteerTestimonial,
): VolunteerTestimonial => ({
  name: t.name ?? "",
  role: t.role ?? "",
  quote: t.quote ?? "",
  imageUrl: t.image?.url ?? "",
});

const toVolunteerTestimonialCarousel = (
  s?: RawStrapiSection,
): VolunteerTestimonialCarousel => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  testimonials: (s?.testimonials ?? []).map((t) =>
    toVolunteerTestimonial(t),
  ),
});

export async function fetchGetInvolvedVolunteerPage(locale: string): Promise<VolunteerSections | null> {
  const pageRes = await fetchGetInvolvedVolunteerPageSections(locale);
  const page = pageRes?.data?.[0];

  console.log(page);
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero",
  );

  const cardsSectionsRaw = sections.filter(
    (s) => s.__component === "get-involved.cards-section",
  );

  const vomeRaw = cardsSectionsRaw[0];
  const opportunitiesRaw = cardsSectionsRaw[1];

  const benefitsRaw = sections.find(
    (s) => s.__component === "get-involved.benefits-card-section",
  );

  const testimonialsRaw = sections.find(
    (s) =>
      s.__component === "get-involved.volunteer-testimonials-carousel",
  );

  const hero = toHero(heroRaw);
  const vomeSection = toCardsSection(vomeRaw);
  const opportunitiesSection = toCardsSection(opportunitiesRaw);
  const whyVolunteerSection = toBenefitCardSection(benefitsRaw);
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