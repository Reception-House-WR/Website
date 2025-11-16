"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export const ContactForm = () => {
  // reCAPTCHA HOOK AND ERROR STATE
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: undefined,
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);

    if (!executeRecaptcha) {
      console.error("reCAPTCHA not available");
      setSubmitError("reCAPTCHA failed to load. Please try again.");
      return;
    }

    try {
      const token = await executeRecaptcha("contactForm");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message.");
      }

      alert("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  return (
    <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
      <Card className="p-8 shadow-card border-2">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          Send Us a Message
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="firstName">First Name *</FieldLabel>
              <div className="gap-y-2">
                <FieldGroup>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="firstName" placeholder="John" />
                    )}
                  />
                </FieldGroup>
                {errors.firstName && (
                  <FieldError className="text-red-600">
                    {errors.firstName.message}
                  </FieldError>
                )}
              </div>
            </Field>

            <Field>
              <FieldLabel htmlFor="lastName">Last Name *</FieldLabel>
              <div className="gap-y-2">
                <FieldGroup>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="lastName" placeholder="Doe" />
                    )}
                  />
                </FieldGroup>
                {errors.lastName && (
                  <FieldError className="text-red-600">
                    {errors.lastName.message}
                  </FieldError>
                )}
              </div>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="email">Email *</FieldLabel>
            <div className="gap-y-2">
              <FieldGroup>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                    />
                  )}
                />
              </FieldGroup>
              {errors.email && (
                <FieldError className="text-red-600">
                  {errors.email.message}
                </FieldError>
              )}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <div className="gap-y-2">
              <FieldGroup>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="phone"
                      inputMode="numeric"
                      type="tel"
                      pattern="[0-9]*"
                      placeholder="(555) 123-4567"
                    />
                  )}
                />
              </FieldGroup>
              {errors.phone && (
                <FieldError className="text-red-600">
                  {errors.phone.message}
                </FieldError>
              )}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="subject">Subject *</FieldLabel>
            <div className="gap-y-2">
              <FieldGroup>
                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="subject"
                      placeholder="How can we help you?"
                    />
                  )}
                />
              </FieldGroup>
              {errors.subject && (
                <FieldError className="text-red-600">
                  {errors.subject.message}
                </FieldError>
              )}
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Message *</FieldLabel>
            <div className="gap-y-2">
              <FieldGroup>
                <Controller
                  name="message"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />
                  )}
                />
              </FieldGroup>
              {errors.message && (
                <FieldError className="text-red-600">
                  {errors.message.message}
                </FieldError>
              )}
            </div>
          </Field>

          {/* ERROR MESSAGE DISPLAY */}
          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full bg-[var(--rh-500)]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            We typically respond within 1-2 business days.
          </p>
        </form>
      </Card>
    </div>
  );
};
