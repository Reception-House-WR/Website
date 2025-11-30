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

type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  subtitle?: string;
  subtitle2?: string;
  description2?: string;
  backgroundImage?: { url?: string }[];

  cards?: RawInfoCard[];
  items?: RawItem[];
  steps?: RawStep[];
  image?: StrapiImageResponse;
  button?: RawButton;
};

type RawItem = {
  value?: string;
};

type RawButton = {
  label?: string;
  url?: string;
};

type RawInfoCard = {
  title?: string;
  subtitle?: string;
  description?: string;
  subtitle2?: string;
  description2?: string;
  items?: RawItem[];
};

type RawStep = {
  key?: string;
  value?: string;
};

//MAPPERS 

const toHero = (s?: RawStrapiSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url,
});

const toItem = (i: RawItem): Item => ({
  value: i.value ?? "",
});

const toInfoCard = (s: RawInfoCard): InfoCard => ({
  title: s.title ?? "",
  subtitle: s.subtitle ?? "",
  description: s.description ?? "",
  subtitle2: s.subtitle2 ?? "",
  items: (s.items ?? []).map(toItem),
  description2: s.description2 ?? "",
});

const toFrenchOverview = (s?: RawStrapiSection): FrenchOverview => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map((c) => toInfoCard(c)),
});

const toButton = (b?: RawButton): Button => ({
  label: b?.label ?? "",
  url: b?.url ?? "",
});

const toProgramCard = (p: RawStrapiSection): ProgramCard => ({
  time: (p as any)?.time ?? "",
  title: p.title ?? "",
  description: p.description ?? "",
  steps: (p.steps ?? []).map((st) => ({
    key: st.key ?? "",
    value: st.value ?? "",
  })),
  image: p.image ?? { url: "", alternativeText: null, caption: null },
  button: p.button ? toButton(p.button) : undefined,
});

const toCard = (c: RawStrapiSection): Card => ({
  __component: "common.card",
  id: c.id ?? 0,
  title: c.title ?? "",
  description: c.description ?? "",
  image: c.image,
  buttonLabel: (c as any).buttonLabel ?? "",
  buttonUrl: (c as any).buttonURL ?? "",
});

//---------------- MAIN FUNCTION ----------------

export async function fetchProgramsFrenchPage(locale: string): Promise<FrenchSections | null> {
  const pageRes = await fetchProgramsFrenchections(locale);
  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find((s) => s.__component === "common.hero");
  const overviewRaw = sections.find((s) => s.__component === "programs.french-overview");

  const programCardsRaw = sections.filter(
    (s) => s.__component === "programs.program-card"
  );

  const bottomCardRaw = sections.find((s) => s.__component === "common.card");

  const cafeRaw = programCardsRaw[0];
  const resourcesRaw = programCardsRaw[1];

  const hero = toHero(heroRaw);
  const overvireSection = toFrenchOverview(overviewRaw);
  const servicesSection = {
    cafe: toProgramCard(cafeRaw ?? {}),
    resources: toProgramCard(resourcesRaw ?? {}),
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