'use client';

import { getAqiDetails } from '@/shared/utils/air-quality';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudLightning, CloudRain, Snowflake, Sun, MapPin, Droplets, Wind, Leaf, Sun as SunIcon, Eye } from 'lucide-react';
import { useCurrentWeather } from '../hooks/use-weather';
import { useAppStore } from '@/shared/stores/app.store';
import { formatWindSpeed, formatVisibility } from '@/shared/utils/formatters';

const getWindDirection = (degree: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(degree / 45) % 8];
};



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
  const { currentLocation, units, preferences } = useAppStore();

  if (isLoading || !weather || !currentLocation) {
    return (
      <div className="w-full min-h-[300px] p-6 animate-pulse flex flex-col justify-between">
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
    <div className="w-full relative flex flex-col h-full pt-4">
      {/* Location */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col mb-10"
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-muted-foreground" />
          <h2 className="text-xl font-medium tracking-wide">
            {currentLocation.name}, {currentLocation.country}
          </h2>
        </div>
        <p className="text-sm text-muted-foreground ml-7 mt-1">
          {weather.latitude.toFixed(4)}° N, {weather.longitude.toFixed(4)}° E
        </p>
      </motion.div>

      {/* Main Weather */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-10 flex-1">
        {/* Temperature Block */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="flex flex-col items-center sm:items-start"
        >
          <div className="flex items-start">
            <span className="text-[100px] sm:text-[120px] font-light leading-[0.8] tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70 drop-shadow-sm">
              {Math.round(weather.temperature)}
            </span>
            <span className="text-3xl sm:text-4xl mt-2 ml-1 font-medium text-foreground/50 bg-clip-text text-transparent bg-gradient-to-b from-muted-foreground to-muted-foreground/30">
              {tempUnit}
            </span>
          </div>
          <div className="text-sm sm:text-base text-muted-foreground mt-4 font-medium bg-foreground/5 px-4 py-1.5 rounded-full border border-border/10 shadow-inner flex items-center gap-1">
            Feels like <span className="text-foreground/90 font-semibold">{Math.round(weather.feelsLike)}{tempUnit}</span>
          </div>
        </motion.div>
        
        {/* Condition Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-6"
        >
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            {renderIcon(weather.condition.code, "w-28 h-28")}
          </motion.div>
          <div className="flex flex-col">
            <h3 className="text-3xl font-semibold tracking-wide mb-1 drop-shadow-md">{weather.condition.description}</h3>
            <p className="text-muted-foreground text-sm mb-3">Cloudy skies. Pleasantly warm.</p>
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-1 text-foreground/90"><span className="text-xl leading-none">↑</span> {Math.round(weather.maxTemperature)}{tempUnit}</span>
              <span className="flex items-center gap-1 text-foreground/90"><span className="text-xl leading-none">↓</span> {Math.round(weather.minTemperature)}{tempUnit}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Highlight Pills */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-4 w-full items-center mt-auto pb-4"
      >
        <Pill icon={Leaf} label="European AQI" value={weather.aqi ?? "N/A"} sub={getAqiDetails(weather.aqi).label} color={getAqiDetails(weather.aqi).color} />
        <Pill icon={CloudRain} label="Rain" value={`${weather.precipitationChance}%`} color="text-blue-400" />
        <Pill icon={Wind} label="Wind" value={formatWindSpeed(weather.windSpeed, units, preferences)} sub={getWindDirection(weather.windDirection)} color="text-purple-400" />
        <Pill icon={Droplets} label="Humidity" value={`${weather.humidity}%`} color="text-blue-300" />
        <Pill icon={Eye} label="Visibility" value={formatVisibility(weather.visibility, preferences)} color="text-indigo-400" />
        <Pill icon={SunIcon} label="UV Index" value={`${weather.uvIndex}`} sub={weather.uvIndex > 5 ? "High" : "Moderate"} color="text-yellow-400" />
      </motion.div>
    </div>
  );
}

function Pill({ icon: Icon, label, value, sub, color }: { icon: React.ElementType, label: string, value: string | number, sub?: string, color: string }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/40 backdrop-blur-md shadow-lg border border-slate-700/50`}>
      <Icon className={`w-5 h-5 ${color}`} />
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[11px] text-muted-foreground uppercase tracking-wider">{label}</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-bold text-slate-100">{value}</span>
          {sub && <span className={`text-[11px] font-medium ${color}`}>{sub}</span>}
        </div>
      </div>
    </div>
  );
}
