'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO, isToday } from 'date-fns';
import { Cloud, CloudLightning, CloudRain, Snowflake, Sun, Droplets } from 'lucide-react';
import { useWeeklyForecast } from '../hooks/use-forecast';
import { WeeklyForecastData } from '@/shared/types/weather';

const renderIcon = (code: string, className = "w-6 h-6") => {
  switch (code) {
    case 'Clear': return <Sun className={`${className} text-yellow-500`} />;
    case 'Rain': 
    case 'Drizzle': return <CloudRain className={`${className} text-blue-400`} />;
    case 'Thunderstorm': return <CloudLightning className={`${className} text-purple-400`} />;
    case 'Snow': return <Snowflake className={`${className} text-slate-200`} />;
    default: return <Cloud className={`${className} text-slate-400`} />;
  }
};

export function WeeklyForecast() {
  const { data: forecast, isLoading } = useWeeklyForecast();

  if (isLoading || !forecast) {
    return (
      <div className="w-full h-full min-h-[300px] rounded-3xl bg-background/20 backdrop-blur-xl border border-border/10 p-6 flex flex-col gap-6">
        <div className="h-6 w-32 bg-foreground/10 animate-pulse rounded-lg" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="w-full h-10 bg-foreground/10 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const days = forecast.days || [];
  
  // Calculate global min and max across the week for the progress bar bounds
  const globalMin = Math.min(...days.map((d: WeeklyForecastData) => d.minTemperature));
  const globalMax = Math.max(...days.map((d: WeeklyForecastData) => d.maxTemperature));
  const tempRange = globalMax - globalMin;

  return (
    <div className="w-full h-full rounded-3xl bg-background/20 backdrop-blur-xl border border-border/10 p-5 flex flex-col shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium tracking-tight">7-Day Forecast</h3>
      </div>

      <div className="flex flex-col gap-1.5 flex-1 justify-center">
        {days.map((day: WeeklyForecastData, index: number) => {
          const date = parseISO(day.date);
          const dayName = isToday(date) ? 'Today' : format(date, 'EEE');
          const dayDate = format(date, 'd MMM');
          
          const maxTemp = Math.round(day.maxTemperature);
          const minTemp = Math.round(day.minTemperature);

          // Calculate percentage for progress bar
          const leftPercent = ((day.minTemperature - globalMin) / tempRange) * 100;
          const widthPercent = ((day.maxTemperature - day.minTemperature) / tempRange) * 100;

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              className="flex items-center justify-between group py-1.5 px-2 hover:bg-foreground/5 rounded-xl transition-colors"
            >
              {/* Day & Date */}
              <div className="w-20 flex flex-col">
                <span className="font-medium text-sm sm:text-base">{dayName}</span>
                <span className="text-[10px] text-muted-foreground">{dayDate}</span>
              </div>

              {/* Icon & Rain Chance */}
              <div className="w-16 flex flex-col items-center justify-center">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {renderIcon(day.condition.code, "w-5 h-5")}
                </div>
                {day.precipitationChance && day.precipitationChance > 0 ? (
                  <span className="text-[9px] font-bold text-blue-400 flex items-center gap-0.5 mt-0.5 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]">
                    <Droplets className="w-2.5 h-2.5" />
                    {day.precipitationChance}%
                  </span>
                ) : (
                  <span className="h-[12px]"></span> // Spacing matching
                )}
              </div>

              {/* Temperature Bar */}
              <div className="flex-1 flex items-center gap-3 justify-end min-w-[120px] ml-4">
                <span className="text-sm font-medium w-6 text-right text-foreground/70">{minTemp}°</span>
                
                <div className="flex-1 h-1.5 bg-foreground/10 rounded-full overflow-hidden relative max-w-[100px] shadow-inner">
                  <motion.div 
                    initial={{ width: 0, left: `${leftPercent}%` }}
                    animate={{ width: `${widthPercent}%`, left: `${leftPercent}%` }}
                    transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                    className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                  />
                </div>
                
                <span className="text-sm font-semibold w-6">{maxTemp}°</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
