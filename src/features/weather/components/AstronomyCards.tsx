'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { useAstronomy } from '../hooks/use-astronomy';
import { Sun, Moon } from 'lucide-react';

export function AstronomyCards() {
  const { data: astronomy, isLoading } = useAstronomy();

  if (isLoading || !astronomy) {
    return (
      <div className="flex flex-col gap-4">
        <div className="h-40 w-full bg-background/20 backdrop-blur-xl border border-border/10 rounded-3xl animate-pulse" />
        <div className="h-32 w-full bg-background/20 backdrop-blur-xl border border-border/10 rounded-3xl animate-pulse" />
      </div>
    );
  }

  const sunrise = parseISO(astronomy.sunrise);
  const sunset = parseISO(astronomy.sunset);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      {/* Sunrise & Sunset Card */}
      <div className="relative overflow-hidden rounded-3xl bg-background/30 backdrop-blur-2xl border border-border/10 p-4 shadow-glow-purple">
        <h3 className="text-sm font-medium tracking-wide mb-6">Sunrise & Sunset</h3>
        
        <div className="relative h-16 w-full mt-4 flex items-end">
          {/* Arc SVG */}
          <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
            <path
              d="M 5 50 Q 50 -10 95 50"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            {/* Animated Sun along the path (mocked position for now) */}
            <motion.circle
              r="4"
              fill="#fbbf24"
              className="drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
              initial={{ cx: 5, cy: 50 }}
              animate={{ cx: 70, cy: 15 }} // Position on the curve
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>
          
          <div className="absolute bottom-[-20px] left-0 text-xs">
            <span className="block text-muted-foreground">Sunrise</span>
            <span className="font-semibold">{format(sunrise, 'hh:mm a')}</span>
          </div>
          <div className="absolute bottom-[-20px] right-0 text-xs text-right">
            <span className="block text-muted-foreground">Sunset</span>
            <span className="font-semibold">{format(sunset, 'hh:mm a')}</span>
          </div>
        </div>
      </div>

      {/* Moon Phase Card */}
      <div className="relative overflow-hidden rounded-3xl bg-background/30 backdrop-blur-2xl border border-border/10 p-4 flex items-center justify-between shadow-glow-blue">
        <div>
          <h3 className="text-sm font-medium tracking-wide mb-2">Moon Phase</h3>
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-slate-300" />
            <span className="font-semibold text-lg">{astronomy.moonPhaseName}</span>
          </div>
          <span className="text-xs text-muted-foreground block mt-1">
            Illumination {Math.round(astronomy.moonIllumination)}%
          </span>
        </div>
        
        {/* Placeholder for realistic moon image */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-slate-200 to-slate-800 shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center justify-center opacity-80">
          <div className="w-14 h-14 rounded-full bg-background/20 backdrop-blur-sm mix-blend-overlay"></div>
        </div>
      </div>
    </div>
  );
}
