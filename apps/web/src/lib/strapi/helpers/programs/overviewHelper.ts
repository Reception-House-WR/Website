import { Hero } from "../../models/common/hero";
import { Cards } from "../../models/programs/cards";
import { InfoCard } from "../../models/programs/infoCard";
import { Item } from "../../models/programs/item";
import { OurPrograms } from "../../models/programs/ourPrograms";
import { ProgramSections } from "../../models/programs/programSections";
import { fetchProgramsOverviewections } from "../../services/programs/overviewService";

type RawItem = {
  value?: string;
};

type RawInfoCard = {
  title?: string;
  subtitle?: string;
  description?: string;
  subtitle2?: string;
  items?: RawItem[];
  description2?: string;
};

type RawStrapiSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
  cards?: RawInfoCard[] | unknown[]; 
  topDescription?: string;
  bottomDescription?: string;
};

const toHero = (s?: RawStrapiSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url,
});

const toCardsSection = (s?: RawStrapiSection): Cards => ({
  cards: (s?.cards ?? []) as Cards["cards"],
});

const toItem = (i: RawItem): Item => ({
  value: i.value ?? "",
});

const toInfoCard = (c: RawInfoCard): InfoCard => ({
  title: c.title ?? "",
  subtitle: c.subtitle ?? "",
  description: c.description ?? "",
  subtitle2: c.subtitle2 ?? "",
  items: (c.items ?? []).map(toItem),
  description2: c.description2 ?? "",
});

const toOurProgramsSection = (s?: RawStrapiSection): OurPrograms => ({
  title: s?.title ?? "",
  topDescription: s?.topDescription ?? "",
  bottomDescription: s?.bottomDescription ?? "",
  cards: (s?.cards ?? []).map((card) =>
    toInfoCard(card as RawInfoCard),
  ),
});

export async function fetchProgramsOverviewPage(): Promise<ProgramSections | null> {
  const pageRes = await fetchProgramsOverviewections();

  console.log("Raw Programs Overview Page Response:", pageRes);
  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStrapiSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero",
  );

  const servicesRaw = sections.find(
    (s) => s.__component === "programs.cards",
  );

  const ourProgramsRaw = sections.find(
    (s) => s.__component === "programs.our-programs",
  );

  const hero = toHero(heroRaw);
  const servicesSection = toCardsSection(servicesRaw);
  const ourProgramsSection = toOurProgramsSection(ourProgramsRaw);

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    servicesSection,
    ourProgramsSection,
  };
}