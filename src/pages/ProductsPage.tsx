import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductsSection from '../components/ProductsSection';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { brands, subCategories } from '../data';

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
  
  const pageDescription = useMemo(() => {
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
        "@type": "HomeAndConstructionBusiness",
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
        "name": "Coimbatore"
      },
      "description": `Fast local doorstep delivery of ${pageTitle.toLowerCase()} across Coimbatore.`,
      "url": `https://rainbowpaint.in${categorySlug ? '/c/' + categorySlug : brandSlug ? '/brands/' + brandSlug : '/buy-paint-online'}`
    };
  }, [pageTitle, categorySlug, brandSlug]);

  const collectionSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageTitle,
      "description": pageDescription,
      "url": `https://rainbowpaint.in${categorySlug ? '/c/' + categorySlug : brandSlug ? '/brands/' + brandSlug : '/buy-paint-online'}`
    };
  }, [pageTitle, pageDescription, categorySlug, brandSlug]);

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

  const currentUrl = `https://rainbowpaint.in${categorySlug ? '/c/' + categorySlug : brandSlug ? '/brands/' + brandSlug : '/buy-paint-online'}`;

  return (
    <div className="pt-20 sm:pt-24 pb-12 bg-royale-bg min-h-screen relative">
      <SEO 
        title={`${pageTitle} | Buy Paints Online`}
        description={pageDescription}
        url={currentUrl}
        schema={[collectionSchema, serviceSchema]}
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
