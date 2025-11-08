"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenIcon, DownloadIcon, FileTextIcon, ImageIcon } from 'lucide-react';

const mediaKitItems = [
  {
    id: 1,
    title: "Organization Logo Pack",
    description: "High-resolution logos in PNG, SVG, and vector formats",
    icon: ImageIcon,
    filename: "reception-house-logos.zip",
  },
  {
    id: 2,
    title: "Organizational Overview",
    description: "Comprehensive PDF with our mission, vision, and impact statistics",
    icon: FileTextIcon,
    filename: "organizational-overview.pdf",
  },
  {
    id: 3,
    title: "Brand Guidelines",
    description: "Complete guide to our visual identity and messaging",
    icon: BookOpenIcon,
    filename: "brand-guidelines.pdf",
  },
  {
    id: 4,
    title: "Key Facts & Statistics",
    description: "Latest data on our programs and community impact",
    icon: FileTextIcon,
    filename: "key-facts-2024.pdf",
  },
];

export const MediaKit = () => {
  const handleDownload = (filename: string, title: string) => {
    // In a real implementation, this would trigger an actual download
    console.log(`Downloading: ${filename}`);
    // You would typically use: window.open(`/media-kit/${filename}`, '_blank');
  };
  return (
    <section 
      className="py-16 md:py-24 bg-muted/30"
      aria-labelledby="media-kit-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 
            id="media-kit-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Media Kit
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Download our official media resources for your articles and publications
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mediaKitItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.id}
                className="group transition-all duration-300 hover:shadow-lg"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--rh-500)]/10 text-[var(--rh-500)] transition-colors group-hover:bg-[var(--rh-500)] group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleDownload(item.filename, item.title)}
                    className="w-full gap-2"
                    variant="outline"
                    aria-label={`Download ${item.title}`}
                  >
                    <DownloadIcon className="h-4 w-4" aria-hidden="true" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  )
}
