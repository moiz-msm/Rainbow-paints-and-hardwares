const fs = require('fs');
console.log('mascot.png:', fs.statSync('public/mascot.png').size);
console.log('hero-bg.webp:', fs.statSync('public/hero-bg.webp').size);
console.log('store-front.webp:', fs.statSync('public/store-front.webp').size);
