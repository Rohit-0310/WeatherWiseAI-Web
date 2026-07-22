'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, Loader2, MapPin, Search } from 'lucide-react';
import { useLocationSearch } from '../hooks/use-location';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { useAppStore } from '@/shared/stores/app.store';
import { Location } from '@/shared/types/location';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function LocationSearch() {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const { data: locations, isLoading } = useLocationSearch(debouncedSearch);
  const { currentLocation, setCurrentLocation } = useAppStore();

  // Close when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className="w-[250px] md:w-[350px] h-11 px-4 flex items-center rounded-full bg-background/20 backdrop-blur-xl border border-border/10 shadow-lg group focus-within:bg-background/30 focus-within:border-white/20 transition-all"
      >
        <Search className="h-5 w-5 shrink-0 text-foreground/50 group-focus-within:text-primary transition-colors mr-3" />
        <input
          type="text"
          className="flex-1 w-full bg-transparent border-none outline-none text-sm font-medium text-foreground placeholder:text-foreground/80 truncate"
          placeholder={currentLocation ? `${currentLocation.name}, ${currentLocation.country}` : 'Search for cities...'}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (searchTerm.length > 0) setOpen(true);
          }}
        />
      </div>

      {open && (
        <div className="absolute top-full mt-2 w-full rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl overflow-hidden z-50">

          
          <div className="max-h-[300px] overflow-y-auto p-2">
            {isLoading && (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            )}
            
            {!isLoading && (!locations || locations.length === 0) && searchTerm.length > 2 && (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No location found.
              </div>
            )}

            {!isLoading && locations && locations.map((location: Location) => (
              <div
                key={`${location.latitude}-${location.longitude}`}
                className="flex items-center gap-2 p-2 hover:bg-accent rounded-xl cursor-pointer text-sm transition-colors"
                onClick={() => {
                  setCurrentLocation(location);
                  setOpen(false);
                  setSearchTerm('');
                }}
              >
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="flex flex-col overflow-hidden">
                  <span className="font-medium truncate">{location.name}</span>
                  <span className="text-xs text-muted-foreground truncate">
                    {location.region ? `${location.region}, ` : ''}{location.country}
                  </span>
                </div>
                {currentLocation?.latitude === location.latitude && currentLocation?.longitude === location.longitude && (
                  <Check className="ml-auto h-4 w-4 shrink-0" />
                )}
              </div>
            ))}
            
            {!isLoading && (!locations || locations.length === 0) && searchTerm.length <= 2 && (
              <div className="p-4 text-center text-xs text-muted-foreground">
                Type at least 3 characters to search
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
