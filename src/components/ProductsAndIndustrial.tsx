import React from 'react';
import { ArrowRight } from 'lucide-react';
import WhatsappIcon from './WhatsappIcon';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categoryIcons = [
  { emoji: '🎨', name: 'Home Paint' },
  { emoji: '🏭', name: 'Industrial' },
  { emoji: '💧', name: 'Waterproofing' },
  { emoji: '🪵', name: 'Wood Finishes' },
  { emoji: '🛡️', name: 'Gates & Grills' },
];

export default function ProductsAndIndustrial() {
  return (
    <section className="py-8 sm:py-12 bg-royale-bg relative overflow-hidden" id="products-industrial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Products Section */}
          <Link to="/buy-paint-online" className="group block h-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="h-full relative rounded-2xl sm:rounded-[2rem] overflow-hidden border border-zinc-200 bg-royale-surface/80 p-6 sm:p-8 flex flex-col justify-between hover-gold-glow"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[40px] -mr-32 -mt-32 group-hover:bg-blue-600/10 transition-colors duration-700" />
              
              <div className="relative z-10 flex flex-col items-start text-left mb-8">
                <span className="text-gold font-display font-medium tracking-[0.4em] uppercase text-[8px] sm:text-[9px] mb-3 block">All products catalogue</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-ivory mb-4 uppercase tracking-tight leading-tight">
                  Explore India's <span className="text-gradient italic">Leading Brands</span>
                </h2>
                <p className="text-[11px] sm:text-xs mb-6 leading-relaxed font-sans font-light text-ivory/80 max-w-sm">
                  Explore our wide range of products from all of India's leading brands. From luxury interior finishes to heavy-duty industrial coatings, all in one elite catalog.
                </p>
                
                <div className="flex flex-wrap gap-3 items-center opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                  {categoryIcons.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 border border-zinc-200 px-2 py-1 rounded-md bg-white shadow-sm border border-zinc-200">
                      <span className="text-[10px] grayscale brightness-200">{item.emoji}</span>
                      <span className="text-[7.5px] uppercase font-display font-semibold tracking-[0.1em] text-ivory/60">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 flex justify-end">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#B8975A] flex items-center justify-center group-hover:scale-110 group-hover:-rotate-45 transition-all duration-700 shadow-xl shadow-[#B8975A]/20">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Industrial Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="h-full glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-gold/20 bg-royale-surface/40 overflow-hidden relative shadow-2xl flex flex-col justify-between hover-gold-glow"
          >
            {/* Subtle gradient glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/5 blur-[40px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-500/5 blur-[40px] rounded-full pointer-events-none" />

            <div className="relative z-10 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200 border border-black/20 text-ivory text-[8px] sm:text-[10px] font-medium uppercase tracking-[0.3em] mb-5">
                <span className="text-xs">🏭</span> Industrial Partners
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-serif font-medium mb-4 uppercase tracking-tight leading-tight text-ivory">
                Empowering <span className="text-gradient italic">Industries</span>
              </h2>
              
              <p className="text-ivory/70 font-sans font-light leading-relaxed text-[11px] sm:text-xs mb-6 max-w-sm">
                We continue to support and deliver specialized industrial coatings to all kinds of industries. Our robust, heavy-duty paints ensure lasting protection and peak performance for your infrastructure, backed by decades of technical expertise.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-white shadow-sm border border-zinc-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <h4 className="text-lg font-serif text-gold mb-1">20+</h4>
                  <p className="text-[8px] font-display uppercase tracking-wider text-ivory/80">years service</p>
                </div>
                <div className="bg-white shadow-sm border border-zinc-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <h4 className="text-lg font-serif text-gold mb-1">100+</h4>
                  <p className="text-[8px] font-display uppercase tracking-wider text-ivory/80">industries</p>
                </div>
                <div className="bg-white shadow-sm border border-zinc-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <h4 className="text-lg font-serif text-gold mb-1 text-[13px] sm:text-[15px]">On-Site</h4>
                  <p className="text-[8px] font-display uppercase tracking-wider text-ivory/80">consultation</p>
                </div>
                <div className="bg-white shadow-sm border border-zinc-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                  <h4 className="text-lg font-serif text-gold mb-1 text-[13px] sm:text-[15px]">On-Site</h4>
                  <p className="text-[8px] font-display uppercase tracking-wider text-ivory/80">delivery</p>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 flex gap-3 mt-auto">
              <a 
                href="https://wa.me/+918072442930?text=Hi%20Rainbow%20Paints!%20I%20would%20like%20to%20enquire%20about%20industrial%20coatings."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20b858] text-white py-2.5 px-4 rounded-xl font-display font-bold transition-all tracking-widest text-[9px] sm:text-[10px] uppercase shadow-lg shadow-[#25D366]/20 flex justify-center items-center gap-2 flex-1"
              >
                <WhatsappIcon className="w-4 h-4 ml-[-4px]" /> Whatsapp
              </a>
              <a 
                href="mailto:rainbow_paint@hotmail.com?subject=Industrial%20Coatings%20Enquiry"
                className="bg-transparent hover:bg-black/5 text-ivory border border-black/20 py-2.5 px-4 rounded-xl font-display font-medium transition-all tracking-widest text-[9px] sm:text-[10px] uppercase flex justify-center items-center gap-2 flex-1"
              >
                <span className="text-xs sm:text-sm">✉️</span> Email
              </a>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
