const fs = require('fs');
let content = fs.readFileSync('src/data.ts', 'utf-8');

const replacements = [
  { old: 'https://m.media-amazon.com/images/I/612Kk5HRmxL.jpg', new: 'https://m.media-amazon.com/images/I/51VlVdMKOIL.jpg' },
  { old: 'https://m.media-amazon.com/images/I/61AHIISxIBL.jpg', new: 'https://5.imimg.com/data5/SELLER/Default/2023/12/365465108/MQ/JF/DU/75336779/tes-dig-55187904-3-1000x1000.jpg' },
  { old: 'https://m.media-amazon.com/images/I/81ukmBfuS9L.jpg', new: 'https://img2.exportersindia.com/product_images/bc-full/2025/12/14964474/berger-express-painting-sanding-machine-1765169953-8472212.jpeg' },
  { old: 'https://m.media-amazon.com/images/I/51p4-23FtvL.jpg', new: 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/9d2e5bcf-9ee9-473e-986e-59662c46f886.__CR0,0,300,300_PT0_SX300_V1___.png' },
  { old: 'https://m.media-amazon.com/images/I/51EbADbkQ3L.jpg', new: 'https://5.imimg.com/data5/ANDROID/Default/2022/9/ZM/UO/LI/2303315/product-jpeg-1000x1000.jpg' },
  { old: 'https://m.media-amazon.com/images/I/71FjZ+ZJh9L.jpg', new: 'https://5.imimg.com/data5/SELLER/Default/2023/11/361878963/ZD/KZ/EA/127283796/berger-multipurpose-mixture-machine-500x500.jpg' },
  { old: 'https://m.media-amazon.com/images/I/615RvTBQZjL.jpg', new: 'https://5.imimg.com/data5/SELLER/Default/2023/11/361872309/JR/UL/VP/127283796/berger-high-pressure-washer-1000x1000.jpg' }
];

let updated = 0;
for (const rep of replacements) {
  if (content.includes(rep.old)) {
    content = content.replace(rep.old, rep.new);
    updated++;
  } else {
    console.log("Could not find:", rep.old);
  }
}

fs.writeFileSync('src/data.ts', content);
console.log("Updated", updated, "images in data.ts");
