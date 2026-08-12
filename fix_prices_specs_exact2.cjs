const fs = require('fs');
const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const updates = {
  "Apex Duracast Swirl Tex": { price: "₹ 55.00" }, 
  "Apex Duracast Cross Tex": { price: "₹ 55.00" }, 
  "Apex Duracast Dholpur Tex": { price: "₹ 67.25" }, 
  "Apex Duracast Fine Tex": { price: "₹ 133.96" }, 
  "Apex Duracast Pebble Tex": { price: "₹ 50.67" }, 
  "Apex Duracast Rough Tex": { price: "₹ 57.50" }, 
  "Apex Createx Scratch Finish": { price: "₹ 106.25" }, 
  "Apex Createx Roller Finish": { price: "₹ 179.25" }, 
  "Apex Createx Dholpur": { price: "₹ 142.50" }, 
  "Apex Ezytex": { price: "₹ 60.00" } 
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
console.log('Fixed base prices exactly again!');
