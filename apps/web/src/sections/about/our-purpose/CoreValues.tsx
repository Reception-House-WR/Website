import { Card } from "@/components/ui/card";
import { Value } from "@/lib/strapi/models/about/value";
import { HeartIcon } from "lucide-react";

export const CoreValues = ({
  title,
  desc,
  values
}: {
  title?: string,
  desc?: string,
  values: Value[]
}) => {
  return (
<>
    <div className="mb-20 animate-fade-in">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">{title}</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {desc}
            </p>
        </div>

        <div className="flex flex-wrap flex-row justify-center gap-6">
            {values.map((value, index) => {
            // const Icon = value.icon;
            return (
                <Card
                key={value?.name}
                className="p-6 text-center hover:shadow-soft transition-all duration-300 border-2 hover:border-[var(--rh-500)] animate-scale-in min-w-40 max-w-80"
                style={{ animationDelay: `${index * 100}ms` }}
                >
                <div className="w-16 h-16 bg-[var(--rh-500)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{value?.name}</h3>
                <p className="text-muted-foreground">{value?.description}</p>
                </Card>
            );
            })}
        </div>
    </div>
    </>
  )
}
