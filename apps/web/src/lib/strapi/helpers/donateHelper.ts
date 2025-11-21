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

type RawHero = {
  id?: number;
  title?: string;
  description?: string;
  backgroundImage?: { url?: string }[];
};

type RawButton = {
  label?: string;
  url?: string;
};

type RawCampaign = {
  name?: string;
  description?: string;
  raised?: number;
  goal?: number;
  image?: StrapiImageResponse;
  buttonURL?: string;
  buttonLabel?: string;
};

type RawIconCard = {
  title?: string;
  description?: string;
  icon?: string;
  button?: RawButton;
};

type RawListItem = { value?: string };

type RawList = {
  title?: string;
  items?: RawListItem[];
};

type RawDropOff = {
  title?: string;
  note?: string;
  subtitle?: string;
  items?: RawListItem[];
  bottomText?: string;
};

type RawListCardSection = {
  title?: string;
  description?: string;
  cards?: RawList[];
};

type RawButtonSection = {
  title?: string;
  description?: string;
  button?: RawButton;
};

type RawCampaignsSection = {
  title?: string;
  description?: string;
  campaigns?: RawCampaign[];
};

type RawCardsSection = {
  title?: string;
  description?: string;
  cards?: RawIconCard[];
};

type RawSection = {
  __component?: string;
} & RawHero &
  RawCampaignsSection &
  RawCardsSection &
  RawListCardSection &
  RawDropOff &
  RawButtonSection;


// ---------- MAPPERS ---------- //

const toHero = (s: any): Hero => ({
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

// Campaign card
const toCampaign = (c: RawCampaign): Campaign => ({
  name: c.name ?? "",
  description: c.description ?? "",
  raised: c.raised ?? 0,
  goal: c.goal ?? 0,
  image: c.image?.url ?? "",
  buttonURL: c.buttonURL ?? "",
  buttonLabel: c.buttonLabel ?? "",
});

// Campaigns section
const toCampaignsSection = (s?: RawCampaignsSection): CampaignsSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  cammpaigns: (s?.campaigns ?? []).map(toCampaign),
});

// IconCard
const toIconCard = (c: RawIconCard): IconCard => ({
  title: c.title ?? "",
  description: c.description ?? "",
  icon: c.icon ?? "",
  button: toButton(c.button),
});

// Cards section
const toCardsSection = (s?: RawCardsSection): CardsSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map(toIconCard),
});

// List item
const toItem = (i: RawListItem): Item => ({
  value: i.value ?? "",
});

// List block
const toList = (l: RawList): List => ({
  title: l.title ?? "",
  items: (l.items ?? []).map(toItem),
});

// List card section
const toListCardSection = (s?: RawListCardSection): ListCardSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  cards: (s?.cards ?? []).map(toList),
});

// Drop-off card
const toDropOffCard = (s?: RawDropOff): DropOffCard => ({
  title: s?.title ?? "",
  note: s?.note ?? "",
  subtitle: s?.subtitle ?? "",
  items: (s?.items ?? []).map(toItem),
  bottomText: s?.bottomText ?? "",
});

// Button section
const toButtonSection = (s?: RawButtonSection): ButtonSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  button: toButton(s?.button),
});


// ---------- MAIN FETCH ---------- //

export async function fetchDonationPage(): Promise<DonateSections | null> {
  const pageRes = await fetchDonatePageSections();
  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawSection[];

  const hero = toHero(sections.find(s => s.__component === "common.hero"));

  const campaignsSection = toCampaignsSection(
    sections.find(s => s.__component === "donate.campaigns"),
  );

  const whereHelpsSection = toCardsSection(
    sections.find(s => s.__component === "get-involved.cards-section"),
  );

  const inKindDonationsSection = toListCardSection(
    sections.find(s => s.__component === "donate.list-cards-section"),
  );

  const dropOffSection = toDropOffCard(
    sections.find(s => s.__component === "donate.drop-off-card"),
  );

  const bottomGeneralSection = toButtonSection(
    sections.find(s => s.__component === "common.button-section"),
  );

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