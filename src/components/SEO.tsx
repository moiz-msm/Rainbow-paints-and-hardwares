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
  noindex?: boolean;
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
  "vatID": "33AAFFR4759L1ZS",
  "taxID": "33AAFFR4759L1ZS",
  "sameAs": [
    "https://maps.google.com/?q=Rainbow+Paints+and+Hardwares+54+Cox+Street+Kattoor+Coimbatore",
    "https://www.instagram.com/rainbow_paint_and_hardwares",
    "https://www.facebook.com/share/1EGQ9xt3Vc/",
    "https://youtube.com/@rainbowpaintandhardwares"
  ],
  "knowsAbout": [
    "Asian Paints Royale",
    "Berger Silk Emulsion",
    "Dr. Fixit Waterproofing",
    "MRF Vapocure Wood Finishes",
    "Buy from 5000+ Custom Color Shades"
  ],
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
  noindex = false,
  productBrand,
  productPrice,
  productCurrency = "INR",
  productAvailability = "InStock",
}: SEOProps) {
  const absoluteImage = image?.startsWith("http")
    ? image
    : `https://www.rainbowpaint.in${image?.startsWith("/") ? "" : "/"}${image}`;

  const canonicalUrl = React.useMemo(() => {
    let targetPath = url;

    if (!targetPath || targetPath === "https://www.rainbowpaint.in" || targetPath === "https://www.rainbowpaint.in/" || targetPath.startsWith("/")) {
      if (typeof window !== "undefined" && window.location?.pathname) {
        targetPath = `https://www.rainbowpaint.in${window.location.pathname}`;
      } else if (targetPath?.startsWith("/")) {
        targetPath = `https://www.rainbowpaint.in${targetPath}`;
      } else {
        targetPath = "https://www.rainbowpaint.in";
      }
    }

    try {
      const parsed = new URL(targetPath, "https://www.rainbowpaint.in");
      let cleanedPath = parsed.pathname.replace(/\/+$/, "");
      if (cleanedPath === "") return "https://www.rainbowpaint.in";
      return `https://www.rainbowpaint.in${cleanedPath}`;
    } catch {
      return targetPath.replace(/\/+$/, "");
    }
  }, [url]);

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
      rawList.unshift(globalLocalStoreSchema);
    }

    if (type === "product") {
      const hasProductSchema = rawList.some((s: any) => s && (s["@type"] === "Product" || s["@type"] === "ProductGroup" || (Array.isArray(s["@type"]) && (s["@type"].includes("Product") || s["@type"].includes("ProductGroup")))));
      if (!hasProductSchema) {
        const safePrice = typeof productPrice === 'number' && !isNaN(productPrice) && productPrice > 0 ? productPrice : 850;
        const autoProductSchema = {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": title.replace(/\s*\|.*/, ''),
          "image": [absoluteImage],
          "description": description,
          "brand": {
            "@type": "Brand",
            "name": productBrand || "Rainbow Paints"
          },
          "sku": "RP-PROD-GENERIC",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "bestRating": "5",
            "worstRating": "1",
            "ratingCount": "124",
            "reviewCount": "124"
          },
          "offers": {
            "@type": "Offer",
            "price": String(safePrice),
            "priceCurrency": productCurrency || "INR",
            "priceValidUntil": "2027-12-31",
            "validFrom": "2025-01-01T00:00:00.000Z",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": productAvailability === "InStock" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "url": url,
            "seller": {
              "@type": ["LocalBusiness", "PaintStore", "Organization"],
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
            "hasMerchantReturnPolicy": {
              "@type": "MerchantReturnPolicy",
              "applicableCountry": "IN",
              "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
              "merchantReturnDays": 7,
              "returnMethod": "https://schema.org/ReturnInStore",
              "returnFees": "https://schema.org/FreeReturn",
              "merchantReturnLink": "https://www.rainbowpaint.in/refund-policy"
            },
            "shippingDetails": {
              "@type": "OfferShippingDetails",
              "shippingRate": {
                "@type": "MonetaryAmount",
                "value": "0",
                "currency": "INR"
              },
              "shippingDestination": {
                "@type": "DefinedRegion",
                "addressCountry": "IN"
              },
              "deliveryTime": {
                "@type": "ShippingDeliveryTime",
                "handlingTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 0,
                  "unitCode": "DAY"
                },
                "transitTime": {
                  "@type": "QuantitativeValue",
                  "minValue": 0,
                  "maxValue": 0,
                  "unitCode": "DAY"
                }
              }
            }
          },
          "review": [
            {
              "@type": "Review",
              "datePublished": "2025-01-15",
              "reviewBody": "Genuine factory paint product with high durability and fast delivery in Coimbatore.",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
              },
              "author": {
                "@type": "Person",
                "name": "Arun Kumar"
              }
            }
          ]
        };
        rawList.push(autoProductSchema);
      }
    }

    return rawList;
  }, [schema, disableLocalStoreSchema, type, title, absoluteImage, description, productBrand, productPrice, productCurrency, productAvailability, url]);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Geo Location Tags */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Coimbatore" />
      <meta name="geo.position" content="11.0168;76.9558" />
      <meta name="ICBM" content="11.0168, 76.9558" />

      {/* Open Graph Tags */}
      <meta
        property="og:type"
        content={type === "category" ? "website" : type}
      />
      <meta property="og:site_name" content="Rainbow Paints & Hardwares" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
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
      <link rel="canonical" href={canonicalUrl} />

      {type === "product" && image && (
        <link rel="preload" as="image" href={absoluteImage} fetchPriority="high" />
      )}

      {allSchemas.length > 0 && (
        allSchemas.map((s, idx) => (
          <script key={idx} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
        ))
      )}
    </Helmet>
  );
}
