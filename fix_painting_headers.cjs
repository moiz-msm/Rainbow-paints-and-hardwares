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
    
    // Replace h1
    content = content.replace(
      /className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-ivory mb-6 leading-tight"/g,
      'className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium mb-6 uppercase tracking-tight leading-tight text-ivory"'
    );

    // Replace p
    content = content.replace(
      /className="text-lg md:text-xl text-ivory\/80 mb-8 max-w-2xl mx-auto lg:mx-0"/g,
      'className="text-sm sm:text-base text-ivory/80 mb-8 max-w-2xl mx-auto lg:mx-0 font-light italic"'
    );
    content = content.replace(
      /className="text-lg text-ivory\/80 mb-8 max-w-2xl mx-auto lg:mx-0"/g,
      'className="text-sm sm:text-base text-ivory/80 mb-8 max-w-2xl mx-auto lg:mx-0 font-light italic"'
    );

    // Replace button 1
    content = content.replace(
      /className="bg-gold text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-amber-500 transition-colors shadow-md text-lg"/g,
      'className="bg-[#C6A87C] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap gap-2 hover:bg-[#b09265] transition-all duration-300 shadow-lg flex-1 sm:flex-none"'
    );

    // Replace button 2
    content = content.replace(
      /className="bg-white border-2 border-royale-accent text-ivory px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-royale-surface hover:text-white transition-colors text-lg"/g,
      'className="bg-white text-[#C6A87C] px-4 py-2 sm:px-6 sm:py-3 rounded-full text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap gap-2 transition-all duration-300 shadow-lg flex-1 sm:flex-none border border-[#C6A87C]/30 hover:bg-zinc-50"'
    );
    
    // Adjust icons for buttons
    // Since we're not using AST, we'll try replacing specific icon wrappers for the header buttons.
    // The icons in the header buttons are MessageSquare and Phone.
    
    // There are other buttons at the bottom of the pages ("px-6 py-3 bg-royale-bg rounded-xl border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-sm")
    // Let's fix those too if they exist.
    content = content.replace(
      /className="px-6 py-3 bg-royale-bg rounded-xl border border-royale-accent\/50 hover:border-gold\/50 hover:bg-white text-ivory\/90 font-bold transition-all text-sm"/g,
      'className="px-4 py-2 bg-royale-bg rounded-full border border-royale-accent/50 hover:border-gold/50 hover:bg-white text-ivory/90 font-bold transition-all text-[10px] sm:text-xs uppercase tracking-wider"'
    );

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});
