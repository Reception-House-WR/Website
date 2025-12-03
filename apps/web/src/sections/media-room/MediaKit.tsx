"use client";
import DynamicIcon from '@/components/common/DynamicIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KitCard } from '@/lib/strapi/models/mediaRoom/kitCard';
import { DownloadIcon } from 'lucide-react';

export const MediaKit = ({
  title,
  desc,
  kits
}: {
  title: string;
  desc: string;
  kits: KitCard[]
}) => {
  const handleDownload = (url: string) => {
    window.open(url, '_blank');
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
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {desc}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {kits.map((item, id) => {
            return (
              <Card
                key={id}
                className="group transition-all duration-300 hover:shadow-lg"
                style={{ boxShadow: 'var(--card-shadow)' }}
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--rh-500)]/10 text-[var(--rh-500)] transition-colors group-hover:bg-[var(--rh-500)] group-hover:text-white">
                    <DynamicIcon name={item?.icon} className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-lg">{item?.title}</CardTitle>
                  <CardDescription>{item?.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => handleDownload(item?.kit?.url)}
                    className="w-full gap-2 hover:cursor-pointer"
                    variant="outline"
                    aria-label={`Download ${item?.title}`}
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
