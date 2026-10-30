const fs = require('fs');

// Fix generate_seo.ts
let seoContent = fs.readFileSync('generate_seo.ts', 'utf-8');
seoContent = seoContent.replace(
  /\`RP-\$\{p\.id \|\| '1'\}-\$\{String\(sizeVal\)\.toLowerCase\(\)\}\$\{unitSymbol\.toLowerCase\(\)\}\`/g,
  "`RP-${p.id || slug}-${String(sizeVal).toLowerCase()}${unitSymbol.toLowerCase()}`"
);
seoContent = seoContent.replace(
  /<g:item_group_id>\$\{p\.id\}<\/g:item_group_id>/g,
  "<g:item_group_id>${p.id || slug}</g:item_group_id>"
);
fs.writeFileSync('generate_seo.ts', seoContent);

// Fix post_build.ts
let postContent = fs.readFileSync('post_build.ts', 'utf-8');
postContent = postContent.replace(
  /"sku": \`RP-PG-\$\{product\.id \|\| '1'\}_rp-\$\{product\.id \|\| '1'\}-\$\{String\(sizeVal\)\.toLowerCase\(\)\}\$\{unitSymbol\.toLowerCase\(\)\}\`,/g,
  `"sku": \`RP-PG-\${product.id || slug}_rp-\${product.id || slug}-\${String(sizeVal).toLowerCase()}\${unitSymbol.toLowerCase()}\`,`
);
postContent = postContent.replace(
  /"mpn": \`MPN-\$\{product\.id \|\| '1'\}-\$\{sizeVal\}\$\{unitSymbol\}\`,/g,
  `"mpn": \`MPN-\${product.id || slug}-\${sizeVal}\${unitSymbol}\`,`
);
fs.writeFileSync('post_build.ts', postContent);

// Fix ProductDetailPage.tsx
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
