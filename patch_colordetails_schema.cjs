const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const target = `  const breadcrumbSchema = useMemo(() => {`;

const newSchema = `  const faqSchema = useMemo(() => {
    if (!shade) return null;
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": \`What is the shade code for \${shade.name}?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`The shade code for \${shade.name} by \${shade.brand} is \${shade.shadeCode}. You can use this code to order the exact color for interior or exterior wall paints.\`
          }
        },
        {
          "@type": "Question",
          "name": \`What is the HEX code for \${shade.name}?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`The HEX color code for \${shade.name} is \${shade.hex}, and its RGB value is RGB(\${shade.rgb}). This is useful for matching colors in digital designs or interior planning software.\`
          }
        },
        {
          "@type": "Question",
          "name": \`Where can I buy \${shade.brand} \${shade.name} paint?\`,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": \`You can buy \${shade.brand} paint in the shade \${shade.name} (\${shade.shadeCode}) online or in-store at Rainbow Paints & Hardwares in Coimbatore. We use precision tinting machines to ensure exact color matching.\`
          }
        }
      ]
    };
  }, [shade]);

  const breadcrumbSchema = useMemo(() => {`;

content = content.replace(target, newSchema);

// add faqSchema to SEO
const seoTarget = `        schema={[productSchema, breadcrumbSchema].filter(Boolean)}`;
const seoReplacement = `        schema={[productSchema, breadcrumbSchema, faqSchema].filter(Boolean)}`;

content = content.replace(seoTarget, seoReplacement);
content = content.replace(`schema={[productSchema, breadcrumbSchema].filter(Boolean)}`, `schema={[productSchema, breadcrumbSchema, faqSchema].filter(Boolean)}`);
content = content.replace(/schema=\{\[productSchema, breadcrumbSchema\]\.filter\(Boolean\)\}/, `schema={[productSchema, breadcrumbSchema, faqSchema].filter(Boolean)}`);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Updated Schema");
