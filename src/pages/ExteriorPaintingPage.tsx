import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, CheckCircle2, ShieldCheck, MessageSquare, ArrowRight, Brush, Star, Droplet, PenTool } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import ServiceInfo from '../components/ServiceInfo';
import LeadCaptureForm from '../components/LeadCaptureForm';
import { FaqAccordion } from '../components/FaqSection';
import TrustStats from '../components/TrustStats';

export default function ExteriorPaintingPage() {
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
    <div className="min-h-screen bg-royale-bg">
      <SEO 
        title={`Exterior Wall Home Painting Services in ${locationName} | Free Estimate`}
        description={`Expert exterior wall home painting services in ${locationName}. Protect your home from extreme weather with Asian Paints Apex and Ultima Protek. Exact laser measured quotes.`}
      />
      <div className="pt-24 lg:pt-32 pb-16 lg:pb-24 relative overflow-hidden border-b border-royale-accent/40 bg-royale-surface">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-royale-surface/80 mix-blend-multiply z-10" />
          <img 
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000" 
            alt="Exterior Wall Home Painting"
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
              { label: `Exterior Wall Home Painting in ${locationName}` }
              ]}
            />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <span className="bg-gold/20 border border-gold/30 text-gold text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4" /> Weatherproof Exterior Solutions
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 uppercase tracking-tight leading-tight text-ivory">
                Exterior Wall Home Painting <span className="text-gold block mt-2">{locationName}</span>
              </h1>
              <p className="text-ivory/50 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Protect your building's exterior against harsh sun, heavy rain, and algae. We use high-performance genuine paints from Asian Paints and Berger.
              </p>
              
              <TrustStats />
            </div>
            
            <div className="w-full lg:w-5/12 xl:w-4/12 relative z-20">
              <LeadCaptureForm locationName={locationName} defaultService="Exterior Wall Painting" />
            </div>
          </div>
        </div>
      </div>
      
<ServiceInfo serviceType="exterior" />
      {/* FAQs */}
      <div className="bg-royale-bg py-16 border-t border-royale-accent/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory mb-8 text-center">Exterior Wall Painting FAQs</h2>
          <FaqAccordion items={[
            {
              question: "Do you provide scaffolding/jhoola services?",
              answer: "Yes, all our exterior wall painting quotes include standard scaffolding (bamboo/pipes) or rope/jhoola arrangements as required. We handle all safety protocols for high-rise elevations."
            },
            {
              question: "How do you treat green algae and fungus on outside walls?",
              answer: "We first physically remove it via high-pressure water washing. Then, we apply a bio-wash/fungicidal solution before priming. Finally, we use anti-algal paints like Apex or Protek to prevent its return."
            },
            {
              question: "Is exterior wall putty necessary?",
              answer: "Exterior wall putty is primarily required for new constructions (fresh painting) to level the cement plaster. For repainting, we only do touch-up putty on areas where plaster has chipped or cracks were filled."
            },
            {
              question: "What is the warranty on exterior wall painting?",
              answer: "Basic paints like Ace do not carry a formal brand warranty. Standard paints like Apex come with a 5-year performance warranty, while Luxury systems like Ultima Protek offer up to 10 years of waterproofing and performance warranty from the brand."
            }
          ]} />
        </div>
      </div>
      
      {/* Internal Links for SEO */}
      <div className="bg-white border-t border-royale-accent/40 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold font-serif text-ivory mb-6 text-center">Other Painting Services in {locationName}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={`/services/interior-wall-painting/${locationSlug || ''}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Interior Wall Painting
            </Link>
            <Link to={`/services/wood-metal-painting/${locationSlug || ''}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Wood & Metal Painting
            </Link>
            <Link to={`/services/waterproofing/${locationSlug || ''}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Waterproofing Services
            </Link>
            <Link to={`/painting-services/${locationSlug || ''}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              All Painting Services
            </Link>
          
            <Link to={`/services/industrial-flooring/${locationSlug || ''}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Industrial Flooring
            </Link>
          </div>
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-royale-accent/30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] p-4 lg:hidden z-50 transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex gap-3 max-w-7xl mx-auto">
          <a 
            href={`https://wa.me/918072442930?text=Hi,%20I%20would%20like%20to%20Book%20a%20Free%20Visit%20for%20Exterior%20Painting%20Services%20in%20${locationName}`} 
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
