const fs = require('fs');

const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const newProducts = `  {
    "id": 1007,
    "name": "TruCare Interior Wall Primer",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 150.00",
    "properties": [
      "Water Thinnable",
      "Superior Adhesion",
      "Excellent Opacity"
    ],
    "sizes": [1, 4, 10, 20],
    "popular": true,
    "image": "https://5.imimg.com/data5/SELLER/Default/2021/4/IF/MB/BS/107775532/asian-paints-trucare-interior-wall-primer-water-thinnable-500x500.jpg"
  },
  {
    "id": 1008,
    "name": "TruCare Exterior Wall Primer",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 180.00",
    "properties": [
      "Alkali Resistant",
      "Enhances Top Coat Life",
      "Good Hiding"
    ],
    "sizes": [1, 4, 10, 20],
    "popular": true,
    "image": "https://5.imimg.com/data5/SELLER/Default/2020/9/GV/YF/BD/101297534/asian-paints-trucare-interior-wall-primer-water-thinnable-500x500.jpg"
  },
  {
    "id": 1009,
    "name": "Royale Play Stucco",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 450.00",
    "properties": [
      "Marble-like Finish",
      "Highly Durable",
      "Special Effects Paint"
    ],
    "sizes": [1, 5, 20],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/royale-play-stucco-packshot-asian-paints.png"
  },
  {
    "id": 1010,
    "name": "Apex Duracast Rough Tex",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 650.00",
    "properties": [
      "Textured Finish",
      "Hides Surface Undulations",
      "Tough & Durable"
    ],
    "sizes": [5, 20],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-duracast-rough-tex-asian-paints.png"
  },`;

data = data.replace(
  'export const mockProducts = [',
  'export const mockProducts = [\n' + newProducts
);

fs.writeFileSync(filePath, data);
console.log('Products added successfully');
