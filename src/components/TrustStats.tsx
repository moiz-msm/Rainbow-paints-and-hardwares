import React from 'react';
import { Users, Building2, Award } from 'lucide-react';
import { brandDetails } from '../data';

export default function TrustStats({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const asianPaints = brandDetails.find(b => b.name === 'Asian Paints');
  const bergerPaints = brandDetails.find(b => b.name === 'Berger Paints');
  const mrfPaints = brandDetails.find(b => b.name === 'MRF Vapocure');

  const partners = [
    { brand: asianPaints, displayName: 'Asian Paints' },
    { brand: bergerPaints, displayName: 'Berger Paints' },
    { brand: mrfPaints, displayName: 'MRF Paints' },
  ];

  const brandSection = (
    <div className="mt-4 pt-3.5 border-t border-white/15">
      <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-gold mb-3 text-center lg:text-left">
        In Association With
      </p>
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 py-1">
        {partners.map((p, i) => (
          p.brand?.logo && (
            <img
              key={i}
              src={p.brand.logo}
              alt={`${p.displayName} logo`}
              loading="lazy"
              className="h-8 sm:h-9 w-auto max-w-[110px] sm:max-w-[130px] object-contain drop-shadow hover:scale-105 transition-all"
            />
          )
        ))}
      </div>
    </div>
  );

  if (variant === 'light') {
    return (
      <div>
        <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col items-center justify-center hover:bg-white/15 transition-all">
            <div className="flex items-center gap-1.5 mb-1">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
              <span className="text-xl sm:text-2xl font-extrabold text-gold tracking-tight">50+</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Partnered Contractors</div>
            <div className="text-[10px] sm:text-xs text-white/70 mt-0.5">Brand trained painters</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col items-center justify-center hover:bg-white/15 transition-all">
            <div className="flex items-center gap-1.5 mb-1">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
              <span className="text-xl sm:text-2xl font-extrabold text-gold tracking-tight">200+</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Sites Completed</div>
            <div className="text-[10px] sm:text-xs text-white/70 mt-0.5">Residential & commercial</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col items-center justify-center hover:bg-white/15 transition-all">
            <div className="flex items-center gap-1.5 mb-1">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gold shrink-0" />
              <span className="text-xl sm:text-2xl font-extrabold text-gold tracking-tight">100%</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white">Quality Assured</div>
            <div className="text-[10px] sm:text-xs text-white/70 mt-0.5">By top paint brands</div>
          </div>
        </div>

        {brandSection}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto lg:mx-0 pt-4 mt-6 border-t border-royale-accent/40">
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        <div className="bg-royale-surface/80 border border-royale-accent/60 rounded-xl p-3 text-center lg:text-left transition-all hover:border-gold/40">
          <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1">
            <Users className="w-4 h-4 text-gold shrink-0" />
            <span className="text-lg sm:text-xl font-extrabold text-gold tracking-tight">50+</span>
          </div>
          <div className="text-xs font-semibold text-ivory leading-tight">Partnered Contractors</div>
          <div className="text-[10px] text-ivory/60 mt-0.5 hidden sm:block">Brand trained & certified</div>
        </div>

        <div className="bg-royale-surface/80 border border-royale-accent/60 rounded-xl p-3 text-center lg:text-left transition-all hover:border-gold/40">
          <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1">
            <Building2 className="w-4 h-4 text-gold shrink-0" />
            <span className="text-lg sm:text-xl font-extrabold text-gold tracking-tight">200+</span>
          </div>
          <div className="text-xs font-semibold text-ivory leading-tight">Sites Completed</div>
          <div className="text-[10px] text-ivory/60 mt-0.5 hidden sm:block">Homes & commercial</div>
        </div>

        <div className="bg-royale-surface/80 border border-royale-accent/60 rounded-xl p-3 text-center lg:text-left transition-all hover:border-gold/40">
          <div className="flex items-center justify-center lg:justify-start gap-1.5 mb-1">
            <Award className="w-4 h-4 text-gold shrink-0" />
            <span className="text-lg sm:text-xl font-extrabold text-gold tracking-tight">100%</span>
          </div>
          <div className="text-xs font-semibold text-ivory leading-tight">Quality Assured</div>
          <div className="text-[10px] text-ivory/60 mt-0.5 hidden sm:block">By top paint brands</div>
        </div>
      </div>

      {brandSection}
    </div>
  );
}

