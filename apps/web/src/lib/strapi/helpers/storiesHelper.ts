import { Hero } from "../models/common/hero";
import { Section } from "../models/common/section";
import { StoriesSections } from "../models/stories/storiesSection";
import { Story } from "../models/stories/story";
import { fetchStories, fetchStoriesPageSections } from "../services/storiesService";

const toHero = (s: any): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url ?? null,
});

const toSection = (s: any): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

const toStory = (st: any): Story => ({
  author: st?.author ?? "",
  country: st?.country ?? "",
  quote: st?.quote ?? "",
  image: st?.image?.url ?? null,
  videoUrl: st?.videoUrl ?? null
});

export async function fetchStoriesPage(): Promise<StoriesSections | null> {
  const [pageRes, storiesRes] = await Promise.all([
    fetchStoriesPageSections(),
    fetchStories(), 
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  console.log(storiesRes)
  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero"
  ) as any;

  const sectionRaw = sections.find(
    (s: any) => s.__component === "common.section"
  ) as any;

  const hero = toHero(heroRaw ?? {});
  const section = toSection(sectionRaw ?? {});
  const stories: Story[] = (storiesRes?.data ?? []).map(toStory);

  return {
    title: page.title,
    identifier: page.identifier,
    hero,
    body: {
      section,
      stories,
    },
  };
}