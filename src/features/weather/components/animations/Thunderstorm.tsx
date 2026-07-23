'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface Props {
  code: number;
}

export function Thunderstorm({ code }: Props) {
  // Show only for Thunderstorm (95, 96, 99)
  if (code < 95 || code > 99) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 mix-blend-screen">
      {/* Screen Flashes */}
      <motion.div
        animate={{
          opacity: [0, 0, 0, 0.8, 0, 0.5, 0, 0, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.8, 0.81, 0.82, 0.83, 0.85, 0.86, 0.9, 1] // Flash quickly at 80% mark
        }}
        className="absolute inset-0 bg-white"
      />
      
      {/* Lightning Bolt Graphic (Approximate SVG) */}
      <motion.svg 
        viewBox="0 0 100 100" 
        className="absolute top-[10%] left-[60%] w-32 h-64 drop-shadow-[0_0_20px_rgba(255,255,255,1)]"
        animate={{
          opacity: [0, 0, 0, 1, 0, 0, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          times: [0, 0.5, 0.51, 0.53, 0.54, 0.6, 1] // Flash at 50% mark
        }}
      >
        <path 
          d="M 60 0 L 20 50 L 50 50 L 30 100 L 90 40 L 55 40 Z" 
          fill="#fff" 
        />
      </motion.svg>
    </div>
  );
}
