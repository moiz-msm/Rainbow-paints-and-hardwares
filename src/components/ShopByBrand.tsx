import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <section className="py-12 sm:py-20 lg:py-24 border-t border-gold/10 overflow-hidden bg-transparent">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <header className="mb-4 flex flex-col items-center text-center">
          <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 uppercase tracking-tight leading-tight text-center">
            Shop by <span className="text-gradient italic">Brand</span>
          </h2>
        </header>
        
        <div className="relative mt-2 flex items-center group">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-2 sm:-left-4 z-10 w-8 h-8 rounded-full bg-white/[0.02] border border-zinc-200 text-ivory flex items-center justify-center hover:bg-white/[0.05] hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 sm:gap-6 px-2 py-4 scroll-smooth w-full"
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
                className="flex-shrink-0 flex items-center justify-center gap-3 p-4 sm:p-5 rounded-xl border border-zinc-200 bg-white/[0.02] hover:border-gold/50 hover:bg-white/[0.05] transition-all duration-300 shadow-sm group hover-gold-glow min-w-[200px]"
              >
                {brand.logo && (
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    loading="lazy"
                    className="h-8 w-8 sm:h-10 sm:w-10 object-contain bg-white rounded-md p-1 shrink-0 group-hover:scale-105 transition-transform duration-300" 
                  />
                )}
                <span className="text-gold font-serif font-medium text-xs sm:text-sm whitespace-nowrap uppercase tracking-wider transition-colors duration-300 block">
                  {brand.name === "MRF Vapocure" ? "MRF Paints" : brand.name}
                </span>
              </Link>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-2 sm:-right-4 z-10 w-8 h-8 rounded-full bg-white/[0.02] border border-zinc-200 text-ivory flex items-center justify-center hover:bg-white/[0.05] hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
