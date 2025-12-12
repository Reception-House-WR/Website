import { Analytic } from "@/lib/strapi/models/programs/analytic";
import { Barriers } from "./Barriers";
import Programs from "./Programs";
import Statistics from "./Statistics";
import { YouthCommittee } from "./YouthCommittee";
import { SimpleCard } from "@/lib/strapi/models/common/simpleCard";
import { StrapiImageResponse } from "@/lib/strapi/models/strapi/image";
import { Item } from "@/lib/strapi/models/programs/item";

export default function YouthSection({
  analyticsTitle,
  analyticsDesc,
  analyticsStats,
  programs,
  committeeImages,
  youthTitle,
  youthSubtitle,
  youthSubtitle2,
  youthDesc,
  youthDesc2,
  youthBenefits,
  barriersTitle,
  barriersDesc,
  barriers
}: {
  analyticsTitle: string;
  analyticsDesc: string;
  analyticsStats: Analytic[];
  programs: SimpleCard[];
  committeeImages: StrapiImageResponse[];
  youthTitle: string;
  youthSubtitle: string;
  youthSubtitle2: string;
  youthDesc: string;
  youthDesc2: string;
  youthBenefits: Item[];
  barriersTitle: string;
  barriersDesc: string;
  barriers: {
        key: string;
        value: string;
    }[];
}) {
  return (
       <section className="py-20 bg-background" id="children-and-youth">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {analyticsTitle}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {analyticsDesc}
              </p>
            </div>

            {/* Stats Banner */}
            <Statistics stats={analyticsStats} />

            {/* Programs Photo Cards */}
            <Programs programs={programs} />

            {/* Youth Advisory Committee Section */}
            <YouthCommittee
              title={youthTitle} 
              subtitle={youthSubtitle}
              subtitle2={youthSubtitle2}
              desc={youthDesc}
              desc2={youthDesc2}
              benefits={youthBenefits}
              committeeImages={committeeImages} 
            />

            {/* Barriers Section */}
            <Barriers title={barriersTitle} desc={barriersDesc} barriers={barriers} /> 
          </div>
        </div>
      </section>
    );
}