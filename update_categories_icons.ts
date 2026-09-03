import fs from 'fs';

let content = fs.readFileSync('src/components/ShopByCategory.tsx', 'utf-8');

// Replace the categories array
const newCategories = `const categories = [
  { name: 'Interior Wall', slug: 'interior-wall', image: 'https://img.icons8.com/color/144/living-room.png' },
  { name: 'Exterior Wall', slug: 'exterior-wall', image: 'https://img.icons8.com/color/144/modern-house.png' },
  { name: 'Undercoats', slug: 'undercoats', image: 'https://img.icons8.com/color/144/paint-bucket.png' },
  { name: 'Waterproofing', slug: 'waterproofing', image: 'https://img.icons8.com/color/144/water-protection.png' },
  { name: 'Wood Finishes', slug: 'wood-finishes', image: 'https://img.icons8.com/color/144/wood.png' },
  { name: 'Metals and Grills', slug: 'metals-and-grills', image: 'https://img.icons8.com/color/144/fence.png' },
  { name: 'Painting Tools', slug: 'painting-tools', image: 'https://img.icons8.com/color/144/paint-brush.png' },
  { name: 'Thinners & Solvents', slug: 'thinners-&-solvents', image: 'https://img.icons8.com/color/144/flask.png' },
  { name: 'Tile Adhesives', slug: 'tile-adhesives', image: 'https://img.icons8.com/color/144/tiles.png' },
  { name: 'PU Coatings', slug: 'pu-coatings', image: 'https://img.icons8.com/color/144/spray-paint.png' },
  { name: 'Epoxy Coatings', slug: 'epoxy-coatings', image: 'https://img.icons8.com/color/144/chemistry.png' },
  { name: 'Synthetic Enamels', slug: 'synthetic-enamels', image: 'https://img.icons8.com/color/144/paint-can.png' }
];`;

content = content.replace(/const categories = \[[\s\S]*?\];/, newCategories);

// Find the old render code (the lucide icon one) and replace it with img tag rendering
const oldRender = /<div className=\{`w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-zinc-200\/50 group-hover\/cat:shadow-md group-hover\/cat:border-gold\/30 transition-all duration-300 flex items-center justify-center \$\{category\.bg\}`\}>\s*<category\.icon className=\{`w-10 h-10 sm:w-12 sm:h-12 \$\{category\.color\} group-hover\/cat:scale-110 transition-transform duration-300`\} strokeWidth=\{1\.5\} \/>\s*<\/div>/g;

const newRender = `<div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50 group-hover/cat:shadow-[0_8px_25px_rgb(0,0,0,0.06)] group-hover/cat:border-gold/30 transition-all duration-300 relative bg-gradient-to-br from-white to-zinc-50 flex items-center justify-center p-4">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain group-hover/cat:scale-110 transition-transform duration-500 ease-out drop-shadow-sm"
                  />
                </div>`;

content = content.replace(oldRender, newRender);

fs.writeFileSync('src/components/ShopByCategory.tsx', content);

// Now do the same for PaintingServicesOverview.tsx
let servicesContent = fs.readFileSync('src/components/PaintingServicesOverview.tsx', 'utf-8');

const newServices = `const services = [
  {
    title: 'Interior Wall Painting',
    description: 'Transform your living spaces with premium Royale finishes.',
    image: 'https://img.icons8.com/color/144/living-room.png',
    link: '/services/interior-wall-painting',
  },
  {
    title: 'Exterior Wall Painting',
    description: 'Protect your building with Apex and Ultima Protek systems.',
    image: 'https://img.icons8.com/color/144/modern-house.png',
    link: '/services/exterior-wall-painting',
  },
  {
    title: 'Wood & Metal Painting',
    description: 'PU finishes, Melamine polish, and Enamel for doors and grills.',
    image: 'https://img.icons8.com/color/144/wood.png',
    link: '/services/wood-metal-painting',
  },
  {
    title: 'Waterproofing Services',
    description: 'Scientific solutions to stop leaks and dampness permanently.',
    image: 'https://img.icons8.com/color/144/water-protection.png',
    link: '/services/waterproofing',
  },
  {
    title: 'Industrial Flooring',
    description: 'High-performance Epoxy and PU flooring systems for extreme durability.',
    image: 'https://img.icons8.com/color/144/factory.png',
    link: '/services/industrial-flooring',
  },
];`;

servicesContent = servicesContent.replace(/const services = \[[\s\S]*?\];/, newServices);

const oldServicesRender = /<div className=\{`w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-\[0_4px_15px_rgb\(0,0,0,0\.03\)\] border border-ivory\/10 group-hover\/cat:shadow-\[0_8px_25px_rgb\(0,0,0,0\.08\)\] group-hover\/cat:border-gold\/40 transition-all duration-500 relative group-hover\/cat:-translate-y-1 flex items-center justify-center \$\{service\.color\.split\(' '\)\[0\]\}`\}>\s*<service\.icon className=\{`w-12 h-12 sm:w-16 sm:h-16 \$\{service\.color\.split\(' '\)\[1\]\} group-hover\/cat:scale-110 transition-transform duration-500 ease-out`\} strokeWidth=\{1\.5\} \/>\s*<div className="absolute inset-0 bg-\[#1A365D\]\/5 opacity-0 group-hover\/cat:opacity-100 transition-opacity duration-300"><\/div>\s*<\/div>/g;

const newServicesRender = `<div className="w-full aspect-square rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_4px_15px_rgb(0,0,0,0.03)] border border-ivory/10 group-hover/cat:shadow-[0_8px_25px_rgb(0,0,0,0.08)] group-hover/cat:border-gold/40 transition-all duration-500 relative bg-gradient-to-br from-white to-zinc-50 group-hover/cat:-translate-y-1 flex items-center justify-center p-6">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain group-hover/cat:scale-110 transition-transform duration-700 ease-out drop-shadow-md"
                    />
                    <div className="absolute inset-0 bg-[#1A365D]/5 opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                  </div>`;

servicesContent = servicesContent.replace(oldServicesRender, newServicesRender);

fs.writeFileSync('src/components/PaintingServicesOverview.tsx', servicesContent);
