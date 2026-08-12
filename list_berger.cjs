const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const regex = /\{\s*"id":\s*\d+,[^}]+?"name":\s*"([^"]+)"[^}]+?"brand":\s*"([^"]+)"[^}]+?"subCategory":\s*"([^"]+)"/g;
let match;

while ((match = regex.exec(data)) !== null) {
  const name = match[1];
  const brand = match[2];
  const subCat = match[3];
  
  if (brand === "Berger Paints" && subCat === "Exterior Wall") {
      console.log(name);
  }
}
