const fs = require('fs');
const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const updates = {
  "Apex Duracast Swirl Tex": {
    description: "A premium textured finish designed with a unique engraved swirl pattern. It provides style and strength, ensuring long-term protection for your exterior walls.",
    properties: ["Engraved Swirl Pattern", "Superior Adhesion", "Hides Fine Cracks"],
    price: "₹ 55.00" // Pack: 1099
  },
  "Apex Duracast Cross Tex": {
    description: "A high-performance silica-based acrylic texture that creates striking trowel-based cross patterns. It adds depth and dimension while protecting surfaces from harsh weather.",
    properties: ["Striking Trowel Patterns", "Weather Resistant", "High Durability"],
    price: "₹ 55.00" // Pack: 1100
  },
  "Apex Duracast Dholpur Tex": {
    description: "Inspired by classic Dholpur stone, this acrylic-modified resin texture delivers a rugged stone-brick brushing effect, elevating the architectural appeal of any building.",
    properties: ["Dholpur Stone Finish", "Modified Acrylic Resin", "Architectural Appeal"],
    price: "₹ 67.00" // Pack: 1345
  },
  "Apex Duracast Fine Tex": {
    description: "A modified acrylic, water-based exterior texture offering a subtle yet distinctive finish. It enhances topcoat adhesion and can be styled into Cane Weave, Honeycomb, or Ripple patterns.",
    properties: ["Subtle Fine Texture", "Versatile Styling", "Enhances Topcoat"],
    price: "₹ 134.00" // Pack: 1420 (20kg)
  },
  "Apex Duracast Pebble Tex": {
    description: "An acrylic, water-based texture finish that creates a unique bubble or headcut pattern via spray application. It combines aesthetic appeal with robust weather performance.",
    properties: ["Bubble/Headcut Pattern", "Spray Application", "Robust Performance"],
    price: "₹ 51.00" // Pack: 1520 (30kg)
  },
  "Apex Duracast Rough Tex": {
    description: "Designed to give buildings a unique, bold look, Rough Tex withstands harsh weather conditions, offering long-lasting protection and character to exterior masonry.",
    properties: ["Bold Unique Look", "Harsh Weather Protection", "Long Lasting"],
    price: "₹ 58.00" // Pack: 1150
  },
  "Apex Createx Scratch Finish": {
    description: "Apex Createx Scratch Finish is an intermediate texture coating that provides a unique scratched pattern. It offers superior adhesion and is designed to hide fine cracks and protect exterior walls.",
    properties: ["Scratched Pattern", "Superior Adhesion", "Hides Fine Cracks"],
    price: "₹ 106.00" // Pack: 2125
  },
  "Apex Createx Roller Finish": {
    description: "Apex Createx Roller Finish is a high-quality exterior texture that creates a distinctive rolled pattern. It acts as an intermediate finish, offering excellent protection, hiding surface undulations, and ensuring long-lasting durability.",
    properties: ["Rolled Pattern", "Hides Undulations", "Long Lasting Durability"],
    price: "₹ 179.00" // Pack: 1900 (20kg)
  },
  "Apex Createx Dholpur": {
    description: "Apex Createx Dholpur gives your exterior walls the timeless and premium look of Dholpur stone. It is a highly durable intermediate texture that masks fine cracks and provides excellent weather resistance.",
    properties: ["Premium Dholpur Look", "Weather Resistance", "Highly Durable"],
    price: "₹ 143.00" // Pack: 2850
  },
  "Apex Ezytex": {
    description: "Apex Ezytex is a modified acrylic, dolomite-based product used to create innovative trowel-based patterns for interior and exterior walls. It hides fine cracks and features an anti-algal formula.",
    properties: ["Dolomite Based", "Innovative Patterns", "Anti-Algal Formula"],
    price: "₹ 60.00" // Pack: 1200
  }
};

for (const [name, info] of Object.entries(updates)) {
  const regex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\})`, 'g');
  data = data.replace(regex, (match) => {
    let modified = match;
    modified = modified.replace(/"price": "[^"]+"/, '"price": "' + info.price + '"');
    modified = modified.replace(/"properties": \[[^\]]*\]/, '"properties": [\n      "' + info.properties.join('",\n      "') + '"\n    ]');
    if (modified.includes('"description"')) {
      modified = modified.replace(/"description": "[^"]+"/, '"description": ' + JSON.stringify(info.description));
    }
    return modified;
  });
}

fs.writeFileSync(filePath, data);
console.log('Fixed base prices and descriptions!');
