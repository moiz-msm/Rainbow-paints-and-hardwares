import fs from 'fs';

function replaceInFile(filePath: string, replacements: [RegExp | string, string][]) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [searchValue, replaceValue] of replacements) {
        content = content.replaceAll(searchValue, replaceValue);
    }
    fs.writeFileSync(filePath, content);
}

replaceInFile('src/index.css', [
    ['--color-white: #07146d;', '--color-white: #ffffff;']
]);

const heroReplacements: [RegExp|string, string][] = [
    [/text-white/g, 'text-ivory'],
    [/bg-white/g, 'bg-ivory'],
    [/border-white/g, 'border-ivory'],
    [/shadow-white/g, 'shadow-ivory']
];
replaceInFile('src/components/Hero.tsx', heroReplacements);
replaceInFile('src/components/ProductsAndIndustrial.tsx', heroReplacements);
replaceInFile('src/components/ProductsSection.tsx', heroReplacements);

replaceInFile('src/components/Footer.tsx', heroReplacements);

// Wait, the user wanted the filter background to be white literally.
// In ProductsSection, I changed `bg-white` in the filter bar. If I replace bg-white with bg-ivory, it will become blue again!
// Let's restore bg-white just for that one bar.
let productsContent = fs.readFileSync('src/components/ProductsSection.tsx', 'utf8');
productsContent = productsContent.replace(
    /className="sticky top-\[68px\] sm:top-\[88px\] lg:top-\[100px\] z-\[70\] bg-ivory/,
    'className="sticky top-[68px] sm:top-[88px] lg:top-[100px] z-[70] bg-white'
);
fs.writeFileSync('src/components/ProductsSection.tsx', productsContent);
