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
    [/bg-ivory/g, 'bg-white'],
    [/border-ivory/g, 'border-white'],
    [/shadow-ivory/g, 'shadow-white']
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
