import { Card } from "@/components/ui/card";
import { Car } from "lucide-react";

export default function ParkingInfo() {
    return (
        <Card className="p-6 bg-gradient-to-br from-blue-600/5 to-blue-300/5 border-2 border-accent/20">
            <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Car className="w-6 h-6 text-blue-600" />
            </div>
            <div>
                <h3 className="font-bold text-lg mb-2 text-foreground">Parking Information</h3>
                <p className="text-muted-foreground mb-2">
                Free parking is available in our main lot and street parking on Community Drive. 
                Accessible parking spaces are located near the main entrance.
                </p>
            </div>
            </div>
            <img
            src="/assets/parking/1.png"
            alt="Parking Map"
            className="mt-4 w-full h-auto rounded-md border border-muted-foreground/10 shadow-sm"
            />
        </Card>
    );
}