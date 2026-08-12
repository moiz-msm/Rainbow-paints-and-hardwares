import React, { useState } from 'react';
import { CheckCircle2, IndianRupee, ArrowRight, MessageSquare, Phone, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const pricingData = {
  interior: {
    title: "Interior Painting Services",
    description: "From basic rental touch-ups to luxurious fresh painting, choose the perfect package for your home's interiors.",
    categories: [
      {
        id: "rental",
        name: "Rental Painting (1-2 Days)",
        suitable: "Ideal for tenants moving in/out or budget refreshes.",
        process: "Touch-up Putty + 2 Coats Paint",
        brands: "Tractor Emulsion, Berger Bison",
        rate: "₹10 - ₹14 / sq.ft",
        estimates: [
          { size: "1 Room (~300 sq.ft)", price: "₹3,500 - ₹4,500" },
          { size: "1 BHK (~800 sq.ft)", price: "₹8,500 - ₹11,500" },
          { size: "2 BHK (~1200 sq.ft)", price: "₹13,000 - ₹16,000" },
          { size: "3 BHK (~1600 sq.ft)", price: "₹18,000 - ₹23,000" },
        ]
      },
      {
        id: "repainting",
        name: "Standard Repainting (2-4 Days)",
        suitable: "Perfect for regular maintenance and color changes on good condition walls.",
        process: "Touch-up Putty + 1 Coat Primer + 2 Coats Paint",
        brands: "Apcolite Premium, Berger Easy Clean",
        rate: "₹16 - ₹22 / sq.ft",
        estimates: [
          { size: "1 Room", price: "₹4,800 - ₹6,500" },
          { size: "1 BHK", price: "₹14,500 - ₹18,500" },
          { size: "2 BHK", price: "₹20,000 - ₹26,000" },
          { size: "3 BHK", price: "₹28,000 - ₹36,000" },
        ]
      },
      {
        id: "fresh",
        name: "Fresh / Luxury Painting (4-7 Days)",
        suitable: "For new walls or highly damaged walls requiring a perfectly smooth, rich finish.",
        process: "2 Coats Putty + 1 Coat Primer + 2 Coats Luxury Paint",
        brands: "Asian Royale, Royale Play, Berger Silk Glamor",
        rate: "₹28 - ₹38 / sq.ft",
        estimates: [
          { size: "1 Room", price: "₹8,500 - ₹11,500" },
          { size: "1 BHK", price: "₹24,000 - ₹32,000" },
          { size: "2 BHK", price: "₹35,000 - ₹45,000" },
          { size: "3 BHK", price: "₹48,000 - ₹62,000" },
        ]
      }
    ]
  },
  exterior: {
    title: "Exterior Painting Services",
    description: "Protect your home from extreme weather with our durable, dust and algae-resistant exterior painting solutions.",
    categories: [
      {
        id: "ext-standard",
        name: "Standard Exterior",
        suitable: "Economical protection against weather.",
        process: "Scraping + 1 Coat Exterior Primer + 2 Coats Paint",
        brands: "Asian Apex, Berger Weathercoat",
        rate: "₹18 - ₹25 / sq.ft",
        estimates: [
          { size: "Small House (1000 sq.ft)", price: "₹20,000 - ₹28,000" },
          { size: "Medium Villa (2500 sq.ft)", price: "₹48,000 - ₹65,000" },
        ]
      },
      {
        id: "ext-luxury",
        name: "Luxury Exterior (10yr Warranty)",
        suitable: "High performance, extreme weather protection with anti-dust technology.",
        process: "Pressure Wash + Crack Fill + 1 Coat Premium Primer + 2 Coats Protek",
        brands: "Apex Ultima Protek, Berger Weathercoat Longlife",
        rate: "₹30 - ₹45 / sq.ft",
        estimates: [
          { size: "Small House", price: "₹35,000 - ₹50,000" },
          { size: "Medium Villa", price: "₹80,000 - ₹1,15,000" },
        ]
      }
    ]
  },
  wood: {
    title: "Wood & Metal Painting",
    description: "Revitalize your doors, windows, and grills with premium enamels and PU finishes.",
    categories: [
      {
        id: "enamel",
        name: "Standard Enamel (Doors & Grills)",
        suitable: "Basic protection and gloss for MS grills, gates, and interior doors.",
        process: "Sanding + 1 Coat Metal/Wood Primer + 2 Coats Enamel",
        brands: "Asian Apcolite Enamel, Berger Luxol",
        rate: "₹20 - ₹30 / sq.ft",
        estimates: [
          { size: "Standard Door", price: "₹800 - ₹1,200" },
          { size: "Window Grill", price: "₹600 - ₹900" },
        ]
      },
      {
        id: "pu",
        name: "Luxury PU Finish (Wood)",
        suitable: "High-end scratch-resistant clear or pigmented finish for luxury wooden furniture and main doors.",
        process: "Machine Sanding + Sealer + PU Basecoat + PU Topcoat",
        brands: "MRF Vapocure, Asian Paints WoodTech",
        rate: "₹80 - ₹150 / sq.ft",
        estimates: [
          { size: "Main Door (Both Sides)", price: "₹4,500 - ₹8,000" },
          { size: "Wardrobe (Per Sq.Ft)", price: "₹100 - ₹150" },
        ]
      }
    ]
  },
  waterproofing: {
    title: "Waterproofing Services",
    description: "Stop terrace and bathroom leakages permanently with our advanced elastomeric waterproofing.",
    categories: [
      {
        id: "terrace",
        name: "Terrace Waterproofing",
        suitable: "Stop ceiling dampness and roof leaks.",
        process: "Wirebrush Cleaning + Crack Filling + 1 Coat DampProof Primer + 2 Coats DampProof",
        brands: "Dr. Fixit, Asian Damp Proof",
        rate: "₹35 - ₹55 / sq.ft",
        estimates: [
          { size: "500 sq.ft Terrace", price: "₹18,000 - ₹28,000" },
          { size: "1000 sq.ft Terrace", price: "₹36,000 - ₹55,000" },
        ]
      },
      {
        id: "bathroom",
        name: "Bathroom / Wall Waterproofing",
        suitable: "For interior wall dampness, paint peeling, and bathroom seepage.",
        process: "Scraping to Plaster + Damp Block Treatment + Putty Re-application",
        brands: "Dr. Fixit Dampguard, Asian Damp Block",
        rate: "₹40 - ₹65 / sq.ft",
        estimates: [
          { size: "Single Wall Repair", price: "₹4,000 - ₹7,000" },
          { size: "Full Bathroom", price: "Custom Quote" },
        ]
      }
    ]
  }
};

export default function DetailedPaintingPricing({ locationName = "Coimbatore" }: { locationName?: string }) {
  const [activeTab, setActiveTab] = useState<keyof typeof pricingData>('interior');

  const currentData = pricingData[activeTab];

  return (
    <div className="py-16 bg-ivory/5 border-t border-royale-accent/40" id="detailed-pricing">
      <div className="max-w-7xl mx-auto px-4">
        {/* Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {(Object.keys(pricingData) as Array<keyof typeof pricingData>).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`p-6 rounded-2xl font-bold text-center transition-all duration-300 flex flex-col items-center justify-center border ${
                activeTab === tab
                  ? 'bg-gold text-white border-gold shadow-lg shadow-gold/20'
                  : 'bg-white text-ivory/80 border-royale-accent/50 hover:border-gold hover:text-gold hover:shadow-md'
              }`}
            >
              <span className="text-base md:text-lg">{pricingData[tab].title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-ivory font-serif mb-2">{currentData.title}</h3>
            <p className="text-ivory/80">{currentData.description}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {currentData.categories.map((category) => (
              <div key={category.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] bg-white rounded-2xl border border-royale-accent/50 shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col group">
                <div className="p-6 md:p-8 flex-1 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -z-10 group-hover:bg-gold/10 transition-colors"></div>
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-ivory font-serif leading-tight">{category.name}</h4>
                  </div>
                  <div className="inline-block bg-gold/10 text-gold text-xs font-bold px-3 py-1.5 rounded-lg mb-4 border border-gold/20">
                    {category.rate}
                  </div>
                  <p className="text-sm text-ivory/70 mb-6 min-h-[40px]">{category.suitable}</p>
                  
                  <div className="space-y-4 mb-6 pb-6 border-b border-royale-accent/30">
                    <div>
                      <span className="text-xs font-bold text-ivory/60 uppercase tracking-wider block mb-1">Process</span>
                      <p className="text-sm text-ivory font-medium flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {category.process}
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-ivory/60 uppercase tracking-wider block mb-1">Top Brands Used</span>
                      <p className="text-sm text-ivory/80">{category.brands}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-ivory/60 uppercase tracking-wider block mb-3">Estimated Costs</span>
                    <div className="space-y-2">
                      {category.estimates.map((est, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-ivory/80">{est.size}</span>
                          <span className="font-bold text-ivory">{est.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-royale-surface border-t border-royale-accent/30 flex gap-2">
                  <a
                    href={`https://wa.me/918072442930?text=Hi,%20I'm%20interested%20in%20a%20free%20site%20visit%20for%20${category.name}%20in%20${locationName}`}
                    target="_blank" rel="noreferrer"
                    className="flex-1 bg-gold text-white text-center py-2.5 rounded-lg text-sm font-bold hover:bg-amber-500 transition-colors flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-4 h-4" /> Book Visit
                  </a>
                  <a
                    href="tel:+918072442930"
                    className="w-12 bg-white text-ivory border border-royale-accent text-center py-2.5 rounded-lg flex items-center justify-center hover:bg-ivory hover:text-white transition-colors"
                    aria-label="Call Us"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link to={activeTab === "interior" ? `/services/interior-wall-painting/${locationName.toLowerCase().replace(/, /g, "-").replace(/ /g, "-")}` : activeTab === "exterior" ? `/services/exterior-wall-painting/${locationName.toLowerCase().replace(/, /g, "-").replace(/ /g, "-")}` : activeTab === "wood" ? `/services/wood-metal-painting/${locationName.toLowerCase().replace(/, /g, "-").replace(/ /g, "-")}` : `/services/waterproofing/${locationName.toLowerCase().replace(/, /g, "-").replace(/ /g, "-")}`} className="inline-flex items-center gap-2 bg-royale-bg border border-royale-accent/50 text-gold px-8 py-3 rounded-full font-bold hover:bg-gold hover:text-white transition-all shadow-sm">
              View Full Details & Costs for {currentData.title} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="w-full mt-12 flex flex-col md:flex-row items-center justify-between bg-white p-6 md:p-8 rounded-2xl border border-gold/30 shadow-lg relative overflow-hidden group">
            <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors pointer-events-none"></div>
            <div className="relative z-10 mb-6 md:mb-0">
              <h4 className="font-bold text-ivory text-xl md:text-2xl font-serif mb-2">Not sure which package to choose?</h4>
              <p className="text-sm md:text-base text-ivory/80 max-w-xl">Get a free site visit, laser measurement, and color consultation at your home. We bring physical shade cards to help you decide.</p>
            </div>
            <div className="relative z-10 flex w-full md:w-auto">
              <a href={`https://wa.me/918072442930?text=I%20want%20to%20book%20a%20free%20site%20visit%20and%20color%20consultation%20in%20${locationName}`} target="_blank" rel="noreferrer" className="w-full md:w-auto px-8 py-4 bg-gradient-gold text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 whitespace-nowrap text-lg">
                <MessageSquare className="w-5 h-5" /> Book Free Site Visit
              </a>
            </div>
          </div>

          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 md:p-6 flex gap-4 mt-8 items-start">
            <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm md:text-base text-blue-900 leading-relaxed">
              <strong>Please Note:</strong> The estimates above are based on average carpet areas (e.g., 1BHK = 400-500 sq.ft carpet area). Actual costs may vary based on exact wall measurements, surface conditions, ceiling height, and final product selection. We use precise laser tools during our <strong>free site inspection</strong> to give you a 100% accurate quote with zero hidden charges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
