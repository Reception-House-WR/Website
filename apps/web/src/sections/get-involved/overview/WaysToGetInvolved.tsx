import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Link, Home } from "lucide-react";

export default function WaysToGetInvolved() {
  return (
    <section aria-labelledby="ways-heading">
      <div className="container mx-auto px-4">
        <h2
          id="ways-heading"
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          Ways to Get Involved
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Volunteer Card */}
          <Card className="shadow-medium hover:shadow-strong transition-shadow group">
            <CardContent className="p-8">
              <div className="bg-[var(--rh-500)]/90 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors">
                <Users className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Volunteer</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Share your time, skills, and compassion to support newcomers as
                they settle into our community. From language support to
                cultural orientation, your help is invaluable.
              </p>
              <Button
                asChild
                className="w-full md:w-auto mx-5 bg-[var(--rh-500)]"
              >
                <a href="/get-involved/volunteer" target="_blank">
                  Volunteer with us
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Rent to Refugees Card */}
          <Card className="shadow-medium hover:shadow-strong transition-shadow group">
            <CardContent className="p-8">
              <div className="bg-[var(--rh-red-500)]/90 w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors">
                <Home className="h-8 w-8 text-secondary" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Rent to Refugees</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Help newcomer families find a safe, welcoming home. As a
                landlord partner, you provide more than housing—you offer
                stability and hope during a crucial transition.
              </p>
              <Button asChild className="w-full md:w-auto bg-[var(--rh-500)]">
                <a href="/programs-and-services/housing">Rent to Refugees</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
