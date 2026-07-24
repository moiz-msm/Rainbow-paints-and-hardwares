import React from "react";
import { Helmet } from "react-helmet-async";

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  schema?: object | object[];
  type?: "website" | "product" | "category" | "article";
  disableLocalStoreSchema?: boolean;
  // Product specific
  productBrand?: string;
  productPrice?: number;
  productCurrency?: string;
  productAvailability?: "InStock" | "OutOfStock";
}

export const globalLocalStoreSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness", "PaintStore", "Organization"],
  "@id": "https://www.rainbowpaint.in/#organization",
  "name": "Rainbow Paints & Hardwares",
  "image": "https://www.rainbowpaint.in/hero-bg.webp",
  "url": "https://www.rainbowpaint.in",
  "telephone": "+918072442930",
  "email": "rainbow_paint@hotmail.com",
  "priceRange": "INR",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "54 Cox Street, Kattoor",
    "addressLocality": "Coimbatore",
    "addressRegion": "Tamil Nadu",
    "postalCode": "641009",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.0168,
    "longitude": 76.9558
  },
  "areaServed": [
    { "@type": "City", "name": "Coimbatore" },
    { "@type": "City", "name": "RS Puram" },
    { "@type": "City", "name": "Gandhipuram" },
    { "@type": "City", "name": "Saibaba Colony" },
    { "@type": "City", "name": "Peelamedu" },
    { "@type": "City", "name": "Saravanampatti" },
    { "@type": "City", "name": "Kattoor" }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "284"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:30",
      "closes": "20:30"
    }
  ]
};

export default function SEO({
  title = "Rainbow Paints & Hardwares | Buy Paint Online",
  description = "Buy paint online from top India leading brands. Best pricing, doorstep delivery, and 4000+ color shades.",
  keywords = "Asian Paints, Berger Paints, MRF Paints, Dr Fixit, interior wall paint, exterior wall paint, waterproofing, pu and epoxy, industrial paints, colour visualizer, paint cost calculator, faq, blog, buy paint online, wall paint, home colors, paint store near me, Asian paints dealer coimbatore, Berger dealer near me, Paint dealer near me, best paint shop in coimbatore",
  url = "https://www.rainbowpaint.in",
  image = "/hero-bg.webp",
  schema,
  type = "website",
  disableLocalStoreSchema = false,
  productBrand,
  productPrice,
  productCurrency = "INR",
  productAvailability = "InStock",
}: SEOProps) {
  const absoluteImage = image?.startsWith("http")
    ? image
    : `https://www.rainbowpaint.in${image?.startsWith("/") ? "" : "/"}${image}`;

  const allSchemas = React.useMemo(() => {
    const rawList: object[] = [];
    if (schema) {
      if (Array.isArray(schema)) {
        rawList.push(...schema.filter(Boolean));
      } else {
        rawList.push(schema);
      }
    }

    const hasLocalStore = rawList.some((s: any) => {
      if (!s) return false;
      if (s["@id"] === "https://www.rainbowpaint.in/#organization") return true;
      const t = s["@type"];
      if (t === "LocalBusiness" || t === "PaintStore" || t === "HomeAndConstructionBusiness") return true;
      if (Array.isArray(t) && (t.includes("LocalBusiness") || t.includes("PaintStore"))) return true;
      return false;
    });

    if (!hasLocalStore && !disableLocalStoreSchema) {
      return [globalLocalStoreSchema, ...rawList];
    }
    return rawList;
  }, [schema, disableLocalStoreSchema]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph Tags */}
      <meta
        property="og:type"
        content={type === "category" ? "website" : type}
      />
      <meta property="og:site_name" content="Rainbow Paints & Hardwares" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteImage} />

      {/* Product Specific Open Graph */}
      {type === "product" && (
        <>
          {productBrand && (
            <meta property="product:brand" content={productBrand} />
          )}
          {productAvailability && (
            <meta
              property="product:availability"
              content={productAvailability}
            />
          )}
          {productPrice !== undefined && (
            <meta
              property="product:price:amount"
              content={productPrice.toString()}
            />
          )}
          {productCurrency && (
            <meta property="product:price:currency" content={productCurrency} />
          )}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {type === "product" && productPrice !== undefined && (
        <>
          <meta name="twitter:label1" content="Price" />
          <meta name="twitter:data1" content={`₹${productPrice}`} />
        </>
      )}
      {type === "product" && productBrand && (
        <>
          <meta name="twitter:label2" content="Brand" />
          <meta name="twitter:data2" content={productBrand} />
        </>
      )}

      <link rel="icon" type="image/webp" href="/mascot.webp" />
      <link rel="shortcut icon" type="image/webp" href="/mascot.webp" />
      <link rel="apple-touch-icon" href="/mascot.webp" />
      <link rel="canonical" href={url} />

      {type === "product" && image && (
        <link rel="preload" as="image" href={absoluteImage} fetchPriority="high" />
      )}

      {allSchemas.length > 0 && (
        allSchemas.map((s, idx) => (
          <script key={idx} type="application/ld+json">
            {JSON.stringify(s)}
          </script>
        ))
      )}
    </Helmet>
  );
}
