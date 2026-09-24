import React from 'react';
import { Sparkles, BrainCircuit } from 'lucide-react';

export default function AISummaryPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 animate-in fade-in zoom-in duration-700">
      <div className="relative mb-8">
        <div className="absolute inset-0 blur-3xl bg-purple-500/30 rounded-full w-48 h-48 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />
        <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-background/50 backdrop-blur-xl border border-border/20 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
          <BrainCircuit className="w-12 h-12 text-purple-400" />
        </div>
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight mb-4 bg-gradient-to-br from-white to-white/40 bg-clip-text text-transparent flex items-center gap-3 justify-center">
        AI Summary <Sparkles className="w-8 h-8 text-purple-400" />
      </h1>
      
      <p className="text-xl text-muted-foreground max-w-[600px] leading-relaxed">
        Our next-generation AI is currently analyzing global weather patterns. 
        Deep personalized insights and intelligent natural language summaries are coming soon.
      </p>
      
      <div className="mt-12 inline-flex items-center justify-center px-6 py-3 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 text-sm font-medium tracking-wide">
        STAY TUNED
      </div>
    </div>
  );
}

