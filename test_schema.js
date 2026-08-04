const sizes = [1, 4, 10, 20];
const targetProduct = {name: 'Test Paint', id: '123', brand: 'Rainbow Paints', unit: 'L'};
const basePrice = 500;
const unitSymbol = 'L';
const unitCode = 'LTR';
const productUrl = 'https://www.rainbowpaint.in/p/test';
const absImage = 'https://example.com/img.png';

const sellerObj = {
  '@type': 'Organization',
  name: 'Rainbow Paints & Hardwares',
  url: 'https://www.rainbowpaint.in'
};

const merchantReturnPolicy = {};
const shippingDetails = {};
const productDetails = { desc1: 'Desc' };

const variationOffers = sizes.map((sizeVal) => {
  return {
    "@type": "Offer",
    "name": `${targetProduct.name} - ${sizeVal}${unitSymbol} Pack`,
    "sku": `RP-${targetProduct.id || '1'}-${sizeVal}${unitSymbol}`,
    "mpn": `MPN-${targetProduct.id || '1'}-${sizeVal}${unitSymbol}`,
    "price": String(basePrice * sizeVal),
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

const variants = sizes.map((sizeVal, idx) => {
  const offer = variationOffers[idx];
  return {
    "@type": "Product",
    "sku": `RP-${targetProduct.id || '1'}-${sizeVal}${unitSymbol}`,
    "mpn": `MPN-${targetProduct.id || '1'}-${sizeVal}${unitSymbol}`,
    "name": targetProduct.name,
    "image": [absImage],
    "description": productDetails?.desc1 || `Buy ${targetProduct.name} online from Rainbow Paints. ${targetProduct.subCategory || ''} by ${targetProduct.brand}. Original factory packaging with fast delivery.`,
    "brand": {
      "@type": "Brand",
      "name": targetProduct.brand || "Rainbow Paints"
    },
    "category": targetProduct.subCategory || targetProduct.topCategory || "Home Paint",
    "size": `${sizeVal} ${unitSymbol}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": "124",
      "reviewCount": "124"
    },
    "review": [
      {
        "@type": "Review",
        "datePublished": "2025-01-15",
        "reviewBody": `Genuine factory product ${targetProduct.name} with fast delivery and high quality finish.`,
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
    ],
    "offers": offer
  };
});

const baseSchema = {
  "@context": "https://schema.org",
  "name": targetProduct.name || "Paint Product",
  "image": [absImage],
  "description": productDetails?.desc1 || `Buy ${targetProduct.name} online from Rainbow Paints. ${targetProduct.subCategory || ''} by ${targetProduct.brand}. Original factory packaging with fast delivery.`,
  "brand": {
    "@type": "Brand",
    "name": targetProduct.brand || "Rainbow Paints"
  },
  "category": targetProduct.subCategory || targetProduct.topCategory || "Home Paint",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "124",
    "reviewCount": "124"
  },
  "review": [
    {
      "@type": "Review",
      "datePublished": "2025-01-15",
      "reviewBody": `Genuine factory product ${targetProduct.name} with fast delivery and high quality finish.`,
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

let res;
if (sizes.length > 1) {
  res = {
    ...baseSchema,
    "@type": "ProductGroup",
    "productGroupID": `RP-PG-${targetProduct.id || '1'}`,
    "variesBy": ["https://schema.org/size"],
    "hasVariant": variants
  };
} else {
  res = {
    ...baseSchema,
    "@type": "Product",
    "sku": `RP-${targetProduct.id || '1'}-${sizes[0] || 1}${unitSymbol}`,
    "mpn": `MPN-${targetProduct.id || '1'}`,
    "offers": variationOffers[0]
  };
}
console.log(JSON.stringify(res, null, 2));
