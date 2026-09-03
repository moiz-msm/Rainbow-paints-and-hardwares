const fs = require('fs');

let content = fs.readFileSync('src/components/ProductsSection.tsx', 'utf-8');
content = content.replace(
  'className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"',
  'className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"'
);

fs.writeFileSync('src/components/ProductsSection.tsx', content);
