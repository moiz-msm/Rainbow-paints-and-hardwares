import React, { useState } from 'react';
import { Truck, RotateCcw, ShieldCheck, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PolicyHighlights() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-2 mt-4 w-full">
      {/* Dynamic Delivery Estimate */}
      <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3">
        <button 
          onClick={() => toggleExpand('shipping')}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-zinc-900">Fast Local Delivery</span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${expanded === 'shipping' ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expanded === 'shipping' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 text-[11px] text-zinc-500 leading-relaxed space-y-1">
                <p>• Dispatched within 24-48 hours via local authorized dealers.</p>
                <p>• Delivery restricted to currently serviceable areas.</p>
                <p>• Please refer to our <a href="/shipping" className="text-zinc-800 underline hover:text-indigo-600">Shipping Policy</a> for full details.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Refund Policy */}
      <div className="bg-zinc-50 border border-zinc-100 rounded-lg p-3">
        <button 
          onClick={() => toggleExpand('returns')}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-bold text-zinc-900">Returns & Cancellations</span>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform ${expanded === 'returns' ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {expanded === 'returns' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-2 text-[11px] text-zinc-500 leading-relaxed space-y-1">
                <p>• <strong>Tinted/custom colour paints are non-returnable</strong>.</p>
                <p>• Cancellations must be made within 4 hours of ordering.</p>
                <p>• Read our <a href="/refund" className="text-zinc-800 underline hover:text-indigo-600">Refund Policy</a>.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
