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
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "PaintStore", "Organization"],
    name: "Rainbow Paints & Hardwares",
    image: "/IMG_20260630_162408.webp",
    "@id": "https://www.rainbowpaint.in/#organization",
    url: "https://www.rainbowpaint.in",
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.0168,
      longitude: 76.9558,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Coimbatore",
      },
      {
        "@type": "City",
        name: "RS Puram",
      },
      {
        "@type": "City",
        name: "Gandhipuram",
      },
      {
        "@type": "City",
        name: "Saibaba Colony",
      },
      {
        "@type": "City",
        name: "Peelamedu",
      },
      {
        "@type": "City",
        name: "Saravanampatti",
      },
    ],
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
    "@id": "https://www.rainbowpaint.in/#website",
    url: "https://www.rainbowpaint.in/",
    name: "Rainbow Paints & Hardwares",
    alternateName: [
      "Rainbow Paint and Hardwares",
      "Rainbow Paints",
      "rainbowpaint.in",
    ],
    description: "Buy paint online from top India leading brands.",
    publisher: {
      "@id": "https://www.rainbowpaint.in/#organization",
    },
    potentialAction: [
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://www.rainbowpaint.in/buy-paint-online?q={search_term_string}",
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
        "url": "https://www.rainbowpaint.in/buy-paint-online"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Paint Cost Calculator",
        "url": "https://www.rainbowpaint.in/calculator"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "AI Color Visualizer",
        "url": "https://www.rainbowpaint.in/visualizer"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Compare Paints",
        "url": "https://www.rainbowpaint.in/compare-paints"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Paint Industry Blog",
        "url": "https://www.rainbowpaint.in/blog"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 6,
        "name": "About Our Paint Shop",
        "url": "https://www.rainbowpaint.in/about"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the best paint store in Coimbatore?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rainbow Paints & Hardwares is a leading authorized dealer for Asian Paints and Berger Paints in Coimbatore, offering over 4000+ shades, wholesale pricing, and expert guidance."
        }
      },
      {
        "@type": "Question",
        "name": "Can I buy Asian Paints online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can buy genuine Asian Paints and Berger Paints online at wholesale prices through the Rainbow Paints & Hardwares website with delivery across Coimbatore and nearby areas."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide on-site wall inspection?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer free site visits and moisture check inspections using digital moisture meters to ensure your walls are ready for painting and to recommend the right waterproofing solutions if needed."
        }
      }
    ]
  };

  return (
    <>
      <LuxuryBackground />
      <SEO
        title="Rainbow Paints & Hardwares | Best Paint Shop in Coimbatore"
        description="Buy paint online from the top paint shop in Coimbatore. Rainbow Paints & Hardwares offers best pricing, local doorstep delivery, and 4000+ color shades."
        url="https://www.rainbowpaint.in/"
        schema={[storeSchema, websiteSchema, siteNavigationSchema, faqSchema]}
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
