import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  schema?: object | object[];
}

export default function SEO({ 
  title = "Rainbow Paints & Hardwares | Buy Paint Online", 
  description = "Buy paint online from top India leading brands. Best pricing, doorstep delivery, and 4000+ color shades.", 
  keywords = "paint, buy paint online, wall paint, home colors, paint colors", 
  url = "https://rainbowpaint.in",
  image = "/hero-bg.png",
  schema
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <link rel="canonical" href={url} />

      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
