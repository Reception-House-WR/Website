import { Hero } from "../models/common/hero";
import { Section } from "../models/common/section";
import { StoriesSections } from "../models/stories/storiesSection";
import { Story } from "../models/stories/story";
import { fetchStories, fetchStoriesPageSections } from "../services/storiesService";

type RawImage = {
  url?: string;
};

type RawStory = {
  author?: string;
  country?: string;
  quote?: string;
  image?: RawImage;
  videoUrl?: string | null;
};

type RawHeroSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
  backgroundImage?: RawImage[];
};

type RawCommonSection = {
  id?: number;
  __component?: string;
  title?: string;
  description?: string;
};

type RawStoriesPageSection =
  | RawHeroSection
  | RawCommonSection;

const toHero = (s?: RawHeroSection): Hero => ({
  id: s?.id ?? 0,
  __component: "common.hero",
  title: s?.title ?? "",
  description: s?.description ?? "",
  backgroundImageUrl: s?.backgroundImage?.[0]?.url,
});

const toSection = (s?: RawCommonSection): Section => ({
  id: s?.id ?? 0,
  __component: "common.section",
  title: s?.title ?? "",
  description: s?.description ?? "",
});

const toStory = (st: RawStory): Story => ({
  author: st.author ?? "",
  country: st.country ?? "",
  quote: st.quote ?? "",
  image: st.image?.url ?? "",
  videoUrl: st.videoUrl ?? "",
});

export async function fetchStoriesPage(locale: string): Promise<StoriesSections | null> {
  const [pageRes, storiesRes] = await Promise.all([
    fetchStoriesPageSections(locale),
    fetchStories(locale),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawStoriesPageSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero"
  ) as RawHeroSection | undefined;

  const sectionRaw = sections.find(
    (s) => s.__component === "common.section"
  ) as RawCommonSection | undefined;

  const hero = toHero(heroRaw);
  const section = toSection(sectionRaw);

  const stories: Story[] = (storiesRes?.data ?? []).map((s) =>
    toStory(s as RawStory)
  );

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