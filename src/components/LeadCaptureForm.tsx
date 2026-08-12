import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageCircle, MapPin, Maximize2, User, Paintbrush } from 'lucide-react';

interface LeadCaptureFormProps {
  locationName?: string;
  defaultService?: string;
}

export default function LeadCaptureForm({ locationName, defaultService = '' }: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [sqft, setSqft] = useState('');
  const [pincode, setPincode] = useState('');
  const [serviceType, setServiceType] = useState(defaultService || 'Interior Wall Painting');
  const [submitted, setSubmitted] = useState(false);

  // Sync defaultService when provided
  React.useEffect(() => {
    if (defaultService) {
      setServiceType(defaultService);
    }
  }, [defaultService]);

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedLocation = locationName ? ` (${locationName})` : '';
    const message = `Hi Rainbow Paints, I would like to book a Free On-Site Consultation${formattedLocation}.\n\n` +
      `👤 *Name:* ${name}\n` +
      `📐 *Approx Area:* ${sqft} sq.ft\n` +
      `📍 *Pincode:* ${pincode}\n` +
      `🎨 *Service Type:* ${serviceType}\n\n` +
      `Please confirm my free site visit timing.`;

    const whatsappUrl = `https://wa.me/918072442930?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-royale-accent/30 text-center relative overflow-hidden">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-zinc-900 mb-2">Consultation Requested!</h3>
        <p className="text-zinc-600 text-sm leading-relaxed mb-4">
          Your WhatsApp chat has opened with prefilled details. Our technical expert will review your requirement and confirm your site visit timing shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-bold text-royale-accent hover:underline uppercase tracking-wider"
        >
          Book Another Visit
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-royale-accent/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 leading-tight">
          Book Your Free On-Site Consultation
        </h3>
        <p className="text-zinc-500 text-xs sm:text-sm mt-1">
          Free laser measurement & expert shade consultation{locationName ? ` in ${locationName}` : ''}.
        </p>
      </div>

      <form onSubmit={handleWhatsAppBooking} className="space-y-4 relative z-10">
        <div>
          <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Your Name *</label>
          <div className="relative">
            <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rajesh Kumar"
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all text-sm font-medium text-zinc-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Approx Sq. Ft. *</label>
            <div className="relative">
              <Maximize2 className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input 
                type="text" 
                required
                value={sqft}
                onChange={(e) => setSqft(e.target.value)}
                placeholder="e.g. 1200"
                className="w-full pl-10 pr-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all text-sm font-medium text-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Pincode *</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              <input 
                type="text" 
                required
                pattern="[0-9]{6}"
                title="6-digit pincode"
                maxLength={6}
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="e.g. 641009"
                className="w-full pl-10 pr-3 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all text-sm font-medium text-zinc-900"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Service Type *</label>
          <div className="relative">
            <Paintbrush className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <select 
              required
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-gold focus:border-transparent outline-none transition-all text-sm font-medium text-zinc-800 appearance-none"
            >
              <option value="Interior Wall Painting">Interior Wall Painting</option>
              <option value="Exterior Wall Painting">Exterior Wall Painting</option>
              <option value="Wall / Terrace Waterproofing">Wall & Terrace Waterproofing</option>
              <option value="Wood & Metal Polish/Painting">Wood & Metal Polish / Painting</option>
              <option value="Industrial Epoxy Flooring">Industrial / Epoxy Flooring</option>
              <option value="Full House Painting & Waterproofing">Full House Painting & Waterproofing</option>
            </select>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg mt-2 group text-sm sm:text-base cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Book Visit via WhatsApp</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}

