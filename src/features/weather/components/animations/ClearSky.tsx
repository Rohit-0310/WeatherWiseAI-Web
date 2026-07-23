'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface Props {
  code: number;
  isNight: boolean;
}

export function ClearSky({ code, isNight }: Props) {
  // Only show for Clear (0) or Mostly Clear/Partly Cloudy (1, 2)
  if (code > 2) return null;

  if (isNight) {
    // We'll use a fixed array of stars for simplicity and stability
    const stars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));

    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}
        {/* Occasional Shooting Star */}
        <motion.div
          className="absolute w-[100px] h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-0 rotate-45"
          animate={{
            x: ['-10vw', '110vw'],
            y: ['-10vh', '110vh'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 15,
            ease: "easeOut"
          }}
          style={{ top: '10%', left: '10%' }}
        />
      </div>
    );
  }

  // Day
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sun Rays / Lens Flare */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(251,191,36,0.1)_45deg,transparent_90deg,rgba(251,191,36,0.1)_135deg,transparent_180deg,rgba(251,191,36,0.1)_225deg,transparent_270deg,rgba(251,191,36,0.1)_315deg,transparent_360deg)] rounded-full blur-[20px]"
      />
      {/* Sun Glow Orb */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[5%] right-[5%] w-[200px] h-[200px] bg-yellow-300 rounded-full blur-[80px] mix-blend-screen"
      />
    </div>
  );
}
