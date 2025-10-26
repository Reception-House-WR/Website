import { Barriers } from "./Barriers";
import Prorams from "./Programs";
import Statistics from "./Statistics";
import { YouthCommittee } from "./YouthCommittee";

export default function YouthSection() {
  return (
       <section className="py-20 bg-background" id="children-and-youth">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">

            {/* Header */}
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Children and Youth Programs
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Young newcomers face unique challenges adapting to a new country, language, and culture. 
                Our youth programs provide the support, mentorship, and opportunities they need to thrive.
              </p>
            </div>

            {/* Stats Banner */}
            <Statistics />

            {/* Programs Photo Cards */}
            <Prorams />

            {/* Youth Advisory Committee Section */}
            <YouthCommittee />

            {/* Barriers Section */}
            <Barriers /> 
          </div>
        </div>
      </section>
    );
}