const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const regex = /\{\s*"id":\s*\d+,[^}]+?"name":\s*"([^"]+)"[^}]+?"subCategory":\s*"([^"]+)"/g;
let match;
const toChange = [];

while ((match = regex.exec(data)) !== null) {
  const name = match[1];
  const subCat = match[2];
  
  if (name.includes("Apex Duracast") || 
      name.includes("Apex Createx") || 
      name.includes("Apex Ezytex") || 
      name.includes("Ultima Allura")) {
      
      toChange.push(name);
  }
}

let newData = data;
for (const name of toChange) {
  // Using a replacer that only replaces subCategory for the specific product block
  const blockRegex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\"subCategory\\"\\s*:\\s*\\")([^"]+)(\\")`, 'g');
  newData = newData.replace(blockRegex, `$1Exterior Texture$3`);
}

fs.writeFileSync('src/data.ts', newData);
console.log('Updated subCategory to "Exterior Texture" for ' + toChange.length + ' products.');
