'use client';

import * as React from 'react';

import { ThemeToggle } from './ThemeToggle';
import { LocationSearch } from '@/features/location/components/LocationSearch';

export function TopNav() {
  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-2">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-end">
        <div className="flex items-center gap-4">
          <LocationSearch />
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
