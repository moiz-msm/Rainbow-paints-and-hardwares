import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brush, ShieldCheck, PenTool, Droplet, ArrowRight, Factory, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Interior Wall Painting',
    description: 'Transform your living spaces with premium Royale finishes.',
    image: 'https://img.icons8.com/color/144/living-room.png',
    link: '/services/interior-wall-painting',
  },
  {
    title: 'Exterior Wall Painting',
    description: 'Protect your building with Apex and Ultima Protek systems.',
    image: 'https://img.icons8.com/color/144/home.png',
    link: '/services/exterior-wall-painting',
  },
  {
    title: 'Wood & Metal Painting',
    description: 'PU finishes, Melamine polish, and Enamel for doors and grills.',
    image: 'https://img.icons8.com/color/144/wood.png',
    link: '/services/wood-metal-painting',
  },
  {
    title: 'Waterproofing Services',
    description: 'Scientific solutions to stop leaks and dampness permanently.',
    image: 'https://img.icons8.com/color/144/water.png',
    link: '/services/waterproofing',
  },
  {
    title: 'Industrial Flooring',
    description: 'High-performance Epoxy and PU flooring systems for extreme durability.',
    image: 'https://img.icons8.com/color/144/factory.png',
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
      const scrollAmount = direction === 'left' ? -250 : 250;
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
            Authorised painters by top brands for all painting services
          </p>
        </motion.div>
        
        <div className="relative mt-2 flex items-center group">
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-2 sm:-left-4 z-10 w-8 h-8 rounded-full bg-white border border-zinc-200 text-[#1A365D] flex items-center justify-center hover:bg-zinc-50 hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 sm:gap-6 lg:gap-8 px-4 py-8 scroll-smooth w-full snap-x snap-mandatory"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            <style>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {services.map((service, index) => {
              return (
                <Link 
                  key={index} 
                  to={service.link}
                  className="snap-start flex-shrink-0 flex flex-col items-center gap-3 w-[120px] sm:w-[140px] lg:w-[160px] group/cat"
                >
                  <div className="w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_15px_rgb(0,0,0,0.03)] border border-ivory/10 group-hover/cat:shadow-[0_8px_25px_rgb(0,0,0,0.08)] group-hover/cat:border-gold/40 transition-all duration-500 relative bg-gradient-to-br from-white to-zinc-50 group-hover/cat:-translate-y-1 flex items-center justify-center p-6">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain group-hover/cat:scale-110 transition-transform duration-700 ease-out drop-shadow-md"
                    />
                    <div className="absolute inset-0 bg-[#1A365D]/5 opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="font-serif font-medium text-[11px] sm:text-xs lg:text-sm text-center leading-tight text-[#1A365D] group-hover/cat:text-gold transition-colors line-clamp-2 mt-1">
                    {service.title}
                  </span>
                </Link>
              );
            })}
            
            <Link 
              to="/painting-services"
              className="snap-start flex-shrink-0 flex flex-col items-center gap-3 w-[120px] sm:w-[140px] lg:w-[160px] group/cat"
            >
              <div className="w-full aspect-square rounded-2xl sm:rounded-3xl bg-white border border-ivory/10 shadow-[0_4px_15px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.06)] hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center p-3 sm:p-4 group/all">
                <div className="w-10 h-10 rounded-full bg-royale-surface flex items-center justify-center mb-3 group-hover/all:bg-gold/10 transition-colors">
                  <ArrowRight className="w-4 h-4 text-gold" />
                </div>
                <span className="text-gold font-display font-bold text-[9px] sm:text-[11px] uppercase tracking-widest text-center leading-relaxed">
                  Explore All<br />Services
                </span>
              </div>

              <span className="text-transparent font-serif font-medium text-[11px] sm:text-xs lg:text-sm text-center leading-tight">
                All
              </span>
            </Link>
          </div>

          <button 
            onClick={() => scroll('right')}
            className="absolute -right-2 sm:-right-4 z-10 w-8 h-8 rounded-full bg-white border border-zinc-200 text-[#1A365D] flex items-center justify-center hover:bg-zinc-50 hover:border-gold/50 hover:text-gold transition-all opacity-0 group-hover:opacity-100 shadow-sm"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} />
          </button>
        </div>

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
