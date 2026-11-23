import fs from 'fs';
import path from 'path';
import { mockProducts, brands, topCategories, subCategories } from './src/data';
import { blogPosts } from './src/data/blogPosts';
import { getRichProductContent } from './src/data/richProductContent';
import { getProductSeoData } from './src/utils/productSeo';
import { buildWaterBasedPrimerHeroSummary, getWaterBasedWallPrimerRole } from './src/utils/primerSeo';
import { HD_PACKSHOT_IMAGES, upgradeCdnImageUrl } from './src/constants/hdPackshotImages';

const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.log("dist directory not found. Skipping static generation.");
  process.exit(0);
}

const indexHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

function escapeHtmlAttr(val: string): string {
  return val.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function generateHtml(
  urlPath: string,
  title: string,
  desc: string,
  img: string = "https://www.rainbowpaint.in/IMG_20260630_162408.webp",
  schemaJson?: any,
  keywords?: string
) {
  const safeTitle = escapeHtmlAttr(title);
  const safeDesc = escapeHtmlAttr(desc);
  const canonicalUrl = `https://www.rainbowpaint.in/${urlPath.replace(/^\/+|\/+$/g, '')}`;

  let html = indexHtml.replace(/<title>.*?<\/title>/g, `<title>${title}</title>`);
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/g, `<meta name="description" content="${safeDesc}"`);
  if (keywords) {
    if (/<meta\s+name="keywords"/i.test(html)) {
      html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"/g, `<meta name="keywords" content="${escapeHtmlAttr(keywords)}"`);
    } else {
      html = html.replace('</head>', `<meta name="keywords" content="${escapeHtmlAttr(keywords)}" />\n</head>`);
    }
  }
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"/g, `<meta property="og:title" content="${safeTitle}"`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"/g, `<meta property="og:description" content="${safeDesc}"`);
  html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"/g, `<meta property="og:image" content="${img}"`);
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"/g, `<meta property="og:url" content="${canonicalUrl}"`);
  html = html.replace(/<meta\s+property="twitter:title"\s+content="[^"]*"/g, `<meta property="twitter:title" content="${safeTitle}"`);
  html = html.replace(/<meta\s+property="twitter:description"\s+content="[^"]*"/g, `<meta property="twitter:description" content="${safeDesc}"`);
  html = html.replace(/<meta\s+property="twitter:image"\s+content="[^"]*"/g, `<meta property="twitter:image" content="${img}"`);
  html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"/g, `<link rel="canonical" href="${canonicalUrl}"`);

  if (schemaJson) {
    const schemaList = Array.isArray(schemaJson) ? schemaJson.filter(Boolean) : [schemaJson];
    const schemaScripts = schemaList
      .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
      .join('\n');
    html = html.replace('</head>', `${schemaScripts}\n</head>`);
  }

  const targetDir = path.join(distPath, urlPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
}

console.log("Generating static HTML for products...");
mockProducts.forEach((product: any) => {
  const slug = product.slug || product.name.replace(/\s+/g, '-').toLowerCase();
  const richContent = getRichProductContent(product.name, product);
  const parsePrice = (priceStr: string | undefined): number => {
    if (!priceStr) return 0;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };
  const basePrice = product.basePrice || parsePrice(product.price) || 850;
  const sizes = product.sizes || [1, 4, 10, 20];
  const unitSymbol = product.unit === 'kg' ? 'kg' : product.unit === 'pcs' ? 'pcs' : 'L';
  const firstSize = sizes[0] || 1;
  const startingPrice = (product.sizePrices && product.sizePrices[firstSize]) || basePrice;
  const startingPack = {
    sizeLabel: firstSize < 1 && unitSymbol === 'L' ? `${Math.round(firstSize * 1000)}ml` : `${firstSize}${unitSymbol}`,
    price: startingPrice,
  };

  const seoData = getProductSeoData(product, startingPack);
  const primerRole = getWaterBasedWallPrimerRole(product.name);
  const title = primerRole
    ? seoData.title
    : richContent?.seo?.title || product.seoTitle || seoData.title;
  const desc = primerRole
    ? seoData.description
    : richContent?.seo?.description || product.seoDescription || seoData.description;
  const keywords = primerRole
    ? seoData.keywords
    : richContent?.seo?.keywords || product.seoKeywords || seoData.keywords;

  let finalImage = product.image;
  const key = product.name ? product.name.trim().toLowerCase() : '';
  const accurateImagesMap: Record<string, string> = {
    "royale health shield": "https://5.imimg.com/data5/SELLER/Default/2023/7/326440889/MP/SF/RA/22649264/asian-paints-royale-health-shield-500x500.jpg",
    "apex tile guard matt": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-tile-guard.png",
    "apex ultima stretch": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/ultima-stretch-packshot-asian-paints.png",
    "weathercoat glow": "https://5.imimg.com/data5/SELLER/Default/2021/7/OI/YW/AW/102796245/berger-weathercoat-glow-exterior-emulsion.jpg",
    ...HD_PACKSHOT_IMAGES
  };
  if (accurateImagesMap[key]) {
     finalImage = accurateImagesMap[key];
  }
  finalImage = upgradeCdnImageUrl(finalImage);
  const img = finalImage ? (finalImage.startsWith('http') ? finalImage : `https://www.rainbowpaint.in${finalImage.startsWith('/') ? '' : '/'}${finalImage}`) : "https://www.rainbowpaint.in/IMG_20260630_162408.webp";

  const schemaImages = richContent?.gallery?.length
    ? richContent.gallery.map((g) =>
        g.src.startsWith('http') ? g.src : `https://www.rainbowpaint.in${g.src.startsWith('/') ? '' : '/'}${g.src}`
      )
    : [img];

  const productUrl = `https://www.rainbowpaint.in/p/${slug}`;
  
  const sellerObj = {
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
  };

  const merchantReturnPolicy = {
    "@type": "MerchantReturnPolicy",
    "applicableCountry": "IN",
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
    "merchantReturnDays": 7,
    "returnMethod": "https://schema.org/ReturnInStore",
    "returnFees": "https://schema.org/FreeReturn",
    "merchantReturnLink": "https://www.rainbowpaint.in/refund-policy"
  };

  const shippingDetails = {
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
        "unitCode": "d"
      },
      "transitTime": {
        "@type": "QuantitativeValue",
        "minValue": 0,
        "maxValue": 0,
        "unitCode": "d"
      }
    }
  };

  const variationOffers = sizes.map((sizeVal: number) => {
    let sizeDiscount = 1;
    if (product.unit === 'kg') {
      if (sizeVal === 5) sizeDiscount = 0.94;
      if (sizeVal === 20) sizeDiscount = 0.53;
      if (sizeVal === 25) sizeDiscount = 0.8;
      if (sizeVal === 40) sizeDiscount = 0.472;
      if (sizeVal === 50) sizeDiscount = 0.628;
    } else {
      if (sizeVal === 4) sizeDiscount = 0.96;
      if (sizeVal === 10) sizeDiscount = 0.92;
      if (sizeVal === 20) sizeDiscount = 0.88;
    }
    const vPrice = product.sizePrices && product.sizePrices[sizeVal]
      ? product.sizePrices[sizeVal]
      : Math.round(basePrice * sizeVal * sizeDiscount);
    return {
      "@type": "Offer",
      "name": `${product.name} - ${sizeVal}${unitSymbol} Pack`,
      "sku": `RP-PG-${product.id || slug}_rp-${product.id || slug}-${String(sizeVal).toLowerCase()}${unitSymbol.toLowerCase()}`,
      "mpn": `MPN-${product.id || slug}-${sizeVal}${unitSymbol}`,
      "price": String(vPrice),
      "priceCurrency": "INR",
      "priceValidUntil": "2027-12-31",
      "validFrom": "2025-01-01T00:00:00.000Z",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "url": `${productUrl}?size=${sizeVal}`,
      "seller": sellerObj,
      "hasMerchantReturnPolicy": merchantReturnPolicy,
      "shippingDetails": shippingDetails
    };
  });

  const schemaDescription =
    richContent?.heroSummary ||
    (primerRole ? buildWaterBasedPrimerHeroSummary(product.name, product.brand, primerRole, product.properties) : '') ||
    product.description ||
    desc;

  const additionalProps = seoData.additionalProperties || richContent?.seo?.additionalProperties || [];

  const productSchema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "url": productUrl,
    "sku": `RP-${product.id || '1'}`,
    "mpn": `MPN-${product.id || '1'}`,
    "image": schemaImages,
    "description": schemaDescription,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Rainbow Paints"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": product.brand || "Rainbow Paints"
    },
    "category": product.subCategory || product.topCategory || "Home Paint",
    ...(richContent?.seo?.material ? { "material": richContent.seo.material } : {}),
    ...(richContent?.seo?.colorSummary ? { "color": richContent.seo.colorSummary } : {}),
    ...(additionalProps.length
      ? {
          "additionalProperty": additionalProps.map((p) => ({
            "@type": "PropertyValue",
            "name": p.name,
            "value": p.value
          }))
        }
      : {}),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "124",
      "reviewCount": "124"
    },
    "offers": variationOffers
  };

  const schemas: any[] = [productSchema];

  const faqsForSchema = seoData.faqs?.length ? seoData.faqs : richContent?.faqs;
  if (faqsForSchema?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqsForSchema.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  if (richContent?.applicationSteps?.steps?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": `How to Apply ${product.brand} ${product.name}`,
      "description": richContent.applicationSteps.subtitle,
      "image": img,
      "step": richContent.applicationSteps.steps.map((step, idx) => ({
        "@type": "HowToStep",
        "position": idx + 1,
        "name": step.title,
        "text": `${step.detail} (${step.timing})`
      }))
    });
  }

  generateHtml(`p/${slug}`, title, desc, img, schemas, keywords);
});

console.log("Generating static HTML for categories...");
const categorySeoMap: Record<string, { title: string; desc: string }> = {
  'interior-paint': {
    title: 'Interior Wall Paints in Coimbatore – Washable Emulsions & Luxury | Rainbow',
    desc: 'Explore interior wall paints in Coimbatore for homes & commercial spaces. Compare washable emulsions, luxury finishes & stain-resistant paints at Rainbow Paints.'
  },
  'exterior-paint': {
    title: 'Exterior Wall Paints in Coimbatore – Weatherproof Emulsions | Rainbow',
    desc: 'Discover weatherproof exterior wall paints in Coimbatore designed for maximum durability. Compare exterior emulsions from leading brands with fast delivery!'
  },
  'pu-paint': {
    title: 'PU Wood Coatings in Coimbatore – Sealer, Polish & Finish | Rainbow',
    desc: 'Explore PU wood coatings, sealers, topcoats & polishes in Coimbatore for furniture, doors & wooden surfaces. Compare MRF & top brands at Rainbow Paints.'
  },
  'epoxy-paint': {
    title: 'Industrial Epoxy Paints in Coimbatore – Floor Coatings | Rainbow',
    desc: 'Industrial epoxy floor paints, primers & chemical-resistant protective systems in Coimbatore for concrete & metal surfaces. Request wholesale quotes today!'
  },
  'primers': {
    title: 'Interior Primer & Exterior Primer – Wall & Metal Primers | Rainbow',
    desc: 'Shop water-based interior primer, exterior primer & anti-rust metal primers from Asian Paints, Berger & MRF at wholesale prices in Coimbatore. Fast delivery!'
  },
  'waterproofing': {
    title: 'Waterproofing in Coimbatore – Roof, Terrace & Wall Solutions | Rainbow',
    desc: 'Shop waterproofing products in Coimbatore for roofs, terraces, bathrooms & exterior walls. Compare Dr. Fixit & SmartCare coatings at wholesale rates!'
  },
  'enamel-paint': {
    title: 'Enamel Paint in Coimbatore – Gloss & Satin Metal Paint | Rainbow',
    desc: 'Buy durable enamel paints in Coimbatore for metal, grills, doors & woodwork. High-gloss & satin synthetic enamels with long-lasting rust protection.'
  }
};

Object.keys(subCategories).forEach(cat => {
  subCategories[cat].forEach(sub => {
    if (sub.startsWith('All ')) return;
    const slug = sub.toLowerCase().replace(/\s+/g, '-');
    const mapped = categorySeoMap[slug];
    const title = mapped ? mapped.title : `${sub} in Coimbatore | Buy Paints Online | Rainbow Paints`;
    const desc = mapped ? mapped.desc : `Buy premium ${sub.toLowerCase()} in Coimbatore at wholesale prices. Rainbow Paints is your trusted local paint store offering fast delivery.`;
    
    // Generate ItemList schema
    let filtered = mockProducts.filter((p: any) => p.subCategory === sub || p.category === sub);
    const topProducts = filtered.slice(0, 15);
    
    let schemaJson: any = null;
    if (topProducts.length > 0) {
      schemaJson = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": title,
        "description": desc,
        "itemListElement": topProducts.map((p: any, idx: number) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "Product",
            "name": p.name,
            "image": p.image ? (p.image.startsWith('http') ? p.image : `https://www.rainbowpaint.in${p.image.startsWith('/') ? '' : '/'}${p.image}`) : undefined,
            "url": `https://www.rainbowpaint.in/p/${p.slug || p.name.replace(/\s+/g, '-').toLowerCase()}`,
            "offers": {
              "@type": "Offer",
              "priceCurrency": "INR",
              "price": String(p.basePrice || (p.sizes && p.sizes[0] ? p.sizes[0] * 850 : 850)),
              "availability": "https://schema.org/InStock"
            }
          }
        }))
      };
    }
    
    generateHtml(`c/${slug}`, title, desc, "https://www.rainbowpaint.in/IMG_20260630_162408.webp", schemaJson);
  });
});

console.log("Generating static HTML redirects for legacy categories...");
const legacyRedirects: Record<string, string> = {
  'c/interior-wall': '/c/interior-paint',
  'c/exterior-wall': '/c/exterior-paint',
  'c/undercoats': '/c/primers',
  'c/metals-and-grills': '/c/enamel-paint',
  'c/metal-and-grills': '/c/enamel-paint',
  'c/pu-coatings': '/c/pu-paint',
  'c/epoxy-coatings': '/c/epoxy-paint'
};

Object.entries(legacyRedirects).forEach(([oldPath, newUrl]) => {
  const targetDir = path.join(distPath, oldPath);
  fs.mkdirSync(targetDir, { recursive: true });
  const redirectHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0; url=${newUrl}">
  <link rel="canonical" href="https://www.rainbowpaint.in${newUrl}">
</head>
<body>
  <p>Redirecting to <a href="${newUrl}">${newUrl}</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(targetDir, 'index.html'), redirectHtml);
});

console.log("Generating static HTML for brands...");
const brandSeoMap: Record<string, { title: string; desc: string }> = {
  'asian-paints': {
    title: 'Asian Paints Authorised Dealer in Coimbatore – Royale & Apex | Rainbow',
    desc: 'Authorised Asian Paints dealer in Coimbatore. Buy Royale Glitz, Apex Ultima, primers & 4000+ shades at direct wholesale prices with fast doorstep delivery!'
  },
  'berger-paints': {
    title: 'Berger Paints Dealer in Coimbatore – Silk & WeatherCoat | Rainbow',
    desc: 'Authorised Berger Paints dealer in Coimbatore. Shop Silk Glamor, Easy Clean, Weathercoat & Bison emulsions at direct wholesale prices with computerized tinting!'
  },
  'mrf-vapocure': {
    title: 'MRF Vapocure PU Paints in Coimbatore – WoodCoat & MetalCoat | Rainbow',
    desc: 'Authorised MRF Vapocure dealer in Coimbatore. Buy premium 2K PU WoodCoat, MetalCoat, sealers, thinners & high-durability finishes at wholesale rates!'
  },
  'dr-fixit': {
    title: 'Dr. Fixit Waterproofing in Coimbatore – Roof, Terrace & Wall | Rainbow',
    desc: 'Authorised Dr. Fixit dealer in Coimbatore. Complete terrace waterproofing, LW+, Crack-X, damp-proof coatings & sealants with direct expert technical advice!'
  },
  'birla-white': {
    title: 'Birla White Cement & WallCare Putty in Coimbatore | Rainbow Paints',
    desc: 'Authorised Birla White dealer in Coimbatore. Buy WallCare Putty, White Cement & Levelplast at direct wholesale rates with prompt same-day local dispatch!'
  },
  'sheenlac': {
    title: 'Sheenlac Wood Finishes & Polish in Coimbatore | Rainbow Paints',
    desc: 'Authorised Sheenlac dealer in Coimbatore. Explore premium wood finishes, stains, NC thinners, wood polishes & paint removers at wholesale rates with fast delivery!'
  },
  'fevicol': {
    title: 'Fevicol Adhesives in Coimbatore – Wood Glue & Resin | Rainbow',
    desc: 'Authorised Fevicol dealer in Coimbatore. Buy Marine, SH Synthetic Resin & contact adhesives for woodworking and laminates at wholesale prices with genuine stock!'
  },
  'just-spray': {
    title: 'Just Spray Aerosol Paint Cans in Coimbatore | Rainbow Paints',
    desc: 'Authorised Just Spray dealer in Coimbatore. Buy JS1 aerosol spray paint cans in classic, metallic & primer variations at wholesale prices with prompt local delivery!'
  },
  'ajax': {
    title: 'Ajax Waterproof Sandpaper & Emery Paper in Coimbatore | Rainbow',
    desc: 'Authorised Ajax dealer in Coimbatore. Buy waterproof water emery papers, red dry sanding rolls & abrasives at wholesale prices for smooth surface prep!'
  },
  'bawa': {
    title: 'Paint Brushes & Tools in Coimbatore – Bawa & Jaya | Rainbow',
    desc: 'Shop professional Bawa & Jaya painting brushes in Coimbatore: Joker, Prince & Diamond series. High-density bristle brushes for streak-free painting!'
  },
  'jaya': {
    title: 'Paint Brushes & Tools in Coimbatore – Bawa & Jaya | Rainbow',
    desc: 'Shop professional Bawa & Jaya painting brushes in Coimbatore: Joker, Prince & Diamond series. High-density bristle brushes for streak-free painting!'
  },
  'gorila': {
    title: 'Gorila Cement Color Oxide Powders in Coimbatore | Rainbow',
    desc: 'Buy vibrant Gorila cement color oxide powders in Coimbatore for flooring, mosaics & architectural mixes. Superior UV stability & high pigmentation at wholesale rates.'
  }
};

brands.filter(b => b !== "All Brands").forEach(brand => {
  const slug = brand.toLowerCase().replace(/\s+/g, '-');
  const mapped = brandSeoMap[slug];
  const title = mapped ? mapped.title : `Buy ${brand} in Coimbatore – Wholesale Paint Dealer | Rainbow`;
  const desc = mapped ? mapped.desc : `Buy genuine ${brand} products in Coimbatore at direct wholesale prices. Authorised dealer offering fast local delivery and 100% genuine stock.`;
  
  // Generate ItemList schema
  let filtered = mockProducts.filter((p: any) => p.brand === brand);
  const topProducts = filtered.slice(0, 15);
  
  let schemaJson: any = null;
  if (topProducts.length > 0) {
    schemaJson = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": title,
      "description": desc,
      "itemListElement": topProducts.map((p: any, idx: number) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "Product",
          "name": p.name,
          "image": p.image ? (p.image.startsWith('http') ? p.image : `https://www.rainbowpaint.in${p.image.startsWith('/') ? '' : '/'}${p.image}`) : undefined,
          "url": `https://www.rainbowpaint.in/p/${p.slug || p.name.replace(/\s+/g, '-').toLowerCase()}`,
          "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": String(p.basePrice || (p.sizes && p.sizes[0] ? p.sizes[0] * 850 : 850)),
            "availability": "https://schema.org/InStock"
          }
        }
      }))
    };
  }
  
  generateHtml(`brands/${slug}`, title, desc, "https://www.rainbowpaint.in/IMG_20260630_162408.webp", schemaJson);
});

console.log("Finished generating static HTML.");
