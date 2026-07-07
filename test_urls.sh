#!/bin/bash
URLS=(
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-glitz-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-apcolite-premium-emulsion-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-aspira-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-shyne-luxury-emulsion-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-matt-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-health-shield-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-dust-proof-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-advanced-weatherproof-emulsion-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-emulsion-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-sparc-emulsion-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-emulsion-shyne-asian-paints.png"
"https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-uno-acrylic-distemper-asian-paints.png"
)

for url in "${URLS[@]}"; do
  STATUS=$(curl -o /dev/null -s -w "%{http_code}\n" "$url")
  echo "$STATUS - $url"
done
