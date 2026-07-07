import fs from 'fs';

let content = fs.readFileSync('src/pages/ProductDetailPage.tsx', 'utf8');

const target = `found = mockProducts.find(p => p.name && normalizeStr(p.name) === targetSlugNormalized);`;

const replacement = `let processedMockProducts = mockProducts.map(p => {
            let updatedP = { ...p };
            const key = p.name ? p.name.trim().toLowerCase() : '';
            let subs = updatedP.subCategory ? [updatedP.subCategory] : [];
            subs = subs.map((sub: string) => {
              if (sub === "Primer") return "Undercoats";
              if (sub === "Color Oxides" || sub === "Colour Oxide") return key.includes("gorila") ? "Wood Finishes" : sub;
              if (sub === "Abrasives & Sandpapers" || sub === "Abrasives and Sandpapers") return "Painting Tools";
              return sub;
            });
            if (key.includes("putty") || key.includes("white cement")) subs = ["Undercoats"];
            if (key.includes("2 in 1") || key.includes("2-in-1") || key.includes("two in one")) subs.push("Interior Wall", "Exterior Wall");
            if (key.includes("exterior primer")) subs.push("Exterior Wall", "Undercoats");
            
            updatedP.subCategories = Array.from(new Set(subs));
            if (updatedP.subCategories.length > 0) updatedP.subCategory = updatedP.subCategories[0];
            return updatedP;
          });
          found = processedMockProducts.find(p => p.name && normalizeStr(p.name) === targetSlugNormalized);
          if (found && found.subCategories && (found.subCategories.includes("Color Oxides") || found.subCategories.includes("Colour Oxide"))) {
             found = undefined;
          }`;

if (content.includes(target)) {
  fs.writeFileSync('src/pages/ProductDetailPage.tsx', content.replace(target, replacement), 'utf8');
  console.log("Fixed mockProducts fallback in PDP.");
}
