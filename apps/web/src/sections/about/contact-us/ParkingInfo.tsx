"use client";
import { Card } from "@/components/ui/card";
import { Car } from "lucide-react";
import Image from "next/image";

export default function ParkingInfo({
  title,
  desc,
  url,
}: {
  title: string;
  desc: string;
  url: string;
}) {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-600/5 to-blue-300/5 border-2 border-accent/20">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
          <Car className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground mb-2">{desc}</p>
        </div>
      </div>
      {url && (
        <div className="relative w-full h-64 rounded-lg overflow-hidden">
          <Image
            src={url}
            alt={title}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 600px"
            className="mt-4 w-full h-auto rounded-md border border-muted-foreground/10 shadow-sm"
          />
        </div>
      )}
    </Card>
  );
}
