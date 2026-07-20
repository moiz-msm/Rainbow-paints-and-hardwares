import React, { useEffect, useState, useMemo } from "react";
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

  const seoTitle = shade
    ? `${shade.name} (${shade.shadeCode}) - ${shade.brand} Colour | Rainbow Paints`
    : "Paint Shade Details | Rainbow Paints";
  const seoDescription = shade
    ? `${shade.brand} ${shade.name}, shade code ${shade.shadeCode}. See harmonious pairings and the closest matching shades in other paint brands. Available at Rainbow Paints & Hardwares, Coimbatore.`
    : "Explore a wide variety of paint shades from top brands.";

  const shadeImageUrl = shade ? `https://placehold.co/1200x630/${shade.hex.replace('#', '')}/${shade.hex.replace('#', '')}.png?text=%20` : undefined;

  const productSchema = useMemo(() => {
    if (!shade) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${shade.name} ${shade.shadeCode}`,
      image: shadeImageUrl,
      description: seoDescription,
      brand: {
        "@type": "Brand",
        name: shade.brand,
      },
      category: "Paint Color",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "HomeAndConstructionBusiness",
          name: "Rainbow Paints & Hardwares",
          address: {
            "@type": "PostalAddress",
            streetAddress: "364, Dr Nanjappa Rd",
            addressLocality: "Coimbatore",
            addressRegion: "Tamil Nadu",
            postalCode: "641018",
            addressCountry: "IN",
          },
        },
      },
    };
  }, [shade, seoDescription, shadeImageUrl]);

  const breadcrumbSchema = useMemo(() => {
    if (!shade) return null;
    const properUrl = `https://rainbowpaint.in${shadeService.getShadeUrl(shade)}`;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rainbowpaint.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Colors",
          item: "https://rainbowpaint.in/visualizer",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: shade.brand,
          item: `https://rainbowpaint.in/brands/${shade.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: shade.family || "Colors",
          item: "https://rainbowpaint.in/visualizer", // We don't have a family-specific page yet, so link back to visualizer
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

  const faqSchema = useMemo(() => {
    if (!shade) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `What is the shade code for ${shade.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The shade code for ${shade.name} by ${shade.brand} is ${shade.shadeCode}.`
          }
        },
        {
          "@type": "Question",
          "name": `What is the HEX code for ${shade.name}?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `The HEX color code for ${shade.name} is ${shade.hex}, and its RGB value is RGB(${shade.rgb}).`
          }
        },
        {
          "@type": "Question",
          "name": `Where can I buy ${shade.brand} ${shade.name} paint?`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `You can buy ${shade.brand} paint in the shade ${shade.name} (${shade.shadeCode}) online or in-store at Rainbow Paints & Hardwares in Coimbatore.`
          }
        }
      ]
    };
  }, [shade]);

  if (loading) {
    return (
      <div className="pt-24 pb-12 bg-royale-bg min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!shade) {
    return (
      <div className="pt-24 pb-12 bg-royale-bg min-h-screen flex flex-col items-center justify-center text-ivory">
        <h1 className="text-3xl font-display mb-4">Shade Not Found</h1>
        <p className="text-zinc-400 mb-8">
          The color code or shade name you entered doesn't exist in our catalog.
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
        url={`https://rainbowpaint.in${shadeService.getShadeUrl(shade)}`}
        type="product"
        schema={[productSchema, breadcrumbSchema, faqSchema].filter(Boolean)}
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

        {/* Color FAQs for AEO */}
        <div className="mt-16 pt-16 border-t border-royale-accent">
          <h2 className="text-2xl font-display font-medium text-ivory mb-8">
            Frequently Asked Questions about <span className="text-gradient italic">{shade.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What is the shade code for {shade.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                The shade code for {shade.name} by {shade.brand} is {shade.shadeCode}. You can use this code to order the exact color for interior or exterior wall paints.
              </p>
            </div>
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What is the HEX code for {shade.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                The HEX color code for {shade.name} is {shade.hex}, and its RGB value is RGB({shade.rgb}). This is useful for matching colors in digital designs or interior planning software.
              </p>
            </div>
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors md:col-span-2">
              <h3 className="font-medium text-ivory mb-3 text-sm">Where can I buy {shade.brand} {shade.name} paint?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                You can buy {shade.brand} paint in the shade {shade.name} ({shade.shadeCode}) online or in-store at Rainbow Paints & Hardwares in Coimbatore. We use precision tinting machines to ensure exact color matching.
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
