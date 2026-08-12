const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let newContent = content;
        for (const [search, replace] of replacements) {
            newContent = newContent.split(search).join(replace);
        }
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated URLs in ${filePath}`);
        }
    }
}

const files = [
    'src/App.tsx',
    'src/components/PaintingServicesOverview.tsx',
    'src/components/DetailedPaintingPricing.tsx',
    'src/pages/InteriorPaintingPage.tsx',
    'src/pages/ExteriorPaintingPage.tsx',
    'src/pages/WoodPaintingPage.tsx',
    'src/pages/WaterproofingPage.tsx',
    'src/pages/IndustrialFlooringPage.tsx',
    'src/pages/PaintingServiceSEOPage.tsx'
];

const replacements = [
    ['/services/interior-painting', '/services/interior-wall-painting'],
    ['/services/exterior-painting', '/services/exterior-wall-painting']
];

files.forEach(file => replaceInFile(path.join(process.cwd(), file), replacements));
