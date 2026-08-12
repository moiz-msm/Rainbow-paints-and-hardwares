const fs = require('fs');
let data = fs.readFileSync('src/components/ProductsSection.tsx', 'utf8');

data = data.replace(
  'if (nameLower.includes("exterior primer")) {\n         subs.push("Exterior Wall", "Undercoats");\n      }',
  `if (nameLower.includes("exterior primer")) {
         subs.push("Exterior Wall", "Undercoats");
      }
      if (nameLower.includes("damp sheath exterior") || nameLower === "damp sheath exterior") {
         subs.push("Exterior Wall", "Undercoats");
      }
      if (nameLower.includes("damp sheath interior")) {
         subs.push("Interior Wall", "Undercoats");
      }`
);

fs.writeFileSync('src/components/ProductsSection.tsx', data);
