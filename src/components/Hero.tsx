import React, { useRef, useEffect } from 'react';
import { motion, animate, useInView } from 'framer-motion';
import { ArrowRight, PackageOpen, Truck, Tags, Shield, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { brandDetails } from '../data';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[calc(100vh-102px)] sm:min-h-[calc(100vh-126px)] lg:min-h-[calc(100vh-142px)] md:max-h-[820px] lg:max-h-[820px] xl:max-h-[920px] flex flex-col justify-center mt-[64px] sm:mt-[88px] lg:mt-[104px] pb-6 sm:pb-8 md:pb-6 overflow-hidden">
      {/* Full-Screen Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden select-none pointer-events-none">
        <img 
          src="/file_000000005e50720b94b0455c9713cca4.webp" 
          alt="Premium Paint Shop Background" 
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col gap-6 sm:gap-8 md:gap-4 xl:gap-8 flex-1 justify-center">
        
        {/* Top Section: Full Width Hero Content */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-6 xl:gap-10 relative w-full md:min-h-0 md:flex-1">
          
          {/* Left Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-[70%] lg:w-[60%] flex flex-col gap-4 sm:gap-5 md:gap-3 xl:gap-5 items-start text-left z-20 relative pt-2 md:pt-0"
          >
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 lg:px-4 py-1 md:py-1.5 bg-gradient-to-r from-gold/15 to-transparent rounded-full border border-gold/30">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold" strokeWidth={2} />
              <span className="text-[9px] sm:text-[10px] font-display font-bold text-gold tracking-[0.2em] uppercase">
                Est. 2001 • 20+ Years of Trust
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[2.25rem] leading-[1.15] sm:text-5xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[4.25rem] md:leading-[1.1] font-serif font-medium text-ivory tracking-tight">
              Skip the trip <br className="hidden md:block" />
              <span className="italic font-light text-gold">we deliver.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[11px] sm:text-sm md:text-xs xl:text-sm 2xl:text-base text-ivory/80 font-sans max-w-md leading-relaxed pr-4 mt-0 md:mt-1 xl:mt-2">
              Buy paints and related products online from top brands for homes, industries and waterproofing solutions from authorised dealers
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-2 xl:gap-4 mt-0 sm:mt-1 md:mt-2 w-full">
              <Link 
                to="/buy-paint-online" 
                className="bg-ivory text-white px-4 py-2.5 sm:px-8 sm:py-3 md:px-5 md:py-2.5 xl:px-8 xl:py-4 rounded-full text-[10px] sm:text-xs md:text-[10px] xl:text-xs font-display font-bold flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:bg-ivory/90 hover:scale-105 active:scale-95 shadow-[0_8px_20px_-6px_rgba(26,54,93,0.3)] tracking-[0.15em] uppercase group"
              >
                Shop Paints 
                <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/visualizer" 
                className="bg-transparent border border-ivory/20 text-ivory px-4 py-2.5 sm:px-8 sm:py-3 md:px-5 md:py-2.5 xl:px-8 xl:py-4 rounded-full text-[10px] sm:text-xs md:text-[10px] xl:text-xs font-display font-bold flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:bg-ivory/5 hover:border-ivory/40 hover:scale-105 active:scale-95 tracking-[0.15em] uppercase group"
              >
                Visualize Colours 
                <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4 group-hover:animate-pulse text-current" />
              </Link>
            </div>

            {/* Trusted Brands */}
            <div className="mt-1 md:mt-4 xl:mt-6 w-full border-t border-ivory/15 pt-2 md:pt-3 xl:pt-6">
              <p className="text-[9px] sm:text-[11px] font-display font-medium text-ivory/60 uppercase tracking-widest mb-1 md:mb-2 xl:mb-4">
                Authorised dealers for
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-4 xl:gap-8">
                {brandDetails.slice(0, 5).map((brand, idx) => (
                  <div key={idx} className="h-5 sm:h-6 md:h-6 xl:h-8 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-500 cursor-help" title={brand.name}>
                    {brand.logo ? (
                      <img src={brand.logo} alt={brand.name} className="h-full w-auto object-contain max-w-[60px] sm:max-w-[70px] md:max-w-[60px] xl:max-w-[80px]" />
                    ) : (
                      <span className="font-serif text-xs sm:text-sm md:text-xs xl:text-sm font-bold text-ivory">{brand.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Value Propositions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative z-30 mt-2 lg:mt-0 xl:mt-4 bg-white/85 backdrop-blur-xl border border-ivory/10 rounded-2xl sm:rounded-full p-3 sm:p-4 lg:p-3 xl:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-2 lg:gap-0 md:divide-x divide-ivory/10">
            {[
              { icon: Truck, title: "Free Delivery", desc: "On orders above ₹4999 within 10 km" },
              { icon: Tags, title: "Best Prices", desc: "Direct from authorised dealers. No middlemen." },
              { icon: PackageOpen, title: "Expert Consultation", desc: "Get professional advice for your perfect finish." },
              { icon: Shield, title: "100% Authentic", desc: "Original products from trusted brands." }
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex items-start md:items-center lg:items-start gap-2 sm:gap-3 lg:gap-2 xl:gap-4 px-2 md:px-3 lg:px-4 xl:px-6 group">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full border border-gold/20 flex flex-shrink-0 items-center justify-center bg-gold/5 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-gold" strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col pt-0.5 md:pt-0 lg:pt-0.5">
                    <h4 className="text-[9px] sm:text-[12px] md:text-[9px] lg:text-[10px] xl:text-[13px] font-display font-bold text-ivory uppercase tracking-widest leading-tight">
                      {feature.title}
                    </h4>
                    <p className="text-[8px] sm:text-[11px] md:text-[8px] lg:text-[9px] xl:text-[11px] text-ivory/60 font-sans mt-0.5 lg:mt-1 leading-snug md:pr-1 lg:pr-2">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

