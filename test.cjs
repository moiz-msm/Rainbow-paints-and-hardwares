const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf-8');

const target1 = `                             <img src={brand.logo} alt={brand.name} className={\`max-h-full w-auto object-contain \${brand.name === 'Berger Paints' ? 'bg-white/95 px-2 py-0.5 rounded' : ''}\`} />`;
const replacement1 = `                             {brand.name === 'Berger Paints' ? (
                               <div className="bg-white/95 px-2 py-1 rounded h-full flex items-center justify-center">
                                 <img src={brand.logo} alt={brand.name} className="max-h-full w-auto object-contain" />
                               </div>
                             ) : (
                               <img src={brand.logo} alt={brand.name} className="max-h-full w-auto object-contain" />
                             )}`;

const target2 = `                         <img src={brand.logo} alt={brand.name} className={\`max-h-full max-w-full object-contain \${brand.name === 'Berger Paints' ? 'bg-white/95 px-2 py-1 rounded' : ''}\`} />`;
const replacement2 = `                         <img src={brand.logo} alt={brand.name} className="max-h-full max-w-full object-contain" />`;

content = content.replace(target1, replacement1);
content = content.replace(target2, replacement2);
fs.writeFileSync('src/components/Hero.tsx', content);
