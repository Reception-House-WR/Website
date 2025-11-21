import { Hero } from "../../models/common/hero";
import { ListCard } from "../../models/common/listCard";
import { SimpleCard } from "../../models/common/simpleCard";
import { BenefitsSection } from "../../models/programs/benefitsSection";
import { CardsCarousel } from "../../models/programs/cardsCarousel";
import { EmploymentSections } from "../../models/programs/employmentSections";
import { StrapiImageResponse } from "../../models/strapi/image";
import { fetchProgramsEmploymentSections } from "../../services/programs/employmentService";

type RawListItem = {
  key?: string;
  value?: string;
};

type RawListCard = {
  title?: string;
  description?: string;
  items?: RawListItem[];
};

type RawSimpleCard = {
  title?: string;
  description?: string;
  image?: StrapiImageResponse;
};

type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
  cards?: RawSimpleCard[];
  card?: RawListCard;
  buttonLabel?: string;
  bottomDescription?: string;
};

const toHero = (s?: RawStrapiSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? undefined,
});

const toSimpleCard = (c: RawSimpleCard): SimpleCard => ({
  __component: "common.simple-card",
  title: c.title ?? "",
  description: c.description ?? "",
  image: c.image ?? { url: "", alternativeText: null, caption: null },
});

const toCardsCarousel = (s?: RawStrapiSection): CardsCarousel => ({
  __component: "common.cards-carousel",
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map((card) => toSimpleCard(card)),
});

const toListCard = (c: RawListCard): ListCard => ({
  title: c.title ?? "",
  description: c.description ?? "",
  items: (c.items ?? []).map((it) => ({
    key: it.key ?? "",
    value: it.value ?? "",
  })),
});

const toBenefitsSection = (s?: RawStrapiSection): BenefitsSection => ({
  __component: "programs.benefits-section",
  title: s?.title ?? "",
  description: s?.description ?? "",
  card: toListCard(s?.card ?? { items: [] }),
  buttonLabel: s?.buttonLabel ?? "",
  bottomDescription: s?.bottomDescription ?? "",
});

export async function fetchProgramsEmploymentPage(): Promise<EmploymentSections | null> {
  const pageRes = await fetchProgramsEmploymentSections();
  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero"
  );

  const featuresRaw = sections.find(
    (s) => s.__component === "common.cards-carousel"
  );

  const benefitsRaw = sections.find(
    (s) => s.__component === "programs.benefits-section"
  );

  const hero = toHero(heroRaw);
  const featuresSection = toCardsCarousel(featuresRaw);
  const benefitsSection = toBenefitsSection(benefitsRaw);

  return {
    identifier: page.identifier,
    title: page.title,
    hero,
    featuresSection,
    benefitsSection,
  };
}