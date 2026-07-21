const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

// Update SEO Title
content = content.replace(
  'const seoTitle = shade\n    ? `${shade.name} (${shade.shadeCode}) - ${shade.brand} Colour | Rainbow Paints`\n    : "Paint Shade Details | Rainbow Paints";',
  'const seoTitle = shade\n    ? `${shade.brand} ${shade.name} ${shade.shadeCode} Color Code, Images & Combinations`\n    : "Paint Shade Details | Rainbow Paints";'
);
content = content.replace(
  'const seoTitle = shade ? `${shade.name} (${shade.shadeCode}) - ${shade.brand} Colour | Rainbow Paints` : "Paint Shade Details | Rainbow Paints";',
  'const seoTitle = shade ? `${shade.brand} ${shade.name} ${shade.shadeCode} Color Code, Images & Combinations` : "Paint Shade Details | Rainbow Paints";'
);
content = content.replace(
  'const seoTitle = shade\n    ? \\`${shade.name} (${shade.shadeCode}) - ${shade.brand} Colour | Rainbow Paints\\`\n    : "Paint Shade Details | Rainbow Paints";',
  'const seoTitle = shade\n    ? \\`${shade.brand} ${shade.name} ${shade.shadeCode} Color Code, Images & Combinations\\`\n    : "Paint Shade Details | Rainbow Paints";'
);

// Fallback search and replace for seoTitle if line breaks differ
content = content.replace(/const seoTitle = shade[\s\S]*?;\n/, 'const seoTitle = shade ? `${shade.brand} ${shade.name} ${shade.shadeCode} Color Code, Images & Combinations` : "Paint Shade Details | Rainbow Paints";\n');

// Update SEO Description
content = content.replace(/const seoDescription = shade[\s\S]*?;\n/, 'const seoDescription = shade ? `Explore ${shade.brand} ${shade.name} (${shade.shadeCode}) paint color. View real room images, color combinations, and recommended finishes. Buy online at wholesale prices from Rainbow Paints Coimbatore.` : "Explore a wide variety of paint shades from top brands.";\n');


fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Replaced SEO Title and Description");
