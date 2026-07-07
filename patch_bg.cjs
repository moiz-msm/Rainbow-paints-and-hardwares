const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

// Replace SCREEN 1 container
content = content.replace(
  '<div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 bg-royale-bg pb-12 pt-[80px]">',
  `<div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 pb-12 pt-[80px]">
          <div className="absolute inset-0 w-full h-full">
            <img src="/hero-bg.webp" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover object-[center_right]" />
            <div className="absolute inset-0 bg-gradient-to-r from-royale-bg via-royale-bg/80 to-transparent" />
          </div>`
);

// Remove the Right Image/Card
const rightCardRegex = /\{\/\* Right Image\/Card \(Hidden on small mobile\) \*\/\}[\s\S]*?<\/motion\.div>/;
content = content.replace(rightCardRegex, '');

fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
