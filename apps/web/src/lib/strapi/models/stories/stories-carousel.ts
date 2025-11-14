import { Story } from "./story";

export interface StoriesCarousel {
  __component: "stories.stories-carousel";
  id: number;
  title: string;
  description: string;
  stories?: Story[];
}