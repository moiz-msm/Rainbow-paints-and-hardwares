const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const target = `            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-serif text-ivory mb-4 border-b border-royale-accent pb-4">
                Color Details
              </h2>`;

const replacement = `            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 mb-8">
              <p className="text-ivory/80 text-sm leading-relaxed mb-6 font-light">
                {shade.name} ({shade.shadeCode}) is a gentle, low-depth shade with a warm character. It works as a quiet backdrop in most rooms and pairs easily with wooden furniture and metallic accents. One of the most loved shades in the {shade.brand} palette, this color helps you create a cohesive and welcoming atmosphere.
              </p>
              <h2 className="text-xl font-serif text-ivory mb-4 border-b border-royale-accent pb-4">
                Color Details
              </h2>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Added Why Choose section");
