const fs = require('fs');
const path = require('path');

const files = [
  'src/pages/InteriorPaintingPage.tsx',
  'src/pages/ExteriorPaintingPage.tsx',
  'src/pages/WoodPaintingPage.tsx',
  'src/pages/WaterproofingPage.tsx',
  'src/pages/IndustrialFlooringPage.tsx',
  'src/pages/PaintingServiceSEOPage.tsx'
];

files.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/import DetailedPaintingPricing from '\.\.\/components\/DetailedPaintingPricing';\n/g, '');
  content = content.replace(/import PaintingProcess from '\.\.\/components\/PaintingProcess';\n/g, '');
  
  // Also remove unused packages array if it's there but now unused
  // Wait, if packages is declared inside the component, it might cause "packages is assigned a value but never used"
  // Let's comment out or remove the `const packages = [` block.
  // Easiest is to replace `const packages = [` with `const packages_unused = [` to avoid linter error if we can't easily remove it, or just use regex to remove it.
  content = content.replace(/const packages = \[[\s\S]*?\];\n/g, '');

  fs.writeFileSync(filePath, content);
});
