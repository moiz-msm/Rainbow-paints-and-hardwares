const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const importRegex = /import \{([^}]+)\} from 'lucide-react';/;
content = content.replace(importRegex, (match, p1) => {
    let imports = p1.split(',').map(s => s.trim());
    if (!imports.includes('ShoppingCart')) imports.push('ShoppingCart');
    return `import { ${imports.join(', ')} } from 'lucide-react';`;
});

const regex = /<Link to="\/buy-paint-online"[\s\S]*?<\/Link>\s*<Link to="\/visualizer"[\s\S]*?<\/Link>/;

const newButtons = `<Link to="/buy-paint-online" className="bg-[#C6A87C] text-white px-4 py-2.5 sm:px-8 sm:py-4 rounded-full text-[9px] sm:text-xs font-sans font-bold uppercase tracking-widest flex items-center justify-center whitespace-nowrap gap-1.5 sm:gap-3 hover:bg-[#b09265] transition-all duration-300 shadow-xl flex-1">
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-5 sm:h-5" /> Shop Paint
                    </Link>
                    <Link to="/visualizer" className="bg-ivory/40 border border-ivory/60 backdrop-blur-sm text-[#C6A87C] px-4 py-2.5 sm:px-8 sm:py-4 rounded-full text-[9px] sm:text-xs font-sans font-bold uppercase tracking-widest flex items-center justify-center whitespace-nowrap gap-1.5 sm:gap-3 hover:bg-ivory/60 transition-colors duration-300 shadow-lg flex-1">
                      <Palette className="w-3.5 h-3.5 sm:w-5 sm:h-5" /> Visualise Colours
                    </Link>`;

content = content.replace(regex, newButtons);
fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
