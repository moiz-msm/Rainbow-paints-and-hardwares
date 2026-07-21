const fs = require('fs');

let server = fs.readFileSync('server.ts', 'utf-8');

const oldCode = `        if (url.startsWith('/p/')) {
          const slug = url.split('/')[2];
          const product = mockProducts.find(p => (p.slug || p.name.replace(/\\s+/g, '-').toLowerCase()) === slug);
          if (product) {
            title = \`\${product.name} | \${product.brand} | Buy Online at Best Price in Coimbatore\`;
            desc = \`Buy \${product.name} online. \${product.subCategory} from \${product.brand}.\`;
            img = product.image ? (product.image.startsWith('http') ? product.image : \`https://www.rainbowpaint.in\${product.image}\`) : img;
          }
        }`;

const newCode = `        if (url.startsWith('/p/')) {
          const slug = decodeURIComponent(url.split('/')[2]);
          const product = mockProducts.find(p => (p.slug || p.name.replace(/\\s+/g, '-').toLowerCase()) === slug);
          if (product) {
            title = \`\${product.name} | \${product.brand} | Buy Online at Best Price in Coimbatore\`;
            desc = \`Buy \${product.name} online. \${product.subCategory} from \${product.brand}.\`;
            let finalImage = product.image;
            
            const key = product.name ? product.name.trim().toLowerCase() : '';
            const accurateImagesMap = {
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
            
            img = finalImage ? (finalImage.startsWith('http') ? finalImage : \`https://www.rainbowpaint.in\${finalImage}\`) : img;
          }
        }`;

if (server.includes(oldCode)) {
  server = server.replace(oldCode, newCode);
  fs.writeFileSync('server.ts', server);
  console.log("Patched server.ts successfully");
} else {
  console.log("Could not find old code in server.ts");
}
