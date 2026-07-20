import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800); // 2.8 seconds loader
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-royale-bg flex flex-col items-center justify-center pointer-events-none overflow-hidden"
        >
          {/* Background Ambient Glows (Paint Vibes) */}
          <motion.div 
            className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] sm:w-[35vw] sm:h-[35vw] rounded-full bg-gold/10 blur-[80px]"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-[40%] left-[60%] -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] sm:w-[25vw] sm:h-[25vw] rounded-full bg-teal-500/5 blur-[70px]"
            animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          />
          <motion.div 
            className="absolute top-[60%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] sm:w-[30vw] sm:h-[30vw] rounded-full bg-rose-500/5 blur-[70px]"
            animate={{ scale: [1, 1.3, 1], rotate: [-90, 0, -90] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-8 relative z-10"
          >
            {/* Mascot and Rings container */}
            <div className="relative flex items-center justify-center w-40 h-40">
              
              {/* Spinning / Pulsing Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-gold/30"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.8, 2.5],
                    opacity: [0.8, 0.2, 0],
                    rotate: [0, 90, 180]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeOut"
                  }}
                  style={{
                    borderStyle: i % 2 === 0 ? 'solid' : 'dashed',
                    borderWidth: i === 1 ? '2px' : '1px'
                  }}
                />
              ))}

              <motion.div
                 className="relative z-10 w-28 h-28 bg-white/5 rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 shadow-[0_0_40px_rgba(198,168,124,0.15)] overflow-hidden"
                 animate={{
                   y: [-6, 6, -6],
                   rotate: [-2, 2, -2]
                 }}
                 transition={{
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
              >
                {/* A subtle sweep effect across the circle */}
                <motion.div 
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 z-0"
                  animate={{ translateX: ['-150%', '150%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1.5 }}
                />
                
                <img 
                  src="/mascot.webp" 
                  alt="Loading Mascot" 
                  className="w-20 h-20 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)] relative z-10"
                />
              </motion.div>
            </div>
            
            {/* Loading text with shimmer effect */}
            <div className="flex flex-col items-center gap-4 mt-2">
              <motion.div
                 className="text-gold font-display tracking-[0.3em] text-[10px] sm:text-xs font-semibold uppercase relative overflow-hidden px-4 py-1"
              >
                <motion.span 
                  className="block opacity-90"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Curating Colors
                </motion.span>
                <motion.div 
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                  animate={{ translateX: ['-150%', '150%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                />
              </motion.div>

              {/* Elegant Progress line */}
              <div className="w-40 h-[2px] bg-gold/10 rounded-full overflow-hidden relative">
                <motion.div
                  className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-gold/50 via-gold to-gold/80 rounded-full shadow-[0_0_10px_rgba(198,168,124,0.5)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: 2.5, 
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
