import { Hero } from "../../models/common/hero";
import { Cards } from "../../models/programs/cards";
import { InfoCard } from "../../models/programs/infoCard";
import { Item } from "../../models/programs/item";
import { OurPrograms } from "../../models/programs/ourPrograms";
import { ProgramSections } from "../../models/programs/programSections";
import { fetchProgramsOverviewections } from "../../services/programs/overviewService";



const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toCardsSection = (s: any): Cards => ({
  cards: (s?.cards ?? []) as any,
});

const toItem = (i: any): Item => ({
  value: i?.value ?? "",
});

const toInfoCard = (c: any): InfoCard => ({
  title: c?.title ?? "",
  subtitle: c?.subtitle ?? "",
  description: c?.description ?? "",
  subtitle2: c?.subtitle2 ?? "",
  items: (c?.items ?? []).map(toItem),
});

const toOurProgramsSection = (s: any): OurPrograms => ({
  title: s?.title ?? "",
  topDescription: s?.topDescription ?? "",
  bottomDescription: s?.bottomDescription ?? "",
  cards: (s?.cards ?? []).map(toInfoCard),
});

export async function fetchProgramsOverviewPage(): Promise<ProgramSections | null> {
  const pageRes = await fetchProgramsOverviewections();

  console.log("Raw Programs Overview Page Response:", pageRes);
  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const servicesRaw = sections.find(
    (s: any) => s.__component === "programs.cards"
  ) as any;

  const ourProgramsRaw = sections.find(
    (s: any) => s.__component === "programs.our-programs"
  ) as any;

  const hero = toHero(heroRaw ?? {});
  const servicesSection = toCardsSection(servicesRaw ?? {});
  const ourProgramsSection = toOurProgramsSection(ourProgramsRaw ?? {});

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    servicesSection,
    ourProgramsSection,
  };
}
