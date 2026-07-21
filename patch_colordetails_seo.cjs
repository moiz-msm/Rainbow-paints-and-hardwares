const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const targetTitle = `  const seoTitle = shade ? \`\${shade.brand} \${shade.name} \${shade.shadeCode} Color Code, Images & Combinations\` : "Paint Shade Details | Rainbow Paints";`;
const replacementTitle = `  const seoTitle = shade ? \`\${shade.name} \${shade.shadeCode} | \${shade.brand} Colour Shade Card 2026\` : "Paint Shade Details | Rainbow Paints";`;

const targetDesc = `  const seoDescription = shade ? \`Explore \${shade.brand} \${shade.name} (\${shade.shadeCode}) paint color. View real room images, color combinations, and recommended finishes. Buy online at wholesale prices from Rainbow Paints Coimbatore.\` : "Explore a wide variety of paint shades from top brands.";`;
const replacementDesc = `  const seoDescription = shade ? \`\${shade.name} \${shade.shadeCode} is one of the most loved shades in the \${shade.brand} palette. Visualize it in real homes, compare with similar tones, and get expert tips.\` : "Explore a wide variety of paint shades from top brands.";`;

content = content.replace(targetTitle, replacementTitle);
content = content.replace(targetDesc, replacementDesc);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Updated SEO Title and Desc");
