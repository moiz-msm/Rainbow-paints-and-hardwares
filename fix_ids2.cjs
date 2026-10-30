const fs = require('fs');

let pageContent = fs.readFileSync('src/pages/ProductDetailPage.tsx', 'utf-8');
pageContent = pageContent.replace(
  /"sku": \`RP-PG-\$\{targetProduct\.id \|\| '1'\}_rp-\$\{targetProduct\.id \|\| '1'\}-\$\{String\(sizeVal\)\.toLowerCase\(\)\}\$\{unitSymbol\.toLowerCase\(\)\}\`/g,
  `"sku": \`RP-PG-\${targetProduct.id || targetProduct.slug || targetProduct.name.replace(/\\s+/g, '-').toLowerCase()}_rp-\${targetProduct.id || targetProduct.slug || targetProduct.name.replace(/\\s+/g, '-').toLowerCase()}-\${String(sizeVal).toLowerCase()}\${unitSymbol.toLowerCase()}\``
);
pageContent = pageContent.replace(
  /"mpn": \`MPN-\$\{targetProduct\.id \|\| '1'\}-\$\{sizeVal\}\$\{unitSymbol\}\`/g,
  `"mpn": \`MPN-\${targetProduct.id || targetProduct.slug || targetProduct.name.replace(/\\s+/g, '-').toLowerCase()}-\${sizeVal}\${unitSymbol}\``
);
fs.writeFileSync('src/pages/ProductDetailPage.tsx', pageContent);

console.log("Fixed files!");
