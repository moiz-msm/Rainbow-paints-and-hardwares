const fs = require('fs');

const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const updates = {
  "Apex Duracast Swirl Tex": {
    price: "₹ 1099.00",
    sizes: [25],
    unit: "kg",
    properties: ["Premium Textured Finish", "Style and Strength", "Exterior Texture"]
  },
  "Apex Duracast Cross Tex": {
    price: "₹ 1100.00",
    sizes: [25],
    unit: "kg",
    properties: ["Silica-based Acrylic Texture", "Striking Trowel-based Patterns", "High-performance"]
  },
  "Apex Duracast Dholpur Tex": {
    price: "₹ 1345.00",
    sizes: [25],
    unit: "kg",
    properties: ["Intermediate Finish", "Protection and Décor", "Premium Texture"]
  },
  "Apex Duracast Fine Tex": {
    price: "₹ 1420.00",
    sizes: [5, 20],
    unit: "kg",
    properties: ["Modified Acrylic Texture", "Subtle Yet Distinctive Look", "Water-based Finish"]
  },
  "Apex Duracast Pebble Tex": {
    price: "₹ 1520.00",
    sizes: [5, 30],
    unit: "kg",
    properties: ["Textured Exterior Finish", "Excellent Weather Resistance", "Hides Hairline Cracks"]
  },
  "Apex Duracast Rough Tex": {
    price: "₹ 1150.00",
    sizes: [25],
    unit: "kg",
    properties: ["Textured Finish", "Hides Surface Undulations", "Tough & Durable"]
  },
  "Apex Createx Scratch Finish": {
    price: "₹ 950.00",
    sizes: [25],
    unit: "kg",
    properties: ["Scratch Finish Texture", "Superior Adhesion", "Exterior Textures", "4-6 Years Expected Warranty"]
  },
  "Apex Createx Roller Finish": {
    price: "₹ 850.00",
    sizes: [20],
    unit: "kg",
    properties: ["Roller Finish Texture", "Superior Adhesion", "Exterior Textures", "4-6 Years Expected Warranty"]
  },
  "Apex Createx Dholpur": {
    price: "₹ 2130.00",
    sizes: [5, 25],
    unit: "kg",
    properties: ["Premium Intermediate Finish", "Enduring Durability", "Exterior Décor and Protection", "4-6 Years Expected Warranty"]
  }
};

for (const [name, info] of Object.entries(updates)) {
  const regex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\})`, 'g');
  data = data.replace(regex, (match) => {
    let modified = match;
    modified = modified.replace(/"price": "[^"]+"/, '"price": "' + info.price + '"');
    modified = modified.replace(/"sizes": \[[^\]]+\]/, '"sizes": [' + info.sizes.join(', ') + ']');
    
    // add unit if not present
    if (modified.includes('"sizes"')) {
      if (!modified.includes('"unit"')) {
         modified = modified.replace(/"sizes": \[[^\]]+\],/, '"sizes": [' + info.sizes.join(', ') + '],\n    "unit": "' + info.unit + '",');
      } else {
         modified = modified.replace(/"unit": "[^"]+"/, '"unit": "' + info.unit + '"');
      }
    }
    
    modified = modified.replace(/"properties": \[[^\]]*\]/, '"properties": [\n      "' + info.properties.join('",\n      "') + '"\n    ]');
    
    return modified;
  });
}

// Ensure Apex Ezytex is added.
if (!data.includes('"Apex Ezytex"')) {
  const newProduct = `  {
    "id": 1023,
    "name": "Apex Ezytex",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 1200.00",
    "properties": [
      "Hides Fine Cracks",
      "Unique Designs",
      "Anti-Algal Formula",
      "4-6 Years Expected Warranty"
    ],
    "sizes": [25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/apex-ezytex-new-packshot.png"
  },`;
  data = data.replace(
    'export const mockProducts = [',
    'export const mockProducts = [\n' + newProduct
  );
}

fs.writeFileSync(filePath, data);
console.log('Updated existing items');
