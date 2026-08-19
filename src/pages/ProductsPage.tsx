import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductsSection from '../components/ProductsSection';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import CategorySeoBlock from '../components/CategorySeoBlock';
import { mockProducts, brands, subCategories } from '../data';

export default function ProductsPage() {
  const { categorySlug, brandSlug } = useParams<{ categorySlug?: string, brandSlug?: string }>();

  // Optional: Convert slug to a display format (e.g., 'interior-paints' -> 'Interior Paints')
  let initialCategory = categorySlug ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : undefined; if(categorySlug) { const allSubs = Object.values(subCategories).flat(); const exactCat = allSubs.find(c => c.toLowerCase().replace(/\s+/g, '-') === categorySlug); if(exactCat) initialCategory = exactCat; }
  let initialBrand = brandSlug ? brandSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : undefined;
  
  if (brandSlug) {
    const exactBrand = brands.find(b => b.toLowerCase().replace(/\s+/g, '-') === brandSlug);
    if (exactBrand) {
      initialBrand = exactBrand;
    }
  }

  const pageTitle = initialCategory || initialBrand || 'All Products';
  
  const seoTitle = useMemo(() => {
    if (initialCategory === 'Exterior Paints' || initialCategory === 'Exterior Wall') return 'Buy Exterior Paint Online | Best Exterior Wall Paints';
    if (initialCategory === 'Interior Paints' || initialCategory === 'Interior Wall') return 'Buy Interior Paint Online | Premium Emulsion & High Sheen Paints';
    return `${pageTitle} | Buy Paints Online`;
  }, [initialCategory, pageTitle]);

  const pageDescription = useMemo(() => {
    if (initialCategory === 'Exterior Paints' || initialCategory === 'Exterior Wall') {
      return `Buy the best exterior paints online at Rainbow Paints. Shop affordable exterior paint for home and buildings, including Asian Paints Ultima Protek and moisture resistant paint.`;
    }
    if (initialCategory === 'Interior Paints' || initialCategory === 'Interior Wall') {
      return `Buy luxury interior paint online. Explore high sheen paint, easy clean emulsion, and anti mould ceiling paint from top brands like Asian Paints and Berger. Fast delivery!`;
    }
    if (initialBrand) {
      return `Buy ${initialBrand} online at wholesale prices. Authorized ${initialBrand} paint dealer in Coimbatore offering fast local doorstep delivery and genuine products.`;
    }
    if (initialCategory) {
      return `Shop premium ${initialCategory.toLowerCase()} online. Rainbow Paints is your trusted local paint store in Coimbatore, offering top brands, expert advice, and fast delivery.`;
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
    if (initialCategory === 'Exterior Paints' || initialCategory === 'Exterior Wall') {
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
    
    if (initialCategory === 'Interior Paints' || initialCategory === 'Interior Wall') {
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
    return null;
  }, [initialCategory]);
  
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
      if (initialCategory === 'Exterior Wall' || initialCategory === 'Exterior Paints') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Exterior Wall' || p.category === 'Exterior Wall');
      } else if (initialCategory === 'Interior Wall' || initialCategory === 'Interior Paints') {
        filtered = filtered.filter((p: any) => p.subCategory === 'Interior Wall' || p.category === 'Interior Wall');
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

  const currentUrl = `https://www.rainbowpaint.in${categorySlug ? '/c/' + categorySlug : brandSlug ? '/brands/' + brandSlug : '/buy-paint-online'}`;

  return (
    <div className="pt-20 sm:pt-24 pb-12 bg-royale-bg min-h-screen relative">
      <SEO 
        title={seoTitle}
        description={pageDescription}
        url={currentUrl}
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
