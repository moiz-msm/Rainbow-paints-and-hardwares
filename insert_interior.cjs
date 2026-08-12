const fs = require('fs');
let html = fs.readFileSync('interior.html', 'utf8');
html = html.replace(/&#34;/g, '"');

let productsMap = new Map();
const regex = /"productName":"([^"]+)","productCode":"[^"]+","productTitle":"([^"]*)","shortDescription":"([^"]*)",(?:.*?)"productPackshotImage":"([^"]+)".*?"livePrice":"([^"]*)"(?:.*?"visibleTags":\[([^\]]*)\])?.*?\}?/g;

let match;
while ((match = regex.exec(html)) !== null) {
  let tags = [];
  if (match[6]) {
     tags = match[6].split(',').map(s => s.replace(/"/g, '').trim()).filter(Boolean);
  }
  
  // Replace HTML entities in description
  let desc = match[3].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  let name = match[1].replace(/&amp;/g, '&').trim();
  // uppercase first letters of name
  name = name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  // Handle some edge cases in name formatting
  name = name.replace("Royale Play  velour", "Royale Play Velour");
  
  if (productsMap.has(name)) continue; // avoid duplicates

  productsMap.set(name, {
    name: name,
    description: desc,
    price: "₹ " + match[5],
    tags: tags.slice(0, 3), // max 3 tags for properties
    image: match[4]
  });
}

let products = Array.from(productsMap.values());
let addedString = '';
let currentId = 1030;

for (let p of products) {
  let unit = "L";
  if (p.name.includes("Stucco") || p.name.includes("Mineral") || p.name.includes("Marmorino") || p.name.includes("Calcecruda") || p.name.includes("Lithos") || p.name.includes("Archi") || p.name.includes("Teodorico")) {
    unit = "kg";
  }
  let img = p.image.startsWith('http') ? p.image : "https://www.asianpaints.com" + p.image;
  
  addedString += `
  {
    "id": ${currentId++},
    "name": "${p.name}",
    "description": "${p.description}",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "${p.price}",
    "properties": [
      ${p.tags.length > 0 ? '"' + p.tags.join('",\n      "') + '"' : '"Special Effects",\n      "Luxury Finish",\n      "Easy Application"'}
    ],
    "sizes": [1, 5],
    "unit": "${unit}",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "${img}",
    "slug": "${p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}"
  },`;
}

let data = fs.readFileSync('src/data.ts', 'utf8');
const index = data.lastIndexOf('];');
if (index !== -1) {
  data = data.substring(0, index) + addedString + '\n' + data.substring(index);
  fs.writeFileSync('src/data.ts', data);
  console.log('Added ' + products.length + ' Interior Texture products to data.ts');
} else {
  console.log('Could not find end of mockProducts array');
}
