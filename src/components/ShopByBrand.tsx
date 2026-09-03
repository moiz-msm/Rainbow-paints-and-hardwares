import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { brandDetails } from '../data';

export default function ShopByBrand() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setCanScroll(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    if (scrollWidth > clientWidth) {
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -250 : 250;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-12 border-t border-gold/10 overflow-hidden bg-gradient-to-b from-royale-surface to-white/60">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 tracking-tight leading-tight text-center text-[#1A365D]">
            Shop From <span className="text-gradient italic">Top Brands</span>
          </h2>
          <p className="text-[10px] sm:text-xs text-[#1A365D]/70 max-w-xl mx-auto font-sans font-light leading-relaxed">
            Authorised dealer of leading paint brands in India.
          </p>
        </motion.div>
        
        <div className="relative mt-2 flex items-center group">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-2 sm:-left-4 z-10 w-8 h-8 rounded-full bg-white border border-zinc-200 text-ivory flex items-center justify-center hover:bg-zinc-50 hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-3 sm:gap-4 lg:gap-6 px-2 py-4 scroll-smooth w-full"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {brandDetails.filter(b => !['Bawa', 'Jaya', 'Gorila', 'Local'].includes(b.name)).map((brand) => (
              <Link 
                key={brand.name} 
                to={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-ivory/10 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.06)] hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 group/brand"
              >
                {brand.logo ? (
                  <img 
                    src={brand.logo} 
                    alt={`${brand.name} logo`} 
                    loading="lazy"
                    className="w-full h-full object-contain transition-all duration-300" 
                  />
                ) : (
                  <span className="text-ivory font-serif font-bold text-xs text-center">{brand.name}</span>
                )}
              </Link>
            ))}
            
            <Link 
              to="/buy-paint-online"
              className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-ivory/10 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.06)] hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 group/brand"
            >
              <span className="text-gold font-display font-bold text-[9px] sm:text-[11px] uppercase tracking-widest text-center mt-1">
                View All<br />Brands
              </span>
            </Link>
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-2 sm:-right-4 z-10 w-8 h-8 rounded-full bg-white border border-zinc-200 text-ivory flex items-center justify-center hover:bg-zinc-50 hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Scroll Indicator */}
        {canScroll && (
          <div className="w-24 h-1 bg-zinc-200/60 rounded-full mx-auto mt-6 overflow-hidden relative">
            <div 
              className="absolute top-0 left-0 h-full bg-[#1A365D] rounded-full w-1/3 transition-transform duration-100 ease-out"
              style={{ transform: `translateX(${scrollProgress * 200}%)` }} 
            />
          </div>
        )}
      </motion.div>
    </section>
  );
}
