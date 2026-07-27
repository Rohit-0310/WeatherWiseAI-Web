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
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [timeDisplayMode, setTimeDisplayMode] = React.useState<'location' | 'browser'>('location');

  const timeDiffMs = React.useMemo(() => {
    if (!forecast?.timezone) return 0;
    try {
      const browserNow = new Date();
      const locationNowStr = browserNow.toLocaleString('en-US', { timeZone: forecast.timezone, hour12: false });
      const locationNow = new Date(locationNowStr);
      return browserNow.getTime() - locationNow.getTime();
    } catch (e) {
      return 0;
    }
  }, [forecast?.timezone]);

  const currentHourInLocation = React.useMemo(() => {
    if (!forecast?.timezone) return "";
    try {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: forecast.timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        hourCycle: 'h23',
      });
      const parts = formatter.formatToParts(new Date());
      const p = Object.fromEntries(parts.map(pt => [pt.type, pt.value]));
      return `${p.year}-${p.month}-${p.day}T${p.hour}:00`;
    } catch (e) {
      return "";
    }
  }, [forecast?.timezone, now]);

  const getDisplayDate = React.useCallback((timeString: string) => {
    const localDate = parseISO(timeString);
    if (timeDisplayMode === 'browser') {
      return new Date(localDate.getTime() + timeDiffMs);
    }
    return localDate;
  }, [timeDisplayMode, timeDiffMs]);

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

  const colWidth = 64; // 64px width for dense compact layout

  // Generate path string for curved line
  let pathString = "";
  const points = hours.map((hour: HourlyForecastData, index: number) => {
    const x = index * colWidth + (colWidth / 2);
    // Normalize Y between 5 and 95 for the SVG box to maximize height fully
    const normalizedY = 95 - (((hour.temperature - minTemp) / tempRange) * 90);
    if (index === 0) pathString += `M ${x} ${normalizedY} `;
    else {
      // Smooth curve
      const prevX = (index - 1) * colWidth + (colWidth / 2);
      const prevY = 95 - (((hours[index-1].temperature - minTemp) / tempRange) * 90);
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
        {/* Y-Axis Labels - Static Column */}
        <div className="w-[24px] flex-shrink-0 flex flex-col justify-end pb-[20px] relative z-20 mr-1 -ml-2">
          <div className="h-[140px] flex flex-col justify-between text-[10px] text-muted-foreground font-medium">
            <span className="flex items-center justify-start -mt-2">{Math.round(maxTemp)}°</span>
            <span className="flex items-center justify-start">{Math.round((maxTemp + minTemp) / 2)}°</span>
            <span className="flex items-center justify-start -mb-2">{Math.round(minTemp)}°</span>
          </div>
        </div>

        {/* Scrollable Area */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto gap-0 snap-x scrollbar-hide relative z-10 flex-1 items-end pl-0" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Grid Lines Overlay */}
          <div className="absolute bottom-[20px] left-0 right-0 h-[140px] pointer-events-none z-0">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-border/5" />
            <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-border/10" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border/5" />
          </div>

          {/* SVG Line Chart Overlay inside the scroll container */}
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
              
              {points.map((p: any, i: number) => (
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
                  {/* Invisible larger circle for hover hit-box */}
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
            
            {/* Tooltip rendering */}
            {hoveredIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute z-50 px-3 py-2 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/50 shadow-xl pointer-events-none flex flex-col items-center min-w-[70px]"
                style={{
                  left: points[hoveredIndex].x - 35, // Center roughly
                  top: ((points[hoveredIndex].y / 100) * 140) - 55, // Map 100 viewbox height to 140px DOM height and offset
                }}
              >
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">
                  {format(getDisplayDate(hours[hoveredIndex].time), 'h a')}
                </span>
                <span className="text-sm font-bold text-slate-100 flex items-center gap-1">
                  {Math.round(hours[hoveredIndex].temperature)}°
                </span>
                <span className="text-[9px] text-slate-300 mt-0.5 text-center leading-tight">
                  {hours[hoveredIndex].condition.description}
                </span>
              </motion.div>
            )}
          </div>

          {hours.map((hour: HourlyForecastData, index: number) => {
            const displayDate = getDisplayDate(hour.time);
            // Format the API time consistently to YYYY-MM-DDTHH:00 to avoid :00 seconds serialization mismatches
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
                  {isNow ? 'Now' : format(displayDate, 'h a')}
                </span>
                
                <div className="flex flex-col items-center gap-0.5 mb-1">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 3 + (index % 2), ease: "easeInOut" }}
                  >
                    {renderIcon(hour.condition.code, "w-6 h-6")}
                  </motion.div>
                  
                  <span className="text-base font-semibold tracking-tighter drop-shadow-md">
                    {Math.round(hour.temperature)}°
                  </span>
                  
                  <span className={`text-[9px] font-bold flex items-center gap-0.5 drop-shadow-[0_0_5px_rgba(96,165,250,0.8)] ${hour.precipitationChance > 0 ? 'text-blue-400' : 'text-slate-400/50'}`}>
                    <Droplets className="w-2.5 h-2.5" />
                    {hour.precipitationChance}%
                  </span>
                </div>

                {/* Empty space for chart to pass through */}
                <div className="h-[140px] w-full" />

                <span className={`text-[10px] font-medium text-muted-foreground mt-2 ${isNow ? 'text-blue-400/70' : ''}`}>
                  {isNow ? 'Now' : format(displayDate, 'h a')}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
