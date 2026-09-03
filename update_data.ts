import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf-8');

// Update topCategories
content = content.replace(
  'export const topCategories = ["All Categories", "Home Paint", "Industrial"];',
  'export const topCategories = ["All Categories", "Home Paint", "Industrial", "Adhesives"];'
);

// Update subCategories
if (!content.includes('Adhesives: [')) {
    content = content.replace(
        '  Industrial: [\n    "All Industrial",\n    "PU Coatings",\n    "Epoxy Coatings",\n    "Synthetic Enamels"\n  ]\n};',
        '  Industrial: [\n    "All Industrial",\n    "PU Coatings",\n    "Epoxy Coatings",\n    "Synthetic Enamels"\n  ],\n  Adhesives: [\n    "All Adhesives",\n    "Wood Adhesives",\n    "Synthetic Resin",\n    "Contact Adhesives"\n  ]\n};'
    );
}

// Update brands
if (!content.includes('"Fevicol"')) {
    content = content.replace(
        '  "Local"\n];',
        '  "Local",\n  "Fevicol"\n];'
    );
}

// Update brandDetails
if (!content.includes('name: "Fevicol"')) {
    const fevicolBrand = `  {
    name: "Fevicol",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Fevicol_Logo.svg",
    description:
      "India's most trusted adhesive brand. High-performance synthetic resin and contact adhesives for woodworking, laminates, and general purposes.",
    tags: ["Adhesives", "Wood Glue", "Synthetic Resin", "Pidilite"],
    isAuthorised: true
  },
`;
    content = content.replace(
        'export const brandDetails: BrandDetail[] = [\n',
        'export const brandDetails: BrandDetail[] = [\n' + fevicolBrand
    );
}

const fevicolProducts = `
  {
    "id": 9001,
    "name": "Fevicol SH",
    "description": "Fevicol SH is a synthetic resin adhesive intended for woodworking and various materials where one of the surfaces to be bonded is porous. SH strongly binds wood, plywood, laminate, veneers, MDF and all types of boards.",
    "brand": "Fevicol",
    "topCategory": "Adhesives",
    "subCategory": "Wood Adhesives",
    "price": "₹ 290.00",
    "properties": [
      "Unsurpassed bonding strength",
      "Resistant to water and heat",
      "Economical in long run",
      "Suitable for woodworking"
    ],
    "sizes": [1, 2, 5, 10, 20, 50],
    "unit": "kg",
    "popular": true,
    "image": "https://5.imimg.com/data5/SELLER/Default/2021/7/OU/OI/YY/111005295/fevicol-sh-adhesive-500x500.jpg"
  },
  {
    "id": 9002,
    "name": "Fevicol Marine",
    "description": "Fevicol Marine is a waterproof synthetic resin adhesive tailored for plywood to plywood bonding. Provides excellent water resistance (up to 48 hours of boiling water) and sets in a short time.",
    "brand": "Fevicol",
    "topCategory": "Adhesives",
    "subCategory": "Wood Adhesives",
    "price": "₹ 380.00",
    "properties": [
      "Waterproof Adhesive",
      "Marine grade",
      "Termite and Borer resistant",
      "Fast setting"
    ],
    "sizes": [1, 2, 5, 10, 20, 50],
    "unit": "kg",
    "popular": true,
    "image": "https://5.imimg.com/data5/SELLER/Default/2022/9/EH/SE/ON/52533857/fevicol-marine-waterproof-adhesive-500x500.jpg"
  },
  {
    "id": 9003,
    "name": "Fevicol SR 998",
    "description": "Fevicol SR 998 is a premium quality synthetic rubber based contact adhesive. Provides high initial grab, fast drying and excellent heat resistance. Ideal for vertical lamination.",
    "brand": "Fevicol",
    "topCategory": "Adhesives",
    "subCategory": "Contact Adhesives",
    "price": "₹ 350.00",
    "properties": [
      "High initial grab",
      "Heat resistant up to 120°C",
      "Fast drying",
      "Toluene free"
    ],
    "sizes": [1, 5, 25],
    "unit": "L",
    "popular": false,
    "image": "https://5.imimg.com/data5/ANDROID/Default/2020/9/ER/LI/UB/19717013/product-jpeg-500x500.jpg"
  },
  {
    "id": 9004,
    "name": "Fevicol HeatX",
    "description": "Fevicol HeatX is a heat resistant contact adhesive. It offers excellent resistance to heat and is very quick to bond, requiring no sustained pressure.",
    "brand": "Fevicol",
    "topCategory": "Adhesives",
    "subCategory": "Contact Adhesives",
    "price": "₹ 395.00",
    "properties": [
      "High heat resistance",
      "Fast setting",
      "Ideal for curved surfaces",
      "High coverage"
    ],
    "sizes": [1, 5, 25],
    "unit": "L",
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2021/11/EM/QJ/AZ/9027878/fevicol-heatx-adhesive.jpg"
  },
  {
    "id": 9005,
    "name": "Fevicol Ezee Spray",
    "description": "Fevicol Ezee Spray is an innovative sprayable contact adhesive for fast and convenient bonding of laminates. Covers up to 50% more area compared to standard application.",
    "brand": "Fevicol",
    "topCategory": "Adhesives",
    "subCategory": "Contact Adhesives",
    "price": "₹ 450.00",
    "properties": [
      "Spray application",
      "Zero bubbling",
      "Superior coverage",
      "High tack"
    ],
    "sizes": [1],
    "unit": "kg",
    "popular": true,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/5/304958611/UK/DH/UB/50800048/fevicol-ezee-spray-adhesive-500x500.jpg"
  },
`;

if (!content.includes('"Fevicol SH"')) {
    content = content.replace(
        'export const mockProducts = [\n',
        'export const mockProducts = [\n' + fevicolProducts
    );
}

fs.writeFileSync('src/data.ts', content);
