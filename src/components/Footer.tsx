import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Mail, ArrowRight, Check, Loader2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setStatus('loading');
    try {
      await addDoc(collection(db, 'newsletter_subscriptions'), {
        email,
        subscribedAt: serverTimestamp(),
      });

      // Notify Admin
      try {
        await fetch('/api/notify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: "New Newsletter Subscriber",
            message: `A new user has subscribed to the newsletter: ${email}`,
            type: "NEWSLETTER_OPT_IN",
            metadata: { email }
          })
        });
      } catch (notifyErr) {
        console.error("Failed to notify admin:", notifyErr);
      }

      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-header py-8 md:py-12 border-t border-royale-accent mt-auto z-40 relative bg-royale-bg"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-10">
          <h3 className="text-xl font-serif text-ivory mb-2">Join Our Newsletter</h3>
          <p className="text-sm text-ivory/60 font-light max-w-md mb-6">
            Subscribe exclusively for promotional updates, new arrival notifications, and special home painting discounts.
          </p>
          <form onSubmit={subscribe} className="w-full max-w-sm flex items-center relative group">
            <Mail className="w-4 h-4 text-ivory/40 absolute left-4 group-focus-within:text-gold transition-colors" />
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="w-full bg-black/20 border border-gold/20 focus:border-gold/50 rounded-full py-3 pl-11 pr-12 text-sm text-ivory placeholder-ivory/30 focus:outline-none transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              required
            />
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className="absolute right-1.5 p-2 bg-gold text-royale-bg rounded-full hover:bg-gold/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Subscribe"
            >
              {status === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : status === 'success' ? (
                <Check className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </button>
          </form>
          {status === 'success' && <p className="text-xs text-emerald-400 mt-3 animate-fade-in">Thank you! You've successfully subscribed.</p>}
          {status === 'error' && <p className="text-xs text-red-400 mt-3 animate-fade-in">Something went wrong. Please try again.</p>}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-gold/10">
          
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
