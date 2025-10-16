import { Target } from 'lucide-react'
import React from 'react'

export const Hero = () => {
  return (
    <section className="bg-teal-500 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <Target className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Purpose</h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Driving meaningful change through clarity of purpose, unwavering values, and bold vision for the future.
            </p>
          </div>
        </div>
    </section>
  )
}