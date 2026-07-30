import React, { useEffect, useState, useMemo } from "react";
import { LivingRoomSvg, BedroomSvg } from "../components/RoomSvgs";
import { useParams, Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import { shadeService, Shade } from "../services/shadeService";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Droplet,
  Store,
} from "lucide-react";

export default function ColorDetailsPage() {
  const { brandSlug, familySlug, shadeSlug } = useParams<{ brandSlug?: string; familySlug?: string; shadeSlug: string }>();
  const navigate = useNavigate();
  const [shade, setShade] = useState<Shade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShade() {
      setLoading(true);
      if (shadeSlug) {
        const found = await shadeService.getShadeBySlug(shadeSlug);
        if (found) {
          setShade(found);
          const properUrl = shadeService.getShadeUrl(found);
          if (window.location.pathname !== properUrl) {
            navigate(properUrl, { replace: true });
          }
        } else {
          setShade(null);
        }
      }
      setLoading(false);
    }
    loadShade();
  }, [shadeSlug, navigate]);

  // Determine complementary and similar colors (mock logic or simple family filtering could be used)
  const [similarShades, setSimilarShades] = useState<Shade[]>([]);
  useEffect(() => {
    if (shade) {
      shadeService
        .getShades({ brand: shade.brand, family: shade.family, limit: 6 })
        .then((res) => {
          setSimilarShades(
            res.shades.filter((s) => s.id !== shade.id).slice(0, 5),
          );
        });
    }
  }, [shade]);

  const seoTitle = shade ? `${shade.name} ${shade.shadeCode} | ${shade.brand} Colour Shade Card 2026` : "Paint Shade Details | Rainbow Paints";
  const seoDescription = shade ? `${shade.name} ${shade.shadeCode} is one of the most loved shades in the ${shade.brand} palette. Visualize it in real homes, compare with similar tones, and get expert tips.` : "Explore a wide variety of paint shades from top brands.";

  const shadeImageUrl = shade ? `https://placehold.co/1200x630/${shade.hex.replace('#', '')}/${shade.hex.replace('#', '')}.png?text=%20` : undefined;

  const webPageSchema = useMemo(() => {
    if (!shade) return null;
    const shadeUrl = `https://www.rainbowpaint.in/color/${shade.shadeCode}`;
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": `${shade.name} ${shade.shadeCode} - ${shade.brand} Colour Palette`,
      "image": shadeImageUrl ? [shadeImageUrl] : [],
      "description": seoDescription,
      "url": shadeUrl,
      "publisher": {
        "@type": ["LocalBusiness", "PaintStore", "Organization"],
        "@id": "https://www.rainbowpaint.in/#organization",
        "name": "Rainbow Paints & Hardwares",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "54 Cox Street, Kattoor",
          "addressLocality": "Coimbatore",
          "addressRegion": "Tamil Nadu",
          "postalCode": "641009",
          "addressCountry": "IN"
        }
      },
      "mainEntity": {
        "@type": "CreativeWork",
        "name": `${shade.name} ${shade.shadeCode}`,
        "description": `${shade.brand} color shade ${shade.name} (${shade.shadeCode}). Hex code: ${shade.hex}, RGB: ${shade.rgb}.`
      }
    };
  }, [shade, seoDescription, shadeImageUrl]);

  const faqSchema = useMemo(() => {
    if (!shade) return null;
    const ans = getFaqAnswers(shade);
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What color is ${shade.name} (${shade.shadeCode}) by ${shade.brand}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${shade.name} (${shade.shadeCode}) is a beautiful ${shade.family} color by ${shade.brand}. The HEX color code is ${shade.hex}, and its RGB value is RGB(${shade.rgb}).`
          }
        },
        {
          "@type": "Question",
          "name": `Which room walls are best suited for ${shade.name} paint?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": ans.q2
          }
        },
        {
          "@type": "Question",
          "name": `Which paint finishes are available for ${shade.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `${shade.name} is recommended for a ${shade.finish} finish, and is available in multiple interior and exterior emulsions (like Royale, Easy Clean, and Apex). Coverage usually ranges from 120-140 sq.ft/liter for two coats.`
          }
        },
        {
          "@type": "Question",
          "name": `Which colour shades pair well with ${shade.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": ans.q4
          }
        }
      ]
    };
  }, [shade]);

  const breadcrumbSchema = useMemo(() => {
    if (!shade) return null;
    const properUrl = `https://www.rainbowpaint.in${shadeService.getShadeUrl(shade)}`;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.rainbowpaint.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Colors",
          item: "https://www.rainbowpaint.in/visualizer",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: shade.brand,
          item: `https://www.rainbowpaint.in/brands/${shade.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: shade.family || "Colors",
          item: "https://www.rainbowpaint.in/visualizer", // We don't have a family-specific page yet, so link back to visualizer
        },
        {
          "@type": "ListItem",
          position: 5,
          name: `${shade.name} ${shade.shadeCode}`,
          item: properUrl,
        },
      ],
    };
  }, [shade]);


  // Dynamic images based on shade name hash
  ;

  function getRecommendedProducts(brand) {
    const b = brand.toLowerCase();
    if (b.includes('asian')) {
      return [
        { name: 'Royale Glitz', desc: 'Ultra matt luxury interior emulsion with crack-free performance. Perfect for achieving a rich look.', link: '/p/royale-glitz-ultra-matt' },
        { name: 'Apex Ultima', desc: 'High-performance exterior emulsion to protect your walls from harsh weather and UV fading.', link: '/p/apex-ultima' },
        { name: 'Apcolite Premium', desc: 'Rich, smooth finish for interior walls with long-lasting performance.', link: '/p/apcolite-premium-emulsion' }
      ];
    }
    if (b.includes('berger')) {
      return [
        { name: 'Silk Glamor', desc: 'Luxury interior emulsion with a high sheen finish that makes colors come alive.', link: '/p/silk-glamor-high-sheen' },
        { name: 'Easy Clean', desc: 'Washable interior paint that keeps your walls looking fresh and bright for years.', link: '/p/easy-clean-silky-touch' },
        { name: 'WeatherCoat Anti Dust', desc: 'Exterior paint with Dust Guard technology that does not allow dust to settle.', link: '/p/weathercoat-anti-dust' }
      ];
    }
    if (b.includes('mrf')) {
      return [
        { name: 'MRF Aquafresh', desc: 'Premium interior emulsion offering excellent washability and stain resistance.', link: '/p/mrf-aquafresh-interior-emulsion' },
        { name: 'MRF WoodCoat', desc: 'High quality PU finish for wood surfaces to complement your wall colors.', link: '/p/woodcoat-italia-pu-finish' },
        { name: 'MRF Wall Putty', desc: 'Super fine wall putty for a perfectly smooth base before painting.', link: '/p/mrf-acrylic-super-fine-wall-putty' }
      ];
    }
    return [
      { name: 'Royale Glitz', desc: 'Ultra matt luxury interior emulsion with crack-free performance.', link: '/p/royale-glitz-ultra-matt' },
      { name: 'Easy Clean', desc: 'Washable interior paint that keeps walls looking fresh and bright for years.', link: '/p/easy-clean-silky-touch' },
      { name: 'Apex Ultima', desc: 'High-performance exterior emulsion to protect from harsh weather.', link: '/p/apex-ultima' }
    ];
  };

  
  
  function getShadeCharacteristics(shade) {
    if (!shade) return { lrv: 0, undertone: "Neutral", suitedFor: "Interior Walls" };
    
    const hex = shade.hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    
    // Approximate LRV (0-100) using relative luminance
    const rs = r / 255;
    const gs = g / 255;
    const bs = b / 255;
    
    // Convert to linear RGB
    const rl = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
    const gl = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
    const bl = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
    
    const L = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
    
    // Convert luminance to perceived lightness (L*) for a more accurate LRV representation 0-100
    const lrv = Math.max(0, Math.min(100, Math.round(L * 100)));
    
    let undertone = "Neutral";
    if (r > g + 15 && r > b + 15) undertone = "Warm (Red/Pink)";
    else if (g > r + 15 && g > b + 15) undertone = "Cool (Green)";
    else if (b > r + 15 && b > g + 15) undertone = "Cool (Blue)";
    else if (r > b + 15 && g > b + 15 && Math.abs(r - g) < 20) undertone = "Warm (Yellow/Gold)";
    else if (r > g && g > b && r - b > 30) undertone = "Warm (Orange/Peach)";
    else if (b > r && b > g && Math.abs(r - g) < 15) undertone = "Cool (Purple)";
    
    let suitedFor = "Interior Walls";
    if (lrv > 70) suitedFor = "Living Rooms, Hallways, Ceilings";
    else if (lrv < 30) suitedFor = "Accent Walls, Home Theaters";
    else suitedFor = "Bedrooms, Dining Rooms, Exteriors";

    return { lrv, undertone, suitedFor };
  }

  function getDescription(shade) {
    if (!shade) return "";
    const family = (shade.family || "color").toLowerCase();
    
    // Lightness check
    const hex = shade.hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    const isLight = brightness > 180;
    const isDark = brightness < 100;

    let trait = "versatile";
    if (isLight) trait = "bright and airy";
    else if (isDark) trait = "deep and sophisticated";
    else trait = "balanced and inviting";

    let vibe = "welcoming atmosphere";
    let pairing = "wooden furniture and subtle metallic accents";

    if (family.includes("blue")) {
      vibe = "calming, serene environment";
      pairing = "crisp whites and warm wood tones";
    } else if (family.includes("green") || family.includes("teal")) {
      vibe = "refreshing, nature-inspired feel";
      pairing = "natural textures and earthy neutrals";
    } else if (family.includes("red") || family.includes("pink") || family.includes("magenta")) {
      vibe = "vibrant and energetic space";
      pairing = "muted neutrals and gold accents";
    } else if (family.includes("yellow") || family.includes("orange") || family.includes("gold")) {
      vibe = "cheerful and warm ambiance";
      pairing = "cool grays and soft whites";
    } else if (family.includes("grey") || family.includes("gray") || family.includes("neutral") || family.includes("brown") || family.includes("beige")) {
      vibe = "modern, sophisticated look";
      pairing = "bold accent colors and sleek furnishings";
    } else if (family.includes("white") || family.includes("off-white") || family.includes("cream")) {
      vibe = "clean and spacious feel";
      pairing = "virtually any color palette";
    } else if (family.includes("purple") || family.includes("violet")) {
      vibe = "luxurious and creative mood";
      pairing = "silver accents and soft greys";
    }

    return `${shade.name} (${shade.shadeCode}) is a ${trait} ${family} shade that brings a distinct character to your space. It works wonderfully to create a ${vibe} in your home. This color pairs exceptionally well with ${pairing}, making it a highly adaptable choice from the ${shade.brand} collection.`;
  };

  
  function getFaqAnswers(shade) {
    if (!shade) return { q2: "", q3: "", q4: "" };
    
    const hex = shade.hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const isLight = brightness > 150;
    
    let rooms = isLight 
      ? "It is highly recommended for living rooms, puja rooms, and hallways as it reflects light beautifully, but also works nicely as a calming backdrop in bedrooms."
      : "Darker shades like this add depth and drama. It is highly recommended for bedrooms, home theaters, accent walls, or dining rooms to create an intimate atmosphere.";
      
    let pairings = isLight
      ? "crisp whites, contrasting dark tones, and natural wood or brass accents"
      : "soft whites, warm metallics like gold or copper, and light oak or ash wood";

    let family = (shade.family || "").toLowerCase();
    if (family.includes("blue") || family.includes("green")) {
      pairings = "warm neutrals, natural timber, and metallic accents";
    } else if (family.includes("red") || family.includes("yellow") || family.includes("orange")) {
      pairings = "cool greys, crisp whites, and muted earth tones";
    }

    return {
      q2: `${isLight ? 'Light' : 'Deep'} shades like ${shade.name} make spaces feel ${isLight ? 'welcoming and spacious' : 'cozy and sophisticated'}. ${rooms}`,
      q4: `${shade.name} pairs beautifully with ${pairings}. You can try our Color Visualizer to see combinations.`
    };
  };

    const faqAns = getFaqAnswers(shade);
  const char = getShadeCharacteristics(shade);
  const recommended = shade ? getRecommendedProducts(shade.brand) : [];

  const fallbackTitle = (shadeSlug || "Color").replace(/-/g, ' ').toUpperCase();

  if (loading) {
    return (
      <div className="pt-24 pb-12 bg-royale-bg min-h-screen flex items-center justify-center">
        <SEO 
          type="product"
          title={`${fallbackTitle} - Paint Color Shade | Buy Online`}
          description={`Explore ${fallbackTitle} paint color shade. Get matching products and buy online at wholesale prices.`}
          url={`https://www.rainbowpaint.in/color/${shadeSlug || ''}`}
        />
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!shade) {
    return (
      <div className="pt-24 pb-12 bg-royale-bg min-h-screen flex flex-col items-center justify-center text-ivory">
        <h1 className="text-3xl font-display mb-4">Shade Not Found</h1>
        <p className="text-zinc-400 mb-8">
          The color code or shade name you entered does not exist in our catalog.
        </p>
        <Link
          to="/visualizer"
          className="px-6 py-2 bg-gradient-gold text-white font-bold rounded"
        >
          Go to Visualizer
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-24 pb-12 bg-royale-bg min-h-screen text-ivory relative">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        image={shadeImageUrl}
        url={`https://www.rainbowpaint.in${shadeService.getShadeUrl(shade)}`}
        type="website"
        schema={[webPageSchema, breadcrumbSchema, faqSchema].filter(Boolean)}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center text-xs sm:text-sm text-ivory/60 mb-8 space-x-1 sm:space-x-2">
          <Link to="/" className="hover:text-gold transition whitespace-nowrap">Home</Link>
          <ChevronRight size={14} className="flex-shrink-0" />
          <Link to="/visualizer" className="hover:text-gold transition whitespace-nowrap">Colors</Link>
          <ChevronRight size={14} className="flex-shrink-0" />
          <Link to={`/brands/${shade.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="hover:text-gold transition whitespace-nowrap">{shade.brand}</Link>
          <ChevronRight size={14} className="flex-shrink-0" />
          <span className="text-ivory font-medium whitespace-nowrap">{shade.family || "Colors"}</span>
          <ChevronRight size={14} className="flex-shrink-0" />
          <span className="text-gold font-medium whitespace-nowrap">{shade.name} {shade.shadeCode}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Color Display */}
          <div className="space-y-6">
            <div
              className="w-full aspect-square md:aspect-[4/3] rounded-2xl shadow-2xl relative border border-zinc-200/50 overflow-hidden"
              style={{ backgroundColor: shade.hex }}
            >
              {/* Image specifically for Google Images crawler to pick up the shade color visually */}
              {shadeImageUrl && (
                <img 
                  src={shadeImageUrl} 
                  alt={`${shade.name} ${shade.shadeCode} - ${shade.brand} Color Shade`} 
                  className="absolute inset-0 w-full h-full object-cover opacity-0"
                  loading="eager"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-2xl opacity-50 mix-blend-overlay pointer-events-none"></div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-royale-surface border border-royale-accent rounded-xl p-4">
                <p className="text-ivory/60 text-sm mb-1 uppercase tracking-wider">
                  HEX
                </p>
                <p className="font-mono text-lg text-ivory">{shade.hex}</p>
              </div>
              <div className="flex-1 bg-royale-surface border border-royale-accent rounded-xl p-4">
                <p className="text-ivory/60 text-sm mb-1 uppercase tracking-wider">
                  RGB
                </p>
                <p className="font-mono text-lg text-ivory">{shade.rgb}</p>
              </div>
            </div>
          </div>

          {/* Color Info */}
          <div>
            <div className="mb-2 inline-flex items-center space-x-2 px-3 py-1 bg-royale-surface border border-royale-accent rounded-full text-xs font-medium text-gold uppercase tracking-wider">
              <Droplet size={12} className="mr-1" />
              {shade.brand}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-ivory mb-2 tracking-tight">
              {shade.name}
            </h1>
            <p className="text-2xl font-mono text-ivory/70 mb-8">
              Code: {shade.shadeCode}
            </p>

            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 mb-8">
              <p className="text-ivory/80 text-sm leading-relaxed mb-6 font-light">
                {getDescription(shade)}
              </p>
              <h2 className="text-xl font-serif text-ivory mb-4 border-b border-royale-accent pb-4">
                Color Details
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-ivory/60">Brand</span>
                  <span className="font-semibold text-ivory">{shade.brand}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-ivory/60">Color Family</span>
                  <span className="font-semibold text-ivory capitalize">{shade.family}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-ivory/60">Light Reflectance Value (LRV)</span>
                  <span className="font-semibold text-ivory">{char.lrv}%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-ivory/60">Color Undertone</span>
                  <span className="font-semibold text-ivory">{char.undertone}</span>
                </li>
                <li className="flex justify-between items-center text-right">
                  <span className="text-ivory/60">Best Suited For</span>
                  <span className="font-semibold text-ivory max-w-[60%]">{char.suitedFor}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-ivory/60">Recommended Finish</span>
                  <span className="font-semibold text-ivory">{shade.finish}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                to="/buy-paint-online"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-gold hover:opacity-90 text-white px-6 py-4 rounded-xl font-bold uppercase transition shadow-sm"
              >
                <Store size={20} />
                <span>Buy Paints In This Shade</span>
              </Link>
              <Link
                to={`/visualizer?color=${shade.hex.replace("#", "")}`}
                className="w-full flex items-center justify-center space-x-2 bg-royale-surface hover:bg-royale-accent/60 border border-royale-accent text-ivory px-6 py-4 rounded-xl font-semibold transition"
              >
                <span>View in Visualizer</span>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-royale-accent">
              <h3 className="text-lg font-serif mb-4 flex items-center text-ivory">
                <CheckCircle2 className="text-gold mr-2" size={18} />
                Available at Rainbow Paints, Coimbatore
              </h3>
              <p className="text-ivory/70 text-sm leading-relaxed">
                This exact shade ({shade.shadeCode}) can be tinted on-demand
                using our fully automated tinting machines. Visit our store at
                Kattoor, Coimbatore or order online for fast local delivery.
              </p>
            </div>
          </div>
        </div>


        {/* Room Inspiration */}
        <div className="mt-16 pt-16 border-t border-royale-accent">
          <h2 className="text-2xl font-display font-medium text-ivory mb-8">
            Room Inspiration with <span className="text-gradient italic">{shade.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white group">
              <LivingRoomSvg wallColor={shade.hex} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <h3 className="text-white font-serif text-xl mb-1">Living Room</h3>
                <p className="text-white/90 text-sm font-light">See how {shade.name} transforms the main living space with a {shade.finish.toLowerCase()} finish.</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white group">
              <BedroomSvg wallColor={shade.hex} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <h3 className="text-white font-serif text-xl mb-1">Bedroom</h3>
                <p className="text-white/90 text-sm font-light">Create a calming atmosphere using {shade.name} on your bedroom walls.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16 pt-16 border-t border-royale-accent">
          <h2 className="text-2xl font-display font-medium text-ivory mb-8">
            Recommended Products for <span className="text-gradient italic">{shade.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommended.map((prod, i) => (
              <Link key={i} to={prod.link} className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/50 transition-colors flex flex-col group">
                <h3 className="font-serif text-gold text-lg mb-2">{prod.name}</h3>
                <p className="text-ivory/70 text-sm mb-4 flex-grow">{prod.desc}</p>
                <div className="text-xs font-semibold text-ivory uppercase tracking-wider group-hover:text-gold transition-colors">View Product &rarr;</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Color FAQs for AEO */}
        <div className="mt-16 pt-16 border-t border-royale-accent">
          <h2 className="text-2xl font-display font-medium text-ivory mb-8">
            Frequently Asked Questions about <span className="text-gradient italic">{shade.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What color is {shade.name} ({shade.shadeCode}) by {shade.brand}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {shade.name} ({shade.shadeCode}) is a beautiful {shade.family} color by {shade.brand}. The HEX color code is {shade.hex}, and its RGB value is RGB({shade.rgb}).
              </p>
            </div>
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">Which room walls are best suited for {shade.name} paint?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {faqAns.q2}
              </p>
            </div>
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">Which paint finishes are available for {shade.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {shade.name} is recommended for a {shade.finish} finish, and is available in multiple interior and exterior emulsions (like Royale, Easy Clean, and Apex). Coverage usually ranges from 120-140 sq.ft/liter for two coats.
              </p>
            </div>
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">Which colour shades pair well with {shade.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {faqAns.q4}
              </p>
            </div>
          </div>
        </div>

        {/* Similar Shades */}
        {similarShades.length > 0 && (
          <div className="mt-16 pt-16 border-t border-royale-accent">
            <h2 className="text-2xl font-display font-medium text-ivory mb-8">
              Similar Shades in {shade.brand}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {similarShades.map((s) => (
                <Link
                  key={s.id}
                  to={shadeService.getShadeUrl(s)}
                  className="group"
                >
                  <div
                    className="w-full aspect-square rounded-xl shadow-md border border-royale-accent mb-3 transition-transform group-hover:-translate-y-1"
                    style={{ backgroundColor: s.hex }}
                  />
                  <p className="text-sm font-semibold text-ivory group-hover:text-gold transition truncate">
                    {s.name}
                  </p>
                  <p className="text-xs font-mono text-ivory/60">
                    {s.shadeCode}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
