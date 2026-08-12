const fs = require('fs');
const filePath = 'src/data.ts';
let data = fs.readFileSync(filePath, 'utf8');

const newProducts = `  {
    "id": 1011,
    "name": "Royale Play Safari",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 550.00",
    "properties": [
      "Special Effects Paint",
      "Metallic & Non-Metallic Tones",
      "Desert Safari Inspired Finish"
    ],
    "sizes": [1, 4],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/royale-play-safari-packshot-asian-paints.png"
  },
  {
    "id": 1012,
    "name": "Apex Duracast Pebble Tex",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 720.00",
    "properties": [
      "Textured Exterior Finish",
      "Excellent Weather Resistance",
      "Hides Hairline Cracks"
    ],
    "sizes": [5, 20],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-duracast-pebble-tex-asian-paints.png"
  },
  {
    "id": 1013,
    "name": "TruCare Interior Wall Primer (Solvent Thinnable)",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 210.00",
    "properties": [
      "Solvent Based",
      "Ideal for Sealing Porous Surfaces",
      "Superior Adhesion"
    ],
    "sizes": [1, 4, 10, 20],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2021/4/IF/MB/BS/107775532/asian-paints-trucare-interior-wall-primer-water-thinnable-500x500.jpg"
  },
  {
    "id": 1014,
    "name": "SmartCare Damp Sheath Exterior",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 280.00",
    "properties": [
      "Waterproofing Basecoat",
      "Resists up to 3 bars of negative water pressure",
      "Fills fine cracks"
    ],
    "sizes": [1, 4, 10, 20],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/waterproofing-damp-sheath-exterior-asian-paints.png"
  },
  {
    "id": 1015,
    "name": "Asian Paints Wall Putty",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 55.00",
    "properties": [
      "White Cement Based",
      "Smooth Finish",
      "Excellent Adhesion"
    ],
    "sizes": [1, 5, 20, 40],
    "unit": "kg",
    "popular": true,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/7/322896503/AZ/WH/ZJ/142360528/asian-paints-trucare-wall-putty-500x500.webp"
  },`;

data = data.replace(
  'export const mockProducts = [',
  'export const mockProducts = [\n' + newProducts
);

fs.writeFileSync(filePath, data);
console.log('More products added successfully');
