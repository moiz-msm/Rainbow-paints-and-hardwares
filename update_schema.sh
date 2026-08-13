#!/bin/bash

# Update ProductDetailPage.tsx
sed -i 's/"shippingRate": {/"shippingRate": {\n        "@type": "DeliveryChargeSpecification",\n        "price": "0",\n        "priceCurrency": "INR",\n        "eligibleTransactionVolume": {\n          "@type": "PriceSpecification",\n          "price": "10000",\n          "priceCurrency": "INR"\n        }\n      },\n      "temp": {/g' src/pages/ProductDetailPage.tsx

