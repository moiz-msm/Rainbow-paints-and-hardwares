const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

// Insert Room Inspiration and Recommendations before the FAQ section
const target = `        {/* Color FAQs for AEO */}`;

const newSections = `
        {/* Room Inspiration */}
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
              <img src="https://images.unsplash.com/photo-1556020685-e631998f5c5f?auto=format&fit=crop&q=80" alt={\`Bedroom painted in \${shade.name}\`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-60 mix-blend-multiply transition-opacity duration-500" style={{ backgroundColor: shade.hex }}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white font-serif text-xl mb-1">Bedroom</h3>
                <p className="text-white/80 text-sm font-light">Create a calming atmosphere using {shade.name} on your bedroom walls.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
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
        </div>

        {/* Color FAQs for AEO */}`;

content = content.replace(target, newSections);

// Also add more FAQs
const faqTarget = `            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors md:col-span-2">
              <h3 className="font-medium text-ivory mb-3 text-sm">Where can I buy {shade.brand} {shade.name} paint?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                You can buy {shade.brand} paint in the shade {shade.name} ({shade.shadeCode}) online or in-store at Rainbow Paints & Hardwares in Coimbatore. We use precision tinting machines to ensure exact color matching.
              </p>
            </div>`;

const newFaqs = `            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">Where can I buy {shade.brand} {shade.name} paint?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                You can buy {shade.brand} paint in the shade {shade.name} ({shade.shadeCode}) online or in-store at Rainbow Paints & Hardwares in Coimbatore. We use precision tinting machines to ensure exact color matching.
              </p>
            </div>
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What colors pair well with {shade.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {shade.name} pairs beautifully with soft neutrals, crisp whites, and contrasting accents from the {shade.brand} color palette. For the best combinations, try testing with our Color Visualizer tool.
              </p>
            </div>`;

content = content.replace(faqTarget, newFaqs);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Updated ColorDetailsPage sections");
