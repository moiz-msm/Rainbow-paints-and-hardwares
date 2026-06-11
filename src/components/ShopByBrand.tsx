import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { brandDetails } from '../data';

export default function ShopByBrand() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -250 : 250;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-12 bg-royale-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-ivory mb-6 uppercase tracking-tight text-center">
          Shop by <span className="text-gold italic">Brand</span>
        </h2>
        
        <div className="relative mt-2 flex items-center group">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-2 sm:-left-4 z-10 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-600 text-ivory flex items-center justify-center hover:bg-zinc-700 transition opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-3 sm:gap-4 px-2 py-2 scroll-smooth w-full"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {brandDetails.map((brand) => (
              <Link 
                key={brand.name} 
                to={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex-shrink-0 flex items-center justify-center gap-3 px-5 py-3 sm:px-6 sm:py-4 rounded-xl border border-zinc-200 bg-white/[0.02] hover:border-gold/50 hover:bg-white/[0.05] transition-all duration-300 shadow-sm group hover-gold-glow w-[200px]"
              >
                {brand.logo && (
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    loading="lazy"
                    className="h-8 w-8 sm:h-10 sm:w-10 object-contain shrink-0" 
                  />
                )}
                <span className="text-gold font-serif font-medium text-xs sm:text-sm whitespace-nowrap uppercase tracking-wider transition-colors duration-300">
                  {brand.name === "MRF Vapocure" ? "MRF Paints" : brand.name}
                </span>
              </Link>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-2 sm:-right-4 z-10 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-600 text-ivory flex items-center justify-center hover:bg-zinc-700 transition opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
