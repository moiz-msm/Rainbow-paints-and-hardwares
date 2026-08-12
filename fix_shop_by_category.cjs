const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'ShopByCategory.tsx');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Add Lucide imports
  content = content.replace(
    /import { ChevronLeft, ChevronRight } from 'lucide-react';/,
    `import { ChevronLeft, ChevronRight, Home, Building2, Paintbrush, Droplet, TreePine, Grid, PenTool, FlaskConical, LayoutGrid, Layers, PaintBucket, Pipette } from 'lucide-react';`
  );

  // Update categories
  content = content.replace(
    /const categories = \[[\s\S]*?\];/,
    `const categories = [
  { name: 'Interior Wall', slug: 'interior-wall', icon: Home, color: 'bg-emerald-50 text-emerald-600' },
  { name: 'Exterior Wall', slug: 'exterior-wall', icon: Building2, color: 'bg-blue-50 text-blue-600' },
  { name: 'Undercoats', slug: 'undercoats', icon: Layers, color: 'bg-zinc-50 text-zinc-600' },
  { name: 'Waterproofing', slug: 'waterproofing', icon: Droplet, color: 'bg-cyan-50 text-cyan-600' },
  { name: 'Wood Finishes', slug: 'wood-finishes', icon: TreePine, color: 'bg-amber-50 text-amber-600' },
  { name: 'Metals and Grills', slug: 'metals-and-grills', icon: Grid, color: 'bg-slate-50 text-slate-600' },
  { name: 'Painting Tools', slug: 'painting-tools', icon: PenTool, color: 'bg-orange-50 text-orange-600' },
  { name: 'Thinners & Solvents', slug: 'thinners-&-solvents', icon: FlaskConical, color: 'bg-purple-50 text-purple-600' },
  { name: 'Tile Adhesives', slug: 'tile-adhesives', icon: LayoutGrid, color: 'bg-stone-50 text-stone-600' },
  { name: 'PU Coatings', slug: 'pu-coatings', icon: Pipette, color: 'bg-indigo-50 text-indigo-600' },
  { name: 'Epoxy Coatings', slug: 'epoxy-coatings', icon: PaintBucket, color: 'bg-teal-50 text-teal-600' },
  { name: 'Synthetic Enamels', slug: 'synthetic-enamels', icon: Paintbrush, color: 'bg-rose-50 text-rose-600' }
];`
  );

  // Replace image with icon in JSX
  content = content.replace(
    /<div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-ivory\/10 group-hover\/cat:shadow-md group-hover\/cat:border-gold\/30 transition-all duration-300">[\s\S]*?<\/div>/,
    `<div className={\`w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-ivory/10 group-hover/cat:shadow-md group-hover/cat:border-gold/30 transition-all duration-300 flex items-center justify-center \${category.color}\`}>
                  <category.icon className="w-10 h-10 sm:w-12 sm:h-12 group-hover/cat:scale-110 transition-transform duration-700 ease-out" strokeWidth={1.5} />
                </div>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed ShopByCategory.tsx');
}
