import fs from 'fs';

let content = fs.readFileSync('src/components/ShopByCategory.tsx', 'utf-8');

// Replace the imports
content = content.replace(
  "import { ChevronLeft, ChevronRight } from 'lucide-react';",
  "import { ChevronLeft, ChevronRight, Home, Building2, Layers, Droplets, PaintBucket, Shield, Paintbrush, FlaskConical, LayoutGrid, Sparkles, Droplet, PaintRoller } from 'lucide-react';"
);

// Replace categories array
const newCategories = `const categories = [
  { name: 'Interior Wall', slug: 'interior-wall', icon: Home, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Exterior Wall', slug: 'exterior-wall', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Undercoats', slug: 'undercoats', icon: Layers, color: 'text-slate-600', bg: 'bg-slate-50' },
  { name: 'Waterproofing', slug: 'waterproofing', icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  { name: 'Wood Finishes', slug: 'wood-finishes', icon: PaintBucket, color: 'text-amber-600', bg: 'bg-amber-50' },
  { name: 'Metals and Grills', slug: 'metals-and-grills', icon: Shield, color: 'text-zinc-600', bg: 'bg-zinc-50' },
  { name: 'Painting Tools', slug: 'painting-tools', icon: Paintbrush, color: 'text-orange-600', bg: 'bg-orange-50' },
  { name: 'Thinners & Solvents', slug: 'thinners-&-solvents', icon: FlaskConical, color: 'text-purple-600', bg: 'bg-purple-50' },
  { name: 'Tile Adhesives', slug: 'tile-adhesives', icon: LayoutGrid, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { name: 'PU Coatings', slug: 'pu-coatings', icon: Sparkles, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
  { name: 'Epoxy Coatings', slug: 'epoxy-coatings', icon: Droplet, color: 'text-sky-600', bg: 'bg-sky-50' },
  { name: 'Synthetic Enamels', slug: 'synthetic-enamels', icon: PaintRoller, color: 'text-rose-600', bg: 'bg-rose-50' }
];`;

content = content.replace(/const categories = \[[\s\S]*?\];/, newCategories);

// Replace the rendering inside the loop
const oldRender = `<div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50 group-hover/cat:shadow-md group-hover/cat:border-gold/30 transition-all duration-300 relative bg-white">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover/cat:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D]/60 to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                </div>`;

const newRender = `<div className={\`w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50 group-hover/cat:shadow-md group-hover/cat:border-gold/30 transition-all duration-300 flex items-center justify-center \${category.bg}\`}>
                  <category.icon className={\`w-10 h-10 sm:w-12 sm:h-12 \${category.color} group-hover/cat:scale-110 transition-transform duration-300\`} strokeWidth={1.5} />
                </div>`;

content = content.replace(oldRender, newRender);

fs.writeFileSync('src/components/ShopByCategory.tsx', content);
