// src/lib/search/types.ts
export interface SearchSection {
  id: string;          // unique key, e.g. "home-hero"
  pageLabel: string;   // e.g. "Home"
  sectionLabel: string; // e.g. "Hero banner"
  description?: string; // short description / keywords
  href: string;        // where clicking this should take the user
  tags?: string[];     // extra keywords to help search
}
