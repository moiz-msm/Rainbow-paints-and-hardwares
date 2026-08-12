const fs = require('fs');
const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const updates = {
  "Apex Duracast Swirl Tex": {
    description: "Asian Paints Duracast Swirltex is a premium textured finish designed to bring both style and strength to your walls.",
    properties: ["Superior Adhesion", "Hides Fine Cracks", "Unique Look for Buildings", "Ideal for exterior masonry surfaces."],
    price: "₹ 1099.00"
  },
  "Apex Duracast Cross Tex": {
    description: "Asian Paints Duracast CrossTex is a high-performance, silica-based acrylic texture finish designed to create striking trowel-based patterns on both interior and exterior walls. With its tough, weather-resistant formulation, CrossTex adds depth and dimension while protecting your surfaces from the elements.",
    properties: ["Superior Adhesion", "Hides Fine Cracks", "Unique Look for Buildings"],
    price: "₹ 1100.00"
  },
  "Apex Duracast Dholpur Tex": {
    description: "Asian Paints Duracast DholpurTex is a premium exterior texture finish inspired by the classic Dholpur stone. Engineered with high-quality acrylic-modified resin, this intermediate coating delivers a rugged yet refined stone-brick brushing effect that enhances the architectural appeal of any structure.",
    properties: ["Superior Adhesion", "Hides Fine Cracks", "Unique Look for Buildings"],
    price: "₹ 1345.00"
  },
  "Apex Duracast Fine Tex": {
    description: "Asian Paints Duracast FineTex is a modified acrylic, water-based exterior texture finish designed to deliver a subtle yet distinctive look to your walls. Acting as an intermediary coating, it enhances the adhesion of topcoats while offering a variety of elegant texture patterns such as Cane Weave, Honeycomb, Ripples, and Springtime.",
    properties: ["Superior Adhesion", "Hides Fine Cracks", "Unique Look for Buildings"],
    price: "₹ 1420.00"
  },
  "Apex Duracast Pebble Tex": {
    description: "Asian Paints Duracast PebbleTex is an acrylic, water-based texture finish designed to create a unique bubble or headcut pattern through spray application., PebbleTex combines aesthetic appeal with robust performance, making it a versatile choice for modern architecture.",
    properties: ["Superior Adhesion", "Hides Fine Cracks", "Unique Look for Buildings"],
    price: "₹ 1520.00"
  },
  "Apex Duracast Rough Tex": {
    description: "Apex Roughtex give the buildings you build its very own unique look. Designed for aesthetcis,  to withstand harsh weather conditions, adding long lasting protection, beauty and charcter to the exterior walls.",
    properties: ["Superior Adhesion", "Hides Fine Cracks", "Unique Look for Buildings"],
    price: "₹ 1150.00"
  },
  "Apex Createx Scratch Finish": {
    description: "A range of exterior textures that act as an intermediate finish. These premium textures provide both protection and décor to the exterior walls.",
    properties: ["3 years Adhesive Warranty*", "5 years Waterproofing Warranty*", "Hides Fine Crack"],
    price: "₹ 2125.00"
  },
  "Apex Createx Roller Finish": {
    description: "A range of exterior textures that act as an intermediate finish. These premium textures provide both protection and décor to the exterior walls.",
    properties: ["Superior Adhesion", "Hides Fine Cracks", "Modified Acrylic Binder"],
    price: "₹ 1900.00"
  },
  "Apex Createx Dholpur": {
    description: "A range of exterior textures that act as an intermediate finish. These premium textures provide both protection and décor to the exterior walls.",
    properties: ["Superior Adhesion", "Hides Fine Cracks", "Modified Acrylic Binder"],
    price: "₹ 2850.00"
  },
  "Apex Ezytex": {
    description: "Modified acrylic, dolomite based product that can used to give a wide range of innovative trowel based patterns for interior and exterior wall surfaces.",
    properties: ["Scratch Finish", "Water Resistant", "Anti-Algal"],
    price: "₹ 1200.00"
  }
};

for (const [name, info] of Object.entries(updates)) {
  const regex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\})`, 'g');
  data = data.replace(regex, (match) => {
    let modified = match;
    
    // update price
    modified = modified.replace(/"price": "[^"]+"/, '"price": "' + info.price + '"');
    
    // update properties
    modified = modified.replace(/"properties": \[[^\]]*\]/, '"properties": [\n      "' + info.properties.join('",\n      "') + '"\n    ]');
    
    // add description if not exists
    if (!modified.includes('"description"')) {
      modified = modified.replace(/"name": "[^"]+",/, '$&\n    "description": ' + JSON.stringify(info.description) + ',');
    } else {
      modified = modified.replace(/"description": "[^"]+"/, '"description": ' + JSON.stringify(info.description));
    }
    
    return modified;
  });
}

fs.writeFileSync(filePath, data);
console.log('Updated existing items with final details');
