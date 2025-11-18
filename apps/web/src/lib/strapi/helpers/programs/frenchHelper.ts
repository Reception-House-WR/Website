import { Button } from "../../models/common/button";
import { Card } from "../../models/common/card";
import { Hero } from "../../models/common/hero";
import { FrenchOverview } from "../../models/programs/frenchOverview";
import { FrenchSections } from "../../models/programs/frenchSections";
import { InfoCard } from "../../models/programs/infoCard";
import { Item } from "../../models/programs/item";
import { ProgramCard } from "../../models/programs/programCard";
import { StrapiImageResponse } from "../../models/strapi/image";
import { fetchProgramsFrenchections } from "../../services/programs/frenchService";

const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toItem = (i: any): Item => ({
  value: i?.value ?? "",
});

const toInfoCard = (s: any): InfoCard => ({
  title: s?.title ?? "",
  subtitle: s?.subtitle ?? "",
  description: s?.description ?? "",
  subtitle2: s?.subtitle2 ?? "",
  items: (s?.items ?? []).map(toItem),
  description2: s?.description2 ?? "",
});

const toFrenchOverview = (s: any): FrenchOverview => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map(toInfoCard),
});

const toButton = (b: any): Button => ({
  label: b?.label ?? "",
  url: b?.url ?? "",
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
  button: p?.button ? toButton(p.button) : undefined,
});

const toCard = (c: any): Card => ({
  __component: "common.card",
  id: c?.id ?? 0,
  title: c?.title ?? "",
  description: c?.description ?? "",
  image: (c?.image as StrapiImageResponse) ?? undefined,
  buttonLabel: c?.buttonLabel ?? "",
  buttonUrl: c?.buttonURL ?? "",
});


export async function fetchProgramsFrenchPage(): Promise<FrenchSections | null> {
  const pageRes = await fetchProgramsFrenchections();
  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const overviewRaw = sections.find(
    (s: any) => s.__component === "programs.french-overview"
  ) as any;

  const programCardsRaw = sections.filter(
    (s: any) => s.__component === "programs.program-card"
  ) as any[];

  const bottomCardRaw = sections.find(
    (s: any) => s.__component === "common.card"
  ) as any;

  const cafeRaw = programCardsRaw[0] ?? {};
  const resourcesRaw = programCardsRaw[1] ?? {};

  const hero = toHero(heroRaw ?? {});
  const overvireSection = toFrenchOverview(overviewRaw ?? {}); 
  const servicesSection = {
    cafe: toProgramCard(cafeRaw),
    resources: toProgramCard(resourcesRaw),
  };
  const bottomCard = bottomCardRaw ? toCard(bottomCardRaw) : toCard({});

  return {
    identifier: page.identifier,
    title: page.title,
    hero,
    overvireSection,
    servicesSection,
    bottomCard,
  };
}