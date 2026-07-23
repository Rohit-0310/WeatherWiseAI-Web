'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface Props {
  code: number;
}

export function FogOverlay({ code }: Props) {
  // Show only for Fog (45, 48)
  if (code !== 45 && code !== 48) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      <motion.div
        animate={{
          x: ['-10%', '10%', '-10%'],
          opacity: [0.6, 0.8, 0.6]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 bg-slate-300/20 backdrop-blur-md"
      />
      {/* Drifting dense fog blobs */}
      <motion.div
        animate={{ x: ['-20vw', '120vw'] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] w-[150vw] h-[50vh] bg-slate-300/10 blur-[100px] rounded-full"
      />
      <motion.div
        animate={{ x: ['120vw', '-20vw'] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] w-[200vw] h-[60vh] bg-slate-200/20 blur-[120px] rounded-full"
      />
    </div>
  );
}
