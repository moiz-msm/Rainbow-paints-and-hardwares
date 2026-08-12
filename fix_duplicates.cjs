const fs = require('fs');

let data = fs.readFileSync('src/data.ts', 'utf8');

// Use regex to match all products
const productRegex = /\{\s*"id":\s*(\d+),\s*"name":\s*"([^"]+)",[\s\S]*?(?=\},\s*\{|\}\s*\])/g;

let matches;
let products = [];
while ((matches = productRegex.exec(data)) !== null) {
  products.push({
    fullText: matches[0],
    id: matches[1],
    name: matches[2]
  });
}

const nameMap = new Map();
let toRemove = [];

for (let p of products) {
  const normName = p.name.toLowerCase().trim();
  if (nameMap.has(normName)) {
    // duplicate found, keep the one that looks "better" (e.g. maybe it has more properties or is more complete)
    // For now, let's just keep the first one and mark the rest for removal
    toRemove.push(p);
  } else {
    nameMap.set(normName, p);
  }
}

console.log(`Found ${toRemove.length} duplicates to remove: ${toRemove.map(r => r.name).join(', ')}`);

if (toRemove.length > 0) {
  for (let r of toRemove) {
    // replace with empty string
    const replaceRegex = new RegExp(`\\{\\s*\\"id\\"\\s*:\\s*${r.id},\\s*\\"name\\"\\s*:\\s*\\"${r.name}\\"[\\s\\S]*?\\}(,|(?=\\s*\\]))`);
    data = data.replace(replaceRegex, '');
  }
  
  // fix trailing commas if any
  data = data.replace(/,\s*\]/, '\n]');
  
  fs.writeFileSync('src/data.ts', data);
  console.log('Removed duplicates.');
}

