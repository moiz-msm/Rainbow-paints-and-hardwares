const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf8');

const importStatement = `import { FadeInUp } from "../components/FadeInUp";\n`;
if (!content.includes('FadeInUp')) {
  content = content.replace('import { lazyWithRetry as lazy } from "../utils/lazyWithRetry";', 'import { lazyWithRetry as lazy } from "../utils/lazyWithRetry";\n' + importStatement);
}

const oldSections = `<ToolsOverview />
        <ShopByBrand />
        <ShopByCategory />
        <ProductsAndIndustrial />
        <GoogleReviewsSection />
        <BlogSection />
        <IndustryNews />
        <FaqSection showLink={true} limit={4} />
        <ContactSection />`;

const newSections = `<FadeInUp><ToolsOverview /></FadeInUp>
        <FadeInUp><ShopByBrand /></FadeInUp>
        <FadeInUp><ShopByCategory /></FadeInUp>
        <FadeInUp><ProductsAndIndustrial /></FadeInUp>
        <FadeInUp><GoogleReviewsSection /></FadeInUp>
        <FadeInUp><BlogSection /></FadeInUp>
        <FadeInUp><IndustryNews /></FadeInUp>
        <FadeInUp><FaqSection showLink={true} limit={4} /></FadeInUp>
        <FadeInUp><ContactSection /></FadeInUp>`;

content = content.replace(oldSections, newSections);
fs.writeFileSync('src/pages/Home.tsx', content, 'utf8');
console.log("Patched Home.tsx");
