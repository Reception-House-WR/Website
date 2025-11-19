import { Button } from "@/components/ui/button";

const volunteer_opportunities_url =
  "https://www.vomevolunteer.com/organization-details/5ddf59c9-92ac-4daa-82c5-11f9c66b1d0b?/#home";
export default function MakeImpact({
  title,
  desc,
  buttonText,
  buttonLink
}: {
  title: string;
  desc: string;
  buttonText: string;
  buttonLink: string;
}) {
  return (
    <section className="py-16 bg-gradient-card" aria-labelledby="intro-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="intro-heading"
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            {title}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {desc}
          </p>

          <Button asChild className="mt-8 mx-auto bg-[var(--rh-500)]">
            <a href={buttonLink} target="_blank">
              {buttonText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
