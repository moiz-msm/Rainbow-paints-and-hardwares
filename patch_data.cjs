const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf-8');

// Replace subcategories list
content = content.replace(
  '  "Power Tools": [\n    "All Power Tools",\n    "Measuring Tools",\n    "Sanding Tools",\n    "Spraying Tools",\n    "Mixing Tools"\n  ],',
  '  "Power Tools": [\n    "All Power Tools",\n    "Power Tools"\n  ],'
);

// Replace subCategory for the specific products
content = content.replace(/"subCategory": "Measuring Tools"/g, '"subCategory": "Power Tools"');
content = content.replace(/"subCategory": "Sanding Tools"/g, '"subCategory": "Power Tools"');
content = content.replace(/"subCategory": "Spraying Tools"/g, '"subCategory": "Power Tools"');
content = content.replace(/"subCategory": "Mixing Tools"/g, '"subCategory": "Power Tools"');

fs.writeFileSync('src/data.ts', content);
console.log("Updated data.ts");
