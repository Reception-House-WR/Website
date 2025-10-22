import { Heart } from "lucide-react";

export default function WhoWeAre() {
  return (
    <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in my-12">
        
        <div className="inline-flex items-center justify-center w-16 h-16 bg-warm-gradient rounded-full mb-6 bg-[var(--rh-500)]">
        <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
        Who We Are
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
        We are a compassionate nonprofit organization dedicated to transforming lives and strengthening communities. 
        For over two decades, we've worked alongside individuals, families, and partners to create meaningful, lasting change. 
        Our approach is rooted in dignity, respect, and the unwavering belief that everyone deserves the opportunity to thrive.
        </p>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-6">
        Through innovative programs, dedicated staff, and strong community partnerships, we provide essential services, 
        advocate for systemic change, and empower those we serve to build brighter futures. Together, we're not just 
        addressing challenges—we're creating hope and possibility.
        </p>

    </div>
);
}