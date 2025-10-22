import { Card } from '@/components/ui/card'
import { Eye, Target } from 'lucide-react'
import React from 'react'

export const VisionMission = () => {
  return (
    <>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mb-20">
            <Card className="p-10 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-teal-600/20 shadow-card animate-fade-in">
                <div className="w-14 h-14 bg-[var(--rh-500)] rounded-full flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Guide and support refugees and newcomers with the resources, connections, and
                    opportunities they need to build independent successful lives in Canada.
                </p>
            </Card>

            <Card className="p-10 bg-gradient-to-br from-secondary/5 to-primary/5 border-2 border-orange-600/20 shadow-card animate-fade-in" style={{ animationDelay: "150ms" }}>
                <div className="w-14 h-14 bg-orange-600 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-foreground">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    A future where every newcomer finds belonging, security, and the opportunity to build a
                    fulfilling life.
                </p>
            </Card>
        </div>
    </>
  )
}
