"use client";

import { Card } from "@/lib/strapi/models/common/card";
import ContactCards from "./ContactCards";
import ParkingInfo from "./ParkingInfo";
import SocialMedia from "./SocialMedia";
import { contactInfo } from "@/lib/strapi/models/about/contactInfo";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const LazyRecaptchaForm = dynamic(
  () => import("./LazyRecaptchaForm").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="text-muted-foreground text-sm">Loading form…</div>
    ),
  }
);

export default function ContactUsPage({
  title,
  desc,
  parkingSection,
  contactInfoItems,
}: {
  title: string;
  desc: string;
  parkingSection: Card;
  contactInfoItems: contactInfo[];
}) {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const formRef = useRef<HTMLDivElement | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    if (!formRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFormVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, []);

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
                <p className="text-lg text-muted-foreground mb-8">{desc}</p>
              </div>

              <ContactCards contactInfo={contactInfoItems} />
              <ParkingInfo
                title={parkingSection.title}
                desc={parkingSection.description}
                url={parkingSection.image?.url ?? ""}
              />
              <SocialMedia />
            </div>

            {/* Contact Form */}
            {/* RIGHT COLUMN — LAZY LOADED FORM */}
            <div ref={formRef} className="min-h-[680px] flex flex-col">
              {isFormVisible ? (
                siteKey ? (
                  <LazyRecaptchaForm siteKey={siteKey} />
                ) : (
                  <div>
                    <p className="text-lg text-destructive">
                      Contact form is temporarily unavailable.
                    </p>
                    <p className="text-muted-foreground">
                      (reCAPTCHA site key is missing)
                    </p>
                  </div>
                )
              ) : (
                <div className="text-sm text-muted-foreground">
                  Scroll to load form…
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
