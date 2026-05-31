import fs from 'fs';

function replaceInFile(filePath: string, replacements: [RegExp | string, string][]) {
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [searchValue, replaceValue] of replacements) {
        content = content.replaceAll(searchValue, replaceValue);
    }
    fs.writeFileSync(filePath, content);
}

replaceInFile('src/components/ProductsSection.tsx', [
    [/bg-white\/95/g, 'bg-[#ffffff]/95']
]);
