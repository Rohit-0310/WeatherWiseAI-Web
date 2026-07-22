'use client';

import * as React from 'react';
import { CloudSun } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { UnitToggle } from './UnitToggle';
import { LocationSearch } from '@/features/location/components/LocationSearch';

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-2">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-xl backdrop-blur-md">
            <CloudSun className="h-6 w-6 text-primary" />
          </div>
          <span className="font-bold text-lg hidden sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60">
            WeatherWiseAI
          </span>
        </div>

        <div className="flex items-center gap-4">
          <LocationSearch />
          <div className="hidden md:flex items-center gap-2">
            <UnitToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
