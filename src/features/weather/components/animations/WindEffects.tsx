/* eslint-disable react-hooks/purity */
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface Props {
  windSpeed: number;
}

export function WindEffects({ windSpeed }: Props) {
  const isStorm = windSpeed > 50;
  const numLeaves = isStorm ? 30 : 10;

  const leaves = React.useMemo(() => Array.from({ length: numLeaves }).map((_, i) => ({
    id: i,
    y: Math.random() * 100,
    duration: (Math.random() * 2 + 1) * (isStorm ? 0.5 : 1),
    delay: Math.random() * 3,
    rotate: Math.random() * 720,
    drift: (Math.random() - 0.5) * 40
  })), [numLeaves, isStorm]);

  if (windSpeed <= 25) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
      {leaves.map((leaf) => (
        <motion.div
          key={`leaf-${leaf.id}`}
          className="absolute w-2 h-2 bg-slate-400/80 rounded-sm"
          style={{ top: `${leaf.y}%`, left: '-5%' }}
          animate={{
            x: ['0vw', '110vw'],
            y: ['0vh', `${leaf.drift}vh`],
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

      {isStorm && (
        <motion.div
          className="absolute inset-0 bg-slate-900/10 pointer-events-none"
          animate={{ opacity: [0, 0.1, 0, 0.2, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}
