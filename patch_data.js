const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf-8');

// 1. Update topCategories
content = content.replace(
  'export const topCategories = ["All Categories", "Home Paint", "Industrial", "Adhesives"];',
  'export const topCategories = ["All Categories", "Home Paint", "Industrial", "Adhesives", "Power Tools"];'
);

// 2. Update subCategories
if (!content.includes('"Power Tools":')) {
  content = content.replace(
    '  Industrial:',
    '  "Power Tools": [\n    "All Power Tools",\n    "Measuring Tools",\n    "Sanding Tools",\n    "Spraying Tools",\n    "Mixing Tools"\n  ],\n  Industrial:'
  );
}

// 3. Append to mockProducts
const newProducts = `  {
    "id": 9901,
    "name": "TruCare Laser Distance Meter",
    "description": "Smart and accurate laser distance meter for quick measurements up to 60 meters. Features area, volume, and Pythagorean measurement with high precision, ideal for quick site surveys before painting.",
    "brand": "Asian Paints",
    "topCategory": "Power Tools",
    "subCategory": "Measuring Tools",
    "price": "₹ 2950.00",
    "properties": [
      "Range up to 60 meters",
      "High precision measurement",
      "Digital LCD display"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 124,
    "image": "https://m.media-amazon.com/images/I/612Kk5HRmxL.jpg",
    "slug": "trucare-laser-distance-meter"
  },
  {
    "id": 9902,
    "name": "TruCare Moisture Meter",
    "description": "Compact pin-type moisture meter to accurately check moisture levels on walls and wood before painting. Essential tool to ensure surfaces are dry enough for long-lasting paint application.",
    "brand": "Asian Paints",
    "topCategory": "Power Tools",
    "subCategory": "Measuring Tools",
    "price": "₹ 1450.00",
    "properties": [
      "Accurate moisture detection",
      "Suitable for walls and wood",
      "Portable and easy to use"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 98,
    "image": "https://m.media-amazon.com/images/I/61AHIISxIBL.jpg",
    "slug": "trucare-moisture-meter"
  },
  {
    "id": 9903,
    "name": "TruCare Electric Wall Sander",
    "description": "High-performance electric wall sander (750W) with vacuum dust collection for a dust-free and smooth sanding experience. Reduces effort and saves time significantly.",
    "brand": "Asian Paints",
    "topCategory": "Power Tools",
    "subCategory": "Sanding Tools",
    "price": "₹ 8500.00",
    "properties": [
      "750W powerful motor",
      "Integrated dust vacuum",
      "Professional grade finish"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 156,
    "image": "https://m.media-amazon.com/images/I/71w+b3K0OpL.jpg",
    "slug": "trucare-electric-wall-sander"
  },
  {
    "id": 9904,
    "name": "TruCare Paint Sprayer",
    "description": "750W Electric spray gun for smooth and even application of paint on walls and furniture. Features adjustable nozzles and easy cleanup.",
    "brand": "Asian Paints",
    "topCategory": "Power Tools",
    "subCategory": "Spraying Tools",
    "price": "₹ 3200.00",
    "properties": [
      "750W Motor",
      "Uniform paint application",
      "Adjustable flow control"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.7,
    "reviews": 75,
    "image": "https://m.media-amazon.com/images/I/713A1C+PZJL.jpg",
    "slug": "trucare-paint-sprayer"
  },
  {
    "id": 9905,
    "name": "TruCare Economy Putty Mixer",
    "description": "Heavy-duty putty mixer designed for uniform and smooth mixing of wall putty and paint. Ergonomic design for comfortable long-duration usage.",
    "brand": "Asian Paints",
    "topCategory": "Power Tools",
    "subCategory": "Mixing Tools",
    "price": "₹ 2800.00",
    "properties": [
      "Smooth and quick mixing",
      "Ergonomic handle",
      "Durable built"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 112,
    "image": "https://m.media-amazon.com/images/I/51aANSb6kTL.jpg",
    "slug": "trucare-economy-putty-mixer"
  }
];`;

content = content.replace(/\];\s*$/, newProducts);

fs.writeFileSync('src/data.ts', content);
console.log("data.ts updated successfully!");
