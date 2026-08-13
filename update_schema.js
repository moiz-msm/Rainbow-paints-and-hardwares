const fs = require('fs');

const replacement = `"shippingDetails": {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "DeliveryChargeSpecification",
        "price": "0",
        "priceCurrency": "INR",
        "eligibleTransactionVolume": {
          "@type": "PriceSpecification",
          "price": "10000",
          "priceCurrency": "INR"
        }
      },
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "IN",
        "addressRegion": "Tamil Nadu"
      },
      "deliveryTime": {
        "@type": "ShippingDeliveryTime",
        "handlingTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "DAY"
        },
        "transitTime": {
          "@type": "QuantitativeValue",
          "minValue": 0,
          "maxValue": 1,
          "unitCode": "DAY"
        }
      }
    }`;

const replaceInFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  
  // This regex matches "shippingDetails": { ... } up to its closing brace
  // It relies on finding the end of shippingDetails. Let's make a precise regex.
  const regex = /"shippingDetails":\s*\{\s*"@type":\s*"OfferShippingDetails"[\s\S]*?(?="hasMerchantReturnPolicy"|"hasMerchantReturnPolicy"|};|},|"\w+":)/g;
  
  // Wait, let's use a custom string replacement
  const startIndex = content.indexOf('"shippingDetails": {');
  if (startIndex === -1) return;
  // find matching brace
  let braceCount = 0;
  let endIndex = -1;
  let started = false;
  for (let i = startIndex; i < content.length; i++) {
    if (content[i] === '{') {
      braceCount++;
      started = true;
    }
    if (content[i] === '}') {
      braceCount--;
    }
    if (started && braceCount === 0) {
      endIndex = i + 1;
      break;
    }
  }
  
  if (endIndex !== -1) {
    const originalString = content.substring(startIndex, endIndex);
    content = content.replace(originalString, replacement);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
};

replaceInFile('src/pages/ProductDetailPage.tsx');
replaceInFile('src/components/SEO.tsx');
