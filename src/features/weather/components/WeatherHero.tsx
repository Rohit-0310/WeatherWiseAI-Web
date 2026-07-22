'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudLightning, CloudRain, Snowflake, Sun, MapPin, Droplets, Wind, Leaf, Sun as SunIcon } from 'lucide-react';
import { useCurrentWeather } from '../hooks/use-weather';
import { useAppStore } from '@/shared/stores/app.store';

const renderIcon = (code: string, className = "w-12 h-12") => {
  switch (code) {
    case 'Clear': return <Sun className={`${className} text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]`} />;
    case 'Rain': 
    case 'Drizzle': return <CloudRain className={`${className} text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]`} />;
    case 'Thunderstorm': return <CloudLightning className={`${className} text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]`} />;
    case 'Snow': return <Snowflake className={`${className} text-slate-200 drop-shadow-[0_0_15px_rgba(226,232,240,0.5)]`} />;
    default: return <Cloud className={`${className} text-slate-300 drop-shadow-[0_0_15px_rgba(203,213,225,0.3)]`} />;
  }
};

export function WeatherHero() {
  const { data: weather, isLoading } = useCurrentWeather();
  const { currentLocation, units } = useAppStore();

  if (isLoading || !weather || !currentLocation) {
    return (
      <div className="w-full min-h-[300px] rounded-3xl bg-background/20 backdrop-blur-xl border border-border/10 p-8 animate-pulse flex flex-col justify-between">
        <div className="w-48 h-8 bg-foreground/10 rounded-lg mb-8" />
        <div className="flex gap-8">
          <div className="w-32 h-32 bg-foreground/10 rounded-2xl" />
          <div className="flex-1 space-y-4">
            <div className="w-48 h-12 bg-foreground/10 rounded-lg" />
            <div className="w-32 h-6 bg-foreground/10 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const tempUnit = units === 'Metric' ? '°C' : '°F';

  return (
    <div className="w-full relative overflow-hidden flex flex-col md:flex-row gap-6 items-start bg-background/20 backdrop-blur-xl border border-border/10 p-6 rounded-3xl shadow-2xl h-full">
      <div className="flex-1 flex flex-col">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-medium tracking-wide">
            {currentLocation.name}, {currentLocation.country}
          </h2>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="text-[80px] font-light leading-none tracking-tighter"
          >
            {Math.round(weather.temperature)}°
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center sm:items-start"
          >
            <div className="mb-2">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                {renderIcon(weather.condition.code, "w-20 h-20")}
              </motion.div>
            </div>
            <h3 className="text-2xl font-semibold tracking-wide">{weather.condition.description}</h3>
            <p className="text-muted-foreground">Feels like {Math.round(weather.feelsLike || weather.temperature)}°</p>
          </motion.div>
        </div>

        {/* Highlight Pills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-3"
        >
          <Pill icon={Leaf} label="AQI" value="42" sub="Good" color="text-emerald-400" border="border-emerald-500/30" />
          <Pill icon={CloudRain} label="Rain" value="17%" color="text-blue-400" border="border-blue-500/30" />
          <Pill icon={Wind} label="Wind" value={`${weather.windSpeed} km/h`} sub="SW" color="text-purple-400" border="border-purple-500/30" />
          <Pill icon={Droplets} label="Humidity" value={`${weather.humidity}%`} color="text-blue-300" border="border-blue-400/30" />
          <Pill icon={SunIcon} label="UV Index" value={`${weather.uvIndex || 4}`} sub="Moderate" color="text-yellow-400" border="border-yellow-500/30" />
        </motion.div>
      </div>
    </div>
  );
}

function Pill({ icon: Icon, label, value, sub, color, border }: any) {
  return (
    <div className={`flex items-center gap-3 px-3 py-1.5 rounded-2xl bg-background/30 backdrop-blur-md border ${border} shadow-lg`}>
      <Icon className={`w-4 h-4 ${color}`} />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
          <span className="text-sm font-bold">{value}</span>
        </div>
        {sub && <span className={`text-[10px] font-medium ${color}`}>{sub}</span>}
      </div>
    </div>
  );
}
