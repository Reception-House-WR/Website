import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroAboutUs ({url, title, description}: {url?: string; title: string; description: string}) {
    return (   

        <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
            {url && (
              <img
                src={url}
                alt="Community collaboration"
                className="w-full h-full object-cover"
              />
            )}
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/about/purpose">
                <Button size="lg" className="bg-[var(--rh-500)] hover:bg-[var(--rh-100)]/90 hover:text-[var(--rh-500)]">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/get-involved">
                <Button size="lg" variant="outline" className="border-white bg-transparent text-white hover:bg-white hover:text-foreground">
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
}