import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Interior Wall', slug: 'interior-wall', image: 'https://img.icons8.com/color/144/living-room.png' },
  { name: 'Exterior Wall', slug: 'exterior-wall', image: 'https://img.icons8.com/color/144/home.png' },
  { name: 'Undercoats', slug: 'undercoats', image: 'https://img.icons8.com/color/144/paint-bucket.png' },
  { name: 'Waterproofing', slug: 'waterproofing', image: 'https://img.icons8.com/color/144/water.png' },
  { name: 'Wood Finishes', slug: 'wood-finishes', image: 'https://img.icons8.com/color/144/wood.png' },
  { name: 'Metals and Grills', slug: 'metals-and-grills', image: 'https://img.icons8.com/color/144/metal.png' },
  { name: 'Painting Tools', slug: 'painting-tools', image: 'https://img.icons8.com/color/144/paint-brush.png' },
  { name: 'Thinners & Solvents', slug: 'thinners-&-solvents', image: 'https://img.icons8.com/color/144/flask.png' },
  { name: 'Tile Adhesives', slug: 'tile-adhesives', image: 'https://img.icons8.com/color/144/brick-wall.png' },
  { name: 'PU Coatings', slug: 'pu-coatings', image: 'https://img.icons8.com/color/144/paint.png' },
  { name: 'Epoxy Coatings', slug: 'epoxy-coatings', image: 'https://img.icons8.com/color/144/test-tube.png' },
  { name: 'Synthetic Enamels', slug: 'synthetic-enamels', image: 'https://img.icons8.com/color/144/paint-can.png' }
];

export default function ShopByCategory() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  React.useEffect(() => {
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
    <section className="py-8 sm:py-12 border-t border-gold/10 overflow-hidden bg-gradient-to-b from-white/60 to-royale-surface">
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
          <h2 className="text-xl sm:text-2xl font-serif font-medium mb-2 tracking-tight leading-tight text-center text-[#1A365D]">
            Shop By <span className="text-gradient italic">Category</span>
          </h2>
          <p className="text-[10px] sm:text-xs text-[#1A365D]/70 max-w-xl mx-auto font-sans font-light leading-relaxed">
            Wall painting, industrial, waterproofing, wood and hardwares.
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
            className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 px-2 py-4 scroll-smooth w-full"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                to={`/c/${category.slug}`}
                className="flex-shrink-0 flex flex-col items-center gap-3 w-[100px] sm:w-[120px] lg:w-[140px] group/cat"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50 group-hover/cat:shadow-[0_8px_25px_rgb(0,0,0,0.06)] group-hover/cat:border-gold/30 transition-all duration-300 relative bg-gradient-to-br from-white to-zinc-50 flex items-center justify-center p-4">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain group-hover/cat:scale-110 transition-transform duration-500 ease-out drop-shadow-sm"
                  />
                </div>
                <span className="font-serif font-medium text-[11px] sm:text-xs lg:text-sm text-center leading-tight text-[#1A365D]">
                  {category.name}
                </span>
              </Link>
            ))}
            <Link 
              to="/buy-paint-online"
              className="flex-shrink-0 flex flex-col items-center gap-3 w-[100px] sm:w-[120px] lg:w-[140px] group/cat"
            >
              <div className="w-full aspect-square rounded-2xl bg-white border border-ivory/10 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.06)] hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center p-3 sm:p-4">
                <span className="text-gold font-display font-bold text-[9px] sm:text-[11px] uppercase tracking-widest text-center mt-1">
                  View All<br />Categories
                </span>
              </div>
              <span className="text-transparent font-serif font-medium text-[11px] sm:text-xs lg:text-sm text-center leading-tight">
                All
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
