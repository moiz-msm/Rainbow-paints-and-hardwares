import React from 'react';
import { CheckCircle2, Shield, Droplet, PaintRoller, IndianRupee } from 'lucide-react';

export default function ServiceInfo({ serviceType }: { serviceType: string }) {
  let rates = [];
  
  if (serviceType === 'interior') {
    rates = [
      { type: 'Repainting / Touch-up (1-2 Coats)', rate: '₹12 - ₹18 / sq.ft' },
      { type: 'Damaged Wall Repair (Putty + Primer + Paint)', rate: '₹18 - ₹25 / sq.ft' },
      { type: 'New Wall Painting (2 Coats Putty + Primer + 2 Coats Paint)', rate: '₹25 - ₹35 / sq.ft' },
      { type: 'Wall Waterproofing & Seepage Treatment', rate: '₹30 - ₹50 / sq.ft' },
      { type: 'Luxury Interior Finishes (Royale / Silk / Velvet)', rate: '₹35 - ₹55 / sq.ft' },
    ];
  } else if (serviceType === 'exterior') {
    rates = [
      { type: 'Exterior Repainting (Good Condition)', rate: '₹13 - ₹18 / sq.ft' },
      { type: 'New Exterior Wall Painting (Primer + 2 Coats Weatherproof Paint)', rate: '₹20 - ₹32 / sq.ft' },
      { type: 'Exterior Wall Waterproofing & Crack Filling', rate: '₹25 - ₹40 / sq.ft' },
      { type: 'High-Performance Waterproofing (Damp Proof + Ultima)', rate: '₹28 - ₹45 / sq.ft' },
      { type: 'Exterior Wall Texture Coating', rate: '₹40 - ₹65 / sq.ft' },
    ];
  } else if (serviceType === 'wood') {
    rates = [
      { type: 'Enamel Paint for Grills / Gates / Frames', rate: '₹18 - ₹25 / sq.ft' },
      { type: 'Wood Polish (Touch up / Basic Clear Coat)', rate: '₹30 - ₹45 / sq.ft' },
      { type: 'PU Polish / Melamine (Luxury High-Gloss / Matte Finish)', rate: '₹80 - ₹150 / sq.ft' },
    ];
  } else if (serviceType === 'waterproofing') {
    rates = [
      { type: 'Exterior Wall Waterproofing & Protective Coating', rate: '₹25 - ₹40 / sq.ft' },
      { type: 'Interior Wall Seepage & Dampness Waterproofing', rate: '₹30 - ₹50 / sq.ft' },
      { type: 'Terrace Waterproofing (Basic 3-Layer Elastomeric)', rate: '₹35 - ₹55 / sq.ft' },
      { type: 'Terrace Waterproofing (Advanced 5-Layer / PU Membrane)', rate: '₹55 - ₹85 / sq.ft' },
      { type: 'Bathroom & Sunken Area Waterproofing', rate: '₹60 - ₹95 / sq.ft' },
    ];
  } else if (serviceType === 'flooring') {
    rates = [
      { type: 'Standard Epoxy Floor Coating (500 micron - 1mm)', rate: '₹45 - ₹75 / sq.ft' },
      { type: 'Heavy Duty Polyurethane (PU) Floor Coating', rate: '₹65 - ₹110 / sq.ft' },
      { type: 'Self-Leveling Epoxy Floor Coating (2mm - 3mm)', rate: '₹80 - ₹130 / sq.ft' },
      { type: 'Anti-Static / ESD Industrial Floor Coating', rate: '₹95 - ₹160 / sq.ft' },
    ];
  } else {
    // Generic
    rates = [
      { type: 'Interior Wall Repainting', rate: '₹12 - ₹18 / sq.ft' },
      { type: 'New Wall Painting (Full Putty + Primer + Paint)', rate: '₹25 - ₹35 / sq.ft' },
      { type: 'Exterior Wall Painting & Weatherproofing', rate: '₹18 - ₹32 / sq.ft' },
      { type: 'Wall Waterproofing & Seepage Treatment', rate: '₹25 - ₹50 / sq.ft' },
      { type: 'Industrial & Commercial Floor Coating (Epoxy / PU)', rate: '₹45 - ₹110 / sq.ft' },
      { type: 'Terrace Waterproofing (3 to 5 Layers)', rate: '₹35 - ₹85 / sq.ft' },
      { type: 'Wood & Metal Polish / Enamel Coating', rate: '₹18 - ₹150 / sq.ft' },
    ];
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Value Proposition */}
        <div className="bg-gradient-to-br from-[#1A365D] to-[#2A4A7F] rounded-3xl p-8 lg:p-12 text-white shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-6 text-gold">Why Choose Our Authorised Painters?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold mb-2">
                  <IndianRupee className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">₹0 Consultation</h3>
                <p className="text-sm text-white/80">Free site visit, measurement, and exact quotation with no obligation.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold mb-2">
                  <PaintRoller className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Free Samples</h3>
                <p className="text-sm text-white/80">Get free product and color samples tested directly on your walls.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold mb-2">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Digital Preview</h3>
                <p className="text-sm text-white/80">Free digital preview to help you visualize color combinations before painting.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold mb-2">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Authorised Partners</h3>
                <p className="text-sm text-white/80">We only refer painters who are officially authorised and trained by top brands.</p>
              </div>
            </div>
          </div>
        </div>


        {/* Rates Chart */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-serif font-bold mb-4 text-center text-[#1A365D]">Approximate Service Rates</h2>
          <p className="text-center text-sm text-gray-500 mb-8 max-w-3xl mx-auto italic">
            * Note: The final application and labor prices are decided autonomously by the independent contractors after a site inspection. We only supply the genuine materials. The rates below are standard market estimates including labor and material.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto text-left border-collapse bg-white shadow-sm rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-[#1A365D] text-white">
                  <th className="py-4 px-6 font-semibold border-b border-white/10">Type of Service / Condition</th>
                  <th className="py-4 px-6 font-semibold border-b border-white/10 w-1/3">Approximate Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border border-gray-100">
                {rates.map((rate, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-gray-800 font-medium">{rate.type}</td>
                    <td className="py-4 px-6 text-gold font-bold">{rate.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
