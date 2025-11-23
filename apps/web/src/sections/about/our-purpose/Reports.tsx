"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AboutReport } from "@/lib/strapi/models/about/report";
import { Download, FileText } from "lucide-react";

export const Reports = ({
  title,
  desc,
  files,
}: {
  title: string;
  desc: string;
  files: AboutReport[];
}) => {
  const formatFileSize = (sizeInKB: number) => {
    if (sizeInKB >= 1024) {
      return `${(sizeInKB / 1024).toFixed(2)} MB`;
    }
    return `${sizeInKB} KB`;
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4">
          <FileText className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-foreground">{title}</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {desc}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {files.map((file, index) => (
          <Card
            key={index}
            className="p-6 hover:shadow-soft transition-all duration-300 border-1 hover:border-blue-500/80"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{file.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {2024} • {formatFileSize(file.document.size)}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 cursor-pointer"
                aria-label="Expand section"
                onClick={() => handleDownload(file.document.url)}
              >
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
