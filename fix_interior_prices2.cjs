const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const regex = /"name":\s*"([^"]+)",[\s\S]*?"brand":\s*"Asian Paints",[\s\S]*?"subCategory":\s*"Interior Texture",[\s\S]*?"price":\s*"([^"]+)",[\s\S]*?"sizes":\s*\[(.*?)\]/g;
let match;
const toUpdate = [];

while ((match = regex.exec(data)) !== null) {
  const name = match[1];
  const priceStr = match[2];
  let priceVal = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  
  if (priceVal >= 2000) {
    toUpdate.push({ name, sizes: [1], price: priceVal.toFixed(2) });
  } else if (priceVal >= 600 && priceVal < 2000) {
    toUpdate.push({ name, sizes: [1, 5], price: (priceVal / 5).toFixed(2) });
  } else {
    // leave as is
  }
}

for (const p of toUpdate) {
  console.log("Updating", p.name, "to", p.price, "sizes", p.sizes);
  // manual replace
  const r = new RegExp(`(\\"name\\"\\s*:\\s*\\"${p.name}\\"[\\s\\S]*?\\"price\\"\\s*:\\s*\\")[^"]+(\\"[\\s\\S]*?\\"sizes\\"\\s*:\\s*\\[)[^\\]]*(\\])`, 'g');
  data = data.replace(r, `$1₹ ${p.price}$2${p.sizes.join(', ')}$3`);
}

fs.writeFileSync('src/data.ts', data);
console.log('Fixed Interior Texture prices and sizes, affected ' + toUpdate.length + ' products.');
