import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { InfoCard } from "@/lib/strapi/models/programs/infoCard";
import { Home, Users } from "lucide-react";

const icons = [
  Home,
  Users,
];

export default function Programs({
  title,
  desc,
  bottomDesc,
  cards
}: {
  title: string;
  desc: string;
  bottomDesc?: string;
  cards: InfoCard[];
}) {
  return (
    <section className=" bg-warm">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {desc}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const Icon = icons[index % icons.length]; 
            return(
            <Card
              key={index}
              className="shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader>
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    index % 2 === 0
                      ? "bg-[var(--rh-500)]/80"
                      : "bg-[var(--rh-yellow-500)]/80"
                  }`}
                >
                  <Icon className="w-8 h-8 text-white " />
                </div>
                <CardTitle className="text-2xl mb-2">{card?.title}</CardTitle>
                <CardDescription className="text-[var(--rh-500)] font-semibold">
                  {card?.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {card?.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">
                    {card?.subtitle2}
                  </h4>
                  <ul className="space-y-2">
                    {card?.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-[var(--rh-red-500)] mt-1">•</span>
                        <span>{item?.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )})}
        </div>

        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-lg text-foreground leading-relaxed">
            {bottomDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
