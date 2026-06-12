import React, { useState, useEffect } from 'react';
import { MapPin, Clock, AlertTriangle, RefreshCw, Crosshair, X, ChevronDown } from 'lucide-react';
import { useDeliveryStore } from '../store/useDeliveryStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function DeliveryEstimator() {
  const {
    pincode,
    locationName,
    loading,
    error,
    trackingStatus,
    estimation,
    deliveryDetails,
    trackUserLocation,
    updateLocationByPincode,
  } = useDeliveryStore();

  const [inputPincode, setInputPincode] = useState('');
  const [internalError, setInternalError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync input with store pincode if it changes externally
  useEffect(() => {
    if (pincode) setInputPincode(pincode);
  }, [pincode]);

  const handlePincodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalError('');
    const clean = inputPincode.replace(/\s+/g, '').trim();
    if (!/^\d{6}$/.test(clean)) {
      setInternalError('Please enter a valid 6-digit pincode');
      return;
    }

    const success = await updateLocationByPincode(clean);
    if (!success) {
      setInternalError('Sorry, we don\'t deliver to this location yet. 🙏');
    } else {
      setIsModalOpen(false); // Close on success
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="bg-white border border-zinc-200 rounded-xl p-2 sm:px-4 sm:py-3 shadow-sm flex items-center justify-between gap-3 sm:gap-5 text-xs sm:text-sm w-full md:w-auto hover:border-gold/30 hover:bg-gold/5 hover:shadow-md transition-all duration-300 ease-out text-left group"
        id="sleek-delivery-estimator"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-50 group-hover:bg-white flex items-center justify-center shrink-0 border border-zinc-100 group-hover:border-gold/20 transition-colors shadow-xs">
            <MapPin className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-zinc-600 group-hover:text-gold transition-colors" />
          </div>
          <div>
            <p className="text-[9px] sm:text-[10px] text-zinc-600 font-sans font-medium tracking-widest uppercase mb-0.5">Delivery location</p>
            <p className="text-[13px] sm:text-sm font-semibold text-zinc-900 group-hover:text-gold font-sans flex items-center gap-1 transition-colors">
              {pincode ? pincode : 'Check serviceability'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-zinc-100 group-hover:border-gold/20 transition-colors pl-4">
          {!loading && pincode && trackingStatus === 'serviceable' && (estimation || deliveryDetails) ? (
            <div className="flex items-center gap-1.5 text-emerald-600">
              <Clock className="w-4 h-4" />
              <span className="font-semibold">{estimation ? estimation.text.replace(/Estimated delivery:\s*(ETA:\s*)?/g, '') : (deliveryDetails?.eta || '24 hrs')}</span>
            </div>
          ) : !loading && pincode && trackingStatus === 'not-serviceable' ? (
            <div className="flex items-center gap-1.5 text-rose-500">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium whitespace-nowrap">Not Serviceable</span>
            </div>
          ) : loading ? (
             <div className="flex items-center gap-1.5 text-zinc-600">
               <RefreshCw className="w-4 h-4 animate-spin" />
               <span className="font-medium">Checking...</span>
             </div>
          ) : (
            <span className="text-ivory/60 font-medium whitespace-nowrap">Enter Pincode</span>
          )}
          <ChevronDown className="w-4 h-4 text-ivory/40 shrink-0" />
        </div>
      </button>

      {/* Modal Popup */}
      <AnimatePresence>
      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 text-left"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" 
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900">Delivery Time</h3>
                  <p className="text-sm text-zinc-600 mt-1">Please enter Pincode to check delivery time & serviceability</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 text-zinc-600 hover:text-zinc-600 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handlePincodeSubmit} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="6-digit PIN"
                      value={inputPincode}
                      onChange={(e) => {
                        setInputPincode(e.target.value.replace(/\D/g, ''));
                        setInternalError('');
                      }}
                      className={`w-full px-4 py-3 rounded-xl border font-medium outline-none transition-colors ${
                        internalError ? 'border-red-300 focus:border-red-500 bg-red-50/30' : 'border-zinc-200 focus:border-zinc-400 bg-white'
                      }`}
                      autoFocus
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || inputPincode.length < 6 || (inputPincode === pincode && trackingStatus !== 'idle')}
                    className="px-6 py-3 bg-[#2a8024] hover:bg-[#20691b] transition-colors text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    Apply
                  </button>
                </div>
                
                {/* Geolocation Button */}
                <div className="flex justify-start">
                   <button
                    type="button"
                    onClick={() => trackUserLocation(true)}
                    disabled={loading}
                    className="text-sm font-semibold flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors"
                   >
                     {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Crosshair className="w-4 h-4" />}
                     Use my current location
                   </button>
                </div>

                {/* Error State */}
                {(internalError || error) && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 mt-2">
                    <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-red-500">
                      {internalError || error}
                    </p>
                  </motion.div>
                )}
                
                {/* Serviceable State within Modal (if just tracked via GPS) */}
                {!loading && pincode === inputPincode && trackingStatus === 'serviceable' && !internalError && (estimation || deliveryDetails) && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 mt-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-emerald-600">
                      Serviceable! {estimation ? estimation.text.replace(/Estimated delivery:\s*(ETA:\s*)?/g, '') : (deliveryDetails?.eta || '24 hrs')}
                    </p>
                  </motion.div>
                )}
              </form>
            </div>

          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
