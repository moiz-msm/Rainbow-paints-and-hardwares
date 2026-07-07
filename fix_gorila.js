import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf8');

content = content.replace(/"name": "Gorila Cement Color Oxide Powder",\s*"brand": "Gorila",\s*"topCategory": "Home Paint",\s*"subCategory": "Painting Tools",/g, '"name": "Gorila Cement Color Oxide Powder",\n    "brand": "Gorila",\n    "topCategory": "Home Paint",\n    "subCategory": "Wood Finishes",');

fs.writeFileSync('src/data.ts', content, 'utf8');
