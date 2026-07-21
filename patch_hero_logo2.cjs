const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

const target = `                     {heroBrands.slice(0, 6).map((brand, idx) => brand && (
                       <div key={idx} className="h-4 sm:h-5 md:h-8 lg:h-12 w-full flex items-center justify-center hover:scale-110 transition-all duration-300">
                         <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
                       </div>
                     ))}`;

const replacement = `                     {heroBrands.slice(0, 6).map((brand, idx) => brand && (
                       <div key={idx} className="h-4 sm:h-5 md:h-8 lg:h-12 w-full flex items-center justify-center hover:scale-110 transition-all duration-300">
                         {brand.name === 'Berger Paints' ? (
                           <div className="bg-white/95 px-2 py-1 rounded h-full w-full flex items-center justify-center">
                             <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
                           </div>
                         ) : (
                           <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />
                         )}
                       </div>
                     ))}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/Hero.tsx', content);
  console.log("Patched successfully");
} else {
  console.log("Target not found");
}
