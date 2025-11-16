import { AboutImpact } from "../../models/about/impact";
import { OurPurposeSections } from "../../models/about/ourPurposeSections";
import { Priority } from "../../models/about/priority";
import { AboutReport } from "../../models/about/report";
import { Value } from "../../models/about/value";
import { Hero } from "../../models/common/hero";
import { Section } from "../../models/common/section";
import { fetchAboutOurPurpose, fetchPriorities, fetchReports, fetchValues } from "../../services/about/ourPurposeService";

export async function fetchOurPurposePage(): Promise<OurPurposeSections | null> {
  const [pageRes, valuesRes, prioritiesRes, reportsRes] = await Promise.all([
    fetchAboutOurPurpose(),
    fetchValues(),
    fetchPriorities(),
    fetchReports(),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  // --- helpers ---

  const toSection = (s: any): Section => ({
    id: s?.id ?? 0,
    __component: "common.section",
    title: s?.title ?? "",
    description: s?.description ?? "",
  });

  const toHero = (s: any): Hero => ({
    id: s?.id ?? 0,
    __component: "common.hero",
    title: s?.title ?? "",
    description: s?.description ?? "",
    backgroundImageUrl: s?.backgroundImage?.[0]?.url, // en este caso puede venir undefined
  });

  const toImpact = (s: any): AboutImpact => ({
    title: s?.title ?? "",
    description: s?.description ?? "",
    videoUrl: s?.videoUrl ?? "",
  });

  const toDocument = (r: any): AboutReport => {
  const doc = r?.document ?? {};

    return {
        name: r?.name ?? "",
        description: r?.description ?? "",
        document: {
        name: doc?.name ?? "",
        ext: doc?.ext ?? "",
        size: doc?.size ?? 0,
        url: doc?.url ?? "",
        },
    };
    };


  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const impactRaw = sections.find(
    (s: any) => s.__component === "about.impact"
  ) as any;

  const commonSections = sections.filter(
    (s: any) => s.__component === "common.section"
  ) as any[];

  // order: 
  // [0] mission, [1] vision, [2] values, [3] strategic priorities, [4] transparency
  const missionRaw = commonSections[0];
  const visionRaw = commonSections[1];
  const valuesSectionRaw = commonSections[2];
  const prioritiesSectionRaw = commonSections[3];
  const transparencySectionRaw = commonSections[4];

  const values: Value[] = (valuesRes?.data ?? []).map((v: any) => ({
    name: v.name,
    description: v.description,
  }));

  const priorities: Priority[] = (prioritiesRes?.data ?? []).map((p: any) => ({
    priority: p.priority,
    description: p.description,
  }));

  const reports: AboutReport[] = (reportsRes?.data ?? []).map(toDocument);

  // --- final object 

  return {
    title: page.title,
    identifier: page.identifier,

    hero: toHero(heroRaw),

    missionAndVissionSection: {
      mission: toSection(missionRaw),
      vision: toSection(visionRaw),
    },

    valuesSection: {
      section: toSection(valuesSectionRaw),
      values,
    },

    strategicPrioritiesSection: {
      section: toSection(prioritiesSectionRaw),
      priorities,
    },

    ourImpactSection: impactRaw ? toImpact(impactRaw) : {
      title: "",
      description: "",
      videoUrl: "",
    },

    transparencyAndAccountabilitySection: {
      section: toSection(transparencySectionRaw),
      reports,
    },
  };
}