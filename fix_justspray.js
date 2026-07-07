import fs from 'fs';
let data = fs.readFileSync('src/data.ts', 'utf8');

// Update brand logo
data = data.replace(/"https:\/\/www.justspray.in\/wp-content\/uploads\/2021\/04\/Justspray-Logo-New.png"/g, '"https://justspray.in/wp-content/uploads/2024/10/JustSpray-logo-a.png"');

// Update product images
// 2001
data = data.replace(/"image":\s*"https:\/\/rukminim2.flixcart.com\/image\/[^"]*imahf4szffzye7zh.jpeg\?q=90"/g, '"image": "https://justspray.in/wp-content/uploads/2025/04/1-5-1.png"');

// 2002
data = data.replace(/"image":\s*"https:\/\/tiimg.tistatic.com\/fp\/[^"]*spray-paint-503.jpg"/g, '"image": "https://m.media-amazon.com/images/I/51LQ4cQ3u1L._SL1080_.jpg"');

// 2003
data = data.replace(/"image":\s*"https:\/\/images.unsplash.com\/photo-1534062070383-09756b27e8a9\?auto=format&fit=crop&q=80&w=600"/g, '"image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"');


fs.writeFileSync('src/data.ts', data, 'utf8');
console.log("Updated Just Spray images in data.ts");
