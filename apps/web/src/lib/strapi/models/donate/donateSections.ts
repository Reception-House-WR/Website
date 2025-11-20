import { ButtonSection } from "../common/buttonSection";
import { Hero } from "../common/hero";
import { CardsSection } from "../getInvolved/cardsSection";
import { CampaignsSection } from "./campaignsSection";
import { DropOffCard } from "./dropOffCard";
import { ListCardSection } from "./listCardSection";

export interface DonateSections{
    title: string;
    identifier: string;
    hero: Hero;
    campaignsSection: CampaignsSection;
    whereHelpsSection: CardsSection;
    inKindDonationsSection: ListCardSection;
    dropOffSection: DropOffCard;
    bottomGeneralSection: ButtonSection;

}