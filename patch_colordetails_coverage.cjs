const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const target = `            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What colors pair well with {shade.name}?</h3>`;

const replacement = `            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What is the coverage and finish of {shade.brand} {shade.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {shade.name} is recommended for a {shade.finish} finish. Coverage depends on the specific product (e.g., Royale or Easy Clean), but typically ranges from 120-140 sq.ft/liter for two coats on smooth interior walls.
              </p>
            </div>
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What colors pair well with {shade.name}?</h3>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Added Coverage FAQ");
