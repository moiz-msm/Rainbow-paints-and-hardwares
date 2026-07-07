export const topCategories = ["All Categories", "Home Paint", "Industrial"];

export const subCategories: Record<string, string[]> = {
  "Home Paint": [
    "All Home Paint",
    "Interior Wall",
    "Exterior Wall",
    "Undercoats",
    "Waterproofing",
    "Wood Finishes",
    "Metals and Grills",
    "Painting Tools",
    "Thinners & Solvents",
    "Tile Adhesives"
  ],
  Industrial: [
    "All Industrial",
    "PU Coatings",
    "Epoxy Coatings",
    "Synthetic Enamels"
  ]
};

export const brands = [
  "All Brands",
  "Asian Paints",
  "Berger Paints",
  "Birla White",
  "Dr. Fixit",
  "MRF Vapocure",
  "Just Spray",
  "Sheenlac",
  "Ajax",
  "Bawa",
  "Jaya",
  "Gorila",
  "Local"
];

export interface BrandDetail {
  name: string;
  logo: string;
  description: string;
  tags: string[];
  isAuthorised: boolean;
}

export const brandDetails: BrandDetail[] = [
  {
    name: "Just Spray",
    logo: "https://justspray.in/wp-content/uploads/2024/10/JustSpray-logo-a.png",
    description:
      "Premium JS1 aerosol spray paint. High-performance quick-drying formula offering professional finish in classic, metallic, fluorescent, and primer variations.",
    tags: ["JS1", "Spray Paint", "Aerosol"],
    isAuthorised: true
  },
  {
    name: "Asian Paints",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e2/Asian_paints_logo.svg",
    description:
      "India's #1 paint brand — Royale luxury emulsions, Apex exterior & Teflon technology trusted by millions of homes.",
    tags: ["Interior", "Exterior", "Primer"],
    isAuthorised: true
  },
  {
    name: "Berger Paints",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/Berger.png",
    description:
      "Premium Silk luxury emulsions & WeatherCoat exterior series. Value leader in India's premium paint segment.",
    tags: ["Silk Range", "Weathercoat", "Distemper"],
    isAuthorised: true
  },
  {
    name: "Birla White",
    logo: "https://www.birlawhite.com/logo.svg",
    description:
      "India's largest manufacturer of White Cement and WallCare Putty, providing the whitest white cement for beautiful and enduring structures.",
    tags: ["Putty", "White Cement", "Undercoats"],
    isAuthorised: true
  },
  {
    name: "Dr. Fixit",
    logo: "https://www.drfixit.co.in/web/images/web-logo.png",
    description:
      "The trusted name in structural waterproofing and construction chemicals for permanent protection against water damage.",
    tags: ["Waterproofing", "Roofseal", "Bathseal"],
    isAuthorised: true
  },
  {
    name: "MRF Vapocure",
    logo: "https://www.mrfpaint.com/wp-content/uploads/2024/11/mrf-logo-1.png",
    description:
      "Engineering-grade high-performance polyurethane (PU) wood, metal, wall, and specialty coatings by MRF for ultimate protection and durability.",
    tags: ["WoodCoat", "MetalCoat", "WallCoat", "Polyurethane"],
    isAuthorised: true
  },
  {
    name: "Sheenlac",
    logo: "https://sheenlac.com/wp-content/uploads/2024/05/Sheenlac-WhiteLogo_MenuBar.png",
    description:
      "India's wood-finishing pioneer — premium wood coatings, stains, NC thinners, wood polish, and paint removers of exceptional grade.",
    tags: ["Wood Polish", "NC Thinner", "Stainer", "Paint Remover"],
    isAuthorised: true
  },
  {
    name: "Ajax",
    logo: "https://via.placeholder.com/150?text=AJAX",
    description:
      "Superior quality abrasive materials — waterproof water emery papers and red dry emery papers for smooth surface preparation.",
    tags: ["Emery Paper", "Abrasives", "Sanding Paper", "Rolls"],
    isAuthorised: true
  },
  {
    name: "Bawa",
    logo: "https://via.placeholder.com/150?text=BAWA",
    description:
      "Premium painter-grade paint brushes including Joker, Prince, Touchwood and Snowcem series built for absolute application control.",
    tags: ["Joker Brush", "Prince Brush", "Touchwood Brush", "Snowcem Brush"],
    isAuthorised: true
  },
  {
    name: "Jaya",
    logo: "https://via.placeholder.com/150?text=JAYA",
    description:
      "High-density Diamond series painting brushes crafted for even distribution, zero hair loss, and beautiful streak-free coat results.",
    tags: ["Diamond Brush", "Painting Brushes", "Brushes"],
    isAuthorised: true
  },
  {
    name: "Gorila",
    logo: "https://via.placeholder.com/150?text=GORILA",
    description:
      "Vibrant high-pigmentation cement color oxide powders. Superior UV stability and perfect shade formulation for all architectural mixes.",
    tags: ["Cement Oxide", "Oxide Powder", "Color Powder"],
    isAuthorised: true
  },
  {
    name: "Local",
    logo: "https://via.placeholder.com/150?text=LOCAL",
    description:
      "Distributor-selected general hardware essentials, pure unbranded mineral solvents, rollers, and painting trays of trade quality.",
    tags: ["Turpentine Oil", "Cotton Waste", "Masking Tape", "Painting Rollers"],
    isAuthorised: false
  }
];

export const mockProducts = [
  {
    "id": 1002,
    "name": "Royale Glitz Reserve",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 1100.00",
    "properties": [
      "Ultra Luxury Interior Paint",
      "Stain Repellent",
      "Crème Finish"
    ],
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/royale-glitz-reserv-new-packshot.png"
  },
  {
    "id": 1003,
    "name": "Royale Glitz Ultra Matt",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 1050.00",
    "properties": [
      "Ultra Matt Finish",
      "Teflon Surface Protector",
      "Washable"
    ],
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/royale-glitz-ultra-matt-new-packshot.png"
  },
  {
    "id": 1004,
    "name": "Apcolite All Protek Matt",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 550.00",
    "properties": [
      "Flame Retardant",
      "Stain Washability",
      "Matt Finish"
    ],
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-apcolite-premium-emulsion-asian-paints.png"
  },
  {
    "id": 1005,
    "name": "Apcolite All Protek Shyne",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 600.00",
    "properties": [
      "Flame Retardant",
      "Stain Washability",
      "Soft Sheen Finish"
    ],
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-apcolite-all-protek-shyne-packshot-asian-paints.png"
  },
  {
    "id": 1006,
    "name": "Apex Ultima Stretch",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 850.00",
    "properties": [
      "Elastomeric Film",
      "Crack Bridging",
      "7-Year Warranty"
    ],
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/ultima-stretch-packshot-asian-paints.png"
  },
  {
    "id": 1007,
    "name": "Apex Floor Guard",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 600.00",
    "properties": [
      "Terrace Floor Protection",
      "High Abrasion Resistance",
      "Washable"
    ],
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-floor-guard-asian-paints.png"
  },
  {
    "id": 1008,
    "name": "Apex Tile Guard",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 700.00",
    "properties": [
      "Roof Tile Protection",
      "Anti-Algal",
      "Water Resistant"
    ],
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-tile-guard-new-asian-paints.png"
  },
  {
    "id": 1009,
    "name": "Apex Tile Guard Matt",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 720.00",
    "properties": [
      "Matt Finish Roof Tile Protection",
      "Anti-Algal",
      "Excellent Adhesion"
    ],
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-tile-guard.png"
  },
  {
    "id": 1001,
    "name": "Apex Ultima",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 550.00",
    "properties": [
      "Anti-Algal Weatherproof",
      "7 Years Performance Warranty",
      "Colour Stay Technology"
    ],
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-ultima-asian-paints.png"
  },
  {
    "id": 10,
    "name": "101 PIDIPROOF LW+",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 185.00",
    "sizes": [
      0.2,
      1,
      5,
      10,
      20,
      50,
      100
    ],
    "properties": [
      "Integral Liquid Waterproofing"
    ],
    "popular": true,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/hdpi/16191739476082a23b4efc6.webp"
  },
  {
    "id": 100,
    "name": "100 PIDIPROOF LW+ SUPER",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 225.00",
    "sizes": [
      1,
      5,
      10,
      20,
      50
    ],
    "properties": [
      "Liquid Plasticizing Compound"
    ],
    "popular": true,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16191738726082a1f0a2d3c.webp"
  },
  {
    "id": 58,
    "name": "W013 PLASTER MASTER",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 210.00",
    "sizes": [
      1,
      5,
      10,
      20
    ],
    "properties": [
      "Liquid Plasticing & Waterproofing"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16697148246385d38801458.webp"
  },
  {
    "id": 57,
    "name": "105 POWDER WATERPROOF",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 47.00",
    "sizes": [
      0.5,
      30
    ],
    "properties": [
      "Integral powder waterproofing"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/1/482154179/YQ/DH/SG/1774309/dr-fixit-pidifin-2k-waterproofing-chemical-500x500.jpg"
  },
  {
    "id": 11,
    "name": "301 PIDICRETE URP",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 430.00",
    "sizes": [
      0.2,
      0.5,
      1,
      5,
      10,
      20,
      50,
      225
    ],
    "properties": [
      "SBR Latex for waterproofing & repairs"
    ],
    "popular": true,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16191739266082a22686c0b.webp"
  },
  {
    "id": 47,
    "name": "302 SUPER LATEX",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 470.00",
    "sizes": [
      0.2,
      0.5,
      1,
      5,
      20
    ],
    "properties": [
      "SBR Latex for waterproofing & repairs"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16191734746082a06281358.webp"
  },
  {
    "id": 59,
    "name": "303 PIDICRETE MPB",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 405.00",
    "sizes": [
      1,
      10
    ],
    "properties": [
      "Acrylic multi-purpose binder"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16191734216082a02d1d2b8.webp"
  },
  {
    "id": 233,
    "name": "233 PIDICRETE WP",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 335.00",
    "sizes": [
      1,
      5,
      20
    ],
    "properties": [
      "Acrylic waterproof polymer"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/8/336094569/TV/WV/BG/11348985/dr-fixit-301-pidicrete-urp-waterproofing-chemical-500x500.jpeg"
  },
  {
    "id": 61,
    "name": "307 ALL SEAL",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 475.00",
    "sizes": [
      1,
      5,
      10,
      20,
      50
    ],
    "properties": [
      "High strength SI bond polymer"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/167601991363e608c99558b.webp"
  },
  {
    "id": 54,
    "name": "304 POWERCRETE",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 4600.00",
    "sizes": [
      20,
      50,
      100
    ],
    "properties": [
      "Acrylic polymer for waterproofing & repairs"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16191734526082a04c67264.webp"
  },
  {
    "id": 55,
    "name": "604 PRIMESEAL",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 390.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "properties": [
      "Efflorescence resistant penetrating primer"
    ],
    "popular": true,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16191737746082a18e486b7.webp"
  },
  {
    "id": 12,
    "name": "601 RAINCOAT",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 610.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "properties": [
      "Acrylic elastomeric exterior waterproof coating"
    ],
    "popular": true,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/1746689349681c5d4571c2f.webp"
  },
  {
    "id": 62,
    "name": "641 RAINCOAT CLASSIC",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 630.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "properties": [
      "High build durable exterior elastomeric coating"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/1746689247681c5cdfdebbe.webp"
  },
  {
    "id": 63,
    "name": "642 RAINCOAT SELECT",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 730.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "properties": [
      "High performance exterior waterproof coating"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/1746689349681c5d4571c2f.webp"
  },
  {
    "id": 65,
    "name": "643 RAINCOAT WATERPROOF COATING",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 500.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "properties": [
      "Universal elastomeric base coat"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/8/335815699/QT/GO/BG/11348985/dr-fixit-raincoat-neo-waterproofing-chemical-500x500.jpeg"
  },
  {
    "id": 64,
    "name": "651 RAINCOAT NEO",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 370.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "properties": [
      "Primeless high build waterproof acrylate coating"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/1746689578681c5e2ab0ba2.webp"
  },
  {
    "id": 49,
    "name": "653 ROOFSEAL SELECT",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 1950.00",
    "sizes": [
      4,
      20
    ],
    "properties": [
      "Heavy duty reinforced trafficable waterproof coating"
    ],
    "popular": true,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/17370110196788af4b163d1.webp"
  },
  {
    "id": 36,
    "name": "652 ROOFSEAL CLASSIC",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 465.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "properties": [
      "Unique heat reflecting roof waterproof coating"
    ],
    "popular": true,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/174462271967fcd47f3b0a3.webp"
  },
  {
    "id": 56,
    "name": "654 ROOFSEAL ULTRA",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 11330.00",
    "sizes": [
      20
    ],
    "properties": [
      "Next generation PU based roof waterproofing coating"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/17370904466789e58e64e3b.webp"
  },
  {
    "id": 610,
    "name": "610 SURESEAL",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 390.00",
    "sizes": [
      1,
      5,
      20
    ],
    "properties": [
      "Waterproof coating (waterproofing all rounder)"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/162748296561016b5578d43.webp"
  },
  {
    "id": 66,
    "name": "112 PIDIFIN 2K",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 580.00",
    "sizes": [
      3,
      9,
      15,
      30
    ],
    "properties": [
      "Acrylic cementitious two component coating"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/1715087528663a28a81cb0b.webp"
  },
  {
    "id": 46,
    "name": "113 FASTFLEX",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 2700.00",
    "sizes": [
      12
    ],
    "properties": [
      "High performance polymer modified cementitious coating"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/1714383552662f6ac0da97e.webp"
  },
  {
    "id": 196,
    "name": "196 BITUFIX",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 970.00",
    "sizes": [
      5,
      20
    ],
    "properties": [
      "Bitumen emulsion paint for DPC"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16191737396082a16b80375.webp"
  },
  {
    "id": 33,
    "name": "135 BATHSEAL TAPE",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 1700.00",
    "sizes": [
      1
    ],
    "properties": [
      "Non-reinforced twin sided self adhesive bituminous membrane"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/3/494665028/MD/DL/EU/1774309/dr-fixit-bathseal-tape-500x500.png"
  },
  {
    "id": 67,
    "name": "103 REPELLIN WR",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 600.00",
    "sizes": [
      1,
      10
    ],
    "properties": [
      "Silicone based water repellent"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/9/542738527/HA/OH/DO/193587917/dr-fixit-103-repellent-wire-500x500.jpg"
  },
  {
    "id": 68,
    "name": "104 DAMPGUARD",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 360.00",
    "sizes": [
      0.5,
      1
    ],
    "properties": [
      "Damp-proof coating for internal walls"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16191734996082a07b2ba0d.webp"
  },
  {
    "id": 107,
    "name": "107 KRYSTALLINE",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 3025.00",
    "sizes": [
      25
    ],
    "properties": [
      "Cementitious concrete waterproofing"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/161917334160829fdd9dbdb.webp"
  },
  {
    "id": 69,
    "name": "211 EPOXY BONDING AGENT",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 1150.00",
    "sizes": [
      1
    ],
    "properties": [
      "Two part solvent free epoxy resin"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/DQ/RC/BH/SELLER-1774309/sikadur-32-bonding-agent-500x500.jpg"
  },
  {
    "id": 70,
    "name": "226 POLYMER MORTAR HB",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 1500.00",
    "sizes": [
      25
    ],
    "properties": [
      "Single component ready to use dual shrinkage"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/PDFImage/2025/3/496114877/HY/ME/EJ/1774309/fosroc-renderoc-sp40-500x500.png"
  },
  {
    "id": 71,
    "name": "204 RUST REMOVER",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 220.00",
    "sizes": [
      0.5,
      1
    ],
    "properties": [
      "Liquid for cleaning re-bars & steel surfaces"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/3/493746631/LT/GP/FI/1774309/dr-fixit-super-latex-500x500.webp"
  },
  {
    "id": 72,
    "name": "207 PIDICRETE AM",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 70.00",
    "sizes": [
      0.225
    ],
    "properties": [
      "Expansive plasticising admixture"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/8/336094569/TV/WV/BG/11348985/dr-fixit-301-pidicrete-urp-waterproofing-chemical-500x500.jpeg"
  },
  {
    "id": 73,
    "name": "257 REPAIR POLYMER MORTAR",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 670.00",
    "sizes": [
      25
    ],
    "properties": [
      "Fiber reinforced dual shrinkage repair mortars"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/PDFImage/2025/3/496114877/HY/ME/EJ/1774309/fosroc-renderoc-sp40-500x500.png"
  },
  {
    "id": 74,
    "name": "208 MICRO CONCRETE",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 550.00",
    "sizes": [
      25
    ],
    "properties": [
      "Flowable mortar for repairs to damaged reinforced concrete"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/3/493957549/OM/HM/AR/1774309/repair-pro-dr-fixit-micro-concrete-500x500.jpg"
  },
  {
    "id": 75,
    "name": "710 PIDIGROUT 10M",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 730.00",
    "sizes": [
      25
    ],
    "properties": [
      "Dual shrinkage cementitious flowable grout"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/3/496843324/TN/CS/DQ/1774309/dr-fixit-repellin-wr-500x500.jpg"
  },
  {
    "id": 76,
    "name": "202 CRACK-X POWDER",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 60.00",
    "sizes": [
      0.5,
      1,
      25
    ],
    "properties": [
      "A non-shrink, high strength powder crack filler"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/3/494854728/PG/YL/WQ/1774309/dr-fixit-crack-x-shrink-free-500x500.jpg"
  },
  {
    "id": 77,
    "name": "201 CRACK-X PASTE",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 205.00",
    "sizes": [
      0.3,
      0.5,
      1,
      5
    ],
    "properties": [
      "Ready to use high strength filler for cracks"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/PDFImage/2025/3/496857516/RK/QN/TT/1774309/dr-fixit-prebond-500x500.png"
  },
  {
    "id": 45,
    "name": "217 CRACK-X SHRINKFREE",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 205.00",
    "sizes": [
      0.35,
      0.75
    ],
    "properties": [
      "One time shrink-free filler for plaster cracks"
    ],
    "popular": false,
    "image": "https://drfixit-stg.s3.ap-south-1.amazonaws.com/assets/images/products/xhdpi/16191739126082a2185690e.webp"
  },
  {
    "id": 78,
    "name": "501 FEVISEAL GP PRO",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 325.00",
    "sizes": [
      0.28
    ],
    "properties": [
      "Acetic cure silicone sealant for windows"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2024/12/472986100/ZG/RQ/MA/7641714/feviseal-gp-pro-silicone-sealant-280ml-ultimate-glass-and-window-sealant-500x500.jpg"
  },
  {
    "id": 79,
    "name": "501 FEVISEAL NEUTRAL PRO",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 375.00",
    "sizes": [
      0.28
    ],
    "properties": [
      "Silicone Sealant"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/5/507339793/WP/WP/ZI/7641714/feviseal-neutral-pro-sealent-500x500.jpg"
  },
  {
    "id": 80,
    "name": "501 FEVISEAL WEATHERPROOF PRO",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 425.00",
    "sizes": [
      0.28
    ],
    "properties": [
      "Silicone Sealant"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/5/507340443/KX/SY/RT/7641714/feviseal-weatherproof-pro-sealent-500x500.jpg"
  },
  {
    "id": 81,
    "name": "FEVISEAL HY 100",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 483.33",
    "sizes": [
      0.6
    ],
    "properties": [
      "Low modulus hybrid sealant"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/9/544193440/HK/SV/BF/29232216/dr-fixit-feviseal-hy-100-hybrid-sealant-lm-500x500.png"
  },
  {
    "id": 82,
    "name": "FEVISEAL HY 300",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 950.00",
    "sizes": [
      0.6
    ],
    "properties": [
      "High modulus hybrid sealant"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/11/562885116/XJ/IR/GR/218152527/feviseal-hy-300-500x500.jpg"
  },
  {
    "id": 83,
    "name": "515 FEVISEAL MULTIPURPOSE",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 145.00",
    "sizes": [
      0.28
    ],
    "properties": [
      "One pack elastomeric acrylic sealant"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/5/507337619/GT/EV/CZ/7641714/feviseal-multipurpose-acrylic-sealent-500x500.jpg"
  },
  {
    "id": 84,
    "name": "501 FEVISEAL BATHROOM & KITCHEN",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 145.00",
    "sizes": [
      0.28
    ],
    "properties": [
      "Gap Filling Acrylic Sealant"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/5/507336028/YC/OJ/QE/7641714/feviseal-bathroom-kitchen-sealent-500x500.jpg"
  },
  {
    "id": 85,
    "name": "404 FEVIMATE TG",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 58.00",
    "sizes": [
      0.5
    ],
    "properties": [
      "One pack water resistant tile grout"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 86,
    "name": "T16 ROFF CERA CLEAN",
    "brand": "Dr. Fixit",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 150.00",
    "sizes": [
      0.5,
      1,
      5
    ],
    "properties": [
      "High performance tile cleaner"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 1,
    "name": "Apex Ultima Protek Duralife",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 928.00",
    "properties": [
      "WALLS of S.T.E.E.L",
      "Advanced PUD Formula",
      "15 years warranty*"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/textures/others/duralife_topcoat_single-layer.png"
  },
  {
    "id": 3,
    "name": "Apex Ultima Protek",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 692.00",
    "properties": [
      "Home Lamination powered by Graphene",
      "Elastomeric Armour",
      "12 years Warranty*"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-ultima-protek-topcoat-new-asian-paints.png"
  },
  {
    "id": 5,
    "name": "Royale Glitz",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 892.00",
    "properties": [
      "Perfect Crème Finish in Ultra Sheen",
      "Teflon Surface Protector",
      "8 Years Warranty"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/royale-glitz-new-packshot.png"
  },
  {
    "id": 6,
    "name": "Royale Luxury Emulsion",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 780.00",
    "properties": [
      "Smooth Exquisite Soft Sheen",
      "Excellent Stain Resistance (Teflon™)",
      "Anti-Bacterial & Low VOC (Eco-Friendly)",
      "High Scrub Resistance & Highly Washable",
      "5 Years Performance Warranty*"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-luxury-emulsion-asian-paints.png"
  },
  {
    "id": 7,
    "name": "Apcolite Premium Emulsion",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 450.00",
    "properties": [
      "Rich Flat Matt Finish",
      "Advanced Fungus & Mildew Shield",
      "Highly Washable (Resists Everyday Stains)",
      "Over 1600+ Gorgeous Shades",
      "5 Years Performance Warranty*"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-apcolite-premium-emulsion-asian-paints.png"
  },
  {
    "id": 50,
    "name": "Royale Aspira",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 1011.00",
    "properties": [
      "Water Beading Technology",
      "Luxury with Teflon™",
      "8 Years Warranty"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-aspira-luxury-emulsion-asian-paints.png"
  },
  {
    "id": 51,
    "name": "Royale Shyne Luxury Emulsion",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 850.00",
    "properties": [
      "High Intensity Lustre Sheen",
      "Excellent Stain Resistance with Teflon™",
      "Clean Air & Ultra-Low VOC",
      "Superb Scrub Resistance (Easy Cleaning)",
      "6 Years Performance Warranty*"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-shyne-luxury-emulsion-asian-paints.png"
  },
  {
    "id": 52,
    "name": "Royale Matt Emulsion",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 820.00",
    "properties": [
      "Pure Architectural Flat Matt Finish",
      "Excellent Light Diffusion (Hides Wall Flaws)",
      "Super Stain Resistance (Teflon™)",
      "High Washability & Smooth Feel",
      "5 Years Performance Warranty*"
    ],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-royale-matt-asian-paints.png"
  },
  {
    "id": 53,
    "name": "Royale Health Shield",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 1,120.00",
    "properties": [
      "Kills 99.9% Bacteria & Virus (Silver Ion)",
      "Neutralizes Formaldehyde (Purifies Indoor Air)",
      "Exquisite Soft Sheen Surface",
      "Highly Washable & Asthma Friendly approved",
      "5 Years Performance Warranty*"
    ],
    "popular": true,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/7/326440889/MP/SF/RA/22649264/asian-paints-royale-health-shield-500x500.jpg"
  },
  {
    "id": 14,
    "name": "Nilaya Arc Matt",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 1,050.00",
    "properties": [
      "Lime-Based Finish",
      "Artisanal Matt Finish",
      "10 Years Warranty"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Nilaya-Arc-Matt-new.png"
  },
  {
    "id": 60,
    "name": "Nilaya Arc Pearlescent",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 1,200.00",
    "properties": [
      "Lime-Based Finish",
      "Alluring Pearl Finish",
      "10 Years Warranty"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Nilaya-Arc-Pearlescent-new.png"
  },
  {
    "id": 17,
    "name": "Apex Dust Proof",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 426.00",
    "properties": [
      "Nano Block",
      "Dust Proof Technology",
      "6-years Warranty*"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-dust-proof-emulsion-packshot-asian-paints.png"
  },
  {
    "id": 21,
    "name": "RUCA Luxury Emulsion",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 1,150.00",
    "properties": [
      "Luxury Finish",
      "High Washability",
      "Stain Resistant",
      "10 Years Warranty*"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/ruca-copy.png"
  },
  {
    "id": 24,
    "name": "WoodCoat Italia PU Finish",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 820.00",
    "properties": [
      "Premium Italian Finish",
      "Excellent Clarity & Depth",
      "Scratch & Stain Resistant"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/italia-copy.png"
  },
  {
    "id": 26,
    "name": "Visa Emulsion",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 290.00",
    "properties": [
      "Value for Money",
      "Matt Finish",
      "Good Opacity",
      "4 Years Warranty*"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/Untitled-design-16.png"
  },
  {
    "id": 27,
    "name": "AquaFresh PU Exterior",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 1,050.00",
    "properties": [
      "Weather Resistant",
      "PU Exterior Finish",
      "Anti-Fungal",
      "8 Years Warranty*"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/Untitled-design-19.png"
  },
  {
    "id": 29,
    "name": "Tractor Emulsion",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 210.00",
    "properties": [
      "Smart Choice Economy Matt",
      "1.5x More Coverage than Distempers",
      "Smooth Elegant Leveling Surface",
      "Washable & Easy to Maintain",
      "Value For Money Smart Upgrade"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-tractor-emulsion-asian-paints.png"
  },
  {
    "id": 30,
    "name": "Ace Exterior Emulsion",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 240.00",
    "properties": [
      "Anti-Algal Performance",
      "Economy Exterior",
      "Water Resistance"
    ],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-ace-exterior-emulsion-asian-paints.png"
  },
  {
    "id": 31,
    "name": "Luxol High Gloss Enamel",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Metals and Grills",
    "price": "₹ 340.00",
    "properties": [
      "High Gloss",
      "Tough Film",
      "Anti-Corrosive"
    ],
    "popular": true,
    "image": "https://www.bergerpaints.com/products/packshots/luxol.png"
  },
  {
    "id": 32,
    "name": "WoodCoat Exterior",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1,180.00",
    "properties": [
      "Exterior Polish",
      "UV Resistance",
      "Gloss & Matt"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/woodcoat-Ext-copy.png"
  },
  {
    "id": 35,
    "name": "Altura 2-in-1 Acrylic Emulsion",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 1,450.00",
    "properties": [
      "Two-in-One Performance",
      "Excellent Washability",
      "Rich Soft-Sheen Finish"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/altura-copy.png"
  },
  {
    "id": 37,
    "name": "Decoprime Wall Primer",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 180.00",
    "properties": [
      "Undercoat for Walls",
      "Excellent Opacity",
      "Strong Grip"
    ],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/decoprime-wall-primer-new-packshot.png"
  },
  {
    "id": 38,
    "name": "Emporio PU Polish",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1,350.00",
    "properties": [
      "Premium Italian Wood Finish",
      "Mirror Like Gloss",
      "Excellent Scratch Resistance"
    ],
    "popular": true,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/wood-finishes-italiano-emporio-pu-packshot-asian-paints.png"
  },
  {
    "id": 39,
    "name": "Apcolite Premium Enamel",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Metals and Grills",
    "price": "₹ 290.00",
    "properties": [
      "High Gloss Finish",
      "Stain Resistance",
      "Tough Film"
    ],
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/apcolite-premium-enamel-hi-gloss-new-packshot.png"
  },
  {
    "id": 40,
    "name": "Specta PU Enamel",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Metals and Grills",
    "price": "₹ 360.00",
    "properties": [
      "PU Enamel",
      "Excellent Leveling",
      "High Coverage"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/specta-copy.png"
  },
  {
    "id": 41,
    "name": "AquaFresh DampGarde",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 450.00",
    "properties": [
      "Waterproofing Primer",
      "Excellent Adhesion",
      "Anti-Efflorescence"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/dampgarde-copy.png"
  },
  {
    "id": 43,
    "name": "Epidec Anti-Corrosion Paint",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "PU Coatings",
    "price": "₹ 310.00",
    "properties": [
      "Exceptional Rust Prevention",
      "Two-Pack Epoxy Formulation",
      "Industrial Grade Protection"
    ],
    "popular": false,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/Epidec.webp"
  },
  {
    "id": 1044,
    "name": "Birla White WallCare Putty",
    "brand": "Birla White",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 50.00",
    "sizes": [
      1,
      5,
      20,
      40
    ],
    "unit": "kg",
    "properties": [
      "Water Resistant",
      "Excellent Adhesion",
      "Extra Whiteness & Smooth Finish",
      "Prevents Paint Flaking",
      "HP Polymer Formula"
    ],
    "popular": true,
    "image": "https://www.birlawhite.com/_next/image?url=https%3A%2F%2Fcms.birlawhite.com%2Fuploads%2F9_Putty_Products_340_494_84c21c909f.png&w=384&q=100"
  },
  {
    "id": 1045,
    "name": "Birla White Cement",
    "brand": "Birla White",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 38.00",
    "sizes": [
      1,
      5,
      25,
      50
    ],
    "unit": "kg",
    "properties": [
      "Highest Whiteness (90%+)",
      "High Compressive Strength",
      "Excellent Bonding & Smooth Finish",
      "Versatile application for walls & floors",
      "Resistant to Cracking"
    ],
    "popular": true,
    "image": "https://www.birlawhite.com/_next/image?url=https%3A%2F%2Fcms.birlawhite.com%2Fuploads%2FV1_Ever_White_Cement_Product_340x494_e193fda9f9.png&w=384&q=100"
  },
  {
    "id": 2001,
    "name": "Just Spray JS1 Acrylic Spray Paint - Classic Shades",
    "brand": "Just Spray",
    "topCategory": "Home Paint",
    "subCategory": "Metals and Grills",
    "price": "₹ 240.00",
    "sizes": [
      0.4
    ],
    "properties": [
      "100% Pure Acrylic Resin Formula",
      "Quick Drying (Under 10 mins)",
      "High Gloss & Smooth Matte Options",
      "Interior/Exterior Multi-Surface Protection"
    ],
    "popular": true,
    "image": "https://justspray.in/wp-content/uploads/2025/04/1-5-1.png",
    "shades": [
      {
        "name": "Glossy Black",
        "code": "No. 40",
        "hex": "#121212",
        "image": "https://justspray.in/wp-content/uploads/2025/04/1-5-1.png",
        "price": "₹ 240.00"
      },
      {
        "name": "Glossy White",
        "code": "No. 39",
        "hex": "#FFFFFF",
        "image": "https://rukminim2.flixcart.com/image/480/640/xif0q/spray-paints/9/d/m/400-glossy-white-glossy-white-spray-paint-new-just-sprey-original-imahf4szye7zhyzk.jpeg?q=90",
        "price": "₹ 240.00"
      },
      {
        "name": "Signal Red",
        "code": "No. 6",
        "hex": "#E60000",
        "image": "https://justspray.in/wp-content/uploads/2025/04/1-5-1.png",
        "price": "₹ 240.00"
      },
      {
        "name": "Matt Black",
        "code": "No. 33",
        "hex": "#1C1C1C",
        "image": "https://justspray.in/wp-content/uploads/2025/04/1-5-1.png",
        "price": "₹ 240.00"
      },
      {
        "name": "Medium Yellow",
        "code": "No. 15",
        "hex": "#FFCC00",
        "image": "https://justspray.in/wp-content/uploads/2025/04/1-5-1.png",
        "price": "₹ 240.00"
      },
      {
        "name": "Forest Green",
        "code": "No. 36",
        "hex": "#1E3B20",
        "image": "https://justspray.in/wp-content/uploads/2025/04/1-5-1.png",
        "price": "₹ 240.00"
      }
    ]
  },
  {
    "id": 2002,
    "name": "Just Spray JS1 Acrylic Spray Paint - Metallic Shades",
    "brand": "Just Spray",
    "topCategory": "Home Paint",
    "subCategory": "Metals and Grills",
    "price": "₹ 310.00",
    "sizes": [
      0.4
    ],
    "properties": [
      "Rich Premium Metallic Luster",
      "Reflective Foil-Like Sparkle Finish",
      "Heat Resistant Film (Up to 120°C)",
      "Excellent Levelling & Scratch Proof"
    ],
    "popular": true,
    "image": "https://m.media-amazon.com/images/I/51LQ4cQ3u1L._SL1080_.jpg",
    "shades": [
      {
        "name": "Metallic Gold",
        "code": "No. 400",
        "hex": "#D4AF37",
        "image": "https://m.media-amazon.com/images/I/51LQ4cQ3u1L._SL1080_.jpg",
        "price": "₹ 310.00"
      },
      {
        "name": "Sparkling Silver",
        "code": "No. 1580",
        "hex": "#C0C0C0",
        "image": "https://m.media-amazon.com/images/I/51LQ4cQ3u1L._SL1080_.jpg",
        "price": "₹ 290.00"
      },
      {
        "name": "Metallic Copper",
        "code": "No. 402",
        "hex": "#B87333",
        "image": "https://rukminim2.flixcart.com/image/480/640/xif0q/spray-paints/g/h/a/400-brown-metallic-brown-spray-paint-new-just-sprey-original-imahb8z8tfhnpcdn.jpeg?q=90",
        "price": "₹ 300.00"
      }
    ]
  },
  {
    "id": 2003,
    "name": "Just Spray JS1 Acrylic Spray Paint - Fluorescent Shades",
    "brand": "Just Spray",
    "topCategory": "Home Paint",
    "subCategory": "Metals and Grills",
    "price": "₹ 280.00",
    "sizes": [
      0.4
    ],
    "properties": [
      "Vivid High-Visibility Day-Glo Pigments",
      "Brilliant Blacklight & UV Reflective Glow",
      "Perfect for Safety Signs, Crafts & Decor",
      "Fast-Drying Non-Fading Acrylic Formula"
    ],
    "popular": true,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg",
    "shades": [
      {
        "name": "Fluorescent Green",
        "code": "No. 1005",
        "hex": "#39FF14",
        "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg",
        "price": "₹ 280.00"
      },
      {
        "name": "Fluorescent Pink",
        "code": "No. 1006",
        "hex": "#FF007F",
        "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg",
        "price": "₹ 280.00"
      },
      {
        "name": "Fluorescent Orange",
        "code": "No. 1004",
        "hex": "#FF5F1F",
        "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg",
        "price": "₹ 280.00"
      }
    ]
  },
  {
    "id": 3001,
    "name": "Professional Putty Blade",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 35.00",
    "sizes": [
      2,
      3,
      4,
      6,
      8,
      10,
      12
    ],
    "unit": " inch",
    "properties": [
      "High-Carbon Tempered Steel Blade",
      "Excellent Flex and Bounce for Smooth Finishing",
      "Rust-Resistant Coating for Prolonged Life",
      "Ergonomically Balanced Non-Slip Grip"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3002,
    "name": "Heavy Duty Handle Putty Scraper Blade",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 55.00",
    "sizes": [
      2,
      3,
      4,
      5,
      6
    ],
    "unit": " inch",
    "properties": [
      "Riveted Ergonomic Hardwood Handle",
      "Stiff Carbon Steel Scraper Blade Edge",
      "Ideal for Peeling Paint, Scraping Wall Cracks, and Heavy Putty Work",
      "Reinforced Brass Ferrule for Durability"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3003,
    "name": "Sheenlac NC Thinner D-13X",
    "brand": "Sheenlac",
    "topCategory": "Home Paint",
    "subCategory": "Thinners & Solvents",
    "price": "₹ 200.00",
    "sizes": [
      0.5,
      1,
      3,
      5,
      20
    ],
    "unit": "L",
    "properties": [
      "Economy Nitrocellulose Lacquer Solubilizing Thinner",
      "Specifically suited for nitrocellulose-based undercoats, primers, and sealers",
      "Ensures rapid drying action and smooth application viscosity control",
      "Prevents paint film cloudiness and leaves a clean, blush-free finish"
    ],
    "popular": true,
    "image": "https://5.imimg.com/data5/HF/OJ/FE/SELLER-2814892/sheenlac-nc-thinner-500x500.jpg"
  },
  {
    "id": 3004,
    "name": "Sheenlac NC Thinner SP-58",
    "brand": "Sheenlac",
    "topCategory": "Home Paint",
    "subCategory": "Thinners & Solvents",
    "price": "₹ 240.00",
    "sizes": [
      0.5,
      1,
      3,
      5,
      20
    ],
    "unit": "L",
    "properties": [
      "Premium Gloss-Promoting Nitrocellulose Lacquer Thinner",
      "Specially formulated to dilute high-end lacquers and clear wood coats",
      "Improves leveling properties and vastly increases cured paint gloss levels",
      "Humidity-resistant formula that prevents whitening/blushing of clear finishes"
    ],
    "popular": true,
    "image": "https://5.imimg.com/data5/KT/SB/GLADMIN-2/sheenlac-paint-thinners-500x500.jpg"
  },
  {
    "id": 3005,
    "name": "Sheenlac Wood Stainer",
    "brand": "Sheenlac",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 75.00",
    "sizes": [
      0.1,
      0.2,
      1
    ],
    "unit": "L",
    "properties": [
      "Highlights Natural Wood Grain Patterns with Rich Colors",
      "Excellent Penetration and Color-Retention Properties",
      "Non-Fading & UV-Stable Organic Pigmentation Formulations",
      "Compatible with Spirit Polish, Lacquer, & PU Top Coats"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-500x500.jpg",
    "shades": [
      {
        "name": "Walnut",
        "code": "Stainer 1",
        "hex": "#483C32",
        "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-500x500.jpg",
        "price": "₹ 55.00"
      },
      {
        "name": "Mahogany",
        "code": "Stainer 2",
        "hex": "#4C0013",
        "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-500x500.jpg",
        "price": "₹ 55.00"
      },
      {
        "name": "Teak",
        "code": "Stainer 3",
        "hex": "#A9703E",
        "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-500x500.jpg",
        "price": "₹ 55.00"
      },
      {
        "name": "Rosewood",
        "code": "Stainer 4",
        "hex": "#651A14",
        "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-500x500.jpg",
        "price": "₹ 55.00"
      },
      {
        "name": "Charcoal Black",
        "code": "Stainer 5",
        "hex": "#36454F",
        "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-500x500.jpg",
        "price": "₹ 55.00"
      }
    ]
  },
  {
    "id": 3006,
    "name": "Sheenlac Paint Remover",
    "brand": "Sheenlac",
    "topCategory": "Home Paint",
    "subCategory": "Thinners & Solvents",
    "price": "₹ 160.00",
    "sizes": [
      0.5,
      1
    ],
    "unit": "L",
    "properties": [
      "Quick Acting Paint Film Stripping Formula",
      "Softens Tough Synthetic Enamels, Oil Paints, & Wood Coatings in Minutes",
      "Non-Corrosive to Metals, Plasters, & Hardwoods",
      "Thick Viscous Gel Holds onto Vertical Surfaces"
    ],
    "popular": false,
    "image": "https://sheenlac.com/wp-content/uploads/2024/05/paint-remover3.jpg"
  },
  {
    "id": 3007,
    "name": "Sheenlac NC Sanding Sealer",
    "brand": "Sheenlac",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 220.00",
    "sizes": [
      0.5,
      1,
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Highly efficient nitrocellulose-based wood sanding sealer",
      "Quick-drying formula with superior pore-filling properties",
      "Easy to sand, creating a perfectly flat undercoat surface",
      "Prevents topcoat absorption, reducing lacquer consumption"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538899378/LY/PK/UZ/4616531/nc-sanding-sealer-500x500.jpg"
  },
  {
    "id": 3010,
    "name": "Sheenlac Wood Polish (French Polish)",
    "brand": "Sheenlac",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 110.00",
    "sizes": [
      0.2,
      0.5,
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Traditional Premium Spirit French Polish for timber",
      "Produces rich, warm transparent amber tones on wood grain",
      "Builds up a beautiful, flat finish of cat-eye depth and luster",
      "Provides reliable protection against moisture, heat, and mild alcohol"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/TA/FG/GLADMIN-2/sheenlac-surface-polish-500x500.jpg"
  },
  {
    "id": 3008,
    "name": "Pure Turpentine Oil (Local Brand)",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Thinners & Solvents",
    "price": "₹ 90.00",
    "sizes": [
      0.5,
      1,
      3,
      5
    ],
    "unit": "L",
    "properties": [
      "Genuine Unbranded Mineral Turpentine Solvent",
      "Increases Enamel Wetting, Coverage & Flow Control",
      "Perfect for Cleansing Paint Brushes & Metal Rollers",
      "Aromatic Hydrocarbon with Controlled Vapor Evaporation Rates"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3009,
    "name": "Ajax Waterproof Emery Sandpaper",
    "brand": "Ajax",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 15.00",
    "sizes": [
      80,
      120,
      150,
      180,
      220,
      320,
      400,
      600,
      800,
      1000,
      1200,
      1500,
      2000
    ],
    "unit": " Grit",
    "properties": [
      "Latex C-Weight Paper Backing Prevents Curling",
      "Electrostatic Silicon Carbide Grains",
      "Wet Sanding Prevents Dust Clogging and Heat Buildup",
      "Highly Flexible Backing Contours Comfortably in Hand"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3010,
    "name": "Ajax Red Dry Emery Sandpaper",
    "brand": "Ajax",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 12.00",
    "sizes": [
      60,
      80,
      100,
      120,
      150,
      180,
      220
    ],
    "unit": " Grit",
    "properties": [
      "Rigid Heavy-Duty Kraft Paper Material",
      "High Grade Tough Fused Aluminum Oxide Grains",
      "Ideal for Iron Descaling, Wall Putty Leveling, & Wood Shaving",
      "High-Tension Bond Adhesion prevents premature grain shed"
    ],
    "popular": false,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 3011,
    "name": "Ajax Waterproof Emery Sanding Roll",
    "brand": "Ajax",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 650.00",
    "sizes": [
      80,
      120,
      150,
      180,
      220,
      320,
      400
    ],
    "unit": " Grit",
    "properties": [
      "Premium Continuous Cloth-Backed Sander Roll format",
      "Resilient Silicon Carbide Bonds withstand heavy machine friction",
      "Highly adaptable width for hand blocks and profile sanders",
      "Saves cost compared to pre-cut sheet equivalents"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3012,
    "name": "Ajax Red Dry Emery Sanding Roll",
    "brand": "Ajax",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 550.00",
    "sizes": [
      60,
      80,
      100,
      120,
      150,
      180,
      220
    ],
    "unit": " Grit",
    "properties": [
      "Heavy J-Weight Flexible Cotton Cloth Backing",
      "Aggressive Aluminum Oxide Grain Formulation",
      "Designed for Rapid Rust Descaling and Metal Grinding",
      "Perfect tear-off utility roll for paint workshops"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3013,
    "name": "Cotton Banian Waste (Cleaning Rag)",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 80.00",
    "sizes": [
      1,
      5,
      10
    ],
    "unit": " kg",
    "properties": [
      "Super-Absorbent Pure Cotton Hosiery Waste Material",
      "Absolutely Lint-Free, Leaves Zero Hair or Strands behind",
      "Stitched & Pre-Sorted for Seamless Hand Polishing & Oil Wiping",
      "Highly economical and biodegradable cleaning solution"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3014,
    "name": "Jaya Diamond Paint Brush",
    "brand": "Jaya",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 45.00",
    "sizes": [
      2,
      4
    ],
    "unit": " inch",
    "properties": [
      "Premium Pure Natural Black Pig Bristles",
      "Epoxy-Set Grains Prevent Hair Loss under Solvent Attacks",
      "Handmade contoured Birchwood handle for long shift comfort",
      "Heavy duty brass ferrule ensures stability"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3015,
    "name": "Bawa Joker Series Paint Brush",
    "brand": "Bawa",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 30.00",
    "sizes": [
      1,
      1.5,
      2,
      2.5,
      3,
      4
    ],
    "unit": " inch",
    "properties": [
      "Economical Trade Range Joker Series",
      "Synthetic Soft-Taper bristles provide high paint pickup",
      "Ergonomically engineered composite grip",
      "Suitable for general touch-up work and utility cleaning"
    ],
    "popular": false,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 3016,
    "name": "Bawa Prince Series Paint Brush",
    "brand": "Bawa",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 40.00",
    "sizes": [
      1,
      1.5,
      2,
      2.5,
      3,
      4
    ],
    "unit": " inch",
    "properties": [
      "Flagship Prince Range Brush Set",
      "Highly Packed Natural-Synthetic Blend for excellent leveling",
      "Double-Thick Ferrule keeps bristles aligned during heavy brush loads",
      "Ideal for Fine Enamels, Acrylic Emulsions, and PU topcoats"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3017,
    "name": "Bawa Touchwood Polish Brush",
    "brand": "Bawa",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 50.00",
    "sizes": [
      1,
      2,
      3,
      4
    ],
    "unit": " inch",
    "properties": [
      "Finely Tapered Natural Bristles for streakless lacquer coats",
      "Saves paint and polish consumption via perfect capillary release",
      "Balanced short-handle grip design for close-up wood finishing work",
      "Rust-proof copper-plated hardware"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3018,
    "name": "Bawa Snowcem Exterior Brush",
    "brand": "Bawa",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 110.00",
    "sizes": [
      3,
      4.75
    ],
    "unit": " inch",
    "properties": [
      "Heavy Wall Whitewashing & Snowcem Exterior paint application",
      "Extra long synthetic reservoir bristles hold massive volumes of paint",
      "Tough heavy duty polymer handle withstands external surface abrasion",
      "Saves effort on large stucco, concrete, or rough masonry walls"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3019,
    "name": "Professional Fine Lettering Brush",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 15.00",
    "sizes": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      8
    ],
    "unit": " No.",
    "properties": [
      "Ultra-Fine Pointer Synthetic Fiber Bristles",
      "Maintains needle-like precision during long lettering strokes",
      "Polished long handles provide micro-angle rotation control",
      "Ideal for nameboards, signage typography, & fine detailing work"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3020,
    "name": "Lettering Art Paint Brush Set",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 180.00",
    "sizes": [
      1
    ],
    "unit": " Set",
    "properties": [
      "8-Piece curated lettering brush kit containing No. 0 to No. 12",
      "Assortment of round, flat, and fine liners for dynamic typography",
      "Saves cost compared to buying individual lettering brushes",
      "Convenient protective vinyl rollup wrap included"
    ],
    "popular": false,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 3021,
    "name": "Classic Round Bristle Brush",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 20.00",
    "sizes": [
      2,
      4,
      6,
      8,
      10,
      12
    ],
    "unit": " No.",
    "properties": [
      "Fully Rounded Bristle head for tubular painting & corner cut-ins",
      "Tightly bound steel wire ferrule ensures zero hair release",
      "Ergonomic handle ensures even wrist rotation",
      "Excellent for iron pipes, railings, & structural metal works"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3022,
    "name": "Classic Round Painting Brush Set",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 220.00",
    "sizes": [
      1
    ],
    "unit": " Set",
    "properties": [
      "6-Piece round brush selection ranging from No. 2 to No. 12",
      "Strong natural bristles maintain shape after multiple washes",
      "Ideal for industrial painters and fabrication workshops",
      "Heavy duty cardboard tray keeps brushes organised"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3023,
    "name": "High Density Interior Wall Paint Roller",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 95.00",
    "sizes": [
      4,
      6,
      9
    ],
    "unit": " inch",
    "properties": [
      "Premium woven acrylic sleeve holds massive volumes of emulsion",
      "Extremely low-splatter design keeps the floors clean",
      "Ensures dynamic leveling with zero orange-peel textures on walls",
      "Reinforced heavy duty steel wire cage frame with threaded handle"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3024,
    "name": "Polyester Rugged Exterior Wall Roller",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 110.00",
    "sizes": [
      4,
      6,
      9
    ],
    "unit": " inch",
    "properties": [
      "Extra long 18mm nap polyester sleeve crawls into masonry gaps",
      "Solvent-resistant plastic core prevents collapsing during heavy work",
      "Optimized for acrylic exteriors, latex finishes, & cement paints",
      "Double-welded zinc steel frame prevents bending under hand pressure"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3025,
    "name": "Premium Mohair Smooth Finish Roller",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 140.00",
    "sizes": [
      4,
      6,
      9
    ],
    "unit": " inch",
    "properties": [
      "Pure Natural Mohair sleeve designed for premium gloss coating",
      "Lint-free design guarantees zero stray hairs in paint film",
      "Highly recommended for epoxies, urethanes, floor coatings, & lacquers",
      "Yields a glass-like finish on flat wood & metal surfaces"
    ],
    "popular": false,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 3026,
    "name": "Textured Foam Sponge Roller",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 65.00",
    "sizes": [
      4,
      6,
      9
    ],
    "unit": " inch",
    "properties": [
      "Fine-Cell High Density Polyurethane Foam sleeve",
      "Maintains uniform pressure for zero bubbling during application",
      "Perfect for water-based acrylic lacquers & light undercoat primers",
      "Saves paint consumption with thin uniform film laydowns"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3027,
    "name": "Gorila Cement Color Oxide Powder",
    "brand": "Gorila",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 95.00",
    "sizes": [
      1,
      25
    ],
    "unit": " kg",
    "properties": [
      "Ultra-fine premium grade metal oxide pigments",
      "Outstanding UV-resistance and lightfastness, never fades",
      "Excellent hiding power & tinting strength in plaster and cement mixes",
      "Perfect for paver blocks, terrazzo floors, pointing mortar, and designer concretes"
    ],
    "popular": true,
    "image": "https://5.imimg.com/data5/SELLER/Default/2022/10/SI/LI/TD/3923053/iron-oxide-red-powder-500x500.jpg",
    "shades": [
      {
        "name": "Red Oxide",
        "code": "Gorila Red",
        "hex": "#8B0000",
        "image": "https://5.imimg.com/data5/SELLER/Default/2022/10/SI/LI/TD/3923053/iron-oxide-red-powder-500x500.jpg",
        "price": "₹ 95.00"
      },
      {
        "name": "Yellow Oxide",
        "code": "Gorila Yellow",
        "hex": "#D4AF37",
        "image": "https://5.imimg.com/data5/SELLER/Default/2022/10/SZ/HL/MS/3923053/iron-oxide-yellow-powder-500x500.jpg",
        "price": "₹ 110.00"
      },
      {
        "name": "Green Oxide",
        "code": "Gorila Green",
        "hex": "#006400",
        "image": "https://5.imimg.com/data5/SELLER/Default/2022/10/PP/OQ/HL/3923053/green-oxide-powder-500x500.jpg",
        "price": "₹ 150.00"
      },
      {
        "name": "Blue Oxide",
        "code": "Gorila Blue",
        "hex": "#00008B",
        "image": "https://5.imimg.com/data5/SELLER/Default/2022/10/EX/OF/UI/3923053/blue-oxide-powder-500x500.jpg",
        "price": "₹ 160.00"
      },
      {
        "name": "Black Oxide",
        "code": "Gorila Black",
        "hex": "#1A1A1A",
        "image": "https://5.imimg.com/data5/SELLER/Default/2022/10/TK/VT/UK/3923053/black-oxide-powder-500x500.jpg",
        "price": "₹ 110.00"
      }
    ]
  },
  {
    "id": 3028,
    "name": "Standard Painting Tray (9 Inch)",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 75.00",
    "sizes": [
      9
    ],
    "unit": " inch",
    "properties": [
      "Heavy duty solvent-resistant plastic construction",
      "Ribbed pattern rolling ramp spreads paint evenly across the sleeve",
      "Stable flat base avoids tipping during busy shifts",
      "Slightly sloped reservoir channels paint back to the base efficiently"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 3029,
    "name": "Professional Masking Tape (General Purpose)",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 25.00",
    "sizes": [
      0.5,
      1,
      1.5,
      2,
      3
    ],
    "unit": " inch",
    "properties": [
      "Curried crepe paper with controlled adhesion properties",
      "Clean-peel adhesive leaves zero sticky residues behind up to 48 hours",
      "Resistant to water-based paint bleed-throughs",
      "Easy hand-tearable format makes work fast and painless"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4008,
    "name": "WeatherCoat Exterior Primer",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 160.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Superior Alkali and Efflorescence Resistance",
      "Excellent Bonding Medium for Exterior Top Coats",
      "Reduces Top Coat Paint Consumption significantly",
      "Fills Surface Porosity on Concrete walls"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4009,
    "name": "BP White Primer (Water Based)",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 120.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Fast-Drying Premium Acrylic Emulsion Primer",
      "Whites of extreme opacity and coverage strength",
      "Creates a solid chemical bond on plaster substrates",
      "Prevents paint patchiness and color variations"
    ],
    "popular": true,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 4010,
    "name": "BP Cement Primer (Solvent Based)",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 190.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Deep Penetrating Oil-Based Wall Sealer",
      "Locks Loose Chalky Grains on old plaster substrates",
      "Extremely Resistant to High Alkali Action",
      "Guarantees a permanent rust/damp seal under topcoats"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4012,
    "name": "Luxol Satin Finish",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Metals and Grills",
    "price": "₹ 310.00",
    "sizes": [
      0.5,
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Premium Soft Satin Non-Reflective Matt Finish",
      "Provides a highly sophisticated smooth silk luster",
      "Washable and Solvent-Resistant Surface",
      "Perfect for gates, metal window grilles, and wooden doors"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4014,
    "name": "PU Enamel",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Metals and Grills",
    "price": "₹ 390.00",
    "sizes": [
      0.5,
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Engineering Grade Polyurethane Coating",
      "Extreme Hardness & Absolute Scratch Shield",
      "Maintains Gloss and Color without Yellowing in UV",
      "Resists Mild Chemical Splashes and Heavy Impact"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4015,
    "name": "Home Shield Dampstop",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 350.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Crystalline Waterproofing Compound for Concrete & Plaster",
      "Withstands up to 7 Bars of Positive & Negative water pressure",
      "Blocks saltpeter efflorescence and bubbling of paint",
      "Single-Pack Easy Cold Brush Application"
    ],
    "popular": true,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 4016,
    "name": "Home Shield Latex Shield 2K",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 290.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Acrylic Polymer Modifier and Bonding Agent",
      "Increases Tensile & Flexural strength of mortar mixes",
      "Reduces Water Absorption and Cracking significantly",
      "Perfect for structural repair mortar, bathroom screeds, and roof seals"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4017,
    "name": "Home Shield Waterproof Putty",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 45.00",
    "sizes": [
      1,
      5,
      20,
      40
    ],
    "unit": "kg",
    "properties": [
      "Silicone Additive Hydrophobic Premium White Putty",
      "Creates a fully waterproof barrier under interior/exterior paints",
      "Fills and levels plaster pores with a super smooth touch",
      "Outstanding peeling resistance and high bonding strength"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4018,
    "name": "Home Shield Wall Shield 2K",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 420.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Elastomeric Acrylic-Cementitious Waterproofing Membrane",
      "Highly Flexible - Bridges Hairline Cracks comfortability",
      "Perfect for terrace roofs, water tanks, balconies, and wet areas",
      "Chemical and salt resistant breathable coating"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4019,
    "name": "BP Red Oxide Primer",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 110.00",
    "sizes": [
      0.5,
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Anti-Corrosive Metal Iron Oxide Sealer",
      "High-adhesion coat prevents rust formation on mild steel",
      "Offers an excellent level base for premium Luxol Enamels",
      "Tough, impact-resistant industrial standard primer"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2022/10/SI/LI/TD/3923053/iron-oxide-red-powder-500x500.jpg"
  },
  {
    "id": 4020,
    "name": "Luxol Metal Primer",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 160.00",
    "sizes": [
      0.5,
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Zinc Chromate-Based Heavy Duty Metal Primer",
      "Ultimate cathodic rust defense under harsh moisture weather",
      "Excellent leveling and wetting properties for steel and iron",
      "Professional trade choice for industrial fabrication, grills, & structures"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4021,
    "name": "BP White Wood Primer",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 140.00",
    "sizes": [
      0.5,
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Premium Wood Pore Sealing Undercoat Primer",
      "Prevents absorption of costly synthetic finishes",
      "Outstanding sandability for smooth surface preparation",
      "Inhibits wood moisture rot and tannin staining"
    ],
    "popular": false,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 4022,
    "name": "iPaint DIY Roller (9 Inch)",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 120.00",
    "sizes": [
      4,
      6,
      9
    ],
    "unit": " inch",
    "properties": [
      "High-Density Microfiber Sleeve for No-Splatter Painting",
      "Ensures dynamic paint pickup and flawless even discharge",
      "Robust rust-free steel cage with comfortable ergonomic grip",
      "Re-usable and easy to wash with water or thinners"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4023,
    "name": "Professional Heavy Duty Roller",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 180.00",
    "sizes": [
      9
    ],
    "unit": " inch",
    "properties": [
      "Heavy-Duty Woven Polyester sleeve with 12mm nap",
      "Perfect for rough masonry plaster, stucco, and brickwork",
      "Fitted with professional double-welded steel frame structure",
      "Outstanding speed and coverage on large exterior/interior walls"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4024,
    "name": "Home Shield Tile Adhesive Pro",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Tile Adhesives",
    "price": "₹ 15.00",
    "sizes": [
      20,
      40
    ],
    "unit": "kg",
    "properties": [
      "Polymer-Modified C-1 Grade Cementitious Tile Adhesive",
      "Outstanding slip resistance and open time duration",
      "Strong bonding on ceramic tiles, vitrified tiles, & mosaics",
      "Prevents hollow sounds and cracking after dry cures"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4025,
    "name": "Home Shield Epoxy Tile Grout",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Tile Adhesives",
    "price": "₹ 280.00",
    "sizes": [
      1,
      5
    ],
    "unit": "kg",
    "properties": [
      "Three-Component Stain-Free Waterproof Tile Grout",
      "Excellent chemical and mechanical resistance in kitchens & bathrooms",
      "Anti-fungal, anti-bacterial hygiene defense system",
      "Maintains vibrant, color-fast, non-cracking grout lines"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4026,
    "name": "Butterfly GP Silicone Sealant",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 160.00",
    "sizes": [
      280
    ],
    "unit": "ml",
    "properties": [
      "General Purpose Acetic-Curing Silicone Sealant",
      "Flexible elastic seal prevents water leaks and damp air drafts",
      "Ideal for glass window frames, basins, aluminum channels, and tiles",
      "Outstanding UV stable adhesion, never yellows or cracks"
    ],
    "popular": true,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 4027,
    "name": "Butterfly GP Pro Silicone Sealant",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Painting Tools",
    "price": "₹ 240.00",
    "sizes": [
      280
    ],
    "unit": "ml",
    "properties": [
      "Professional-Grade Heavy Duty High-Tension Sealant",
      "Elite elongation and high movement capability performance",
      "Outstanding structural bond strength on glass, ceramic, and metal",
      "Fungus-proof formula, perfect for clean-room and sanitary seals"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4028,
    "name": "Woodkeeper Melamine Gold",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 260.00",
    "sizes": [
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Two-Pack Premium Acid-Cured Melamine Wood Coating",
      "Preserves and accentuates natural grains with high transparency",
      "Outstanding resistance to alcohol, boiling tea/coffee, and hot water",
      "Excellent hard-wearing anti-abrasion protection layer"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4029,
    "name": "Imperia Gold PU Wood Finish",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 480.00",
    "sizes": [
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Ultra-Luxury Polyurethane Wood Coating Finish",
      "Superlative gloss and mirror depth finish with non-yellowing traits",
      "Excellent toughness, impact, and high-scratch protection",
      "Optimal flexibility adapts to seasonal timber contractions"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4030,
    "name": "Imperia Wood Block Primer",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 290.00",
    "sizes": [
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Two-Pack Polyurethane Blocking Undercoat Primer",
      "Stops tannin bleeding and oil leaching from oily teakwoods",
      "Provides a robust, highly stable foundation for top PU coats",
      "Outstanding sanding ease for swift professional operations"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4031,
    "name": "Protecton Epilux 155 Epoxy Primer",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Coatings",
    "price": "₹ 340.00",
    "sizes": [
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Two-Pack High-Build Polyamide-Cured Epoxy Primer",
      "Outstanding anti-corrosive protective film on steel surfaces",
      "High salt spray resistance, suitable for chemical atmospheres",
      "Can be topcoated with Epoxy, PU, or Chlorinated Rubber paints"
    ],
    "popular": true,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 4032,
    "name": "Protecton Epilux 155 HB Coating",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Coatings",
    "price": "₹ 380.00",
    "sizes": [
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Two-Pack High-Build Polyamide Epoxy Topcoat",
      "Provides excellent defense against water condensation & oil spills",
      "Very hard, abrasion-resistant gloss/semi-gloss coat",
      "Excellent chemical resistance on structural steel and tanks"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4033,
    "name": "Protecton Epilux 4 Zinc Rich Primer",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Coatings",
    "price": "₹ 520.00",
    "sizes": [
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Two-Pack Epoxy Zinc Rich Anticorrosive Primer",
      "Contains over 85% pure metallic zinc in dry film for cathodic defense",
      "Elite sacrificial protective coating for coastal and marine steel",
      "Outstanding solvent and chemical resistance profile"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4034,
    "name": "Protecton Epilux 4 HB Epoxy Coating",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Coatings",
    "price": "₹ 410.00",
    "sizes": [
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Two-Pack High-Build Epoxy Intermediary build paint",
      "Increases dry film thickness to enhance protection",
      "Tough, highly dense barrier protects steel against moisture ingress",
      "Highly recommended for fertilizer, pulp, and steel plants"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4035,
    "name": "Protecton Epilux 610 Epoxy Primer",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Coatings",
    "price": "₹ 360.00",
    "sizes": [
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Two-Pack Premium Amine-Adduct Cured Epoxy Primer",
      "Extreme chemical barrier resists strong acids, alkalis, & solvents",
      "Outstanding adhesion on mild steel, concrete, and masonry",
      "Approved for interior linings of chemical storage tanks"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4036,
    "name": "Protecton Epilux 610 HB Coating",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Coatings",
    "price": "₹ 420.00",
    "sizes": [
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Two-Pack Amine-Adduct High-Build Epoxy Topcoat",
      "Ultimate long-lasting resistance to chemical fumes and spillage",
      "Hard, smooth glass-like hygiene coating, easy to wash",
      "Perfect for pharmaceutical, chemical, and food processing plants"
    ],
    "popular": false,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 4037,
    "name": "Protecton Epilux 4 MIO Coating",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Coatings",
    "price": "₹ 350.00",
    "sizes": [
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Epoxy Micaceous Iron Oxide (MIO) Protective Shield",
      "Overlapping platelike crystal barrier blocks moisture & UV ingress",
      "Elite intermediate build coat on bridge girders & structural steel",
      "Outstanding resistance to marine, industrial, and salty air"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4038,
    "name": "Protecton Epilux 5 Coal Tar Epoxy",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Coatings",
    "price": "₹ 290.00",
    "sizes": [
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Two-Pack High-Build Coal Tar Epoxy Protective Coating",
      "Provides ultimate resistance to continuous water immersion",
      "Ideal for ship hulls, sewage pipelines, piling, and buried tanks",
      "Tough, highly flexible coal tar pitch and epoxy resin blend"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4039,
    "name": "Protecton Bergethane PU Finish",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "PU Coatings",
    "price": "₹ 480.00",
    "sizes": [
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Two-Pack Aliphatic Polyurethane High Gloss Topcoat",
      "Outstanding gloss retention and anti-chalking in blazing sun",
      "Highly resistant to weathering, salt air, and chemical splashes",
      "Perfect exterior protection for chemical tanks, pipelines, & bridges"
    ],
    "popular": true,
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4040,
    "name": "Protecton Epilux HBTL Coal Tar Epoxy",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Coatings",
    "price": "₹ 310.00",
    "sizes": [
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Two-Pack High Build Tar Liquid (HBTL) Epoxy",
      "Combines high solids with thick barrier protective properties",
      "Outstanding resistance to sea water, crude oil, and mild chemicals",
      "Widely specified for harbor jetties, sluice gates, and water treatment plants"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4041,
    "name": "Protecton Epilux SLX Self Leveling Epoxy",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Coatings",
    "price": "₹ 450.00",
    "sizes": [
      15,
      30
    ],
    "unit": "kg",
    "properties": [
      "Three-Component Self-Leveling Seamless Epoxy Flooring",
      "Provides a super-flat, joint-free, high-gloss sanitary floor",
      "Outstanding impact, wear, and heavy-duty forklift wheel resistance",
      "Excellent resistance to chemicals, oils, detergents, and water"
    ],
    "popular": true,
    "image": "https://m.media-amazon.com/images/I/61CQJQ-iQtL._SL1080_.jpg"
  },
  {
    "id": 4042,
    "name": "Protecton Lumeros Heat Resisting Aluminium Paint",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "PU Coatings",
    "price": "₹ 460.00",
    "sizes": [
      1,
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Single-Pack Lumeros Heat-Resisting Aluminum Paint",
      "Withstands temperatures up to 600°C without blistering",
      "Lustrous reflective silver finish helps reduce radiative heat loss",
      "Ideal for chimneys, boiler vents, exhausts, and steel furnace doors"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4043,
    "name": "Protecton Red Oxide Metal Primer IS 2339",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 150.00",
    "sizes": [
      1,
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Single-Pack Synthetic Red Oxide Primer conforming to IS 2339",
      "High anticorrosive performance for structural steel fabrications",
      "Excellent brushing properties, good wet edge, and quick air dry",
      "Standard trade anti-rust primer for building metal structures"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2022/10/SI/LI/TD/3923053/iron-oxide-red-powder-500x500.jpg"
  },
  {
    "id": 4044,
    "name": "Protecton Grey Oxide Zinc Chromate Primer",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 160.00",
    "sizes": [
      1,
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Single-Pack High Corrosion Protective Grey Primer",
      "Formulated with Zinc Chromate pigments for chemical passivation",
      "Outstanding adhesion on steel sheets and structural trusses",
      "Ensures high build foundation and excellent topcoat adhesion"
    ],
    "popular": false,
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=80&w=600"
  },
  {
    "id": 4045,
    "name": "Protecton Yellow Zinc Chromate Primer",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 170.00",
    "sizes": [
      1,
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Single-Pack Passivating Yellow Zinc Chromate Primer",
      "Specially designed for non-ferrous metals like aluminum and galvanized iron",
      "Outstanding chemical rust-inhibitive passivation barrier",
      "Superb bonding properties for polyurethane and epoxy coatings"
    ],
    "popular": false,
    "image": "https://5.imimg.com/data5/SELLER/Default/2022/10/SZ/HL/MS/3923053/iron-oxide-yellow-powder-500x500.jpg"
  },
  {
    "id": 5001,
    "name": "MRF MetalCoat Polyurethane Finish",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Metals and Grills",
    "price": "₹ 1,150.00",
    "sizes": [
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Two-component premium polyurethane (PU) coat",
      "Outstanding non-yellowing high-gloss or matt finish",
      "Superior abrasion, scratch, and chemical splash resistance",
      "Perfect for premium metal gates, automotive touchups, and structures"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2025/07/MetalCoat.webp"
  },
  {
    "id": 5002,
    "name": "MRF AquaFresh Interior Emulsion",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 680.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Premium polyurethane-fortified interior emulsion paint",
      "Exceptional washability and outstanding scrub resistance",
      "Superior wall stain guard with beautiful rich soft-sheen",
      "Advanced antimicrobial protection resisting mold and fungal growth"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/aquafresh-int-copy.png"
  },
  {
    "id": 5003,
    "name": "MRF Zameen Floor Coat",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "PU Coatings",
    "price": "₹ 1,350.00",
    "sizes": [
      1,
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Heavy-duty premium polyurethane floor finish",
      "Extreme durability resisting abrasion, forklift, and car tire traffic",
      "Excellent resistance to oil, grease, detergents, and chemical spills",
      "Ideal for concrete driveways, garage floors, showrooms, and sports courts"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/zameen-copy.png"
  },
  {
    "id": 5004,
    "name": "MRF GlassCoat specialty PU Finish",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "PU Coatings",
    "price": "₹ 1,650.00",
    "sizes": [
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "High-adhesion specialty polyurethane coating for glass",
      "Superb resistance to scratch, hot water, and UV discoloration",
      "Highly customizable effects including frost, translucent, and metallic",
      "Perfect for architectural glass panels, partition panels, and designer mirrors"
    ],
    "popular": false,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/Glasscoat.webp"
  },
  {
    "id": 5005,
    "name": "MRF Campus Shine Exterior Emulsion",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 1,280.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Premium exterior acrylic emulsion with superior gloss retention",
      "Highly elastomeric properties with outstanding hairline crack bridging",
      "Superior dirt pick-up resistance and dust repellent technology",
      "Provides 7+ years of comprehensive anti-algal & waterproofing shield"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/campus-shine.png"
  },
  {
    "id": 5006,
    "name": "MRF AquaCoat 1K PU Wood Finish",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 980.00",
    "sizes": [
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Water-based high-performance interior 1K PU wood finish",
      "Eco-friendly, extremely low VOC and virtually odorless formulation",
      "Excellent scratch, hot water, and household chemical resistance",
      "Enhances natural wood grain with exceptional depth and clarity"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/aquacoat-1k-pu.png"
  },
  {
    "id": 5035,
    "name": "Silk Glamor Matt",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 488.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Luxurious matt emulsion paint for interior walls",
      "Matt",
      "120-130 sq.ft/litre"
    ],
    "popular": true,
    "image": "https://images.bergerpaints.com/s3fs-public/2025-07/Silk_Glamor_Matt_17-1x.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5036,
    "name": "Silk Glamor High Sheen",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 472.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "An interior emulsion for glamourous, long-lasting look",
      "High Sheen",
      "120-130 sq.ft/litre"
    ],
    "popular": true,
    "image": "https://images.bergerpaints.com/s3fs-public/2025-07/Silk_Glamor_Hi_Sheen_0.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5037,
    "name": "Silk Glamor Soft Sheen",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 405.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A premium-quality interior emulsion for rich look",
      "High Sheen",
      "120-130 sq.ft/litre"
    ],
    "popular": true,
    "image": "https://images.bergerpaints.com/s3fs-public/2025-07/Big-Silk_Glamor_Soft_Sheen_0.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5038,
    "name": "Silk Glamor Dazzle",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 527.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A super luxury interior wall paint that delivers a fresh, rich, and long-lasting glossy finish.",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": true,
    "image": "https://images.bergerpaints.com/s3fs-public/2025-07/Silk_Dazzle_Ultra_Hi..._.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5039,
    "name": "Easy Clean",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 532.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A solution with great appearance and washability",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Easy%20Clean%20can_0.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5040,
    "name": "Easy Clean Silky Touch",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 378.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Stain-resistant, smooth, washable paint with crack prevention.",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2024-12/Easy%20Clean%20Silky%20Touch%20%282%29%20%281%29.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5041,
    "name": "Easy Clean Fresh",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 385.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A sophisticated interior finish prevents stubborn stains",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Easy%20Clean%20Fresh%20can.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5042,
    "name": "Rangoli Rich Matt",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 456.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "100% Acrylic Emulsion with Rich Matt Finish along with superior hiding & coverage",
      "Matt",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2025-09/Rangoli_Matt_Rich_1L-removebg-preview.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5043,
    "name": "Rangoli Total Care",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 371.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "For a smooth finish with bio-resistant formula",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2025-09/Rangoli_Total_Care-removebg-preview_0.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5044,
    "name": "Bison Glow",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 476.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "An acrylic water-based emulsion for interior walls",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Bison%20Glow%20can.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5045,
    "name": "Bison Emulsion",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 453.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "An interior emulsion paint for sheen finish",
      "Smooth",
      "140-150 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-09/Bison%20Can%20Shot.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5046,
    "name": "Bison Lite",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 489.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Achieve a premium finish and enhanced durability with Bison Lite.",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-11/tmp_9c85c9db-7e50-4c13-89ef-0ef211458fe2-fotor-bg-remover-20231108153920.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5047,
    "name": "GlamArt Italian Collection Diamond",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 538.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Dazzling glitter texture creating starry, luxurious wall effects",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2026-01/Product%20Page_0.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5048,
    "name": "GlamArt Italian Collection Velluto",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 365.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Velvet-inspired pearlescent texture with subtle metallic richness appeal",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2026-01/Product%20Page_1.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5049,
    "name": "GlamArt Italian Collection Panama",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 383.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Pearlescent sandblast texture inspired by rich cultural elegance.",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2025-12/Product%20Page.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5050,
    "name": "GlamArt Italian Collection Decorative Primer",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 516.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "High-adhesion pigmented acrylic primer for decorative finishes application.",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2026-01/11%20%281%29.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5051,
    "name": "GlamArt Italian Collection Soffio",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 490.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Marble flaky texture with iridescent sheen for luxury.",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2026-01/Product%20Page.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5052,
    "name": "GlamArt Italian Collection Damasco",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 436.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Pearlescent damask texture delivering elegant, opulent wall aesthetics.",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2026-01/Product%20Page_2.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5053,
    "name": "Silk Glamart Metallica",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 450.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A luxurious metallic finish for multiple surfaces",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-07/silk-glamart-metallica-can.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5054,
    "name": "Silk GlamArt Non Metallic",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 542.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "100% acrylic emulsion solution for texture application",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Silk%20GlamArt%20Non%20Metallic%20can_0.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5055,
    "name": "Silk GlamArt Metallica for Designs",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 544.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A slow-drying, glossy metallic special effect paint for stunning designer finishes",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-04/silk-glamart-metallica-for-designs-can_2.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5056,
    "name": "Silk GlamArt Stucco",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 450.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "An interior emulsion for marble textured finish",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Silk%20GlamArt%20Stucco%20can.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5057,
    "name": "Silk GlamArt Vintage",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 383.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A ready-to-use finish for special effects",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Silk%20GlamArt%20Vintage%20can.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5058,
    "name": "Silk Glamart Stones & Tones",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 418.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Emulsion coating with quartz and marble powder",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Silk%20GlamArt%20Stones%20_%20Tones%20can.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5059,
    "name": "Ceiling White",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 534.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Berger Ceiling White takes the guesswork out of painting",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2024-04/ceiling-white-can.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5060,
    "name": "Silk Metallics",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 440.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "An acrylic water-based emulsion Metallic finish",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2025-12/silk%20metallics%20can%20600%20600.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5061,
    "name": "Kolor Plus",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 445.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Superior color retention and a beautiful smooth finish for your walls.",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2025-06/Kolor%20Plus%20600-600.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5062,
    "name": "Kolor Plus Glow",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Wall",
    "price": "₹ 451.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Superior colour retention for your walls and gives them a beautiful, smooth & glowing finish.",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2026-04/3D%20Kolor%20Plus%20Glow%202_1-4Lt%20copy.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5063,
    "name": "Weathercoat Long Life 15",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 630.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Engineered with amalgamation of nano technology and PU chemistry, WeatherCoat Long Life 15 is an ultra-high performance exterior paint with special gr...",
      "Weather protection",
      "High durability"
    ],
    "popular": true,
    "image": "https://images.bergerpaints.com/s3fs-public/2024-10/longlife%2015%20can_enhanced.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5064,
    "name": "Weathercoat Long Life 10",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 556.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "It is a luxury category high-performance exterior emulsion. The first paint to use PU & Silicon Technology it is designed for heavy rainfall areas...",
      "Weather protection",
      "High durability"
    ],
    "popular": true,
    "image": "https://images.bergerpaints.com/s3fs-public/2025-02/Longlife%2010%20-%20paint%20can-02%20%281%29.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5065,
    "name": "Weathercoat Long Life Flexo",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 480.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Weathercoat Long Life Flexo high-performance exterior paint comes with Elastomeric property that help cover hairline cracks. It's Silicon additives he...",
      "Weather protection",
      "High durability"
    ],
    "popular": true,
    "image": "https://images.bergerpaints.com/s3fs-public/2024-10/Weathercoat%20Long%20Life%20Flexo.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5066,
    "name": "Weathercoat Anti Dustt Kool",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 371.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "India's most popular dust repellent paint now comes with heat reflective nano-tech. Weathercoat Anti Dustt Kool's unique formulation provides excellen...",
      "Weather protection",
      "High durability"
    ],
    "popular": true,
    "image": "https://images.bergerpaints.com/s3fs-public/2024-10/anti-dustt-kool-can_enhanced-removebg.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5067,
    "name": "Weathercoat Anti Dustt",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 371.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Weathercoat Anti Dustt, 100% acrylic emulsion exterior wall paint with its unique Dust Guard technology. It doesn’t allow dust to settle on exterior w...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2024-10/weathercoat-anti-dustt-can__1_-removebg-preview.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5068,
    "name": "Weathercoat Glow",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 329.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Weathercoat Glow is 100% acrylic outdoor wall paint that can withstand diverse weather conditions. Its stay-clean technology helps wash off dust with ...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-11/Long%20Life%2015-2.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5069,
    "name": "Weathercoat Champ",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 317.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Weathercoat Champ weatherproof emulsion is an acrylic paint that gives your house all round protection from Weather extremeties. Its soft sheen finish...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2024-05/WC%20Champ%20600x600.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5070,
    "name": "Walmasta Glow",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 202.10",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "It is a water based acrylic emulsion for exterior walls. The paint provides soft sheen finish and superior durability as compared to regular emulsions...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2024-10/Walmasta%20Glow%20paint%20can-02_enhanced.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5071,
    "name": "Walmasta",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 188.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Walmasta Advanced is a water based acrylic exterior emulsion suitable for for dry and low humid climatic condition. It is a matt finish paint and prov...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-09/Walmasta%20can.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5072,
    "name": "Walmasta Lite",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 138.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Walmasta Lite acrylic emulsion based exterior paint is an economically priced paint with a matt finish. The paint is resistant to chalking, flaking, f...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-09/walmasta%20lite%20can%20%281%29.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5073,
    "name": "Florentina Vintage",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 481.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Florentina Vintage is a high build product based on cutting edge technology providing decorative effects. This product contains specially designed pur...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Florantina%20vintage%20paint%20can-02.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5074,
    "name": "Florentina Sandstone",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 487.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Florentina Sand Stone is a water-based pure acrylic resin texture body coat with natural granite chip and pearl effect. The silicon additives offer wa...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Floranita%20Sandstone%20paint%20can-02.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5075,
    "name": "Florentina Glitteratti",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 353.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Florentina Glitterati is a synthetic natural stone like textured finish providing attractive decorative effects in line with the ‘Florentina Luxury Co...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Florantina%20Glitteratti%20paint%20can-02_0.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5076,
    "name": "Solitaire Granite",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 421.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A synthetic natural stone like spray applied finish based on pure acrylic emulsion reinforced with natural, colored aggregates and quartz.",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Solitaire%20granite%20paint%20can-02.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5077,
    "name": "Solitaire Stone",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 465.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "It provides excellent protection against fungal and microbial growth on exterior surfaces, ensuring a long-lasting paint finish. The product is low in...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Solitaire%20stone%20paint%20can-02.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5078,
    "name": "Ruff & Tuff Pearl",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 386.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A copolymer emulsion based spray applied texture– can be done in Bold, Medium and Small Sizes. Bubble and Splattered finishes can be obtained.",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/ruff_n_tuff%20paint%20can-02.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5079,
    "name": "Ruff & Tuff Scratch",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 534.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Formulated with modified acrylic emulsion and reinforced with quartz aggregates to withstand humidity, rain and variable climates. Used for decoration...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/ruff_n_tuff%20paint%20can-02_5.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5080,
    "name": "Ruff & Tuff Decora Rollercast",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 375.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A copolymer Acrylic emulsion based textured coating reinforced with quartz & marble powder, which reasonably helps to hide surface defects and pro...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/ruff_n_tuff%20paint%20can-02_0.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5081,
    "name": "Ruff & Tuff Decora Rollercoat",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 496.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "A copolymer Acrylic emulsion based textured coating reinforced with quartz & marble powder, which reasonably helps to hide surface defects and pro...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/ruff_n_tuff%20paint%20can-02_1.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5082,
    "name": "Ruff & Tuff Decora Dholpur Stone",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 535.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "It produces excellent stone like pattern and offers long lasting protection to the building’s structure. ",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/ruff_n_tuff%20paint%20can-02_2.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5083,
    "name": "Weathercoat Long Life PU Tile Coat",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 383.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Longlife PU Tile coat acrylic emulsion is a high durable paint for roof tiles. It's PU formulation provides superior sheen finish & superior stren...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/longlife%20pu%20tile%20can.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5084,
    "name": "Weathercoat Floor Protector",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 363.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Weathercoat Floor Protector is a acrylic paint  for concrete floors. The paint provides excellent substrate adhesion and best in class abrasion r...",
      "Weather protection",
      "High durability"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2024-04/Weathercoatfloorprotector.png?format=webp&width=640&quality=75"
  },
  {
    "id": 5007,
    "name": "MRF Durothane PU Wood Finish",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 890.00",
    "sizes": [
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Premium two-pack polyurethane wood coating",
      "Exceptional gloss retention and clarity that highlights wood grain",
      "Outstanding resistance to scratching, water, and domestic chemicals",
      "Suitable for both interior wood surfaces and heavy-wear areas"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/Durothane.webp"
  },
  {
    "id": 5008,
    "name": "MRF AquaFresh Cool",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Wall",
    "price": "₹ 1,320.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Advanced heat-reflective exterior wall coating",
      "Reduces surface temperature to keep interiors significantly cooler",
      "Outstanding resistance to UV radiation, extreme weather, and color fading",
      "Strong anti-algal, anti-fungal, and waterproofing properties"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/aquafresh-cool-copy.png"
  },
  {
    "id": 5009,
    "name": "MRF Acrylic Super Fine Wall Putty",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 420.00",
    "sizes": [
      1,
      5,
      20,
      40
    ],
    "unit": "kg",
    "properties": [
      "Acrylic-based premium putty for a perfectly smooth, super-fine finish",
      "Excellent filling properties for hairline cracks, holes, and undulations",
      "Superior water resistance and strong adhesion to plaster",
      "Acts as an ideal foundation, enhancing topcoat coverage and finish"
    ],
    "popular": false,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/Arcylic-super-fine-New.webp"
  },
  {
    "id": 5010,
    "name": "MRF Altura Metallic Finish",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Metals and Grills",
    "price": "₹ 1,450.00",
    "sizes": [
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Water-based high-performance metallic color paint",
      "Produces a luxurious high-gloss metallic sheen on metal, wood, and concrete",
      "GreenPro Certified eco-friendly formulation with extremely low VOC",
      "Highly durable finish offering superior protection against corrosion and microbes"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/altura-metalic.png"
  },
  {
    "id": 5011,
    "name": "MRF AquaFresh PU Wall Primer",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 320.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Premium polyurethane dispersion (PUD) based water primer",
      "Excellent binding properties with superior adhesion to masonry walls",
      "Provides a strong, even foundation that enhances topcoat sheen and quality",
      "High opacity and exceptional coverage for maximum efficiency"
    ],
    "popular": false,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/aquafresh-wall-primer-copy.png"
  },
  {
    "id": 5012,
    "name": "MRF Altura 2-in-1 Wall Primer",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 350.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Dual action 2-in-1 formulation for both interior and exterior wall sealing",
      "GreenPro Certified eco-friendly and low-odor composition",
      "Superb opacity that effectively masks plaster undulations",
      "Optimizes topcoat paint consumption by providing uniform suction"
    ],
    "popular": false,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/altura-wall-primer-copy.png"
  },
  {
    "id": 5013,
    "name": "MRF Sello 2-in-1 Wall Primer",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 280.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Specially designed sealer-primer offering deep penetration",
      "Provides a robust barrier against moisture, alkali, and efflorescence",
      "Extremely cost-effective with high coverage and great wet-edge time",
      "Strong fungal and algal resistance to keep plaster healthy"
    ],
    "popular": false,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/Untitled-design-20.png"
  },
  {
    "id": 5014,
    "name": "MRF Solvent Thinnable Wall Primer",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Undercoats",
    "price": "₹ 310.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "unit": "L",
    "properties": [
      "Solvent-thinnable deep binding masonry primer",
      "Deeply penetrates porous plaster and chalky surfaces to secure plaster",
      "Exceptional resistance to high alkalinity and dampness",
      "Forms a tough, impermeable protective undercoat for exterior topcoats"
    ],
    "popular": false,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/solvant-thinnable-wall-primer-4.png"
  },
  {
    "id": 5015,
    "name": "MRF Woodstain Wood Finish",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 400.00",
    "sizes": [
      1
    ],
    "unit": "L",
    "properties": [
      "Deep penetrating solvent-based wood stainer",
      "Highlights the natural wood grains and patterns beautifully",
      "Excellent transparency and color-fastness resisting fading",
      "Compatible as an undercoat for Melamine and PU finishes"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/freshwood-interior.png"
  },
  {
    "id": 5016,
    "name": "MRF Melamine Aura Wood Finish",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 480.00",
    "sizes": [
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Premium acid-cured two-pack melamine wood coating",
      "Excellent flow, leveling, and magnificent optical clarity",
      "Outstanding heat, water, scratch, and household stain resistance",
      "Preserves natural wood beauty with a superior rich finish"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/melamine-aura-scaled.webp"
  },
  {
    "id": 5017,
    "name": "MRF Polyurethane Thinner",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "Thinners & Solvents",
    "price": "₹ 270.00",
    "sizes": [
      1,
      5,
      20
    ],
    "unit": "L",
    "properties": [
      "Specially formulated dilution solvent for MRF Polyurethane (PU) coatings",
      "Ensures optimal paint viscosity, flawless leveling, and maximum gloss",
      "Prevents orange peel, micro-bubbling, and dry spray defects",
      "Perfect for cleaning spray equipment and paint tools"
    ],
    "popular": true,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/1/FU/YJ/AM/2220962/industrial-thinner-500x500.png"
  }
];
