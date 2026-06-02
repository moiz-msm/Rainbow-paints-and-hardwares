import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Palette, 
  Calculator, 
  Truck, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Layers,
  ShoppingCart
} from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

interface Slide {
  id: number;
  title: string;
  subtext: string;
  badge: string;
  actionType: 'modal' | 'route' | 'route-scroll' | 'cart-toggle';
  target: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "🚀 Fast local deliveries in Coimbatore 🚚",
    subtext: "",
    badge: "",
    actionType: 'route-scroll',
    target: '/buy-paint-online',
  },
  {
    id: 2,
    title: "📍 Coimbatore paint store now delivering online",
    subtext: "",
    badge: "",
    actionType: 'modal',
    target: 'buying-guide',
  },
  {
    id: 3,
    title: "🎨 Visualise → Compare → Calculate → Buy",
    subtext: "",
    badge: "",
    actionType: 'modal',
    target: 'buying-guide',
  }
];

export default function AnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toggleCart } = useCartStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Touch/Swipe state
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!isPaused && !isModalOpen) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 4500); // Auto-rotation every 4.5 seconds
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, isModalOpen]);

  useEffect(() => {
    const handleOpenSmartGuide = () => setIsModalOpen(true);
    window.addEventListener('open-smart-guide', handleOpenSmartGuide);
    return () => window.removeEventListener('open-smart-guide', handleOpenSmartGuide);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // Swiped left
      handleNext();
    } else if (diff < -50) {
      // Swiped right
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleBannerClick = () => {
    const slide = slides[currentIndex];
    if (slide.actionType === 'modal') {
      setIsModalOpen(true);
    } else if (slide.actionType === 'route') {
      navigate(slide.target);
    } else if (slide.actionType === 'cart-toggle') {
      toggleCart();
    } else if (slide.actionType === 'route-scroll') {
      navigate(slide.target);
      // Wait for navigation to complete, then scroll smoothly to the delivery estimator
      setTimeout(() => {
        const el = document.getElementById('sleek-delivery-estimator');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  };

  return (
    <>
      <div 
        id="announcement-banner-system"
        className="w-full bg-gold py-1 sm:py-2 px-4 border-b border-[#0f1d3a]/10 select-none relative overflow-hidden flex items-center justify-center z-[90]"
        style={{ height: 'auto', minHeight: '38px' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Subtle Luxury Pattern Background Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-[1400px] w-full flex items-center justify-between gap-4 h-full relative z-10">
          
          {/* Left Arrow (Desktop Only) */}
          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="hidden md:flex p-1 text-[#0f1d3a]/60 hover:text-[#0f1d3a] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            title="Previous tip"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Core Banner Text */}
          <div 
            onClick={handleBannerClick}
            className="flex-1 flex items-center justify-center text-center cursor-pointer group min-w-0"
          >
            <span className="text-[11px] sm:text-sm font-sans font-semibold tracking-wide text-white group-hover:text-white/90 truncate transition-colors duration-300 px-1">
              {slides[currentIndex].title}
            </span>
          </div>

          {/* Right Arrow + Dots */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Dots */}
            <div className="flex items-center gap-1">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                  className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-3 bg-white' : 'w-1 bg-white/40'}`}
                />
              ))}
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="p-1 text-[#0f1d3a]/60 hover:text-[#0f1d3a] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
              title="Next tip"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simple slide dots layout for mobile */}
          <div className="md:hidden flex items-center justify-center shrink-0">
            <div className="flex items-center gap-1">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-2.5 bg-white' : 'w-1 bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Buying Guide Modal Backdrop & Panel */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            key="smart-guide-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          >
            {/* Semi-transparent dark overlay */}
            <div
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            />

            {/* Smart Guide Modal Content */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-royale-bg border border-gold/20 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col text-[#0B1021] max-h-[90vh]"
            >
              <div className="absolute top-0 right-0 p-4 z-10">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-full bg-royale-surface hover:bg-royale-accent transition-colors border border-gold/10 text-[#0B1021]/60 hover:text-[#0B1021] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gold/10 border border-gold/20 mb-3 text-gold">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif font-medium tracking-wide uppercase text-[#0B1021]">
                    Smart Paint Buying <span className="text-gradient">Guide</span>
                  </h3>
                  <p className="text-xs text-[#0B1021]/70 max-w-md mx-auto mt-1">
                    Home painting can feel complex. That is why we built four smart digital tools to guide you every step of the way with absolute clarity and guarantee.
                  </p>
                </div>

                {/* Steps Timeline Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Step 1 */}
                  <div className="p-4 bg-royale-surface border border-gold/10 rounded-2xl flex gap-3.5 transition-all hover:border-gold/30">
                    <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 border border-purple-500/20">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-purple-600 font-display block mb-0.5">Step 1 — Shade</span>
                      <h4 className="text-xs font-bold text-[#0B1021]">Choose Your Shade</h4>
                      <p className="text-[11px] text-[#0B1021]/70 leading-relaxed mt-1">
                        Use our Interactive Color Visualizer to see colors rendered real-time on sample rooms or your own project walls.
                      </p>
                      <button 
                        onClick={() => { setIsModalOpen(false); navigate('/visualizer'); }}
                        className="text-[10px] font-bold text-gold inline-flex items-center gap-1 hover:gap-2 transition-all mt-2 cursor-pointer"
                      >
                        Try Visualizer <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 bg-royale-surface border border-gold/10 rounded-2xl flex gap-3.5 transition-all hover:border-gold/30">
                    <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 font-display block mb-0.5">Step 2 — Compare</span>
                      <h4 className="text-xs font-bold text-[#0B1021]">Compare Paints</h4>
                      <p className="text-[11px] text-[#0B1021]/70 leading-relaxed mt-1">
                        Look through leading brands (Asian Paints, Berger, MRF) and compare finish, washability, coverage & budget.
                      </p>
                      <button 
                        onClick={() => { setIsModalOpen(false); navigate('/buy-paint-online'); }}
                        className="text-[10px] font-bold text-gold inline-flex items-center gap-1 hover:gap-2 transition-all mt-2 cursor-pointer"
                      >
                        Compare Paints <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 bg-royale-surface border border-gold/10 rounded-2xl flex gap-3.5 transition-all hover:border-gold/30">
                    <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 font-display block mb-0.5">Step 3 — Quantity</span>
                      <h4 className="text-xs font-bold text-[#0B1021]">Estimate Material Needed</h4>
                      <p className="text-[11px] text-[#0B1021]/70 leading-relaxed mt-1">
                        Our Paint cost estimator calculates precisely how many litres are needed for your square-footage to eliminate waste and save money.
                      </p>
                      <button 
                        onClick={() => { setIsModalOpen(false); navigate('/calculator'); }}
                        className="text-[10px] font-bold text-gold inline-flex items-center gap-1 hover:gap-2 transition-all mt-2 cursor-pointer"
                      >
                        Estimate Quantity <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 bg-royale-surface border border-gold/10 rounded-2xl flex gap-3.5 transition-all hover:border-gold/30">
                    <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600 font-display block mb-0.5">Step 4 — Delivery</span>
                      <h4 className="text-xs font-bold text-[#0B1021]">Check Delivery ETA</h4>
                      <p className="text-[11px] text-[#0B1021]/70 leading-relaxed mt-1">
                        Check your address on checkout or using local delivery tools. We determine service eligibility and dispatch instantly.
                      </p>
                      <button 
                        onClick={() => {
                          setIsModalOpen(false);
                          navigate('/buy-paint-online');
                          setTimeout(() => {
                            const el = document.getElementById('sleek-delivery-estimator');
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }, 500);
                        }}
                        className="text-[10px] font-bold text-gold inline-flex items-center gap-1 hover:gap-2 transition-all mt-2 cursor-pointer"
                      >
                        Check ETA Now <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="p-4 bg-royale-surface border border-gold/10 rounded-2xl flex gap-3.5 transition-all hover:border-gold/30 md:col-span-2">
                    <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 border border-teal-500/20">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-teal-600 font-display block mb-0.5">Step 5 — Checkout</span>
                      <h4 className="text-xs font-bold text-[#0B1021]">Secure Checkout & Quick Fulfilment</h4>
                      <p className="text-[11px] text-[#0B1021]/70 leading-relaxed mt-1 hidden sm:block">
                        Add chosen paints to your cart, fill in delivery details, and checkout securely. Authorised local dealers dispatch original stock instantly.
                      </p>
                      <p className="text-[11px] text-[#0B1021]/70 leading-relaxed mt-1 sm:hidden">
                        Add to cart, fill in delivery address, and checkout securely. Local authorised dealers dispatch original paints immediately.
                      </p>
                      <button 
                        onClick={() => { setIsModalOpen(false); toggleCart(); }}
                        className="text-[10px] font-bold text-gold inline-flex items-center gap-1 hover:gap-2 transition-all mt-2 cursor-pointer"
                      >
                        Open Shopping Cart <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trust Badging Footer inside Modal */}
                <div className="mt-8 pt-6 border-t border-gold/10 flex flex-wrap items-center justify-center gap-4 text-center">
                  <div className="flex items-center gap-1 text-[10px] text-[#0B1021]/60 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-gold" />
                    100% Genuine Authorized Stock
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#0B1021]/60 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-gold" />
                    Free Paint Expert Consultation
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-[#0B1021]/60 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-gold" />
                    Secure Local Payments
                  </div>
                </div>
              </div>

              {/* Bottom Sticky CTA bar */}
              <div className="p-4 bg-royale-surface border-t border-gold/10 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[10px] font-light text-[#0B1021]/80">
                  Ready to transform your home with absolute confidence?
                </span>
                <button
                  onClick={() => { setIsModalOpen(false); navigate('/buy-paint-online'); }}
                  className="bg-gradient-to-r from-gold to-[#D4B572] hover:from-[#D4B572] hover:to-gold text-white px-5 py-2 rounded-full text-xs font-semibold shadow-md active:scale-95 transition-all text-center w-full sm:w-auto tracking-wide cursor-pointer"
                >
                  Start Shopping Step by Step
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
