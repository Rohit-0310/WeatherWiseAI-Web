'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface Props {
  code: number;
}

export function Precipitation({ code }: Props) {
  const isRain = (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99);
  const isSnow = (code >= 71 && code <= 77) || code === 85 || code === 86;
  const isFreezingRain = code === 56 || code === 57 || code === 66 || code === 67;
  
  if (!isRain && !isSnow) return null;

  const isHeavy = code === 63 || code === 65 || code === 67 || code === 82 || code === 73 || code === 75 || code >= 95;
  const particleCount = isHeavy ? 100 : 40;

  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    yOffset: -Math.random() * 100,
    duration: isRain ? (Math.random() * 0.5 + 0.5) : (Math.random() * 2 + 3), // Rain is fast, snow is slow
    delay: Math.random() * 2,
    size: isRain ? (Math.random() * 1 + 1) : (Math.random() * 3 + 2),
    opacity: Math.random() * 0.4 + 0.2
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => {
        if (isSnow) {
          return (
            <motion.div
              key={`snow-${p.id}`}
              className="absolute bg-white rounded-full blur-[1px]"
              style={{
                left: `${p.x}%`,
                top: `${p.yOffset}%`,
                width: p.size,
                height: p.size,
                opacity: p.opacity
              }}
              animate={{
                y: ['0vh', '120vh'],
                x: ['0vw', `${(Math.random() - 0.5) * 10}vw`] // drift
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear"
              }}
            />
          );
        }

        // Rain or Freezing Rain
        const color = isFreezingRain ? 'bg-cyan-200' : 'bg-blue-200';
        return (
          <motion.div
            key={`rain-${p.id}`}
            className={`absolute ${color} rounded-full`}
            style={{
              left: `${p.x}%`,
              top: `${p.yOffset}%`,
              width: p.size,
              height: p.size * 15, // Streak effect
              opacity: p.opacity
            }}
            animate={{
              y: ['0vh', '120vh'],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
}
