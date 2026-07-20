const fs = require('fs');

const filesToFix = [
  'src/components/CalculatorSection.tsx',
  'src/components/ProductsSection.tsx',
  'src/components/AIPhotoStudio.tsx',
  'src/components/VisualizerSection.tsx',
];

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace \`/color/\${shadeService.generateSlug(shade)}\` with shadeService.getShadeUrl(shade)
    content = content.replace(/to=\{\`\/color\/\$\{shadeService\.generateSlug\(([^)]+)\)\}\`\}/g, 'to={shadeService.getShadeUrl($1)}');
    
    fs.writeFileSync(file, content);
  }
});
