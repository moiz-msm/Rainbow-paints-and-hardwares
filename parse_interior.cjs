const fs = require('fs');
let html = fs.readFileSync('interior.html', 'utf8');
html = html.replace(/&#34;/g, '"');

let products = [];
const regex = /"productName":"([^"]+)","productCode":"[^"]+","productTitle":"([^"]+)","shortDescription":"([^"]+)",(?:.*?)"productPackshotImage":"([^"]+)".*?"livePrice":"([^"]*)"(?:.*?"visibleTags":\[([^\]]*)\])?.*?\}?/g;

let match;
while ((match = regex.exec(html)) !== null) {
  let tags = [];
  if (match[6]) {
     tags = match[6].split(',').map(s => s.replace(/"/g, '').trim());
  }
  
  // Try to find sizes
  // Instead of matching the whole block, let's just use the fact that they are nearby
  let sizes = [1];
  
  products.push({
    name: match[1],
    description: match[3],
    price: match[5],
    tags: tags,
    image: match[4]
  });
}
console.log(JSON.stringify(products, null, 2));
