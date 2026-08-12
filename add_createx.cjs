const fs = require('fs');
const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const newProducts = `  {
    "id": 1020,
    "name": "Apex Createx Scratch Finish",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 600.00",
    "properties": [
      "Scratch Finish Texture",
      "Superior Adhesion",
      "Exterior Textures"
    ],
    "sizes": [25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex-Createx-Sack.png"
  },
  {
    "id": 1021,
    "name": "Apex Createx Roller Finish",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 580.00",
    "properties": [
      "Roller Finish Texture",
      "Superior Adhesion",
      "Exterior Textures"
    ],
    "sizes": [25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex-Createx-Sack.png"
  },
  {
    "id": 1022,
    "name": "Apex Createx Dholpur",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 620.00",
    "properties": [
      "Premium Intermediate Finish",
      "Enduring Durability",
      "Exterior Décor and Protection"
    ],
    "sizes": [25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex-Createx-Sack.png"
  },`;

data = data.replace(
  'export const mockProducts = [',
  'export const mockProducts = [\n' + newProducts
);

fs.writeFileSync(filePath, data);
console.log('Createx added successfully');
