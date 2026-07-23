'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { useAstronomy } from '../hooks/use-astronomy';
import { Moon, Sunrise, Sunset } from 'lucide-react';

export function AstronomyCards() {
  const { data: astronomy, isLoading } = useAstronomy();

  if (isLoading || !astronomy) {
    return (
      <div className="flex flex-col gap-4 h-full">
        <div className="flex-1 bg-background/20 backdrop-blur-xl border border-border/10 rounded-3xl animate-pulse" />
        <div className="flex-1 bg-background/20 backdrop-blur-xl border border-border/10 rounded-3xl animate-pulse" />
      </div>
    );
  }

  const sunrise = parseISO(astronomy.sunrise);
  const sunset = parseISO(astronomy.sunset);
  const moonRise = astronomy.moonRise ? parseISO(astronomy.moonRise) : null;
  const moonSet = astronomy.moonSet ? parseISO(astronomy.moonSet) : null;

  // Calculate sun position (0 to 100)
  const now = new Date();
  const totalDayTime = sunset.getTime() - sunrise.getTime();
  const currentDayTime = now.getTime() - sunrise.getTime();
  
  let sunPositionPercent = (currentDayTime / totalDayTime) * 100;
  // Bound it between 0 and 100 so the sun hides below horizon at night
  if (sunPositionPercent < 0) sunPositionPercent = 0;
  if (sunPositionPercent > 100) sunPositionPercent = 100;

  // X moves linearly from 10 to 90
  const sunX = 10 + (sunPositionPercent * 0.8);
  // Y follows a quadratic curve (inverted parabola): peak at x=50, y=10, ends at y=50
  const xNormalized = (sunPositionPercent - 50) / 50; // -1 to 1
  const sunY = 10 + (40 * (xNormalized * xNormalized)); 

  // Realistic Moon Phase box-shadow calc (simple approximation)
  // illumination 0 = new moon, 50 = quarter, 100 = full
  const isWaxing = astronomy.moonPhaseName.toLowerCase().includes('waxing') || astronomy.moonPhaseName.toLowerCase().includes('first');
  const illumFraction = astronomy.moonIllumination / 100;
  // Creates a crescent or gibbous shadow mask
  const shadowX = isWaxing ? 15 - (illumFraction * 30) : -15 + (illumFraction * 30);
  const shadowSpread = illumFraction < 0.5 ? 5 : 0; // soften the edge slightly

  return (
    <div className="flex flex-col justify-between gap-4 w-full h-full">
      {/* Sunrise & Sunset Card */}
      <div className="relative overflow-hidden rounded-3xl bg-background/30 backdrop-blur-2xl border border-border/10 p-5 shadow-2xl flex-1 flex flex-col justify-between group">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium tracking-wide flex items-center gap-2">
            <Sunrise className="w-4 h-4 text-yellow-500" />
            Sunrise & Sunset
          </h3>
          <span className="text-xs font-semibold px-2 py-1 bg-background/40 rounded-full text-yellow-500 border border-yellow-500/20">
            {astronomy.dayLength.substring(0, 5)} hrs
          </span>
        </div>
        
        <div className="relative w-full h-[100px] flex items-end justify-center mb-2">
          <svg viewBox="0 0 100 60" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="arcGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(251,191,36,0.3)" />
                <stop offset="100%" stopColor="rgba(251,191,36,0)" />
              </linearGradient>
            </defs>
            
            {/* Fill under the arc */}
            <path
              d="M 10 50 Q 50 0 90 50 L 90 60 L 10 60 Z"
              fill="url(#arcGradient)"
              className="opacity-50"
            />

            {/* Arc Dashed Line */}
            <path
              d="M 10 50 Q 50 0 90 50"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeLinecap="round"
            />

            {/* Animated Sun */}
            {sunPositionPercent > 0 && sunPositionPercent < 100 && (
              <motion.g
                initial={{ x: 10, y: 50, opacity: 0 }}
                animate={{ x: sunX, y: sunY, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <circle
                  r="5"
                  fill="#fbbf24"
                  className="drop-shadow-[0_0_12px_rgba(251,191,36,1)]"
                />
                <circle
                  r="8"
                  fill="rgba(251,191,36,0.3)"
                  className="animate-pulse"
                />
              </motion.g>
            )}
          </svg>
          
          <div className="flex justify-between w-full pt-4">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Sunrise</span>
              <span className="text-sm font-semibold text-foreground/90">{format(sunrise, 'hh:mm a')}</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-0.5">Sunset</span>
              <span className="text-sm font-semibold text-foreground/90">{format(sunset, 'hh:mm a')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Moon Phase Card */}
      <div className="relative overflow-hidden rounded-3xl bg-background/30 backdrop-blur-2xl border border-border/10 p-5 shadow-2xl flex-1 flex flex-col justify-between">
        <h3 className="text-sm font-medium tracking-wide flex items-center gap-2 mb-2">
          <Moon className="w-4 h-4 text-indigo-400" />
          Moon Phase
        </h3>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col gap-3">
            <div>
              <span className="font-bold text-lg text-foreground/90">{astronomy.moonPhaseName}</span>
              <span className="text-xs text-muted-foreground block mt-0.5">
                Illumination {Math.round(astronomy.moonIllumination)}%
              </span>
            </div>

            <div className="flex gap-4 text-xs">
              <div className="flex flex-col">
                <span className="text-muted-foreground">Moonrise</span>
                <span className="font-semibold text-foreground/80">{moonRise ? format(moonRise, 'hh:mm a') : '--:--'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Moonset</span>
                <span className="font-semibold text-foreground/80">{moonSet ? format(moonSet, 'hh:mm a') : '--:--'}</span>
              </div>
            </div>
          </div>
          
          {/* Realistic CSS Moon */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* The base moon (bright) */}
            <div className="absolute inset-0 rounded-full bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.3)] overflow-hidden">
               {/* Surface texture craters */}
               <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-slate-300/40 mix-blend-multiply blur-[0.5px]"></div>
               <div className="absolute bottom-3 right-4 w-4 h-5 rounded-full bg-slate-300/40 mix-blend-multiply blur-[1px]"></div>
               <div className="absolute top-6 left-8 w-2 h-2 rounded-full bg-slate-300/50 mix-blend-multiply"></div>
            </div>
            
            {/* The shadow mask to create phase */}
            <div 
              className="absolute inset-0 rounded-full bg-transparent mix-blend-multiply transition-all duration-1000"
              style={{
                boxShadow: `inset ${shadowX}px 0px ${shadowSpread}px rgba(0,0,0,0.85)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
