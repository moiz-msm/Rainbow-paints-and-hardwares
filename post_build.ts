import fs from 'fs';
import path from 'path';
import { mockProducts, brands, topCategories, subCategories } from './src/data';
import { blogPosts } from './src/data/blogPosts';

const distPath = path.join(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  console.log("dist directory not found. Skipping static generation.");
  process.exit(0);
}

const indexHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');

function generateHtml(urlPath: string, title: string, desc: string, img: string = "https://www.rainbowpaint.in/IMG_20260630_162408.webp", schemaJson?: any) {
  let html = indexHtml.replace(/<title>.*?<\/title>/g, `<title>${title}</title>`);
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"/g, `<meta name="description" content="${desc}"`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"/g, `<meta property="og:title" content="${title}"`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"/g, `<meta property="og:description" content="${desc}"`);
  html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"/g, `<meta property="og:image" content="${img}"`);
  html = html.replace(/<meta\s+property="twitter:title"\s+content="[^"]*"/g, `<meta property="twitter:title" content="${title}"`);
  html = html.replace(/<meta\s+property="twitter:description"\s+content="[^"]*"/g, `<meta property="twitter:description" content="${desc}"`);
  html = html.replace(/<meta\s+property="twitter:image"\s+content="[^"]*"/g, `<meta property="twitter:image" content="${img}"`);
  
  if (schemaJson) {
    const schemaScript = `<script type="application/ld+json">${JSON.stringify(schemaJson)}</script>`;
    html = html.replace('</head>', `${schemaScript}\n</head>`);
  }
  
  const targetDir = path.join(distPath, urlPath);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'index.html'), html);
}

console.log("Generating static HTML for products...");
mockProducts.forEach((product: any) => {
  const slug = product.slug || product.name.replace(/\s+/g, '-').toLowerCase();
  const title = `${product.name} | ${product.brand} | Buy Online at Best Price in Coimbatore`;
  const desc = `Buy ${product.name} online. ${product.subCategory} from ${product.brand}.`;
  
  let finalImage = product.image;
  const key = product.name ? product.name.trim().toLowerCase() : '';
  const accurateImagesMap: any = {
    "royale glitz reserve": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/royale-glitz-reserv-new-packshot.png",
    "apcolite all protek shyne": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-apcolite-all-protek-shyne-packshot-asian-paints.png",
    "royale health shield": "https://5.imimg.com/data5/SELLER/Default/2023/7/326440889/MP/SF/RA/22649264/asian-paints-royale-health-shield-500x500.jpg",
    "apex tile guard matt": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-tile-guard.png",
    "apex ultima stretch": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/ultima-stretch-packshot-asian-paints.png",
    "weathercoat glow": "https://5.imimg.com/data5/SELLER/Default/2021/7/OI/YW/AW/102796245/berger-weathercoat-glow-exterior-emulsion.jpg"
  };
  if (accurateImagesMap[key]) {
     finalImage = accurateImagesMap[key];
  }
  const img = finalImage ? (finalImage.startsWith('http') ? finalImage : `https://www.rainbowpaint.in${finalImage}`) : "https://www.rainbowpaint.in/IMG_20260630_162408.webp";

  const parsePrice = (priceStr: string | undefined): number => {
    if (!priceStr) return 0;
    const num = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
    return isNaN(num) ? 0 : num;
  };
  const basePrice = product.basePrice || parsePrice(product.price) || 850;

  const productUrl = `https://www.rainbowpaint.in/p/${slug}`;
  const sizes = product.sizes || [1, 4, 10, 20];
  const unitSymbol = product.unit === 'kg' ? 'kg' : 'L';
  
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
    const vPrice = Math.round(basePrice * sizeVal * sizeDiscount);
    return {
      "@type": "Offer",
      "name": `${product.name} - ${sizeVal}${unitSymbol} Pack`,
      "sku": `RP-PG-${product.id || '1'}_rp-${product.id || '1'}-${String(sizeVal).toLowerCase()}${unitSymbol.toLowerCase()}`,
      "mpn": `MPN-${product.id || '1'}-${sizeVal}${unitSymbol}`,
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

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": [img],
    "description": desc,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Rainbow Paints"
    },
    "category": product.subCategory || product.topCategory || "Home Paint",
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

  generateHtml(`p/${slug}`, title, desc, img, schemaJson);
});

console.log("Generating static HTML for categories...");
Object.keys(subCategories).forEach(cat => {
  subCategories[cat].forEach(sub => {
    const slug = sub.toLowerCase().replace(/\s+/g, '-');
    const title = `${sub} | Buy Paints Online | Rainbow Paints`;
    const desc = `Buy premium ${sub.toLowerCase()} online at wholesale prices. Rainbow Paints is your trusted local paint store in Coimbatore, offering fast delivery.`;
    
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

console.log("Generating static HTML for brands...");
brands.filter(b => b !== "All Brands").forEach(brand => {
  const slug = brand.toLowerCase().replace(/\s+/g, '-');
  const title = `Buy ${brand} Online | Authorized Dealer in Coimbatore`;
  const desc = `Buy ${brand} online at wholesale prices. Authorized dealer offering fast local doorstep delivery and genuine products.`;
  
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
