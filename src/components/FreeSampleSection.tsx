import React, { useState } from 'react';
import { Package } from 'lucide-react';
import WhatsappIcon from './WhatsappIcon';
import { motion } from 'framer-motion';

export default function FreeSampleSection() {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    pinCode: ''
  });

  const handleWhatsapp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { crmService } = await import('../lib/crm');
      await crmService.addLead({
        type: 'VISIT',
        name: formData.name || 'Unknown',
        phone: 'WhatsApp User',
        metadata: {
          area: formData.area,
          pinCode: formData.pinCode,
          requestMessage: 'Free Paint Sample Kit & Site Visit'
        },
      });

      // Notify server CRM for real-time alerting and HTML log tracking
      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `New Site Visit Request: ${formData.name || 'Premium Lead'}`,
          message: `Customer ${formData.name || 'Unknown'} requested a luxury site consultation and sample layout kit for a surface area of ${formData.area || 'unspecified'} sq ft. Pin code: ${formData.pinCode || '641001'}.`,
          type: 'CRM_LEAD_ALERT',
          recipientEmail: 'admin@rainbowpaints.com',
          metadata: {
            customerName: formData.name,
            estimatedAreaSqFt: formData.area,
            pincodeMatches: formData.pinCode,
            priority: 'HIGH'
          }
        })
      });
    } catch (err) {
      console.warn("Could not log CRM/notification, but progressing...", err);
    }

    const message = `Hi Rainbow Paints! I would like to book a free site visit.\n\n*Name:* ${formData.name || 'Not provided'}\n*Approx Area:* ${formData.area || 'Not provided'} sq.ft\n*Pin Code:* ${formData.pinCode || 'Not provided'}\n\n*Interested in:* Free Paint Sample Kit & Site Visit`;
    window.open(`https://wa.me/918072442930?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="free-sample" className="py-6 sm:py-8 relative overflow-hidden bg-royale-bg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-panel rounded-2xl sm:rounded-[32px] border-zinc-200 overflow-hidden relative bg-gradient-to-br from-royale-surface to-royale-bg"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600/10 blur-[30px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-gold/5 blur-[30px] rounded-full pointer-events-none" />
          
          <div className="grid lg:grid-cols-2 items-center">
            
            {/* Visual Column */}
            <div className="p-6 lg:p-10 relative">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white shadow-sm border border-zinc-200 flex items-center justify-center mb-4 sm:mb-6 border border-zinc-200">
                    <Package className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                </div>
                <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 sm:mb-4 leading-tight text-center lg:text-left">
                  Request site <span className="italic text-gradient font-light">visit.</span>
                </h2>
                <p className="text-gold text-[10px] sm:text-xs mb-4 sm:mb-6 max-w-md italic font-light text-center lg:text-left">
                  Free visit - free consultation - free measurement - free quote - free paint sample - by experts on your doorstep - no obligation, no cost.
                </p>
              </motion.div>

              {/* Decorative Floating Paint Tins or Swatches */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 0.2, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
              >
                  <div className="flex gap-2">
                     <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-16 h-24 bg-blue-500 rounded-xl transform rotate-12" />
                     <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="w-16 h-24 bg-gold rounded-xl transform -rotate-6 translate-y-4 shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
                     <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="w-16 h-24 bg-ivory rounded-xl transform rotate-3" />
                  </div>
              </motion.div>
            </div>

            {/* Form Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="p-6 lg:p-10 bg-white shadow-sm border border-zinc-200 border-l border-zinc-200"
            >
                <form onSubmit={handleWhatsapp} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-gold ml-1">Full Name</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white shadow-sm border border-zinc-200 rounded-lg sm:rounded-xl px-3 py-2 focus:outline-none focus:border-gold/50 transition-colors text-zinc-800 text-[10px] sm:text-xs placeholder:text-zinc-400 font-light" placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-1.5">
                      <label className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-gold ml-1">Approx Sq Ft Area</label>
                      <input 
                        type="text" 
                        value={formData.area}
                        onChange={e => setFormData({ ...formData, area: e.target.value })}
                        className="w-full bg-white shadow-sm border border-zinc-200 rounded-lg sm:rounded-xl px-3 py-2 focus:outline-none focus:border-gold/50 transition-colors text-zinc-800 text-[10px] sm:text-xs placeholder:text-zinc-400 font-light" placeholder="e.g. 1500" 
                      />
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-1.5">
                    <label className="text-[8px] sm:text-[9px] font-semibold uppercase tracking-widest text-gold ml-1">Pin Code</label>
                    <input 
                      type="text" 
                      value={formData.pinCode}
                      onChange={e => setFormData({ ...formData, pinCode: e.target.value })}
                      className="w-full bg-white shadow-sm border border-zinc-200 rounded-lg sm:rounded-xl px-3 py-2 focus:outline-none focus:border-gold/50 transition-colors text-zinc-800 text-[10px] sm:text-xs placeholder:text-zinc-400 font-light" placeholder="641001" 
                    />
                  </div>
                  <button type="submit" className="w-full bg-[#25D366] hover:bg-[#20b858] text-white py-2.5 sm:py-3 mt-2 rounded-lg sm:rounded-xl font-semibold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-lg text-[10px] sm:text-xs">
                    <WhatsappIcon className="w-4 h-4" /> Book Via Whatsapp
                  </button>
                </form>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
