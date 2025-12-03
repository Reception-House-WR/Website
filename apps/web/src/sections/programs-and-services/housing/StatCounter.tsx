"use client";
import { useEffect, useState, useRef } from "react";

interface StatCounterProps {
  end: number;
  label: string;
  suffix?: string;
  duration?: number;
}

export const StatCounter = ({ end, label, suffix = "", duration = 2000 }: StatCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const startTime = Date.now();
    const endTime = startTime + duration;
    
    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeOutQuart * end));
      
      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    
    requestAnimationFrame(updateCount);
  }, [isVisible, end, duration]);
  
  return (
    <div 
      ref={counterRef}
      className="text-center animate-counter"
      role="status" 
      aria-live="polite"
    >
      <div className="text-5xl font-bold text-teal-700 mb-2">
        {count}{suffix}
      </div>
      <div className="text-lg text-muted-foreground">
        {label}
      </div>
    </div>
  );
};
