'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Gauge, Eye, Sun, Sunset } from 'lucide-react';
import { useCurrentWeather } from '../hooks/use-weather';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/shared/stores/app.store';

interface HighlightCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  delay?: number;
  className?: string;
}

function HighlightCard({ title, value, subtitle, icon, delay = 0, className }: HighlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn(
        "relative flex flex-col p-6 rounded-3xl overflow-hidden group hover:-translate-y-1 transition-all duration-300",
        "bg-background/40 backdrop-blur-xl border border-border/20 shadow-lg hover:shadow-xl",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="flex items-center gap-3 mb-4 text-muted-foreground">
        <div className="p-2 rounded-xl bg-foreground/5 backdrop-blur-md">
          {icon}
        </div>
        <span className="font-medium tracking-wide text-sm uppercase">{title}</span>
      </div>
      
      <div className="mt-auto">
        <div className="text-3xl font-semibold tracking-tight mb-1">{value}</div>
        {subtitle && (
          <div className="text-sm font-medium text-muted-foreground">{subtitle}</div>
        )}
      </div>
    </motion.div>
  );
}

export function WeatherHighlights() {
  const { data: weather, isLoading } = useCurrentWeather();
  const { units } = useAppStore();

  if (isLoading || !weather) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-40 rounded-3xl bg-foreground/5 animate-pulse backdrop-blur-md" />
        ))}
      </div>
    );
  }

  const speedUnit = units === 'Metric' ? 'km/h' : 'mph';

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
      <HighlightCard
        title="Humidity"
        value={`${weather.humidity}%`}
        subtitle="Comfortable"
        icon={<Droplets className="w-5 h-5 text-blue-400" />}
        delay={0.1}
      />
      <HighlightCard
        title="Wind"
        value={`${weather.windSpeed} ${speedUnit}`}
        subtitle="Moderate breeze"
        icon={<Wind className="w-5 h-5 text-teal-400" />}
        delay={0.2}
      />
      <HighlightCard
        title="Pressure"
        value={`${weather.pressure} hPa`}
        subtitle="Steady"
        icon={<Gauge className="w-5 h-5 text-indigo-400" />}
        delay={0.3}
      />
      <HighlightCard
        title="Visibility"
        value={`${weather.visibility} km`}
        subtitle="Excellent"
        icon={<Eye className="w-5 h-5 text-emerald-400" />}
        delay={0.4}
      />
      <HighlightCard
        title="UV Index"
        value={weather.uvIndex?.toString() || "0"}
        subtitle="Moderate"
        icon={<Sun className="w-5 h-5 text-yellow-500" />}
        delay={0.5}
      />
      <HighlightCard
        title="Sun Path"
        value={weather.sunset || "19:00"}
        subtitle={`Sunrise ${weather.sunrise}`}
        icon={<Sunset className="w-5 h-5 text-orange-400" />}
        delay={0.6}
      />
    </div>
  );
}
