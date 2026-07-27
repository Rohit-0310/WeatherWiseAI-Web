'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrentWeather } from '../hooks/use-weather';
import { useAstronomy } from '../hooks/use-astronomy';
import { ClearSky } from './animations/ClearSky';
import { CloudLayer } from './animations/CloudLayer';
import { Precipitation } from './animations/Precipitation';
import { FogOverlay } from './animations/FogOverlay';
import { Thunderstorm } from './animations/Thunderstorm';
import { WindEffects } from './animations/WindEffects';

export function WeatherBackground() {
  const { data: weather } = useCurrentWeather();
  const { data: astronomy } = useAstronomy();
  const code = weather?.condition?.providerCode ?? 0;
  const windSpeed = weather?.windSpeed ?? 0;

  // Calculate day/night
  const isNight = React.useMemo(() => {
    if (!astronomy) return false;
    const now = new Date().getTime();
    const sunrise = new Date(astronomy.sunrise).getTime();
    const sunset = new Date(astronomy.sunset).getTime();
    return now < sunrise || now > sunset;
  }, [astronomy]);

  // Determine gradients based on code
  const getGradients = (c: number, night: boolean) => {
    if (night && c <= 3) { // Clear/Cloudy Night
      return {
        from: 'from-slate-900',
        via: 'via-indigo-950',
        to: 'to-slate-900',
      };
    }
    
    // Day/General Theme mapped to Open-Meteo
    if (c === 0 || c === 1) { // Clear
      return night 
        ? { from: 'from-slate-900', via: 'via-indigo-950', to: 'to-indigo-900' }
        : { from: 'from-blue-500', via: 'via-sky-400', to: 'to-blue-200' };
    }
    if (c === 2) { // Partly Cloudy
      return { from: 'from-blue-600/70', via: 'via-slate-400/50', to: 'to-blue-200/50' };
    }
    if (c === 3) { // Overcast
      return { from: 'from-slate-600', via: 'via-slate-500', to: 'to-slate-400' };
    }
    if (c === 45 || c === 48) { // Fog
      return { from: 'from-slate-500', via: 'via-slate-400', to: 'to-slate-300' };
    }
    if ((c >= 51 && c <= 67) || (c >= 80 && c <= 82)) { // Rain
      return { from: 'from-slate-800', via: 'via-slate-700', to: 'to-slate-600' };
    }
    if ((c >= 71 && c <= 77) || c === 85 || c === 86) { // Snow
      return { from: 'from-slate-300', via: 'via-blue-200', to: 'to-slate-100' };
    }
    if (c >= 95 && c <= 99) { // Thunderstorm
      return { from: 'from-slate-900', via: 'via-indigo-950', to: 'to-slate-900' };
    }
    
    return { from: 'from-blue-900/40', via: 'via-slate-900/20', to: 'to-background' };
  };

  const gradients = getGradients(code, isNight);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background">
      {/* Base Gradient Layer */}
      <AnimatePresence>
        <motion.div
          key={`bg-${code}-${isNight}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className={`absolute inset-0 bg-gradient-to-br ${gradients.from} ${gradients.via} ${gradients.to}`}
        />
      </AnimatePresence>

      {/* Layer 1: Sun / Moon / Stars (Clear, Partly Cloudy) */}
      <ClearSky code={code} isNight={isNight} />

      {/* Layer 2: Cloud Cover (Partly Cloudy, Overcast, Windy) */}
      <CloudLayer code={code} windSpeed={windSpeed} />

      {/* Layer 3: Precipitation (Rain, Snow, Ice) */}
      <Precipitation code={code} />

      {/* Layer 4: Thunderstorm Flashes */}
      <Thunderstorm code={code} />

      {/* Layer 5: Fog & Screen Blur */}
      <FogOverlay code={code} />

      {/* Layer 6: High Wind Effects (Debris, Shake) */}
      <WindEffects windSpeed={windSpeed} />
      
      {/* Universal Noise Overlay for texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}
