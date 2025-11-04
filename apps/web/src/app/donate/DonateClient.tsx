// src/app/donate/DonateClient.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHero } from "@/components/ui/pageHero";
import {
  Mail,
  MapPin,
  HeartHandshake,
  Home,
  Briefcase,
  Heart,
  Handshake,
  ChevronLeft,
  ChevronRight,
  Icon, // <-- Import the value (the component)
  type LucideIcon, // <-- Import the type
} from "lucide-react";

import Image from "next/image";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import {
  type HeroData,
  type Campaign,
  type DonationCategory,
  type DonatePageData,
  type DonationProgram, // <-- ADDED
} from "@/lib/strapi";

// --- REMOVED STATIC 'programs' ARRAY ---

// --- ADDED ICON MAP ---
const iconMap: Record<string, LucideIcon> = {
  Home: Home,
  Briefcase: Briefcase,
  Heart: Heart,
  Handshake: Handshake,
};

// 2. ADD THIS COLOR MAP
const colorMap: Record<string, string> = {
  blue: "hover:border-[var(--rh-500)] bg-gradient-to-br from-blue-50 to-cyan-50",
  pink: "hover:border-[var(--rh-orange-500)] bg-gradient-to-br from-purple-50 to-pink-50",
  yellow:
    "hover:border-[var(--rh-yellow-500)] bg-gradient-to-br from-amber-50 to-yellow-50",
  rose: "hover:border-[var(--rh-orange-300)] bg-gradient-to-br from-pink-50 to-rose-50",
};
// --- Component Props ---
interface DonateClientProps {
  heroData: HeroData;
  campaignsData: Campaign[];
  donationCategoriesData: DonationCategory[];
  donatePageData: DonatePageData | null;
  programsData: DonationProgram[]; // <-- ADDED
}

export default function DonateClient({
  heroData,
  campaignsData,
  donationCategoriesData,
  donatePageData, // This prop is now unused by your hard-coded logic, but left as requested
  programsData, // <-- ADDED
}: DonateClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === campaignsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? campaignsData.length - 1 : prevIndex - 1
    );
  };

  // This logic remains as you provided it
  const thriftPartners = [
    "Thrift on Kent",
    "Worth a Second Look",
    "Salvation Army",
    "Habitat for Humanity ReStore",
    "Goodwill",
    "Mission Thrift",
  ];

  // --- ADDED ICON HELPER ---
  const getProgramIcon = (iconName: string): LucideIcon => {
    return iconMap[iconName] || Heart; // Default to Heart icon if not found
  };

  return (
    <div className="min-h-screen bg-background">
      <main id="main-content">
        {/* Hero Section */}
        <PageHero
          heroData={heroData}
          icon={<HeartHandshake className="w-8 h-8 text-white" />}
        />

        {/* --- MODIFIED "Where Your Donation Helps" (Dynamic) --- */}
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
              {/* Use dynamic 'programsData' prop */}
              {programsData.map((program) => {
                const ProgramIcon = getProgramIcon(program.iconName);
                return (
                  <Card
                    key={program.id} // Use dynamic ID
                    className="group hover:shadow-2xl transition-all duration-300 border-2  animate-slide-up hover:-translate-y-2 overflow-hidden flex flex-col"
                  >
                    <CardHeader className="relative">
                      <div className="w-24 h-24 mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <ProgramIcon // Use dynamic Icon
                          aria-label={program.title}
                          className="w-14 h-14 text-[var(--rh-orange-500)]"
                        />
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {program.title} {/* Use dynamic Title */}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 flex flex-col flex-grow">
                      <CardDescription className="text-base leading-relaxed text-high-contrast">
                        {program.description} {/* Use dynamic Description */}
                      </CardDescription>
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full bg-[var(--rh-500)] text-primary-foreground hover:bg-[var(--rh-400)] mt-auto"
                      >
                        {program.buttonText} {/* Use dynamic Button Text */}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- MODIFIED CAMPAIGN CAROUSEL --- */}
        <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-high-contrast">
              Current Campaigns
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join our active campaigns making a difference right now
            </p>
            {campaignsData.length > 0 ? (
              <div className="relative">
                {/* Render only the current card */}
                <Card
                  key={campaignsData[currentIndex].id}
                  className="group overflow-hidden shadow-[var(--card-shadow)] hover:shadow-[var(--card-hover-shadow)] transition-all animate-fade-in py-0"
                >
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <Image
                      src={
                        campaignsData[currentIndex].image ||
                        "/assets/default-placeholder.jpg"
                      }
                      alt={campaignsData[currentIndex].imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h3 className="text-3xl md:text-4xl font-bold mb-2">
                        {campaignsData[currentIndex].name}
                      </h3>
                    </div>
                  </div>
                  <CardContent className="p-8 md:p-12 bg-white">
                    <p className="text-lg leading-relaxed text-high-contrast mb-6">
                      {campaignsData[currentIndex].description}
                    </p>
                    <Button
                      size="lg"
                      className="w-full md:w-auto bg-[var(--rh-orange-500)] text-primary-foreground hover:bg-[var(--rh-orange-400)]"
                    >
                      Support This Campaign
                    </Button>
                  </CardContent>
                </Card>

                {/* --- NEW NAVIGATION CONTROLS --- */}
                <div className="mt-6 flex items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToPrevious}
                    aria-label="Previous campaign"
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {/* Dots */}
                  <div className="flex gap-2">
                    {campaignsData.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all ${
                          index === currentIndex
                            ? "bg-[var(--rh-orange-500)] w-8"
                            : "bg-border hover:bg-primary/50"
                        }`}
                        aria-label={`Go to campaign ${index + 1}`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={goToNext}
                    aria-label="Next campaign"
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                No active campaigns at this time. Please check back soon!
              </p>
            )}
          </div>
        </section>

        {/* --- MODIFIED In-Kind Donations (Dynamic) --- */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-high-contrast">
              In-Kind Donations
            </h2>
            <p className="text-lg text-center mb-12 text-muted-foreground max-w-3xl mx-auto">
              Your support through in-kind donations is invaluable. Please
              consider donating any of the following items:
            </p>

            {/* 7. REPLACE the static grid with this dynamic one */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {donationCategoriesData.map((category) => (
                <Card
                  key={category.id}
                  className={`border-2 hover:shadow-lg transition-all duration-300 ${
                    colorMap[category.color] || colorMap.blue
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">{category.emoji}</span>
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {category.items.map((item) => (
                        <li key={item.id} className="flex items-start">
                          <span className="text-[var(--rh-orange-500)] mr-3 text-lg">
                            ✓
                          </span>
                          <span className="text-high-contrast font-medium">
                            {item.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-muted border-2">
              <CardContent className="p-6 space-y-4">
                {" "}
                {/* Reverted to p-6 */}
                <h3 className="text-xl font-bold text-high-contrast flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-[var(--rh-orange-500)]" />
                  Drop-Off Information
                </h3>
                {/* --- HARD-CODED CONTENT FROM SCREENSHOT --- */}
                <div className="text-high-contrast leading-relaxed markdown">
                  <p>
                    <strong className="text-[var(--rh-orange-500)]">
                      Please Note:
                    </strong>{" "}
                    While we gratefully accept the above items, we are unable to
                    store or distribute furniture, household items, or clothing
                    at this time.
                  </p>
                </div>
                <div>
                  <p className="font-semibold mb-2 text-high-contrast">
                    For furniture, household items, or clothing, please consider
                    our community thrift partners:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {thriftPartners.map((partner, index) => (
                      <span
                        key={index}
                        className="text-sm text-muted-foreground"
                      >
                        • {partner}
                      </span>
                    ))}
                  </div>
                </div>
                {/* --- END HARD-CODED CONTENT --- */}
                <div className="pt-4 border-t border-border">
                  <p className="flex items-center gap-2 text-high-contrast">
                    <Mail className="h-5 w-5 text-[var(--rh-orange-500)]" />
                    <span>
                      Questions? Email us at{" "}
                      <a
                        href="mailto:donations@receptionhouse.ca"
                        className="text-[var(--rh-orange-5To-orange-500)] underline hover:no-underline font-medium"
                      >
                        donations@receptionhouse.ca
                      </a>
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Thank You CTA (Static) */}
        <section className="py-16 px-4 bg-[var(--rh-500)] text-primary-foreground">
          <div className="container mx-auto max-w-3xl text-center animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Every Contribution Helps Newcomers Build a Safe and Welcoming Home
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-95">
              Your generosity transforms lives, creates opportunities, and
              builds a more inclusive community for everyone. Thank you for your
              support.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="font-semibold text-lg"
            >
              Make a Donation Today
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
