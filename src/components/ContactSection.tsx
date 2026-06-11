import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <section id="contact" className="py-6 sm:py-8 relative bg-royale-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-6">
              <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 sm:mb-4 uppercase tracking-tight text-center lg:text-left">Visit Our <span className="text-gradient italic">Store</span></h2>
              <p className="text-gold text-[10px] sm:text-xs font-light italic text-center lg:text-left">Step into our premium showroom to feel the textures, visualize colors, and get expert consultation for your next big project.</p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {[
                { icon: MapPin, title: "Store Location", content: <a href="https://maps.app.goo.gl/hYrT1Cedf5yVoyEf7" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors block">Rainbow Paints and Hardwares<br/>54 Cox Street, Kattoor<br/>Coimbatore, 641009</a> },
                { icon: Phone, title: "Contact Details", content: <a href="tel:+918072442930" className="text-ivory hover:text-gold block transition-colors text-xs sm:text-sm font-medium tracking-tight">+91 80724 42930</a> },
                { icon: Mail, title: "Email Us", content: <a href="mailto:rainbow_paint@hotmail.com" className="text-gold hover:text-gold transition-colors font-light tracking-wide text-[9px] sm:text-[10px]">rainbow_paint@hotmail.com</a> },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3 sm:gap-4 items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full glass-panel flex flex-shrink-0 items-center justify-center text-gold shadow-lg shadow-gold/5">
                    <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[11px] sm:text-xs mb-0.5 sm:mb-1 text-ivory uppercase tracking-wide">{item.title}</h4>
                    <div className="text-gold leading-relaxed font-light text-[9px] sm:text-[10px]">{item.content}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              <a href="https://wa.me/918072442930?text=Hello%20Rainbow%20Paint%20and%20Hardwares" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#1ebe57] transition-all text-[10px] sm:text-xs font-display font-medium uppercase tracking-wider shadow-lg shadow-[#25D366]/20">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current mt-[-2px]" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
              <a href="tel:+918072442930" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ffffff] text-[#08115c] hover:bg-gray-100 transition-all text-[10px] sm:text-xs font-display font-medium uppercase tracking-wider shadow-lg">
                <Phone className="w-3.5 h-3.5 mt-[-2px]" />
                Call Now
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="glass-panel p-2 rounded-2xl sm:rounded-3xl overflow-hidden h-[300px] sm:h-full min-h-[300px] hover-gold-glow shadow-2xl">
              <img 
                src="/Store-front.webp" 
                alt="Rainbow Paints and Hardwares Store Front" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
