const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/pages/PaintingServiceSEOPage.tsx',
  'src/pages/InteriorPaintingPage.tsx',
  'src/pages/ExteriorPaintingPage.tsx',
  'src/pages/WoodPaintingPage.tsx',
  'src/pages/WaterproofingPage.tsx',
  'src/pages/IndustrialFlooringPage.tsx'
];

filesToFix.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Attempt to remove the button container using a regex that matches from <div className="flex ... gap-4 ..."> to </div>
    // Note: We need to be careful to only match the header buttons. They usually precede </div></div> (the end of the text column).
    // Let's just remove the flex container that has 'gap-4 justify-center' and contains 'Book Free Site Visit'
    content = content.replace(
      /<div className="flex (flex-col sm:flex-row|flex-wrap) gap-4 justify-center lg:justify-start">[\s\S]*?<\/div>/,
      ''
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
