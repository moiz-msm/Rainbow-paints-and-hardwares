import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export default function TopLoadingBar() {
  const [isNavigating, setIsNavigating] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Start navigation progress
    setIsNavigating(true);
    
    // Finish progress after route transition animations and suspense
    const timeout = setTimeout(() => {
      setIsNavigating(false);
    }, 600);

    return () => clearTimeout(timeout);
  }, [location.pathname, location.search]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 0.8, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
          exit={{ scaleX: 1, opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
          className="fixed top-0 left-0 right-0 h-1 bg-gold z-[9999] origin-left pointer-events-none"
          style={{ boxShadow: '0 0 10px rgba(184, 151, 90, 0.8)' }}
        />
      )}
    </AnimatePresence>
  );
}
