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
let existingData = fs.readFileSync('src/data.ts', 'utf8');

const missing = [];
for (let p of newProducts) {
  if (!existingData.includes(`"name": "${p.name}"`)) {
    missing.push(p);
  }
}

let addedString = '';
let currentId = 1150; 

for (let p of missing) {
  let unit = "L";
  let sizes = [1, 4, 10, 20];
  
  if (p.name.includes("Adhesive") || p.name.includes("Block 2k") || p.name.includes("Putty") || p.name.includes("Crack Seal") || p.name.includes("Repair") || p.name.includes("Epoxy") || p.name.includes("Plaster") || p.name.includes("Advanced") || p.name.includes("Grout") || p.name.includes("Sealant") || p.name.includes("Bonder") || p.name.includes("Tapes") || p.name.includes("Cemboost") || p.name.includes("Marvello")) {
    unit = "kg";
  }
  
  if (p.name.includes("Tile Coat") || p.name.includes("Primer") || p.name.includes("Ezee")) {
    sizes = [1, 4];
  }
  
  if (p.name.includes("Adhesive") || p.name.includes("Putty") || p.name.includes("Plaster") || p.name.includes("Grout")) {
    sizes = [1, 5, 20];
  }
  
  if (p.name.includes("Tape") || p.name.includes("Sealant")) {
    sizes = [1];
    unit = "pc";
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

if (missing.length > 0) {
  const index = existingData.lastIndexOf('];');
  if (index !== -1) {
    existingData = existingData.substring(0, index) + addedString + '\n' + existingData.substring(index);
    fs.writeFileSync('src/data.ts', existingData);
    console.log('Added ' + missing.length + ' products to data.ts');
  }
}
