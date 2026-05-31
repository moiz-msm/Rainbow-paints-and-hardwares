import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductsSection from '../components/ProductsSection';

export default function ProductsPage() {
  const { categorySlug, brandSlug } = useParams<{ categorySlug?: string, brandSlug?: string }>();

  // Optional: Convert slug to a display format (e.g., 'interior-paints' -> 'Interior Paints')
  // We will pass this to ProductsSection to initialize filters if needed
  const initialCategory = categorySlug ? categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : undefined;
  const initialBrand = brandSlug ? brandSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : undefined;

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

  return (
    <div className="pt-20 sm:pt-24 pb-12 bg-royale-bg min-h-screen relative">
      <ProductsSection initialCategory={initialCategory} initialBrand={initialBrand} />
    </div>
  );
}
