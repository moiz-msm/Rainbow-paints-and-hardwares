import React from 'react';
import CalculatorSection from '../components/CalculatorSection';
import { Calculator } from 'lucide-react';
import SEO from '../components/SEO';

export default function CalculatorPage() {
  return (
    <div className="pt-24 pb-12 bg-royale-bg min-h-screen">
      <SEO 
        title="Paint Cost Calculator | Estimate Paint Quantity | Rainbow Paints & Hardwares"
        description="Easily estimate how much paint you need and the expected cost. Use our Paint Cost Calculator to plan your painting project efficiently."
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

          <div className="text-left md:text-right max-w-xl">
            <div className="inline-flex justify-center items-center p-2 rounded-xl glass-panel mb-3 bg-royale-surface/30 md:hidden">
              <Calculator className="w-4 h-4 text-gold" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-serif font-medium mb-3 uppercase tracking-tight">Paint Cost <span className="text-gradient italic">Calculator</span></h1>
            <p className="text-[10px] sm:text-xs lg:text-sm text-gold font-sans font-light leading-relaxed mb-4">Enter your room dimensions to get the exact amount of paint needed and an estimated cost breakdown.</p>

          </div>
        </div>
      </div>
      <CalculatorSection />
    </div>
  );
}
