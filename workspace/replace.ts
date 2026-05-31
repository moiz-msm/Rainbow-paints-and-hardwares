import fs from 'fs';

function replaceInFile(filePath: string, replacements: [RegExp | string, string][]) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [searchValue, replaceValue] of replacements) {
        content = content.replaceAll(searchValue, replaceValue);
    }
    fs.writeFileSync(filePath, content);
}

replaceInFile('src/data.ts', [
    [/"Decorative"/g, '"Home Paint"'],
    [/Decorative:/g, '"Home Paint":'],
    [/"All Decorative"/g, '"All Home Paint"']
]);

replaceInFile('src/components/ProductsAndIndustrial.tsx', [
    [/'Decorative'/g, "'Home Paint'"]
]);

replaceInFile('src/components/Hero.tsx', [
    [/>Decorative</g, ">Home Paint<"]
]);

replaceInFile('src/components/ProductSearchInput.tsx', [
    [/\.Decorative/g, '["Home Paint"]']
]);

replaceInFile('src/components/ProductsSection.tsx', [
    [/"All Decorative"/g, '"All Home Paint"'],
    [/"Decorative"/g, '"Home Paint"'],
    [/\.Decorative/g, '["Home Paint"]'],
    [/>Decorative</g, ">Home Paint<"]
]);
