import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductsSection from '../components/ProductsSection';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import { brands } from '../data';

export default function ProductsPage() {
  const { categorySlug, brandSlug } = useParams<{ categorySlug?: string, brandSlug?: string }>();

  // Optional: Convert slug to a display format (e.g., 'interior-paints' -> 'Interior Paints')
  const initialCategory = categorySlug ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : undefined;
  let initialBrand = brandSlug ? brandSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : undefined;
  
  if (brandSlug) {
    const exactBrand = brands.find(b => b.toLowerCase().replace(/\s+/g, '-') === brandSlug);
    if (exactBrand) {
      initialBrand = exactBrand;
    }
  }

  const pageTitle = initialCategory || initialBrand || 'All Products';
  const pageDescription = `Explore our wide range of ${pageTitle.toLowerCase()}. Get the best quality paints and colors delivered to your doorstep.`;

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

  const collectionSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": pageTitle,
      "description": pageDescription,
      "url": `https://rainbowpaint.in${categorySlug ? '/c/' + categorySlug : brandSlug ? '/brands/' + brandSlug : '/buy-paint-online'}`
    };
  }, [pageTitle, pageDescription, categorySlug, brandSlug]);

  return (
    <div className="pt-20 sm:pt-24 pb-12 bg-royale-bg min-h-screen relative">
      <SEO 
        title={`${pageTitle} | Buy Paints Online`}
        description={pageDescription}
        schema={[collectionSchema]}
        type="category"
      />
      
      {/* Category Header visible only if we have a specific category or brand */}
      {(initialCategory || initialBrand) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] mb-8">
           <Breadcrumb 
             className="text-ivory/60"
             items={[
               { label: 'Home', href: '/' },
               { label: pageTitle }
             ]}
           />

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium text-ivory tracking-tight uppercase">
            {pageTitle}
          </h1>
          <p className="text-ivory/60 mt-3 font-light max-w-2xl text-sm sm:text-base leading-relaxed">
            {pageDescription}
          </p>
        </div>
      )}

      <ProductsSection initialCategory={initialCategory} initialBrand={initialBrand} />
    </div>
  );
}
