"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GalleryItem } from "@/lib/strapi/models/mediaRoom/galleryItem";
import { PlayIcon } from "lucide-react";
import React, { useState } from "react";

export const Gallery = ({
  title,
  desc,
  mediaItems,
}: {
  title: string;
  desc: string;
  mediaItems: GalleryItem[];
}) => {
  const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "images" | "videos">(
    "all"
  );

  const newMediaItems = mediaItems.map((item) => ({
    videoUrl: item.videoUrl
      ? item.videoUrl.replace("watch?v=", "embed/")
      : undefined,
    description: item.description,
    isImage: item.isImage,
    image: item.image,
  }));

  const filteredMedia = newMediaItems.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "images") return item.isImage;
    if (activeTab === "videos") return item.isImage === false;
    return true;
  });
  return (
    <section
      className="py-16 md:py-24 bg-muted/30"
      aria-labelledby="gallery-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2
            id="gallery-heading"
            className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {desc}
          </p>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as typeof activeTab)}
          className="mb-8"
        >
          <TabsList aria-label="Filter media gallery">
            <TabsTrigger id="tab-all" value="all" aria-controls="panel-all">
              All Media
            </TabsTrigger>

            <TabsTrigger
              id="tab-images"
              value="images"
              aria-controls="panel-images"
            >
              Photos
            </TabsTrigger>

            <TabsTrigger
              id="tab-videos"
              value="videos"
              aria-controls="panel-videos"
            >
              Videos
            </TabsTrigger>
          </TabsList>

          <div
            id="panel-all"
            role="tabpanel"
            aria-labelledby="tab-all"
            hidden={activeTab !== "all"}
          />

          <div
            id="panel-images"
            role="tabpanel"
            aria-labelledby="tab-images"
            hidden={activeTab !== "images"}
          />

          <div
            id="panel-videos"
            role="tabpanel"
            aria-labelledby="tab-videos"
            hidden={activeTab !== "videos"}
          />
        </Tabs>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMedia.map((item, id) => (
            <button
              key={id}
              onClick={() => setSelectedMedia(item)}
              className="group relative overflow-hidden rounded-lg bg-muted transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`View ${item.image?.alternativeText || "media item"}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image?.url}
                  alt={item.image?.alternativeText || "Thumbnail"}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {item.isImage === false && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="rounded-full bg-[var(--rh-500)] p-4 transition-transform group-hover:scale-110">
                      <PlayIcon
                        className="h-8 w-8 text-white"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="text-sm text-foreground/80 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog
        open={!!selectedMedia}
        onOpenChange={() => setSelectedMedia(null)}
      >
        <DialogContent
          className="max-w-4xl"
          aria-describedby="media-description"
        >
          <DialogTitle className="sr-only">
            {selectedMedia?.image?.alternativeText || "Media Preview"}
          </DialogTitle>
          {selectedMedia && (
            <>
              <div className="relative">
                {selectedMedia.isImage ? (
                  <img
                    src={selectedMedia.image?.url}
                    alt={selectedMedia.image?.alternativeText || "media item"}
                    className="w-full rounded-lg"
                  />
                ) : (
                  <div className="aspect-video">
                    <iframe
                      src={selectedMedia.videoUrl}
                      title={
                        selectedMedia.image?.alternativeText || "media item"
                      }
                      className="h-full w-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
              <DialogDescription id="media-description" className="space-y-2">
                <span className="text-base text-foreground">
                  {selectedMedia.description}
                </span>
                {selectedMedia.description && (
                  <span className="text-sm text-muted-foreground italic">
                    {selectedMedia.description}
                  </span>
                )}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
