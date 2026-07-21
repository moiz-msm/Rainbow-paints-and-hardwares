const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const dynamicFaqLogic = `
  const getFaqAnswers = (shade) => {
    if (!shade) return { q2: "", q3: "", q4: "" };
    
    const hex = shade.hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const isLight = brightness > 150;
    
    let rooms = isLight 
      ? "It is highly recommended for living rooms, puja rooms, and hallways as it reflects light beautifully, but also works nicely as a calming backdrop in bedrooms."
      : "Darker shades like this add depth and drama. It is highly recommended for bedrooms, home theaters, accent walls, or dining rooms to create an intimate atmosphere.";
      
    let pairings = isLight
      ? "crisp whites, contrasting dark tones, and natural wood or brass accents"
      : "soft whites, warm metallics like gold or copper, and light oak or ash wood";

    let family = (shade.family || "").toLowerCase();
    if (family.includes("blue") || family.includes("green")) {
      pairings = "warm neutrals, natural timber, and metallic accents";
    } else if (family.includes("red") || family.includes("yellow") || family.includes("orange")) {
      pairings = "cool greys, crisp whites, and muted earth tones";
    }

    return {
      q2: \`\${isLight ? 'Light' : 'Deep'} shades like \${shade.name} make spaces feel \${isLight ? 'welcoming and spacious' : 'cozy and sophisticated'}. \${rooms}\`,
      q4: \`\${shade.name} pairs beautifully with \${pairings}. You can try our Color Visualizer to see combinations.\`
    };
  };
`;

const insertTarget = `const { living, bedroom } = shade ? getStableImages(shade.name + shade.shadeCode) : { living: "", bedroom: "" };`;

content = content.replace(insertTarget, dynamicFaqLogic + '\n  ' + insertTarget);

const destTargetFaqSchema = `  const faqSchema = useMemo(() => {
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
  }, [shade]);`;

const replacementFaqSchema = `  const faqSchema = useMemo(() => {
    if (!shade) return null;
    const ans = getFaqAnswers(shade);
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
            "text": ans.q2
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
            "text": ans.q4
          }
        }
      ]
    };
  }, [shade]);`;

content = content.replace(destTargetFaqSchema, replacementFaqSchema);

// Need to inject ans variable in the component
const compStartTarget = `const { living, bedroom } = shade ? getStableImages(shade.name + shade.shadeCode) : { living: "", bedroom: "" };`;
content = content.replace(compStartTarget, compStartTarget + '\\n  const faqAns = getFaqAnswers(shade);');

const uiTargetFAQ = `<div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
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
            </div>`;

const uiReplacementFAQ = `<div className="bg-royale-surface border border-royale-accent rounded-2xl p-6 hover:border-gold/30 transition-colors">
              <h3 className="font-medium text-ivory mb-3 text-sm">Which room walls are best suited for {shade.name} paint?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {faqAns.q2}
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
                {faqAns.q4}
              </p>
            </div>`;

content = content.replace(uiTargetFAQ, uiReplacementFAQ);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Updated FAQs dynamically");
