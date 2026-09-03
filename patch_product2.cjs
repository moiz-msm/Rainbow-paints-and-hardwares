const fs = require('fs');
let content = fs.readFileSync('src/pages/ProductDetailPage.tsx', 'utf-8');

const target1 = `    // 8. Exact Factual Warranty
    let warranty = "100% Genuine Manufacturer Guarantee";
    if (nameLower.includes('royale') || nameLower.includes('aspira') || nameLower.includes('glitz') || nameLower.includes('lustre') || nameLower.includes('shyne')) {`;
const replacement1 = `    // 8. Exact Factual Warranty
    let warranty = "100% Genuine Manufacturer Guarantee";
    if (isPowerTool) {
      warranty = "6 Months to 1 Year Manufacturer Warranty";
    } else if (nameLower.includes('royale') || nameLower.includes('aspira') || nameLower.includes('glitz') || nameLower.includes('lustre') || nameLower.includes('shyne')) {`;

content = content.replace(target1, replacement1);

const target2 = `    let desc1 = "";
    let desc2 = "";
    if (nameLower.includes('shyne')) {`;
const replacement2 = `    let desc1 = "";
    let desc2 = "";
    if (isPowerTool) {
      desc1 = \`\${product.name} by \${product.brand} is a high-performance professional tool designed to improve efficiency, accuracy, and quality for your painting and surface preparation tasks.\`;
      desc2 = \`Features professional grade build quality. Backed by \${warranty} with immediate availability through authorized distributor Rainbow Paints & Hardwares in Coimbatore.\`;
    } else if (nameLower.includes('shyne')) {`;

content = content.replace(target2, replacement2);

fs.writeFileSync('src/pages/ProductDetailPage.tsx', content);
console.log("Updated product descriptions logic.");
