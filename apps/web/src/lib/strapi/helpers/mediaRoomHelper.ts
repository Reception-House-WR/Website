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

/* ---------- Media kit ---------- */

const toKitCard = (k: any): KitCard => {
  const kitRaw = k?.kit ?? null; // viene como media/file de Strapi

  return {
    title: k?.title ?? "",
    description: k?.description ?? "",
    icon: k?.icon ?? "",
    // el objeto original de Strapi tiene url, name, etc., así que sirve
    kit:
      (kitRaw as StrapiImageResponse | strapiDocument) ??
      ({ url: "" } as StrapiImageResponse),
  };
};

const toMediaKitSection = (s: any): MediaKitSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  kits: (s?.kits ?? []).map(toKitCard),
});

/* ---------- Press releases ---------- */

const parseDate = (value: any): Date => {
  if (typeof value === "string") {
    const ts = Date.parse(value);
    if (!Number.isNaN(ts)) return new Date(ts);
  }
  return new Date(0); // fallback
};

const toPressRelease = (p: any): PressRelease => ({
  date: parseDate(p?.date),
  title: p?.title ?? "",
  shortDesc: p?.shortDesc ?? "",
  longDesc: p?.longDesc ?? "",
  image: (p?.image as StrapiImageResponse) ?? {
    url: "",
    alternativeText: null,
    caption: null,
  },
});

const toReleasesSection = (s: any): ReleasesSection => ({
  title: s?.title ?? "",
  description: s?.description ?? "",
  pressReleases: (s?.pressReleases ?? []).map(toPressRelease),
});

/* ---------- Gallery (photos & videos) ---------- */

const toGalleryItem = (g: any): GalleryItem => ({
  description: g?.description ?? "",
  isImage: !!g?.isImage,
  image: g?.isImage ? ((g?.image as StrapiImageResponse) ?? undefined) : undefined,
  videoUrl: !g?.isImage ? g?.videoUrl ?? undefined : undefined,
});


export async function fetchMediaRoomPage(): Promise<MediaRoomSections | null> {
  const [pageRes, galleryRes] = await Promise.all([
    fetchMediaRoomPageSections(),
    fetchGalleryItems(),
  ]);

  const page = pageRes?.data?.[0];
  if (!page) return null;

  const sections = page.sections ?? [];

  const heroRaw = sections.find(
    (s: any) => s.__component === "common.hero",
  ) as any;

  const mediaKitRaw = sections.find(
    (s: any) => s.__component === "media-room.media-kit-section",
  ) as any;

  const releasesRaw = sections.find(
    (s: any) => s.__component === "media-room.releases-section",
  ) as any;

  const photosSectionRaw = sections.find(
    (s: any) => s.__component === "common.section",
  ) as any;

  const hero = toHero(heroRaw ?? {});
  const mediaKitSection = toMediaKitSection(mediaKitRaw ?? {});
  const releasesSection = toReleasesSection(releasesRaw ?? {});
  const photosSection = toSection(photosSectionRaw ?? {});
  const media: GalleryItem[] = (galleryRes?.data ?? []).map(toGalleryItem);

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