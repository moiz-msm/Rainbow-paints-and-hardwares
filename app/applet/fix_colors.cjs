const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/pages/PaintingServiceSEOPage.tsx',
  'src/pages/InteriorPaintingPage.tsx',
  'src/pages/ExteriorPaintingPage.tsx',
  'src/pages/WoodPaintingPage.tsx',
  'src/pages/WaterproofingPage.tsx',
  'src/pages/IndustrialFlooringPage.tsx',
  'src/components/DetailedPaintingPricing.tsx'
];

filesToFix.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace text colors
    content = content.replace(/text-zinc-600/g, 'text-ivory/80');
    content = content.replace(/text-zinc-500/g, 'text-ivory/70');
    content = content.replace(/text-zinc-400/g, 'text-ivory/60');
    content = content.replace(/text-zinc-700/g, 'text-ivory/90');
    content = content.replace(/text-zinc-300/g, 'text-ivory/50');
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
