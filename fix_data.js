import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf8');

// Fix broken subCategories: 
// "subCategory": <newline> "price": "₹ ...
content = content.replace(/"subCategory":\s*(?="price":)/g, '"subCategory": "Painting Tools",\n    ');

fs.writeFileSync('src/data.ts', content, 'utf8');
