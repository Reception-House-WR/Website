// src/lib/search/sectionsIndex.ts
import { SearchSection } from "./types";

export const SECTIONS_INDEX: SearchSection[] = [
  {
    id: "home-hero",
    pageLabel: "Home",
    sectionLabel: "Hero banner",
    description: "Welcome message, main image, call to action",
    href: "/en/home#hero",
    tags: ["welcome", "front page", "introduction"],
  },
  {
    id: "home-stories",
    pageLabel: "Home",
    sectionLabel: "Stories carousel",
    description: "Refugee stories, testimonials, lived experiences",
    href: "/en/home#stories",
    tags: ["stories", "refugees", "testimonials"],
  },
  {
    id: "get-involved-volunteer",
    pageLabel: "Get involved",
    sectionLabel: "Volunteer opportunities",
    description: "How to volunteer, roles, requirements, application",
    href: "/en/get-involved#volunteer",
    tags: ["volunteer", "opportunities", "help", "support"],
  },
  {
    id: "get-involved-donate",
    pageLabel: "Get involved",
    sectionLabel: "Donate",
    description: "Make a donation, monthly giving, campaigns",
    href: "/en/get-involved#donate",
    tags: ["donate", "donation", "fundraising", "give"],
  },
  {
    id: "media-room-press-releases",
    pageLabel: "Media room",
    sectionLabel: "Press releases",
    description: "News, press releases, media statements",
    href: "/en/media-room#press-releases",
    tags: ["media", "news", "press"],
  },
  // ...add more sections as needed
];
