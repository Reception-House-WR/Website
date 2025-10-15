import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface FeaturedCampaignProps {
  lang: string;
}

const translations = {
  en: {
    title: "Current Campaign",
    campaignTitle: "Bringing Joy to Children, One Playground at a Time",
    description: "By supporting our campaign, you’re helping us to create a safe, energetic space for refugee children to stay active and build strength. Playgrounds encourage physical activity that supports children’s growth, coordination, and confidence as they challenge themselves through play.  Your contribution will create an inviting space where kids can run, jump, and explore—nurturing healthy habits and joyful moments through active play.",
    goal: "Goal: $50,000",
    raised: "Raised: $32,450",
    cta: "Support Now",
  },
  fr: {
    title: "Campagne actuelle",
    campaignTitle: "Initiative Nouveaux Départs",
    description: "Aidez-nous à fournir des ressources essentielles à 50 nouvelles familles arrivant ce mois-ci. Chaque contribution plante des graines d'espoir dans notre communauté.",
    goal: "Objectif : 50 000 $",
    raised: "Collectés : 32 450 $",
    cta: "Soutenir maintenant",
  },
};

export const Campaign = ({ lang }: FeaturedCampaignProps) => {
  const t = translations[lang as keyof typeof translations] || translations.en;
  const progress = (32450 / 50000) * 100;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          {t.title}
        </h2>

        <Card className="mx-auto max-w-5xl overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all py-0">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Image */}
              <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden">
                <img
                  src="/assets/campaign.png"
                  alt={t.campaignTitle}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <h3 className="mb-4 text-2xl font-bold text-foreground">
                  {t.campaignTitle}
                </h3>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  {t.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-foreground bg-clip-text">{t.raised}</span>
                    <span className="text-muted-foreground">{t.goal}</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--rh-yellow-500)] to-[var(--rh-red-500)] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>

                <Button size="lg" className="w-full sm:w-auto group bg-[var(--rh-500)] hover:bg-[var(--rh-400)] text-white">
                  {t.cta}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};