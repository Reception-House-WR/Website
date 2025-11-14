import { SectionStrapi } from "./sectionStrapi";

export type HomeStructure = {
  id: number;
  title: string;
  identifier: string;
  sections: SectionStrapi[];
};