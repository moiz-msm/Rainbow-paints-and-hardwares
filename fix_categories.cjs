const fs = require('fs');

let data = fs.readFileSync('src/components/ProductsSection.tsx', 'utf8');

const regex = /if\s*\(nameLower\.includes\("putty"\)[\s\S]*?updatedP\.subCategories\s*=\s*Array\.from\(new\s*Set\(subs\)\);/;

const replacement = `if (nameLower.includes("putty") || nameLower.includes("white cement")) {
        subs.push("Undercoats");
      }
      if (nameLower.includes("2 in 1") || nameLower.includes("2-in-1") || nameLower.includes("two in one")) {
         subs.push("Interior Wall", "Exterior Wall");
      }
      if (nameLower.includes("exterior primer")) {
         subs.push("Exterior Wall", "Undercoats");
      }
      if (nameLower.includes("damp sheath exterior") || nameLower === "damp sheath exterior") {
         subs.push("Exterior Wall", "Undercoats", "Waterproofing");
      }
      if (nameLower.includes("damp sheath interior")) {
         subs.push("Interior Wall", "Undercoats", "Waterproofing");
      }
      if (nameLower.includes("tile adhesive") || nameLower.includes("tile bonder") || nameLower.includes("grout")) {
         subs.push("Tile Adhesives", "Waterproofing");
      }
      if (nameLower.includes("damp proof") || nameLower.includes("waterproof")) {
         subs.push("Waterproofing");
      }
      
      updatedP.subCategories = Array.from(new Set(subs));`;

data = data.replace(regex, replacement);
fs.writeFileSync('src/components/ProductsSection.tsx', data);
