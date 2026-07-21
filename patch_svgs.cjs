const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

// Add imports
if (!content.includes('import { LivingRoomSvg')) {
  content = content.replace(
    'import {',
    'import { LivingRoomSvg, BedroomSvg } from "../components/RoomSvgs";\nimport {'
  );
}

// Remove getStableImages
const oldGetStable = /function getStableImages[\s\S]*?return \{\s*living:[\s\S]*?bedroom:[\s\S]*?\}\s*\;\s*\}/g;
content = content.replace(oldGetStable, '');

// Replace old logic
content = content.replace(/const \{ living, bedroom \} = shade \? getStableImages.*?\n/, '');

// Replace JSX
const targetJsx = `<div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <img src={living} alt={\`Living room painted in \${shade.name}\`} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity duration-500" style={{ backgroundColor: shade.hex }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-serif text-xl mb-1">Living Room</h3>
                <p className="text-white/80 text-sm font-light">See how {shade.name} transforms the main living space with a {shade.finish.toLowerCase()} finish.</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <img src={bedroom} alt={\`Bedroom painted in \${shade.name}\`} referrerPolicy="no-referrer" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity duration-500" style={{ backgroundColor: shade.hex }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-serif text-xl mb-1">Bedroom</h3>
                <p className="text-white/80 text-sm font-light">Create a calming atmosphere using {shade.name} on your bedroom walls.</p>
              </div>
            </div>`;

const newJsx = `<div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white group">
              <LivingRoomSvg wallColor={shade.hex} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <h3 className="text-white font-serif text-xl mb-1">Living Room</h3>
                <p className="text-white/90 text-sm font-light">See how {shade.name} transforms the main living space with a {shade.finish.toLowerCase()} finish.</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-white group">
              <BedroomSvg wallColor={shade.hex} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none"></div>
              <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                <h3 className="text-white font-serif text-xl mb-1">Bedroom</h3>
                <p className="text-white/90 text-sm font-light">Create a calming atmosphere using {shade.name} on your bedroom walls.</p>
              </div>
            </div>`;

content = content.replace(targetJsx, newJsx);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Replaced with SVGs!");
