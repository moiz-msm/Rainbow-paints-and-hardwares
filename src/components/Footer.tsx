import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-header py-4 border-t border-royale-accent mt-auto z-40 relative"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <Link to="/" title="Home" aria-label="Home" className="flex flex-col items-center md:items-start group transition-all">
            <span className="font-serif font-medium tracking-[0.2em] leading-none text-ivory text-base">RAINBOW</span>
            <span className="text-[6px] uppercase tracking-[0.4em] text-gold/60 font-medium mt-1">PAINT AND HARDWARES</span>
          </Link>

          <nav aria-label="Footer Navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/about" title="About Us" className="text-[9px] font-display font-semibold text-gold/80 hover:text-gold transition-colors tracking-[0.15em] uppercase">About Us</Link>
            <Link to="/buy-paint-online" title="Products" className="text-[9px] font-display font-semibold text-gold/80 hover:text-gold transition-colors tracking-[0.15em] uppercase">Products</Link>
            <Link to="/visualizer" title="Visualizer" className="text-[9px] font-display font-semibold text-gold/80 hover:text-gold transition-colors tracking-[0.15em] uppercase">Visualizer</Link>
            <Link to="/calculator" title="Paint Calculator" className="text-[9px] font-display font-semibold text-gold/80 hover:text-gold transition-colors tracking-[0.15em] uppercase">Estimator</Link>
            <Link to="/faqs" title="Frequently Asked Questions" className="text-[9px] font-display font-semibold text-gold/80 hover:text-gold transition-colors tracking-[0.15em] uppercase">FAQs</Link>
            <Link to="/my-orders" title="My Orders" className="text-[9px] font-display font-semibold text-gold/80 hover:text-gold transition-colors tracking-[0.15em] uppercase">My Orders</Link>
          </nav>
          
          <nav aria-label="Legal Navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2 md:mt-0">
             <Link to="/terms" title="Terms & Conditions" className="text-[8px] font-display text-gold/60 hover:text-gold/80 transition-colors tracking-[0.1em] uppercase">Terms & Conditions</Link>
             <Link to="/privacy" title="Privacy Policy" className="text-[8px] font-display text-gold/60 hover:text-gold/80 transition-colors tracking-[0.1em] uppercase">Privacy Policy</Link>
             <Link to="/refund-policy" title="Refund Policy" className="text-[8px] font-display text-gold/60 hover:text-gold/80 transition-colors tracking-[0.1em] uppercase">Refund Policy</Link>
             <Link to="/shipping-policy" title="Shipping Policy" className="text-[8px] font-display text-gold/60 hover:text-gold/80 transition-colors tracking-[0.1em] uppercase">Shipping Policy</Link>
          </nav>

          <p className="text-gold/40 text-[8px] font-display tracking-[0.2em] uppercase mt-2 md:mt-0">© {new Date().getFullYear()} RAINBOW</p>
          
        </div>
      </div>
    </motion.footer>
  );
}
