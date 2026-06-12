import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';

export default function AddedToCartBanner() {
  const { items, bannerOpen, lastAddedItem, closeBanner, toggleCart } = useCartStore();
  const navigate = useNavigate();

  // Calculate stats
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartPrice = items.reduce((acc, item) => acc + (item.unitPrice * item.size * item.quantity), 0);

  // If there's no item added or the banner is closed, don't show
  if (!lastAddedItem) return null;

  return (
    <AnimatePresence>
      {bannerOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="fixed bottom-0 left-0 right-0 z-[50] p-4 bg-zinc-950/95 border-t border-gold/30 shadow-[0_-15px_40px_rgba(0,0,0,0.6)] backdrop-blur-md pointer-events-auto"
          id="added-to-cart-banner"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Left side: Success badge & Added item summary */}
            <div className="flex items-center gap-3 w-full md:w-auto text-left">
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 font-sans block mb-0.5">
                  Added to Cart
                </span>
                <div className="text-zinc-100 text-sm font-semibold tracking-wide truncate">
                  {lastAddedItem.name}
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-600 mt-0.5">
                  <span>{lastAddedItem.brand}</span>
                  <span className="text-zinc-600">•</span>
                  <span>{lastAddedItem.size}L Pack</span>
                  {lastAddedItem.shade && (
                    <>
                      <span className="text-zinc-600">•</span>
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-2.5 h-2.5 rounded-full border border-zinc-700 shrink-0" 
                          style={{ backgroundColor: lastAddedItem.shade.hex }} 
                        />
                        <span className="text-zinc-200 text-[11px] font-medium font-mono">
                          {lastAddedItem.shade.name} ({lastAddedItem.shade.code})
                        </span>
                      </div>
                    </>
                  )}
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-200 font-medium">Qty: {lastAddedItem.quantity}</span>
                </div>
              </div>
            </div>

            {/* Middle: Cart Stats (items & price) */}
            <div className="flex items-center gap-6 py-2 px-4 bg-white/5 border border-white/10 rounded-xl w-full md:w-auto justify-around md:justify-start">
              <div className="text-left">
                <p className="text-[10px] text-zinc-600 uppercase tracking-wider font-semibold">Total Items</p>
                <p className="text-sm font-bold text-zinc-200">{totalItemsCount} {totalItemsCount === 1 ? 'Product' : 'Products'}</p>
              </div>
              <div className="w-[1px] h-8 bg-zinc-800" />
              <div className="text-left">
                <p className="text-[10px] text-gold uppercase tracking-wider font-semibold">Cart Total</p>
                <p className="text-base font-bold text-gold">₹{totalCartPrice.toLocaleString()}</p>
              </div>
            </div>

            {/* Right side: Action Buttons & dismiss */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                onClick={() => {
                  closeBanner();
                  toggleCart();
                }}
                className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer text-center"
              >
                View Cart
              </button>
              
              <button
                onClick={() => {
                  closeBanner();
                  navigate('/checkout');
                }}
                className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-gradient-gold hover:opacity-90 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-gold/10 hover:shadow-gold/20 flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                Checkout <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={closeBanner}
                className="hidden md:flex p-2 text-zinc-600 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 cursor-pointer"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Direct close button for mobile view positioned at top-right corner */}
          <button
            onClick={closeBanner}
            className="md:hidden absolute top-3 right-3 p-1.5 text-zinc-600 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-all duration-200"
            title="Dismiss ml"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
