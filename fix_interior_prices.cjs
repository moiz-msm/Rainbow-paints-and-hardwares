const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const regex = /\{\s*"id":\s*\d+,[^}]+?"name":\s*"([^"]+)"[^}]+?"brand":\s*"Asian Paints"[^}]+?"subCategory":\s*"Interior Texture"[^}]+?"price":\s*"([^"]+)"[^}]+?\}/g;
let match;
const updates = {};

while ((match = regex.exec(data)) !== null) {
  const block = match[0];
  const name = match[1];
  const priceStr = match[2];
  
  let priceVal = parseFloat(priceStr.replace(/[^0-9.]/g, ''));
  
  if (priceVal >= 2000) {
    updates[name] = { sizes: [1], price: priceVal.toFixed(2) };
  } else if (priceVal >= 600 && priceVal < 2000) {
    updates[name] = { sizes: [1, 5], price: (priceVal / 5).toFixed(2) };
  } else {
    // Keep as is, just ensure sizes is [1, 5]
    updates[name] = { sizes: [1, 5], price: priceVal.toFixed(2) };
  }
}

for (const [name, info] of Object.entries(updates)) {
  const blockRegex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\"price\\"\\s*:\\s*\\")[^"]+(\\"[\\s\\S]*?\\"sizes\\"\\s*:\\s*\\[)[^\\]]+(\\])`, 'g');
  data = data.replace(blockRegex, `$1₹ ${info.price}$2${info.sizes.join(', ')}$3`);
}

fs.writeFileSync('src/data.ts', data);
console.log('Fixed Interior Texture prices and sizes');
