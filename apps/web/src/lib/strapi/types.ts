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
