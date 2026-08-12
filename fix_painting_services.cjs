const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'PaintingServicesOverview.tsx');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /<div className="py-16 bg-white relative">[\s\S]*?<div className="text-center mb-12">[\s\S]*?<\/div>/,
    `<section className="py-12 sm:py-24 border-t border-gold/10 relative overflow-hidden bg-gradient-to-b from-white/60 to-royale-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-4 mb-8">
          <div className="max-w-xl">
            <h2 className="text-xl sm:text-2xl font-serif font-medium mb-3 tracking-tight leading-tight text-center text-[#1A365D]">
              Professional <span className="text-gradient italic">Painting Services</span>
            </h2>
            <p className="text-[10px] sm:text-xs text-[#1A365D]/70 max-w-xl mx-auto font-sans font-light leading-relaxed">
              From basic repainting to luxury finishes, we offer complete end-to-end painting services with laser-accurate estimates and 100% genuine products.
            </p>
          </div>
        </div>`
  );
  
  content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*$/i, '</div>\n    </section>\n  );\n}\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed PaintingServicesOverview.tsx');
} else {
  console.log('File not found');
}
