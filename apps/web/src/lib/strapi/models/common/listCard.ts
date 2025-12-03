export interface ListCard {
    title: string;
    description: string;
    items: {
        key: string;
        value: string;
    }[];
}