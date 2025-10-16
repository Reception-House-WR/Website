import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  lang: string;
}

const translations = {
  en: {
    title: "Belonging Starts Here",
    subtitle: "We guide refugees and newcomers with resources, connections, and opportunity, so every person can build an independent, fulfilling life in Canada.",
    cta: "Get Involved",
    learnMore: "Learn More",
  },
  fr: {
    title: "Construire l'espoir, transformer des vies",
    subtitle: "Autonomiser les réfugiés et les nouveaux arrivants pour qu'ils s'épanouissent dans leur nouvelle communauté grâce à un soutien compatissant et des services inclusifs.",
    cta: "S'impliquer",
    learnMore: "En savoir plus",
  },
};

export const Hero = ({ lang }: HeroProps) => {
  const t = translations[lang as keyof typeof translations] || translations.en;

  return (
    <section 
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      role="banner"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/assets/hero-photo2.jpg')] bg-cover bg-center"
      >
        <div 
          className="absolute inset-0 "
          style={{ background: 'var(--hero-gradient)' }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl animate-fade-up">
          {t.title}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/95 md:text-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {t.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Button  size="lg" className="group">
            {t.cta}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="outline" size="lg" className="bg-card/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-card/20">
            {t.learnMore}
          </Button>
        </div>
      </div>
    </section>
  );
};