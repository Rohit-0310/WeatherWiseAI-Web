'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO, isSameHour } from 'date-fns';
import { Cloud, CloudLightning, CloudRain, Snowflake, Sun, Droplets } from 'lucide-react';
import { useHourlyForecast } from '../hooks/use-forecast';
import { useAppStore } from '@/shared/stores/app.store';
import { HourlyForecastData } from '@/shared/types/weather';

const renderIcon = (code: string, className = "w-6 h-6") => {
  switch (code) {
    case 'Clear': return <Sun className={`${className} text-yellow-400`} />;
    case 'Rain': 
    case 'Drizzle': return <CloudRain className={`${className} text-blue-400`} />;
    case 'Thunderstorm': return <CloudLightning className={`${className} text-purple-400`} />;
    case 'Snow': return <Snowflake className={`${className} text-slate-200`} />;
    default: return <Cloud className={`${className} text-slate-400`} />;
  }
};

export function HourlyForecast() {
  const { data: forecast, isLoading } = useHourlyForecast();
  const { units } = useAppStore();
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Use a state for current time to avoid hydration mismatch, though isSameHour is usually fine
  const [now] = React.useState(new Date());

  if (isLoading || !forecast) {
    return (
      <div className="w-full h-full min-h-[300px] rounded-3xl bg-background/20 backdrop-blur-xl border border-border/10 p-6 flex flex-col gap-6 overflow-hidden">
        <div className="h-6 w-32 bg-foreground/10 animate-pulse rounded-lg" />
        <div className="flex gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-w-[80px] h-32 bg-foreground/10 animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const hours = forecast.hours || [];
  
  // Calculate coordinates for the SVG Line chart
  const minTemp = Math.min(...hours.map((h: any) => h.temperature));
  const maxTemp = Math.max(...hours.map((h: any) => h.temperature));
  const tempRange = maxTemp - minTemp || 1; // Prevent divide by zero

  const colWidth = 102; // 90px min-w + 12px gap

  // Generate path string for curved line
  let pathString = "";
  const points = hours.map((hour: HourlyForecastData, index: number) => {
    const x = index * colWidth + (colWidth / 2);
    // Normalize Y between 20 and 80 for the SVG box
    const normalizedY = 80 - (((hour.temperature - minTemp) / tempRange) * 60);
    if (index === 0) pathString += `M ${x} ${normalizedY} `;
    else {
      // Smooth curve
      const prevX = (index - 1) * colWidth + (colWidth / 2);
      const prevY = 80 - (((hours[index-1].temperature - minTemp) / tempRange) * 60);
      const controlX = (prevX + x) / 2;
      pathString += `C ${controlX} ${prevY}, ${controlX} ${normalizedY}, ${x} ${normalizedY} `;
    }
    return { x, y: normalizedY };
  });

  const firstX = points[0]?.x || 0;
  const lastX = points[points.length - 1]?.x || 0;
  const fillPathString = `${pathString} L ${lastX} 120 L ${firstX} 120 Z`;

  return (
    <div className="w-full h-full rounded-3xl bg-background/20 backdrop-blur-xl border border-border/10 p-5 flex flex-col shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-8 z-10">
        <h3 className="text-lg font-medium tracking-tight">Hourly Forecast</h3>
        <span className="text-sm text-muted-foreground">Next 24 Hours</span>
      </div>

      <div 
        ref={containerRef}
        className="flex overflow-x-auto pb-4 gap-3 snap-x scrollbar-hide relative z-10 flex-1 items-end" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* SVG Line Chart Overlay inside the scroll container */}
        <div className="absolute top-1/2 left-0 w-full h-32 -mt-16 pointer-events-none z-0" style={{ width: hours.length * colWidth }}>
          <svg width="100%" height="100%" viewBox={`0 0 ${hours.length * colWidth} 100`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="1" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* The Fill Area */}
            <motion.path
              d={fillPathString}
              fill="url(#fillGradient)"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
            />

            {/* The Gradient Line */}
            <motion.path 
              d={pathString} 
              fill="none" 
              stroke="url(#lineGradient)" 
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="drop-shadow-[0_0_10px_rgba(192,132,252,0.5)]"
            />
            {/* The Points */}
            {points.map((p: any, i: number) => (
              <motion.circle 
                key={i} 
                cx={p.x} 
                cy={p.y} 
                r="5" 
                fill="#0f172a" 
                stroke="url(#lineGradient)"
                strokeWidth="3"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 + 1, duration: 0.3 }}
                className="drop-shadow-[0_0_8px_rgba(129,140,248,0.9)]"
              />
            ))}
          </svg>
        </div>

        {hours.map((hour: HourlyForecastData, index: number) => {
          const date = parseISO(hour.time);
          const isNow = isSameHour(date, now);
          
          return (
            <motion.div
              key={hour.time}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
              className={`snap-start min-w-[90px] h-full min-h-[150px] flex flex-col items-center justify-between p-3 rounded-2xl transition-all duration-300 z-10
                ${isNow ? 'bg-primary/10 border border-primary/30 shadow-glow-purple backdrop-blur-md' : 'hover:bg-foreground/5 border border-transparent backdrop-blur-sm bg-background/5'}`}
            >
              <span className={`text-sm font-medium ${isNow ? 'text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'text-foreground/80'}`}>
                {isNow ? 'Now' : format(date, 'h a')}
              </span>
              
              <div className="flex flex-col items-center gap-1 my-8">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3 + (index % 2), ease: "easeInOut" }}
                >
                  {renderIcon(hour.condition.code, "w-6 h-6")}
                </motion.div>
                
                {hour.precipitationChance && hour.precipitationChance > 0 ? (
                  <span className="text-[10px] font-bold text-blue-400 flex items-center gap-1 mt-2 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]">
                    <Droplets className="w-3.5 h-3.5" />
                    {hour.precipitationChance}%
                  </span>
                ) : (
                  <span className="h-5"></span>
                )}
              </div>

              <span className="text-xl font-semibold tracking-tighter mt-auto drop-shadow-md">
                {Math.round(hour.temperature)}°
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
