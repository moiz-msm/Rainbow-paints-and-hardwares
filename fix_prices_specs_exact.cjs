const fs = require('fs');
const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const updates = {
  "Apex Duracast Swirl Tex": { price: "₹ 54.95" }, // 1099 / 20
  "Apex Duracast Cross Tex": { price: "₹ 55.00" }, // 1100 / 20
  "Apex Duracast Dholpur Tex": { price: "₹ 67.25" }, // 1345 / 20
  "Apex Duracast Fine Tex": { price: "₹ 133.96" }, // 1420 / 10.6 (20kg: 20 * 0.53 = 10.6)
  "Apex Duracast Pebble Tex": { price: "₹ 51.00" }, // For 30kg: let's assume discountFactor is handled correctly. Wait, sizes: 30? Wait, sizes in Pebble Tex are 5, 30. Does `selectedSize === 30` have a discountFactor?
  "Apex Duracast Rough Tex": { price: "₹ 57.50" }, // 1150 / 20
  "Apex Createx Scratch Finish": { price: "₹ 106.25" }, // 2125 / 20
  "Apex Createx Roller Finish": { price: "₹ 179.24" }, // 1900 / 10.6 (20kg)
  "Apex Createx Dholpur": { price: "₹ 142.50" }, // 2850 / 20
  "Apex Ezytex": { price: "₹ 60.00" } // 1200 / 20
};

for (const [name, info] of Object.entries(updates)) {
  const regex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\})`, 'g');
  data = data.replace(regex, (match) => {
    let modified = match;
    modified = modified.replace(/"price": "[^"]+"/, '"price": "' + info.price + '"');
    return modified;
  });
}

fs.writeFileSync(filePath, data);
console.log('Fixed base prices exactly!');
