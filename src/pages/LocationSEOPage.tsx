import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function LocationSEOPage() {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  
  const locationName = locationSlug ? locationSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Your Area';

  return (
    <div className="pt-20 sm:pt-24 pb-12 bg-royale-bg min-h-screen relative text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold font-display text-white mb-6">
          Premium Paint Dealer in {locationName}
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
          Rainbow Paints offers fast delivery and competitive pricing on premium interior and exterior paints, waterproofing, and hardware supplies in {locationName} and surrounding areas.
        </p>
        <Link to="/buy-paint-online" className="px-8 py-3 bg-gold text-black font-bold uppercase rounded hover:bg-gold/90 transition">
          Shop Paints Locally
        </Link>
      </div>
    </div>
  );
}
