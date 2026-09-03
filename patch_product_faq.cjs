const fs = require('fs');
let content = fs.readFileSync('src/pages/ProductDetailPage.tsx', 'utf-8');

const target1 = `            <div className="bg-royale-surface border border-zinc-200/50 rounded-2xl p-6 hover:border-gold/30 transition-colors md:col-span-2">
              <h3 className="font-medium text-ivory mb-3 text-sm">What category does {product.name} fall under and what is its coverage?</h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {product.name} by {product.brand} belongs to the {product.subCategory || product.category} category. It offers an estimated coverage capacity of {productDetails?.coverage} with a {productDetails?.finish} and a touch-dry time of {productDetails?.dryingTime}.
              </p>
            </div>`;

const replacement1 = `            <div className="bg-royale-surface border border-zinc-200/50 rounded-2xl p-6 hover:border-gold/30 transition-colors md:col-span-2">
              <h3 className="font-medium text-ivory mb-3 text-sm">
                {product.topCategory?.toLowerCase().includes('power tools') 
                  ? \`What category does \${product.name} fall under and what is it used for?\` 
                  : \`What category does \${product.name} fall under and what is its coverage?\`}
              </h3>
              <p className="text-ivory/70 text-xs leading-relaxed font-light">
                {product.topCategory?.toLowerCase().includes('power tools')
                  ? \`\${product.name} by \${product.brand} belongs to the \${product.subCategory || product.category} category. It is a high-performance professional equipment designed to improve efficiency, accuracy, and quality for your tasks.\`
                  : \`\${product.name} by \${product.brand} belongs to the \${product.subCategory || product.category} category. It offers an estimated coverage capacity of \${productDetails?.coverage} with a \${productDetails?.finish} and a touch-dry time of \${productDetails?.dryingTime}.\`
                }
              </p>
            </div>`;

content = content.replace(target1, replacement1);

// Also fix the local availability text above:
const target2 = `Offers an estimated coverage of <strong className="text-zinc-900 font-semibold">{productDetails.coverage}</strong> with <strong className="text-zinc-900 font-semibold">{productDetails.dryingTime}</strong> touch-dry time.`;
const replacement2 = `{product.topCategory?.toLowerCase().includes('power tools') ? \`A professional grade tool with a \${productDetails.warranty}.\` : \`Offers an estimated coverage of <strong className="text-zinc-900 font-semibold">{productDetails.coverage}</strong> with <strong className="text-zinc-900 font-semibold">{productDetails.dryingTime}</strong> touch-dry time.\`}`;
content = content.replace(target2, replacement2);

fs.writeFileSync('src/pages/ProductDetailPage.tsx', content);
console.log("Updated FAQ and availability text.");
