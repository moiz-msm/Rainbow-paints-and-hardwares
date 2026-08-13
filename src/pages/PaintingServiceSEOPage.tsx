import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, CheckCircle2, ShieldCheck, Home, Droplet, Brush, IndianRupee, Clock, Navigation, MessageSquare, ArrowRight, Star, PenTool, Calculator } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import ServiceInfo from '../components/ServiceInfo';
import LeadCaptureForm from '../components/LeadCaptureForm';
import { FaqAccordion } from '../components/FaqSection';
import TrustStats from '../components/TrustStats';
import PaintingServiceSeoBlock from '../components/PaintingServiceSeoBlock';

export default function PaintingServiceSEOPage() {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  const isGeneric = !locationSlug;
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

  const serviceSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Home Painting Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Rainbow Paints & Hardwares",
        "image": "https://www.rainbowpaint.in/store-front.webp",
        "telephone": "+918072442930",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "54 Cox Street, Kattoor",
          "addressLocality": "Coimbatore",
          "addressRegion": "Tamil Nadu",
          "postalCode": "641009",
          "addressCountry": "IN"
        }
      },
      "areaServed": {
        "@type": "City",
        "name": locationName
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": "12",
        "highPrice": "80",
        "offerCount": "10"
      }
    };
  }, [locationName]);

  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is the cost of interior wall painting per square foot in ${locationName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Interior painting costs range from ₹12/sq.ft for basic emulsion to ₹35/sq.ft for luxury finishes like Asian Paints Royale, including labor and materials."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide painting contractors with materials?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide end-to-end painting services including genuine materials directly from our store and professional painters."
          }
        },
        {
          "@type": "Question",
          "name": "Is there a warranty on your painting service?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, we provide a 1-year service warranty against peeling and flaking for all our premium painting projects."
          }
        }
      ]
    };
  }, [locationName]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Painting Services', href: '/painting-services' },
  ];
  if (locationSlug) {
    breadcrumbs.push({ label: locationName, href: `/painting-services/${locationSlug}` });
  }

  return (
    <div className="min-h-screen bg-royale-surface pb-24">
      <SEO 
        title={`Professional Painting Services in ${locationName} | Best Painters Near Me`}
        description={`Hire top-rated professional painters in ${locationName}. Rainbow Paints provides hassle-free interior, exterior, wood, and waterproofing services. Enjoy mechanized dust-free tools, 1-year warranty, and direct wholesale pricing. Free estimate!`}
        url={`https://www.rainbowpaint.in/painting-services${locationSlug ? `/${locationSlug}` : ''}`}
        schema={[serviceSchema, faqSchema]}
      />
      
      {/* Hero Section */}
      <div className="bg-royale-surface py-12 lg:py-24 relative overflow-hidden border-b border-royale-accent/40">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-royale-surface/90 mix-blend-multiply z-10" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-royale-surface z-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 relative z-20">
          <div className="mb-6">
             <Breadcrumb items={breadcrumbs} />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 uppercase tracking-tight leading-tight text-ivory">
                Professional Home Painting Services <br/> in <span className="text-gold">{locationName}</span>
              </h1>
              <p className="text-sm sm:text-base text-ivory/80 mb-8 max-w-2xl mx-auto lg:mx-0 font-light italic">
                Professionally trained and officially authorized painting contractors by Berger, Asian, and MRF Paints for interior wall painting, exterior wall painting, and more.
              </p>
              
              <TrustStats />
            </div>
            <div className="w-full lg:w-5/12 xl:w-4/12 relative z-20">
              <LeadCaptureForm locationName={locationName} defaultService="Interior Wall Painting" />
            </div>
          </div>
        </div>
      </div>

      <ServiceInfo serviceType="generic" />
      {/* Internal Links / Areas */}
      <div className="bg-royale-bg border-y border-royale-accent/40 py-16">
        <div className="max-w-7xl mx-auto px-4">
           <h2 className="text-2xl font-serif font-bold text-ivory mb-8 text-center">Areas We Serve in Coimbatore</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
             {[
                'rs-puram-coimbatore',
                'gandhipuram-coimbatore',
                'peelamedu-coimbatore',
                'saibaba-colony-coimbatore',
                'ramanathapuram-coimbatore',
                'saravanampatti-coimbatore',
                'thudiyalur-coimbatore',
                'vadavalli-coimbatore',
                'singanallur-coimbatore',
                'kovaipudur-coimbatore',
                'pollachi',
                'mettupalayam',
                'tiruppur'
             ].map(hood => {
                const isCurrent = locationSlug === hood;
                return (
                  <Link 
                    key={hood}
                    to={`/painting-services/${hood}`} 
                    className={`p-3 rounded-lg border text-center text-sm font-medium transition ${isCurrent ? 'bg-gold/10 border-gold text-gold' : 'bg-white border-royale-accent/50 text-ivory/80 hover:border-gold hover:text-gold'}`}
                  >
                    {hood.replace(/-/g, ' ').replace(' coimbatore', '').replace(/\b\w/g, l => l.toUpperCase())}
                  </Link>
                )
             })}
           </div>
        </div>
      </div>
      
      {/* Service Links */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-serif font-bold text-ivory mb-8 text-center">Our Specialized Painting Services</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={`/services/interior-wall-painting${locationSlug ? `/${locationSlug}` : ""}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Interior Wall Painting
            </Link>
            <Link to={`/services/exterior-wall-painting${locationSlug ? `/${locationSlug}` : ""}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Exterior Wall Painting
            </Link>
            <Link to={`/services/wood-metal-painting${locationSlug ? `/${locationSlug}` : ""}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Wood & Metal Painting
            </Link>
            <Link to={`/services/waterproofing${locationSlug ? `/${locationSlug}` : ""}`} className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider">
              Waterproofing Services
            </Link>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
           <span className="text-gold font-bold tracking-wider text-xs uppercase mb-2 block">Got Questions?</span>
           <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ivory">Frequently Asked Questions</h2>
        </div>
        <FaqAccordion items={[
          {
            question: "Why choose Rainbow Paints over local painters?",
            answer: "Unlike unverified contractors, we provide a dedicated supervisor, use mechanized dust-free sanding, ensure 100% genuine products directly from our wholesale dealership, and back our premium work with a 1-year service warranty."
          },
          {
            question: "How do you calculate the painting cost?",
            answer: "Our site supervisor visits your home and uses precise laser measuring tools to calculate the exact wall area. This ensures you only pay for the actual area painted, eliminating guesswork and overcharging. No hidden fees."
          },
          {
            question: "Do you provide free color consultation?",
            answer: "Yes! We provide free color consultation and digital visualization. Our experts will bring physical shade cards to your home, and we can even apply small sample patches on your walls so you can see the color in your lighting."
          },
          {
            question: "What brands of paint do you use?",
            answer: "As an authorized dealer, we use 100% genuine, unadulterated products from top brands like Asian Paints, Berger Paints, MRF Vapocure, and Dr. Fixit directly from our wholesale store."
          },
          {
            question: "Is 2 coats of paint always necessary?",
            answer: "For standard repainting over a similar shade, 2 coats are enough. However, for fresh walls or switching from a dark to a light shade, 1 coat of primer followed by 2 coats of paint is essential for perfect coverage."
          },
          {
            question: "Do you protect my furniture and floors?",
            answer: "Absolutely. Masking is a standard part of our process. We use professional masking tape and polythene sheets to cover floors, furniture, switchboards, and doors before painting. We also handle post-painting deep cleaning."
          }
        ]} />
      </div>

      <PaintingServiceSeoBlock />
      {/* Sticky Bottom CTA for Mobile */}
      <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-royale-accent/30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] p-4 lg:hidden z-50 transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex gap-3 max-w-7xl mx-auto">
          <a 
            href="https://wa.me/918072442930?text=Hi,%20I%20would%20like%20to%20Book%20a%20Free%20Visit%20for%20Painting%20Services%20in%20Coimbatore" 
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

