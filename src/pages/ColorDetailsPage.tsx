import React, { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { shadeService, Shade } from "../services/shadeService";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Droplet,
  Store,
} from "lucide-react";

export default function ColorDetailsPage() {
  const { shadeSlug } = useParams<{ shadeSlug: string }>();
  const [shade, setShade] = useState<Shade | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShade() {
      setLoading(true);
      if (shadeSlug) {
        const found = await shadeService.getShadeBySlug(shadeSlug);
        if (found) {
          setShade(found);
        } else {
          setShade(null);
        }
      }
      setLoading(false);
    }
    loadShade();
  }, [shadeSlug]);

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

  const productSchema = useMemo(() => {
    if (!shade) return null;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: `${shade.name} ${shade.shadeCode}`,
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
  }, [shade, seoDescription]);

  const breadcrumbSchema = useMemo(() => {
    if (!shade) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rainbowpaint.in/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Visualizer",
          item: "https://rainbowpaint.in/visualizer",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${shade.brand} Colors`,
          item: `https://rainbowpaint.in/visualizer?brand=${shade.brand.toLowerCase()}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: `${shade.name} ${shade.shadeCode}`,
          item: `https://rainbowpaint.in/color/${shadeSlug}`,
        },
      ],
    };
  }, [shade, shadeSlug]);

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
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link
          rel="canonical"
          href={`https://rainbowpaint.in/color/${shadeSlug}`}
        />
        {productSchema && (
          <script type="application/ld+json">
            {JSON.stringify(productSchema)}
          </script>
        )}
        {breadcrumbSchema && (
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        )}
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center text-sm text-ivory/60 mb-8 space-x-2">
          <Link to="/" className="hover:text-gold transition">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link to="/visualizer" className="hover:text-gold transition">
            Colors
          </Link>
          <ChevronRight size={14} />
          <span className="text-ivory font-medium">{shade.brand}</span>
          <ChevronRight size={14} />
          <span className="text-gold font-medium">{shade.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Color Display */}
          <div className="space-y-6">
            <div
              className="w-full aspect-square md:aspect-[4/3] rounded-2xl shadow-2xl relative border border-white/10"
              style={{ backgroundColor: shade.hex }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent rounded-2xl opacity-50 mix-blend-overlay"></div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-zinc-400 text-sm mb-1 uppercase tracking-wider">
                  HEX
                </p>
                <p className="font-mono text-lg">{shade.hex}</p>
              </div>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-zinc-400 text-sm mb-1 uppercase tracking-wider">
                  RGB
                </p>
                <p className="font-mono text-lg">{shade.rgb}</p>
              </div>
            </div>
          </div>

          {/* Color Info */}
          <div>
            <div className="mb-2 inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gold uppercase tracking-wider">
              <Droplet size={12} className="mr-1" />
              {shade.brand}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-2 tracking-tight">
              {shade.name}
            </h1>
            <p className="text-2xl font-mono text-zinc-400 mb-8">
              Code: {shade.shadeCode}
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-serif text-white mb-4 border-b border-white/10 pb-4">
                Color Details
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-zinc-400">Brand</span>
                  <span className="font-medium">{shade.brand}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-zinc-400">Color Family</span>
                  <span className="font-medium capitalize">{shade.family}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-zinc-400">Recommended Finish</span>
                  <span className="font-medium">{shade.finish}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Link
                to="/buy-paint-online"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-gold hover:opacity-90 text-white px-6 py-4 rounded-xl font-bold uppercase transition"
              >
                <Store size={20} />
                <span>Buy Paints In This Shade</span>
              </Link>
              <Link
                to={`/visualizer?color=${shade.hex.replace("#", "")}`}
                className="w-full flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-4 rounded-xl font-medium transition"
              >
                <span>View in Visualizer</span>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="text-lg font-serif mb-4 flex items-center text-zinc-300">
                <CheckCircle2 className="text-gold mr-2" size={18} />
                Available at Rainbow Paints, Coimbatore
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                This exact shade ({shade.shadeCode}) can be tinted on-demand
                using our fully automated tinting machines. Visit our store at
                Kattoor, Coimbatore or order online for fast local delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Similar Shades */}
        {similarShades.length > 0 && (
          <div className="mt-16 pt-16 border-t border-white/5">
            <h2 className="text-2xl font-display mb-8">
              Similar Shades in {shade.brand}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {similarShades.map((s) => (
                <Link
                  key={s.id}
                  to={`/color/${shadeService.generateSlug(s)}`}
                  className="group"
                >
                  <div
                    className="w-full aspect-square rounded-xl shadow-lg border border-white/10 mb-3 transition-transform group-hover:-translate-y-1"
                    style={{ backgroundColor: s.hex }}
                  />
                  <p className="text-sm font-medium text-white group-hover:text-gold transition truncate">
                    {s.name}
                  </p>
                  <p className="text-xs font-mono text-zinc-400">
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
