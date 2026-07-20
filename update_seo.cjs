const fs = require('fs');

let content = fs.readFileSync('generate_seo.ts', 'utf-8');

const injection = `
  // Add shade routes
  const asianShades = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/shades/asian-paints.json'), 'utf-8'));
  const bergerShades = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/shades/berger-paints.json'), 'utf-8'));
  const mrfShades = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/shades/mrf-paints.json'), 'utf-8'));
  
  const allShades = [...asianShades, ...bergerShades, ...mrfShades];
  allShades.forEach((shade) => {
    const slug = \`\${shade.name}-\${shade.shadeCode}\`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    urls.push(\`/color/\${slug}\`);
  });
`;

content = content.replace('// Add product routes', injection + '\n  // Add product routes');
fs.writeFileSync('generate_seo.ts', content);

