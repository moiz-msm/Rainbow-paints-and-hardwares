import React from 'react';
import { motion } from 'framer-motion';
import { Store, Award, MessageCircle, ShieldCheck } from 'lucide-react';
import { brandDetails } from '../data';

export default function TrustCardBanner() {
  const trustBrands = [
    "Asian Paints",
    "Berger Paints",
    "Dr. Fixit",
    "MRF Vapocure",
    "Sheenlac",
    "Fevicol"
  ].map(name => brandDetails.find(b => b.name === name)).filter(Boolean);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 z-20">
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-white border-2 border-[#C59B47]/40 rounded-[2.5rem] p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(26,54,93,0.08)] relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: 20+ Years of Trust */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-[11px] sm:text-xs font-sans font-bold text-slate-500 tracking-[0.25em] uppercase mb-2">
              Est. 2001
            </span>
            
            <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 my-1">
              {/* Left Laurel Wreath SVG */}
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C59B47] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.5 3c-.5 0-1 .2-1.4.6C13.5 6 12 9.5 12 13c0 1.5.3 3 .8 4.4l1.9-1c-.4-1.1-.7-2.3-.7-3.4 0-3 1.3-6 3.3-8.4.4-.4.5-1 .2-1.5-.2-.4-.6-.6-1-.6zM6.5 3c.5 0 1 .2 1.4.6C10.5 6 12 9.5 12 13c0 1.5-.3 3-.8 4.4l-1.9-1c.4-1.1.7-2.3.7-3.4 0-3-1.3-6-3.3-8.4-.4-.4-.5-1-.2-1.5.2-.4.6-.6 1-.6z" />
              </svg>

              <div className="flex flex-col">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#0B2847] tracking-tight leading-none">
                  25+ <span className="font-serif font-bold italic text-[#B8862D]">YEARS</span>
                </h2>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold italic text-[#B8862D] tracking-tight leading-tight mt-1">
                  OF TRUST
                </h3>
              </div>

              {/* Right Laurel Wreath SVG */}
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#C59B47] shrink-0 scale-x-[-1]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.5 3c-.5 0-1 .2-1.4.6C13.5 6 12 9.5 12 13c0 1.5.3 3 .8 4.4l1.9-1c-.4-1.1-.7-2.3-.7-3.4 0-3 1.3-6 3.3-8.4.4-.4.5-1 .2-1.5-.2-.4-.6-.6-1-.6zM6.5 3c.5 0 1 .2 1.4.6C10.5 6 12 9.5 12 13c0 1.5-.3 3-.8 4.4l-1.9-1c.4-1.1.7-2.3.7-3.4 0-3-1.3-6-3.3-8.4-.4-.4-.5-1-.2-1.5.2-.4.6-.6 1-.6z" />
              </svg>
            </div>

            <p className="mt-4 text-xs sm:text-sm lg:text-[15px] text-slate-600 font-sans leading-relaxed max-w-lg">
              Established in 2001, Rainbow Paints & Hardwares has been Coimbatore's trusted paint store, offering top brands and complete painting solutions for homes and industries.
            </p>
          </div>

          {/* Right Column: Authorised Dealers For Brands Grid */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-center gap-3 mb-4">
              <div className="h-px bg-gold/40 flex-1 max-w-[60px]" />
              <span className="text-[10px] sm:text-xs font-sans font-bold text-[#0B2847] tracking-[0.2em] uppercase whitespace-nowrap">
                Authorised Dealers For
              </span>
              <div className="h-px bg-gold/40 flex-1 max-w-[60px]" />
            </div>

            <div className="grid grid-cols-3 gap-3 w-full">
              {trustBrands.map((brand, idx) => brand && (
                <div 
                  key={idx}
                  className="bg-white border border-zinc-200/80 rounded-2xl p-3 h-16 sm:h-20 flex items-center justify-center shadow-xs hover:shadow-md hover:border-[#C59B47]/50 transition-all duration-300 group"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    loading="lazy" 
                    decoding="async" 
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom 4 Key Stats / Features Bar */}
        <div className="mt-8 pt-6 border-t border-zinc-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
          
          {/* Stat 1 */}
          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="w-11 h-11 rounded-2xl bg-[#C59B47]/10 border border-[#C59B47]/30 flex items-center justify-center text-[#B8862D] shrink-0">
              <Store className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-lg font-serif font-black text-[#0B2847] leading-tight">3</span>
              <span className="text-[10px] sm:text-xs font-sans font-bold text-slate-500 uppercase tracking-wider">Branches</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="w-11 h-11 rounded-2xl bg-[#C59B47]/10 border border-[#C59B47]/30 flex items-center justify-center text-[#B8862D] shrink-0">
              <Award className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-lg font-serif font-black text-[#0B2847] leading-tight">10+</span>
              <span className="text-[10px] sm:text-xs font-sans font-bold text-slate-500 uppercase tracking-wider">Top Brands</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="w-11 h-11 rounded-2xl bg-[#C59B47]/10 border border-[#C59B47]/30 flex items-center justify-center text-[#B8862D] shrink-0">
              <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-lg font-serif font-black text-[#0B2847] leading-tight">Expert</span>
              <span className="text-[10px] sm:text-xs font-sans font-bold text-slate-500 uppercase tracking-wider">Advice</span>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-3.5 justify-center md:justify-start">
            <div className="w-11 h-11 rounded-2xl bg-[#C59B47]/10 border border-[#C59B47]/30 flex items-center justify-center text-[#B8862D] shrink-0">
              <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-base sm:text-lg font-serif font-black text-[#0B2847] leading-tight">Reliable</span>
              <span className="text-[10px] sm:text-xs font-sans font-bold text-slate-500 uppercase tracking-wider">Service</span>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
