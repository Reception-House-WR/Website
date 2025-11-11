// src/app/donate/components/DonationProgramsSection.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Briefcase,
  Heart,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import type { DonationProgram } from "@/lib/strapi";

// --- Helpers ---
const iconMap: Record<string, LucideIcon> = {
  Home: Home,
  Briefcase: Briefcase,
  Heart: Heart,
  Handshake: Handshake,
};

const getProgramIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Heart; // Default to Heart
};

// --- Component ---
interface DonationProgramsSectionProps {
  programsData: DonationProgram[];
}

export default function DonationProgramsSection({
  programsData,
}: DonationProgramsSectionProps) {
  return (
    <section
      id="donate-programs"
      className="py-16 px-4 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-high-contrast">
          Where Your Donation Helps
        </h2>
        <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          Choose a program that resonates with you and make a direct impact
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {programsData.map((program) => {
            const ProgramIcon = getProgramIcon(program.iconName);
            return (
              <Card
                key={program.id}
                className="group hover:shadow-2xl transition-all duration-300 border-2  animate-slide-up hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                <CardHeader className="relative">
                  <div className="w-24 h-24 mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <ProgramIcon
                      aria-label={program.title}
                      className="w-14 h-14 text-[var(--rh-orange-500)]"
                    />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex flex-col flex-grow">
                  <CardDescription className="text-base leading-relaxed text-high-contrast">
                    {program.description}
                  </CardDescription>
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full bg-[var(--rh-500)] text-primary-foreground hover:bg-[var(--rh-400)] mt-auto"
                  >
                    {program.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
