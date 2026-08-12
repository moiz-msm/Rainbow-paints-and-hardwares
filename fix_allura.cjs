const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const updates = {
  "Ultima Allura Concordia": { price: "₹ 186.25" }, 
  "Ultima Allura Reserva": { price: "₹ 183.75" }, 
  "Ultima Allura Meraki": { price: "₹ 352.83" }, 
  "Ultima Allura Venezio": { price: "₹ 566.03" }, 
  "Ultima Allura Torino": { price: "₹ 652.83" }, 
  "Ultima Allura Clara": { price: "₹ 572.00" } 
};

for (const [name, info] of Object.entries(updates)) {
  const regex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\})`, 'g');
  data = data.replace(regex, (match) => {
    let modified = match;
    modified = modified.replace(/"price": "[^"]+"/, '"price": "' + info.price + '"');
    return modified;
  });
}

fs.writeFileSync('src/data.ts', data);
console.log('Fixed Allura prices');
