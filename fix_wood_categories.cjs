const fs = require('fs');
let data = fs.readFileSync('src/components/ProductsSection.tsx', 'utf8');

const regex = /if\s*\(nameLower\.includes\("tile adhesive"\)[\s\S]*?updatedP\.subCategories\s*=\s*Array\.from\(new\s*Set\(subs\)\);/;

const replacement = `if (nameLower.includes("tile adhesive") || nameLower.includes("tile bonder") || nameLower.includes("grout")) {
         subs.push("Tile Adhesives", "Waterproofing");
      }
      if (nameLower.includes("damp proof") || nameLower.includes("waterproof")) {
         subs.push("Waterproofing");
      }
      if (nameLower.includes("wood primer") || nameLower.includes("wood filler")) {
         subs.push("Undercoats", "Wood Finishes");
      }
      if (nameLower.includes("woodtech") || nameLower.includes("trucare wood") || nameLower.includes("touchwood")) {
         subs.push("Wood Finishes");
      }
      
      updatedP.subCategories = Array.from(new Set(subs));`;

data = data.replace(regex, replacement);
fs.writeFileSync('src/components/ProductsSection.tsx', data);
