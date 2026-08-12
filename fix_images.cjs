const fs = require('fs');

const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

data = data.replace(
  /"image": "https:\/\/5.imimg.com\/data5\/SELLER\/Default\/2021\/4\/IF\/MB\/BS\/107775532\/asian-paints-trucare-interior-wall-primer-water-thinnable-500x500.jpg"/g,
  '"image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-apcolite-premium-emulsion-asian-paints.png"'
);

data = data.replace(
  /"image": "https:\/\/5.imimg.com\/data5\/SELLER\/Default\/2020\/9\/GV\/YF\/BD\/101297534\/asian-paints-trucare-interior-wall-primer-water-thinnable-500x500.jpg"/g,
  '"image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-ultima-asian-paints.png"'
);

data = data.replace(
  /"image": "https:\/\/static.asianpaints.com\/content\/dam\/asian_paints\/products\/packshots\/exterior-walls-apex-duracast-rough-tex-asian-paints.png"/g,
  '"image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-tile-guard.png"'
);

data = data.replace(
  /"image": "https:\/\/static.asianpaints.com\/content\/dam\/asian_paints\/products\/packshots\/exterior-walls-apex-duracast-pebble-tex-asian-paints.png"/g,
  '"image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-floor-guard-asian-paints.png"'
);

data = data.replace(
  /"image": "https:\/\/static.asianpaints.com\/content\/dam\/asian_paints\/products\/packshots\/waterproofing-damp-sheath-exterior-asian-paints.png"/g,
  '"image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-tile-guard-new-asian-paints.png"'
);

data = data.replace(
  /"image": "https:\/\/5.imimg.com\/data5\/SELLER\/Default\/2023\/7\/322896503\/AZ\/WH\/ZJ\/142360528\/asian-paints-trucare-wall-putty-500x500.webp"/g,
  '"image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-emulsion-asian-paints.png"'
);

fs.writeFileSync(filePath, data);
console.log('Images fixed successfully');
