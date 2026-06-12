import React, { Suspense } from "react";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import { lazyWithRetry as lazy } from "../utils/lazyWithRetry";
import LuxuryBackground from "../components/LuxuryBackground";

const ShopByCategory = lazy(() => import("../components/ShopByCategory"));
const BrandsDealIn = lazy(() => import("../components/BrandsDealIn"));
const ShopByBrand = lazy(() => import("../components/ShopByBrand"));
const ProductsAndIndustrial = lazy(
  () => import("../components/ProductsAndIndustrial"),
);
const ContactSection = lazy(() => import("../components/ContactSection"));
const FaqSection = lazy(() => import("../components/FaqSection"));
const BlogSection = lazy(() => import("../components/BlogSection"));
const ToolsOverview = lazy(() => import("../components/ToolsOverview"));
const GoogleReviewsSection = lazy(
  () => import("../components/GoogleReviewsSection"),
);

export default function Home() {
  const storeSchema = {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "PaintStore", "Organization"],
    name: "Rainbow Paints & Hardwares",
    image: "/hero-bg.webp",
    "@id": "https://rainbowpaint.in/#organization",
    url: "https://rainbowpaint.in",
    telephone: "+918072442930",
    priceRange: "INR",
    address: {
      "@type": "PostalAddress",
      streetAddress: "54 Cox Street, Kattoor",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      postalCode: "641009",
      addressCountry: "IN",
    },
    description:
      "Top paint shop in Coimbatore. Buy paint online with best pricing, doorstep delivery across Coimbatore, and 4000+ color shades.",
    logo: "/mascot.webp",
    sameAs: [
      "https://www.facebook.com/rainbowpaints",
      "https://www.instagram.com/rainbowpaints",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://rainbowpaint.in/#website",
    url: "https://rainbowpaint.in/",
    name: "Rainbow Paints & Hardwares",
    alternateName: [
      "Rainbow Paint and Hardwares",
      "Rainbow Paints",
      "rainbowpaint.in",
    ],
    description: "Buy paint online from top India leading brands.",
    publisher: {
      "@id": "https://rainbowpaint.in/#organization",
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://rainbowpaint.in/buy-paint-online?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    ],
  };

  return (
    <>
      <LuxuryBackground />
      <SEO
        title="Rainbow Paints & Hardwares | Best Paint Shop in Coimbatore"
        description="Buy paint online from the top paint shop in Coimbatore. Rainbow Paints & Hardwares offers best pricing, local doorstep delivery, and 4000+ color shades."
        url="https://rainbowpaint.in/"
        schema={[storeSchema, websiteSchema]}
      />
      <Hero />
      <Suspense fallback={<div className="h-20 w-full bg-royale-bg"></div>}>
        <ShopByCategory />
        <ShopByBrand />
        <BrandsDealIn />
        <ProductsAndIndustrial />
        <ToolsOverview />
        <GoogleReviewsSection />
        <BlogSection />
        <FaqSection showLink={true} limit={4} />
        <ContactSection />
      </Suspense>
    </>
  );
}
