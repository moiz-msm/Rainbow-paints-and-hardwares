const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// replace only in the top subCategories block
const topBlock = data.substring(0, 1000);
let newTopBlock = topBlock;
if (!newTopBlock.includes('"Interior Texture"')) {
  newTopBlock = newTopBlock.replace(/"Interior Wall",/g, '"Interior Wall",\n    "Interior Texture",');
}
if (!newTopBlock.includes('"Exterior Texture"')) {
  newTopBlock = newTopBlock.replace(/"Exterior Wall",/g, '"Exterior Wall",\n    "Exterior Texture",');
}

data = newTopBlock + data.substring(1000);
fs.writeFileSync('src/data.ts', data);
