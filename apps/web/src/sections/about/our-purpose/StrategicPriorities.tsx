import { Card } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'

const strategicGoals = [
  "Expand services to reach 50% more families by 2026",
  "Develop innovative programs addressing emerging community needs",
  "Strengthen partnerships with local organizations and businesses",
  "Enhance staff development and organizational capacity",
  "Achieve financial sustainability through diversified funding streams",
];

export const StrategicPriorities = () => {
  return (
    <div className="mb-20 animate-fade-in">
        <Card className="p-10 bg-[var(--rh-500)]/5 border-2 border-[var(--rh-500)]/25 shadow-card">
            <div className="flex items-start gap-6 mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold mb-3 text-foreground">Strategic Priorities 2024-2026</h2>
                    <p className="text-lg text-muted-foreground">
                    Our roadmap for expanded impact and organizational excellence.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {strategicGoals.map((goal: string, index: number) => (
                    <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-card rounded-lg hover:bg-black/5 transition-colors"
                    >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                        <p className="text-lg text-foreground flex-1">{goal}</p>
                    </div>
                ))}
            </div>
        </Card>
    </div>
  )
}
