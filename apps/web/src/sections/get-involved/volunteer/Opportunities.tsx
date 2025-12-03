import DynamicIcon from "@/components/common/DynamicIcon";
import { Card, CardContent } from "@/components/ui/card";
import { IconCard } from "@/lib/strapi/models/common/iconCard";

export default function Opportunities({
  title,
  desc,
  cards
}: {
  title: string;
  desc: string;
  cards: IconCard[];
}) {
    return (
        <section className="py-16 bg-gradient-card" aria-labelledby="opportunities-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="opportunities-heading" className="text-3xl md:text-4xl font-bold text-center mb-4">
              {title}
            </h2>
            <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
              {desc}
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {cards.map((card, index) => (
                <Card 
                  key={index} 
                  className="shadow-soft hover:shadow-medium transition-all duration-300 group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-[var(--rh-500)]/90 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                        <DynamicIcon name={card.icon} className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">{card.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
}