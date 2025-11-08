// --- Strapi API Response Type Definitions ---

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImageData {
  id: number;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
}

export interface PageHeroDirectAttributes {
  id: number;
  title: string;
  description: string | null;
  pageIdentifier: string;
  backgroundImage: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId?: string;
}

export interface EmployeeDirectAttributes {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  imageUrl: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  documentId?: string;
}

export interface TextSectionDirectAttributes {
  title: string;
  description: string; // Rich Text content
  sectionIdentifier: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface TimelineEventDirectAttributes {
  year: string;
  title: string;
  description: string; // Rich Text content
  image: StrapiImageData | null;
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface EventDirectAttributes {
  id: number;
  title: string;
  description: string; // Rich Text content
  date: string; // Strapi Date field
  time: string;
  location: string;
  image: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  isPaid: boolean | null;
  eventbriteUrl?: string;
}

export interface StrapiDataItem<T> {
  id: number;
  documentId?: string;
  [key: string]: unknown;
}

export interface StrapiResponse<T> {
  data: (StrapiDataItem<T> & T)[] | null;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
// --- End Strapi Types ---

// --- Frontend Data Shape Definitions ---

export interface HeroData {
  title: string;
  description: string;
  imageUrl: string;
}

export interface Employee {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  imageUrl: string | null;
}

export interface TextSectionData {
  title: string;
  description: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  imageUrl: string | null;
  order: number;
}

export interface Event {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string | null;
  category: "upcoming" | "past";
  isPaid: boolean;
  eventbriteUrl?: string;
}

// lib/strapi/types.ts

export interface StoryDirectAttributes {
  id: number;
  name: string;
  story: string; // Rich Text content
  videoUrl: string;
  image: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Story {
  id: number;
  name: string;
  story: string;
  videoUrl: string;
  image: string | null;
  imageAlt: string;
}

// lib/strapi/types.ts

// --- Add this for the "Campaign" Collection Type ---
export interface CampaignDirectAttributes {
  id: number;
  name: string;
  description: string;
  image: StrapiImageData | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Campaign {
  id: number;
  name: string;
  description: string;
  image: string | null;
  imageAlt: string;
}

// lib/strapi/types.ts

// This is the new item type
export interface InKindItem {
  id: number;
  name: string;
}

// This is the new category type
export interface DonationCategoryDirectAttributes {
  id: number;
  title: string;
  emoji: string;
  color: "blue" | "pink" | "yellow" | "rose";
  order: number;
  inKindItems: { data: InKindItem[] }; // This is how relations are structured
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DonationCategory {
  id: number;
  title: string;
  emoji: string;
  color: string;
  items: InKindItem[] | []; // We will simplify this in the fetch
}

// --- Add this for the "Donate Page" Single Type ---
export interface DonatePageDirectAttributes {
  id: number;
  dropOffInfo: string; // Markdown field
  thriftPartners: string; // Text field, one partner per line
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface DonatePageData {
  dropOffInfo: string;
  thriftPartners: string;
}

// lib/strapi/types.ts

// --- Add this for the raw Strapi data ---
export interface DonationProgramDirectAttributes {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  iconName: string; // This will be "Home", "Briefcase", etc.
  order: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// --- Add this for the frontend data shape ---
export interface DonationProgram {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  iconName: string;
}
