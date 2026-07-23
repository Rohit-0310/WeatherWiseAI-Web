'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface Props {
  code: number;
  windSpeed: number;
}

export function CloudLayer({ code, windSpeed }: Props) {
  // Show for Partly Cloudy (2), Overcast/Cloudy (3), Fog (45,48), Rain, Snow, etc.
  // Actually, clouds are everywhere except Clear (0, 1)
  if (code === 0 || code === 1) return null;

  const isOvercast = code === 3 || code >= 45;
  const numClouds = isOvercast ? 6 : 3;
  const baseSpeed = windSpeed > 50 ? 5 : windSpeed > 25 ? 10 : 25; // Lower is faster in framer-motion duration

  const clouds = Array.from({ length: numClouds }).map((_, i) => ({
    id: i,
    y: Math.random() * 40, // Top 40% of screen
    scale: Math.random() * 0.5 + 0.5,
    opacity: isOvercast ? (Math.random() * 0.3 + 0.4) : (Math.random() * 0.2 + 0.1),
    duration: baseSpeed + (Math.random() * 10),
    delay: -Math.random() * 20, // Start already moving
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute w-[300px] h-[100px] bg-white rounded-full blur-[30px]"
          style={{
            top: `${cloud.y}%`,
            scale: cloud.scale,
            opacity: cloud.opacity,
          }}
          animate={{
            x: ['-20vw', '120vw']
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            delay: cloud.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}
