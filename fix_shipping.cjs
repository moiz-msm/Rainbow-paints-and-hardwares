const fs = require('fs');

const replacement = `const shippingDetails = {
      "@type": "OfferShippingDetails",
      "shippingRate": {
        "@type": "MonetaryAmount",
        "value": "0",
        "currency": "INR"
      },
      "shippingDestination": {
        "@type": "DefinedRegion",
        "addressCountry": "IN",
        "addressRegion": "TN",
        "addressLocality": "Coimbatore"
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
          "maxValue": 1,
          "unitCode": "DAY"
        }
      }
    }`;

const replaceInFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  
  const startIndex = content.indexOf('const shippingDetails = {');
  if (startIndex === -1) return;
  
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
    content = content.replace(originalString, replacement);
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
};

replaceInFile('src/pages/ProductDetailPage.tsx');
