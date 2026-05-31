import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Palette, Ruler, ChevronDown } from 'lucide-react';
import WhatsappIcon from './WhatsappIcon';

export default function OfferPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    projectType: 'Interior',
    area: '',
    address: ''
  });

  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem('hasSeenOfferPopup');
    if (hasSeen === 'true') return;
    
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenOfferPopup', 'true');
  };

  const handleWhatsapp = () => {
    const message = `Hi Rainbow Paints! I would like to book a free visit.\n\n*Name:* ${formData.name || 'Not provided'}\n*Project Type:* ${formData.projectType}\n*Approx Area:* ${formData.area || 'Not provided'} sq.ft\n*Site Address:* ${formData.address || 'Not provided'}\n\n*Interested in:* Free Paint Sample & Free Measurement`;
    window.open(`https://wa.me/918072442930?text=${encodeURIComponent(message)}`, '_blank');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-[90vw] max-w-[280px] sm:max-w-[300px] xl:max-w-[320px] bg-royale-bg border border-gold/40 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex flex-col"
          >
            {/* Header */}
            <div className="bg-gold border-b border-gold/20 p-3 sm:p-4 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[100px] h-[100px] bg-white/30 rounded-full blur-[30px] -mr-8 -mt-8 pointer-events-none" />
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="absolute top-2 right-2 p-2 text-[#08115c]/50 hover:text-[#08115c] hover:bg-[#08115c]/10 rounded-full transition-colors z-20"
                aria-label="Close"
              >
                <X className="w-4 h-4 ml-[0.5px]" />
              </button>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#08115c] uppercase tracking-widest flex items-center justify-center gap-1.5 mb-1 relative z-10">
                <Gift className="w-4 h-4 text-[#08115c]" /> Free Offer!
              </h2>
              <p className="text-[#08115c]/80 text-[9px] sm:text-[10px] font-sans font-medium italic relative z-10">
                Claim these free services — no obligation, no cost.
              </p>
            </div>

            <div className="p-3 sm:p-4 flex-grow flex flex-col gap-4">
              
              {/* Offers */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white shadow-sm border border-zinc-200 rounded-xl p-2.5 text-center flex flex-col items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Palette className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-[9px] sm:text-[10px] font-bold text-ivory uppercase tracking-widest mb-0.5">Free Paint Sample</h3>
                    <p className="text-[7px] sm:text-[8px] text-zinc-500 leading-tight">On-site wall application</p>
                  </div>
                </div>
                <div className="bg-white shadow-sm border border-zinc-200 rounded-xl p-2.5 text-center flex flex-col items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <Ruler className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-[9px] sm:text-[10px] font-bold text-ivory uppercase tracking-widest mb-0.5">Free Measurement</h3>
                    <p className="text-[7px] sm:text-[8px] text-zinc-500 leading-tight">Free sq.ft estimate</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div>
                <h3 className="text-[10px] sm:text-xs font-medium text-ivory text-center mb-3 uppercase tracking-widest">
                  Book your free visit
                </h3>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <label className="block text-[7px] sm:text-[8px] text-ivory/80 uppercase tracking-widest mb-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Ramesh"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white shadow-sm border border-zinc-200 rounded-lg px-2 py-1.5 text-[9px] sm:text-[10px] text-ivory font-light focus:outline-none focus:border-gold/50 transition-colors placeholder:text-zinc-300"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-[7px] sm:text-[8px] text-ivory/80 uppercase tracking-widest mb-1">Project Type</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                        className="w-full bg-white shadow-sm border border-zinc-200 rounded-lg px-2 py-1.5 text-[9px] sm:text-[10px] text-zinc-900 font-semibold focus:outline-none focus:border-gold/50 transition-all flex items-center justify-between text-left"
                      >
                        <span className="truncate">{formData.projectType}</span>
                        <ChevronDown className={`w-3 h-3 text-zinc-400 shrink-0 transition-transform duration-300 ${isTypeDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isTypeDropdownOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsTypeDropdownOpen(false)} />
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-xl overflow-hidden divide-y divide-zinc-100 z-50 animate-fade-in text-[9px] sm:text-[10px] text-zinc-805 text-zinc-800">
                            {['Interior', 'Exterior', 'Waterproofing', 'Wood & Metal', 'All'].map(type => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  setFormData({ ...formData, projectType: type });
                                  setIsTypeDropdownOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 transition-colors ${formData.projectType === type ? 'bg-zinc-100 text-zinc-950 font-bold' : 'text-zinc-650 hover:bg-zinc-50'}`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[7px] sm:text-[8px] text-ivory/80 uppercase tracking-widest mb-1">Approx Area</label>
                    <input 
                      type="text" 
                      placeholder="800 sq.ft"
                      value={formData.area}
                      onChange={e => setFormData({ ...formData, area: e.target.value })}
                      className="w-full bg-white shadow-sm border border-zinc-200 rounded-lg px-2 py-1.5 text-[9px] sm:text-[10px] text-ivory font-light focus:outline-none focus:border-gold/50 transition-colors placeholder:text-zinc-300"
                    />
                  </div>
                  <div>
                    <label className="block text-[7px] sm:text-[8px] text-ivory/80 uppercase tracking-widest mb-1">Address / Pin</label>
                    <input 
                      type="text" 
                      placeholder="53 Cox St / 641009"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-white shadow-sm border border-zinc-200 rounded-lg px-2 py-1.5 text-[9px] sm:text-[10px] text-ivory font-light focus:outline-none focus:border-gold/50 transition-colors placeholder:text-zinc-300"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button 
                  onClick={handleWhatsapp}
                  className="bg-[#25D366] hover:bg-[#20b858] text-white py-2 px-2 pb-[7px] rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-widest flex justify-center items-center gap-1.5 transition-colors"
                >
                  <WhatsappIcon className="w-3.5 h-3.5 ml-[-2px] mt-[-1px]" /> Book via Whatsapp
                </button>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                  }}
                  className="bg-transparent hover:bg-black/5 border border-zinc-200 text-zinc-700 hover:text-ivory py-2 px-2 pb-[7px] rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  Maybe Later
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
