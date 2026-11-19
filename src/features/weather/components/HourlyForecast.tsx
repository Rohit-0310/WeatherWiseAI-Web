'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
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
  const { data: forecast, isLoading, isError, refetch } = useHourlyForecast();
  const { preferences } = useAppStore();
  const tempUnit = preferences.temperature === 'Celsius' ? '°C' : '°F';
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(timer);
  }, []);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [timeDisplayMode, setTimeDisplayMode] = React.useState<'location' | 'browser'>('location');

  const timezone = forecast?.timezone;
  const timeDiffMs = React.useMemo(() => {
    if (!timezone) return 0;
    try {
      const browserNow = new Date();
      const locationNowStr = browserNow.toLocaleString('en-US', { timeZone: timezone, hour12: false });
      const locationNow = new Date(locationNowStr);
      return browserNow.getTime() - locationNow.getTime();
    } catch {
      return 0;
    }
  }, [timezone]);

  const currentHourInLocation = React.useMemo(() => {
    if (!timezone) return "";
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hourCycle: 'h23',
      });
      const parts = formatter.formatToParts(now);
      const p = Object.fromEntries(parts.map(pt => [pt.type, pt.value]));
      return `${p.year}-${p.month}-${p.day}T${p.hour}:00`;
    } catch {
      return "";
    }
  }, [timezone, now]);

  const getDisplayDate = React.useCallback((timeString: string) => {
    const localDate = parseISO(timeString);
    if (timeDisplayMode === 'browser') {
      return new Date(localDate.getTime() + timeDiffMs);
    }
    return localDate;
  }, [timeDisplayMode, timeDiffMs]);

  const hours = React.useMemo(() => forecast?.hours || [], [forecast?.hours]);
  
  const minTemp = React.useMemo(() => hours.length > 0 ? Math.min(...hours.map((h: HourlyForecastData) => h.temperature)) : 0, [hours]);
  const maxTemp = React.useMemo(() => hours.length > 0 ? Math.max(...hours.map((h: HourlyForecastData) => h.temperature)) : 0, [hours]);
  const tempRange = React.useMemo(() => maxTemp - minTemp || 1, [maxTemp, minTemp]);

  const colWidth = 64;

  const { pathString, points } = React.useMemo(() => {
    if (hours.length === 0) return { pathString: "", points: [] };
    const pts = hours.map((hour: HourlyForecastData, index: number) => {
      const x = index * colWidth + (colWidth / 2);
      const normalizedY = 95 - (((hour.temperature - minTemp) / tempRange) * 90);
      return { x, y: normalizedY };
    });
    
    const pString = pts.reduce((acc, pt, index) => {
      if (index === 0) return `M ${pt.x} ${pt.y} `;
      const prevX = (index - 1) * colWidth + (colWidth / 2);
      const prevY = 95 - (((hours[index-1].temperature - minTemp) / tempRange) * 90);
      const controlX = (prevX + pt.x) / 2;
      return acc + `C ${controlX} ${prevY}, ${controlX} ${pt.y}, ${pt.x} ${pt.y} `;
    }, "");
    
    return { pathString: pString, points: pts };
  }, [hours, minTemp, tempRange]);

  if (isError && !forecast) return <p role="alert">Forecast unavailable. <button onClick={() => refetch()}>Retry</button></p>;
  if (forecast && !forecast.hours.length) return <p>No forecast available.</p>;

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

  const firstX = points[0]?.x || 0;
  const lastX = points[points.length - 1]?.x || 0;
  const fillPathString = `${pathString} L ${lastX} 120 L ${firstX} 120 Z`;

  return (
    <div className="w-full h-full rounded-3xl bg-background/20 backdrop-blur-xl border border-border/10 p-5 flex flex-col shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-2 z-10">
        <h3 className="text-lg font-medium tracking-tight">Hourly Forecast</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-foreground/5 rounded-full p-0.5 border border-border/10">
            <button 
              onClick={() => setTimeDisplayMode('location')}
              className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-all ${timeDisplayMode === 'location' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Local Time
            </button>
            <button 
              onClick={() => setTimeDisplayMode('browser')}
              className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-all ${timeDisplayMode === 'browser' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              My Time
            </button>
          </div>
        </div>
      </div>

      <div className="flex relative z-10 flex-1 pb-4">
        <div className="w-[24px] flex-shrink-0 flex flex-col justify-end pb-[20px] relative z-20 mr-4 -ml-2">
          <div className="h-[140px] flex flex-col justify-between text-[10px] text-muted-foreground font-medium">
            <span className="flex items-center justify-start -mt-2">{Math.round(maxTemp)}{tempUnit}</span>
            <span className="flex items-center justify-start">{Math.round((maxTemp + minTemp) / 2)}{tempUnit}</span>
            <span className="flex items-center justify-start -mb-2">{Math.round(minTemp)}{tempUnit}</span>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="flex overflow-x-auto gap-0 snap-x scrollbar-hide relative z-10 flex-1 items-end pl-0" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="absolute bottom-[20px] left-0 right-0 h-[140px] pointer-events-none z-0">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-border/5" />
            <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-border/10" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border/5" />
          </div>

          <div className="absolute bottom-[20px] left-0 h-[140px] z-0" style={{ width: hours.length * colWidth }}>
            <svg width="100%" height="100%" viewBox={`0 0 ${hours.length * colWidth} 100`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="fillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <motion.path
                d={fillPathString}
                fill="url(#fillGradient)"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="pointer-events-none"
              />

              <motion.path 
                d={pathString} 
                fill="none" 
                stroke="url(#lineGradient)" 
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="drop-shadow-[0_0_8px_rgba(96,165,250,0.8)] pointer-events-none"
              />
              
              {points.map((p: {x: number, y: number}, i: number) => (
                <g key={i}>
                  <motion.circle 
                    cx={p.x} 
                    cy={p.y} 
                    r="4" 
                    fill="#ffffff" 
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.05 + 1, duration: 0.3 }}
                    className="drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] pointer-events-none"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="15"
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                </g>
              ))}
            </svg>
            
            {hoveredIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute z-50 px-3 py-2 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/50 shadow-xl pointer-events-none flex flex-col items-center min-w-[70px]"
                style={{
                  left: points[hoveredIndex].x - 35,
                  top: ((points[hoveredIndex].y / 100) * 140) - 55,
                }}
              >
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                  {format(getDisplayDate(hours[hoveredIndex].time), preferences.timeFormat === '24h' ? 'HH:mm' : 'h a')}
                </span>
                <span className="text-sm font-bold text-slate-100 flex items-center gap-1">
                  {Math.round(hours[hoveredIndex].temperature)}{tempUnit}
                </span>
                <span className="text-[9px] text-slate-300 mt-0.5 text-center leading-tight">
                  {hours[hoveredIndex].condition.description}
                </span>
              </motion.div>
            )}
          </div>

          {hours.map((hour: HourlyForecastData, index: number) => {
            const displayDate = getDisplayDate(hour.time);
            const hourNormalized = format(parseISO(hour.time), "yyyy-MM-dd'T'HH:00");
            const isNow = hourNormalized === currentHourInLocation;
            
            return (
              <motion.div
                key={hour.time}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
                className={`snap-start flex flex-col items-center justify-end py-1 rounded-2xl transition-all duration-300 z-10 hover:bg-foreground/5 border border-transparent`}
                style={{ minWidth: colWidth, width: colWidth }}
              >
                <span className={`text-[11px] font-medium mb-1 ${isNow ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'text-foreground/80'}`}>
                  {isNow ? 'Now' : format(displayDate, preferences.timeFormat === '24h' ? 'HH:mm' : 'h a')}
                </span>
                
                <div className="flex flex-col items-center gap-0.5 mb-1">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + (index % 2), ease: "easeInOut" }}
                  >
                    {renderIcon(hour.condition.code, "w-6 h-6")}
                  </motion.div>
                  
                  <span className="text-sm font-semibold tracking-tight text-foreground/90">
                  {Math.round(hours[index].temperature)}{tempUnit}
                </span>
                  
                  <span className={`text-[9px] font-bold flex items-center gap-0.5 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)] ${hour.precipitationChance > 0 ? 'text-blue-400' : 'text-slate-400/50'}`}>
                    <Droplets className="w-2.5 h-2.5" />
                    {hour.precipitationChance}%
                  </span>
                </div>

                <div className="h-[140px] w-full" />

                <span className={`text-[10px] font-medium text-muted-foreground mt-2 ${isNow ? 'text-blue-400/70' : ''}`}>
                  {isNow ? 'Now' : format(displayDate, preferences.timeFormat === '24h' ? 'HH:mm' : 'h a')}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
