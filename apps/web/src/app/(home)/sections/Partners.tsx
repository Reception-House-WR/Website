import { Card } from "@/components/ui/card";

interface PartnersSectionProps {
  lang: string;
}

const translations = {
  en: {
    title: "Our Funding Partners",
    subtitle: "We're grateful for the support of these organizations",
  },
  fr: {
    title: "Nos partenaires financiers",
    subtitle: "Nous sommes reconnaissants du soutien de ces organisations",
  },
};

const partners = [
  { id: 1, name: "Immigration Partnership" },
  { id: 2, name: "Waterloo Region Community Foundation" },
  { id: 3, name: "Toasty Toes Waterloo Region Fund" },
  { id: 4, name: "Government of Canada" },
  { id: 5, name: "Ontario Trillium Foundation" },
  { id: 6, name: "Fairmount Foundation" },
  { id: 7, name: "Lyle S. Hallman Foundation" },
];

export const Partners = ({ lang }: PartnersSectionProps) => {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            {t.title}
          </h2>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mx-auto max-w-6xl">
          {partners.map((partner, index) => (
            <Card
              key={partner.id}
              className="flex items-center justify-center p-6 h-32 shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-center">
                <div className="w-24 h-16 mx-auto mb-2 flex items-center justify-center">
                  <img
                    src={`/assets/partners/${partner.id}.png`}
                    alt={partner.name}
                    className="max-h-14 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs font-medium text-muted-foreground line-clamp-2">
                  {partner.name}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
