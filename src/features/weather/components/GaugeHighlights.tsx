'use client';

import { getAqiDetails } from '@/shared/utils/air-quality';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Gauge as GaugeIcon, Eye, Cloud, Leaf } from 'lucide-react';
import { useCurrentWeather } from '../hooks/use-weather';
import { useAppStore } from '@/shared/stores/app.store';



const getWindDirection = (degree: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degree / 45) % 8];
};



export function GaugeHighlights() {
  const { data: weather, isLoading } = useCurrentWeather();
  const { units } = useAppStore();

  if (isLoading || !weather) return null;

  const aqiInfo = getAqiDetails(weather.aqi);
  const windUnit = units === 'Metric' ? 'km/h' : 'mph';
  const visibilityVal = weather.visibility > 1000 ? Math.round(weather.visibility / 1000) : weather.visibility;
  const visibilityUnit = weather.visibility > 1000 ? 'km' : 'm';

  const gauges = [
    { label: 'European AQI', value: weather.aqi?.toString() ?? 'N/A', unit: aqiInfo.label, icon: Leaf, color: aqiInfo.color, percentage: Math.min(weather.aqi ?? 0, 100) },
    { label: 'Humidity', value: `${weather.humidity}%`, unit: weather.humidity > 60 ? 'High' : 'Comfortable', icon: Droplets, color: 'text-blue-400', percentage: weather.humidity },
    { label: 'Wind', value: weather.windSpeed.toString(), unit: `${windUnit} ${getWindDirection(weather.windDirection)}`, icon: Wind, color: 'text-purple-400', percentage: Math.min((weather.windSpeed / 50) * 100, 100) },
    { label: 'Pressure', value: Math.round(weather.pressure).toString(), unit: 'hPa', icon: GaugeIcon, color: 'text-pink-400', percentage: Math.min(((weather.pressure - 950) / 100) * 100, 100) },
    { label: 'Visibility', value: visibilityVal.toString(), unit: visibilityUnit, icon: Eye, color: 'text-teal-400', percentage: Math.min((weather.visibility / 10000) * 100, 100) },
    { label: 'Cloud Cover', value: weather.cloudCover == null ? "N/A" : `${weather.cloudCover}%`, unit: weather.cloudCover == null ? "Unavailable" : weather.cloudCover > 50 ? 'Overcast' : 'Clear', icon: Cloud, color: 'text-blue-300', percentage: weather.cloudCover ?? 0 },
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
                  animate={{ strokeDashoffset: 125 - (125 * (gauge.percentage / 100)) }} // Dynamic based on value
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="drop-shadow-[0_0_8px_currentColor]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 text-foreground">
                <span className="text-lg font-bold">{gauge.value}</span>
                <span className="text-[10px] text-muted-foreground -mt-1">{gauge.unit}</span>
              </div>
            </div>
          </motion.div>
        );
      })}
      <small className="col-span-full text-muted-foreground">Air quality from <a href="https://open-meteo.com/">Open-Meteo</a> and <a href="https://atmosphere.copernicus.eu/">CAMS ENSEMBLE</a>.</small>
    </div>
  );
}
