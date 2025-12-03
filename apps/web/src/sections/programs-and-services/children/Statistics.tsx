import { Card, CardContent } from "@/components/ui/card";
import { Analytic } from "@/lib/strapi/models/programs/analytic";

export default function Statistics({
  stats
}: {
  stats: Analytic[];
}){
    return (
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {stats.map((item, index) => (
            <Card  
              key={index}
              className="text-center shadow-soft transition-all duration-300 hover:shadow-hover hover:scale-105 animate-fade-in-up"
            >
              <CardContent className="pt-8 pb-6">
                <p className="text-4xl font-bold text-[var(--rh-500)] mb-2 transition-all duration-300 hover:scale-110">
                  {item.metric}
                </p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          )
        )}
        </div>
    );
}