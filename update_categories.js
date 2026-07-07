import fs from 'fs';

let data = fs.readFileSync('src/data.ts', 'utf8');

// 1. Rename "Primer" category to "Undercoats" in subCategories array
data = data.replace(/"Primer"/g, '"Undercoats"');

// 2. Remove "Color Oxides" from subCategories array
data = data.replace(/[ \t]*"Color Oxides",?\n/g, '');
data = data.replace(/[ \t]*"Colour Oxide",?\n/g, '');

// 3. Remove "Abrasives & Sandpapers" from subCategories array
data = data.replace(/[ \t]*"Abrasives & Sandpapers",?\n/g, '');
data = data.replace(/[ \t]*"Abrasives and Sandpapers",?\n/g, '');

// 4. Update products
// - Any product with "subCategory": "Color Oxides" -> if it's Gorilla Powder, make it "Wood Finishes", otherwise what? The user said "remove colour oxide category and add gorilla powder under wood finishes". So any other colour oxide should just be removed? Or maybe all of them moved to somewhere? Let's check if there are other colour oxides.
