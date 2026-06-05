import React, { Suspense } from "react";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import { lazyWithRetry as lazy } from "../utils/lazyWithRetry";

const ShopByCategory = lazy(() => import("../components/ShopByCategory"));
const BrandsDealIn = lazy(() => import("../components/BrandsDealIn"));
const ProductsAndIndustrial = lazy(() => import("../components/ProductsAndIndustrial"));
const ContactSection = lazy(() => import("../components/ContactSection"));
const FaqSection = lazy(() => import("../components/FaqSection"));
const BlogSection = lazy(() => import("../components/BlogSection"));
const FreeSampleSection = lazy(() => import("../components/FreeSampleSection"));
const ToolsOverview = lazy(() => import("../components/ToolsOverview"));
const GoogleReviewsSection = lazy(() => import("../components/GoogleReviewsSection"));

export default function Home() {
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "PaintStore"],
    "name": "Rainbow Paints & Hardwares",
    "image": "https://rainbowpaint.in/hero-bg.png",
    "@id": "https://rainbowpaint.in/",
    "url": "https://rainbowpaint.in",
    "telephone": "+918072442930",
    "priceRange": "INR",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "54 Cox Street, Kattoor",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "postalCode": "641009",
      "addressCountry": "IN"
    },
    "description": "Top paint shop in Coimbatore. Buy paint online with best pricing, doorstep delivery across Coimbatore, and 4000+ color shades."
  };

  return (
    <>
      <SEO 
        title="Rainbow Paints & Hardwares | Best Paint Shop in Coimbatore"
        description="Buy paint online from the top paint shop in Coimbatore. Rainbow Paints & Hardwares offers best pricing, local doorstep delivery, and 4000+ color shades."
        url="https://rainbowpaint.in/"
        schema={storeSchema}
      />
      <Hero />
      <Suspense fallback={<div className="h-20 w-full bg-royale-bg"></div>}>
        <BrandsDealIn />
        <ShopByCategory />
        <ProductsAndIndustrial />
        <ToolsOverview />
        <FreeSampleSection />
        <BlogSection />
        <GoogleReviewsSection />
        <FaqSection showLink={true} limit={4} />
        <ContactSection />
      </Suspense>
    </>
  );
}
