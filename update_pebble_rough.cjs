const fs = require('fs');

const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

// The Roughtex is id 1010. Let's find it.
data = data.replace(
  /\{\s*"id": 1010,\s*"name": "Apex Duracast Rough Tex"[\s\S]*?"image": "[^"]+"/g,
  match => match.replace(/"image": "[^"]+"/, '"image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Roughtex-packshot.png"')
);

// The Pebbletex is id 1012. Let's find it.
data = data.replace(
  /\{\s*"id": 1012,\s*"name": "Apex Duracast Pebble Tex"[\s\S]*?"image": "[^"]+"/g,
  match => match.replace(/"image": "[^"]+"/, '"image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex_Duracast_Pebbletex.png"')
);

fs.writeFileSync(filePath, data);
console.log('Images fixed');
