const fs = require('fs');
let content = fs.readFileSync('src/pages/ProductDetailPage.tsx', 'utf-8');

// Update title and description logic
const metaDescTarget = `  const metaDesc = useMemo(() => {
    let base = productDetails?.desc1 || \`Buy \${product?.name} online at wholesale prices.\`;
    if (base.length > 80) base = base.substring(0, 80) + '...';
    return \`\${base} Authorized \${product?.brand} dealer in Coimbatore offering fast local delivery for \${product?.category}.\`;
  }, [productDetails, product]);`;

const metaDescReplacement = `  const metaDesc = useMemo(() => {
    return \`Buy \${product?.name} by \${product?.brand} online at wholesale prices. \${product?.category} with fast local delivery in Coimbatore.\`;
  }, [product]);`;

content = content.replace(metaDescTarget, metaDescReplacement);

// Update SEO component title
const seoTitleTarget = `title={\`\${product.name} - Buy \${product.brand} Paints Online\`}`;
const seoTitleReplacement = `title={\`\${product.name} by \${product.brand} - Buy Online | Wholesale Price\`}`;

content = content.replace(seoTitleTarget, seoTitleReplacement);

fs.writeFileSync('src/pages/ProductDetailPage.tsx', content);
console.log("Replaced Product SEO");
