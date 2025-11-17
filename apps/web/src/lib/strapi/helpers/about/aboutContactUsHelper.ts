import { contactInfo } from "../../models/about/contactInfo";
import { ContactUsSections } from "../../models/about/contactUsSections";
import { Card } from "../../models/common/card";
import { Hero } from "../../models/common/hero";
import { Section } from "../../models/common/section";
import { StrapiImageResponse } from "../../models/strapi/image";
import { fetchAboutContactUs } from "../../services/about/contactUsService";


const toSection = (s: any): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

const toContactInfo = (s: any): contactInfo => ({
  title: s?.title ?? "",
  value: s?.description ?? "",
});

const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toCard = (c: any): Card => ({
  id: c?.id ?? 0,
  __component: "common.card",
  title: c?.title ?? "",
  description: c?.description ?? "",
  image: (c?.image as StrapiImageResponse) ?? null,
  buttonLabel: c?.buttonLabel ?? "",
  buttonUrl: c?.buttonUrl ?? "",
});

export async function fetchContactUsPage(): Promise<ContactUsSections | null> {
  const pageRes = await fetchAboutContactUs();
  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const cardRaw = sections.find(
    (s: any) => s.__component === "common.card"
  ) as any;

  const sectionRaws = sections.filter(
    (s: any) => s.__component === "common.section"
  ) as any[];

  // [0] -> principal section (title + description)
  // [1..n] -> items of contct (phone, email, address, etc.)
  const infoSectionRaw = sectionRaws[0];
  const contactInfoRaws = sectionRaws.slice(1);

  const hero = toHero(heroRaw ?? {});
  const parkingSection = toCard(cardRaw ?? {});
  const contactInfoSection = infoSectionRaw ? toSection(infoSectionRaw) : toSection({});

  const contactInfo: contactInfo[] = contactInfoRaws.map((s) =>
    toContactInfo(s)
  );

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    contactUsInfoSection: {
      title: contactInfoSection.title,
      description: contactInfoSection.description,
      contactInfo,
    },
    parkingSection,
  };
}