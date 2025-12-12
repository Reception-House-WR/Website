import { SectionStrapi } from "./sectionStrapi";

export type PageStructure = {
  id: number;
  title: string;
  identifier: string;
  sections: SectionStrapi[];
};