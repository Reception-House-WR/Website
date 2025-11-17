"use client"; 

import { Card } from "@/lib/strapi/models/common/card";
import ContactCards from "./ContactCards";
import { ContactForm } from "./ContactForm";
import ParkingInfo from "./ParkingInfo";
import SocialMedia from "./SocialMedia";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { contactInfo } from "@/lib/strapi/models/about/contactInfo";

export default function ContactUsPage({
  title,
  desc,
  parkingSection,
  contactInfoItems
}: {
  title: string,
  desc: string,
  parkingSection: Card,
  contactInfoItems: contactInfo[]
}) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    console.error("reCAPTCHA site key is missing.");
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  {title}
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  {desc}
                </p>
              </div>

              <ContactCards contactInfo={contactInfoItems} />
              <ParkingInfo title={parkingSection.title} desc={parkingSection.description} url={parkingSection.image.url} />
              <SocialMedia />
            </div>

            {/* Contact Form */}
            {siteKey ? (
              <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
                <ContactForm />
              </GoogleReCaptchaProvider>
            ) : (
              <div>
                <p className="text-lg text-destructive">
                  Contact form is temporarily unavailable.
                </p>
                <p className="text-muted-foreground">
                  (reCAPTCHA site key is missing)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
