import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroAboutUs () {
    return (   

        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="assets/hero-photo2.jpg"
            alt="Community collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Empowering New Beginnings for Refugees
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              We support refugees as they rebuild their lives in Canada — offering compassion, guidance, and a welcoming community where everyone can thrive.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-[var(--rh-500)] hover:bg-[var(--rh-100)]/90 hover:text-[var(--rh-500)]">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-foreground">
                Get Involved
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
}