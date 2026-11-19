'use client';

import React, { useState } from 'react';
import type { Variants } from 'framer-motion';
import type { AiSummaryResponse } from '@/shared/types/weather';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BrainCircuit, Loader2, ThermometerSun, Shirt, Navigation, RefreshCw } from 'lucide-react';
import { useCurrentWeather } from '@/features/weather/hooks/use-weather';
import { WeatherService } from '@/features/weather/api/weather.service';
import { useAppStore } from '@/shared/stores/app.store';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

export default function AISummaryPage() {
  const { currentLocation } = useAppStore();
  const units = useAppStore(state => state.units);
  return <SuggestionForm key={JSON.stringify([currentLocation, units])} />;
}

function SuggestionForm() {
  const { currentLocation, units } = useAppStore();
  const { data: weather, isLoading: isWeatherLoading, refetch } = useCurrentWeather();
  const [summaryData, setSummaryData] = useState<AiSummaryResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!weather || !currentLocation) return;
    
    setIsGenerating(true);
    setError(null);
    setSummaryData(null); // Clear previous
    
    try {
      const request = {
        location: currentLocation.name,
        temperature: `${weather.temperature} ${units === "Metric" ? "\u00b0C" : "\u00b0F"}`,
        condition: weather.condition.description,
        humidity: `${weather.humidity}%`,
        wind: `${weather.windSpeed} ${units === "Metric" ? "km/h" : "mph"}`,
        uvIndex: `${weather.uvIndex}`
      };
      
      const result = await WeatherService.getAiSummary(request);
      setSummaryData(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate AI summary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] px-4 py-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="relative mb-8 inline-block">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 blur-3xl bg-gradient-to-tr from-purple-500/40 to-blue-500/40 rounded-full w-32 h-32 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" 
            />
            <div className="relative flex items-center justify-center w-24 h-24 rounded-[2rem] bg-background/60 backdrop-blur-2xl border border-border/30 shadow-[0_0_40px_rgba(168,85,247,0.3)]">
              <BrainCircuit className="w-12 h-12 text-purple-400" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-br from-white via-white to-white/50 bg-clip-text text-transparent flex items-center justify-center gap-3">
            AI Weather Analyst <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
            Get personalized insights, clothing recommendations, and activity suggestions powered by Gemini 2.5 Flash.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!summaryData && !isGenerating && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center"
            >
              {isWeatherLoading ? (
                <div className="flex items-center gap-3 text-muted-foreground bg-background/40 backdrop-blur-lg px-6 py-3 rounded-full border border-border/20">
                  <Loader2 className="w-5 h-5 animate-spin" /> Fetching real-time weather...
                </div>
              ) : currentLocation && !weather ? (
                <button onClick={() => refetch()}>Weather unavailable. Retry weather</button>
              ) : !currentLocation ? (
                <div className="px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
                  Please select a location first to generate a summary.
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerate}
                  className="group relative flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all font-semibold tracking-wide overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                  <Sparkles className="w-5 h-5 relative z-10" /> 
                  <span className="relative z-10">Generate Insight</span>
                </motion.button>
              )}
              
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}
            </motion.div>
          )}

          {isGenerating && (
            <motion.div 
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              className="flex flex-col items-center justify-center py-16 gap-8"
            >
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 rounded-full border-t-2 border-l-2 border-purple-500 animate-spin" style={{ animationDuration: '1.5s' }}></div>
                <div className="absolute inset-3 rounded-full border-r-2 border-b-2 border-blue-400 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-purple-400 animate-pulse" />
                </div>
              </div>
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-purple-300 font-medium text-lg tracking-wide"
              >
                Analyzing patterns for {currentLocation?.name}...
              </motion.p>
            </motion.div>
          )}

          {summaryData && !isGenerating && (
            <motion.div 
              key="results"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid gap-6"
            >
              <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-2xl border border-border/30 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ThermometerSun className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 text-purple-400">
                    <ThermometerSun className="w-7 h-7" />
                    <h2 className="text-2xl font-bold tracking-tight">Weather Summary</h2>
                  </div>
                  <p className="text-foreground/90 leading-relaxed text-lg font-medium">{summaryData.summary}</p>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-2xl border border-border/30 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity text-blue-400">
                    <Shirt className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 text-blue-400">
                      <Shirt className="w-6 h-6" />
                      <h2 className="text-xl font-bold tracking-tight">Clothing Suggestion</h2>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{summaryData.clothing}</p>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="p-8 rounded-[2rem] bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-2xl border border-border/30 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity text-emerald-400">
                    <Navigation className="w-24 h-24" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4 text-emerald-400">
                      <Navigation className="w-6 h-6" />
                      <h2 className="text-xl font-bold tracking-tight">Activity Suggestion</h2>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{summaryData.activity}</p>
                  </div>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="mt-8 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-border/20 hover:bg-border/40 text-foreground/80 font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" /> Regenerate Insight
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
