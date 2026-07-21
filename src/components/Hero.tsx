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
  const clipPath = useTransform(scrollYProgress, [0, 1], ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);
  // Calculate the top position for the roller (100% to 0%)
  const paintY = useTransform(scrollYProgress, [0, 1], ["100vh", "0vh"]);

  // Animations for Screen 2
  const y1 = useTransform(scrollYProgress, [0.1, 0.4], [150, 0]);

  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [150, 0]);

  const y3 = useTransform(scrollYProgress, [0.3, 0.6], [150, 0]);

  const y4 = useTransform(scrollYProgress, [0.4, 0.7], [150, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-royale-bg">
      {/* Sticky container that stays in view while scrolling */}
      <div className="sticky top-0 h-[100dvh] min-h-[480px] sm:min-h-[550px] w-full overflow-hidden flex flex-col justify-center">
        
        {/* ================= SCREEN 1 (Background - Shop Paint Online) ================= */}
        <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 pb-4 sm:pb-6 pt-[80px] sm:pt-[95px] lg:pt-[105px] xl:pt-[115px]">
          <div className="absolute inset-0 w-full h-full">
            <img src="/IMG_20260630_162408.webp" fetchPriority="high" decoding="async" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover object-center" />
            {/* Elegant light cream/beige gradient matching the brand palette that preserves the original image on the right while ensuring high legibility for the text on the left */}
            <div className="absolute inset-0 bg-gradient-to-b from-royale-bg/95 via-royale-bg/80 to-royale-bg/40 lg:bg-gradient-to-r lg:from-royale-bg lg:via-royale-bg/75 lg:to-transparent" />
          </div>
           
           <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center content-center z-10 h-full overflow-y-auto no-scrollbar py-2 lg:py-4">
              {/* Left Text */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left my-auto max-w-xl">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 bg-gold/10 rounded-full border border-gold/30 mb-2 sm:mb-4"
                  >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gold" />
                    <span className="text-[9px] sm:text-[10px] md:text-xs font-sans font-bold text-gold tracking-[0.15em] sm:tracking-[0.2em] uppercase">
                      EST.2001 • 20+ years of trust
                    </span>
                  </motion.div>
 
                  <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl font-serif font-bold text-ivory tracking-tight leading-[1.1]"
                  >
                    Skip the trip. <br/>
                    <span className="italic font-light text-gold">We deliver.</span>
                  </motion.h1>
 
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-2 sm:mt-3 text-[11px] sm:text-xs md:text-sm lg:text-base text-ivory/70 font-sans max-w-sm lg:max-w-lg leading-relaxed px-4 lg:px-0"
                  >
                    Buy paints and related products online from top brands for homes, industries and waterproofing solutions.
                  </motion.p>
 
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-3 sm:mt-4 lg:mt-5 flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full max-w-[280px] sm:max-w-none mx-auto lg:mx-0"
                  >
                    <Link to="/buy-paint-online" className="bg-[#C6A87C] text-white px-3 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3 xl:px-8 xl:py-3.5 rounded-full text-[9px] sm:text-[10px] lg:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap gap-1.5 sm:gap-2 hover:bg-[#b09265] transition-all duration-300 shadow-lg flex-1">
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 shrink-0" /> <span className="truncate">Shop Paint</span>
                    </Link>
                    <Link to="/visualizer" className="bg-white text-[#C6A87C] px-3 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3 xl:px-8 xl:py-3.5 rounded-full text-[9px] sm:text-[10px] lg:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap gap-1.5 sm:gap-2 transition-colors duration-300 shadow-lg flex-1" style={{backgroundColor: 'white', color: '#C6A87C'}}>
                      <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 shrink-0" /> <span className="truncate">Visualise</span>
                    </Link>
                  </motion.div>
 
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="mt-4 sm:mt-5 grid grid-cols-4 gap-2 sm:gap-4 lg:flex lg:flex-row lg:flex-nowrap lg:items-start lg:justify-start lg:gap-8 w-full max-w-full"
                  >
                    <div className="flex flex-col items-center text-center">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#C6A87C] mb-1 sm:mb-2" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[8px] sm:text-[9px] lg:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">200+<br/>Products</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Palette className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#C6A87C] mb-1 sm:mb-2" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[8px] sm:text-[9px] lg:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">5000+<br/>Shades</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Truck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#C6A87C] mb-1 sm:mb-2" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[8px] sm:text-[9px] lg:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">Pan India<br/>Delivery</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Tag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#C6A87C] mb-1 sm:mb-2" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[8px] sm:text-[9px] lg:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">Best<br/>Pricing</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-4 sm:mt-5 w-full pt-3 sm:pt-4 border-t border-ivory/10 flex flex-col items-center lg:items-start shrink-0"
                  >
                    <p className="text-[8px] sm:text-[9px] lg:text-[10px] font-sans font-bold text-ivory/60 uppercase tracking-[0.15em] mb-3 sm:mb-4">
                      Authorised dealers for
                    </p>
                    <div className="w-full max-w-[280px] sm:max-w-[360px] lg:max-w-lg overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                      <motion.div 
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                        className="flex items-center w-max gap-6 sm:gap-10 lg:gap-12 pr-6 sm:pr-10 lg:pr-12"
                      >
                        {[...heroBrands, ...heroBrands].map((brand, idx) => brand && (
                          <div key={idx} className="h-5 sm:h-6 lg:h-8 flex-shrink-0 flex items-center justify-center hover:scale-110 transition-all duration-300">
                             {brand.name === 'Berger Paints' ? (
                               <div className="bg-white/95 px-2 py-1 rounded h-full flex items-center justify-center">
                                 <img src={brand.logo} alt={brand.name} loading="lazy" decoding="async" className="max-h-full w-auto object-contain" />
                               </div>
                             ) : (
                               <img src={brand.logo} alt={brand.name} loading="lazy" decoding="async" className="max-h-full w-auto object-contain" />
                             )}
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
          style={{ clipPath }}
          className="absolute top-0 left-0 w-full h-full overflow-hidden bg-ivory shadow-[0_-20px_50px_rgba(0,0,0,0.5)] z-20"
        >
          {/* Inner content must be full height so it doesn't get squished */}
          <div className="h-full w-full flex flex-col justify-center items-center px-4 sm:px-8 bg-ivory pb-4 sm:pb-6 pt-[80px] sm:pt-[95px] lg:pt-[105px] xl:pt-[115px]">
             
             <div className="max-w-[1400px] w-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center content-center h-full overflow-y-auto no-scrollbar py-2 lg:py-4">
                
                {/* Left Side: Trust & Stats */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left my-auto">
                   <div className="overflow-hidden w-full flex justify-center lg:justify-start mb-2 sm:mb-4">
                     <motion.h2 style={{ y: y1 }} className="text-3xl sm:text-4xl md:text-5xl xl:text-5xl 2xl:text-6xl font-serif font-bold text-royale-bg leading-[1.1] tracking-tight">
                       20+ Years <br className="hidden lg:block" />
                       <span className="italic font-light text-gold">Of Trust</span>
                     </motion.h2>
                   </div>

                   <div className="overflow-hidden w-full flex justify-center lg:justify-start mb-3 sm:mb-4 px-4 lg:px-0">
                     <motion.p style={{ y: y2 }} className="text-royale-bg/70 font-sans text-[11px] sm:text-xs md:text-sm lg:text-base leading-relaxed max-w-sm lg:max-w-md">
                       Established in 2001, Rainbow Paint & Hardwares has been Coimbatore's trusted paint store, offering top brands and complete painting solutions for homes and industries.
                     </motion.p>
                   </div>

                   {/* Features */}
                   <div className="overflow-hidden w-full flex justify-center lg:justify-start pb-1.5">
                     <motion.div style={{ y: y3 }} className="grid grid-cols-4 gap-2 sm:gap-4 lg:flex lg:flex-row lg:flex-nowrap lg:items-start lg:justify-start lg:gap-6 xl:gap-8 w-full max-w-full">
                     {[
                       { icon: Store, title: "3\nBranches" },
                       { icon: Award, title: "10+\nTop Brands" },
                       { icon: MessageCircle, title: "Expert\nAdvice" },
                       { icon: ShieldCheck, title: "Reliable\nService" }
                     ].map((feat, idx) => (
                       <div key={idx} className="flex flex-col items-center text-center">
                          <feat.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gold mb-1 sm:mb-2" strokeWidth={1.5} />
                          <span className="text-royale-bg text-[8px] sm:text-[9px] lg:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight whitespace-pre-line">{feat.title}</span>
                       </div>
                     ))}
                     </motion.div>
                   </div>

                   {/* Get Quote Banner */}
                   <div className="overflow-hidden w-full max-w-[280px] sm:max-w-md mt-3 sm:mt-4 pb-1.5 mx-auto lg:mx-0">
                     <motion.div style={{ y: y4 }} className="w-full">
                       <div className="bg-royale-bg/5 border border-royale-bg/10 rounded-2xl p-3 sm:p-4 flex flex-row items-center justify-between hover:bg-royale-bg/10 transition-colors shadow-sm">
                        <div className="flex flex-col text-left">
                           <span className="text-royale-bg font-serif font-bold text-[11px] sm:text-sm lg:text-base">Bulk or B2B Requirement?</span>
                           <span className="text-royale-bg/70 font-sans text-[8px] sm:text-[9px] md:text-xs">Get wholesale pricing for your project</span>
                        </div>
                        <a href="https://wa.me/918072442930?text=Hello%2C%20I%20have%20a%20bulk%2FB2B%20requirement%20for%20my%20project%20and%20would%20like%20to%20get%20a%20quote." target="_blank" rel="noopener noreferrer" className="shrink-0 bg-gold text-ivory px-2 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-2.5 rounded-full text-[8px] sm:text-[9px] md:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1 sm:gap-1.5 hover:bg-[#b09265] transition-colors shadow-lg ml-2">
                           <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4" /> Get Quote
                        </a>
                     </div>
                     </motion.div>
                   </div>
                </div>

                {/* Right Side: Authorised Brands Grid */}
                <div className="overflow-hidden w-full max-w-sm sm:max-w-xl mx-auto lg:ml-auto pb-4 my-auto">
                  <motion.div style={{ y: y3 }} className="flex flex-col bg-royale-bg/5 rounded-2xl md:rounded-[2rem] p-4 sm:p-5 md:p-6 lg:p-8 border border-royale-bg/10 w-full">
                     <h3 className="text-[8px] sm:text-[9px] md:text-[11px] font-sans font-bold text-gold uppercase tracking-[0.2em] mb-3 sm:mb-4 md:mb-5 text-center">
                     Authorised Dealers For
                   </h3>
                   <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center justify-items-center">
                     {heroBrands.slice(0, 6).map((brand, idx) => brand && (
                       <div key={idx} className="h-4 sm:h-5 md:h-8 lg:h-12 w-full flex items-center justify-center hover:scale-110 transition-all duration-300">
                         {brand.name === 'Berger Paints' ? (
                           <div className="bg-white/95 px-2 py-1 rounded h-full w-full flex items-center justify-center">
                             <img src={brand.logo} alt={brand.name} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                           </div>
                         ) : (
                           <img src={brand.logo} alt={brand.name} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                         )}
                       </div>
                     ))}
                   </div>
                  </motion.div>
                </div>

             </div>
          </div>
        </motion.div>

        {/* ================= ROLLER (OUTSIDE OF OVERFLOW HIDDEN) ================= */}
        <motion.div 
          style={{ y: paintY, top: 0 }}
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

