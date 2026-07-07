import fs from 'fs';
let content = fs.readFileSync('src/pages/ProductDetailPage.tsx', 'utf8');

const target = `{product.subCategory && (
                  <span className={\`text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest border transition-colors \${getCategoryBadgeStyle(product.subCategory)}\`} title={product.subCategory}>
                    {product.subCategory}
                  </span>
                )}`;

const replacement = `{((product as any).subCategories || (product.subCategory ? [product.subCategory] : [])).map((sub: string, index: number) => (
                  <span key={index} className={\`text-[8px] md:text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest border transition-colors \${getCategoryBadgeStyle(sub)}\`} title={sub}>
                    {sub}
                  </span>
                ))}`;

if (content.includes(target)) {
  fs.writeFileSync('src/pages/ProductDetailPage.tsx', content.replace(target, replacement), 'utf8');
  console.log("Replaced PDP badge");
} else {
  console.log("Could not find PDP badge string.");
}

