// src/app/donate/DonateClient.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHero } from "@/components/ui/pageHero";
import AccessibleCarousel from "@/components/common/AccessibleCarousel";
import { Mail, MapPin, HeartHandshake } from "lucide-react";
import Image from "next/image";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import {
  type HeroData,
  type Campaign,
  type InKindItem,
  type DonatePageData,
} from "@/lib/strapi";

// --- Static Program Data ---
// (We keep this hard-coded as the icons are static assets)
const programs = [
  {
    title: "Housing Support",
    description:
      "Help newcomers find safe, affordable housing and establish their first home. Your donation provides essential furniture, household items, and assistance with rent deposits.",
    icon: "/assets/icons/housing-icon.png", // Use root-relative paths
    iconAlt: "Icon representing housing support",
  },
  {
    title: "Employment & Integration",
    description:
      "Support job training, language classes, and professional development programs that help newcomers gain meaningful employment.",
    icon: "/assets/icons/employment-icon.png",
    iconAlt: "Icon representing employment support",
  },
  {
    title: "Health & Well-Being",
    description:
      "Ensure access to medical care, mental health support, and wellness programs for families adjusting to their new lives.",
    icon: "/assets/icons/health-icon.png",
    iconAlt: "Icon representing health support",
  },
  {
    title: "Community Partnerships",
    description:
      "Strengthen connections between newcomers and local communities through cultural events, mentorship programs, and social integration initiatives.",
    icon: "/assets/icons/community-icon.png",
    iconAlt: "Icon representing community partnerships",
  },
];

// --- Component Props ---
interface DonateClientProps {
  heroData: HeroData;
  campaignsData: Campaign[];
  inKindItemsData: InKindItem[];
  donatePageData: DonatePageData | null;
}

export default function DonateClient({
  heroData,
  campaignsData,
  inKindItemsData,
  donatePageData,
}: DonateClientProps) {
  // --- Process dynamic data ---
  const inKindItems = inKindItemsData.reduce(
    (acc, item) => {
      const category = item.category || "other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  const thriftPartners = donatePageData?.thriftPartners.split("\n") || [];
  const dropOffInfo =
    donatePageData?.dropOffInfo ||
    "Please contact us for drop-off information.";

  return (
    <div className="min-h-screen bg-background">
      <main id="main-content">
        {/* Hero Section */}
        <PageHero
          heroData={heroData}
          icon={<HeartHandshake className="w-8 h-8 text-white" />}
        />

        {/* Where Your Donation Helps (Static) */}
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
              {programs.map((program) => (
                <Card
                  key={program.title}
                  className="group hover:shadow-2xl transition-all duration-300 border-2  animate-slide-up hover:-translate-y-2 overflow-hidden"
                >
                  <CardHeader className="relative">
                    <div className="w-24 h-24 mb-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Image
                        src={program.icon}
                        alt={program.iconAlt}
                        width={56}
                        height={56}
                        className="w-14 h-14 object-contain"
                      />
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      {program.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-base leading-relaxed text-high-contrast">
                      {program.description}
                    </CardDescription>
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full bg-[var(--rh-500)] text-primary-foreground hover:bg-[var(--rh-400)]"
                    >
                      Donate to {program.title}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Campaign Carousel (Dynamic) */}
        <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-high-contrast">
              Current Campaigns
            </h2>
            <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              Join our active campaigns making a difference right now
            </p>

            {campaignsData.length > 0 ? (
              <AccessibleCarousel ariaLabel="Current donation campaigns">
                {campaignsData.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className="mx-4 overflow-hidden border-2 shadow-xl"
                  >
                    <div className="relative h-64 md:h-80 overflow-hidden">
                      <Image
                        src={
                          campaign.image || "/assets/default-placeholder.jpg"
                        }
                        alt={campaign.imageAlt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h3 className="text-3xl md:text-4xl font-bold mb-2">
                          {campaign.name}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="p-8 md:p-12 bg-white">
                      <p className="text-lg leading-relaxed text-high-contrast mb-6">
                        {campaign.description}
                      </p>
                      <Button
                        variant="default"
                        size="lg"
                        className="w-full md:w-auto"
                      >
                        Support This Campaign
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </AccessibleCarousel>
            ) : (
              <p className="text-center text-muted-foreground">
                No active campaigns at this time. Please check back soon!
              </p>
            )}
          </div>
        </section>

        {/* In-Kind Donations (Dynamic) */}
        <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-high-contrast">
              In-Kind Donations
            </h2>
            <p className="text-lg text-center mb-12 text-muted-foreground max-w-3xl mx-auto">
              Your support through in-kind donations is invaluable. Please
              consider donating any of the following items:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="border-2 hover:shadow-lg ...">
                <CardHeader>
                  <CardTitle>🎒 Kids School Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {inKindItems.school?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-3 text-lg">✓</span>
                        <span className="text-high-contrast font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg ...">
                <CardHeader>
                  <CardTitle>🧴 Personal Care Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {inKindItems.personal?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-3 text-lg">✓</span>
                        <span className="text-high-contrast font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg ...">
                <CardHeader>
                  <CardTitle>👶 Baby Essentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {inKindItems.baby?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-3 text-lg">✓</span>
                        <span className="text-high-contrast font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg ...">
                <CardHeader>
                  <CardTitle>🎁 Gift Cards</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {inKindItems.giftCards?.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-3 text-lg">✓</span>
                        <span className="text-high-contrast font-medium">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-muted/50 border-2">
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-bold text-high-contrast flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Drop-Off Information
                </h3>
                <div className="text-high-contrast leading-relaxed markdown">
                  {/* Use MarkdownRenderer for rich text */}
                  <MarkdownRenderer content={dropOffInfo} />
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
                <div className="pt-4 border-t border-border">
                  <p className="flex items-center gap-2 text-high-contrast">
                    <Mail className="h-5 w-5 text-primary" />
                    <span>
                      Questions? Email us at{" "}
                      <a
                        href="mailto:donations@receptionhouse.ca"
                        className="text-primary underline hover:no-underline font-medium"
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
