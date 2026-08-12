const data = require('fs').readFileSync('src/components/ProductsSection.tsx', 'utf8');
const lines = data.split('\n');
const start = lines.findIndex(l => l.includes('if (nameLower.includes("putty") || nameLower.includes("white cement")) {'));
const end = lines.findIndex((l, i) => i > start && l.includes('updatedP.subCategories = Array.from(new Set(subs));'));
console.log(lines.slice(start, end).join('\n'));
