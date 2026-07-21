const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const dynamicLogic = `
  // Dynamic images based on shade name hash
  const getStableImages = (shadeName) => {
    let hash = 0;
    for (let i = 0; i < shadeName.length; i++) {
      hash = shadeName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const livingRooms = [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55dd5802c6c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80"
    ];
    
    const bedrooms = [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617325247661-675ab03407bd?auto=format&fit=crop&q=80"
    ];

    const idx = Math.abs(hash) % 5;
    return { living: livingRooms[idx], bedroom: bedrooms[idx] };
  };

  const getRecommendedProducts = (brand) => {
    const b = brand.toLowerCase();
    if (b.includes('asian')) {
      return [
        { name: 'Royale Glitz', desc: 'Ultra matt luxury interior emulsion with crack-free performance. Perfect for achieving a rich look.', link: '/p/royale-glitz-ultra-matt' },
        { name: 'Apex Ultima', desc: 'High-performance exterior emulsion to protect your walls from harsh weather and UV fading.', link: '/p/apex-ultima' },
        { name: 'Apcolite Premium', desc: 'Rich, smooth finish for interior walls with long-lasting performance.', link: '/p/apcolite-premium-emulsion' }
      ];
    }
    if (b.includes('berger')) {
      return [
        { name: 'Silk Glamor', desc: 'Luxury interior emulsion with a high sheen finish that makes colors come alive.', link: '/p/silk-glamor-high-sheen' },
        { name: 'Easy Clean', desc: 'Washable interior paint that keeps your walls looking fresh and bright for years.', link: '/p/easy-clean-silky-touch' },
        { name: 'WeatherCoat Anti Dust', desc: 'Exterior paint with Dust Guard technology that doesn\'t allow dust to settle.', link: '/p/weathercoat-anti-dust' }
      ];
    }
    if (b.includes('mrf')) {
      return [
        { name: 'MRF Aquafresh', desc: 'Premium interior emulsion offering excellent washability and stain resistance.', link: '/p/mrf-aquafresh-interior-emulsion' },
        { name: 'MRF WoodCoat', desc: 'High quality PU finish for wood surfaces to complement your wall colors.', link: '/p/woodcoat-italia-pu-finish' },
        { name: 'MRF Wall Putty', desc: 'Super fine wall putty for a perfectly smooth base before painting.', link: '/p/mrf-acrylic-super-fine-wall-putty' }
      ];
    }
    return [
      { name: 'Royale Glitz', desc: 'Ultra matt luxury interior emulsion with crack-free performance.', link: '/p/royale-glitz-ultra-matt' },
      { name: 'Easy Clean', desc: 'Washable interior paint that keeps walls looking fresh and bright for years.', link: '/p/easy-clean-silky-touch' },
      { name: 'Apex Ultima', desc: 'High-performance exterior emulsion to protect from harsh weather.', link: '/p/apex-ultima' }
    ];
  };

  const { living, bedroom } = shade ? getStableImages(shade.name + shade.shadeCode) : { living: "", bedroom: "" };
  const recommended = shade ? getRecommendedProducts(shade.brand) : [];
`;

// Insert the logic before the return statement of the component
// The component is "export default function ColorDetailsPage() {"
const componentBodyTarget = `  if (loading) {`;
content = content.replace(componentBodyTarget, dynamicLogic + '\n' + componentBodyTarget);


// Now replace the JSX for room inspiration
const roomTarget = `{/* Room Inspiration */}
        <div className="mt-16 pt-16 border-t border-royale-accent">
          <h2 className="text-2xl font-display font-medium text-ivory mb-8">
            Room Inspiration with <span className="text-gradient italic">{shade.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80" alt={\`Living room painted in \${shade.name}\`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity duration-500" style={{ backgroundColor: shade.hex }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-serif text-xl mb-1">Living Room</h3>
                <p className="text-white/80 text-sm font-light">See how {shade.name} transforms the main living space with a {shade.finish.toLowerCase()} finish.</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <img src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80" alt={\`Bedroom painted in \${shade.name}\`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity duration-500" style={{ backgroundColor: shade.hex }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-serif text-xl mb-1">Bedroom</h3>
                <p className="text-white/80 text-sm font-light">Create a calming atmosphere using {shade.name} on your bedroom walls.</p>
              </div>
            </div>
          </div>
        </div>`;

const roomReplacement = `{/* Room Inspiration */}
        <div className="mt-16 pt-16 border-t border-royale-accent">
          <h2 className="text-2xl font-display font-medium text-ivory mb-8">
            Room Inspiration with <span className="text-gradient italic">{shade.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <img src={living} alt={\`Living room painted in \${shade.name}\`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity duration-500" style={{ backgroundColor: shade.hex }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-serif text-xl mb-1">Living Room</h3>
                <p className="text-white/80 text-sm font-light">See how {shade.name} transforms the main living space with a {shade.finish.toLowerCase()} finish.</p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
              <img src={bedroom} alt={\`Bedroom painted in \${shade.name}\`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity duration-500" style={{ backgroundColor: shade.hex }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-serif text-xl mb-1">Bedroom</h3>
                <p className="text-white/80 text-sm font-light">Create a calming atmosphere using {shade.name} on your bedroom walls.</p>
              </div>
            </div>
          </div>
        </div>`;

content = content.replace(roomTarget, roomReplacement);


// Now replace recommended products JSX
const recTarget = `{/* Recommended Products */}
        <div className="mt-16 pt-16 border-t border-royale-accent">
          <h2 className="text-2xl font-display font-medium text-ivory mb-8">
            Recommended Products for <span className="text-gradient italic">{shade.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/p/royale-glitz-ultra-matt" className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/50 transition-colors flex flex-col group">
              <h3 className="font-serif text-gold text-lg mb-2">Royale Glitz</h3>
              <p className="text-ivory/70 text-sm mb-4 flex-grow">Ultra matt luxury interior emulsion with crack-free performance. Perfect for achieving a rich look with {shade.name}.</p>
              <div className="text-xs font-semibold text-ivory uppercase tracking-wider group-hover:text-gold transition-colors">View Product &rarr;</div>
            </Link>
            <Link to="/p/easy-clean-silky-touch" className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/50 transition-colors flex flex-col group">
              <h3 className="font-serif text-gold text-lg mb-2">Easy Clean</h3>
              <p className="text-ivory/70 text-sm mb-4 flex-grow">Washable interior paint that keeps {shade.name} looking fresh and bright for years.</p>
              <div className="text-xs font-semibold text-ivory uppercase tracking-wider group-hover:text-gold transition-colors">View Product &rarr;</div>
            </Link>
            <Link to="/p/apex-ultima" className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/50 transition-colors flex flex-col group">
              <h3 className="font-serif text-gold text-lg mb-2">Apex Ultima</h3>
              <p className="text-ivory/70 text-sm mb-4 flex-grow">High-performance exterior emulsion to protect {shade.name} from harsh weather and UV fading.</p>
              <div className="text-xs font-semibold text-ivory uppercase tracking-wider group-hover:text-gold transition-colors">View Product &rarr;</div>
            </Link>
          </div>
        </div>`;

const recReplacement = `{/* Recommended Products */}
        <div className="mt-16 pt-16 border-t border-royale-accent">
          <h2 className="text-2xl font-display font-medium text-ivory mb-8">
            Recommended Products for <span className="text-gradient italic">{shade.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommended.map((prod, i) => (
              <Link key={i} to={prod.link} className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/50 transition-colors flex flex-col group">
                <h3 className="font-serif text-gold text-lg mb-2">{prod.name}</h3>
                <p className="text-ivory/70 text-sm mb-4 flex-grow">{prod.desc}</p>
                <div className="text-xs font-semibold text-ivory uppercase tracking-wider group-hover:text-gold transition-colors">View Product &rarr;</div>
              </Link>
            ))}
          </div>
        </div>`;
        
content = content.replace(recTarget, recReplacement);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Made images and recommendations dynamic");
