import { Card, CardContent } from "@/components/ui/card";

const stats = [
    { number: "350+", label: "Youth served annually", delay: "0.1s" },
    { number: "15-18", label: "Age range served", delay: "0.2s" },
    { number: "87%", label: "Report improved confidence", delay: "0.3s" },
  ];

export default function Statistics(){
    return (
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {stats.map((item, index) => (
            <Card  
              key={index}
              className="text-center shadow-soft transition-all duration-300 hover:shadow-hover hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: item.delay }}
            >
              <CardContent className="pt-8 pb-6">
                <p className="text-4xl font-bold text-[var(--rh-500)] mb-2 transition-all duration-300 hover:scale-110">
                  {item.number}
                </p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </CardContent>
            </Card>
          )
        )}
        </div>
    );
}