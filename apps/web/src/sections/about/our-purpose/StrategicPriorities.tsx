import { Card } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

export const StrategicPriorities = ({
    title,
    desc,
    priorities
}: {
    title: string,
    desc: string,
    priorities: {
        priority: number;
        description: string;
    }[]
}) => {
  return (
    <div className="mb-20 animate-fade-in">
        <Card className="p-10 bg-[var(--rh-500)]/5 border-2 border-[var(--rh-500)]/25 shadow-card">
            <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-3 text-foreground">{title}</h2>
                    <p className="text-lg text-muted-foreground">
                    {desc}
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {[...priorities]
                    .sort((a, b) => a.priority - b.priority)
                    .map((priority, index) => (
                        <div
                            key={`${priority?.priority}-${index}`}
                            className="flex items-center gap-4 p-4 bg-card rounded-lg hover:bg-black/5 transition-colors"
                        >
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-white font-bold text-sm">{priority?.priority}</span>
                            </div>
                            <p className="text-lg text-foreground flex-1">{priority?.description}</p>
                        </div>
                    ))}
            </div>
        </Card>
    </div>
  )
}
