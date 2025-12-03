import DynamicIcon from '@/components/common/DynamicIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { IconCard } from '@/lib/strapi/models/common/iconCard';
import { BenefitCard } from '@/lib/strapi/models/getInvolved/benefitCard';
import { JobOpening } from '@/lib/strapi/models/getInvolved/jobPosting';
import { Briefcase, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export const CareersSection = ({
  workingHereTitle,
  workingHereDesc,
  workingHereCards,
  benefitsTitle,
  benefits,
  openingsTitle,
  openingsDesc,
  openings
}: {
  workingHereTitle: string;
  workingHereDesc: string;
  workingHereCards: IconCard[];
  benefitsTitle: string;
  benefits: BenefitCard[];
  openingsTitle: string;
  openingsDesc: string;
  openings: JobOpening[];
}) => {
  return (
    <main className="min-h-screen">
      {/* Working at Reception House Section */}
      <section className="py-12 bg-muted/30" aria-labelledby="culture-heading">
        <div className="container mx-auto px-4">
          <h2 id="culture-heading" className="text-3xl md:text-4xl font-bold text-center mb-4">
            {workingHereTitle}
          </h2>
          <p className="text-muted-foreground text-center leading-relaxed max-w-3xl mx-auto mb-10">
            {workingHereDesc}
          </p>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {workingHereCards.map((value, index) => (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-[var(--rh-500)]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DynamicIcon name={value.icon} className="h-8 w-8 text-[var(--rh-500)]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-card" aria-labelledby="benefits-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
              {benefitsTitle}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group animate-fade-in pt-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={benefit.backgroundImageUrl} 
                        alt={benefit.title}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-background/30" />
                      <div className="absolute top-4 left-4 bg-[var(--rh-500)]/90 w-12 h-12 rounded-full flex items-center justify-center">
                        <DynamicIcon name={benefit.icon} className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16 bg-muted" aria-labelledby="openings-heading">
        <div className="container mx-auto px-4">
          <h2 id="openings-heading" className="text-3xl md:text-4xl font-bold text-center mb-4">
            {openingsTitle}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {openingsDesc}
          </p>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {openings.map((job, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="h-6 w-6 text-primary" aria-hidden="true" />
                        <h3 className="text-2xl font-bold">{job?.role}</h3>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                        <span>{job?.department}</span>
                        <span aria-hidden="true">•</span>
                        <span>{job?.mode}</span>
                        <span aria-hidden="true">•</span>
                        <span>{job.contract}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{job?.description}</p>
                  <Button asChild className='bg-[var(--rh-500)]'>
                    <a 
                      href={job?.url}
                      className="inline-flex items-center gap-2"
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
