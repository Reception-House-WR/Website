import { SimpleCard } from "../common/simpleCard";

export interface CardsCarousel {
    __component: "common.cards-carousel";
    title: string;
    description: string;
    cards: SimpleCard[];
}