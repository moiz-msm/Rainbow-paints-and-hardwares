import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Interior Wall Painting',
    description: 'Transform your living spaces with premium Royale finishes.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    link: '/services/interior-wall-painting',
  },
  {
    title: 'Exterior Wall Painting',
    description: 'Protect your building with Apex and Ultima Protek systems.',
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&q=80',
    link: '/services/exterior-wall-painting',
  },
  {
    title: 'Wood & Metal Painting',
    description: 'PU finishes, Melamine polish, and Enamel for doors and grills.',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    link: '/services/wood-metal-painting',
  },
  {
    title: 'Waterproofing Services',
    description: 'Scientific solutions to stop leaks and dampness permanently.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f6458?auto=format&fit=crop&w=600&q=80',
    link: '/services/waterproofing',
  },
  {
    title: 'Industrial Flooring',
    description: 'High-performance Epoxy and PU flooring systems for extreme durability.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    link: '/services/industrial-flooring',
  },
];

export default function PaintingServicesOverview() {
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
      const scrollAmount = direction === 'left' ? -280 : 280;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 sm:py-12 border-t border-gold/10 overflow-hidden bg-gradient-to-b from-white/60 to-royale-surface relative">
      {/* Minimal Single-Color Streaks */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.04]">
        <svg className="w-full h-full text-[#1A365D]" viewBox="0 0 1000 400" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,300 Q400,450 1100,100" stroke="currentColor" strokeWidth="25" strokeLinecap="round" className="opacity-80" />
          <path d="M-100,340 Q450,470 1100,160" stroke="currentColor" strokeWidth="12" strokeLinecap="round" className="opacity-40" />
          <path d="M-100,150 Q400,-50 1100,250" stroke="currentColor" strokeWidth="40" strokeLinecap="round" className="opacity-60" />
        </svg>
      </div>

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
            Professional <span className="text-gradient italic">Painting Services</span>
          </h2>
          <p className="text-[10px] sm:text-xs text-[#1A365D]/70 max-w-xl mx-auto font-sans font-light leading-relaxed">
            Expert site inspection, professional application, and flawless finishes across Coimbatore.
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
            className="flex overflow-x-auto gap-5 sm:gap-6 lg:gap-8 px-2 py-4 scroll-smooth w-full"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {services.map((service, index) => (
              <Link 
                key={`${service.link}-${index}`}
                to={service.link}
                className="flex-shrink-0 flex flex-col bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_12px_35px_rgba(184,151,90,0.2)] hover:border-gold/50 transition-all duration-500 w-[240px] sm:w-[280px] lg:w-[310px] group/srv"
              >
                <div className="w-full aspect-[16/10] overflow-hidden relative bg-zinc-100">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center group-hover/srv:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover/srv:opacity-40 transition-opacity" />
                </div>
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#1A365D] group-hover/srv:text-gold transition-colors mb-1.5">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-gold uppercase tracking-wider">
                    <span>Explore Service</span>
                    <span className="transform group-hover/srv:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-2 sm:-right-4 z-10 w-8 h-8 rounded-full bg-white border border-zinc-200 text-ivory flex items-center justify-center hover:bg-zinc-50 hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
