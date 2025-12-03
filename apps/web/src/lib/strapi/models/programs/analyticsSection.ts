import { Analytic } from "./analytic";

export interface AnalyticsSection {
    __component: "programs.analytics-section";
    title: string;
    analytics: Analytic[]
    description: string;
}
