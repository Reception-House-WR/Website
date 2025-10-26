import { Heart, Stethoscope, Users, Shield } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const healthcareImage = '/assets/healthcare/health.png';
const partnerHospital1 = '/assets/partners/6.png';

const HealthcareSection = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "Primary Healthcare Access",
      description: "Help enrolling in OHIP, finding family doctors, and navigating the Canadian healthcare system"
    },
    {
      icon: Heart,
      title: "Mental Health Support",
      description: "Trauma-informed care and counseling services for refugees dealing with complex health needs"
    },
    {
      icon: Shield,
      title: "Preventive Care",
      description: "Health screenings, vaccinations, and wellness programs to support long-term wellbeing"
    },
    {
      icon: Users,
      title: "Cultural Navigation",
      description: "Translation services and cultural mediators to bridge healthcare communication gaps"
    }
  ];

  const carouselImages = [
    { src: healthcareImage, alt: "Healthcare professional consulting with diverse family" },
    { src: healthcareImage, alt: "Medical consultation with immigrant family" },
    { src: healthcareImage, alt: "Mental health counseling session" },
    { src: healthcareImage, alt: "Community health screening event" }
  ];

  const partners = [
    { name: "Grand River Hospital", logo: partnerHospital1 },
    { name: "KW Community Health Centres", logo: partnerHospital1 },
    { name: "Cambridge Memorial Hospital", logo: partnerHospital1 }
  ];

  return (
    <section className="py-20 bg-background" id="health-and-wellbeing">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Healthcare and Wellbeing
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Many refugees arrive with complex health needs after experiencing trauma, displacement, 
              and limited access to medical care. Our healthcare navigation services ensure newcomers 
              receive the care they need while overcoming language barriers, cultural differences, and 
              unfamiliarity with the Canadian healthcare system.
            </p>

            {/* Service Cards */}
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {services.map((service, index) => (
                <Card 
                  key={index}
                  className="border-border hover:shadow-hover transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-[var(--rh-500)]/15 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-[var(--rh-500)]" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Healthcare Partners */}
            <div className="pt-6">
              <h3 className="font-semibold text-foreground mb-4">Healthcare Partners</h3>
              <p className="text-muted-foreground mb-4">
                We work closely with local healthcare providers, hospitals, and community health centers 
                to ensure coordinated, culturally-sensitive care for every newcomer.
              </p>
              <div className="flex flex-wrap gap-4">
                {partners.map((partner, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 px-3 py-2 bg-muted rounded-full hover:shadow-soft transition-all duration-300"
                  >
                    <Image 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="w-6 h-6 rounded-full object-cover"
                      width={24}  
                      height={24}
                    />
                    <span className="text-sm text-muted-foreground font-medium">{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Image Carousel */}
        <div className="relative animate-scale-in lg:sticky lg:top-8">
        <div className="rounded-2xl overflow-hidden shadow-medium">
            <Carousel className="relative w-full">
                {/* allow slides to extend without clipping the rounded wrapper */}
                <CarouselContent className="overflow-visible">
                {carouselImages.map((image, index) => (
                    <CarouselItem key={index} className="p-0">
                    <div className="relative w-full h-[500px]">
                        <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority={index === 0}
                        />
                    </div>
                    </CarouselItem>
                ))}
                </CarouselContent>

                {/* arrows aligned to the image edges */}
                <CarouselPrevious className="!absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="!absolute right-4 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        </div>


            <div className="mt-6 bg-card p-6 rounded-xl shadow-medium border border-border">
              <p className="text-4xl font-bold text-[var(--rh-500)] mb-1">92%</p>
              <p className="text-sm text-muted-foreground">
                of newcomers successfully enrolled in healthcare within their first month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthcareSection;