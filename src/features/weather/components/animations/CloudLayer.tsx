/* eslint-disable react-hooks/purity */
'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface Props {
  code: number;
  windSpeed: number;
}

export function CloudLayer({ code, windSpeed }: Props) {
  const isOvercast = code === 3 || code >= 45;
  const numClouds = isOvercast ? 6 : 3;
  const baseSpeed = windSpeed > 50 ? 5 : windSpeed > 25 ? 10 : 25;

  const clouds = React.useMemo(() => Array.from({ length: numClouds }).map((_, i) => ({
    id: i,
    y: Math.random() * 40,
    scale: Math.random() * 0.5 + 0.5,
    opacity: isOvercast ? (Math.random() * 0.3 + 0.4) : (Math.random() * 0.2 + 0.1),
    duration: baseSpeed + (Math.random() * 10),
    delay: -Math.random() * 20,
  })), [numClouds, isOvercast, baseSpeed]);

  if (code === 0 || code === 1) return null;

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
