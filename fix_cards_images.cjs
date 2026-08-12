const fs = require('fs');
const path = require('path');

// Fix ShopByCategory.tsx
const shopFilePath = path.join(__dirname, 'src', 'components', 'ShopByCategory.tsx');
if (fs.existsSync(shopFilePath)) {
  let content = fs.readFileSync(shopFilePath, 'utf8');

  // Revert imports
  content = content.replace(
    /import \{ ChevronLeft, ChevronRight, .* \} from 'lucide-react';/,
    `import { ChevronLeft, ChevronRight } from 'lucide-react';`
  );

  // Revert categories
  content = content.replace(
    /const categories = \[\s*\{ name: 'Interior Wall'[\s\S]*?\];/,
    `const categories = [
  { name: 'Interior Wall', slug: 'interior-wall', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=500&q=80' },
  { name: 'Exterior Wall', slug: 'exterior-wall', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80' },
  { name: 'Undercoats', slug: 'undercoats', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&q=80' },
  { name: 'Waterproofing', slug: 'waterproofing', image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=500&q=80' },
  { name: 'Wood Finishes', slug: 'wood-finishes', image: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=500&q=80' },
  { name: 'Metals and Grills', slug: 'metals-and-grills', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&q=80' },
  { name: 'Painting Tools', slug: 'painting-tools', image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=500&q=80' },
  { name: 'Thinners & Solvents', slug: 'thinners-&-solvents', image: 'https://plus.unsplash.com/premium_photo-1664303847960-586318f59035?w=500&q=80' },
  { name: 'Tile Adhesives', slug: 'tile-adhesives', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=500&q=80' },
  { name: 'PU Coatings', slug: 'pu-coatings', image: 'https://images.unsplash.com/photo-1563906267088-b029e7101114?w=500&q=80' },
  { name: 'Epoxy Coatings', slug: 'epoxy-coatings', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=500&q=80' },
  { name: 'Synthetic Enamels', slug: 'synthetic-enamels', image: 'https://images.unsplash.com/photo-1416339684178-3a239570f315?w=500&q=80' }
];`
  );

  // Replace map content
  content = content.replace(
    /\{categories\.map\(\(category\) => \([\s\S]*?<\/Link>\s*\)\)\}/,
    `{categories.map((category) => (
              <Link 
                key={category.slug} 
                to={\`/c/\${category.slug}\`}
                className="flex-shrink-0 flex flex-col items-center gap-3 w-[100px] sm:w-[120px] lg:w-[140px] group/cat"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50 group-hover/cat:shadow-md group-hover/cat:border-gold/30 transition-all duration-300 relative bg-white">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover/cat:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D]/60 to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                </div>
                <span className="font-serif font-medium text-[11px] sm:text-xs lg:text-sm text-center leading-tight text-[#1A365D]">
                  {category.name}
                </span>
              </Link>
            ))}`
  );

  fs.writeFileSync(shopFilePath, content, 'utf8');
}

// Fix PaintingServicesOverview.tsx
const servicesFilePath = path.join(__dirname, 'src', 'components', 'PaintingServicesOverview.tsx');
if (fs.existsSync(servicesFilePath)) {
  let content = fs.readFileSync(servicesFilePath, 'utf8');

  // Replace map content
  content = content.replace(
    /\{services\.map\(\(service, index\) => \{[\s\S]*?<\/Link>\s*\);\s*\}\)\}/,
    `{services.map((service, index) => {
              return (
                <Link 
                  key={index} 
                  to={service.link}
                  className="flex-shrink-0 flex flex-col items-center gap-3 w-[100px] sm:w-[120px] lg:w-[140px] group/cat"
                >
                  <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-sm border border-zinc-200/50 group-hover/cat:shadow-md group-hover/cat:border-gold/30 transition-all duration-300 relative bg-white">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover/cat:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A365D]/60 to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="font-serif font-medium text-[11px] sm:text-xs lg:text-sm text-center leading-tight text-[#1A365D]">
                    {service.title}
                  </span>
                </Link>
              );
            })}`
  );

  fs.writeFileSync(servicesFilePath, content, 'utf8');
}

console.log('Fixed cards to use high-quality images');
