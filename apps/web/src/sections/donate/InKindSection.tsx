import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin } from "lucide-react";
import { List } from "@/lib/strapi/models/donate/list";
import { DropOffCard } from "@/lib/strapi/models/donate/dropOffCard";

//Helpers 
const colorMap: Record<string, string> = {
  blue: "hover:border-[var(--rh-500)] bg-gradient-to-br from-blue-50 to-cyan-50",
  pink: "hover:border-[var(--rh-orange-500)] bg-gradient-to-br from-purple-50 to-pink-50",
  yellow:
    "hover:border-[var(--rh-yellow-500)] bg-gradient-to-br from-amber-50 to-yellow-50",
  rose: "hover:border-[var(--rh-orange-300)] bg-gradient-to-br from-pink-50 to-rose-50",
};

interface InKindSectionProps {
  title: string;
  desc: string;
  donationCards: List[];
  dropOff: DropOffCard;
}

export default function InKindSection({
  title,
  desc,
  donationCards,
  dropOff,
}: InKindSectionProps) {

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-high-contrast">
          {title}
        </h2>
        <p className="text-lg text-center mb-12 text-muted-foreground max-w-3xl mx-auto">
          {desc}
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {donationCards.map((card, id) => (
            <Card
              key={id}
              className={`border-2 hover:shadow-lg transition-all duration-300 ${
                colorMap.blue
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {card?.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {card?.items.map((item, id) => (
                    <li key={item?.value} className="flex items-start">
                      <span className="text-[var(--rh-orange-500)] mr-3 text-lg">
                        ✓
                      </span>
                      <span className="text-high-contrast font-medium">
                        {item?.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* --- Drop-Off Information Card --- */}
        <Card className="bg-muted border-2">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold text-high-contrast flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[var(--rh-orange-500)]" />
              {dropOff?.title}
            </h3>

            {/* --- DYNAMIC STYLING --- */}
            <style jsx global>{`
              .drop-off-info p:first-child > strong:first-child {
                color: var(--rh-orange-500) !important;
              }
            `}</style>

            <>
              <div className="text-high-contrast leading-relaxed markdown drop-off-info text-left">
                {`Please Note: ${dropOff?.note}`}
              </div>

              {dropOff?.items?.length > 0 && (
                <div>
                  <p className="font-semibold mb-2 text-high-contrast">
                    {dropOff?.subtitle}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {dropOff?.items?.map((item, index) => (
                      <span
                        key={index}
                        className="text-sm text-muted-foreground"
                      >
                        • {item?.value}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>

            <div className="pt-4 border-t border-border">
              <p className="flex items-center gap-2 text-high-contrast">
                <Mail className="h-5 w-5 text-[var(--rh-orange-500)]" />
                {dropOff?.bottomText}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
