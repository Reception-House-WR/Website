export interface UpcomingEvent {
    title: string;
    description: string;
    date: Date | null;
    time: string;
    location: string;
    isPaid: boolean;
    eventBriteURL?: string;
    image: string;
}