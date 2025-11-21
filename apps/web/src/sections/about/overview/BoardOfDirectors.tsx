import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function BoardOfDirectors({
  title,
  desc,
  image,
  buttonLabel
}: {
  title: string;
  desc: string;
  image?: string;
  buttonLabel: string;
}) {

    return (
        <Card className="overflow-hidden shadow-card animate-fade-in mx-8">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto">
                {image && (
                  <img
                    src={image}
                    alt="Board of Directors"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-accent/5 to-primary/5">
                <h3 className="text-3xl font-bold mb-4 text-foreground">{title}</h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {desc}
                </p>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Share your expertise with Reception House to help us realize our mission at <b> info@receptionhouse.ca </b>
                </p>
                <Button  className="w-fit">
                  {buttonLabel} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
    );
}