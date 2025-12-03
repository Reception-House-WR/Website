import { Analytic } from "./analytic";

export interface AnalyticsOverview {
    __component: "programs.analytics-overview";
    analytics: Analytic[]
}