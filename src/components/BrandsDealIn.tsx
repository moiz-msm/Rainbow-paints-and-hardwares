import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { brandDetails } from '../data';

export default function BrandsDealIn() {
  return (
    <section id="brands" className="py-12 sm:py-20 lg:py-24 border-t border-gold/10 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-4 flex flex-col items-center text-center">
          <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 uppercase tracking-tight leading-tight text-center">
            Featured <span className="text-gradient italic">Brands</span>
          </h2>
          <p className="text-[10px] sm:text-xs text-gold max-w-xl mx-auto font-sans font-light leading-relaxed">
            Authorised Dealers and Distributors
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {brandDetails.map((brand, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx} 
              className="group p-4 sm:p-6 bg-white/[0.02] border border-zinc-200 rounded-xl hover-gold-glow relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {brand.logo && (
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`} 
                      loading="lazy"
                      className="h-8 w-8 sm:h-10 sm:w-10 object-contain bg-white rounded-md p-1 shrink-0" 
                    />
                  )}
                  <h3 className="text-lg sm:text-xl font-serif font-medium text-ivory uppercase tracking-wider group-hover:text-gold transition-colors duration-500">
                    {brand.name === "MRF Vapocure" ? "MRF Paints" : brand.name}
                  </h3>
                </div>
                {brand.isAuthorised && (
                  <span className="px-2 py-1 border border-gold/40 rounded text-[8px] font-display font-bold text-gold tracking-widest uppercase">
                    Authorised
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[10px] sm:text-xs text-gold font-sans font-light leading-relaxed mb-3 min-h-[36px]">
                {brand.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {brand.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="px-2 py-0.5 bg-white shadow-sm border border-zinc-200 rounded text-[8px] font-display text-ivory/40 uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer Link */}
              <Link 
                to={`/buy-paint-online?brand=${encodeURIComponent(brand.name)}`}
                className="flex items-center text-gold/60 text-[9px] font-display font-bold uppercase tracking-widest group-hover:text-gold transition-colors duration-500"
              >
                View Products <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>

              {/* Subtle background flair */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-gold/10 transition-colors duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
