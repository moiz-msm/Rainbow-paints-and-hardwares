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
    'exterior-paint': 'Exterior Paint',
    'exterior-wall': 'Exterior Paint',
    'primers': 'Primers',
    'undercoats': 'Primers',
    'enamel-paint': 'Enamel Paint',
    'metals-and-grills': 'Enamel Paint',
    'metal-and-grills': 'Enamel Paint',
    'pu-paint': 'PU Paint',
    'pu-coatings': 'PU Paint',
    'epoxy-paint': 'Epoxy Paint',
    'epoxy-coatings': 'Epoxy Paint'
  };

  let initialCategory = categorySlug ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : undefined; 
  if (categorySlug) { 
    const lowerSlug = categorySlug.toLowerCase();
    if (slugAliasMap[lowerSlug]) {
      initialCategory = slugAliasMap[lowerSlug];
    } else {
      const allSubs = Object.values(subCategories).flat(); 
      const exactCat = allSubs.find(c => c.toLowerCase().replace(/\s+/g, '-') === categorySlug); 
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
      return 'PU Wood Coatings in Coimbatore – Sealer, Polish & Finish | Rainbow';
    }
    if (initialCategory === 'Epoxy Paint' || initialCategory === 'Epoxy Coatings') {
      return 'Industrial Epoxy Paints in Coimbatore – Floor Coatings | Rainbow';
    }
    if (initialCategory === 'Industrial' || initialCategory === 'Industrial Coatings' || initialCategory === 'Industrial Paints') {
      return 'Industrial Paints in Coimbatore – Protective Coatings | Rainbow';
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
      return 'Explore PU wood coatings, sealers, topcoats & polishes in Coimbatore for furniture, doors & wooden surfaces. Compare MRF & top brands at Rainbow Paints.';
    }
    if (initialCategory === 'Epoxy Paint' || initialCategory === 'Epoxy Coatings') {
      return 'Industrial epoxy floor paints, primers & chemical-resistant protective systems in Coimbatore for concrete & metal surfaces. Request wholesale quotes today!';
    }
    if (initialCategory === 'Industrial' || initialCategory === 'Industrial Coatings' || initialCategory === 'Industrial Paints') {
      return 'Source industrial paints, metal primers, epoxy & PU coatings in Coimbatore for factories, fabricators & workshops. Bulk wholesale pricing & delivery!';
    }
    if (initialCategory === 'Primers' || initialCategory === 'Undercoats' || initialCategory === 'Primer') {
      return 'Find anti-rust metal primers in Coimbatore for iron & steel: red oxide primers, etch primers & protective undercoats. Compare top brand specs & prices!';
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
      "url": `https://www.rainbowpaint.in${categorySlug ? '/c/' + categorySlug : brandSlug ? '/brands/' + brandSlug : '/buy-paint-online'}`
    };
  }, [pageTitle, categorySlug, brandSlug]);

  const collectionSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": seoTitle,
      "description": pageDescription,
      "url": `https://www.rainbowpaint.in${categorySlug ? '/c/' + categorySlug : brandSlug ? '/brands/' + brandSlug : '/buy-paint-online'}`
    };
  }, [seoTitle, pageDescription, categorySlug, brandSlug]);

  const faqSchema = useMemo(() => {
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
    
    if (categorySlug || brandSlug) {
      items.push({ label: 'Products', href: '/buy-paint-online' });
      items.push({ label: pageTitle });
    } else {
      items.push({ label: 'Products' });
    }
    
    return items;
  }, [categorySlug, brandSlug, pageTitle]);

  const breadcrumbSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href ? "https://www.rainbowpaint.in" + item.href : undefined
      }))
    };
  }, [breadcrumbItems]);

  const itemListSchema = useMemo(() => {
    let filtered = mockProducts;
    if (initialCategory) {
      if (initialCategory === 'Exterior Paint' || initialCategory === 'Exterior Wall' || initialCategory === 'Exterior Paints') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Exterior Paint' || p.subCategory === 'Exterior Wall' || p.category === 'Exterior Wall');
      } else if (initialCategory === 'Interior Paint' || initialCategory === 'Interior Wall' || initialCategory === 'Interior Paints') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Interior Paint' || p.subCategory === 'Interior Wall' || p.category === 'Interior Wall');
      } else if (initialCategory === 'Primers' || initialCategory === 'Undercoats') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Primers' || p.subCategory === 'Undercoats');
      } else if (initialCategory === 'Enamel Paint' || initialCategory === 'Metals and Grills') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Enamel Paint' || p.subCategory === 'Metals and Grills');
      } else if (initialCategory === 'PU Paint' || initialCategory === 'PU Coatings') {
        filtered = filtered.filter((p: any) => p.subCategory === 'PU Paint' || p.subCategory === 'PU Coatings');
      } else if (initialCategory === 'Epoxy Paint' || initialCategory === 'Epoxy Coatings') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Epoxy Paint' || p.subCategory === 'Epoxy Coatings');
      } else {
        filtered = filtered.filter((p: any) => p.subCategory === initialCategory || p.category === initialCategory);
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

  const currentUrl = `https://www.rainbowpaint.in${categorySlug ? '/c/' + categorySlug : brandSlug ? '/brands/' + brandSlug : '/buy-paint-online'}`;

  return (
    <div className="pt-20 sm:pt-24 pb-12 bg-royale-bg min-h-screen relative">
      <SEO 
        title={seoTitle}
        description={pageDescription}
        url={currentUrl}
        image={brandDetail?.logo || undefined}
        schema={schemas}
        type="category"
      />
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
        <Breadcrumb items={breadcrumbItems} className="text-ivory/60 mb-6" />
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
