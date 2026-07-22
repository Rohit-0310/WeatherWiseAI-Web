'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/shared/stores/app.store';
import { WeatherBackground } from '@/features/weather/components/WeatherBackground';
import { WeatherHero } from '@/features/weather/components/WeatherHero';
import { GaugeHighlights } from '@/features/weather/components/GaugeHighlights';
import { HourlyForecast } from '@/features/weather/components/HourlyForecast';
import { WeeklyForecast } from '@/features/weather/components/WeeklyForecast';
import { AstronomyCards } from '@/features/weather/components/AstronomyCards';

export default function DashboardPage() {
  const { currentLocation } = useAppStore();

  if (!currentLocation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-1000 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 -z-10" />
        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50">
            Welcome to WeatherWiseAI
          </h1>
          <p className="text-muted-foreground text-lg">
            Search for a city above to get your premium, AI-powered weather forecast.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <WeatherBackground />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pb-12 w-full max-w-[1600px] mx-auto gap-4"
      >
        {/* Top Row: Hero & Astronomy */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <WeatherHero />
          </div>
          <div className="lg:col-span-1">
            <AstronomyCards />
          </div>
        </div>
        
        {/* Middle Row: Hourly & 7-Day Forecast */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <HourlyForecast />
          </div>
          <div className="lg:col-span-1">
             <WeeklyForecast />
          </div>
        </div>

        {/* Bottom Row: Gauge Highlights */}
        <div className="w-full">
          <GaugeHighlights />
        </div>
      </motion.div>
    </>
  );
}
