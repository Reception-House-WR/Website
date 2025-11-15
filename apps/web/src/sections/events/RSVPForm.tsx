"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.email(),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => {
        // If the field is empty (it's optional), it's valid.
        if (!val) return true;

        // Strip all non-digit characters
        const digits = val.replace(/\D/g, "");

        // Check if the remaining digits are within a reasonable length
        // (e.g., at least 10 for a standard number)
        return digits.length >= 10 && digits.length <= 15;
      },
      {
        // This message will show if the refinement fails
        message:
          "Phone number is not valid. Please enter a valid phone number.",
      }
    ),
  attendees: z.number().min(1, "You must have at least 1 attendee."),
  message: z.string().optional(),
  newsletter: z.boolean().optional(),
});

interface RSVPFormProps {
  eventTitle: string;
  eventDate: string;
  onClose: () => void;
}

export function RSVPForm({ eventTitle, eventDate, onClose }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      attendees: 1,
      message: "",
      newsletter: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);

    if (!executeRecaptcha) {
      console.error("reCAPTCHA not available");
      setSubmitError("reCAPTCHA failed to load. Please try again.");
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Get the reCAPTCHA token
      const token = await executeRecaptcha("rsvpForm");

      // 2. Send all data to backend API
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          eventTitle,
          eventDate,
          token,
        }),
      });

      if (!response.ok) {
        // Handle bot or server errors
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit RSVP.");
      }

      // 3. Success!
      alert("RSVP Confirmed!");
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address *</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attendees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Attendees *</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(
                      value === "" ? undefined : parseInt(value, 10)
                    );
                  }}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any questions or special requirements?"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Join our newsletter</FormLabel>
                <FormDescription>
                  Receive email updates about future events and news from
                  Reception House.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <DialogFooter className="pt-4">
          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}
          <div className="flex w-full justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[var(--rh-500)] text-[var(--primary-foreground)] hover:bg-[var(--rh-400)]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Confirm RSVP"}
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}
