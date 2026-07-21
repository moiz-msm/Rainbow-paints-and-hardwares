const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

// Replace FAQ Schema
const oldFaqSchemaStart = content.indexOf('  const faqSchema = useMemo(() => {');
const oldFaqSchemaEnd = content.indexOf('  const breadcrumbSchema = useMemo(() => {');
if (oldFaqSchemaStart !== -1 && oldFaqSchemaEnd !== -1) {
    const newFaqSchema = `  const faqSchema = useMemo(() => {
    if (!shade) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": \`What color is \${shade.name} (\${shade.shadeCode}) by \${shade.brand}?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`\${shade.name} (\${shade.shadeCode}) is a beautiful \${shade.family} color by \${shade.brand}. The HEX color code is \${shade.hex}, and its RGB value is RGB(\${shade.rgb}).\`
          }
        },
        {
          "@type": "Question",
          "name": \`Which room walls are best suited for \${shade.name} paint?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`Light warm shades like \${shade.name} make social spaces feel welcoming. It is highly recommended for living rooms, puja rooms, and hallways, but also works nicely as a calming backdrop in bedrooms.\`
          }
        },
        {
          "@type": "Question",
          "name": \`Which paint finishes are available for \${shade.name}?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`\${shade.name} is recommended for a \${shade.finish} finish, and is available in multiple interior and exterior emulsions (like Royale, Easy Clean, and Apex). Coverage usually ranges from 120-140 sq.ft/liter for two coats.\`
          }
        },
        {
          "@type": "Question",
          "name": \`Which colour shades pair well with \${shade.name}?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`\${shade.name} pairs beautifully with crisp whites, contrasting soft neutrals, and wooden or brass accents. You can try our Color Visualizer to see combinations.\`
          }
        }
      ]
    };
  }, [shade]);

`;
    content = content.substring(0, oldFaqSchemaStart) + newFaqSchema + content.substring(oldFaqSchemaEnd);
}

// Replace FAQ UI
const oldFaqUIStart = content.indexOf('{/* Color FAQs for AEO */}');
const oldFaqUIEnd = content.indexOf('{/* Similar Shades */}');
if (oldFaqUIStart !== -1 && oldFaqUIEnd !== -1) {
    const newFaqUI = `{/* Color FAQs for AEO */}
        <div className="mt-16 pt-16 border-t border-royale-accent">
          <h2 className="text-2xl font-display font-medium text-ivory mb-8">
            Frequently Asked Questions about <span className="text-gradient italic">{shade.name}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">What color is {shade.name} ({shade.shadeCode}) by {shade.brand}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {shade.name} ({shade.shadeCode}) is a beautiful {shade.family} color by {shade.brand}. The HEX color code is {shade.hex}, and its RGB value is RGB({shade.rgb}).
              </p>
            </div>
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">Which room walls are best suited for {shade.name} paint?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                Light warm shades like {shade.name} make social spaces feel welcoming. It is highly recommended for living rooms, puja rooms, and hallways, but also works nicely as a calming backdrop in bedrooms.
              </p>
            </div>
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">Which paint finishes are available for {shade.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {shade.name} is recommended for a {shade.finish} finish, and is available in multiple interior and exterior emulsions (like Royale, Easy Clean, and Apex). Coverage usually ranges from 120-140 sq.ft/liter for two coats.
              </p>
            </div>
            <div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">Which colour shades pair well with {shade.name}?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {shade.name} pairs beautifully with crisp whites, contrasting soft neutrals, and wooden or brass accents. You can try our Color Visualizer to see combinations.
              </p>
            </div>
          </div>
        </div>

        `;
    content = content.substring(0, oldFaqUIStart) + newFaqUI + content.substring(oldFaqUIEnd);
}

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Updated FAQs");
