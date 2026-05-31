import React, { useEffect, useState, useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Bell, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminNotificationToast() {
  const { user, role } = useAuthStore();
  const [pendingOrdersCount, setPendingOrdersCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const prevCountRef = useRef(0);

  useEffect(() => {
    if (!user || !['owner', 'admin', 'staff'].includes(role || '')) return;
    
    const q = query(collection(db, 'orders'), where('status', '==', 'PROCESSING'));
    const unsub = onSnapshot(q, (snapshot) => {
      const currentSize = snapshot.size;
      
      if (currentSize > prevCountRef.current) {
        // New order arrived or existing orders pending on load
        setIsVisible(true);
      } else if (currentSize === 0) {
        setIsVisible(false); // Auto close
      }
      
      setPendingOrdersCount(currentSize);
      prevCountRef.current = currentSize;
    });

    return () => unsub();
  }, [user, role]);

  if (!user || !['owner', 'admin', 'staff'].includes(role || '')) {
    return null;
  }

  // Optionally, don't show the toast if we are already on the admin dashboard's orders tab
  if (location.pathname === '/admin') {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && pendingOrdersCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[60] pointer-events-auto"
        >
          <div className="bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl p-4 flex items-start gap-4 max-w-sm w-full relative overflow-hidden">
            {/* Ambient pulse effect for urgency */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-yellow-500 to-amber-500 animate-pulse" />
            
            <div className="w-10 h-10 bg-gold/10 text-gold rounded-full flex items-center justify-center shrink-0 mt-1">
              <Bell className="w-5 h-5 animate-bounce" />
            </div>
            
            <div className="flex-1 pr-6 pb-1">
              <p className="font-display font-bold text-sm text-white">New Order Alert</p>
              <p className="text-xs font-medium text-zinc-400 mt-1 leading-relaxed">
                You have {pendingOrdersCount} {pendingOrdersCount === 1 ? 'order' : 'orders'} pending processing.
              </p>
              <button 
                onClick={() => {
                  setIsVisible(false);
                  navigate('/admin');
                }}
                className="mt-3 text-[10px] font-bold uppercase tracking-wider text-black bg-gold hover:bg-yellow-500 px-4 py-2 rounded-lg transition-colors inline-block"
              >
                Review Now
              </button>
            </div>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-3 right-3 p-1.5 text-zinc-500 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
