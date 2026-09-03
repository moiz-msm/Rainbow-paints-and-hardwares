const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf-8');

const newProducts = `  {
    "id": 9911,
    "name": "Berger Express Painting Sander",
    "description": "High-performance wall sander machine designed for Berger Express Painting. Features variable speed control and an integrated vacuum for a dust-free and smooth sanding experience.",
    "brand": "Berger Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 7500.00",
    "properties": [
      "Integrated dust vacuum",
      "Variable speed control",
      "Professional grade finish"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 115,
    "image": "https://m.media-amazon.com/images/I/81ukmBfuS9L.jpg",
    "slug": "berger-express-painting-sander"
  },
  {
    "id": 9912,
    "name": "Berger Moisture Meter",
    "description": "Accurate digital moisture meter for measuring moisture content in walls, wood, and concrete. Essential for surface preparation before starting any painting or waterproofing work.",
    "brand": "Berger Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 1250.00",
    "properties": [
      "Accurate digital display",
      "Suitable for walls and wood",
      "Portable and easy to use"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.6,
    "reviews": 84,
    "image": "https://m.media-amazon.com/images/I/51p4-23FtvL.jpg",
    "slug": "berger-moisture-meter"
  },
  {
    "id": 9913,
    "name": "Berger Airless Paint Sprayer",
    "description": "Professional-grade airless paint sprayer for fast, smooth, and even application of paint on large interior and exterior surfaces. Part of the Express Painting toolkit.",
    "brand": "Berger Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 18500.00",
    "properties": [
      "High pressure delivery",
      "Uniform paint application",
      "Fast coverage for large areas"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 142,
    "image": "https://m.media-amazon.com/images/I/51EbADbkQ3L.jpg",
    "slug": "berger-airless-paint-sprayer"
  },
  {
    "id": 9914,
    "name": "Berger Express Putty Mixer",
    "description": "Heavy-duty electric putty and paint mixer designed for uniform and fast mixing. Ergonomic handle and powerful motor ensure smooth consistency.",
    "brand": "Berger Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 3100.00",
    "properties": [
      "Smooth and quick mixing",
      "Heavy-duty copper motor",
      "Ergonomic handle"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.7,
    "reviews": 92,
    "image": "https://m.media-amazon.com/images/I/71FjZ+ZJh9L.jpg",
    "slug": "berger-express-putty-mixer"
  },
  {
    "id": 9915,
    "name": "Berger High Pressure Washer",
    "description": "Powerful 120 Bar high-pressure washer for cleaning exterior walls, driveways, and concrete surfaces before painting. Removes dirt, algae, and loose paint easily.",
    "brand": "Berger Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 5400.00",
    "properties": [
      "120 Bar pressure",
      "Removes dirt and algae",
      "Ideal for surface prep"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 210,
    "image": "https://m.media-amazon.com/images/I/615RvTBQZjL.jpg",
    "slug": "berger-high-pressure-washer"
  }
];`;

content = content.replace(/\];\s*$/, ',\n' + newProducts);
fs.writeFileSync('src/data.ts', content);
console.log("data.ts updated with Berger power tools successfully!");
