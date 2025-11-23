import { Card } from '@/components/ui/card'
import { Eye, Target } from 'lucide-react'
import React from 'react'

export const VisionMission = ({
    missionTitle,
    missionDesc,
    visionTitle,
    visionDesc
}: {
    missionTitle: string,
    missionDesc: string,
    visionTitle: string,
    visionDesc: string
}) => {
  return (
    <>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
            <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-teal-600/20 shadow-card animate-fade-in">
                <div className="w-14 h-14 bg-[var(--rh-500)] rounded-full flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">{missionTitle}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {missionDesc}
                </p>
            </Card>

            <Card className="p-10 bg-gradient-to-br from-secondary/5 to-primary/5 border-2 border-orange-600/20 shadow-card animate-fade-in" style={{ animationDelay: "150ms" }}>
                <div className="w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">{visionTitle}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    {visionDesc}
                </p>
            </Card>
        </div>
    </>
  )
}
