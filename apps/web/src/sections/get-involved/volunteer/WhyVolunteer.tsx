import DynamicIcon from "@/components/common/DynamicIcon";
import { Card, CardContent } from "@/components/ui/card";
import { BenefitCard } from "@/lib/strapi/models/getInvolved/benefitCard";
  
export default function WhyVolunteer({
  title,
  benefits
}: {
  title: string;
  benefits: BenefitCard[];
 }  ) {
    return (
        <section className="py-16 bg-muted/30" aria-labelledby="why-heading">
        <div className="container mx-auto px-4">
          <h2 id="why-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
            {title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
            <Card
                key={index}
                className="relative overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 group animate-fade-in min-h-[400px]"
                style={{ animationDelay: `${index * 100}ms` }}
                >
                <CardContent className="p-0 absolute inset-0">
                    <div className="relative h-full">
                    {benefit.backgroundImageUrl && (
                      <img
                          src={benefit.backgroundImageUrl}
                          alt={benefit.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />)}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:from-black/95 transition-all duration-300" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                        <div className="bg-[var(--rh-500)]/90 w-14 h-14 rounded-full flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                        <DynamicIcon name={benefit.icon} className="h-7 w-7 text-white" aria-hidden="true" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                        <p className="text-white/90 leading-relaxed text-base">{benefit.description}</p>
                    </div>
                    </div>
                </CardContent>
            </Card>

            ))}
          </div>
        </div>
      </section>
    );
}