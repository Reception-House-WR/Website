import { Card } from "@/components/ui/card";
import { ShieldCheck, Users, Rocket, MessageSquare, Lightbulb } from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Integrity means treating others with dignity and respect, even when no one is watching. We build strong relationships by being truthful, ethical, and dependable in all our interactions. Our actions reflect our values.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description:
      "We create spaces where everyone feels welcomed, respected, and valued, regardless of their background or identity. By actively listening and removing barriers, we ensure all voices are heard. Inclusivity is about making room for everyone to thrive.",
  },
  {
    icon: Rocket,
    title: "Empowerment",
    description:
      "Empowerment is about creating space for others to grow, make decisions, and learn from mistakes. We offer tools, encouragement, and trust — not control. When people feel empowered, they thrive.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description:
      "We communicate with clarity, consistency, and purpose. By adapting our approach to meet diverse needs, we ensure communication is inclusive, accessible, and easy to understand, so everyone can engage and contribute meaningfully.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We create space for creativity and continuous improvement. Innovation happens when we explore new ideas, stumble, and grow — especially in fast-changing environments. Every misstep is a lesson that helps us evolve.",
  },
];



export const CoreValues = () => {
  return (
<>
    <div className="mb-20 animate-fade-in">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These principles guide our work, shape our culture, and inspire our commitment to those we serve.
            </p>
        </div>

        <div className="flex flex-wrap flex-row justify-center gap-6">
            {values.map((value, index) => {
            const Icon = value.icon;
            return (
                <Card
                key={value.title}
                className="p-6 text-center hover:shadow-soft transition-all duration-300 border-2 hover:border-[var(--rh-500)] animate-scale-in min-w-40 max-w-80"
                style={{ animationDelay: `${index * 100}ms` }}
                >
                <div className="w-16 h-16 bg-[var(--rh-500)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
                </Card>
            );
            })}
        </div>
    </div>
    </>
  )
}
