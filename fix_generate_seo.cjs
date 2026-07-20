const fs = require('fs');
let content = fs.readFileSync('generate_seo.ts', 'utf-8');

const target = `  allShades.forEach((shade) => {
    const slug = \`\${shade.name}-\${shade.shadeCode}\`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    urls.push(\`/color/\${slug}\`);
  });`;

const replacement = `  allShades.forEach((shade) => {
    const brandSlug = shade.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const familySlug = shade.family.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const shadeSlug = \`\${shade.name}-\${shade.shadeCode}\`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    urls.push(\`/color/\${brandSlug}/\${familySlug}/\${shadeSlug}\`);
  });`;

content = content.replace(target, replacement);
fs.writeFileSync('generate_seo.ts', content);
