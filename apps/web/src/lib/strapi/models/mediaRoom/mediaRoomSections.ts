import { Hero } from "../common/hero";
import { Section } from "../common/section";
import { GalleryItem } from "./galleryItem";
import { MediaKitSection } from "./mediaKitSection";
import { ReleasesSection } from "./releasesSection";

export interface MediaRoomSections{
    identifier: string;
    title: string; 
    hero: Hero;
    mediaKitSection: MediaKitSection;
    releasesSection: ReleasesSection;
    photosAndVideos: {
        section: Section,
        media: GalleryItem[]
    }
}