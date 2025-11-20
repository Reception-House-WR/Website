import { Button } from "../models/common/button";
import { ButtonSection } from "../models/common/buttonSection";
import { Hero } from "../models/common/hero";
import { IconCard } from "../models/common/iconCard";
import { Campaign } from "../models/donate/campaign";
import { CampaignsSection } from "../models/donate/campaignsSection";
import { DonateSections } from "../models/donate/donateSections";
import { DropOffCard } from "../models/donate/dropOffCard";
import { List } from "../models/donate/list";
import { ListCardSection } from "../models/donate/listCardSection";
import { CardsSection } from "../models/getInvolved/cardsSection";
import { Item } from "../models/programs/item";
import { StrapiImageResponse } from "../models/strapi/image";
import { fetchDonatePageSections } from "../services/donateService";

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

/* ---------- campaigns section ---------- */

const toCampaign = (c: any): Campaign => ({
  name: c?.name ?? "",
  description: c?.description ?? "",
  raised: c?.raised ?? 0,
  goal: c?.goal ?? 0,
  image:
    (c?.image as StrapiImageResponse | undefined)?.url ?? "", // string url
  buttonURL: c?.buttonURL ?? "",
  buttonLabel: c?.buttonLabel ?? "",
});

const toCampaignsSection = (s: any): CampaignsSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  // ojo: tu interfaz se llama cammpaigns (con doble m)
  cammpaigns: (s?.campaigns ?? []).map(toCampaign),
});

/* ---------- whereHelps: cards section ---------- */

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

/* ---------- in-kind donations: list cards ---------- */

const toItem = (i: any): Item => ({
  value: i?.value ?? "",
});

const toList = (l: any): List => ({
  title: l?.title ?? "",
  items: (l?.items ?? []).map(toItem),
});

const toListCardSection = (s: any): ListCardSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map(toList),
});

/* ---------- drop-off card ---------- */

const toDropOffCard = (s: any): DropOffCard => ({
  title: s?.title ?? "",
  note: s?.note ?? "",
  subtitle: s?.subtitle ?? "",
  items: (s?.items ?? []).map(toItem),
  bottomText: s?.bottomText ?? "",
});

/* ---------- bottom general button section ---------- */

const toButtonSection = (s: any): ButtonSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  button: toButton(s?.button ?? {}),
});


export async function fetchDonationPage(): Promise<DonateSections | null> {
  const pageRes = await fetchDonatePageSections();
  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero",
  ) as any;

  const campaignsRaw = sections.find(
    (s: any) => s.__component === "donate.campaigns",
  ) as any;

  const whereHelpsRaw = sections.find(
    (s: any) => s.__component === "get-involved.cards-section",
  ) as any;

  const inKindRaw = sections.find(
    (s: any) => s.__component === "donate.list-cards-section",
  ) as any;

  const dropOffRaw = sections.find(
    (s: any) => s.__component === "donate.drop-off-card",
  ) as any;

  const bottomRaw = sections.find(
    (s: any) => s.__component === "common.button-section",
  ) as any;

  const hero = toHero(heroRaw ?? {});
  const campaignsSection = toCampaignsSection(campaignsRaw ?? {});
  const whereHelpsSection = toCardsSection(whereHelpsRaw ?? {});
  const inKindDonationsSection = toListCardSection(inKindRaw ?? {});
  const dropOffSection = toDropOffCard(dropOffRaw ?? {});
  const bottomGeneralSection = toButtonSection(bottomRaw ?? {});

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    campaignsSection,
    whereHelpsSection,
    inKindDonationsSection,
    dropOffSection,
    bottomGeneralSection,
  };
}