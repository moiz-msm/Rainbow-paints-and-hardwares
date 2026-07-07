import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Store, Award, MessageCircle, ShieldCheck, ArrowRight, PackageOpen, Truck, Tags, Shield, Sparkles, Mouse, ShoppingBag, Palette, Package, Tag, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brandDetails } from '../data';

export default function Hero() {

  const heroBrands = [
    "Asian Paints",
    "Berger Paints",
    "Birla White",
    "MRF Vapocure",
    "Dr. Fixit",
    "Just Spray"
  ].map(name => brandDetails.find(b => b.name === name)).filter(Boolean);

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll within the 200vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Calculate the height of the painted area (0% to 100%)
  const paintHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Calculate the top position for the roller (100% to 0%)
  const paintTop = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-royale-bg">
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-[100vh] min-h-[600px] w-full overflow-hidden flex flex-col justify-center">
        
        {/* ================= SCREEN 1 (Background - Shop Paint Online) ================= */}
        <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 pb-12 pt-[80px]">
          <div className="absolute inset-0 w-full h-full">
            <img src="/IMG_20260630_162408.png" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover object-[center_right] opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-royale-bg via-royale-bg/80 to-transparent" />
          </div>
           
           <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center z-10 h-full max-h-[800px]">
              {/* Left Text */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 rounded-full border border-gold/30 mb-6 lg:mb-8"
                  >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                    <span className="text-[10px] sm:text-xs font-sans font-bold text-gold tracking-[0.2em] uppercase">
                      EST.2001 • 20+ years of trust
                    </span>
                  </motion.div>

                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-serif font-bold text-ivory leading-[1.1] tracking-tight"
                  >
                    Skip the trip. <br/>
                    <span className="italic font-light text-gold">We deliver.</span>
                  </motion.h1>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-6 text-xs sm:text-sm md:text-base text-ivory/70 font-sans max-w-lg leading-relaxed px-4 lg:px-0"
                  >
                    Buy paints and related products online from top brands for homes, industries and waterproofing solutions.
                  </motion.p>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-6 sm:mt-10 flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full"
                  >
                    <Link to="/buy-paint-online" className="bg-[#C6A87C] text-white px-2 py-3 sm:px-8 sm:py-4 rounded-full text-[9px] sm:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap gap-1.5 sm:gap-3 hover:bg-[#b09265] transition-all duration-300 shadow-lg flex-1 min-w-0">
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" /> <span className="truncate">Shop Paint</span>
                    </Link>
                    <Link to="/visualizer" className="bg-white text-[#C6A87C] px-2 py-3 sm:px-8 sm:py-4 rounded-full text-[9px] sm:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap gap-1.5 sm:gap-3 transition-colors duration-300 shadow-lg flex-1 min-w-0" style={{backgroundColor: 'white', color: '#C6A87C'}}>
                      <Palette className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" /> <span className="truncate">Visualise Colours</span>
                    </Link>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="mt-10 sm:mt-12 grid grid-cols-4 gap-2 sm:gap-4 lg:flex lg:flex-row lg:flex-nowrap lg:items-start lg:justify-start lg:gap-10 w-full max-w-full"
                  >
                    <div className="flex flex-col items-center text-center">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6A87C] mb-2 sm:mb-3" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">200+<br/>Products</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Palette className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6A87C] mb-2 sm:mb-3" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">5000+<br/>Shades</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6A87C] mb-2 sm:mb-3" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">Pan India<br/>Delivery</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Tag className="w-5 h-5 sm:w-6 sm:h-6 text-[#C6A87C] mb-2 sm:mb-3" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">Best<br/>Pricing</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-10 lg:mt-12 w-full pt-6 border-t border-ivory/10 flex flex-col items-center lg:items-start"
                  >
                    <p className="text-[9px] sm:text-[10px] font-sans font-bold text-ivory/60 uppercase tracking-[0.15em] mb-4">
                      Authorised dealers for
                    </p>
                    <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-lg overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                      <motion.div 
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                        className="flex items-center w-max gap-8 sm:gap-12 pr-8 sm:pr-12"
                      >
                        {[...heroBrands, ...heroBrands].map((brand, idx) => brand && (
                          <div key={idx} className="h-6 sm:h-8 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                             <img src={brand.logo} alt={brand.name} className="max-h-full w-auto object-contain" />
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>

              </div>

              
           </div>
           
           {/* Scroll Down Indicator */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1, duration: 1 }}
             className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60"
           >
             <Mouse className="w-5 h-5 sm:w-6 sm:h-6 text-ivory animate-bounce" />
             <span className="text-[9px] sm:text-[10px] font-sans font-bold text-ivory uppercase tracking-[0.2em]">Scroll</span>
           </motion.div>
        </div>

        {/* ================= SCREEN 2 (Painted Foreground - Portfolio/Trust) ================= */}
        <motion.div 
          style={{ height: paintHeight }}
          className="absolute bottom-0 left-0 w-full overflow-hidden bg-ivory shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20"
        >
          {/* Inner content must be full height so it doesn't get squished */}
          <div className="absolute bottom-0 left-0 h-[100vh] min-h-[600px] w-full flex flex-col justify-center items-center px-4 sm:px-8 bg-ivory pb-12 pt-[80px]">
             
             <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center h-full max-h-[800px]">
                
                {/* Left Side: Trust & Stats */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left mt-8 lg:mt-0">
                   <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-serif font-bold text-royale-bg leading-[1.1] mb-6 tracking-tight">
                     20+ Years <br className="hidden lg:block" />
                     <span className="italic font-light text-gold">Of Trust</span>
                   </h2>

                   <p className="text-royale-bg/70 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 lg:mb-10 max-w-md px-4 lg:px-0">
                     Established in 2001, Rainbow Paint & Hardwares has been Coimbatore's trusted paint store, offering top brands and complete painting solutions for homes and industries.
                   </p>

                   {/* Features */}
                   <div className="flex flex-row items-center justify-between sm:justify-start gap-3 sm:gap-6 lg:gap-8 w-full overflow-x-auto no-scrollbar pb-2">
                     {[
                       { icon: Store, title: "3 Branches" },
                       { icon: Award, title: "10+ Top Brands" },
                       { icon: MessageCircle, title: "Expert Advice" },
                       { icon: ShieldCheck, title: "Reliable Service" }
                     ].map((feat, idx) => (
                       <div key={idx} className="flex flex-row items-center gap-2 shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-royale-bg/5 border border-royale-bg/10 flex items-center justify-center">
                             <feat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" />
                          </div>
                          <span className="text-royale-bg text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-widest whitespace-nowrap">{feat.title}</span>
                       </div>
                     ))}
                   </div>

                   {/* Get Quote Banner */}
                   <div className="mt-6 sm:mt-8 w-full max-w-sm sm:max-w-md">
                     <div className="bg-royale-bg/5 border border-royale-bg/10 rounded-2xl p-4 flex flex-row items-center justify-between hover:bg-royale-bg/10 transition-colors shadow-sm">
                        <div className="flex flex-col text-left">
                           <span className="text-royale-bg font-serif font-bold text-sm sm:text-base">Bulk or B2B Requirement?</span>
                           <span className="text-royale-bg/70 font-sans text-[10px] sm:text-xs">Get wholesale pricing for your project</span>
                        </div>
                        <Link to="/contact" className="shrink-0 bg-gold text-ivory px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#b09265] transition-colors shadow-lg">
                           <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" /> Get Quote
                        </Link>
                     </div>
                   </div>
                </div>

                {/* Right Side: Authorised Brands Grid (Hidden on small mobile if tight) */}
                <div className="hidden md:flex flex-col bg-royale-bg/5 rounded-[2rem] p-8 lg:p-12 border border-royale-bg/10 w-full max-w-xl mx-auto lg:ml-auto">
                   <h3 className="text-xs sm:text-sm font-sans font-bold text-gold uppercase tracking-[0.2em] mb-10 text-center">
                     Authorised Dealers For
                   </h3>
                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 items-center justify-items-center">
                     {heroBrands.slice(0, 6).map((brand, idx) => brand && (
                       <div key={idx} className="h-10 lg:h-14 w-full flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
                         <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain filter brightness-0 invert" />
                       </div>
                     ))}
                   </div>
                </div>

             </div>
          </div>
        </motion.div>

        {/* ================= ROLLER (OUTSIDE OF OVERFLOW HIDDEN) ================= */}
        <motion.div 
          style={{ top: paintTop }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-[25px] sm:-translate-y-[35px] w-[260px] sm:w-[340px] md:w-[400px] h-[160px] sm:h-[220px] pointer-events-none z-30 drop-shadow-2xl"
        >
           <svg width="100%" height="100%" viewBox="0 0 340 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000" floodOpacity="0.4"/>
                </filter>
                <linearGradient id="rollerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1A365D"/>
                  <stop offset="30%" stopColor="#2A4A7F"/>
                  <stop offset="70%" stopColor="#1A365D"/>
                  <stop offset="100%" stopColor="#0D1E36"/>
                </linearGradient>
                <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF"/>
                  <stop offset="50%" stopColor="#9E9E9E"/>
                  <stop offset="100%" stopColor="#616161"/>
                </linearGradient>
                <linearGradient id="handleGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#E0E0E0"/>
                  <stop offset="100%" stopColor="#757575"/>
                </linearGradient>
              </defs>

              <path d="M290 40 H 315 V 120 H 160 V 150" stroke="url(#metalGrad)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#shadow)" />
              <rect x="145" y="150" width="30" height="70" rx="15" fill="url(#handleGrad)" filter="url(#shadow)" />
              
              <rect x="30" y="10" width="260" height="60" rx="12" fill="url(#rollerGrad)" filter="url(#shadow)" />
              
              <rect x="22" y="20" width="8" height="40" rx="4" fill="#0D1E36" />
              <rect x="290" y="20" width="8" height="40" rx="4" fill="#0D1E36" />
           </svg>
        </motion.div>
      </div>
    </section>
  );
}
