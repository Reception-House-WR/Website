"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PressRelease } from "@/lib/strapi/models/mediaRoom/pressRelease";
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export const PressReleases = ({
  title,
  desc,
  releases,
}: {
  title: string;
  desc: string;
  releases: PressRelease[];
}) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (id: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const formatDate = (dateString: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section
      className="py-16 md:py-24"
      aria-labelledby="press-releases-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            id="press-releases-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {desc}
          </p>
        </div>

        <div className="mx-auto max-w-4xl space-y-4">
          {releases.map((release, id) => (
            <Collapsible
              key={id}
              open={openItems.has(id)}
              onOpenChange={() => toggleItem(id)}
            >
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="relative h-80 w-full mb-4 overflow-hidden rounded-md">
                    <Image
                      src={release.image.url}
                      alt={release.image.alternativeText || release.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                        <p className="text-muted-foreground text-xs">
                          {formatDate(release.date)}
                        </p>
                      </div>
                      <CardTitle className="mb-2 text-xl">
                        {release.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {release.shortDesc}
                      </CardDescription>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="shrink-0"
                        aria-label={
                          openItems.has(id)
                            ? `Collapse ${release.title}`
                            : `Expand ${release.title}`
                        }
                      >
                        {openItems.has(id) ? (
                          <ChevronUpIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDownIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="rounded-lg bg-muted/50 p-4">
                      <p className="text-foreground/90 leading-relaxed">
                        {release.longDesc}
                      </p>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};
