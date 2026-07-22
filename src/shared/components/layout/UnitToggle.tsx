'use client';

import * as React from 'react';
import { useAppStore } from '@/shared/stores/app.store';

export function UnitToggle() {
  const { units, setUnits } = useAppStore();

  const toggleUnits = () => {
    setUnits(units === 'Metric' ? 'Imperial' : 'Metric');
  };

  return (
    <button
      onClick={toggleUnits}
      className="relative flex items-center h-11 rounded-full bg-background/20 backdrop-blur-xl border border-border/10 shadow-lg p-1 w-24 cursor-pointer hover:bg-background/30 transition-colors"
      aria-label="Toggle Temperature Unit"
    >
      <div 
        className={`absolute h-9 w-11 rounded-full bg-primary/20 border border-primary/30 shadow-glow-blue transition-all duration-300 ease-out z-0
          ${units === 'Metric' ? 'translate-x-0' : 'translate-x-11'}`}
      />
      <span className={`flex-1 text-center text-sm font-bold z-10 transition-colors duration-300 ${units === 'Metric' ? 'text-primary' : 'text-muted-foreground'}`}>
        °C
      </span>
      <span className={`flex-1 text-center text-sm font-bold z-10 transition-colors duration-300 ${units === 'Imperial' ? 'text-primary' : 'text-muted-foreground'}`}>
        °F
      </span>
    </button>
  );
}
