const fs = require('fs');

const getReplacement = (indent) => `"shippingDetails": {
${indent}  "@type": "OfferShippingDetails",
${indent}  "shippingRate": {
${indent}    "@type": "DeliveryChargeSpecification",
${indent}    "price": "0",
${indent}    "priceCurrency": "INR",
${indent}    "eligibleTransactionVolume": {
${indent}      "@type": "PriceSpecification",
${indent}      "price": "10000",
${indent}      "priceCurrency": "INR"
${indent}    }
${indent}  },
${indent}  "shippingDestination": {
${indent}    "@type": "DefinedRegion",
${indent}    "addressCountry": "IN",
${indent}    "addressRegion": "Tamil Nadu"
${indent}  },
${indent}  "deliveryTime": {
${indent}    "@type": "ShippingDeliveryTime",
${indent}    "handlingTime": {
${indent}      "@type": "QuantitativeValue",
${indent}      "minValue": 0,
${indent}      "maxValue": 1,
${indent}      "unitCode": "DAY"
${indent}    },
${indent}    "transitTime": {
${indent}      "@type": "QuantitativeValue",
${indent}      "minValue": 0,
${indent}      "maxValue": 1,
${indent}      "unitCode": "DAY"
${indent}    }
${indent}  }
${indent}}`;

const replaceInFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  
  const startIndex = content.indexOf('"shippingDetails": {');
  if (startIndex === -1) return;
  
  // Find indentation
  let i = startIndex - 1;
  while(i >= 0 && content[i] !== '\n') {
    i--;
  }
  const indent = content.substring(i + 1, startIndex);
  
  let braceCount = 0;
  let endIndex = -1;
  let started = false;
  for (let j = startIndex; j < content.length; j++) {
    if (content[j] === '{') {
      braceCount++;
      started = true;
    }
    if (content[j] === '}') {
      braceCount--;
    }
    if (started && braceCount === 0) {
      endIndex = j + 1;
      break;
    }
  }
  
  if (endIndex !== -1) {
    const originalString = content.substring(startIndex, endIndex);
    content = content.replace(originalString, getReplacement(indent));
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
};

replaceInFile('src/pages/ProductDetailPage.tsx');
replaceInFile('src/components/SEO.tsx');
