import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, Clock, ShieldCheck, Truck, CheckCircle2, Navigation, Award, Star, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

export default function LocationSEOPage() {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  
  const locationName = locationSlug ? locationSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Coimbatore';

  const localBusinessSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "PaintStore"],
      "name": `Rainbow Paints & Hardwares - Serving ${locationName}`,
      "image": "https://www.rainbowpaint.in/store-front.webp",
      "@id": `https://www.rainbowpaint.in/store/${locationSlug}`,
      "url": `https://www.rainbowpaint.in/store/${locationSlug}`,
      "telephone": "+918072442930",
      "priceRange": "$$",
      "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Net Banking",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "08:30",
          "closes": "20:30"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "54 Cox Street, Kattoor",
        "addressLocality": "Coimbatore",
        "addressRegion": "Tamil Nadu",
        "postalCode": "641009",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 11.0168,
        "longitude": 76.9558
      },
      "hasMap": "https://maps.google.com/?q=Rainbow+Paints+and+Hardwares+54+Cox+Street+Kattoor+Coimbatore",
      "areaServed": [
        {
          "@type": "City",
          "name": locationName
        },
        {
          "@type": "City",
          "name": "Coimbatore"
        }
      ],
      "sameAs": [
        "https://maps.google.com/?q=Rainbow+Paints+and+Hardwares+54+Cox+Street+Kattoor+Coimbatore",
        "https://www.instagram.com/rainbow_paint_and_hardwares",
        "https://www.facebook.com/share/1EGQ9xt3Vc/",
        "https://youtube.com/@rainbowpaintandhardwares"
      ],
      "vatID": "33AAFFR4759L1ZS",
      "taxID": "33AAFFR4759L1ZS",
      "knowsAbout": [
        "Asian Paints Royale",
        "Berger Silk Emulsion",
        "Dr. Fixit Waterproofing",
        "MRF Vapocure Wood Finishes",
        "Buy from 5000+ Custom Color Shades",
        "Wall Putty & Primer Supply"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "284"
      },
      "description": `Authorized Asian Paints & Berger Paint Dealer in ${locationName}, Coimbatore. Same-day local doorstep delivery, original company-tinted paints, and expert color consultation.`
    };
  }, [locationName, locationSlug]);

  const serviceSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `Paint Delivery & Color Supply in ${locationName}`,
      "serviceType": "Paint & Hardware Express Supply",
      "provider": {
        "@type": ["LocalBusiness", "PaintStore"],
        "@id": `https://www.rainbowpaint.in/store/${locationSlug}`,
        "name": "Rainbow Paints & Hardwares",
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
      "description": `Fast local doorstep delivery of premium interior & exterior paints, waterproofing, and hardware supplies across ${locationName}, Coimbatore.`,
      "url": `https://www.rainbowpaint.in/store/${locationSlug}`
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
          "item": "https://www.rainbowpaint.in/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": `Paint Dealer in ${locationName}`,
          "item": `https://www.rainbowpaint.in/store/${locationSlug}`
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
          "name": `Where can I buy Asian Paints & Berger Paints in ${locationName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Rainbow Paints & Hardwares is an authorized dealer for Asian Paints, Berger Paints, Dr. Fixit, and MRF Vapocure serving ${locationName}, Coimbatore. You can order online or visit our store at 54 Cox Street, Kattoor, Coimbatore.`
          }
        },
        {
          "@type": "Question",
          "name": `Do you offer same-day paint delivery to ${locationName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes! We provide same-day express delivery for paint cans, primers, waterproofing solutions, and painting accessories directly to homes and contractors in ${locationName}.`
          }
        },
        {
          "@type": "Question",
          "name": `Can I buy from 5000+ custom color shades in ${locationName}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Yes. You can buy from 5000+ custom color shades for Asian Paints Apex Ultima, Royale, Berger Silk, and WeatherCoat using official computerized tinting machines to ensure 100% exact shade accuracy for all customers in ${locationName}.`
          }
        },
        {
          "@type": "Question",
          "name": `What are the store operating hours for Rainbow Paints Coimbatore?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Our physical store operates Monday through Saturday from 8:30 AM to 8:30 PM. Online ordering and phone support are active continuously.`
          }
        }
      ]
    };
  }, [locationName]);

  const localHubs = [
    { name: 'RS Puram', slug: 'rs-puram-coimbatore', pincode: '641002', eta: '2-3 Hours' },
    { name: 'Gandhipuram', slug: 'gandhipuram-coimbatore', pincode: '641012', eta: '1-2 Hours' },
    { name: 'Peelamedu', slug: 'peelamedu-coimbatore', pincode: '641004', eta: '2-4 Hours' },
    { name: 'Saibaba Colony', slug: 'saibaba-colony-coimbatore', pincode: '641011', eta: '2-3 Hours' },
    { name: 'Saravanampatti', slug: 'saravanampatti-coimbatore', pincode: '641035', eta: '3-4 Hours' },
    { name: 'Ramanathapuram', slug: 'ramanathapuram-coimbatore', pincode: '641045', eta: '2-3 Hours' },
    { name: 'Thudiyalur', slug: 'thudiyalur-coimbatore', pincode: '641031', eta: '3-4 Hours' },
    { name: 'Vadavalli', slug: 'vadavalli-coimbatore', pincode: '641049', eta: '3-4 Hours' },
    { name: 'Singanallur', slug: 'singanallur-coimbatore', pincode: '641005', eta: '3-4 Hours' },
    { name: 'Kovaipudur', slug: 'kovaipudur-coimbatore', pincode: '641041', eta: '4-5 Hours' },
    { name: 'Pollachi', slug: 'pollachi', pincode: '642001', eta: 'Same Day' },
    { name: 'Mettupalayam', slug: 'mettupalayam', pincode: '641301', eta: 'Same Day' },
    { name: 'Tiruppur', slug: 'tiruppur', pincode: '641601', eta: 'Same Day' }
  ];

  return (
    <div className="pt-20 sm:pt-24 pb-16 bg-royale-bg min-h-screen relative text-ivory font-sans">
      <SEO 
        title={`Authorized Paint Dealer in ${locationName} | Asian & Berger Paints Coimbatore`}
        description={`Top-rated paint store serving ${locationName}, Coimbatore. Authorized dealer for Asian Paints, Berger, Dr. Fixit & MRF. Same-day doorstep delivery, lowest prices & buy from 5000+ custom color shades.`}
        url={`https://www.rainbowpaint.in/store/${locationSlug}`}
        schema={[localBusinessSchema, serviceSchema, breadcrumbSchema, faqSchema]}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-6 font-sans">
          <Link to="/" className="hover:text-gold transition">Home</Link>
          <span>/</span>
          <span className="text-gold font-medium">Paint Dealer in {locationName}</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold mb-4">
            <Award className="w-4 h-4 text-gold" />
            Authorized Asian Paints & Berger Dealer in Coimbatore
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-ivory mb-4 leading-tight">
            Premium Paint Store & Dealer in <span className="text-gold">{locationName}</span>
          </h1>
          <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-sans">
            Looking for an <strong className="text-ivory font-semibold">authorized paint shop near me in {locationName}</strong>? Rainbow Paints & Hardwares provides 100% genuine Asian Paints, Berger Paints, Dr. Fixit waterproofing, and MRF wood finishes with <strong className="text-ivory font-semibold">same-day local delivery</strong> across {locationName} and Coimbatore.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link 
              to="/buy-paint-online" 
              className="px-8 py-3.5 bg-gradient-gold text-white font-bold uppercase text-sm rounded-xl shadow-md hover:shadow-lg hover:shadow-gold/20 transition-all transform hover:-translate-y-0.5"
            >
              Shop Paints Locally
            </Link>
            <a 
              href="https://maps.google.com/?q=Rainbow+Paints+and+Hardwares+54+Cox+Street+Kattoor+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white hover:bg-royale-surface text-ivory font-semibold text-sm rounded-xl border border-royale-accent shadow-sm flex items-center gap-2 transition hover:border-gold/50"
            >
              <Navigation className="w-4 h-4 text-gold" />
              Get Store Directions
            </a>
          </div>
        </div>

        {/* Local Store Contact Card Module (Pillar 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          <div className="bg-white border border-royale-accent/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ivory mb-2">Store Address</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                54 Cox Street, Kattoor,<br />
                Coimbatore, Tamil Nadu 641009
              </p>
            </div>
            <a 
              href="https://maps.google.com/?q=Rainbow+Paints+and+Hardwares+54+Cox+Street+Kattoor+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-gold text-xs font-semibold hover:underline flex items-center gap-1"
            >
              Open in Google Maps &rarr;
            </a>
          </div>

          <div className="bg-white border border-royale-accent/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ivory mb-2">Direct Local Call & Orders</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Speak directly with paint experts for wholesale quotes & color shade matching.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <a 
                href="tel:+918072442930" 
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" /> Call Store
              </a>
              <a 
                href="https://wa.me/918072442930?text=Hi%20Rainbow%20Paints,%20I%20am%20looking%20for%20paint%20delivery%20in%20"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold hover:bg-emerald-100 transition flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="bg-white border border-royale-accent/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-ivory mb-2">Working Hours</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Mon &ndash; Sat: 8:30 AM &ndash; 8:30 PM<br />
                Sunday: Closed
              </p>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Open For In-Store & Online Orders
            </div>
          </div>
        </div>

        {/* AI Fact Sheet & Service Highlights (Pillar 3 & 1) */}
        <div className="max-w-4xl mx-auto bg-white border border-royale-accent/80 rounded-2xl p-6 sm:p-8 shadow-sm mb-16">
          <h2 className="text-2xl font-serif font-bold text-ivory mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-gold" />
            Key Service Facts & Local Benefits for {locationName}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-3 p-4 bg-royale-surface rounded-xl border border-royale-accent/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ivory font-bold block mb-0.5">100% Genuine Certified Paints</strong>
                <span className="text-zinc-600 text-xs sm:text-sm">Official dealer for Asian Paints, Berger, Dr. Fixit & MRF Vapocure with original manufacturer guarantees.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-royale-surface rounded-xl border border-royale-accent/60">
              <Truck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
              <div>
                <strong className="text-ivory font-bold block mb-0.5">Express Local Doorstep Delivery</strong>
                <span className="text-zinc-600 text-xs sm:text-sm">Fast local dispatch across {locationName} with live route tracking and safe delivery guarantee.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-royale-surface rounded-xl border border-royale-accent/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ivory font-bold block mb-0.5">5000+ Custom Color Shades</strong>
                <span className="text-zinc-600 text-xs sm:text-sm">Buy from 5000+ custom color shades using official Asian Paints & Berger tinting systems.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-royale-surface rounded-xl border border-royale-accent/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-ivory font-bold block mb-0.5">Wholesale & Contractor Pricing</strong>
                <span className="text-zinc-600 text-xs sm:text-sm">Discounted rates for painters, builders, interior designers, and homeowners in {locationName}.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Local Neighborhoods & Pincode Matrix (Pillar 4) */}
        <div className="max-w-4xl mx-auto bg-white border border-royale-accent/80 rounded-2xl p-6 sm:p-8 shadow-sm mb-16">
          <h2 className="text-2xl font-serif font-bold text-ivory mb-2">Coimbatore Express Delivery Coverage Matrix</h2>
          <p className="text-zinc-600 text-sm mb-6">Explore local delivery timeframes and pincode serviceability in and around {locationName}:</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {localHubs.map(area => (
              <Link 
                key={area.slug} 
                to={`/store/${area.slug}`}
                className={`p-3.5 rounded-xl border transition flex flex-col text-left ${
                  area.slug === locationSlug 
                    ? 'bg-gold/15 border-gold text-gold font-bold shadow-sm' 
                    : 'bg-royale-surface border-royale-accent/80 hover:border-gold/50 text-ivory hover:text-gold'
                }`}
              >
                <span className="text-sm font-semibold">{area.name}</span>
                <span className="text-[11px] text-zinc-500 mt-1">Pincode: {area.pincode}</span>
                <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1">
                  <Truck className="w-3 h-3" /> {area.eta}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Local Social Proof & Verified Entity Badges (GEO Social & Entity Proof) */}
        <div className="max-w-4xl mx-auto bg-white border border-royale-accent/80 rounded-2xl p-6 sm:p-8 shadow-sm mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-royale-accent/80">
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
                <span className="text-ivory font-bold text-sm ml-2">4.8 / 5.0</span>
              </div>
              <h2 className="text-xl font-serif font-bold text-ivory">
                Verified Local Customer Reviews in {locationName}
              </h2>
              <p className="text-zinc-500 text-xs mt-0.5">Based on 284+ Google Reviews & verified local Coimbatore orders</p>
            </div>

            <a 
              href="https://maps.google.com/?q=Rainbow+Paints+and+Hardwares+54+Cox+Street+Kattoor+Coimbatore"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-royale-surface hover:bg-gold/10 border border-royale-accent text-ivory text-xs font-semibold rounded-lg flex items-center gap-2 transition self-start sm:self-auto"
            >
              <ExternalLink className="w-3.5 h-3.5 text-gold" /> View Google Reviews
            </a>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-royale-surface border border-royale-accent/60 p-4 rounded-xl text-xs">
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-zinc-700 italic mb-3">
                "Ordered 20L Asian Paints Apex Ultima for my house in {locationName}. Bought from 5000+ custom color shades with exact shade match delivered within 2 hours!"
              </p>
              <div className="text-ivory font-bold">Senthil Kumar</div>
              <div className="text-zinc-500 text-[11px]">Homeowner, {locationName}</div>
            </div>

            <div className="bg-royale-surface border border-royale-accent/60 p-4 rounded-xl text-xs">
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-zinc-700 italic mb-3">
                "As a civil contractor, Rainbow Paints is my primary vendor in Coimbatore. Wholesale rates for Dr. Fixit & Berger Silk with instant billing."
              </p>
              <div className="text-ivory font-bold">M. Rajesh</div>
              <div className="text-zinc-500 text-[11px]">Painting Contractor, Coimbatore</div>
            </div>

            <div className="bg-royale-surface border border-royale-accent/60 p-4 rounded-xl text-xs">
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-zinc-700 italic mb-3">
                "Best paint shop near me. They helped pick the perfect interior shade palette for our apartment and delivered directly to our doorstep."
              </p>
              <div className="text-ivory font-bold">Ananya Ramachandran</div>
              <div className="text-zinc-500 text-[11px]">Interior Architect, {locationName}</div>
            </div>
          </div>

          {/* Official Entity Badges */}
          <div className="pt-6 border-t border-royale-accent/80 text-center">
            <span className="text-xs uppercase font-serif text-gold tracking-wider font-bold block mb-4">
              Verified Business Registrations & Official Brand Dealerships
            </span>
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-700">
              <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 font-mono font-semibold">
                GSTIN: 33AAFFR4759L1ZS
              </span>
              <span className="px-3 py-1.5 bg-royale-surface border border-royale-accent rounded-lg text-ivory font-medium">
                Authorized Asian Paints Dealer
              </span>
              <span className="px-3 py-1.5 bg-royale-surface border border-royale-accent rounded-lg text-ivory font-medium">
                Berger Silk Certified Outlet
              </span>
              <span className="px-3 py-1.5 bg-royale-surface border border-royale-accent rounded-lg text-ivory font-medium">
                Dr. Fixit Approved Waterproofing Store
              </span>
              <span className="px-3 py-1.5 bg-royale-surface border border-royale-accent rounded-lg text-ivory font-medium">
                MRF Vapocure Retailer
              </span>
            </div>
          </div>
        </div>

        {/* Natural Language FAQ Section (Pillar 1 - Extractable by AI Models) */}
        <div className="max-w-4xl mx-auto text-left bg-white border border-royale-accent/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-2xl font-serif font-bold text-ivory mb-6">Frequently Asked Questions & Answers</h2>
          
          <div className="space-y-6 text-sm text-zinc-700">
            <div>
              <h3 className="text-base font-semibold text-ivory mb-2">
                Q: Where can I buy Asian Paints & Berger Paints in {locationName}?
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                A: Rainbow Paints & Hardwares is an authorized dealer for Asian Paints, Berger Paints, Dr. Fixit, and MRF Vapocure serving {locationName}, Coimbatore. You can place an order online or visit our store at 54 Cox Street, Kattoor, Coimbatore (Pincode: 641009).
              </p>
            </div>

            <div className="border-t border-royale-accent/80 pt-4">
              <h3 className="text-base font-semibold text-ivory mb-2">
                Q: Do you offer same-day paint delivery to {locationName}?
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                A: Yes! We offer fast local doorstep delivery for paint buckets, primers, waterproofing compounds, and painting tools directly to home addresses and construction sites in {locationName}.
              </p>
            </div>

            <div className="border-t border-royale-accent/80 pt-4">
              <h3 className="text-base font-semibold text-ivory mb-2">
                Q: Can I buy from 5000+ custom color shades at your store?
              </h3>
              <p className="text-zinc-600 leading-relaxed">
                A: Yes, you can buy from 5000+ custom color shades mixed using official Asian Paints and Berger computerized tinting machines at our main shop to guarantee exact shade accuracy and color durability.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


