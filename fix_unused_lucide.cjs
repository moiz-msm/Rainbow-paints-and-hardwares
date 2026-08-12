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
  // Remove ArrowRight, CheckCircle2, Droplet, Brush, ShieldCheck, PenTool, Star if they are unused, but it's simpler to just let the lint fail and tell us if they are unused, or we can just remove all unused imports safely by invoking a regex that only keeps what's actually used.
});
