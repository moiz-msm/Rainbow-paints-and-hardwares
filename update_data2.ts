import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf-8');

const newProducts = `
  {
    "id": 9005,
    "name": "Fevicol Hi Per",
    "description": "Fevicol Hi Per is a high performance, waterproof synthetic resin adhesive with advanced Anti-Bubble Technology. Ideal for premium woodworking and boiling water resistance.",
    "brand": "Fevicol",
    "topCategory": "Adhesives",
    "subCategory": "Wood Adhesives",
    "price": "₹ 420.00",
    "properties": [
      "Advanced Anti-Bubble Technology",
      "Superior Waterproofing (BWR grade)",
      "High grab and fast setting",
      "Premium woodworking"
    ],
    "sizes": [1, 2, 5, 10, 20, 50],
    "unit": "kg",
    "popular": true,
    "image": "https://m.media-amazon.com/images/I/51MP76opUDL.jpg"
  },
  {
    "id": 9006,
    "name": "Fevicol Probond",
    "description": "Fevicol Probond is a specialized adhesive designed for bonding PVC and acrylic laminates to wood and plywood. Ensures zero bubbling and strong permanent bonds for difficult surfaces.",
    "brand": "Fevicol",
    "topCategory": "Adhesives",
    "subCategory": "Wood Adhesives",
    "price": "₹ 350.00",
    "properties": [
      "Bonds PVC/Acrylic to wood",
      "Zero bubbling guaranteed",
      "No clamping required",
      "High temperature resistance"
    ],
    "sizes": [1, 2, 5, 10, 20],
    "unit": "kg",
    "popular": false,
    "image": "https://m.media-amazon.com/images/I/51MY-e7aD1L.jpg"
  },
  {
    "id": 9007,
    "name": "Fevicol Speedx",
    "description": "Fevicol Speedx is a fast-setting synthetic resin adhesive for rapid woodworking. It grips fast and reduces clamping time, making it ideal for quick furniture manufacturing.",
    "brand": "Fevicol",
    "topCategory": "Adhesives",
    "subCategory": "Wood Adhesives",
    "price": "₹ 320.00",
    "properties": [
      "Fast setting in 2 hours",
      "High initial grab",
      "Reduces clamping time",
      "High strength wood bonding"
    ],
    "sizes": [1, 5, 10, 20, 50],
    "unit": "kg",
    "popular": false,
    "image": "https://m.media-amazon.com/images/I/51XQHc4lYLL.jpg"
  },
`;

if (!content.includes('"Fevicol Hi Per"')) {
    content = content.replace(
        'export const mockProducts = [\n',
        'export const mockProducts = [\n' + newProducts
    );
}

fs.writeFileSync('src/data.ts', content);
