import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface HeroProps {
  title: string;
  description: string;
  imageUrl: string;
  contactUsText: string;
  learnMoreText: string;
}

export const Hero = ({ title, description, imageUrl, contactUsText, learnMoreText }: HeroProps) => {

  return (
    <section 
      className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
      role="banner"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Image */}
        <Image
          src={imageUrl}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "var(--hero-gradient)" }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl animate-fade-up">
          {title}
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/95 md:text-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <Link href="/about/contact-us">
          <Button  size="lg" className="group" > 
            {contactUsText}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            
          </Button>
          </Link>

          <Link href="/programs-and-services">
          <Button variant="outline" size="lg" className="bg-card/10 backdrop-blur-sm border-primary-foreground/20 text-primary-foreground hover:bg-card/20">
            {learnMoreText}
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};