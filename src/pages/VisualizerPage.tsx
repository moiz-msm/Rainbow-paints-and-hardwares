import React from 'react';
import VisualizerSection from '../components/VisualizerSection';
import { Sparkles, Info } from 'lucide-react';

export default function VisualizerPage() {
  return (
    <div className="pt-20 pb-12 bg-royale-bg min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto gap-4">
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="inline-flex justify-center items-center p-2 rounded-xl glass-panel bg-royale-surface/30">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium uppercase tracking-tight">Colour <span className="text-gradient italic">Visualizer</span></h2>
          </div>
          <div className="inline-flex items-start sm:items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-gold/5 border border-gold/20 shadow-sm leading-snug">
            <Info className="w-3.5 h-3.5 text-gold/60 shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-[10px] sm:text-[11px] text-gold/80 font-medium italic text-left sm:text-center">
              Digital shade preview is for visualization only. Actual shade may vary due to screen settings, lighting, surface texture and paint finish. Please verify with shade card/sample before final purchase.
            </p>
          </div>
        </div>
      </div>
      <VisualizerSection />
    </div>
  );
}
