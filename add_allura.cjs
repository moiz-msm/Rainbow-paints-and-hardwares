const fs = require('fs');
const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const newProducts = [
  {
    name: "Ultima Allura Concordia",
    description: "Crafted when some of the hardest and strongest materials come together. Composite material that is a mixture of coarse particles - Crushed stone, sand, gravel & sometimes concrete.",
    properties: ["Stone Aggregates", "High Strength", "Luxury Finish"],
    price: "₹ 149.00",
    sizes: [25],
    unit: "kg",
    brand: "Asian Paints",
    topCategory: "Home Paint",
    subCategory: "Exterior Wall",
    image: "/content/dam/asian_paints/products/packshots/allura-concordia-chit-pack.png",
    id: 1024
  },
  {
    name: "Ultima Allura Reserva",
    description: "Inspired by the elegance of natural materials, gives distinct finish to the exterior walls. Mined and crafted for this very purpose, they have a distinct visual appearance of their own.",
    properties: ["Natural Material Look", "Distinct Finish", "Luxury Finish"],
    price: "₹ 147.00",
    sizes: [25],
    unit: "kg",
    brand: "Asian Paints",
    topCategory: "Home Paint",
    subCategory: "Exterior Wall",
    image: "/content/dam/asian_paints/products/packshots/allura-reserva-chit-pack1.png",
    id: 1025
  },
  {
    name: "Ultima Allura Meraki",
    description: "A blend of carefully selected sands and unfired clays mixed with pigments and minerals. Inspired by cladding materials – adding finishing touches.",
    properties: ["Cladding Inspired", "Pigment Mixed", "Luxury Finish"],
    price: "₹ 187.00",
    sizes: [20],
    unit: "kg",
    brand: "Asian Paints",
    topCategory: "Home Paint",
    subCategory: "Exterior Wall",
    image: "/content/dam/asian_paints/products/packshots/allura-meraki-chit-pack.png",
    id: 1026
  },
  {
    name: "Ultima Allura Venezio",
    description: "Taking inspiration from the beauty of Italian architecture, this captures the essence of rustic Italian exteriors and gives a fine grain textured finish.",
    properties: ["Italian Architecture", "Rustic Exterior", "Fine Grained Texture"],
    price: "₹ 300.00",
    sizes: [20],
    unit: "kg",
    brand: "Asian Paints",
    topCategory: "Home Paint",
    subCategory: "Exterior Wall",
    id: 1027
  },
  {
    name: "Ultima Allura Torino",
    description: "Imported from Italy and made with selected marble chips, it is a water-based product with a textured finish.",
    properties: ["Italian Marble Chips", "Water-based", "Luxury Finish"],
    price: "₹ 346.00",
    sizes: [20],
    unit: "kg",
    brand: "Asian Paints",
    topCategory: "Home Paint",
    subCategory: "Exterior Wall",
    id: 1028
  },
  {
    name: "Ultima Allura Clara",
    description: "High Performance protective coat crafted for enriching finish and boosting durability. Protective coat for Allura Concordia, Reserva and Meraki.",
    properties: ["High Performance", "Enriching Finish", "Protective Coat"],
    price: "₹ 572.00",
    sizes: [1, 4, 10, 20],
    unit: "L",
    brand: "Asian Paints",
    topCategory: "Home Paint",
    subCategory: "Exterior Wall",
    id: 1029
  }
];

let addedString = '';
for (let p of newProducts) {
  addedString += `
  {
    "id": ${p.id},
    "name": "${p.name}",
    "description": "${p.description}",
    "brand": "${p.brand}",
    "topCategory": "${p.topCategory}",
    "subCategory": "${p.subCategory}",
    "price": "${p.price}",
    "properties": [
      "${p.properties.join('",\n      "')}"
    ],
    "sizes": [${p.sizes.join(', ')}],
    "unit": "${p.unit}",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 124,
    "slug": "${p.name.toLowerCase().replace(/\\s+/g, '-')}"
  },`;
}

// insert before the closing bracket of mockProducts array.
const index = data.lastIndexOf('];');
if (index !== -1) {
  data = data.substring(0, index) + addedString + '\n' + data.substring(index);
  fs.writeFileSync(filePath, data);
  console.log('Added Allura products to data.ts');
} else {
  console.log('Could not find end of mockProducts array');
}
