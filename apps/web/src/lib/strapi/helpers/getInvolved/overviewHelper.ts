import { Button } from "../../models/common/button";
import { ButtonSection } from "../../models/common/buttonSection";
import { Hero } from "../../models/common/hero";
import { IconCard } from "../../models/common/iconCard";
import { CardsSection } from "../../models/getInvolved/cardsSection";
import { overviewSections } from "../../models/getInvolved/overviewSections";
import { fetchGetInvolvedOverviewPageSections } from "../../services/getInvolved/overviewService";

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

const toButtonSection = (s: any): ButtonSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  button: toButton(s?.button ?? {}),   
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


export async function fetchGetInvolvedOverviewPage(): Promise<overviewSections | null> {
  const pageRes = await fetchGetInvolvedOverviewPageSections();
  const page = pageRes?.data?.[0];

  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const impactRaw = sections.find(
    (s: any) => s.__component === "common.button-section"
  ) as any;

  const waysRaw = sections.find(
    (s: any) => s.__component === "get-involved.cards-section"
  ) as any;

  const hero = toHero(heroRaw ?? {});
  const impactSection = toButtonSection(impactRaw ?? {});
  const waysSection = toCardsSection(waysRaw ?? {});

  return {
    identifier: page.identifier,
    title: page.title,
    hero,
    impactSection,
    waysSection,
  };
}