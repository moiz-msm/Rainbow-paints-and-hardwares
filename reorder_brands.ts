import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf-8');

// Extract the brandDetails array block
const regex = /export const brandDetails: BrandDetail\[\] = \[([\s\S]+?)\];/;
const match = content.match(regex);
if (!match) {
    console.error("brandDetails not found");
    process.exit(1);
}

const inner = match[1];
// Split by `  },` to get each object
const items = inner.split(/ {2}\},/).filter(s => s.trim().length > 0).map(s => s + '  }');

// Build a map of name to item string
const brands = items.map(item => {
    const nameMatch = item.match(/name: "(.*?)"/);
    return { name: nameMatch ? nameMatch[1] : '', content: item };
});

const desiredOrder = [
    "Asian Paints",
    "Berger Paints",
    "Dr. Fixit",
    "MRF Vapocure",
    "Sheenlac",
    "Fevicol",
    "Just Spray",
    "Birla White",
    "Ajax",
    "Bawa",
    "Jaya",
    "Gorila",
    "Local"
];

// Verify we have all brands
const currentNames = brands.map(b => b.name);
console.log("Current names:", currentNames);

const newItems = desiredOrder.map(name => {
    const found = brands.find(b => b.name === name);
    if (!found) {
        console.warn("Could not find brand:", name);
    }
    return found ? found.content : '';
}).filter(c => c.length > 0);

// Also append any brands not in desiredOrder just in case
brands.forEach(b => {
    if (!desiredOrder.includes(b.name)) {
        newItems.push(b.content);
    }
});

const newInner = newItems.join(",\n");
const newArray = `export const brandDetails: BrandDetail[] = [${newInner}\n];`;

content = content.replace(regex, newArray);
fs.writeFileSync('src/data.ts', content);
console.log("Successfully reordered brands in data.ts");
