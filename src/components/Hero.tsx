import React, { useRef, useEffect, useState } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { ArrowRight, ShoppingCart, Palette, PackageOpen, Truck, Tags } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] lg:min-h-[700px] lg:h-screen lg:max-h-[850px] flex flex-col justify-center lg:justify-center pt-[100px] sm:pt-[140px] lg:pt-[110px] pb-[12dvh] sm:pb-4 lg:pb-6 overflow-hidden bg-royale-bg">
      {/* Background Image with soft fade mask */}
      <div className="absolute inset-x-0 bottom-0 top-[64px] sm:top-[64px] lg:top-[72px] z-0 pointer-events-none flex justify-end">
        
        {/* Layer 1: Left-to-right gradient to blend the image horizontally with the background */}
        <div className="absolute inset-0 bg-gradient-to-r from-royale-bg via-royale-bg/95 to-transparent z-10 w-[85%] sm:w-[75%] lg:w-[65%]" />
        
        {/* Layer 2: Bottom-to-top gradient for a smooth ambient fade along the Y-axis */}
        <div className="absolute inset-0 bg-gradient-to-t from-royale-bg via-transparent to-transparent z-10 h-full w-full" />
        
        {/* Layer 2.5: Extra bottom fade for mobile and tablet AND Desktop */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-royale-bg via-royale-bg/80 to-transparent z-10" />
        
        {/* Layer 3: The Image with a CSS mask for the hard edges */}
        <img 
          src="/Hero-bg.png" 
          alt="Modern beautiful living space" 
          className="w-[85%] sm:w-[80%] lg:w-[75%] h-full object-cover object-top scale-[0.75] sm:scale-[0.85] lg:scale-100 origin-top-right"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          loading="eager"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 25%)', 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 25%)' 
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col flex-1 justify-center lg:justify-center lg:pt-0 sm:mt-0">
        <div className="flex flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-4">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-[1.4] sm:flex-1 flex flex-col gap-2 sm:gap-4 lg:gap-3 text-center items-center"
          >
            <div className="flex flex-col items-center gap-2 sm:gap-4 lg:gap-3 max-w-3xl">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[9px] sm:text-[11px] lg:text-xs font-display font-medium text-gold tracking-[0.4em] sm:tracking-[0.5em] uppercase text-center"
              >
                Premium Paints. Unmatched Protection.
              </motion.p>
              
              <h1 className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-serif font-medium text-ivory leading-[1.2] lg:leading-[1.1] tracking-[0.05em] uppercase max-w-2xl text-center">
                20+ Years of Trusted <br className="hidden sm:block" />
                <span className="text-gold">Paint Solutions</span>
              </h1>

              <div className="flex items-center gap-2 justify-center">
                <div className="h-[1px] w-8 sm:w-16 bg-black/20" />
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rotate-45 border border-gold bg-gold/20" />
                <div className="h-[1px] w-8 sm:w-16 bg-black/20" />
              </div>

              <p className="text-[11px] sm:text-sm lg:text-base text-gold font-sans font-light leading-tight sm:leading-snug max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[700px] xl:max-w-[800px] mx-auto relative z-20 text-center">
                Wide range of products, guidance and tools to help you visualise compare and buy online with complete confidence
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full mt-2 lg:mt-4">
              <Link to="/buy-paint-online" className="bg-gradient-to-r from-gold to-[#D4B572] hover:from-[#D4B572] hover:to-gold text-white px-5 sm:px-8 py-2 sm:py-3.5 rounded-xl whitespace-nowrap text-xs sm:text-sm font-display font-bold flex items-center gap-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 hover:shadow-[0_10px_25px_-5px_rgba(184,151,90,0.3)] shadow-[0_4px_15px_-5px_rgba(184,151,90,0.2)] active:scale-95 group tracking-widest uppercase">
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> Shop Paint <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 inline-block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </Link>
              <Link to="/visualizer" className="bg-royale-surface/50 border border-zinc-200 shadow-sm px-5 sm:px-8 py-2 sm:py-3.5 rounded-xl whitespace-nowrap text-xs sm:text-sm font-display font-bold flex items-center gap-2 hover:bg-gold/5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-gold/30 hover:scale-105 active:scale-95 tracking-widest uppercase group/visual text-gold">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-gold" /> Visualise Colours <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-50 group-hover/visual:translate-x-1 group-hover/visual:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
              </Link>
            </div>

            {/* Features Grid (Desktop View) */}
            <div className="hidden lg:grid grid-cols-4 gap-2 w-full max-w-4xl mx-auto lg:mt-2">
              {[
                { icon: PackageOpen, title: "100+ Products", sub: "from India's top leading brands" },
                { icon: Palette, title: "4000+ Color Shades", sub: "latest and popular shades" },
                { icon: Truck, title: "Doorstep Delivery", sub: "in 60-120 mins guaranteed" },
                { icon: Tags, title: "Best Pricing", sub: "lowest- no middleman involved" }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                <div key={idx} className="flex flex-col items-center justify-start text-center gap-1.5 p-4 rounded-2xl border border-gold/20 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group bg-gradient-to-b from-white/5 to-gold/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_15px_40px_-5px_rgba(184,151,90,0.15)] hover:border-gold/40">
                  <div className="w-12 h-12 mb-1 rounded-[14px] bg-white/10 shadow-[0_4px_15px_rgba(184,151,90,0.1)] flex items-center justify-center border border-gold/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <span className="text-gold drop-shadow-[0_2px_5px_rgba(184,151,90,0.2)]">
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-[10px] font-display font-bold text-gold uppercase tracking-tight leading-tight transition-colors duration-500 lg:whitespace-normal">
                      {item.title}
                    </p>
                    <p className="text-[9px] text-ivory/60 font-sans font-medium leading-[1.15] mt-1 line-clamp-2 uppercase tracking-wider transition-colors duration-500 group-hover:text-ivory/80">{item.sub}</p>
                  </div>
                </div>
              )})}
            </div>
          </motion.div>

          {/* Right Content - Mascot Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-[0.8] sm:flex-1 flex flex-col items-center justify-center relative h-[180px] sm:h-[250px] md:h-[320px] lg:h-[400px] xl:h-[450px]"
          >
             {/* Mascot image removed, keeping container for layout */}
          </motion.div>
        </div>

        {/* Features Grid (Mobile/Tablet View) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid lg:hidden grid-cols-4 gap-1.5 sm:gap-4 w-full mt-3 sm:mt-6"
        >
          {[
            { icon: PackageOpen, title: "100+ Products", sub: "from India's top leading brands" },
            { icon: Palette, title: "4000+ Color Shades", sub: "latest and popular shades" },
            { icon: Truck, title: "Doorstep Delivery", sub: "in 60-120 mins guaranteed" },
            { icon: Tags, title: "Best Pricing", sub: "lowest- no middleman involved" }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
            <div key={idx} className="flex flex-col items-center justify-start text-center p-1.5 sm:p-4 rounded-xl sm:rounded-2xl border border-gold/20 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group bg-gradient-to-b from-white/5 to-gold/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 hover:shadow-[0_15px_40px_-5px_rgba(184,151,90,0.15)] hover:border-gold/40">
              <div className="w-7 h-7 sm:w-12 sm:h-12 mb-1.5 sm:mb-2 rounded-lg sm:rounded-[14px] bg-white/10 shadow-[0_4px_15px_rgba(184,151,90,0.1)] flex items-center justify-center border border-gold/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <span className="text-gold drop-shadow-[0_2px_5px_rgba(184,151,90,0.2)]">
                  <Icon className="w-3.5 h-3.5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </span>
              </div>
              <div className="flex flex-col items-center overflow-hidden w-full">
                <p className="text-[7.5px] sm:text-[11px] font-display font-bold text-gold uppercase tracking-tighter leading-[1.1] sm:leading-tight transition-colors duration-500 whitespace-nowrap lg:whitespace-normal truncate w-full">
                  {item.title}
                </p>
                <p className="block text-[6px] sm:text-[9px] text-ivory/60 font-sans font-medium leading-[1.15] mt-0.5 sm:mt-1 line-clamp-2 uppercase tracking-wide sm:tracking-wider transition-colors duration-500 group-hover:text-ivory/80">{item.sub}</p>
              </div>
            </div>
          )})}
        </motion.div>


        {/* Ambient Gold Dust (reduced count/complexity) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-gold/30 rounded-full"
              animate={{
                y: ["0vh", "100vh"],
                opacity: [0, 0.4, 0]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 1.5,
              }}
              style={{
                left: `${10 + (i * 10)}%`,
                top: `-10px`,
              }}
            />
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 lg:mt-3 py-3 sm:py-4 lg:py-4 px-1 lg:px-4 bg-royale-surface/50 border border-zinc-200 rounded-2xl grid grid-cols-4 gap-1 lg:gap-0"
        >
          {[
            { label: "Years Trust", value: 20, suffix: "+" },
            { label: "Top Brands", value: 10, suffix: "+" },
            { label: "Genuine Products", value: 100, suffix: "%" },
            { label: "Happy Customers", value: 10, suffix: "K+" }
          ].map((stat, idx) => (
            <StatItem key={idx} stat={stat} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface StatProps {
  label: string;
  value: number;
  suffix: string;
}

function StatItem({ stat }: { stat: StatProps, key?: any }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "0px 0px -50px 0px" });
  
  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(0, stat.value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.floor(value).toString() + stat.suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [stat.value, stat.suffix, isInView]);

  return (
    <div className="flex flex-col items-center justify-center p-1 sm:p-2 lg:p-4 group relative overflow-hidden transition-all duration-500 hover:bg-gold/5 rounded-xl border border-transparent hover:border-gold/20 text-center">
      <div className="flex items-center gap-1 sm:gap-2 mb-1">
        <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rotate-45 bg-gold/40 group-hover:bg-gold transition-colors flex-shrink-0" />
        <span ref={nodeRef} className="text-base sm:text-xl md:text-2xl font-serif font-medium text-gold whitespace-nowrap">
          0{stat.suffix}
        </span>
      </div>
      <span className="text-[8px] sm:text-[9px] font-display font-medium text-ivory/40 uppercase tracking-widest sm:tracking-[0.25em] group-hover:text-ivory/60 transition-colors text-center">
        {stat.label}
      </span>
      
      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gold/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
    </div>
  );
}
