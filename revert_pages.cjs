const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const pages = [
  'IndustrialFlooringPage.tsx',
  'InteriorPaintingPage.tsx',
  'ExteriorPaintingPage.tsx',
  'WaterproofingPage.tsx',
  'WoodPaintingPage.tsx'
];

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Revert back the bg-zinc-900 to bg-royale-surface/50
  content = content.replace(
    /className="lg:w-1\/3 bg-zinc-900 text-white p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-center relative overflow-hidden group"/g,
    'className="lg:w-1/3 bg-royale-surface/50 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-royale-accent/30 flex flex-col justify-center"'
  );

  content = content.replace(
    /<h3 className="text-2xl font-bold font-serif text-white mb-2 relative z-10">/g,
    '<h3 className="text-2xl font-bold font-serif text-ivory mb-2">'
  );
  content = content.replace(
    /<p className="text-sm text-gold mb-4 relative z-10">/g,
    '<p className="text-sm text-zinc-500 mb-4">'
  );
  content = content.replace(
    /<p className="text-sm text-zinc-300 leading-relaxed mb-6 relative z-10">/g,
    '<p className="text-sm text-zinc-600 leading-relaxed mb-6">'
  );
  content = content.replace(
    /<div key=\{i\} className="flex items-center gap-2 text-sm text-zinc-300 relative z-10">/g,
    '<div key={i} className="flex items-center gap-2 text-sm text-zinc-700">'
  );
  content = content.replace(
    /<div className="w-12 h-12 bg-zinc-800 shadow-lg border border-zinc-700 rounded-full flex items-center justify-center text-gold mb-4 relative z-10">/g,
    '<div className="w-12 h-12 bg-white shadow-sm rounded-full flex items-center justify-center text-gold mb-4">'
  );
  
  // Remove the background accent 
  content = content.replace(
    /<div className="absolute -right-20 -top-20 w-64 h-64 bg-gold\/5 rounded-full blur-3xl pointer-events-none group-hover:bg-gold\/10 transition-colors duration-500" \/>\n\s*<div className="w-12/g,
    '<div className="w-12'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Reverted ${page}`);
});
