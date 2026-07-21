const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const target = `        {
          "@type": "Question",
          "name": \`Where can I buy \${shade.brand} \${shade.name} paint?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`You can buy \${shade.brand} paint in the shade \${shade.name} (\${shade.shadeCode}) online or in-store at Rainbow Paints & Hardwares in Coimbatore. We use precision tinting machines to ensure exact color matching.\`
          }
        }`;

const replacement = `        {
          "@type": "Question",
          "name": \`Where can I buy \${shade.brand} \${shade.name} paint?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`You can buy \${shade.brand} paint in the shade \${shade.name} (\${shade.shadeCode}) online or in-store at Rainbow Paints & Hardwares in Coimbatore. We use precision tinting machines to ensure exact color matching.\`
          }
        },
        {
          "@type": "Question",
          "name": \`What is the coverage and finish of \${shade.brand} \${shade.name}?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`\${shade.name} is recommended for a \${shade.finish} finish. Coverage depends on the specific product (e.g., Royale or Easy Clean), but typically ranges from 120-140 sq.ft/liter for two coats on smooth interior walls.\`
          }
        },
        {
          "@type": "Question",
          "name": \`What colors pair well with \${shade.name}?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`\${shade.name} pairs beautifully with soft neutrals, crisp whites, and contrasting accents from the \${shade.brand} color palette. For the best combinations, try testing with our Color Visualizer tool.\`
          }
        }`;

content = content.replace(target, replacement);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Updated FAQ Schema");
