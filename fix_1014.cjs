const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

data = data.replace(/"image":\s*"https:\/\/static.asianpaints.com\/content\/dam\/asian_paints\/products\/packshots\/exterior-walls-apex-tile-guard-new-asian-paints.png"/, '"image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/sc-Dampsheath-exterior-new.png"');

fs.writeFileSync('src/data.ts', data);
