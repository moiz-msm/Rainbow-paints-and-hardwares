const fs = require('fs');

function replaceInFile(file, search, replacement) {
  const content = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, content.replace(new RegExp(search, 'g'), replacement));
}

replaceInFile('src/components/Hero.tsx', 'Hero-bg.png', 'Hero-bg.webp');
replaceInFile('src/components/SEO.tsx', 'Hero-bg.png', 'Hero-bg.webp');
replaceInFile('src/pages/Home.tsx', 'Hero-bg.png', 'Hero-bg.webp');
replaceInFile('index.html', 'hero-bg.webp', 'Hero-bg.webp'); 
// wait, earlier I checked index.html, it had `hero-bg.webp` in og:image, which was lowercase.

replaceInFile('src/components/Header.tsx', 'mascot.png', 'mascot.webp');
replaceInFile('src/components/ContactSection.tsx', 'Store-front.jpg', 'Store-front.webp');
replaceInFile('src/components/ProductAssistant.tsx', 'mascot.png', 'mascot.webp');
replaceInFile('src/pages/AboutPage.tsx', 'Store-front.jpg', 'Store-front.webp');

console.log('Replaced images with webp!');
