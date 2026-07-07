import fs from 'fs';

let content = fs.readFileSync('src/components/ProductsSection.tsx', 'utf8');

const target = `  const filtered = productList.filter((p) => {
    const matchCat =
      activeCategoryFilter === "All Categories" ||
      (activeCategoryFilter.startsWith("All ") &&
        p.topCategory === activeCategoryFilter.replace("All ", "")) ||
      (p.subCategory &&
        p.subCategory.toLowerCase() === activeCategoryFilter.toLowerCase());

    const matchBrand =
      activeBrand === "All Brands" ||
      p.brand.toLowerCase() === activeBrand.toLowerCase();

    // Check if searchQuery is in product name or properties or subCategory
    const searchLower = searchQuery.toLowerCase();
    const matchSearch =
      searchQuery === "" ||
      (p.name && p.name.toLowerCase().includes(searchLower)) ||
      (p.subCategory && p.subCategory.toLowerCase().includes(searchLower)) ||
      (p.properties &&
        p.properties.some((prop: string) =>
          prop.toLowerCase().includes(searchLower),
        ));

    return matchCat && matchBrand && matchSearch;
  });`;

const replacement = `  const filtered = productList.filter((p) => {
    const pSubs: string[] = (p as any).subCategories || (p.subCategory ? [p.subCategory] : []);
    const matchCat =
      activeCategoryFilter === "All Categories" ||
      (activeCategoryFilter.startsWith("All ") &&
        p.topCategory === activeCategoryFilter.replace("All ", "")) ||
      pSubs.some(sub => sub.toLowerCase() === activeCategoryFilter.toLowerCase());

    const matchBrand =
      activeBrand === "All Brands" ||
      p.brand.toLowerCase() === activeBrand.toLowerCase();

    // Check if searchQuery is in product name or properties or subCategory
    const searchLower = searchQuery.toLowerCase();
    const matchSearch =
      searchQuery === "" ||
      (p.name && p.name.toLowerCase().includes(searchLower)) ||
      pSubs.some(sub => sub.toLowerCase().includes(searchLower)) ||
      (p.properties &&
        p.properties.some((prop: string) =>
          prop.toLowerCase().includes(searchLower),
        ));

    return matchCat && matchBrand && matchSearch;
  });`;

if (content.includes(target)) {
  fs.writeFileSync('src/components/ProductsSection.tsx', content.replace(target, replacement), 'utf8');
  console.log('Fixed');
} else {
  console.log('Not found');
  
  content = content.replace(/const matchCat =[\s\S]*?(?=const matchBrand)/, `const pSubs: string[] = (p as any).subCategories || (p.subCategory ? [p.subCategory] : []);
    const matchCat =
      activeCategoryFilter === "All Categories" ||
      (activeCategoryFilter.startsWith("All ") &&
        p.topCategory === activeCategoryFilter.replace("All ", "")) ||
      pSubs.some(sub => sub.toLowerCase() === activeCategoryFilter.toLowerCase());

    `);
    
  content = content.replace(/const matchSearch =[\s\S]*?(?=return matchCat && matchBrand && matchSearch;)/, `const matchSearch =
      searchQuery === "" ||
      (p.name && p.name.toLowerCase().includes(searchLower)) ||
      pSubs.some(sub => sub.toLowerCase().includes(searchLower)) ||
      (p.properties &&
        p.properties.some((prop: string) =>
          prop.toLowerCase().includes(searchLower),
        ));

    `);
  fs.writeFileSync('src/components/ProductsSection.tsx', content, 'utf8');
  console.log("Fixed via regex");
}
