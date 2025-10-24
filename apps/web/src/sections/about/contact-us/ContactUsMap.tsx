import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

export default function ContactUsMap() {

    return (

        <div className="mt-16 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-foreground text-center">Find Us</h2>
              <Card className="overflow-hidden shadow-card">
                <div className="aspect-[21/9] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      Interactive map embed placeholder
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      123 Community Drive, Suite 200, City, State 12345
                    </p>
                  </div>
                </div>
              </Card>
        </div>
    );
}