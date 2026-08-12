const fs = require('fs');

const files = ['exteriors.html', 'interiors.html', 'bathroom.html', 'repairs.html'];
let productsMap = new Map();

for (let file of files) {
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/&#34;/g, '"');

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
}

let products = Array.from(productsMap.values());
console.log(`Found ${products.length} products`);
let addedString = '';
let currentId = 1120; 

let existingData = fs.readFileSync('src/data.ts', 'utf8');

for (let p of products) {
  // Check if we already have it
  if (existingData.includes(`"name": "${p.name}"`)) {
    continue;
  }
  
  let unit = "L";
  let sizes = [1, 4, 10, 20];
  
  if (p.name.includes("Adhesive") || p.name.includes("Block 2k") || p.name.includes("Putty") || p.name.includes("Crack Seal") || p.name.includes("Repair") || p.name.includes("Epoxy") || p.name.includes("Plaster") || p.name.includes("Advanced")) {
    unit = "kg";
  }
  
  if (p.name.includes("Tile Coat") || p.name.includes("Primer") || p.name.includes("Ezee")) {
    sizes = [1, 4];
  }
  
  if (p.name.includes("Adhesive") || p.name.includes("Putty") || p.name.includes("Plaster")) {
    sizes = [1, 5, 20];
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

const index = existingData.lastIndexOf('];');
if (index !== -1 && addedString) {
  existingData = existingData.substring(0, index) + addedString + '\n' + existingData.substring(index);
  fs.writeFileSync('src/data.ts', existingData);
  console.log('Added ' + currentId + ' products to data.ts');
} else {
  console.log('No new products added.');
}
