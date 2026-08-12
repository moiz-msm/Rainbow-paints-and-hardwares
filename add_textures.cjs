const fs = require('fs');
const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const newProducts = `  {
    "id": 1016,
    "name": "Apex Duracast Swirl Tex",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 850.00",
    "properties": [
      "Premium Textured Finish",
      "Style and Strength",
      "Exterior Texture"
    ],
    "sizes": [5, 20],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex_Duracast_Swirltex.png"
  },
  {
    "id": 1017,
    "name": "Apex Duracast Cross Tex",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 900.00",
    "properties": [
      "Silica-based Acrylic Texture",
      "Striking Trowel-based Patterns",
      "High-performance"
    ],
    "sizes": [5, 20],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex_Duracast_Crosstex.png"
  },
  {
    "id": 1018,
    "name": "Apex Duracast Dholpur Tex",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 880.00",
    "properties": [
      "Intermediate Finish",
      "Protection and Décor",
      "Premium Texture"
    ],
    "sizes": [5, 20],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex_Duracast_Dholpurtex.png"
  },
  {
    "id": 1019,
    "name": "Apex Duracast Fine Tex",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 820.00",
    "properties": [
      "Modified Acrylic Texture",
      "Subtle Yet Distinctive Look",
      "Water-based Finish"
    ],
    "sizes": [5, 20],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex_Duracast_Finetex.png"
  },`;

data = data.replace(
  'export const mockProducts = [',
  'export const mockProducts = [\n' + newProducts
);

fs.writeFileSync(filePath, data);
console.log('Textures added successfully');
