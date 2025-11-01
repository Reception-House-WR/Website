import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, DollarSign, ExternalLink, GraduationCap, Heart, HeartPulse, Home, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export const CareersSection = () => {
    // In a real application, this would be fetched from Bamboo API
  const jobListings = [
    {
      title: "Settlement Counselor",
      department: "Client Services",
      type: "Full-time",
      location: "On-site",
      description: "Support refugees and newcomers in accessing services, navigating systems, and building their new lives in Canada.",
      posted: "2 days ago",
    },
    {
      title: "Language Instructor",
      department: "Education",
      type: "Part-time",
      location: "Hybrid",
      description: "Teach English language skills to adult learners from diverse backgrounds using culturally responsive teaching methods.",
      posted: "1 week ago",
    },
    {
      title: "Community Outreach Coordinator",
      department: "Community Engagement",
      type: "Full-time",
      location: "On-site",
      description: "Build relationships with community partners, organize events, and develop programs that support newcomer integration.",
      posted: "3 days ago",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion-Centered",
      description: "We lead with empathy and understanding in everything we do.",
      image: '/assets/stories/story-1.jpg',
    },
    {
      icon: Users,
      title: "Diverse & Inclusive",
      description: "We celebrate diversity and create a welcoming environment for all.",
      image: '/assets/stories/story-1.jpg',
    },
    {
      icon: TrendingUp,
      title: "Growth-Focused",
      description: "We invest in professional development and career advancement.",
      image: '/assets/stories/story-1.jpg',
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Fair salaries aligned with industry standards and experience levels.",
      image: '/assets/stories/story-1.jpg',
    },
    {
      icon: HeartPulse,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and mental health support benefits.",
      image: '/assets/stories/story-1.jpg',
    },
    {
      icon: GraduationCap,
      title: "Professional Development",
      description: "Training opportunities, workshops, and support for continued education.",
      image: '/assets/stories/story-1.jpg',
    },
    {
      icon: Home,
      title: "Work-Life Balance",
      description: "Flexible schedules, generous vacation time, and hybrid work options.",
      image: '/assets/stories/story-1.jpg',
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}

      {/* Working at Reception House Section */}
      <section className="py-12 bg-muted/30" aria-labelledby="culture-heading">
        <div className="container mx-auto px-4">
          <h2 id="culture-heading" className="text-3xl md:text-4xl font-bold text-center mb-4">
            Working at Reception House
          </h2>
          <p className="text-muted-foreground text-center leading-relaxed max-w-3xl mx-auto mb-10">
            At Reception House, you'll join a team of passionate professionals dedicated to supporting 
            refugees and newcomers. We foster a collaborative, supportive environment where every team 
            member's contribution makes a real difference in people's lives.
          </p>
          
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-medium transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="bg-[var(--rh-500)]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-[var(--rh-500)]" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-card" aria-labelledby="benefits-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 id="benefits-heading" className="text-3xl md:text-4xl font-bold text-center mb-12">
              Employee Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card 
                  key={index} 
                  className="overflow-hidden shadow-soft hover:shadow-medium transition-all duration-300 group animate-fade-in pt-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={benefit.image} 
                        alt={benefit.title}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-background/30" />
                      <div className="absolute top-4 left-4 bg-[var(--rh-500)]/90 w-12 h-12 rounded-full flex items-center justify-center">
                        <benefit.icon className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16 bg-muted" aria-labelledby="openings-heading">
        <div className="container mx-auto px-4">
          <h2 id="openings-heading" className="text-3xl md:text-4xl font-bold text-center mb-4">
            Current Openings
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Explore our current opportunities and find the role that matches your skills and passion for community service.
          </p>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {jobListings.map((job, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-shadow">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="h-6 w-6 text-primary" aria-hidden="true" />
                        <h3 className="text-2xl font-bold">{job.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                        <span>{job.department}</span>
                        <span aria-hidden="true">•</span>
                        <span>{job.type}</span>
                        <span aria-hidden="true">•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">Posted {job.posted}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{job.description}</p>
                  <Button asChild className='bg-[var(--rh-500)]'>
                    <a 
                      href="#apply" 
                      className="inline-flex items-center gap-2"
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
