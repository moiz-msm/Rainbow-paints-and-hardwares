import fs from 'fs';

let content = fs.readFileSync('src/components/ProductsSection.tsx', 'utf8');

content = content.replace(/z-\[100\] overflow-hidden flex flex-col"/g, 'z-[100] overflow-hidden flex flex-col max-h-[50vh] sm:max-h-[calc(100vh-220px)]"');
content = content.replace(/\n\s*style={{ maxHeight: 'calc\\(100vh - 220px\\)' }}/g, '');

fs.writeFileSync('src/components/ProductsSection.tsx', content);
