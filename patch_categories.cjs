const fs = require('fs');

// Patch ProductsSection.tsx
let prodSec = fs.readFileSync('src/components/ProductsSection.tsx', 'utf-8');
const prodTarget = `      Tools:
        "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=500&q=80",`;
const prodReplacement = `      Tools:
        "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=500&q=80",
      "Power Tools":
        "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&q=80",`;
prodSec = prodSec.replace(prodTarget, prodReplacement);
fs.writeFileSync('src/components/ProductsSection.tsx', prodSec);

// Patch ShopByCategory.tsx
let shopByCat = fs.readFileSync('src/components/ShopByCategory.tsx', 'utf-8');
const shopCatTarget = `  { name: 'Synthetic Enamels', slug: 'synthetic-enamels', image: 'https://img.icons8.com/color/144/paint-can.png' }
];`;
const shopCatReplacement = `  { name: 'Synthetic Enamels', slug: 'synthetic-enamels', image: 'https://img.icons8.com/color/144/paint-can.png' },
  { name: 'Power Tools', slug: 'power-tools', image: 'https://img.icons8.com/color/144/drill.png' }
];`;
shopByCat = shopByCat.replace(shopCatTarget, shopCatReplacement);
fs.writeFileSync('src/components/ShopByCategory.tsx', shopByCat);

console.log("Updated both files");
