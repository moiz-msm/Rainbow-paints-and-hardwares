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
            console.log(`Updated keywords in ${filePath}`);
        }
    }
}

const files = [
    'src/pages/InteriorPaintingPage.tsx',
    'src/pages/ExteriorPaintingPage.tsx',
    'src/pages/PaintingServiceSEOPage.tsx',
    'src/components/PaintingServicesOverview.tsx',
    'src/components/Navigation.tsx',
    'src/components/Footer.tsx'
];

const replacements = [
    ['Interior Painting', 'Interior Wall Painting'],
    ['interior painting', 'interior wall painting'],
    ['Exterior Painting', 'Exterior Wall Painting'],
    ['exterior painting', 'exterior wall painting'],
    ['Professional Painting Services', 'Professional Home Painting Services'],
    ['House Painting Services', 'Home Painting Services']
];

files.forEach(file => replaceInFile(path.join(process.cwd(), file), replacements));
