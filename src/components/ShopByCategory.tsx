import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Sun, Droplets, TreePine, Shield, Paintbrush } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Interior Wall', slug: 'interior-wall', icon: Home },
  { name: 'Exterior Wall', slug: 'exterior-wall', icon: Sun },
  { name: 'Waterproofing', slug: 'waterproofing', icon: Droplets },
  { name: 'Wood Finishes', slug: 'wood-finishes', icon: TreePine },
  { name: 'Metals & Grills', slug: 'metals-and-grills', icon: Shield },
  { name: 'Primer', slug: 'primer', icon: Paintbrush }
];

export default function ShopByCategory() {
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
            Shop by <span className="text-gradient italic">Category</span>
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
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                to={`/c/${category.slug}`}
                className="flex-shrink-0 flex items-center justify-center gap-3 p-4 sm:p-5 rounded-xl border border-zinc-200 bg-white/[0.02] hover:border-gold/50 hover:bg-white/[0.05] transition-all duration-300 shadow-sm group hover-gold-glow min-w-[160px]"
              >
                <span className="text-gold group-hover:scale-110 transition-transform duration-300">
                  <category.icon className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={1.5} />
                </span>
                <span className="text-gold font-serif font-medium text-xs sm:text-sm whitespace-nowrap uppercase tracking-wider transition-colors duration-300 block mt-0.5">
                  {category.name}
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
