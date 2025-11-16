import { Heart } from "lucide-react";

export default function WhoWeAre({title, description}: {title: string; description: string}) {
  return (
    <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in my-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-gradient rounded-full mb-6 bg-[var(--rh-500)]">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          {title}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {description}
        </p>
    </div>
);
}