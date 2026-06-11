import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function LocationSEOPage() {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  
  const locationName = locationSlug ? locationSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Your Area';

  const localBusinessSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      "name": `Rainbow Paints & Hardwares - Serving ${locationName}`,
      "areaServed": locationName,
      "description": `Premium Paint Dealer in ${locationName}. Providing trusted paints and delivery to ${locationName}.`
    };
  }, [locationName]);

  return (
    <div className="pt-20 sm:pt-24 pb-12 bg-royale-bg min-h-screen relative text-white">
      <SEO 
        title={`Premium Paint Dealer in ${locationName} | Rainbow Paints`}
        description={`Rainbow Paints offers fast delivery and competitive pricing on premium interior and exterior paints in ${locationName}.`}
        url={`https://rainbowpaint.in/store/${locationSlug}`}
        schema={localBusinessSchema}
      />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold font-display text-white mb-6">
          Premium Paint Dealer in {locationName}
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
          Rainbow Paints offers fast delivery and competitive pricing on premium interior and exterior paints, waterproofing, and hardware supplies in {locationName} and surrounding areas.
        </p>
        <Link to="/buy-paint-online" className="px-8 py-3 bg-gradient-gold text-white font-bold uppercase rounded hover:opacity-90 transition">
          Shop Paints Locally
        </Link>
      </div>
    </div>
  );
}
