import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function LocationSEOPage() {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  
  const locationName = locationSlug ? locationSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Your Area';

  const localBusinessSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "PaintStore"],
      "name": `Rainbow Paints & Hardwares - Serving ${locationName}`,
      "image": "https://rainbowpaint.in/store-front.webp",
      "@id": `https://rainbowpaint.in/store/${locationSlug}`,
      "url": `https://rainbowpaint.in/store/${locationSlug}`,
      "telephone": "+91 94432 30510",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "364, Dr Nanjappa Rd",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "postalCode": "641018",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 11.0168,
        "longitude": 76.9558
      },
      "areaServed": {
        "@type": "City",
        "name": locationName
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "284"
      },
      "description": `Premium Paint Dealer in ${locationName}. Providing trusted paints and delivery to ${locationName}.`,
      "priceRange": "$$"
    };
  }, [locationName, locationSlug]);

  const serviceSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Paint Delivery & Supply in ${locationName}`,
      "serviceType": "Paint and Hardware Supply",
      "provider": {
        "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "PaintStore"],
        "name": "Rainbow Paints & Hardwares",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "364, Dr Nanjappa Rd",
          "addressLocality": "Coimbatore",
          "addressRegion": "Tamil Nadu",
          "postalCode": "641018",
          "addressCountry": "IN"
        }
      },
      "areaServed": {
        "@type": "City",
        "name": locationName
      },
      "description": `Fast local doorstep delivery of premium paints and hardware across ${locationName}, Coimbatore.`,
      "url": `https://rainbowpaint.in/store/${locationSlug}`
    };
  }, [locationName, locationSlug]);

  const breadcrumbSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://rainbowpaint.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": `Paint Dealer in ${locationName}`,
          "item": `https://rainbowpaint.in/store/${locationSlug}`
        }
      ]
    };
  }, [locationName, locationSlug]);

  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Do you deliver paints to ${locationName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes, Rainbow Paints & Hardwares provides fast doorstep delivery of premium paints to ${locationName} and surrounding areas.`
          }
        },
        {
          "@type": "Question",
          "name": `What paint brands are available in ${locationName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `We offer major brands including Asian Paints, Berger Paints, Dr. Fixit, and MRF Vapocure to our customers in ${locationName}.`
          }
        }
      ]
    };
  }, [locationName]);

  return (
    <div className="pt-20 sm:pt-24 pb-12 bg-royale-bg min-h-screen relative text-white">
      <SEO 
        title={`Premium Paint Dealer in ${locationName} | Rainbow Paints`}
        description={`Looking for a paint store near me? Rainbow Paints is your trusted paint dealer in ${locationName}. Buy paints online with fast local delivery.`}
        url={`https://rainbowpaint.in/store/${locationSlug}`}
        schema={[localBusinessSchema, serviceSchema, breadcrumbSchema, faqSchema]}
      />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold font-display text-white mb-6">
          Premium Paint Dealer in {locationName}
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-8 text-lg">
          Looking for a <strong>paint store near me</strong> or the best <strong>paint dealer near me</strong>? Rainbow Paints offers fast delivery and competitive pricing on premium interior and exterior paints, waterproofing, and hardware supplies in {locationName} and surrounding areas. As a trusted <strong>Asian Paints dealer {locationName}</strong> and authorized <strong>Berger dealer near me</strong>, we ensure genuine products at wholesale prices.
        </p>
        <Link to="/buy-paint-online" className="px-8 py-3 bg-gradient-gold text-white font-bold uppercase rounded hover:opacity-90 transition inline-block">
          Shop Paints Locally
        </Link>

        <div className="mt-16 text-left max-w-4xl mx-auto bg-black/20 p-8 border border-white/5 rounded-2xl">
          <h2 className="text-2xl font-serif text-gold mb-4">Your Local {locationName} Paint Experts</h2>
          <p className="text-zinc-400 mb-4 leading-relaxed">
            Whether you're painting a new home or renovating an office, finding the right <strong>paint shop in {locationName}</strong> makes all the difference. Our extensive catalog includes top-tier products from Dr. Fixit, MRF Vapocure, Asian Paints, and Berger. 
          </p>
          <ul className="list-disc pl-5 text-zinc-400 space-y-2 mb-6">
            <li>Authorized <strong>Asian Paints dealer Coimbatore</strong> & {locationName}</li>
            <li>Genuine <strong>Berger dealer near me</strong> with complete tinting machines</li>
            <li>Same-day or next-day local delivery across {locationName}</li>
            <li>Expert color consultation and waterproofing advice</li>
          </ul>
        </div>

        <div className="mt-16 text-left max-w-4xl mx-auto bg-black/20 p-8 border border-white/5 rounded-2xl">
          <h2 className="text-2xl font-serif text-gold mb-4">Areas We Serve in & Around Coimbatore</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            {[
              { name: 'RS Puram', slug: 'rs-puram-coimbatore' },
              { name: 'Gandhipuram', slug: 'gandhipuram-coimbatore' },
              { name: 'Peelamedu', slug: 'peelamedu-coimbatore' },
              { name: 'Saibaba Colony', slug: 'saibaba-colony-coimbatore' },
              { name: 'Ramanathapuram', slug: 'ramanathapuram-coimbatore' },
              { name: 'Saravanampatti', slug: 'saravanampatti-coimbatore' },
              { name: 'Thudiyalur', slug: 'thudiyalur-coimbatore' },
              { name: 'Vadavalli', slug: 'vadavalli-coimbatore' },
              { name: 'Singanallur', slug: 'singanallur-coimbatore' },
              { name: 'Kovaipudur', slug: 'kovaipudur-coimbatore' },
              { name: 'Pollachi', slug: 'pollachi' },
              { name: 'Mettupalayam', slug: 'mettupalayam' },
              { name: 'Tiruppur', slug: 'tiruppur' },
            ].map(area => (
              <Link 
                key={area.slug} 
                to={`/store/${area.slug}`}
                className="px-4 py-2 bg-white/5 hover:bg-gold/20 hover:text-gold border border-white/10 rounded-full text-sm transition-colors"
              >
                {area.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

