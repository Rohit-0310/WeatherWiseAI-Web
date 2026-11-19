'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Settings2 } from 'lucide-react';
import { useAppStore, Preferences } from '@/shared/stores/app.store';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SETTINGS_OPTIONS: Record<keyof Preferences, { label: string; options: string[] }> = {
  temperature: { label: 'Temperature', options: ['Celsius', 'Fahrenheit'] },
  windSpeed: { label: 'Wind Speed', options: ['km/h', 'm/s', 'mph', 'knots'] },
  pressure: { label: 'Pressure', options: ['hPa', 'mmHg', 'inHg'] },
  visibility: { label: 'Visibility', options: ['km', 'mile'] },
  distance: { label: 'Distance', options: ['km', 'mile'] },
  precipitation: { label: 'Precipitation', options: ['mm', 'inch'] },
  timeFormat: { label: 'Time Format', options: ['12h', '24h'] },
};

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const { preferences, setPreference } = useAppStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-background/40 backdrop-blur-2xl border border-border/20 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Settings2 className="w-4 h-4 text-primary" />
                </div>
                <h2 className="text-xl font-semibold tracking-tight">Preferences</h2>
              </div>
              <button
                aria-label="Close preferences"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
              {(Object.keys(SETTINGS_OPTIONS) as Array<keyof Preferences>).map((key) => {
                const config = SETTINGS_OPTIONS[key];
                return (
                  <div key={key} className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-foreground/80">{config.label}</span>
                    <div className="flex items-center bg-foreground/5 p-1 rounded-xl border border-border/5">
                      {config.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => setPreference(key, option as never)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                            preferences[key] === option
                              ? 'bg-background shadow-sm text-foreground'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="p-4 bg-foreground/5 border-t border-border/10 text-center">
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Changes are saved automatically</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
