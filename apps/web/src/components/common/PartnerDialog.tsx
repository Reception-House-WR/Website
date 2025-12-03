"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PartnerDialogProps {
  type: "landlord" | "employer";
  buttonText: string;
  title: string;
  description: string;
}

const partnerFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  message: z.string().optional(),
});
type PartnerFormData = z.infer<typeof partnerFormSchema>;

export const PartnerDialog = ({
  type,
  buttonText,
  title,
  description,
}: PartnerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const form = useForm<PartnerFormData>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      message: "",
    },
  });

  const onSubmit = async (values: PartnerFormData) => {
    setSubmitError(null);

    if (!executeRecaptcha) {
      setSubmitError("reCAPTCHA failed to load. Please try again.");
      return;
    }

    try {
      const token = await executeRecaptcha("partnerForm");
      const endpoint = type === "landlord" ? "/api/housing" : "/api/employment";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, token }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to submit form");
      }

      alert("Form submitted successfully!");
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Submit Error:", error);
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-teal-800 hover:cursor-pointer hover:bg-teal-800/90 text-white font-semibold px-8 py-6 text-lg transition-smooth shadow-soft hover:shadow-hover"
        >
          {buttonText}
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[500px]"
        aria-describedby="partner-dialog-description"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription id="partner-dialog-description">
            {description}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
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
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                    />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="organization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {type === "landlord" ? "Property Details" : "Company Name"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={
                        type === "landlord"
                          ? "Address or property details"
                          : "Your company name"
                      }
                      {...field}
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
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Tell us more about your interest in partnering with Reception House..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {submitError && (
              <p className="text-sm text-destructive">{submitError}</p>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
