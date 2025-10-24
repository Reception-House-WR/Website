import { Card } from "@/components/ui/card";
import { Car } from "lucide-react";

export default function ParkingInfo() {
    return (
        <Card className="p-6 bg-gradient-to-br from-accent/5 to-primary/5 border-2 border-accent/20">
            <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Car className="w-6 h-6 text-accent" />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Parking Information</h3>
                <p className="text-muted-foreground mb-2">
                Free parking is available in our main lot and street parking on Community Drive. 
                Accessible parking spaces are located near the main entrance.
                </p>
                <p className="text-sm text-muted-foreground">
                Additional overflow parking available at the north lot during peak hours.
                </p>
            </div>
            </div>
        </Card>
    );
}