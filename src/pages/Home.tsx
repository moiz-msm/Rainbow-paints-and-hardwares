import React, { Suspense, lazy } from "react";
import SEO from "../components/SEO";
import Hero from "../components/Hero";

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
    "@type": "HomeAndConstructionBusiness",
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
      "postalCode": "641009",
      "addressCountry": "IN"
    },
    "description": "Buy paint online from top India leading brands. Best pricing, doorstep delivery, and 4000+ color shades."
  };

  return (
    <>
      <SEO 
        title="Rainbow Paints & Hardwares | Buy Paint Online – Lowest Prices guarantee"
        description="Buy paint online from top India leading brands. Best pricing, doorstep delivery, and 4000+ color shades. Find the perfect color for your home."
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
