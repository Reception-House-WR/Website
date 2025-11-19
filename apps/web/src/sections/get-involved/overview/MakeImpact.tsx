import { Button } from "@/components/ui/button";

const volunteer_opportunities_url =
  "https://www.vomevolunteer.com/organization-details/5ddf59c9-92ac-4daa-82c5-11f9c66b1d0b?/#home";
export default function MakeImpact() {
  return (
    <section className="py-16 bg-gradient-card" aria-labelledby="intro-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="intro-heading"
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Make an Impact
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            There are many ways that you can get involved with Reception House!
            We regularly need volunteers to help us support our clients with
            English skills, navigating the bus system, fundraising or special
            events and day-to-day functions! We have specific volunteer
            opportunities that work with children, youth and adults, as well as
            board and committee volunteer opportunities.
          </p>

          <Button asChild className="mt-8 mx-auto bg-[var(--rh-500)]">
            <a href={volunteer_opportunities_url} target="_blank">
              Explore Volunteer Opportunities
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
