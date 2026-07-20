const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const targetBreadcrumbSchema = `  const breadcrumbSchema = useMemo(() => {
    if (!shade) return null;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rainbowpaint.in/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Visualizer",
          item: "https://rainbowpaint.in/visualizer",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: \`\${shade.brand} Colors\`,
          item: \`https://rainbowpaint.in/visualizer?brand=\${shade.brand.toLowerCase()}\`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: \`\${shade.name} \${shade.shadeCode}\`,
          item: \`https://rainbowpaint.in/color/\${shadeSlug}\`,
        },
      ],
    };
  }, [shade, shadeSlug]);`;

const replacementBreadcrumbSchema = `  const breadcrumbSchema = useMemo(() => {
    if (!shade) return null;
    const properUrl = \`https://rainbowpaint.in\${shadeService.getShadeUrl(shade)}\`;
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://rainbowpaint.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Colors",
          item: "https://rainbowpaint.in/visualizer",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: shade.brand,
          item: \`https://rainbowpaint.in/brands/\${shade.brand.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: shade.family || "Colors",
          item: "https://rainbowpaint.in/visualizer", // We don't have a family-specific page yet, so link back to visualizer
        },
        {
          "@type": "ListItem",
          position: 5,
          name: \`\${shade.name} \${shade.shadeCode}\`,
          item: properUrl,
        },
      ],
    };
  }, [shade]);`;

content = content.replace(targetBreadcrumbSchema, replacementBreadcrumbSchema);
fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
