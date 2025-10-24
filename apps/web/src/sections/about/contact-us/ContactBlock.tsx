import ContactCards from "./ContactCards";
import { ContactForm } from "./ContactForm";
import ParkingInfo from "./ParkingInfo";
import SocialMedia from "./SocialMedia";

export default function ContactBlock(){
    return (

        <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Contact Information */}
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-foreground">Get in Touch</h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Whether you're seeking services, want to get involved, or have questions about our work, 
                    we'd love to hear from you.
                  </p>
                </div>

                {/* Contact Cards */}
                <ContactCards />

                {/* Parking Information */}
                <ParkingInfo />

                {/* Social Media */}
                <SocialMedia />
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    );
}