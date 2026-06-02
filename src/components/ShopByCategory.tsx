import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  { name: 'Interior Wall', slug: 'interior-wall', emoji: '🏠' },
  { name: 'Exterior Wall', slug: 'exterior-wall', emoji: '🌞' },
  { name: 'Waterproofing', slug: 'waterproofing', emoji: '💧' },
  { name: 'Wood Finishes', slug: 'wood-finishes', emoji: '🪵' },
  { name: 'Metals & Grills', slug: 'metals-and-grills', emoji: '🛡️' },
  { name: 'Primer', slug: 'primer', emoji: '🖌️' }
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
    <section className="py-8 sm:py-12 bg-royale-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-ivory mb-6 uppercase tracking-tight text-center">
          Shop by <span className="text-gold italic">Category</span>
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
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                to={`/c/${category.slug}`}
                className="flex-shrink-0 flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-4 rounded-xl border border-zinc-200 bg-white/[0.02] hover:border-gold/50 hover:bg-white/[0.05] transition-all duration-300 shadow-sm group hover-gold-glow"
              >
                <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300">{category.emoji}</span>
                <span className="text-gold font-serif font-medium text-xs sm:text-sm whitespace-nowrap uppercase tracking-wider transition-colors duration-300">
                  {category.name}
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
