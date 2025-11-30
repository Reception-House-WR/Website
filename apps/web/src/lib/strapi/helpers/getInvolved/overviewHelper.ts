import { Button } from "../../models/common/button";
import { ButtonSection } from "../../models/common/buttonSection";
import { Hero } from "../../models/common/hero";
import { IconCard } from "../../models/common/iconCard";
import { CardsSection } from "../../models/getInvolved/cardsSection";
import { overviewSections } from "../../models/getInvolved/overviewSections";
import { fetchGetInvolvedOverviewPageSections } from "../../services/getInvolved/overviewService";

type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
  button?: RawButton;
  cards?: RawIconCard[];
};

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

const toHero = (s?: RawStrapiSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? undefined,
});

const toButton = (b?: RawButton): Button => ({
  label: b?.label ?? "",
  url: b?.url ?? "",
});

const toButtonSection = (s?: RawStrapiSection): ButtonSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  button: toButton(s?.button),
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

export async function fetchGetInvolvedOverviewPage(locale: string): Promise<overviewSections | null> {
  const pageRes = await fetchGetInvolvedOverviewPageSections(locale);
  const page = pageRes?.data?.[0];

  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero"
  );

  const impactRaw = sections.find(
    (s) => s.__component === "common.button-section"
  );

  const waysRaw = sections.find(
    (s) => s.__component === "get-involved.cards-section"
  );

  const hero = toHero(heroRaw);
  const impactSection = toButtonSection(impactRaw);
  const waysSection = toCardsSection(waysRaw);

  return {
    identifier: page.identifier,
    title: page.title,
    hero,
    impactSection,
    waysSection,
  };
}