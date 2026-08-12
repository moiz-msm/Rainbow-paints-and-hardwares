import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Factory } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import ServiceInfo from '../components/ServiceInfo';
import LeadCaptureForm from '../components/LeadCaptureForm';
import { FaqAccordion } from '../components/FaqSection';
import TrustStats from '../components/TrustStats';

export default function IndustrialFlooringPage() {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  const rawName = locationSlug ? locationSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Coimbatore';
  const locationName = rawName.toLowerCase().includes('coimbatore') ? rawName : `${rawName}, Coimbatore`;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  
  return (
    <div className="min-h-screen bg-royale-bg pb-24">
      <SEO 
        title={`Industrial & Epoxy Flooring Services in ${locationName} | Free Quote`}
        description={`Expert industrial flooring services in ${locationName}. Epoxy coatings, PU flooring, and heavy-duty screeds for warehouses, factories, and commercial spaces.`}
      />
      
      <div className="pt-24 lg:pt-32 pb-16 lg:pb-24 relative overflow-hidden border-b border-royale-accent/40 bg-royale-surface">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-royale-surface/80 mix-blend-multiply z-10" />
          <img 
            src="https://images.unsplash.com/photo-1580983554442-9f37c35a6390?auto=format&fit=crop&q=80&w=2000" 
            alt="Industrial Flooring"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-royale-surface z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-20">
          <div className="mb-8">
            <Breadcrumb 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Painting Services', href: '/painting-services' },
                { label: `Industrial Flooring in ${locationName}` }
              ]}
            />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <span className="bg-gold/20 border border-gold/30 text-gold text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Factory className="w-4 h-4" /> Heavy Duty Flooring Solutions
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 uppercase tracking-tight leading-tight text-ivory">
                Epoxy & PU Industrial Flooring <span className="text-gold block mt-2">{locationName}</span>
              </h1>
              <p className="text-ivory/50 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your facility with our high-performance epoxy and PU flooring systems. Designed for extreme durability, chemical resistance, and seamless aesthetics in warehouses, factories, and commercial spaces.
              </p>
              
              <TrustStats />
            </div>
            
            <div className="w-full lg:w-5/12 xl:w-4/12 relative z-20">
              <LeadCaptureForm locationName={locationName} defaultService="Industrial Epoxy Flooring" />
            </div>
          </div>
        </div>
      </div>

      <ServiceInfo serviceType="flooring" />

      {/* FAQs */}
      <div className="bg-royale-bg py-16 border-t border-royale-accent/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory mb-8 text-center">Industrial Flooring FAQs</h2>
          <FaqAccordion items={[
            {
              question: "What thickness of Epoxy flooring is recommended for heavy machinery?",
              answer: "For light foot traffic and showrooms, a 500-micron to 1mm epoxy coating is adequate. For heavy forklift traffic, warehouses, and factories, a 2mm to 4mm self-leveling epoxy floor or heavy-duty PU screed is recommended."
            },
            {
              question: "How long does Epoxy flooring take to cure before heavy use?",
              answer: "Epoxy floors are light foot-traffic ready within 24 hours. Full chemical curing and heavy machinery movement can resume after 7 days."
            },
            {
              question: "Is surface preparation included in the flooring service?",
              answer: "Yes, surface preparation using diamond grinding, scarifying, or shot-blasting to achieve the proper Concrete Surface Profile (CSP) is mandatory and included in all our professional installations."
            }
          ]} />
        </div>
      </div>
      {/* Internal Links for SEO */}
      <div className="bg-white border-t border-royale-accent/40 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold font-serif text-ivory mb-6 text-center">Other Services in {locationName}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={`/services/interior-wall-painting/${locationSlug || ''}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Interior Painting
            </Link>
            <Link to={`/services/exterior-wall-painting/${locationSlug || ''}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Exterior Painting
            </Link>
            <Link to={`/services/waterproofing/${locationSlug || ''}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Waterproofing Services
            </Link>
            <Link to={`/services/wood-metal-painting/${locationSlug || ''}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Wood & Metal Painting
            </Link>
          </div>
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-royale-accent/30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] p-4 lg:hidden z-50 transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex gap-3 max-w-7xl mx-auto">
          <a 
            href={`https://wa.me/918072442930?text=Hi,%20I%20would%20like%20to%20Book%20a%20Free%20Visit%20for%20Industrial%20Flooring%20Services%20in%20${locationName}`} 
            target="_blank" rel="noreferrer"
            className="w-full bg-gold text-white px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-amber-500"
          >
            <MessageSquare className="w-5 h-5" />
            Book Free Visit
          </a>
        </div>
      </div>
    </div>
  );
}
