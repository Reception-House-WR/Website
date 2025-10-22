import { Card } from "@/components/ui/card";
import { Eye, Heart, Target, TrendingUp } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "We lead with empathy, treating everyone with dignity and respect.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue the highest standards in everything we do to maximize our impact.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description: "We embrace creative solutions and continuous improvement to better serve our community.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "We operate with honesty and accountability in all our actions and decisions.",
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
            const Icon = value.icon;
            return (
                <Card
                key={value.title}
                className="p-6 text-center hover:shadow-soft transition-all duration-300 border-2 hover:border-[var(--rh-500)] animate-scale-in"
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
