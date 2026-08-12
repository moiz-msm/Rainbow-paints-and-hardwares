const fs = require('fs');
let html = fs.readFileSync('terrace.html', 'utf8');
html = html.replace(/&#34;/g, '"');

let productsMap = new Map();
const regex = /"productName":"([^"]+)","productCode":"[^"]+","productTitle":"([^"]*)","shortDescription":"([^"]*)",(?:.*?)"productPackshotImage":"([^"]+)".*?"livePrice":"([^"]*)"(?:.*?"visibleTags":\[([^\]]*)\])?.*?\}?/g;

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
  
  if (productsMap.has(name)) continue;

  productsMap.set(name, {
    name: name,
    description: desc,
    price: match[5],
    tags: tags.slice(0, 3),
    image: match[4]
  });
}

let products = Array.from(productsMap.values());
let addedString = '';
let currentId = 1100; // start at 1100 to avoid conflicts

for (let p of products) {
  let unit = "L";
  let sizes = [1, 4, 10, 20];
  
  if (p.name.includes("Adhesive") || p.name.includes("Block 2k")) {
    unit = "kg";
  }
  
  if (p.name.includes("Tile Coat") || p.name.includes("Tile Primer")) {
    sizes = [1, 4];
  }
  
  if (p.name.includes("Tile Adhesive")) {
    sizes = [20];
  }

  let img = p.image.startsWith('http') ? p.image : "https://www.asianpaints.com" + p.image;
  let tagsJson = p.tags.length > 0 ? '"' + p.tags.join('",\n      "') + '"' : '"Waterproofing",\n      "High Performance",\n      "Protection"';
  
  addedString += `
  {
    "id": ${currentId++},
    "name": "${p.name}",
    "description": "${p.description}",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ ${parseFloat(p.price).toFixed(2)}",
    "properties": [
      ${tagsJson}
    ],
    "sizes": [${sizes.join(', ')}],
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
  console.log('Added ' + products.length + ' Terrace and Tanks Waterproofing products to data.ts');
}
