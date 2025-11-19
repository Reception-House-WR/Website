import { Feature } from "@/lib/strapi/models/programs/feature";

export default function Barriers({
  title,
  desc,
  features,
  galleryTitle,
  galleryDesc
}: {
  title: string;
  desc: string;
  features: Feature[];
  galleryTitle: string;
  galleryDesc: string;
}) {
  return (
    <section >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-foreground text-center">
            {title}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">
            {desc}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {features.map((feature) => (
              <div key={feature.title} className="bg-card rounded-lg p-6 shadow-soft">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div >
          <h2 className="text-4xl font-bold text-foreground text-center">
            {galleryTitle}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            {galleryDesc}
          </p>
        </div>
    </section>
  );
}
