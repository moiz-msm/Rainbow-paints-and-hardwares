const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const heroBrandsCode = `
  const heroBrands = [
    "Asian Paints",
    "Berger Paints",
    "Birla White",
    "MRF Vapocure",
    "Dr. Fixit",
    "Just Spray"
  ].map(name => brandDetails.find(b => b.name === name)).filter(Boolean);
`;

content = content.replace('export default function Hero() {', 'export default function Hero() {\n' + heroBrandsCode);

const oldScreen1 = `                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8">
                      {brandDetails.filter(b => b.logo).slice(0, 4).map((brand, idx) => (
                        <div key={idx} className="h-6 sm:h-8 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                           <img src={brand.logo} alt={brand.name} className="max-h-full w-auto object-contain" />
                        </div>
                      ))}
                    </div>`;

const newScreen1 = `                    <div className="w-full max-w-[300px] sm:max-w-[400px] lg:max-w-lg overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                      <motion.div 
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                        className="flex items-center w-max gap-8 sm:gap-12 pr-8 sm:pr-12"
                      >
                        {[...heroBrands, ...heroBrands].map((brand, idx) => brand && (
                          <div key={idx} className="h-6 sm:h-8 flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                             <img src={brand.logo} alt={brand.name} className="max-h-full w-auto object-contain" />
                          </div>
                        ))}
                      </motion.div>
                    </div>`;

content = content.replace(oldScreen1, newScreen1);

const oldScreen2 = `                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 items-center justify-items-center">
                     {brandDetails.filter(b => b.logo).slice(0, 6).map((brand, idx) => (
                       <div key={idx} className="h-10 lg:h-14 w-full flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
                         <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain filter brightness-0 invert" />
                       </div>
                     ))}
                   </div>`;

const newScreen2 = `                   <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12 items-center justify-items-center">
                     {heroBrands.slice(0, 6).map((brand, idx) => brand && (
                       <div key={idx} className="h-10 lg:h-14 w-full flex items-center justify-center opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300">
                         <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain filter brightness-0 invert" />
                       </div>
                     ))}
                   </div>`;

content = content.replace(oldScreen2, newScreen2);

fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
console.log("Patch applied!");
