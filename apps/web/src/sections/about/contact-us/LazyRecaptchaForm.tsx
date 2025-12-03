"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import dynamic from "next/dynamic";

const ContactForm = dynamic(
  () => import("./ContactForm").then((m) => m.ContactForm),
  { ssr: false }
);

export default function LazyRecaptchaForm({ siteKey }: { siteKey: string }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{ async: true, defer: true }}
    >
      <ContactForm />
    </GoogleReCaptchaProvider>
  );
}
