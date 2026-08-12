import React from 'react';
import { ClipboardCheck, Sparkles, ShieldCheck, Ruler, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Ruler,
    title: '1. Laser Measurement',
    description: 'We visit your site, use laser tools for accurate measurements, and evaluate wall conditions.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
  },
  {
    icon: ClipboardCheck,
    title: '2. Detailed Estimate',
    description: 'You get a transparent, itemized quote with genuine Asian Paints/Berger products and zero hidden charges.',
    image: 'https://images.unsplash.com/photo-1622674697926-d62194600109?auto=format&fit=crop&q=80&w=800',
  },
  {
    icon: ShieldCheck,
    title: '3. Professional Execution',
    description: 'Our background-verified painters use mechanized dust-free tools and complete furniture masking.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
  },
  {
    icon: Sparkles,
    title: '4. Post-Painting Cleanup',
    description: 'We do a thorough clean-up, leaving you with beautifully painted walls and a spotless home.',
    image: 'https://images.unsplash.com/photo-1527515637-ed5b035fce18?auto=format&fit=crop&q=80&w=800',
  },
];

export default function PaintingProcess() {
  return (
    <div className="py-24 bg-royale-surface text-ivory relative overflow-hidden border-y border-royale-accent/40">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold font-bold tracking-wider text-sm uppercase mb-3 block">Our Methodology</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">How It Works</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg">
            Experience a hassle-free painting journey from the first consultation to the final reveal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="group relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-royale-surface via-royale-surface/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="w-12 h-12 rounded-full bg-gold text-zinc-950 flex items-center justify-center font-bold text-xl shadow-lg border-4 border-royale-surface text-white">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold font-serif mb-3 text-ivory group-hover:text-gold transition-colors">{step.title}</h3>
                <p className="text-zinc-600 leading-relaxed text-sm">
                  {step.description}
                </p>
                
                {/* Connector Line for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/3 -right-4 w-8 h-px bg-royale-accent" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
