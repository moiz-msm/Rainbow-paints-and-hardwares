import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Mail, ArrowRight, Check, Loader2, MapPin, Phone, Instagram, Facebook, Youtube } from 'lucide-react';

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
      className="glass-header py-12 border-t border-royale-accent mt-auto z-40 relative bg-royale-bg"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="flex flex-col items-start">
            <Link to="/" title="Home" aria-label="Home" className="flex flex-col items-start group transition-all mb-6">
              <span className="font-serif font-medium tracking-[0.2em] leading-none text-ivory text-xl">RAINBOW</span>
              <span className="text-[7px] uppercase tracking-[0.35em] text-gold/60 font-medium mt-1.5">PAINT AND HARDWARES</span>
            </Link>
            <p className="text-ivory/60 text-xs font-light leading-relaxed mb-6">
              Your trusted partner for premium paints, hardware, and expert color advice in Coimbatore since 2001.
            </p>
            
            <div className="w-full mb-6">
              <form onSubmit={subscribe} className="w-full flex items-center relative group">
                <input 
                  type="email" 
                  placeholder="Your email address..." 
                  className="w-full bg-black/20 border border-gold/20 focus:border-gold/50 rounded-md py-2.5 pl-4 pr-10 text-xs text-ivory placeholder-ivory/40 focus:outline-none transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                  required
                />
                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className="absolute right-1 p-1.5 text-gold/70 hover:text-gold transition-colors disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : status === 'success' ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </form>
              {status === 'success' && <p className="text-[10px] text-emerald-400 mt-1.5 animate-fade-in">Successfully subscribed.</p>}
              {status === 'error' && <p className="text-[10px] text-red-400 mt-1.5 animate-fade-in">Something went wrong.</p>}
            </div>

            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/rainbow_paint_and_hardwares?igsh=MXRyMnVvZXphazUwNQ==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-ivory/60 hover:text-gold hover:bg-gold/10 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/share/1EGQ9xt3Vc/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-ivory/60 hover:text-gold hover:bg-gold/10 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com/@rainbowpaintandhardwares?si=ImhanMDkFyzwP-rWg" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-ivory/60 hover:text-gold hover:bg-gold/10 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://share.google/MeOr82lMOuvdTC2Ox" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-ivory/60 hover:text-gold hover:bg-gold/10 transition-all">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-gold font-display font-medium tracking-[0.15em] text-xs uppercase mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>About Us</Link></li>
              <li><Link to="/buy-paint-online" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>Products</Link></li>
              <li><Link to="/visualizer" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>Colors & Visualizer</Link></li>
              <li><Link to="/calculator" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>Estimator</Link></li>
              <li><Link to="/compare-paints" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>Compare Paints</Link></li>
              <li><Link to="/blog" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>Blog & Guides</Link></li>
              <li><Link to="/faqs" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold font-display font-medium tracking-[0.15em] text-xs uppercase mb-6">Support & Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/my-orders" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>My Orders</Link></li>
              <li><Link to="/shipping-policy" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>Shipping Policy</Link></li>
              <li><Link to="/refund-policy" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>Refund Policy</Link></li>
              <li><Link to="/privacy" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gold/30"></span>Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold font-display font-medium tracking-[0.15em] text-xs uppercase mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold/70 shrink-0 mt-0.5" />
                <span className="text-sm font-light text-ivory/70 leading-relaxed">
                  54 Cox Street, Kattoor,
                  <br />Coimbatore - 641009
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold/70 shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+918072442930" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors">+91 80724 42930</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold/70 shrink-0" />
                <a href="mailto:rainbow_paint@hotmail.com" className="text-sm font-light text-ivory/70 hover:text-gold transition-colors break-all">rainbow_paint@hotmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 mt-6 border-t border-gold/5">
          <p className="text-gold/40 text-[10px] font-display tracking-[0.1em] uppercase text-center md:text-left">
            © {new Date().getFullYear()} Rainbow Paints & Hardwares. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
