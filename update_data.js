import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf8');

// 1. Rename categories in the subCategories object
content = content.replace(/"Primer",/g, '"Undercoats",');
content = content.replace(/[ \t]*"Color Oxides",?\n/g, '');
content = content.replace(/[ \t]*"Abrasives & Sandpapers",?\n/g, '');

// 2. Fix subCategory of products.
// We can use regex or an eval approach, but since it's a TS file we can't just eval it.
// Instead, let's use a regex that matches product blocks or just replace specific strings.

// Replace all "subCategory": "Primer" -> "subCategory": "Undercoats"
content = content.replace(/"subCategory":\s*"Primer"/g, '"subCategory": "Undercoats"');
content = content.replace(/"subCategory":\s*"Abrasives & Sandpapers"/g, '"subCategory": "Painting Tools"');

// For Gorila Oxide (id: 3027), change to Wood Finishes
content = content.replace(/("name":\s*"Gorila Cement Color Oxide Powder",\s*"brand":\s*"Gorila",\s*"topCategory":\s*"Home Paint",\s*"subCategory":\s*)"Color Oxides"/g, '$1"Wood Finishes"');

fs.writeFileSync('src/data.ts', content, 'utf8');
