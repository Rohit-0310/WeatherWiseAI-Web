/* eslint-disable react-hooks/purity */
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface Props {
  code: number;
}

export function Precipitation({ code }: Props) {
  const isRain = (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || (code >= 95 && code <= 99);
  const isSnow = (code >= 71 && code <= 77) || code === 85 || code === 86;
  
  const isHeavy = code === 63 || code === 65 || code === 67 || code === 82 || code === 73 || code === 75 || code >= 95;
  const numParticles = isHeavy ? 100 : 40;

  const particles = React.useMemo(() => Array.from({ length: numParticles }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    yOffset: -Math.random() * 100,
    duration: isRain ? (Math.random() * 0.5 + 0.5) : (Math.random() * 2 + 3),
    delay: Math.random() * 2,
    size: isRain ? (Math.random() * 1 + 1) : (Math.random() * 3 + 2),
    opacity: Math.random() * 0.4 + 0.2,
    drift: (Math.random() - 0.5) * 10
  })), [numParticles, isRain]);

  if (!isRain && !isSnow) return null;

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
                x: ['0vw', `${p.drift}vw`]
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

        return (
          <motion.div
            key={`rain-${p.id}`}
            className="absolute w-[1px] bg-gradient-to-b from-blue-300/0 via-blue-300/80 to-blue-400/80"
            style={{
              left: `${p.x}%`,
              top: `${p.yOffset}%`,
              height: `${p.size * 15}px`,
              opacity: p.opacity
            }}
            animate={{
              y: ['0vh', '120vh'],
              x: ['0vw', `${p.drift * 0.2}vw`]
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
