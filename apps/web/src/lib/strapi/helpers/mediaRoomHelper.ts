import { Hero } from "../models/common/hero";
import { Section } from "../models/common/section";
import { GalleryItem } from "../models/mediaRoom/galleryItem";
import { KitCard } from "../models/mediaRoom/kitCard";
import { MediaKitSection } from "../models/mediaRoom/mediaKitSection";
import { MediaRoomSections } from "../models/mediaRoom/mediaRoomSections";
import { PressRelease } from "../models/mediaRoom/pressRelease";
import { ReleasesSection } from "../models/mediaRoom/releasesSection";
import { strapiDocument } from "../models/strapi/document";
import { StrapiImageResponse } from "../models/strapi/image";
import { fetchMediaRoomPageSections, fetchGalleryItems } from "../services/mediaRoomService";

type RawImage = {
  url?: string;
  alternativeText?: string | null;
  caption?: string | null;
};

type RawBaseSection = {
  __component?: string;
};

type RawHeroSection = RawBaseSection & {
  id?: number;
  title?: string;
  description?: string;
  backgroundImage?: RawImage[];
};

type RawKitCard = {
  title?: string;
  description?: string;
  icon?: string;
  kit?: strapiDocument;
};

type RawMediaKitSection = RawBaseSection & {
  title?: string;
  description?: string;
  kits?: RawKitCard[];
};

type RawPressRelease = {
  date?: string;
  title?: string;
  shortDesc?: string;
  longDesc?: string;
  image?: RawImage;
};

type RawReleasesSection = RawBaseSection & {
  title?: string;
  description?: string;
  pressReleases?: RawPressRelease[];
};

type RawCommonSection = RawBaseSection & {
  id?: number;
  title?: string;
  description?: string;
};

type RawGalleryItem = {
  description?: string;
  isImage?: boolean;
  image?: RawImage;
  videoUrl?: string;
};

type RawSection =
  | RawHeroSection
  | RawMediaKitSection
  | RawReleasesSection
  | RawCommonSection;

/* ----------- helpers ---------- */

const toStrapiImage = (img?: RawImage): StrapiImageResponse => ({
  url: img?.url ?? "",
  alternativeText: img?.alternativeText ?? null,
  caption: img?.caption ?? null,
});

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

/* ---------- Media kit ----------- */

const toKitCard = (k: RawKitCard): KitCard => ({
  title: k.title ?? "",
  description: k.description ?? "",
  icon: k.icon ?? "",
  kit:
    k.kit ??
    ({
      url: "",
      alternativeText: null,
      caption: null,
    } as StrapiImageResponse),
});

const toMediaKitSection = (s?: RawMediaKitSection): MediaKitSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  kits: (s?.kits ?? []).map((k) => toKitCard(k)),
});

/* ------------ Press releases ---------- */

const parseDate = (value?: string): Date =>
  value && !Number.isNaN(Date.parse(value))
    ? new Date(value)
    : new Date(0);

const toPressRelease = (p: RawPressRelease): PressRelease => ({
  date: parseDate(p.date),
  title: p.title ?? "",
  shortDesc: p.shortDesc ?? "",
  longDesc: p.longDesc ?? "",
  image: toStrapiImage(p.image),
});

const toReleasesSection = (s?: RawReleasesSection): ReleasesSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  pressReleases: (s?.pressReleases ?? []).map(toPressRelease),
});

/* ---------- Gallery (photos and videos) ------------ */

const toGalleryItem = (g: RawGalleryItem): GalleryItem => ({
  description: g.description ?? "",
  isImage: !!g.isImage,
  image: toStrapiImage(g.image) ,
  videoUrl: !g.isImage ? g.videoUrl ?? undefined : undefined,
});


export async function fetchMediaRoomPage(locale: string): Promise<MediaRoomSections | null> {
  const [pageRes, galleryRes] = await Promise.all([
    fetchMediaRoomPageSections(locale),
    fetchGalleryItems(locale),
  ]);


  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = (page.sections ?? []) as RawSection[];

  const heroRaw = sections.find(
    (s) => s.__component === "common.hero",
  ) as RawHeroSection | undefined;

  const mediaKitRaw = sections.find(
    (s) => s.__component === "media-room.media-kit-section",
  ) as RawMediaKitSection | undefined;

  const releasesRaw = sections.find(
    (s) => s.__component === "media-room.releases-section",
  ) as RawReleasesSection | undefined;

  const photosSectionRaw = sections.find(
    (s) => s.__component === "common.section",
  ) as RawCommonSection | undefined;

  const hero = toHero(heroRaw);
  const mediaKitSection = toMediaKitSection(mediaKitRaw);
  const releasesSection = toReleasesSection(releasesRaw);
  const photosSection = toSection(photosSectionRaw);

  const media: GalleryItem[] = (galleryRes?.data ?? []).map((g) =>
    toGalleryItem(g as RawGalleryItem),
  );

  return {
    identifier: page.identifier,
    title: page.title,
    hero,
    mediaKitSection,
    releasesSection,
    photosAndVideos: {
      section: photosSection,
      media,
    },
  };
}