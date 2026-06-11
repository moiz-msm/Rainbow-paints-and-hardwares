import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, AlertCircle, LogIn } from 'lucide-react';
import { useWishlistStore, WishlistToast } from '../store/useWishlistStore';
import { useAuthStore } from '../store/useAuthStore';

const ToastItem = ({ toast }: { toast: WishlistToast }) => {
  const removeToast = useWishlistStore((state) => state.removeToast);
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 4500); // Give warning toast a slightly longer reading time
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  if (toast.isError) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
        className="bg-zinc-950/95 border border-red-500/30 hover:border-red-500/50 shadow-[0_10px_35px_-5px_rgba(239,68,68,0.2)] rounded-2xl p-4 sm:p-5 flex gap-3 sm:gap-4 items-start w-full max-w-sm sm:max-w-md pointer-events-auto backdrop-blur-md relative overflow-hidden group cursor-pointer"
        id={`wishlist-toast-${toast.id}`}
        onClick={() => {
          openAuthModal();
          removeToast(toast.id);
        }}
      >
        {/* Radiant red/orange accent border inside */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-red-500 via-orange-500 to-amber-500" />

        {/* Alarm/Lock Icon container with premium pulsing red aura */}
        <div className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 group-hover:scale-110 transition-transform duration-300">
          <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
          <div className="absolute inset-0 rounded-xl bg-red-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Info details */}
        <div className="flex-1 min-w-0 pr-6 text-left">
          <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 font-sans block mb-0.5">
            Sign In Required
          </span>
          <p className="text-zinc-105 text-zinc-100 text-[13px] sm:text-sm font-semibold tracking-wide">
            {toast.productName}
          </p>
          <p className="text-[11px] text-zinc-600 font-sans mt-1">
            {toast.message}
          </p>
          <div className="mt-2.5 flex items-center gap-1 text-[10px] text-gold font-display font-medium uppercase tracking-wider group-hover:underline">
            <LogIn className="w-3 h-3" /> Click to Sign In Now
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeToast(toast.id);
          }}
          className="absolute right-3 top-3 p-1 text-zinc-600 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer"
          title="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      className="bg-zinc-950/95 border border-gold/30 hover:border-gold/50 shadow-[0_10px_35px_-5px_rgba(212,181,114,0.15)] rounded-2xl p-4 sm:p-5 flex gap-3 sm:gap-4 items-start w-full max-w-sm sm:max-w-md pointer-events-auto backdrop-blur-md relative overflow-hidden group"
      id={`wishlist-toast-${toast.id}`}
    >
      {/* Radiant accent border inside */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-gold via-[#D4B572] to-amber-700" />

      {/* Heart Icon container with premium pulsing aura */}
      <div className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 group-hover:scale-110 transition-transform duration-300">
        <Heart className="w-5 h-5 text-red-500 fill-red-500/80 animate-pulse" />
        <div className="absolute inset-0 rounded-xl bg-red-500/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info details */}
      <div className="flex-1 min-w-0 pr-6 text-left">
        <span className="text-[10px] uppercase font-bold tracking-widest text-gold font-sans block mb-0.5">
          Added to Wishlist
        </span>
        <p className="text-zinc-100 text-[13px] sm:text-sm font-semibold tracking-wide truncate">
          {toast.productName}
        </p>
        
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1.5 text-[11px] text-zinc-600 font-sans">
          {toast.size !== undefined && (
            <span className="shrink-0 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-[10px] font-medium font-mono text-zinc-300">
              {toast.size}L Pack
            </span>
          )}
          {toast.shadeHex && (
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded">
              <div 
                className="w-2.5 h-2.5 rounded-full border border-zinc-700 shrink-0 shadow-inner" 
                style={{ backgroundColor: toast.shadeHex }} 
              />
              <span className="text-[10px] text-zinc-300 font-mono font-bold truncate max-w-[120px]">
                {toast.shadeName || 'White'} {toast.shadeCode && toast.shadeCode !== 'white' ? `(${toast.shadeCode})` : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => removeToast(toast.id)}
        className="absolute right-3 top-3 p-1 text-zinc-600 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 cursor-pointer"
        title="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default function WishlistToastContainer() {
  const toasts = useWishlistStore((state) => state.toasts);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-[90vw] sm:max-w-sm pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
}
