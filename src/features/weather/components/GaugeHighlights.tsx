'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Gauge as GaugeIcon, Eye, Cloud, Leaf } from 'lucide-react';
import { useCurrentWeather } from '../hooks/use-weather';

const SVG_GAUGE = (
  <svg viewBox="0 0 100 50" className="w-full h-auto overflow-visible mt-2">
    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" strokeLinecap="round" />
    <motion.path 
      d="M 10 50 A 40 40 0 0 1 90 50" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="6" 
      strokeLinecap="round"
      strokeDasharray="125"
      initial={{ strokeDashoffset: 125 }}
      animate={{ strokeDashoffset: 40 }} // Dynamic based on value
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="drop-shadow-[0_0_8px_currentColor]"
    />
  </svg>
);

export function GaugeHighlights() {
  const { data: weather, isLoading } = useCurrentWeather();

  if (isLoading || !weather) return null;

  const gauges = [
    { label: 'Air Quality', value: '42', unit: 'Good', icon: Leaf, color: 'text-emerald-400' },
    { label: 'Humidity', value: `${weather.humidity}%`, unit: 'Comfortable', icon: Droplets, color: 'text-blue-400' },
    { label: 'Wind', value: weather.windSpeed.toString(), unit: 'km/h SW', icon: Wind, color: 'text-purple-400' },
    { label: 'Pressure', value: weather.pressure?.toString() || '1029', unit: 'hPa Steady', icon: GaugeIcon, color: 'text-pink-400' },
    { label: 'Visibility', value: weather.visibility?.toString() || '10', unit: 'km Excellent', icon: Eye, color: 'text-teal-400' },
    { label: 'Cloud Cover', value: `${weather.cloudCover || 0}%`, unit: 'Overcast', icon: Cloud, color: 'text-blue-300' },
  ];

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {gauges.map((gauge, index) => {
        const Icon = gauge.icon;
        return (
          <motion.div 
            key={gauge.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex flex-col items-center justify-between p-3 rounded-2xl bg-background/20 backdrop-blur-xl border border-border/10 shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center gap-2 w-full mb-2">
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">{gauge.label}</span>
            </div>
            
            <div className={`relative w-full ${gauge.color}`}>
              {SVG_GAUGE}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 text-foreground">
                <span className="text-lg font-bold">{gauge.value}</span>
                <span className="text-[10px] text-muted-foreground -mt-1">{gauge.unit}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
