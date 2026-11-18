import React, { useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductsSection from '../components/ProductsSection';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import CategorySeoBlock from '../components/CategorySeoBlock';
import { mockProducts, brands, subCategories, brandDetails } from '../data';

export default function ProductsPage() {
  const { categorySlug, brandSlug } = useParams<{ categorySlug?: string, brandSlug?: string }>();
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get('category');
  const queryBrand = searchParams.get('brand');

  const slugAliasMap: Record<string, string> = {
    'interior-paint': 'Interior Paint',
    'interior-wall': 'Interior Paint',
    'interior-texture': 'Interior Texture',
    'exterior-paint': 'Exterior Paint',
    'exterior-wall': 'Exterior Paint',
    'exterior-texture': 'Exterior Texture',
    'primers': 'Primers',
    'undercoats': 'Primers',
    'waterproofing': 'Waterproofing',
    'wood-finishes': 'Wood Finishes',
    'enamel-paint': 'Enamel Paint',
    'metals-and-grills': 'Enamel Paint',
    'metal-and-grills': 'Enamel Paint',
    'painting-tools': 'Painting Tools',
    'thinners-&-solvents': 'Thinners & Solvents',
    'thinners-and-solvents': 'Thinners & Solvents',
    'tile-adhesives': 'Tile Adhesives',
    'power-tools': 'Power Tools',
    'pu-paint': 'PU Paint',
    'pu-coatings': 'PU Paint',
    'epoxy-paint': 'Epoxy Paint',
    'epoxy-coatings': 'Epoxy Paint',
    'synthetic-enamels': 'Synthetic Enamels',
    'industrial': 'Industrial Paint and Coatings',
    'all-industrial': 'Industrial Paint and Coatings',
    'industrial-paint-and-coatings': 'Industrial Paint and Coatings',
    'industrial-coatings': 'Industrial Paint and Coatings',
    'industrial-paints': 'Industrial Paint and Coatings',
    'industrial-paint': 'Industrial Paint and Coatings',
    'all-home-paint': 'All Home Paint',
    'all-adhesives': 'All Adhesives',
    'all-power-tools': 'All Power Tools'
  };

  let initialCategory = categorySlug ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : undefined; 
  if (categorySlug) { 
    const lowerSlug = decodeURIComponent(categorySlug).toLowerCase();
    if (slugAliasMap[lowerSlug]) {
      initialCategory = slugAliasMap[lowerSlug];
    } else {
      const allSubs = Object.values(subCategories).flat(); 
      const exactCat = allSubs.find(c => c.toLowerCase().replace(/\s+/g, '-') === lowerSlug); 
      if (exactCat) initialCategory = exactCat;
    }
  } else if (queryCategory) {
    const lowerQuery = queryCategory.toLowerCase();
    if (slugAliasMap[lowerQuery]) {
      initialCategory = slugAliasMap[lowerQuery];
    } else {
      const allSubs = Object.values(subCategories).flat();
      const exactCat = allSubs.find(c => c.toLowerCase() === lowerQuery);
      initialCategory = exactCat || queryCategory;
    }
  }

  let initialBrand = brandSlug ? brandSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : undefined;
  
  if (brandSlug) {
    const exactBrand = brands.find(b => b.toLowerCase().replace(/\s+/g, '-') === brandSlug);
    if (exactBrand) {
      initialBrand = exactBrand;
    }
  } else if (queryBrand) {
    const exactBrand = brands.find(b => b.toLowerCase() === queryBrand.toLowerCase());
    initialBrand = exactBrand || queryBrand;
  }

  const pageTitle = initialCategory || initialBrand || 'All Products';

  const canonicalPath = useMemo(() => {
    if (initialCategory === 'Industrial Paint and Coatings') {
      return '/c/industrial-paint-and-coatings';
    }
    if (categorySlug) {
      return `/c/${categorySlug}`;
    }
    if (brandSlug) {
      return `/brands/${brandSlug}`;
    }
    return '/buy-paint-online';
  }, [initialCategory, categorySlug, brandSlug]);

  const currentUrl = `https://www.rainbowpaint.in${canonicalPath}`;
  
  const seoTitle = useMemo(() => {
    if (initialBrand) {
      if (initialBrand === 'Asian Paints') {
        return 'Asian Paints Authorised Dealer in Coimbatore – Royale & Apex | Rainbow';
      }
      if (initialBrand === 'Berger Paints') {
        return 'Berger Paints Dealer in Coimbatore – Silk & WeatherCoat | Rainbow';
      }
      if (initialBrand === 'MRF Vapocure') {
        return 'MRF Vapocure PU Paints in Coimbatore – WoodCoat & MetalCoat | Rainbow';
      }
      if (initialBrand === 'Dr. Fixit') {
        return 'Dr. Fixit Waterproofing in Coimbatore – Roof, Terrace & Wall | Rainbow';
      }
      if (initialBrand === 'Birla White') {
        return 'Birla White Cement & WallCare Putty in Coimbatore | Rainbow Paints';
      }
      if (initialBrand === 'Sheenlac') {
        return 'Sheenlac Wood Finishes & Polish in Coimbatore | Rainbow Paints';
      }
      if (initialBrand === 'Fevicol') {
        return 'Fevicol Adhesives in Coimbatore – Wood Glue & Resin | Rainbow';
      }
      if (initialBrand === 'Just Spray') {
        return 'Just Spray Aerosol Paint Cans in Coimbatore | Rainbow Paints';
      }
      if (initialBrand === 'Ajax') {
        return 'Ajax Waterproof Sandpaper & Emery Paper in Coimbatore | Rainbow';
      }
      if (initialBrand === 'Bawa' || initialBrand === 'Jaya') {
        return 'Paint Brushes & Tools in Coimbatore – Bawa & Jaya | Rainbow';
      }
      if (initialBrand === 'Gorila') {
        return 'Gorila Cement Color Oxide Powders in Coimbatore | Rainbow';
      }
      return `Buy ${initialBrand} in Coimbatore – Wholesale Paint Dealer | Rainbow`;
    }

    if (initialCategory === 'Interior Paint' || initialCategory === 'Interior Wall' || initialCategory === 'Interior Paints') {
      return 'Interior Wall Paints in Coimbatore – Washable Emulsions & Luxury | Rainbow';
    }
    if (initialCategory === 'Exterior Paint' || initialCategory === 'Exterior Wall' || initialCategory === 'Exterior Paints') {
      return 'Exterior Wall Paints in Coimbatore – Weatherproof Emulsions | Rainbow';
    }
    if (initialCategory === 'PU Paint' || initialCategory === 'PU Coatings') {
      return 'PU Wood & Metal Coatings in Coimbatore – 2K PU Finish | Rainbow';
    }
    if (initialCategory === 'Epoxy Paint' || initialCategory === 'Epoxy Coatings') {
      return 'Industrial Epoxy Paints in Coimbatore – Floor Coatings | Rainbow';
    }
    if (
      initialCategory === 'Industrial Paint and Coatings' ||
      initialCategory === 'Industrial' ||
      initialCategory === 'Industrial Coatings' ||
      initialCategory === 'Industrial Paints'
    ) {
      return 'Industrial Paint and Coatings in Coimbatore | Epoxy & PU | Rainbow';
    }
    if (initialCategory === 'Primers' || initialCategory === 'Undercoats' || initialCategory === 'Primer') {
      return 'Metal Primers in Coimbatore – Red Oxide & Undercoats | Rainbow';
    }
    if (initialCategory === 'Waterproofing' || initialCategory === 'Waterproofing Solutions') {
      return 'Waterproofing in Coimbatore – Roof, Terrace & Wall Solutions | Rainbow';
    }
    if (initialCategory === 'Enamel Paint' || initialCategory === 'Metals and Grills') {
      return 'Enamel Paint in Coimbatore – Gloss & Satin Metal Paint | Rainbow';
    }
    return `${pageTitle} in Coimbatore | Buy Paints Online | Rainbow Paints`;
  }, [initialBrand, initialCategory, pageTitle]);

  const pageDescription = useMemo(() => {
    if (initialBrand) {
      if (initialBrand === 'Asian Paints') {
        return 'Authorised Asian Paints dealer in Coimbatore. Buy Royale Glitz, Apex Ultima, primers & 4000+ shades at direct wholesale prices with fast doorstep delivery!';
      }
      if (initialBrand === 'Berger Paints') {
        return 'Authorised Berger Paints dealer in Coimbatore. Shop Silk Glamor, Easy Clean, Weathercoat & Bison emulsions at direct wholesale prices with computerized tinting!';
      }
      if (initialBrand === 'MRF Vapocure') {
        return 'Authorised MRF Vapocure dealer in Coimbatore. Buy premium 2K PU WoodCoat, MetalCoat, sealers, thinners & high-durability finishes at wholesale rates!';
      }
      if (initialBrand === 'Dr. Fixit') {
        return 'Authorised Dr. Fixit dealer in Coimbatore. Complete terrace waterproofing, LW+, Crack-X, damp-proof coatings & sealants with direct expert technical advice!';
      }
      if (initialBrand === 'Birla White') {
        return 'Authorised Birla White dealer in Coimbatore. Buy WallCare Putty, White Cement & Levelplast at direct wholesale rates with prompt same-day local dispatch!';
      }
      if (initialBrand === 'Sheenlac') {
        return 'Authorised Sheenlac dealer in Coimbatore. Explore premium wood finishes, stains, NC thinners, wood polishes & paint removers at wholesale rates with fast delivery!';
      }
      if (initialBrand === 'Fevicol') {
        return 'Authorised Fevicol dealer in Coimbatore. Buy Marine, SH Synthetic Resin & contact adhesives for woodworking and laminates at wholesale prices with genuine stock!';
      }
      if (initialBrand === 'Just Spray') {
        return 'Authorised Just Spray dealer in Coimbatore. Buy JS1 aerosol spray paint cans in classic, metallic & primer variations at wholesale prices with prompt local delivery!';
      }
      if (initialBrand === 'Ajax') {
        return 'Authorised Ajax dealer in Coimbatore. Buy waterproof water emery papers, red dry sanding rolls & abrasives at wholesale prices for smooth surface prep!';
      }
      if (initialBrand === 'Bawa' || initialBrand === 'Jaya') {
        return 'Shop professional Bawa & Jaya painting brushes in Coimbatore: Joker, Prince & Diamond series. High-density bristle brushes for streak-free painting!';
      }
      if (initialBrand === 'Gorila') {
        return 'Buy vibrant Gorila cement color oxide powders in Coimbatore for flooring, mosaics & architectural mixes. Superior UV stability & high pigmentation at wholesale rates.';
      }
      return `Buy genuine ${initialBrand} products in Coimbatore at direct wholesale prices. Authorised dealer offering fast local delivery and 100% genuine stock.`;
    }

    if (initialCategory === 'Interior Paint' || initialCategory === 'Interior Wall' || initialCategory === 'Interior Paints') {
      return 'Explore interior wall paints in Coimbatore for homes & commercial spaces. Compare washable emulsions, luxury finishes & stain-resistant paints at Rainbow Paints.';
    }
    if (initialCategory === 'Exterior Paint' || initialCategory === 'Exterior Wall' || initialCategory === 'Exterior Paints') {
      return 'Discover weatherproof exterior wall paints in Coimbatore designed for maximum durability. Compare exterior emulsions from leading brands with fast delivery!';
    }
    if (initialCategory === 'PU Paint' || initialCategory === 'PU Coatings') {
      return 'Explore PU wood & metal coatings, sealers, topcoats & polishes in Coimbatore for furniture, machinery & metal fabrication. Compare MRF & Berger at Rainbow Paints.';
    }
    if (initialCategory === 'Epoxy Paint' || initialCategory === 'Epoxy Coatings') {
      return 'Industrial epoxy floor paints, primers & chemical-resistant protective systems in Coimbatore for concrete & metal surfaces. Request wholesale quotes today!';
    }
    if (
      initialCategory === 'Industrial Paint and Coatings' ||
      initialCategory === 'Industrial' ||
      initialCategory === 'Industrial Coatings' ||
      initialCategory === 'Industrial Paints'
    ) {
      return 'Buy industrial paint and coatings in Coimbatore at wholesale prices: 2-pack epoxy paints, 2K PU metal coatings, zinc primers & heavy-duty floor paints.';
    }
    if (initialCategory === 'Primers' || initialCategory === 'Undercoats' || initialCategory === 'Primer') {
      return 'Find anti-rust metal primers in Coimbatore for iron & steel: red oxide primers, zinc chromate & protective undercoats. Compare top brand specs & prices!';
    }
    if (initialCategory === 'Waterproofing' || initialCategory === 'Waterproofing Solutions') {
      return 'Shop waterproofing products in Coimbatore for roofs, terraces, bathrooms & exterior walls. Compare Dr. Fixit & SmartCare coatings at wholesale rates!';
    }
    if (initialCategory === 'Enamel Paint' || initialCategory === 'Metals and Grills') {
      return 'Buy durable enamel paints in Coimbatore for metal, grills, doors & woodwork. High-gloss & satin synthetic enamels with long-lasting rust protection.';
    }
    if (initialCategory) {
      return `Shop premium ${initialCategory.toLowerCase()} in Coimbatore. Rainbow Paints is your trusted local paint store offering top brands, expert advice, and fast delivery.`;
    }
    return `Buy paint online at wholesale prices. Rainbow Paints is the leading paint dealer in Coimbatore offering top brands, waterproofing, and fast local delivery.`;
  }, [initialBrand, initialCategory]);

  const seoKeywords = useMemo(() => {
    if (initialCategory === 'Industrial Paint and Coatings') {
      return 'industrial paint and coatings, industrial coatings Coimbatore, 2-pack epoxy paint, 2K PU metal coating, zinc phosphate primer, red oxide metal primer, Berger Epilux 155 HB, MRF MetalCoat PU, industrial enamel paint wholesale';
    }
    if (initialCategory === 'Epoxy Paint') {
      return 'epoxy paint Coimbatore, two pack epoxy coating, industrial epoxy floor paint, Berger Epilux, polyamide epoxy enamel, wholesale epoxy paint';
    }
    if (initialCategory === 'PU Paint') {
      return '2K PU paint Coimbatore, MRF WoodCoat, MRF MetalCoat, polyurethane wood and metal coating, Luxol PU enamel';
    }
    if (initialCategory) {
      return `${initialCategory}, buy ${initialCategory.toLowerCase()} in Coimbatore, ${initialCategory.toLowerCase()} wholesale price, Rainbow Paints Coimbatore`;
    }
    if (initialBrand) {
      return `${initialBrand}, ${initialBrand} dealer Coimbatore, buy ${initialBrand} online, Rainbow Paints`;
    }
    return undefined;
  }, [initialCategory, initialBrand]);

  useEffect(() => {
    // Show Smart Buying Guide once per session when user enters
    const hasSeenGuide = sessionStorage.getItem('hasSeenSmartGuide');
    if (!hasSeenGuide) {
      const timer = setTimeout(() => {
        window.dispatchEvent(new Event('open-smart-guide'));
        sessionStorage.setItem('hasSeenSmartGuide', 'true');
      }, 700);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const serviceSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${pageTitle} Delivery & Supply`,
      "serviceType": "Paint and Hardware Supply",
      "provider": {
        "@type": ["LocalBusiness", "PaintStore", "HomeAndConstructionBusiness", "Organization"],
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
      "areaServed": {
        "@type": "City",
        "name": "Coimbatore"
      },
      "description": `Fast local doorstep delivery of ${pageTitle.toLowerCase()} across Coimbatore.`,
      "url": currentUrl
    };
  }, [pageTitle, currentUrl]);

  const collectionSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": seoTitle,
      "description": pageDescription,
      "url": currentUrl
    };
  }, [seoTitle, pageDescription, currentUrl]);

  const faqSchema = useMemo(() => {
    if (initialCategory === 'Industrial Paint and Coatings') {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What types of industrial paint and coatings do you supply in Coimbatore?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Rainbow Paints & Hardwares supplies two-pack polyamide epoxy coatings (such as Berger Epilux 155 HB and Apcodur), 2K polyurethane (PU) metal & wood finishes (MRF MetalCoat, MRF Durothane, Luxol PU Enamel), anti-corrosive red oxide, zinc chromate & zinc phosphate primers, and heavy-duty PU & epoxy floor coatings in 1L, 4L, and 20L wholesale packs."
            }
          },
          {
            "@type": "Question",
            "name": "Should I choose Epoxy paint or 2K PU coating for industrial machinery and fabrication?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "2-pack epoxy coatings offer superior chemical resistance, primer adhesion, and indoor structural steel/floor protection, whereas 2K polyurethane (PU) coatings provide superior UV stability, chalk-resistance, and high-gloss color retention for outdoor machinery, gates, and industrial equipment exposed to sunlight."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer bulk wholesale pricing and custom RAL shade matching for industrial coatings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. We provide wholesale contractor & factory pricing, GST billing, 20L industrial drum packs, custom RAL & IS shade tinting, and rapid dispatch across Coimbatore industrial belts."
            }
          }
        ]
      };
    }

    if (initialCategory === 'Exterior Paint' || initialCategory === 'Exterior Paints' || initialCategory === 'Exterior Wall') {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Which is the best exterior paint for houses in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The best exterior paints are those with advanced weatherproofing and anti-algal properties, such as Asian Paints Ultima Protek and Apex. They offer excellent moisture resistance and long-lasting protection for homes and large buildings."
            }
          },
          {
            "@type": "Question",
            "name": "Can I buy exterior paint online?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can shop affordable exterior paints online securely at Rainbow Paints and get fast local delivery."
            }
          }
        ]
      };
    }
    
    if (initialCategory === 'Interior Paint' || initialCategory === 'Interior Paints' || initialCategory === 'Interior Wall') {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the best interior paint for living rooms?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Luxury emulsion paint and high sheen paints like Asian Paints Royale Glitz are excellent choices for living rooms. They offer a silky touch and a rich, durable finish."
            }
          },
          {
            "@type": "Question",
            "name": "Which paint is best for bathroom ceilings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For bathrooms, you should use an anti mould ceiling paint or moisture resistant paint to prevent fungal growth caused by steam and dampness."
            }
          }
        ]
      };
    }

    if (initialBrand) {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `Is Rainbow Paints an authorised dealer for ${initialBrand} in Coimbatore?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, Rainbow Paints & Hardwares is an authorised dealer and stockist for 100% genuine ${initialBrand} products in Coimbatore, offering manufacturer warranties, factory-direct wholesale pricing, and computerized shade tinting.`
            }
          },
          {
            "@type": "Question",
            "name": `Can I buy ${initialBrand} products online with local doorstep delivery?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, you can buy genuine ${initialBrand} paints, primers, and coatings online from Rainbow Paints with same-day or fast local delivery across Coimbatore.`
            }
          },
          {
            "@type": "Question",
            "name": `Are computerized color tinting shades available for ${initialBrand}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `Yes, Rainbow Paints features official automated tinting dispensers for ${initialBrand}, accurately dispensing thousands of shades across luxury emulsions, exterior paints, enamels, and wood finishes.`
            }
          }
        ]
      };
    }

    return null;
  }, [initialCategory, initialBrand]);
  
  const breadcrumbItems = useMemo(() => {
    const items: { label: string; href?: string }[] = [{ label: 'Home', href: '/' }];
    
    if (categorySlug || brandSlug || queryCategory || queryBrand) {
      items.push({ label: 'Products', href: '/buy-paint-online' });
      if (initialCategory) {
        if (['PU Paint', 'Epoxy Paint', 'Synthetic Enamels'].includes(initialCategory)) {
          items.push({ label: 'Industrial Paint and Coatings', href: '/c/industrial-paint-and-coatings' });
        } else if (
          [
            'Interior Paint',
            'Interior Texture',
            'Exterior Paint',
            'Exterior Texture',
            'Primers',
            'Waterproofing',
            'Wood Finishes',
            'Enamel Paint',
            'Painting Tools',
            'Thinners & Solvents',
            'Tile Adhesives'
          ].includes(initialCategory)
        ) {
          items.push({ label: 'Home Paint', href: '/c/all-home-paint' });
        }
      }
      items.push({ label: pageTitle });
    } else {
      items.push({ label: 'Products' });
    }
    
    return items;
  }, [categorySlug, brandSlug, queryCategory, queryBrand, initialCategory, pageTitle]);

  const breadcrumbSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href ? "https://www.rainbowpaint.in" + item.href : currentUrl
      }))
    };
  }, [breadcrumbItems, currentUrl]);

  const itemListSchema = useMemo(() => {
    let filtered = mockProducts;
    if (initialCategory) {
      if (
        initialCategory === 'Industrial Paint and Coatings' ||
        initialCategory === 'Industrial' ||
        initialCategory === 'All Industrial'
      ) {
        filtered = filtered.filter((p: any) => p.topCategory === 'Industrial');
      } else if (initialCategory.startsWith('All ')) {
        const topName = initialCategory.replace('All ', '');
        filtered = filtered.filter((p: any) => p.topCategory === topName);
      } else if (initialCategory === 'Exterior Paint' || initialCategory === 'Exterior Wall' || initialCategory === 'Exterior Paints') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Exterior Paint' || p.subCategory === 'Exterior Wall' || p.category === 'Exterior Wall' || (p.subCategories && p.subCategories.includes('Exterior Paint')));
      } else if (initialCategory === 'Interior Paint' || initialCategory === 'Interior Wall' || initialCategory === 'Interior Paints') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Interior Paint' || p.subCategory === 'Interior Wall' || p.category === 'Interior Wall' || (p.subCategories && p.subCategories.includes('Interior Paint')));
      } else if (initialCategory === 'Primers' || initialCategory === 'Undercoats') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Primers' || p.subCategory === 'Undercoats' || (p.subCategories && p.subCategories.includes('Primers')));
      } else if (initialCategory === 'Enamel Paint' || initialCategory === 'Metals and Grills') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Enamel Paint' || p.subCategory === 'Metals and Grills' || (p.subCategories && p.subCategories.includes('Enamel Paint')));
      } else if (initialCategory === 'PU Paint' || initialCategory === 'PU Coatings') {
        filtered = filtered.filter((p: any) => p.subCategory === 'PU Paint' || p.subCategory === 'PU Coatings' || (p.subCategories && p.subCategories.includes('PU Paint')));
      } else if (initialCategory === 'Epoxy Paint' || initialCategory === 'Epoxy Coatings') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Epoxy Paint' || p.subCategory === 'Epoxy Coatings' || (p.subCategories && p.subCategories.includes('Epoxy Paint')));
      } else {
        filtered = filtered.filter((p: any) => p.subCategory === initialCategory || p.category === initialCategory || (p.subCategories && p.subCategories.includes(initialCategory)));
      }
    }
    if (initialBrand) {
      filtered = filtered.filter((p: any) => p.brand === initialBrand);
    }
    
    // Sort and limit to top 15 products to feature in rich snippet
    const topProducts = filtered.slice(0, 15);
    
    if (topProducts.length === 0) return null;

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": seoTitle,
      "description": pageDescription,
      "itemListElement": topProducts.map((p: any, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": p.name,
          "image": p.image ? (p.image.startsWith('http') ? p.image : `https://www.rainbowpaint.in${p.image.startsWith('/') ? '' : '/'}${p.image}`) : undefined,
          "url": `https://www.rainbowpaint.in/p/${p.slug || p.name.replace(/\s+/g, '-').toLowerCase()}`,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": String(p.basePrice || (p.sizes && p.sizes[0] ? p.sizes[0] * 850 : 850)),
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    };
  }, [initialCategory, initialBrand, seoTitle, pageDescription]);

  const schemas: object[] = [collectionSchema, serviceSchema, breadcrumbSchema];
  if (faqSchema) schemas.push(faqSchema);
  if (itemListSchema) schemas.push(itemListSchema);

  const brandDetail = useMemo(() => {
    if (!initialBrand) return null;
    return brandDetails.find(b => b.name.toLowerCase() === initialBrand.toLowerCase());
  }, [initialBrand]);

  return (
    <div className="pt-20 sm:pt-24 pb-12 bg-royale-bg min-h-screen relative">
      <SEO 
        title={seoTitle}
        description={pageDescription}
        keywords={seoKeywords}
        url={currentUrl}
        image={brandDetail?.logo || undefined}
        schema={schemas}
        type="category"
      />
      
      <div className="max-w-[1400px] lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={breadcrumbItems} className="text-ivory/70 mb-4" omitSchema />
      </div>

      <ProductsSection 
        initialCategory={initialCategory} 
        initialBrand={initialBrand}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
    </div>
  );
}
