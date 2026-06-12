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
  // Product specific
  productBrand?: string;
  productPrice?: number;
  productCurrency?: string;
  productAvailability?: "InStock" | "OutOfStock";
}

export default function SEO({
  title = "Rainbow Paints & Hardwares | Buy Paint Online",
  description = "Buy paint online from top India leading brands. Best pricing, doorstep delivery, and 4000+ color shades.",
  keywords = "Asian Paints, Berger Paints, MRF Paints, Dr Fixit, interior wall paint, exterior wall paint, waterproofing, pu and epoxy, industrial paints, colour visualizer, paint cost calculator, faq, blog, buy paint online, wall paint, home colors",
  url = "https://rainbowpaint.in",
  image = "/hero-bg.webp",
  schema,
  type = "website",
  productBrand,
  productPrice,
  productCurrency = "INR",
  productAvailability = "InStock",
}: SEOProps) {
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
      <meta property="og:image" content={image} />

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
      <meta name="twitter:image" content={image} />

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

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
