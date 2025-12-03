import { ListCard } from "../common/listCard";

export interface BenefitsSection {
    __component: "programs.benefits-section";
    title: string;
    description: string;
    card: ListCard;
    buttonLabel: string;
    bottomDescription: string;
}