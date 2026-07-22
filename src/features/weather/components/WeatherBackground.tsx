'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/shared/stores/app.store';
import { useCurrentWeather } from '../hooks/use-weather';

export function WeatherBackground() {
  const { data: weather } = useCurrentWeather();
  const conditionCode = weather?.condition?.code || 'Clear';

  // Determine gradient colors based on weather condition
  const getGradients = (code: string) => {
    switch (code) {
      case 'Clear':
      case 'MostlyClear':
        return {
          from: 'from-blue-500/30',
          via: 'via-blue-400/20',
          to: 'to-transparent',
          orb: 'bg-yellow-400/30'
        };
      case 'PartlyCloudy':
      case 'Cloudy':
      case 'Fog':
        return {
          from: 'from-slate-600/40',
          via: 'via-slate-400/20',
          to: 'to-transparent',
          orb: 'bg-slate-300/20'
        };
      case 'Rain':
      case 'HeavyRain':
      case 'Thunderstorm':
        return {
          from: 'from-indigo-900/60',
          via: 'via-purple-900/40',
          to: 'to-slate-900/80',
          orb: 'bg-indigo-500/20'
        };
      case 'Snow':
        return {
          from: 'from-blue-200/40',
          via: 'via-slate-200/20',
          to: 'to-transparent',
          orb: 'bg-white/30'
        };
      default:
        return {
          from: 'from-blue-900/40',
          via: 'via-slate-900/20',
          to: 'to-background',
          orb: 'bg-blue-500/20'
        };
    }
  };

  const gradients = getGradients(conditionCode);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-background">
      {/* Base Gradient Layer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className={`absolute inset-0 bg-gradient-to-br ${gradients.from} ${gradients.via} ${gradients.to}`}
      />

      {/* Animated Glow Orb 1 */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px] ${gradients.orb} mix-blend-screen`}
      />

      {/* Animated Glow Orb 2 */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className={`absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] ${gradients.orb} mix-blend-screen`}
      />
      
      {/* Noise Overlay for premium texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}
