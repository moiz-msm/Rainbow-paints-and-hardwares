const fs = require('fs');
const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const images = {
  "Ultima Allura Concordia": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/allura-concordia-chit-pack.png",
  "Ultima Allura Reserva": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/allura-reserva-chit-pack1.png",
  "Ultima Allura Meraki": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/allura-meraki-chit-pack.png",
  "Ultima Allura Venezio": "https://www.asianpaints.com/content/dam/asian_paints/textures/others/apex-ultima-allura-venezio-packshot-asian-paints.png",
  "Ultima Allura Torino": "https://www.asianpaints.com/content/dam/asian_paints/textures/others/apex-ultima-allura-torino-packshot-asian-paints.png",
  "Ultima Allura Clara": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-ultima-clara.png"
};

for (const [name, img] of Object.entries(images)) {
  const regex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\})`, 'g');
  data = data.replace(regex, (match) => {
    let modified = match;
    if (modified.includes('"image"')) {
      modified = modified.replace(/"image":\s*"[^"]+"/, '"image": "' + img + '"');
    } else {
      modified = modified.replace(/"slug":\s*"([^"]+)"/, '"image": "' + img + '",\n    "slug": "$1"');
    }
    return modified;
  });
}

fs.writeFileSync(filePath, data);
console.log('Fixed Allura images');
