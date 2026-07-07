import React, { Suspense } from "react";
import SEO from "../components/SEO";
import Hero from "../components/Hero";
import { lazyWithRetry as lazy } from "../utils/lazyWithRetry";
import { FadeInUp } from "../components/FadeInUp";

import LuxuryBackground from "../components/LuxuryBackground";
import IndustryNews from "../components/IndustryNews";

const ShopByCategory = lazy(() => import("../components/ShopByCategory"));
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "284",
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

  const siteNavigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Quick Links",
    "description": "Important links and tools of Rainbow Paints & Hardwares",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Buy Paint Online",
        "url": "https://rainbowpaint.in/buy-paint-online"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Paint Cost Calculator",
        "url": "https://rainbowpaint.in/calculator"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "AI Color Visualizer",
        "url": "https://rainbowpaint.in/visualizer"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Compare Paints",
        "url": "https://rainbowpaint.in/compare-paints"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Paint Industry Blog",
        "url": "https://rainbowpaint.in/blog"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 6,
        "name": "About Our Paint Shop",
        "url": "https://rainbowpaint.in/about"
      }
    ]
  };

  return (
    <>
      <LuxuryBackground />
      <SEO
        title="Rainbow Paints & Hardwares | Best Paint Shop in Coimbatore"
        description="Buy paint online from the top paint shop in Coimbatore. Rainbow Paints & Hardwares offers best pricing, local doorstep delivery, and 4000+ color shades."
        url="https://rainbowpaint.in/"
        schema={[storeSchema, websiteSchema, siteNavigationSchema]}
      />
      <Hero />
      <Suspense fallback={<div className="h-20 w-full bg-royale-bg"></div>}>
        <FadeInUp><ToolsOverview /></FadeInUp>
        <FadeInUp><ShopByBrand /></FadeInUp>
        <FadeInUp><ShopByCategory /></FadeInUp>
        <FadeInUp><ProductsAndIndustrial /></FadeInUp>
        <FadeInUp><GoogleReviewsSection /></FadeInUp>
        <FadeInUp><BlogSection /></FadeInUp>
        <FadeInUp><IndustryNews /></FadeInUp>
        <FadeInUp><FaqSection showLink={true} limit={4} /></FadeInUp>
        <FadeInUp><ContactSection /></FadeInUp>
      </Suspense>
    </>
  );
}
