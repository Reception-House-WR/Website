import { ProgramCard } from "@/lib/strapi/models/programs/programCard";

export default function RapAndCss({
  rapSection,
  cssSection
}: {
  rapSection: ProgramCard;
  cssSection: ProgramCard;
}) {
  return (
    <section className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="inline-block bg-[var(--rh-green-600)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-2">
              {rapSection.time}
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {rapSection.title}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {rapSection.description}
            </p>

            <ul className="space-y-4">
              {rapSection.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--rh-green-600)] text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1 text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <strong className="text-foreground">{step.key}:</strong>
                    <p className="text-muted-foreground">{step.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <img
                src={rapSection.image?.url}
                alt={rapSection.image?.alternativeText || "Instructor helping students during orientation session"}
                className="rounded-lg shadow-soft w-full"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block bg-[var(--rh-500)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-2">
              {cssSection.time}
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {cssSection.title}
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {cssSection.description}
            </p>

            <ul className="space-y-4">
              {cssSection.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[var(--rh-500)] text-white flex items-center justify-center flex-shrink-0 mt-1 text-sm font-medium">
                    {idx + 1}
                  </div>
                  <div>
                    <strong className="text-foreground">{step.key}:</strong>
                    <p className="text-muted-foreground">{step.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <img
                src={cssSection.image?.url}
                alt={cssSection.image?.alternativeText || ""}
                className="rounded-lg shadow-soft w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
