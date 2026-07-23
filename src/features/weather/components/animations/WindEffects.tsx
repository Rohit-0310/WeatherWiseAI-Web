'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface Props {
  windSpeed: number;
}

export function WindEffects({ windSpeed }: Props) {
  // Windy > 25, Storm > 50
  if (windSpeed <= 25) return null;

  const isStorm = windSpeed > 50;
  const numLeaves = isStorm ? 30 : 10;

  const leaves = Array.from({ length: numLeaves }).map((_, i) => ({
    id: i,
    y: Math.random() * 100,
    duration: (Math.random() * 2 + 1) * (isStorm ? 0.5 : 1), // Faster if storm
    delay: Math.random() * 3,
    rotate: Math.random() * 720
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      {/* Flying Leaves / Debris */}
      {leaves.map((leaf) => (
        <motion.div
          key={`leaf-${leaf.id}`}
          className="absolute w-2 h-2 bg-slate-400/80 rounded-sm"
          style={{ top: `${leaf.y}%`, left: '-5%' }}
          animate={{
            x: ['0vw', '110vw'],
            y: [`0vh`, `${(Math.random() - 0.5) * 40}vh`],
            rotate: leaf.rotate
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            delay: leaf.delay,
            ease: "linear"
          }}
        />
      ))}

      {/* Extreme Storm Camera Shake (Applied to a subtle vignette overlay) */}
      {isStorm && (
        <motion.div
          className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]"
          animate={{
            x: [-2, 2, -2, 2, 0],
            y: [-2, 2, 2, -2, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
      )}
    </div>
  );
}
