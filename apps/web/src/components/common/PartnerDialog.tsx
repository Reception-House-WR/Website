"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PartnerDialogProps {
  type: "landlord" | "employer";
  buttonText: string;
  title: string;
  description: string;
}

export const PartnerDialog = ({ type, buttonText, title, description }: PartnerDialogProps) => {
  const [open, setOpen] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const endpoint = type === "landlord" ? "/api/housing" : "/api/employment";
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to submit form");

      alert("Form submitted successfully!");

      setOpen(false);
      e.currentTarget.reset();
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Something went wrong. Please try again.");
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
      
      <DialogContent className="sm:max-w-[500px]" aria-describedby="partner-dialog-description">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription id="partner-dialog-description">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name" 
              name="name" 
              required 
              aria-required="true"
              placeholder="Your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              aria-required="true"
              placeholder="your.email@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              name="phone" 
              type="tel"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="organization">
              {type === "landlord" ? "Property Details" : "Company Name"}
            </Label>
            <Input 
              id="organization" 
              name="organization"
              placeholder={type === "landlord" ? "Address or property details" : "Your company name"}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              name="message" 
              rows={4}
              placeholder="Tell us more about your interest in partnering with Reception House..."
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
