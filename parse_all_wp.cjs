const fs = require('fs');

let html = fs.readFileSync('all_wp.html', 'utf8');
html = html.replace(/&#34;/g, '"');

const regex = /"productName":"([^"]+)","productCode":"[^"]+","productTitle":"([^"]*)","shortDescription":"([^"]*)",(?:.*?)"productPackshotImage":"([^"]+)".*?"livePrice":"([^"]*)"(?:.*?"visibleTags":\[([^\]]*)\])?.*?\}?/g;

let productsMap = new Map();
let match;
while ((match = regex.exec(html)) !== null) {
  let tags = [];
  if (match[6]) {
     tags = match[6].split(',').map(s => s.replace(/"/g, '').trim()).filter(Boolean);
  }
  
  let desc = match[3].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  let name = match[1].replace(/&amp;/g, '&').trim();
  name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  name = name.replace("Smartcare", "SmartCare");
  
  if (!productsMap.has(name)) {
    productsMap.set(name, {
      name: name,
      description: desc,
      price: match[5],
      tags: tags.slice(0, 3),
      image: match[4]
    });
  }
}

const newProducts = Array.from(productsMap.values());
console.log(`Found ${newProducts.length} products from all-products.html`);

const existingData = fs.readFileSync('src/data.ts', 'utf8');

const missing = [];
for (let p of newProducts) {
  if (!existingData.includes(`"name": "${p.name}"`)) {
    missing.push(p);
  }
}

console.log(`Found ${missing.length} missing products.`);
if (missing.length > 0) {
  console.log(missing.map(m => m.name).join('\n'));
}

