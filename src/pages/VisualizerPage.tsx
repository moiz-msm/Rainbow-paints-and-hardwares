import React, { useEffect } from 'react';
import VisualizerSection from '../components/VisualizerSection';
import { Sparkles, Info } from 'lucide-react';
import SEO from '../components/SEO';
import { analytics, db } from '../lib/firebase';
import { logEvent } from 'firebase/analytics';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthStore } from '../store/useAuthStore';

export default function VisualizerPage() {
  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'view_visualizer', {
        page_path: '/visualizer',
        page_title: 'Color Visualizer'
      });
    }
    
    // Also record in Firestore for Admin Dashboard real-time view
    const user = useAuthStore.getState().user;
    addDoc(collection(db, 'analytics_events'), {
      type: 'view_visualizer',
      userId: user ? user.uid : null,
      timestamp: serverTimestamp()
    }).catch(console.warn);
  }, []);

  return (
    <div className="pt-20 pb-12 bg-royale-bg min-h-screen">
      <SEO 
        title="Color Visualizer | Preview Paint Colors | Rainbow Paints & Hardwares"
        description="Virtually paint your room with our advanced Color Visualizer. Preview thousands of paint shades from top brands before you buy."
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto gap-4">
          <div className="flex flex-row items-center justify-center gap-3">
            <div className="inline-flex justify-center items-center p-2 rounded-xl glass-panel bg-royale-surface/30">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium uppercase tracking-tight">Colour <span className="text-gradient italic">Visualizer</span></h1>
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
