import fs from 'fs';

function replaceInFile(filePath: string, replacements: [RegExp | string, string][]) {
    if (!fs.existsSync(filePath)) {
        console.error("Not found: " + filePath);
        return;
    }
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [searchValue, replaceValue] of replacements) {
        content = content.replaceAll(searchValue, replaceValue);
    }
    fs.writeFileSync(filePath, content);
}

const replacements: [RegExp|string, string][] = [
    [/bg-white\/5/g, 'bg-black/5'],
    [/bg-white\/10/g, 'bg-black/10'],
    [/bg-white\/20/g, 'bg-black/20'],
    [/bg-white\/30/g, 'bg-black/30'],
    [/border-white\/5/g, 'border-black/5'],
    [/border-white\/10/g, 'border-black/10'],
    [/border-white\/20/g, 'border-black/20'],
    [/border-white\/30/g, 'border-black/30'],
    [/text-white\/40/g, 'text-zinc-500'],
    [/text-white\/60/g, 'text-zinc-600'],
    [/text-white\/70/g, 'text-zinc-700'],
    [/text-white\/30/g, 'text-zinc-400'],
    [/text-white\/20/g, 'text-zinc-300'],
    [/text-white\/50/g, 'text-zinc-500'],
    [/text-white\/80/g, 'text-zinc-800'],
    [/hover:text-white/g, 'hover:text-ivory'],
    [/hover:bg-white/g, 'hover:bg-zinc-100'],
    [/shadow-white/g, 'shadow-black/10']
];

replaceInFile('src/components/Hero.tsx', replacements);
replaceInFile('src/components/ProductsAndIndustrial.tsx', replacements);
replaceInFile('src/components/ProductsSection.tsx', replacements);
replaceInFile('src/components/Footer.tsx', replacements);
replaceInFile('src/components/Header.tsx', replacements);
replaceInFile('src/components/CalculatorSection.tsx', replacements);
replaceInFile('src/components/BrandsDealIn.tsx', replacements);
replaceInFile('src/pages/Home.tsx', replacements);
replaceInFile('src/components/ProductAssistant.tsx', replacements);
replaceInFile('src/components/ProductSearchInput.tsx', replacements);
replaceInFile('src/components/OfferPopup.tsx', replacements);

// Specific fix for ProductsSection product card
let content = fs.readFileSync('src/components/ProductsSection.tsx', 'utf8');
content = content.replace(/border border-white\/10 shadow-\[0_4px_20px_rgb\(0,0,0,0.03\)\]/g, 'border border-black/10 shadow-[0_4px_20px_rgb(0,0,0,0.05)]');
fs.writeFileSync('src/components/ProductsSection.tsx', content);

// And we know there might be 'bg-[family-name:--color-royale-bg] text-[family-name:--color-ivory]' in index.css
