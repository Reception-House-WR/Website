import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatCurrency";
import { Campaign } from "@/lib/strapi/models/donate/campaign";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface FeaturedCampaignProps {
  title: string;
  campaign: Campaign;
}
export const CampaignSection = ({ title, campaign }: FeaturedCampaignProps) => {
  const progress = (campaign?.raised / campaign?.goal) * 100;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          {title || "Featured Campaign"}
        </h2>

        <Card className="mx-auto max-w-5xl overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all py-0">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Image */}
              <div className="md:col-span-2 relative h-64 md:h-auto overflow-hidden">
                {(campaign.image && <img 
                  src={campaign.image}
                  alt={campaign.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                )}
              </div>

              {/* Content */}
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <h3 className="mb-4 text-2xl font-bold text-foreground">
                  {campaign?.name}
                </h3>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  {campaign?.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-foreground bg-clip-text">
                      {formatCurrency(campaign?.raised, "en")}
                    </span>
                    <span className="text-muted-foreground">
                      {formatCurrency(campaign?.goal, "en")}
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-gradient-to-r from-[var(--rh-yellow-500)] to-[var(--rh-red-500)] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Donation campaign progress"
                    />
                  </div>
                </div>
                <Link
                  href={campaign?.buttonURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="w-full hover:cursor-pointer group bg-[var(--rh-500)] hover:bg-[var(--rh-400)] text-white"
                  >
                    {campaign?.buttonLabel}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
