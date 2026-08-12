const fs = require('fs');
const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const updates = {
  "Ultima Allura Concordia": { price: "₹ 149.00", sizes: [30] }, 
  "Ultima Allura Reserva": { price: "₹ 147.00", sizes: [30] }, 
  "Ultima Allura Meraki": { price: "₹ 187.00", sizes: [30] }, 
  "Ultima Allura Venezio": { price: "₹ 300.00", sizes: [30] }, 
  "Ultima Allura Torino": { price: "₹ 346.00", sizes: [30] }, 
  "Ultima Allura Clara": { price: "₹ 572.00", sizes: [1, 4, 10, 20] } 
};

for (const [name, info] of Object.entries(updates)) {
  const regex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\})`, 'g');
  data = data.replace(regex, (match) => {
    let modified = match;
    // Fix image URL if it starts with /content
    modified = modified.replace(/"image": "\/content/, '"image": "https://www.asianpaints.com/content');
    
    // Fix price
    modified = modified.replace(/"price": "[^"]+"/, '"price": "' + info.price + '"');
    
    // Fix sizes
    modified = modified.replace(/"sizes": \[[^\]]*\]/, '"sizes": [' + info.sizes.join(', ') + ']');
    
    return modified;
  });
}

fs.writeFileSync(filePath, data);
console.log('Fixed Allura prices, sizes, and images');
