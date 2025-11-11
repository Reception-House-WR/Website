// src/app/donate/components/InKindSection.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin } from "lucide-react";
import MarkdownRenderer from "@/components/common/MarkdownRenderer";
import type { DonationCategory, DonatePageData } from "@/lib/strapi";

// --- Helpers ---
const colorMap: Record<string, string> = {
  blue: "hover:border-[var(--rh-500)] bg-gradient-to-br from-blue-50 to-cyan-50",
  pink: "hover:border-[var(--rh-orange-500)] bg-gradient-to-br from-purple-50 to-pink-50",
  yellow:
    "hover:border-[var(--rh-yellow-500)] bg-gradient-to-br from-amber-50 to-yellow-50",
  rose: "hover:border-[var(--rh-orange-300)] bg-gradient-to-br from-pink-50 to-rose-50",
};

// --- Component ---
interface InKindSectionProps {
  donationCategoriesData: DonationCategory[];
  donatePageData: DonatePageData | null;
}

export default function InKindSection({
  donationCategoriesData,
  donatePageData,
}: InKindSectionProps) {
  // FIX: Make thrift partners dynamic from the prop
  const thriftPartners =
    donatePageData?.thriftPartners
      .split("\n")
      .filter((partner) => partner.trim() !== "") || [];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-high-contrast">
          In-Kind Donations
        </h2>
        <p className="text-lg text-center mb-12 text-muted-foreground max-w-3xl mx-auto">
          Your support through in-kind donations is invaluable. Please consider
          donating any of the following items:
        </p>

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
            <h3 className="text-xl font-bold text-high-contrast flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[var(--rh-orange-500)]" />
              Drop-Off Information
            </h3>

            {/* --- FIX: DYNAMIC CONTENT --- */}
            {donatePageData ? (
              <>
                <div className="text-high-contrast leading-relaxed markdown">
                  <MarkdownRenderer content={donatePageData.dropOffInfo} />
                </div>
                {thriftPartners.length > 0 && (
                  <div>
                    <p className="font-semibold mb-2 text-high-contrast">
                      For furniture, household items, or clothing, please
                      consider our community thrift partners:
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
                )}
              </>
            ) : (
              <p className="text-muted-foreground">
                Drop-off information is currently unavailable.
              </p>
            )}
            {/* --- END FIX --- */}

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
  );
}
