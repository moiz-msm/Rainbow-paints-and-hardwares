import { applyStandardEnamelIndustrialShades } from "./constants/industrialEnamelShades";

export const topCategories = ["All Categories", "Home Paint", "Industrial", "Adhesives", "Power Tools"];

export const subCategories: Record<string, string[]> = {
  "Home Paint": [
    "All Home Paint",
    "Interior Paint",
    "Interior Texture",
    "Exterior Paint",
    "Exterior Texture",
    "Primers",
    "Waterproofing",
    "Wood Finishes",
    "Enamel Paint",
    "Painting Tools",
    "Thinners & Solvents",
    "Tile Adhesives"
  ],
  "Power Tools": [
    "All Power Tools",
    "Power Tools"
  ],
  Industrial: [
    "Industrial Paint and Coatings",
    "PU Paint",
    "Epoxy Paint",
    "Synthetic Enamels"
  ],
  Adhesives: [
    "All Adhesives",
    "Wood Adhesives",
    "Synthetic Resin",
    "Contact Adhesives"
  ]
};

export const brands = [
  "All Brands",
  "Asian Paints",
  "Berger Paints",
  "Dr. Fixit",
  "MRF Vapocure",
  "Sheenlac",
  "Fevicol",
  "Just Spray",
  "Birla White",
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
    logo: "https://sheenlac.com/assets/images/sheenlac_logo.png",
    description:
      "India's wood-finishing pioneer — premium wood coatings, stains, NC thinners, wood polish, and paint removers of exceptional grade.",
    tags: ["Wood Polish", "NC Thinner", "Stainer", "Paint Remover"],
    isAuthorised: true
  },

  {
    name: "Fevicol",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/05/Fevicol_brand_logo.png",
    description:
      "India's most trusted adhesive brand. High-performance synthetic resin and contact adhesives for woodworking, laminates, and general purposes.",
    tags: ["Adhesives", "Wood Glue", "Synthetic Resin", "Pidilite"],
    isAuthorised: true
  },

  {
    name: "Just Spray",
    logo: "https://justspray.in/wp-content/uploads/2024/10/JustSpray-logo-a-1024x518.png",
    description:
      "Premium JS1 aerosol spray paint. High-performance quick-drying formula offering professional finish in classic, metallic, fluorescent, and primer variations.",
    tags: ["JS1", "Spray Paint", "Aerosol"],
    isAuthorised: true
  },

  {
    name: "Birla White",
    logo: "https://www.birlawhite.com/logo.svg",
    description:
      "India's largest manufacturer of White Cement and WallCare Putty, providing the whitest white cement for beautiful and enduring structures.",
    tags: ["Putty", "White Cement", "Primers"],
    isAuthorised: true
  },

  {
    name: "Ajax",
    logo: "https://m.media-amazon.com/images/I/71DPemfY7hL.jpg",
    description:
      "Superior quality abrasive materials — waterproof water emery papers and red dry emery papers for smooth surface preparation.",
    tags: ["Emery Paper", "Abrasives", "Sanding Paper", "Rolls"],
    isAuthorised: true
  },

  {
    name: "Bawa",
    logo: "https://placehold.co/400x400/1976D2/FFFFFF/png?text=Bawa",
    description:
      "Premium painter-grade paint brushes including Joker, Prince, Touchwood and Snowcem series built for absolute application control.",
    tags: ["Joker Brush", "Prince Brush", "Touchwood Brush", "Snowcem Brush"],
    isAuthorised: true
  },

  {
    name: "Jaya",
    logo: "https://placehold.co/400x400/388E3C/FFFFFF/png?text=Jaya",
    description:
      "High-density Diamond series painting brushes crafted for even distribution, zero hair loss, and beautiful streak-free coat results.",
    tags: ["Diamond Brush", "Painting Brushes", "Brushes"],
    isAuthorised: true
  },

  {
    name: "Gorila",
    logo: "https://placehold.co/400x400/795548/FFFFFF/png?text=Gorila",
    description:
      "Vibrant high-pigmentation cement color oxide powders. Superior UV stability and perfect shade formulation for all architectural mixes.",
    tags: ["Cement Oxide", "Oxide Powder", "Color Powder"],
    isAuthorised: true
  },

  {
    name: "Local",
    logo: "https://placehold.co/400x400/9E9E9E/FFFFFF/png?text=Local",
    description:
      "Distributor-selected general hardware essentials, pure unbranded mineral solvents, rollers, and painting trays of trade quality.",
    tags: ["Turpentine Oil", "Cotton Waste", "Masking Tape", "Painting Rollers"],
    isAuthorised: false
  }
];

const rawMockProducts = [

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
    "image": "https://m.media-amazon.com/images/I/51T6-pkLNNL._SL1000_.jpg"
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
    "image": "https://m.media-amazon.com/images/I/41M-Avc4IoL.jpg"
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
    "image": "https://m.media-amazon.com/images/I/51uSaM1pXOL.jpg"
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
    "image": "https://m.media-amazon.com/images/I/61KB34kxuSL.jpg"
  },
  {
    "id": 1023,
    "name": "Apex Ezytex",
    "description": "Apex Ezytex is a modified acrylic, dolomite-based product used to create innovative trowel-based patterns for interior and exterior walls. It hides fine cracks and features an anti-algal formula.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 60.00",
    "properties": [
      "Dolomite Based",
      "Innovative Patterns",
      "Anti-Algal Formula"
    ],
    "sizes": [25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex-ezytex-new-packshot.png"
  },
  {
    "id": 1020,
    "name": "Apex Createx Scratch Finish",
    "description": "Apex Createx Scratch Finish is an intermediate texture coating that provides a unique scratched pattern. It offers superior adhesion and is designed to hide fine cracks and protect exterior walls.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 106.25",
    "properties": [
      "Scratched Pattern",
      "Superior Adhesion",
      "Hides Fine Cracks"
    ],
    "sizes": [25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex-Createx-Sack.png"
  },
  {
    "id": 1021,
    "name": "Apex Createx Roller Finish",
    "description": "Apex Createx Roller Finish is a high-quality exterior texture that creates a distinctive rolled pattern. It acts as an intermediate finish, offering excellent protection, hiding surface undulations, and ensuring long-lasting durability.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 179.25",
    "properties": [
      "Rolled Pattern",
      "Hides Undulations",
      "Long Lasting Durability"
    ],
    "sizes": [20],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex-Createx-Sack.png"
  },
  {
    "id": 1022,
    "name": "Apex Createx Dholpur",
    "description": "Apex Createx Dholpur gives your exterior walls the timeless and premium look of Dholpur stone. It is a highly durable intermediate texture that masks fine cracks and provides excellent weather resistance.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 142.50",
    "properties": [
      "Premium Dholpur Look",
      "Weather Resistance",
      "Highly Durable"
    ],
    "sizes": [5, 25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex-Createx-Sack.png"
  },
  {
    "id": 1016,
    "name": "Apex Duracast Swirl Tex",
    "description": "A premium textured finish designed with a unique engraved swirl pattern. It provides style and strength, ensuring long-term protection for your exterior walls.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 55.00",
    "properties": [
      "Engraved Swirl Pattern",
      "Superior Adhesion",
      "Hides Fine Cracks"
    ],
    "sizes": [25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex_Duracast_Swirltex.png"
  },
  {
    "id": 1017,
    "name": "Apex Duracast Cross Tex",
    "description": "A high-performance silica-based acrylic texture that creates striking trowel-based cross patterns. It adds depth and dimension while protecting surfaces from harsh weather.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 55.00",
    "properties": [
      "Striking Trowel Patterns",
      "Weather Resistant",
      "High Durability"
    ],
    "sizes": [25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex_Duracast_Crosstex.png"
  },
  {
    "id": 1018,
    "name": "Apex Duracast Dholpur Tex",
    "description": "Inspired by classic Dholpur stone, this acrylic-modified resin texture delivers a rugged stone-brick brushing effect, elevating the architectural appeal of any building.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 67.25",
    "properties": [
      "Dholpur Stone Finish",
      "Modified Acrylic Resin",
      "Architectural Appeal"
    ],
    "sizes": [25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex_Duracast_Dholpurtex.png"
  },
  {
    "id": 1019,
    "name": "Apex Duracast Fine Tex",
    "description": "A modified acrylic, water-based exterior texture offering a subtle yet distinctive finish. It enhances topcoat adhesion and can be styled into Cane Weave, Honeycomb, or Ripple patterns.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 133.96",
    "properties": [
      "Subtle Fine Texture",
      "Versatile Styling",
      "Enhances Topcoat"
    ],
    "sizes": [5, 20],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex_Duracast_Finetex.png"
  },
  {
    "id": 1011,
    "name": "Royale Play Safari",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 365.00",
    "properties": [
      "Special Effects Paint",
      "Metallic & Non-Metallic Tones",
      "Desert Safari Inspired Finish"
    ],
    "sizes": [1, 5],
    "popular": false,
    "image": "/assets/aistudio/royale_play_safari_packshot_hd.jpg"
  },
  {
    "id": 1012,
    "name": "Apex Duracast Pebble Tex",
    "description": "An acrylic, water-based texture finish that creates a unique bubble or headcut pattern via spray application. It combines aesthetic appeal with robust weather performance.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 50.67",
    "properties": [
      "Bubble/Headcut Pattern",
      "Spray Application",
      "Robust Performance"
    ],
    "sizes": [5, 30],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Apex_Duracast_Pebbletex.png"
  },
  
  
  
  
  
  {
    "id": 9009,
    "name": "Royale Play Stucco",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 175.80",
    "properties": [
      "Marble-like Finish",
      "Highly Durable",
      "Special Effects Paint"
    ],
    "sizes": [1, 5],
    "popular": false,
    "image": "/assets/aistudio/royale_play_stucco_packshot_hd.jpg"
  },
  {
    "id": 1010,
    "name": "Apex Duracast Rough Tex",
    "description": "Designed to give buildings a unique, bold look, Rough Tex withstands harsh weather conditions, offering long-lasting protection and character to exterior masonry.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 57.50",
    "properties": [
      "Bold Unique Look",
      "Harsh Weather Protection",
      "Long Lasting"
    ],
    "sizes": [25],
    "unit": "kg",
    "popular": false,
    "image": "https://static.asianpaints.com/content/dam/asian_paints/products/packshots/Roughtex-packshot.png"
  },
  {
    "id": 1002,
    "name": "Royale Glitz Reserve",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "/assets/aistudio/royale_glitz_reserve_packshot_hd.jpg"
  },
  {
    "id": 1003,
    "name": "Royale Glitz Ultra Matt",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "/assets/aistudio/royale_glitz_ultra_matt_packshot_hd.jpg"
  },
  {
    "id": 1004,
    "name": "Apcolite All Protek Matt",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "/assets/aistudio/apcolite_all_protek_matt_packshot_hd.jpg"
  },
  {
    "id": 1005,
    "name": "Apcolite All Protek Shyne",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "/assets/aistudio/apcolite_all_protek_shyne_packshot_hd.jpg"
  },
  {
    "id": 1006,
    "name": "Apex Ultima Stretch",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "subCategory": "Exterior Paint",
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
    "image": "/assets/aistudio/apex_floor_guard_packshot_hd.jpg"
  },
  {
    "id": 1008,
    "name": "Apex Tile Guard",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "/assets/aistudio/apex_tile_guard_packshot_hd.jpg"
  },
  {
    "id": 1009,
    "name": "Apex Tile Guard Matt",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "/assets/aistudio/apex_tile_guard_packshot_hd.jpg"
  },
  {
    "id": 1001,
    "name": "Apex Ultima",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "/assets/aistudio/apex_ultima_packshot_hd.jpg"
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
    "image": "https://m.media-amazon.com/images/I/31rojOLdl6L.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/1/482154179/YQ/DH/SG/1774309/dr-fixit-pidifin-2k-waterproofing-chemical-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/8/336094569/TV/WV/BG/11348985/dr-fixit-301-pidicrete-urp-waterproofing-chemical-1000x1000.jpeg"
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
    "name": "604 PRIMESEAL Interior and Exterior Wall Primer",
    "slug": "604-primeseal",
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/8/335815699/QT/GO/BG/11348985/dr-fixit-raincoat-neo-waterproofing-chemical-1000x1000.jpeg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/3/494665028/MD/DL/EU/1774309/dr-fixit-bathseal-tape-1000x1000.png"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/9/542738527/HA/OH/DO/193587917/dr-fixit-103-repellent-wire-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/DQ/RC/BH/SELLER-1774309/sikadur-32-bonding-agent-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/PDFImage/2025/3/496114877/HY/ME/EJ/1774309/fosroc-renderoc-sp40-1000x1000.png"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/3/493746631/LT/GP/FI/1774309/dr-fixit-super-latex-1000x1000.webp"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/8/336094569/TV/WV/BG/11348985/dr-fixit-301-pidicrete-urp-waterproofing-chemical-1000x1000.jpeg"
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
    "image": "https://5.imimg.com/data5/SELLER/PDFImage/2025/3/496114877/HY/ME/EJ/1774309/fosroc-renderoc-sp40-1000x1000.png"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/3/493957549/OM/HM/AR/1774309/repair-pro-dr-fixit-micro-concrete-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/3/496843324/TN/CS/DQ/1774309/dr-fixit-repellin-wr-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/3/494854728/PG/YL/WQ/1774309/dr-fixit-crack-x-shrink-free-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/PDFImage/2025/3/496857516/RK/QN/TT/1774309/dr-fixit-prebond-1000x1000.png"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2024/12/472986100/ZG/RQ/MA/7641714/feviseal-gp-pro-silicone-sealant-280ml-ultimate-glass-and-window-sealant-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/5/507339793/WP/WP/ZI/7641714/feviseal-neutral-pro-sealent-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/5/507340443/KX/SY/RT/7641714/feviseal-weatherproof-pro-sealent-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/9/544193440/HK/SV/BF/29232216/dr-fixit-feviseal-hy-100-hybrid-sealant-lm-1000x1000.png"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/11/562885116/XJ/IR/GR/218152527/feviseal-hy-300-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/5/507337619/GT/EV/CZ/7641714/feviseal-multipurpose-acrylic-sealent-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/5/507336028/YC/OJ/QE/7641714/feviseal-bathroom-kitchen-sealent-1000x1000.jpg"
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
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=90&w=1200"
  },
  {
    "id": 1,
    "name": "Apex Ultima Protek Duralife",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
    "price": "₹ 928.00",
    "properties": [
      "WALLS of S.T.E.E.L",
      "Advanced PUD Formula",
      "15 years warranty*"
    ],
    "popular": true,
    "image": "/assets/aistudio/apex_ultima_protek_duralife_packshot_hd.jpg"
  },
  {
    "id": 3,
    "name": "Apex Ultima Protek",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
    "price": "₹ 692.00",
    "properties": [
      "Home Lamination powered by Graphene",
      "Elastomeric Armour",
      "12 years Warranty*"
    ],
    "popular": true,
    "image": "/assets/aistudio/apex_ultima_protek_packshot_hd.jpg"
  },
  {
    "id": 5,
    "name": "Royale Glitz",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 892.00",
    "properties": [
      "Perfect Crème Finish in Ultra Sheen",
      "Teflon Surface Protector",
      "8 Years Performance Warranty"
    ],
    "popular": true,
    "image": "/assets/aistudio/royale_glitz_packshot_hd.jpg"
  },
  {
    "id": 6,
    "name": "Royale Luxury Emulsion",
    "slug": "royale-luxury-emulsion",
    "seoTitle": "Royale Luxury Emulsion by Asian Paints - Buy Online",
    "seoDescription": "Give your interior walls a smooth, velvety soft sheen with Asian Paints Royale Luxury Emulsion. Washable Teflon™ stain guard, low odor & 8-year warranty.",
    "seoKeywords": "Asian Paints Royale Luxury Emulsion, Asian Paints Royale Luxury Emulsion price, Royale Luxury Emulsion 1L 4L 10L 20L price, Royale Luxury Emulsion Teflon Surface Protector, Royale Luxury Emulsion coverage per litre, Royale Luxury Emulsion 8 year warranty, soft sheen washable interior wall paint, Low VOC Green Assure interior emulsion, Asian Paints authorized dealer Coimbatore",
    "description": "Asian Paints Royale Luxury Emulsion is a luxury water-based interior emulsion featuring a smooth soft sheen, Teflon™ Surface Protector for easy removal of hydrophilic and hydrophobic stains, JIS Z-2801 anti-bacterial & anti-fungal protection, Low VOC (ASTM D 6886) Green Assure safety, and an official 8-Year Performance Warranty.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 780.00",
    "properties": [
      "Smooth, Silky Soft Sheen Luxury Interior Finish",
      "Teflon™ Surface Protector — Easy Removal of Coffee, Tea, Ketchup, Crayon & Lipstick Stains",
      "Green Assure Low VOC (LEED / ASTM D 6886), Low Odor & JIS Z-2801 Anti-Bacterial Shield",
      "Coverage: 140–160 sq.ft/L (2 Coats) | Surface Dry 30 Mins | Recoat 3–4 Hrs | 40–45% Dilution",
      "Official 8-Year Asian Paints Performance Warranty (Colour Retention & Film Integrity)"
    ],
    "popular": true,
    "image": "/assets/aistudio/royale_luxury_emulsion_packshot_hd.jpg"
  },
  {
    "id": 7,
    "name": "Apcolite Premium Emulsion",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 450.00",
    "properties": [
      "Rich Flat Matt Finish",
      "Advanced Fungus & Mildew Shield",
      "Highly Washable (Resists Everyday Stains)",
      "Over 1600+ Gorgeous Shades",
      "5 Years Performance Warranty*"
    ],
    "popular": true,
    "image": "/assets/aistudio/apcolite_premium_emulsion_packshot_hd.jpg"
  },
  {
    "id": 50,
    "name": "Royale Aspira",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 1011.00",
    "properties": [
      "Water Beading Technology",
      "Luxury with Teflon™",
      "8 Years Performance Warranty"
    ],
    "popular": true,
    "image": "/assets/aistudio/royale_aspira_packshot_hd.jpg"
  },
  {
    "id": 51,
    "name": "Royale Shyne Luxury Emulsion",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 850.00",
    "properties": [
      "High Intensity Lustre Sheen",
      "Excellent Stain Resistance with Teflon™",
      "Clean Air & Ultra-Low VOC",
      "Superb Scrub Resistance (Easy Cleaning)",
      "8 Years Performance Warranty"
    ],
    "popular": true,
    "image": "/assets/aistudio/royale_shyne_packshot_hd.jpg"
  },
  {
    "id": 52,
    "name": "Royale Matt Emulsion",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 820.00",
    "properties": [
      "Pure Architectural Flat Matt Finish",
      "Excellent Light Diffusion (Hides Wall Flaws)",
      "Super Stain Resistance (Teflon™)",
      "High Washability & Smooth Feel",
      "8 Years Performance Warranty"
    ],
    "popular": false,
    "image": "/assets/aistudio/royale_matt_emulsion_packshot_hd.jpg"
  },
  {
    "id": 53,
    "name": "Royale Health Shield",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 1,120.00",
    "properties": [
      "Kills 99.9% Bacteria & Virus (Silver Ion)",
      "Neutralizes Formaldehyde (Purifies Indoor Air)",
      "Exquisite Soft Sheen Surface",
      "Highly Washable & Asthma Friendly approved",
      "8 Years Performance Warranty"
    ],
    "popular": true,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/7/326440889/MP/SF/RA/22649264/asian-paints-royale-health-shield-1000x1000.jpg"
  },
  {
    "id": 14,
    "name": "Nilaya Arc Matt",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 1,050.00",
    "properties": [
      "Lime-Based Finish",
      "Artisanal Matt Finish",
      "10 Years Warranty"
    ],
    "popular": true,
    "image": "/assets/aistudio/nilaya_arc_matt_packshot_hd.jpg"
  },
  {
    "id": 60,
    "name": "Nilaya Arc Pearlescent",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 1,200.00",
    "properties": [
      "Lime-Based Finish",
      "Alluring Pearl Finish",
      "10 Years Warranty"
    ],
    "popular": true,
    "image": "/assets/aistudio/nilaya_arc_pearlescent_packshot_hd.jpg"
  },
  {
    "id": 17,
    "name": "Apex Dust Proof",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
    "price": "₹ 426.00",
    "properties": [
      "Nano Block",
      "Dust Proof Technology",
      "6-years Warranty*"
    ],
    "popular": true,
    "image": "/assets/aistudio/apex_dust_proof_packshot_hd.jpg"
  },
  {
    "id": 21,
    "name": "RUCA Luxury Emulsion",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "subCategory": "Interior Paint",
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
    "subCategory": "Exterior Paint",
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
    "subCategory": "Interior Paint",
    "price": "₹ 210.00",
    "properties": [
      "Smart Choice Economy Matt",
      "1.5x More Coverage than Distempers",
      "Smooth Elegant Leveling Surface",
      "Washable & Easy to Maintain",
      "Value For Money Smart Upgrade"
    ],
    "popular": true,
    "image": "/assets/aistudio/tractor_emulsion_packshot_hd.jpg"
  },
  {
    "id": 30,
    "name": "Ace Exterior Emulsion",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
    "price": "₹ 240.00",
    "properties": [
      "Anti-Algal Performance",
      "Economy Exterior",
      "Water Resistance"
    ],
    "popular": false,
    "image": "/assets/aistudio/ace_exterior_emulsion_packshot_hd.jpg"
  },
  {
    "id": 31,
    "name": "Luxol High Gloss Enamel Paint",
    "seoTitle": "Luxol High Gloss Enamel Paint by Berger Paints | Buy Online",
    "seoDescription": "Buy Berger Luxol High Gloss Enamel Paint online at wholesale prices. Mirror-like high-gloss solvent-based enamel for wood & metal surfaces in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.",
    "seoKeywords": "Luxol High Gloss Enamel Paint, Berger Luxol Hi-Gloss Enamel, Luxol Enamel Paint, metal and wood enamel paint, high gloss synthetic enamel, RAL shade enamel paint",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Enamel Paint",
    "price": "₹ 340.00",
    "properties": [
      "Mirror-Like High-Gloss Enamel Finish",
      "Tough, Stain & Scratch-Resistant Protective Film",
      "Anti-Corrosive Shield for Wood, Metal Grills & Doors",
      "Available in 8 Standard Colors & Custom RAL Shade Codes"
    ],
    "popular": true,
    "image": "/assets/aistudio/Lewis_Berger_LUXOL_Red_Paint_Can_98daa79b.png"
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
    "subCategory": "Interior Paint",
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
    "name": "Decoprime Interior Wall Primer",
    "slug": "decoprime-wall-primer",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "id": 40,
    "name": "Specta PU Enamel",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Enamel Paint",
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
    "name": "AquaFresh DampGarde Exterior Primer",
    "slug": "aquafresh-dampgarde",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "subCategory": "PU Paint",
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
    "subCategory": "Primers",
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
    "image": "https://cms.birlawhite.com/uploads/9_Putty_Products_340_494_84c21c909f.png"
  },
  {
    "id": 1045,
    "name": "Birla White Cement",
    "brand": "Birla White",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "image": "https://cms.birlawhite.com/uploads/V1_Ever_White_Cement_Product_340x494_e193fda9f9.png"
  },
  {
    "id": 2001,
    "name": "Acrylic Spray Paint Just Spray Classic Shades",
    "seoTitle": "Acrylic Spray Paint Just Spray Classic Shades | Buy Online",
    "seoDescription": "Buy Acrylic Spray Paint Just Spray Classic Shades (400ml Aerosol Can) online at wholesale prices. Fast-drying 100% pure acrylic spray paint in Glossy Black, Glossy White, Signal Red, Matt Black, Medium Yellow & Forest Green.",
    "seoKeywords": "Acrylic Spray Paint Just Spray Classic Shades, Just Spray Acrylic Spray Paint, Just Spray Thailand 400ml, aerosol spray paint, fast dry acrylic spray paint, classic shades spray paint",
    "brand": "Just Spray",
    "topCategory": "Home Paint",
    "subCategory": "Enamel Paint",
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
    "image": "/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png",
    "shades": [
      {
        "name": "Glossy Black",
        "code": "No. 40",
        "hex": "#121212",
        "image": "/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png",
        "price": "₹ 240.00"
      },
      {
        "name": "Glossy White",
        "code": "No. 39",
        "hex": "#FFFFFF",
        "image": "/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png",
        "price": "₹ 240.00"
      },
      {
        "name": "Signal Red",
        "code": "No. 6",
        "hex": "#E60000",
        "image": "/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png",
        "price": "₹ 240.00"
      },
      {
        "name": "Matt Black",
        "code": "No. 33",
        "hex": "#1C1C1C",
        "image": "/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png",
        "price": "₹ 240.00"
      },
      {
        "name": "Medium Yellow",
        "code": "No. 15",
        "hex": "#FFCC00",
        "image": "/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png",
        "price": "₹ 240.00"
      },
      {
        "name": "Forest Green",
        "code": "No. 36",
        "hex": "#1E3B20",
        "image": "/assets/aistudio/JUST_Thailand_Acrylic_Paint_Collection_72d74a65.png",
        "price": "₹ 240.00"
      }
    ]
  },
  {
    "id": 2002,
    "name": "Just Spray JS1 Acrylic Spray Paint - Metallic Shades",
    "brand": "Just Spray",
    "topCategory": "Home Paint",
    "subCategory": "Enamel Paint",
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
        "image": "https://rukminim2.flixcart.com/image/1024/1024/xif0q/spray-paints/g/h/a/400-brown-metallic-brown-spray-paint-new-just-sprey-original-imahb8z8tfhnpcdn.jpeg?q=90",
        "price": "₹ 300.00"
      }
    ]
  },
  {
    "id": 2003,
    "name": "Just Spray JS1 Acrylic Spray Paint - Fluorescent Shades",
    "brand": "Just Spray",
    "topCategory": "Home Paint",
    "subCategory": "Enamel Paint",
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
    "subCategory": "Primers",
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
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=90&w=1200"
  },
  {
    "id": 3002,
    "name": "Heavy Duty Handle Putty Scraper Blade",
    "brand": "Local",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://5.imimg.com/data5/HF/OJ/FE/SELLER-2814892/sheenlac-nc-thinner-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/KT/SB/GLADMIN-2/sheenlac-paint-thinners-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-1000x1000.jpg",
    "shades": [
      {
        "name": "Walnut",
        "code": "Stainer 1",
        "hex": "#483C32",
        "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-1000x1000.jpg",
        "price": "₹ 55.00"
      },
      {
        "name": "Mahogany",
        "code": "Stainer 2",
        "hex": "#4C0013",
        "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-1000x1000.jpg",
        "price": "₹ 55.00"
      },
      {
        "name": "Teak",
        "code": "Stainer 3",
        "hex": "#A9703E",
        "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-1000x1000.jpg",
        "price": "₹ 55.00"
      },
      {
        "name": "Rosewood",
        "code": "Stainer 4",
        "hex": "#651A14",
        "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-1000x1000.jpg",
        "price": "₹ 55.00"
      },
      {
        "name": "Charcoal Black",
        "code": "Stainer 5",
        "hex": "#36454F",
        "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538895496/UB/BI/NZ/4616531/wood-stains-manufacturer-1000x1000.jpg",
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2025/8/538899378/LY/PK/UZ/4616531/nc-sanding-sealer-1000x1000.jpg"
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
    "image": "https://5.imimg.com/data5/TA/FG/GLADMIN-2/sheenlac-surface-polish-1000x1000.jpg"
  },
  {
    "id": 3008,
    "name": "Turpentine Oil - For Thinning/Drying Oil Paints",
    "slug": "turpentine-oil-for-thinning-drying-oil-paints",
    "seoTitle": "Turpentine Oil - For Thinning/Drying Oil Paints",
    "seoDescription": "Buy Turpentine Oil - For Thinning/Drying Oil Paints online at wholesale prices. Pure mineral turpentine oil solvent for thinning synthetic enamels, oil paints, varnishes & cleaning painting brushes and rollers.",
    "seoKeywords": "Turpentine Oil, Turpentine Oil For Thinning Drying Oil Paints, Mineral Turpentine Oil, Oil Paint Thinner, Enamel Paint Thinner, Paint Brush Cleaner, Turpentine Thinner 500ml 1L 3L 5L",
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
      "Genuine Mineral Turpentine Oil for Thinning & Drying Oil Paints",
      "Enhances Synthetic Enamel Wetting, Coverage & Brush Flow Control",
      "Effective for Cleansing Paint Brushes, Rollers & Spray Equipment",
      "Aromatic Hydrocarbon Solvent with Controlled Evaporation Rate"
    ],
    "popular": false,
    "image": "/assets/aistudio/Clear_Ribbed_Water_Bottle_52311ca2.png"
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
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=90&w=1200"
  },
  {
    "id": 9010,
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
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1572224419992-698b6a3b2b8e?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1563212068-0a75fcc6a72e?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&q=90&w=1200"
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
    "image": "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=90&w=1200"
  },
  {
    "id": 4008,
    "name": "WeatherCoat Exterior Primer",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "image": "https://bergerpaints.com.sg/wp-content/uploads/2024/02/water_based-Sealer.png"
  },
  {
    "id": 4009,
    "name": "BP White Interior Primer (Water Based)",
    "slug": "bp-white-primer-(water-based)",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "image": "https://m.media-amazon.com/images/I/61AHShwUXoL.jpg_BO30,255,255,255_UF750,750_SR1910,1000,0,C_QL100_.jpg"
  },
  {
    "id": 4010,
    "name": "BP Cement Primer (Solvent Based)",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "image": "https://i.ytimg.com/vi/RBjK5vMhOqw/sddefault.jpg"
  },
  {
    "id": 4012,
    "name": "Luxol Satin Finish",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Enamel Paint",
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
    "image": "https://m.media-amazon.com/images/I/71V+3PeIOIL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    "id": 4014,
    "name": "Luxol PU Enamel Paint - For Metal and Wood Finishes",
    "seoTitle": "Luxol PU Enamel Paint - For Metal and Wood Finishes",
    "seoDescription": "Buy Berger Luxol PU Enamel Paint - For Metal and Wood Finishes online at wholesale prices. 4 Years Warranty polyurethane enamel for wooden doors, furniture, gates & metal surfaces in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.",
    "seoKeywords": "Luxol PU Enamel Paint, Luxol PU Enamel, Metal and Wood Finishes, Berger Luxol PU Enamel, polyurethane enamel paint, RAL shade PU enamel",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Enamel Paint",
    "price": "₹ 390.00",
    "sizes": [
      0.5,
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Engineering Grade Polyurethane (PU) Enamel for Metal & Wood Finishes (4 Years Warranty)",
      "Extreme Hardness & Absolute Scratch Shield",
      "Maintains High Gloss and Color without Yellowing in UV",
      "Available in 8 Standard Colors & Custom RAL Shade Codes"
    ],
    "popular": false,
    "image": "/assets/aistudio/Berger_Luxol_PU_Enamel_Paint_Can_fe1cf491.png"
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/9/346440914/LA/MQ/KL/138991556/berger-dampstop-duo.jpeg"
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
    "image": "https://content.jdmagicbox.com/quickquotes/images_main/berger-home-shield-construction-chemical-377205466-9opi6.jpg?impolicy=queryparam&im=Resize=(1000,1000),aspect=fit"
  },
  {
    "id": 4017,
    "name": "Home Shield Waterproof Putty",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "image": "https://paintpoint.pk/wp-content/uploads/2023/06/Berger-Paints-Shell-Black-Bituman.png"
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
    "image": "https://image.makewebcdn.com/makeweb/r_409x409/M1sidwdt1/Beger/Beger_Shield_2in1_Sheen.jpg?v=202405291424"
  },
  {
    "id": 4021,
    "name": "BP White Wood Primer",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "image": "https://5.imimg.com/data5/ANDROID/Default/2022/8/KE/HN/WB/127601061/product-jpeg.jpg"
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-10/ipaint glow in dark kit.png?format=webp&width=1200&quality=95"
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
    "image": "https://spng.pngfind.com/pngs/s/71-716416_home-decor-paint-roller-tools-paint-color-home.png"
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
    "image": "https://images.jdmagicbox.com/quickquotes/images_main/tile-adhesive-2219993490-4lob7xqz.jpg"
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
    "image": "https://cpimg.tistatic.com/08869313/b/4/WATERPROOFING-Flexogum.jpg"
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
    "image": "https://narandasandsons.com/wp-content/uploads/2025/10/48-1.png"
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
    "image": "https://www.sealantsupplies.co.uk/wp-content/uploads/2021/03/Arbo_Sil_LM-1.jpg.webp"
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
    "image": "https://m.media-amazon.com/images/I/71tQvmQILTL._AC_UF1000,1000_QL80_.jpg"
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
    "image": "https://images.bergerpaints.com/2023-10/imperia_grande_clear_2.png?format=webp&width=1080&quality=75"
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
    "image": "https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=999128590447715"
  },
  {
    "id": 4031,
    "name": "Protecton Epilux 155 Epoxy Primer",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Paint",
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
    "image": "https://ik.imagekit.io/fepy/cdn/catalog/product/f/l/floor_guard_epoxy_top_coat-5lt_1__2_13.png"
  },
  {
    "id": 4032,
    "name": "Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint",
    "seoTitle": "Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint | Buy Online",
    "seoDescription": "Buy Berger Industrial Epoxy Paint - Epilux 155 HB Enamel Paint in 4L (₹1,480) & 20L (₹6,800) packs. Heavy-duty two-pack polyamide epoxy coating in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.",
    "seoKeywords": "Berger Industrial Epoxy Paint, Epilux 155 HB Enamel Paint, Berger Protecton Epilux 155 HB, industrial epoxy enamel 4L 20L, RAL shade epoxy paint, Dark Grey Smoke Grey Golden Yellow Signal Red Blue Green epoxy",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Paint",
    "price": "₹ 1,480.00",
    "sizes": [
      4,
      20
    ],
    "sizePrices": {
      "4": 1480,
      "20": 6800
    },
    "unit": "L",
    "shades": [
      {
        "name": "White",
        "code": "WHITE",
        "hex": "#FFFFFF"
      },
      {
        "name": "Black",
        "code": "BLACK",
        "hex": "#1A1A1A"
      },
      {
        "name": "Dark Grey",
        "code": "DARK GREY",
        "hex": "#4A4E52"
      },
      {
        "name": "Smoke Grey",
        "code": "SMOKE GREY",
        "hex": "#7A8084"
      },
      {
        "name": "Golden Yellow",
        "code": "GOLDEN YELLOW",
        "hex": "#E5A01D"
      },
      {
        "name": "Signal Red",
        "code": "SIGNAL RED",
        "hex": "#B81D24"
      },
      {
        "name": "Blue",
        "code": "BLUE",
        "hex": "#1E5AA8"
      },
      {
        "name": "Green",
        "code": "GREEN",
        "hex": "#1B7A43"
      }
    ],
    "allowRalShades": true,
    "properties": [
      "Two-Pack High-Build Polyamide-Cured Industrial Epoxy Enamel (3:1 Mixing Ratio)",
      "Superior defense against water condensation, mineral oils, and chemical splashes",
      "Hard, abrasion-resistant gloss/semi-gloss topcoat for structural steel & machinery",
      "Available in 4L & 20L packs — White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & RAL codes"
    ],
    "popular": false,
    "image": "/assets/aistudio/Green_Berger_Epilux_Industrial_Paint_Drum_9548146d.png"
  },
  {
    "id": 4033,
    "name": "Protecton Epilux 4 Zinc Rich Primer",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Paint",
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
    "image": "https://ae-pic-a1.aliexpress-media.com/kf/S9fa56423132245c89f27cecf1a72e415Y.jpg"
  },
  {
    "id": 4034,
    "name": "Protecton Epilux 4 HB Epoxy Coating",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Paint",
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
    "image": "https://imgv2-1-f.scribdassets.com/img/document/709702223/original/5cfdb3741a/1?v=1"
  },
  {
    "id": 4035,
    "name": "Berger Epilux 610 Coating Grey Epoxy Primer - Industrial Grade",
    "slug": "berger-epilux-610-coating-grey-epoxy-primer-industrial-grade",
    "seoTitle": "Berger Epilux 610 Coating Grey Epoxy Primer - Industrial Grade",
    "seoDescription": "Buy Berger Epilux 610 Coating Grey Epoxy Primer (P43633) - Industrial Grade online at wholesale prices. Two-pack epoxy zinc phosphate anti-corrosive primer (5:1 with Catalyst P43C50) in 4L & 18L drums; Berger Thinner 844 compatible.",
    "seoKeywords": "Berger Epilux 610 Coating Grey Epoxy Primer, Epilux 610 Grey P43633, Protecton Epilux 610 Epoxy Primer, Berger Catalyst P43C50, two pack epoxy grey metal primer, industrial zinc phosphate epoxy primer",
    "description": "Berger Epilux 610 Coating Grey Epoxy Primer - Industrial Grade (Protecton P43633) is a two-pack polyamide-cured epoxy anti-corrosive metal primer pigmented with zinc phosphate (5:1 Base to Catalyst P43C50 ratio). Delivers rapid 1-hour touch-dry handling, chemical & solvent defense, and reliable inter-coat adhesion across structural steel, marine, and concrete substrates.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Primers",
    "price": "₹ 1,150.00",
    "sizes": [
      4,
      18
    ],
    "sizePrices": {
      "4": 1150,
      "18": 4140
    },
    "unit": "L",
    "properties": [
      "Two-Pack Polyamide-Cured Zinc Phosphate Grey Epoxy Primer (P43633 + Catalyst P43C50)",
      "Fast Drying (1 Hr Touch Dry / 4-6 Hrs Handle Dry) with 5-6 Hr Pot Life @ 30°C",
      "High Spreading Capacity (12.0 - 17.6 sq.m/L @ 25-35 microns DFT; Volume Solids 42±2%)",
      "Resistant to Industrial Chemical Fumes, Salt Air & Solvents (4L & 18L Combo Packs)"
    ],
    "popular": true,
    "image": "/assets/aistudio/Berger_Epilux_610_Protective_Coating_Drum_7d1fa625.png"
  },
  {
    "id": 4036,
    "name": "Protecton Epilux 610 HB Coating",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Paint",
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/12/370360330/YI/PZ/NM/43416417/protectmastic-bpl-smoke-gray-250x250.jpg"
  },
  {
    "id": 4037,
    "name": "Berger Paints Red Oxide Zinc Chromate Metal Primer IS2074",
    "seoTitle": "Berger Paints Red Oxide Zinc Chromate Metal Primer IS2074",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Primers",
    "price": "₹ 2,834.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 2834
    },
    "unit": "L",
    "properties": [
      "Red Oxide Zinc Chromate Anti-Corrosive Metal Primer conforming to IS 2074",
      "Dual active-passive rust protection for structural steel and iron surfaces",
      "Excellent adhesion, leveling, and barrier resistance in industrial environments",
      "Ideal foundation coat for synthetic enamels, alkyd, and industrial topcoats"
    ],
    "popular": false,
    "image": "/assets/aistudio/berger_protection_br_rozc_prim_2074_pq_zinc_chroma_1789721975_19d96e46.png"
  },
  {
    "id": 4038,
    "name": "Berger Epilux 5 Coal Tar Epoxy Black",
    "slug": "berger-epilux-5-coal-tar-epoxy-black",
    "seoTitle": "Berger Epilux 5 Coal Tar Epoxy Black (20L Drum) | Protecton",
    "seoDescription": "Buy Berger Protecton Epilux 5 Coal Tar Epoxy Black (655800) 20L drum online at wholesale price. Heavy-duty 2K waterproof & chemical resistant steel coating.",
    "seoKeywords": "Berger Epilux 5 Coal Tar Epoxy Black, Epilux 5 Coal Tar Epoxy 20L, Berger 655800 655821 Catalyst, Protecton Epilux 5 Black, coal tar epoxy paint 20 litre drum, underground pipeline epoxy coating, marine hull black coal tar epoxy",
    "description": "Berger Epilux 5 Coal Tar Epoxy Black (Protecton Code 655800 + Catalyst 655821, 3:1 V/V) is a high-build two-pack polyamide-cured coal tar epoxy protective coating engineered for continuous water immersion, buried pipelines, sewage treatment tanks, marine hulls, piling, and heavy industrial structures. Supplied exclusively as a 20L industrial drum combo (15L Base + 5L Catalyst).",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Paint",
    "price": "₹ 5,150.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 5150
    },
    "unit": "L",
    "properties": [
      "Two-Pack High-Build Coal Tar Epoxy Black (3:1 V/V Base 655800 + Catalyst 655821)",
      "66±2% High Volume Solids with 100-125µm DFT per Coat (5.3-6.6 sq.m/L Coverage)",
      "Extreme Resistance to Continuous Water Immersion, Sewage, Brine & Soil Alkalis",
      "Supplied Only as 20L Industrial Drum Combo (15L Base + 5L Catalyst; Thinner 844)"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 41,
    "image": "/assets/aistudio/Berger_Protecton_Epoxy_Paint_Drum_caad1fa1.png"
  },
  {
    "id": 4039,
    "name": "Industrial 2K Bergerthane PU Enamel Paint",
    "slug": "industrial-2k-bergerthane-pu-enamel-paint",
    "seoTitle": "Industrial 2K Bergerthane PU Enamel Paint | 11L & 20L | Berger Protecton",
    "seoDescription": "Buy Industrial 2K Bergerthane PU Enamel Paint (Berger Protecton BTHANE PU) in 11L & 20L packs at wholesale prices. Two-pack 10:1 aliphatic acrylic polyurethane coating with UV & chemical resistance in standard & custom RAL shades.",
    "seoKeywords": "Industrial 2K Bergerthane PU Enamel Paint, Berger Protecton Bergethane PU, BTHANE PU Glossy Finish, 2K industrial polyurethane paint 11L 20L, RAL shade 2K PU enamel, Berger Thinner 825 PU coating",
    "description": "Industrial 2K Bergerthane PU Enamel Paint (Berger Protecton BTHANE PU) is a two-pack aliphatic isocyanate-cured acrylic polyurethane topcoat (10:1 Base to Catalyst M15C70 ratio). Formulated for non-yellowing UV gloss retention, abrasion defense, and chemical resistance across machinery, tanks, pipelines, and structural steel in standard & custom RAL shades.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "PU Paint",
    "price": "₹ 3,950.00",
    "sizes": [
      11,
      20
    ],
    "sizePrices": {
      "11": 3950,
      "20": 6950
    },
    "unit": "L",
    "properties": [
      "Two-Pack Aliphatic 2K Acrylic Polyurethane (10:1 Mixing Ratio with Catalyst M15C70)",
      "Non-Yellowing High-Gloss UV & Weather Resistance for Tanks, Pipelines & Machinery",
      "Available in 11L (10L Base + 1L Catalyst) & 20L Industrial Packs",
      "Available in 8 Standard Colors & Custom RAL Classic Shade Codes"
    ],
    "popular": true,
    "image": "/assets/aistudio/Berger_Protecton_Industrial_Paint_Pail_ee70a210.png"
  },
  {
    "id": 4040,
    "name": "Protecton Epilux HBTL Coal Tar Epoxy",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Paint",
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
    "image": "https://cpimg.tistatic.com/10881538/b/4/Berger-Epilux-78-HBTL-Paint..jpg"
  },
  {
    "id": 4041,
    "name": "Protecton Epilux SLX Self Leveling Epoxy",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Paint",
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
    "image": "https://tiimg.tistatic.com/fp/1/009/515/epilux-78-hbtl-light-grey-white-442.jpg"
  },
  {
    "id": 4042,
    "name": "Protecton Lumeros Heat Resisting Aluminium Paint",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "PU Paint",
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
    "image": "https://www.rashmienterprisesbhilai.com/images/berger.jpg"
  },
  {
    "id": 4044,
    "name": "Berger Paints Industrial Bison Zinc Phosphate Grey Primer",
    "seoTitle": "Berger Paints Industrial Bison Zinc Phosphate Grey Primer",
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
      "Single-Pack High Corrosion Protective Grey Metal Primer",
      "Formulated with Zinc Phosphate pigments for active anti-rust protection",
      "Outstanding adhesion on steel sheets and structural trusses",
      "Ensures high build foundation and excellent topcoat adhesion"
    ],
    "popular": false,
    "image": "/assets/aistudio/5a50c524-2a35-4a96-8e39-799a97d1c66a_02114f07.png"
  },
  {
    "id": 4045,
    "name": "Berger Industrial Zinc Yellow Primer",
    "seoTitle": "Berger Industrial Zinc Yellow Primer",
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
    "image": "/assets/aistudio/Berger_Industrial_Zinc_Primer_Drum_2b7eeb0c.png"
  },
  {
    "id": 4046,
    "name": "Luxol Anti Rust 1K QD Epoxy Primer Grey",
    "seoTitle": "Luxol Anti Rust 1K QD Epoxy Primer Grey by Berger Paints | Buy Online",
    "seoDescription": "Buy Berger Luxol Anti Rust 1K QD Epoxy Primer Grey online at wholesale prices. Quick-drying single-pack (1K) anti-corrosive epoxy metal primer for steel, wood & masonry. Touch dry in 20 mins; available in 1L (₹440), 4L (₹1,550) & 20L (₹6,900) packs.",
    "seoKeywords": "Luxol Anti Rust 1K QD Epoxy Primer Grey, Berger Luxol Quick Drying Epoxy Primer, 1K Epoxy Primer Grey, Berger anti rust metal primer, quick dry epoxy primer 1L 4L 20L",
    "description": "Lewis Berger Luxol Anti-Rust Quick Drying (1K QD) Epoxy Primer Grey is a ready-to-use single-pack anti-corrosive primer formulated with special epoxy resins for mild steel, metal structures, wood, and concrete. Delivers a matt grey barrier coat that surface-dries in ~20 minutes and permits same-day topcoating.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Primers",
    "price": "₹ 440.00",
    "sizes": [
      1,
      4,
      20
    ],
    "sizePrices": {
      "1": 440,
      "4": 1550,
      "20": 6900
    },
    "unit": "L",
    "properties": [
      "Single-Pack (1K) Ready-to-Use Quick-Drying Anti-Rust Epoxy Primer (Grey)",
      "Surface Dry in ~20 Minutes — Allows Same-Day Recoating & Topcoating (6-8 hrs)",
      "Green Pro Certified Eco-Friendly Formula (Free from Lead, Mercury & Chromium)",
      "Matt Grey Finish (50 sq.ft/L for 2 coats at 80-100 microns DFT)"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 64,
    "image": "/assets/aistudio/Lewis_Berger_Luxol_Anti-Rust_Primer_187bd4e7.png",
    "slug": "luxol-anti-rust-1k-qd-epoxy-primer-grey"
  },
  {
    "id": 4047,
    "name": "Berger Red Oxide Primer",
    "seoTitle": "Berger Red Oxide Primer (Solvent Thinnable) 1L & 4L | Buy Online",
    "seoDescription": "Buy Berger Red Oxide Primer (Solvent Thinnable) in 1L (₹210) & 4L (₹820) tins online at wholesale prices. Alkyd-based anti-corrosive metal primer for iron gates, grills & mild steel. Surface dry in 30 mins; coverage 100-120 sq.ft/L.",
    "seoKeywords": "Berger Red Oxide Primer, Berger Red Oxide Metal Primer, Solvent Thinnable Red Oxide Primer, Berger Red Oxide Primer 1L 4L price, anti rust metal primer, iron gate grill primer",
    "description": "Berger Red Oxide Primer (Solvent Thinnable) is a high-opacity, oil-modified alkyd anti-corrosive primer formulated for ferrous metal surfaces such as mild steel, iron gates, window grilles, and industrial structures. Heavy-metal-free formula forms a tough, rust-inhibitive foundation for Luxol and synthetic enamels.",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 210.00",
    "sizes": [
      1,
      4
    ],
    "sizePrices": {
      "1": 210,
      "4": 820
    },
    "unit": "L",
    "properties": [
      "Solvent-Thinnable Oil-Modified Alkyd Anti-Corrosive Red Oxide Primer",
      "Superior Rust Inhibition & High Opacity for Ferrous Metals & Mild Steel",
      "Fast Surface Dry (30-60 Mins) with 8-10 Hr Recoat Window; 100-120 sq.ft/L Coverage",
      "Heavy-Metal-Free (Lead, Mercury & Chromium Free) in 1L & 4L Tins"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 92,
    "image": "/assets/aistudio/Berger_Red_Oxide_Primer_Tin_2bba15c7.png",
    "slug": "berger-red-oxide-primer"
  },
  {
    "id": 4048,
    "name": "Berger BP Zinc Yellow Primer",
    "seoTitle": "Berger BP Zinc Yellow Primer (Solvent Thinnable) 1L & 4L | Buy Online",
    "seoDescription": "Buy Berger BP Zinc Yellow Primer (Solvent Thinnable) in 1L (₹290) & 4L (₹1,120) tins online at wholesale prices. Micro-zinc alkyd anti-corrosive primer for mild steel, GI, aluminum & coastal environments. Green Pro Certified.",
    "seoKeywords": "Berger BP Zinc Yellow Primer, Berger Zinc Yellow Primer, Zinc Chromate Metal Primer 1L 4L, Berger Solvent Thinnable Zinc Yellow Primer, non ferrous metal primer, anti corrosive yellow primer",
    "description": "Berger BP Zinc Yellow Primer (Solvent Thinnable) is a heavy-duty single-pack oil-modified alkyd primer enriched with micro-zinc anti-corrosive pigments for mild steel, galvanized iron, aluminum, and coastal structures. Green Pro Certified for demanding saline and industrial environments.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Primers",
    "price": "₹ 290.00",
    "sizes": [
      1,
      4
    ],
    "sizePrices": {
      "1": 290,
      "4": 1120
    },
    "unit": "L",
    "properties": [
      "Solvent-Thinnable Micro-Zinc Anti-Corrosive Metal Primer (Yellow Matt)",
      "Active Passivation for Mild Steel, Galvanized Iron, Aluminum & Non-Ferrous Metals",
      "Engineered for Coastal Saline Air & Industrial Exposure (105-130 sq.ft/L)",
      "Green Pro Certified Single-Pack Primer Available in 1L & 4L Tins"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 47,
    "image": "/assets/aistudio/Berger_BP_Zinc_Yellow_Primer_Tin_147c7eea.png",
    "slug": "berger-bp-zinc-yellow-primer"
  },
  {
    "id": 4049,
    "name": "Berger Industrial Epilux 78 High Build Tank Liner",
    "seoTitle": "Berger Industrial Epilux 78 High Build Tank Liner (20L) | White & Grey",
    "seoDescription": "Buy Berger Industrial Epilux 78 High Build Tank Liner (HBTL) 20L Pack online at wholesale prices. CFTRI & USFDA 21 CFR 175.300 compliant 2-pack amine-adduct epoxy tank coating in White & Grey for potable water, chemical & hydrocarbon tanks.",
    "seoKeywords": "Berger Industrial Epilux 78 High Build Tank Liner, Berger Epilux 78 HBTL White Grey, Epilux 78 20L Tank Coating, food grade potable water epoxy tank paint, CFTRI USFDA epoxy tank liner, Berger Catalyst 955938 Thinner 844",
    "description": "Berger Industrial Epilux 78 High Build Tank Liner (Protecton Epilux 78 HBTL) is a two-pack amine-adduct cured epoxy tank lining system (4:1 Base to Catalyst 955938 ratio). Conforming to CFTRI & USFDA 21 CFR 175.300 food-grade standards, it protects steel and concrete potable water tanks, chemical storage, and fuel/ATF tanks in White and Grey 20L packs.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Paint",
    "price": "₹ 9,650.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 9650
    },
    "unit": "L",
    "shades": [
      {
        "name": "White",
        "code": "955000",
        "hex": "#F8F9FA"
      },
      {
        "name": "Grey",
        "code": "GREY",
        "hex": "#8D9296"
      }
    ],
    "allowRalShades": false,
    "properties": [
      "Two-Pack Amine-Adduct Epoxy Tank Liner (4:1 Base + Catalyst 955938 = 20L Pack)",
      "Food-Grade Potable Water Certified (CFTRI Mysore & USFDA 21 CFR 175.300)",
      "High-Build 100-150 Microns DFT Per Coat for Chemical, Fuel & Water Immersion",
      "Available in Factory White (955000) & Industrial Grey in 20L Combo Drums"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 38,
    "image": "/assets/aistudio/Berger_Protecton_Green_Paint_Drum_823bd727.png",
    "slug": "berger-industrial-epilux-78-high-build-tank-liner"
  },
  {
    "id": 4050,
    "name": "Berger Industrial Ferrotol Heat Resistant Aluminium Paint (Upto 250°C)",
    "seoTitle": "Berger Industrial Ferrotol Heat Resistant Aluminium Paint (Upto 250°C) | 4L & 20L",
    "seoDescription": "Buy Berger Industrial Ferrotol HR Heat Resistant Aluminium Paint (up to 250°C) in 4L (₹1,620) & 20L (₹7,880) dual packs online at wholesale prices. Dual-pack oleoresinous leafing aluminium coating for boilers, stacks, chimneys, pipes & tanks.",
    "seoKeywords": "Berger Industrial Ferrotol Heat Resistant Aluminium Paint, Berger Ferrotol HR Aluminium 250C, heat resistant aluminium paint 250 degree, boiler chimney pipe heat paint, Berger Ferrotol Medium 541984 Al Paste 511985",
    "description": "Berger Industrial Ferrotol Heat Resistant Aluminium Paint (Upto 250°C) is a dual-pack Protecton heat-resisting industrial coating combining an oleoresinous medium (541984) with leafing aluminium paste (511985). Engineered for continuous dry heat up to 250°C on storage tanks, chimneys, boiler fronts, steam pipes, stacks, and ducting.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 1,620.00",
    "sizes": [
      4,
      20
    ],
    "sizePrices": {
      "4": 1620,
      "20": 7880
    },
    "unit": "L",
    "properties": [
      "Continuous Working Dry Heat Resistance Up to 250°C (Bright Metallic Leafing Finish)",
      "Dual-Pack System: Oleoresinous Medium (17.32L) + Leafing Al Paste (3.68 kg) for 20L Kit",
      "High Spreading Capacity: 19.0 - 25.3 sq.m/L (190-250 sq.ft/L) at 15-20 Microns DFT",
      "Ideal for Boilers, Chimneys, Stacks, Ducts & Hot Steel Pipes (4L & 20L Packs)"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 44,
    "image": "/assets/aistudio/Berger_Ferrotol_HR_Aluminium_Paint_Drum_b3ed3008.png",
    "slug": "berger-industrial-ferrotol-heat-resistant-aluminium-paint-upto-250c"
  },
  {
    "id": 4051,
    "name": "Berger G.P Synthetic Enamel Paint - Industrial Grade",
    "seoTitle": "Berger G.P Synthetic Enamel Paint - Industrial Grade (20L) | RAL & Standard Shades",
    "seoDescription": "Buy Berger Butterfly G.P. Synthetic Enamel Paint - Industrial Grade in 20L drums (₹4,530) at wholesale prices. High-gloss alkyd enamel (80±5° gloss) for mild steel grilles, gates, machinery & interior wood in White, Black, Grey, Yellow, Red, Blue, Green & custom RAL shades.",
    "seoKeywords": "Berger G.P Synthetic Enamel Paint, Berger Butterfly GP Synthetic Enamel 20L, industrial synthetic enamel paint, bright grey synthetic enamel, Berger Thinner 800 enamel, RAL shade GP enamel 20L",
    "description": "Berger G.P Synthetic Enamel Paint - Industrial Grade (Berger Butterfly G.P. Synthetic Enamel) is a full-gloss solvent-borne alkyd enamel formulated for high hiding power, durable film build, and crisp gloss on mild steel grilles, shutters, gates, industrial furniture, and wooden trim in 20L drums across standard and custom RAL shades.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 4,530.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 4530
    },
    "unit": "L",
    "properties": [
      "Full High-Gloss Alkyd Synthetic Enamel (80±5° Gloss @ 60° GH) in 20L Drums",
      "Economical Industrial-Grade Coverage: 70-90 sq.ft/L for 2 Coats Over Primer",
      "Surface Dry 2-3.5 Hrs / Overnight Recoat; 24 Hr Diluted Pot Life (Thinner 800)",
      "Available in 8 Standard Shades & Custom RAL Classic Shade Codes"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 53,
    "image": "/assets/aistudio/Berger_Butterfly_Burgundy_Paint_Can_0bd8ae57.png",
    "slug": "berger-gp-synthetic-enamel-paint-industrial-grade"
  },
  {
    "id": 4052,
    "name": "Berger Torpedo Quick Drying Enamel Paint - Industrial Grade",
    "seoTitle": "Berger Torpedo Quick Drying Enamel Paint - Industrial Grade (20L) | RAL Shades",
    "seoDescription": "Buy Berger Torpedo Quick Drying (QD) Enamel Paint - Industrial Grade in 20L ColorBank drums (₹5,390) at wholesale prices. Rapid 30-min touch-dry & 60-min hard-dry alkyd enamel for machinery, fabrication & structural steel in standard & custom RAL shades.",
    "seoKeywords": "Berger Torpedo Quick Drying Enamel Paint, Berger Torpedo QD Enamel 20L, industrial QAD enamel paint, fast drying metal enamel 30 min dry, Berger Protecton Torpedo N Base V92I77, RAL shade QD enamel",
    "description": "Berger Torpedo Quick Drying Enamel Paint - Industrial Grade (Berger Protecton Torpedo QD Enamel) is a single-pack rapid-drying modified alkyd finish designed to slash shop-floor downtime. Touch-dry in ~30 minutes and hard-dry in ~1 hour, it protects machinery, OEM parts, fabrication steel, and timber in 20L drums across standard and RAL shades.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 5,390.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 5390
    },
    "unit": "L",
    "properties": [
      "Ultra-Fast Quick Drying Industrial Enamel (~30 Min Touch Dry / 60 Min Hard Dry)",
      "High Volume Solids (~45-50%) with 12-14 sq.m/L Theoretical Coverage @ 25-35µm DFT",
      "High-Gloss Finish for OEM Machinery, Fabrication Yards & Structural Steel (20L Drum)",
      "Available in 8 Standard Shades & Custom RAL Classic Shade Codes"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 46,
    "image": "/assets/aistudio/Berger_Protecton_Green_Paint_Drum__1__0566f887.png",
    "slug": "berger-torpedo-quick-drying-enamel-paint-industrial-grade"
  },
  {
    "id": 4053,
    "name": "Berger Epoxy Thinner 844 - Industrial Grade",
    "seoTitle": "Berger Epoxy Thinner 844 - Industrial Grade (EP-4/5 | 20L)",
    "seoDescription": "Buy Berger Protecton Epoxy Thinner 844 (EP-4/5, Code 844 900) in 20L drums at wholesale prices. Specialized solvent for Epilux 4, Epilux 5, Epilux 610 & 78.",
    "seoKeywords": "Berger Epoxy Thinner 844, Berger Thinner 844 EP-4/5, Berger 844 900 Thinner 20L, Epilux Epoxy Thinner 844, Epilux 610 thinner, Epilux 78 thinner, industrial epoxy paint thinner",
    "description": "Berger Epoxy Thinner 844 - Industrial Grade (Berger Protecton Thinner 844 EP-4/5, Code 844 900) is an industrial-grade aromatic-aliphatic solvent blend engineered specifically to thin and adjust viscosity for Berger Epilux two-pack epoxy primers, high-build liners, and chemical-resistant enamels (Epilux 4, 5, 78, 155, 610) as well as clean spray lines and brushes.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Thinners & Solvents",
    "price": "₹ 4,200.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 4200
    },
    "unit": "L",
    "properties": [
      "Official Berger Protecton Epoxy Solvent (Thinner 844 EP-4/5 | Code 844 900)",
      "Specially Balanced Viscosity Reducer for Epilux 4, Epilux 5, Epilux 610 & Epilux 78",
      "Prevents Pinholes, Blush & Solvent Entrapment During Brush, Air or Airless Spray",
      "Clear Colorless Liquid (Specific Gravity 0.84–0.86, Flash Point >35°C) in 20L Drum"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 37,
    "image": "/assets/aistudio/Berger_Protecton_Industrial_Thinner_Drum_b565d737.png",
    "slug": "berger-epoxy-thinner-844-industrial-grade"
  },
  {
    "id": 4054,
    "name": "Berger Acid Alkali & Heat Resistant Bituminous Black IS 158 Paint",
    "slug": "berger-acid-alkali-heat-resistant-bituminous-black-is158-paint",
    "seoTitle": "Berger Bituminous Black IS 158 Paint (20L) | Acid & Heat",
    "seoDescription": "Buy Berger Black Bituminous IS 158 Paint (Code 767991) 20L drum online at wholesale price. Lead-free acid, alkali & heat resisting coating for steel & boilers.",
    "seoKeywords": "Berger Acid Alkali and Heat Resistant Bituminous Black IS 158 Paint, Berger Black Bituminous IS 158, Berger 767991 Bituminous Paint 20L, IS 158 bituminous black paint, acid alkali heat resisting black paint, industrial black bitumen paint 20 litre drum, boiler funnel chimney black paint",
    "description": "Berger Acid Alkali & Heat Resistant Bituminous Black IS 158 Paint (Protecton Code 767991) is a single-pack, lead-free ready-mixed bituminous protective coating conforming to BIS IS 158. Engineered for funnels, boilers, cooling towers, industrial steel structures, and underground concrete exposed to dilute acids, alkalis, chemical fumes, moisture, and elevated heat up to 300°C. Supplied exclusively in 20L industrial drums.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Industrial Paint and Coatings",
    "price": "₹ 5,100.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 5100
    },
    "unit": "L",
    "properties": [
      "Conforms to BIS IS 158 (Lead-Free Acid, Alkali & Heat Resisting Bituminous Black)",
      "Resists Dilute Acids, Alkalis, Moisture, Chemical Fumes & Heat Up to 300°C",
      "Self-Priming Single-Pack Ready-Mixed Formula (8–14 sq.m/L @ ~30µm DFT; Hard Dry 6–8 Hrs)",
      "Supplied Only in Sealed 20L Industrial Drums (Berger Protecton Code 767991)"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 32,
    "image": "/assets/aistudio/Berger_Black_Bituminous_Paint_Drum_4a05332e.png"
  },
  {
    "id": 4055,
    "name": "Berger Lumeros Hot Oil Resistant Coating White",
    "slug": "berger-lumeros-hot-oil-resistant-coating-white",
    "seoTitle": "Berger Lumeros Hot Oil Resistant Coating White (HOR | 20L)",
    "seoDescription": "Buy Berger Protecton Lumeros HOR Coating White (R59000) 20L drum online at wholesale price. Single-pack hot oil resistant white paint for transformer tanks.",
    "seoKeywords": "Berger Lumeros Hot Oil Resistant Coating White, Berger Lumerous Hot Oil Resistant Coating White, Berger Lumeros HOR Coating White R59000, transformer internal white paint 20L, hot oil resistant transformer tank coating, IS 1180 IS 2026 transformer paint, Berger Protecton HOR coating",
    "description": "Berger Lumeros Hot Oil Resistant Coating White (Berger Protecton Lumeros HOR Coating - White, Code R59000) is a specialized single-pack industrial coating engineered for internal power & distribution transformer tanks, oil-filled switchgear, and gearboxes. Resists prolonged hot mineral oil immersion (90°C–120°C) without blistering, softening, or contaminating dielectric oil BDV, while delivering bright white internal inspection visibility in 20L drums.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Industrial Paint and Coatings",
    "price": "₹ 7,980.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 7980
    },
    "unit": "L",
    "properties": [
      "Official Berger Protecton Lumeros HOR Coating - White (Code R59000 | 20L Drum)",
      "Resists Continuous Hot Transformer Oil Immersion (90°C–120°C; IS 335 / IEC 60296)",
      "Dielectric-Safe Film: Zero Peeling, Softening or Oil BDV Contamination (IS 1180 / IS 2026)",
      "High-Luminosity White Finish Enhances Internal Tank Inspection (10–12 sq.m/L @ 25–30µm DFT)"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 29,
    "image": "/assets/aistudio/Berger_Protecton_Green_Paint_Drum__2__9f8732f4.png"
  },
  {
    "id": 4056,
    "name": "Berger Industrial Aluminium Paint IS 2339 Medium",
    "slug": "berger-industrial-aluminium-paint-is2339-medium",
    "seoTitle": "Berger Industrial Aluminium Paint IS 2339 Medium (20L Kit)",
    "seoDescription": "Buy Berger Industrial Aluminium Paint IS 2339 Medium (17.1L 661984 + 4.4Kg Paste 661985) 20L dual pack online. Reflective metallic coating up to 200°C heat.",
    "seoKeywords": "Berger Industrial Aluminium Paint IS 2339 Medium, Berger Aluminium IS 2339 Medium 661984, Berger 661985 Aluminium Paste, IS 2339 dual container aluminium paint 20L, industrial heat reflective silver aluminium paint, storage tank pipeline structural steel aluminium paint, Berger Protecton aluminium paint wholesale",
    "description": "Berger Industrial Aluminium Paint IS 2339 Medium is a genuine BIS IS 2339 dual-container industrial protective coating supplied as a 20L factory kit combining 17.1L oleoresinous medium (Code 661984) with 4.4 Kg leafing aluminium paste (Code 661985). Delivers a brilliant silvery metallic barrier with high solar reflectivity, weather/moisture shielding, and continuous heat resistance up to 200°C for storage tanks, pipelines, bridges, structural steel, and chimneys.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Industrial Paint and Coatings",
    "price": "₹ 6,695.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 6695
    },
    "unit": "L",
    "properties": [
      "Conforms to BIS IS 2339 Dual-Container Spec: 17.1L Medium (661984) + 4.4 Kg Al. Paste (661985)",
      "Bright Leafing Metallic Silver Finish with High Solar/Heat Reflectivity (Up to 200°C Continuous)",
      "Coverage 12–15 sq.m/L @ 12–15µm DFT | Surface Dry 4–6 Hrs, Hard Dry 24 Hrs | Thinner 800",
      "Ideal for Storage Tanks, Pipelines, Structural Steel, Bridges, Chimneys & Industrial Sheds"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 36,
    "image": "/assets/aistudio/Berger_Green_Industrial_Paint_Drum_c47eabff.png"
  },
  {
    "id": 4057,
    "name": "Berger Boiler Compound Heat Resistant Ferrotol No. 1 Paint",
    "slug": "berger-boiler-compound-heat-resistant-ferrotol-no-1-paint",
    "seoTitle": "Berger Ferrotol No. 1 Boiler Compound Paint (20L | 540°C)",
    "seoDescription": "Buy Berger Protecton Ferrotol - 1 Boiler Compound Paint (Code 052991) 20L drum online. Graphite-bituminous coating for boiler interiors up to 540°C wet heat.",
    "seoKeywords": "Berger Boiler Compound Heat Resistant Ferrotol No. 1 Paint, Berger Protecton Ferrotol - 1 052991, Ferrotol No 1 boiler interior paint 20L, heat resistant boiler drum tube coating 540C, graphite bituminous boiler compound paint, steam turbine economizer water wall coating, Berger Protecton industrial paint wholesale",
    "description": "Berger Boiler Compound Heat Resistant Ferrotol No. 1 Paint (Berger Protecton Ferrotol - 1, Code 052991) is a specialized single-pack Matt Black anti-corrosive graphite-in-bituminous protective compound engineered for 'hot-wet' steel interiors exposed to continuous hot water and steam up to 540°C. Bakes into an inert, impermeable barrier inside boiler drums, tubes, water walls, economizers, evaporators, steam accumulators, and turbine casings while simplifying future descaling.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Industrial Paint and Coatings",
    "price": "₹ 5,590.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 5590
    },
    "unit": "L",
    "properties": [
      "Official Berger Protecton Ferrotol - 1 (Code 052991 | 20L Drum | Matt Black Graphite-Bituminous)",
      "Resists Continuous Hot Water & Steam Wet Heat Up to 540°C Inside Boiler Drums, Tubes & Economizers",
      "Coverage ~12.9 sq.m/L @ 35µm DFT (78µm WFT) | Touch Dry 6–8 Hrs | Thin/Clean with Berger Thinner 800",
      "Thermal Bake-Cure (100°C Water Fill for 8 Hrs After 24 Hrs Air Dry) Simplifies Future Descaling"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 31,
    "image": "/assets/aistudio/Berger_Ferrotol_Industrial_Paint_Drum_628fd187.png"
  },
  {
    "id": 4058,
    "name": "Berger Epoxy Floor Paint - Pro Epishield Mark 100",
    "slug": "berger-epoxy-floor-paint-pro-epishield-mark-100",
    "seoTitle": "Berger Epoxy Floor Paint Pro Epishield Mark 100 - Buy Online",
    "seoDescription": "Protect concrete & plastered floors with Berger Pro Epishield Mark 100 Epoxy Floor Paint (6L). High-gloss 2K chemical & abrasion defense in White & Yellow.",
    "seoKeywords": "epoxy floor paint, Berger epoxy floor paint, Berger Pro Epishield Mark 100, Pro Epishield Mark100 Golden Yellow R6236, epoxy floor paint for concrete, epoxy floor paint for plastered surfaces, 2K epoxy floor marking paint 6L, industrial epoxy floor coating white yellow, Berger Protecton Catalyst R62CI2, epoxy floor paint price Coimbatore",
    "description": "Berger Epoxy Floor Paint - Pro Epishield Mark 100 (Berger Protection / Protecton Protective Coating Division) is a high-performance two-pack (2K) aliphatic amine-cured glossy epoxy floor coating and line marking paint engineered for concrete and plastered surfaces. Supplied as a complete 6L industrial kit (5L Net Base + 1L Catalyst R62CI2, 5:1 v/v mixing ratio) in Golden Yellow (R6236) and White for warehouses, factories, clean rooms, pharma plants, workshops, and automotive showrooms.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Epoxy Paint",
    "price": "₹ 3,169.00",
    "sizes": [
      6
    ],
    "sizePrices": {
      "6": 3169
    },
    "unit": "L",
    "shades": [
      {
        "name": "Golden Yellow",
        "code": "R6236",
        "hex": "#E5A01D"
      },
      {
        "name": "White",
        "code": "WHITE",
        "hex": "#FFFFFF"
      }
    ],
    "allowRalShades": false,
    "properties": [
      "Two-Pack (2K) Aliphatic Amine-Cured Glossy Epoxy Floor Paint for Concrete & Plastered Surfaces",
      "Complete 6L Kit (5L Base + 1L Catalyst R62CI2) · Strictly 5:1 (v/v) Mixing Ratio",
      "High Volume Solids (54 ± 2%) · 50–55 µm DFT/Coat · Coverage 9.8–10.8 m²/L (105–116 sq.ft/L)",
      "Chemical & Abrasion Resistant High-Gloss Finish in Golden Yellow (R6236) & White"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 28,
    "image": "/assets/aistudio/Berger_Pro_Epishield_Golden_Yellow_Drum_4b354320.png"
  },
  {
    "id": 4059,
    "name": "Berger Guideline Road and Kerb Marking 164 Floor Paint (Water Based)",
    "slug": "berger-guideline-road-and-kerb-marking-164-floor-paint-water-based",
    "seoTitle": "Berger Guideline 164 Road & Kerb Marking Paint - Buy Online",
    "seoDescription": "Mark roads, kerbs, parking lots & concrete floors with Berger Guideline 164 Water-Based Marking Paint (20L). Fast-dry IS-164 acrylic, low VOC, White & Yellow.",
    "seoKeywords": "Berger Guideline 164, Berger Guideline RM 164, road marking paint, kerb marking paint, water based road marking paint, IS 164 road marking paint, concrete floor marking paint, parking lot marking paint 20L, white yellow kerb paint, Berger water based floor paint Coimbatore",
    "description": "Berger Guideline Road and Kerb Marking 164 Floor Paint (Water Based) — Guideline RM 164 Paint (Code P34/000) is a single-pack, air-drying, 100% acrylic water-based road, kerb, and floor marking paint conforming to IS-164 specifications. Engineered with low VOC (< 30 g/L), lead content below 90 ppm, rapid 20-minute surface dry, UV & weather resistance, and tough wear durability across concrete floors, asphalt/bitumen roads, highway kerbs, parking lots, crash barriers, road lines, and runways. Supplied in 20L factory-sealed buckets in White and Yellow.",
    "brand": "Berger Paints",
    "topCategory": "Industrial",
    "subCategory": "Industrial Paint and Coatings",
    "price": "₹ 3,361.00",
    "sizes": [
      20
    ],
    "sizePrices": {
      "20": 3361
    },
    "unit": "L",
    "shades": [
      {
        "name": "White",
        "code": "P34/000",
        "hex": "#FFFFFF"
      },
      {
        "name": "Yellow",
        "code": "YELLOW",
        "hex": "#F2B705"
      }
    ],
    "allowRalShades": false,
    "properties": [
      "Single-Pack Water-Based 100% Acrylic Road, Kerb & Floor Marking Paint (Guideline RM 164 · IS-164)",
      "Fast Drying (~20 Min Surface Dry / ~60 Min Hard Dry) · Low VOC (< 30 g/L) · Lead ≤ 90 ppm",
      "High Spreading Rate: 10–14 m²/L (108–150 sq.ft/L) @ 25–35 µm DFT · Smooth Matt Finish",
      "Ideal for Road Lines, Kerbs, Parking Lots, Runways, Crash Barriers & Concrete Floors (20L · White & Yellow)"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 22,
    "image": "/assets/aistudio/Berger_Guideline_Road_Marking_Paint_Bucket_f35b7aa2.png"
  },
  {
    "id": 5001,
    "name": "MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish",
    "seoTitle": "MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish",
    "seoDescription": "Buy MRF MetalCoat Luxury 2K PU Paint - Metal and Wood Finish online at wholesale prices. Two-component non-yellowing polyurethane coating for metal gates, grilles, wood doors & industrial structures in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.",
    "seoKeywords": "MRF MetalCoat Luxury 2K PU Paint, Metal and Wood Finish, MRF MetalCoat PU Paint, 2K PU Paint for Metal and Wood, MRF Vapocure MetalCoat, RAL shade PU paint",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Enamel Paint",
    "price": "₹ 1,150.00",
    "sizes": [
      1,
      4
    ],
    "unit": "L",
    "properties": [
      "Two-component luxury 2K polyurethane (PU) finish for metal and wood",
      "Outstanding non-yellowing high-gloss or matt finish",
      "Superior abrasion, scratch, and chemical splash resistance",
      "Perfect for metal gates, wooden doors, automotive touchups & industrial structures"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2025/07/MetalCoat.webp"
  },
  {
    "id": 5002,
    "name": "MRF AquaFresh Interior Emulsion",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "name": "MRF Zameen 2K PU Floor Paint - For Concrete and Paver Blocks Surfaces",
    "seoTitle": "MRF Zameen 2K PU Floor Paint - For Concrete and Paver Blocks Surfaces",
    "seoDescription": "Buy MRF Zameen 2K PU Floor Paint - For Concrete and Paver Blocks Surfaces online at wholesale prices. Heavy-duty two-pack 2K polyurethane floor coating for concrete driveways, interlocking paver blocks, garage floors & industrial bays in White, Black, Dark Grey, Smoke Grey, Golden Yellow, Signal Red, Blue, Green & custom RAL shades.",
    "seoKeywords": "MRF Zameen 2K PU Floor Paint, For Concrete and Paver Blocks Surfaces, MRF Zameen Floor Coat, 2K PU Floor Paint, concrete driveway paint, paver block floor coating, MRF Vapocure Zameen",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "PU Paint",
    "price": "₹ 1,350.00",
    "sizes": [
      1,
      4,
      20
    ],
    "unit": "L",
    "properties": [
      "Heavy-duty 2K polyurethane floor paint for concrete and paver blocks surfaces",
      "Extreme abrasion resistance against forklift, car tire, and heavy foot traffic",
      "Superior resistance to oil, grease, detergents, water, and chemical spills",
      "Ideal for concrete driveways, paver blocks, garage floors, showrooms & walkways"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/11/zameen-copy.png"
  },
  {
    "id": 5004,
    "name": "MRF GlassCoat specialty PU Finish",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "PU Paint",
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
    "subCategory": "Exterior Paint",
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
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2025-07/Silk_Glamor_Matt_17-1x.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5036,
    "name": "Silk Glamor High Sheen",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2025-07/Silk_Glamor_Hi_Sheen_0.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5037,
    "name": "Silk Glamor Soft Sheen",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2025-07/Big-Silk_Glamor_Soft_Sheen_0.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5038,
    "name": "Silk Glamor Dazzle",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2025-07/Silk_Dazzle_Ultra_Hi..._.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5039,
    "name": "Easy Clean",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Easy%20Clean%20can_0.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5040,
    "name": "Easy Clean Silky Touch",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
    "price": "₹ 592.00",
    "sizes": [
      1,
      4,
      10,
      20
    ],
    "sizePrices": {
      "1": 592,
      "4": 2352,
      "10": 5706,
      "20": 11120
    },
    "unit": "L",
    "properties": [
      "Stain-resistant, smooth, washable paint with crack prevention.",
      "Smooth",
      "120-130 sq.ft/litre"
    ],
    "popular": false,
    "image": "https://images.bergerpaints.com/s3fs-public/2024-12/Easy%20Clean%20Silky%20Touch%20%282%29%20%281%29.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5041,
    "name": "Easy Clean Fresh",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Easy%20Clean%20Fresh%20can.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5042,
    "name": "Rangoli Rich Matt",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2025-09/Rangoli_Matt_Rich_1L-removebg-preview.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5043,
    "name": "Rangoli Total Care",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2025-09/Rangoli_Total_Care-removebg-preview_0.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5044,
    "name": "Bison Glow",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Bison%20Glow%20can.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5045,
    "name": "Bison Emulsion",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-09/Bison%20Can%20Shot.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5046,
    "name": "Bison Lite",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-11/tmp_9c85c9db-7e50-4c13-89ef-0ef211458fe2-fotor-bg-remover-20231108153920.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5047,
    "name": "GlamArt Italian Collection Diamond",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2026-01/Product%20Page_0.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5048,
    "name": "GlamArt Italian Collection Velluto",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2026-01/Product%20Page_1.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5049,
    "name": "GlamArt Italian Collection Panama",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2025-12/Product%20Page.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5050,
    "name": "GlamArt Italian Collection Decorative Primer",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2026-01/11%20%281%29.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5051,
    "name": "GlamArt Italian Collection Soffio",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2026-01/Product%20Page.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5052,
    "name": "GlamArt Italian Collection Damasco",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2026-01/Product%20Page_2.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5053,
    "name": "Silk Glamart Metallica",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-07/silk-glamart-metallica-can.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5054,
    "name": "Silk GlamArt Non Metallic",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Silk%20GlamArt%20Non%20Metallic%20can_0.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5055,
    "name": "Silk GlamArt Metallica for Designs",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-04/silk-glamart-metallica-for-designs-can_2.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5056,
    "name": "Silk GlamArt Stucco",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Silk%20GlamArt%20Stucco%20can.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5057,
    "name": "Silk GlamArt Vintage",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Silk%20GlamArt%20Vintage%20can.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5058,
    "name": "Silk Glamart Stones & Tones",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Silk%20GlamArt%20Stones%20_%20Tones%20can.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5059,
    "name": "Ceiling White",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2024-04/ceiling-white-can.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5060,
    "name": "Silk Metallics",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2025-12/silk%20metallics%20can%20600%20600.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5061,
    "name": "Kolor Plus",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2025-06/Kolor%20Plus%20600-600.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5062,
    "name": "Kolor Plus Glow",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2026-04/3D%20Kolor%20Plus%20Glow%202_1-4Lt%20copy.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5063,
    "name": "Weathercoat Long Life 15",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2024-10/longlife%2015%20can_enhanced.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5064,
    "name": "Weathercoat Long Life 10",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2025-02/Longlife%2010%20-%20paint%20can-02%20%281%29.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5065,
    "name": "Weathercoat Long Life Flexo",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2024-10/Weathercoat%20Long%20Life%20Flexo.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5066,
    "name": "Weathercoat Anti Dustt Kool",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2024-10/anti-dustt-kool-can_enhanced-removebg.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5067,
    "name": "Weathercoat Anti Dustt",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2024-10/weathercoat-anti-dustt-can__1_-removebg-preview.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5068,
    "name": "Weathercoat Glow",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-11/Long%20Life%2015-2.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5069,
    "name": "Weathercoat Champ",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2024-05/WC%20Champ%20600x600.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5070,
    "name": "Walmasta Glow",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2024-10/Walmasta%20Glow%20paint%20can-02_enhanced.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5071,
    "name": "Walmasta",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-09/Walmasta%20can.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5072,
    "name": "Walmasta Lite",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-09/walmasta%20lite%20can%20%281%29.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5073,
    "name": "Florentina Vintage",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Florantina%20vintage%20paint%20can-02.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5074,
    "name": "Florentina Sandstone",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Floranita%20Sandstone%20paint%20can-02.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5075,
    "name": "Florentina Glitteratti",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Florantina%20Glitteratti%20paint%20can-02_0.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5076,
    "name": "Solitaire Granite",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Solitaire%20granite%20paint%20can-02.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5077,
    "name": "Solitaire Stone",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/Solitaire%20stone%20paint%20can-02.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5078,
    "name": "Ruff & Tuff Pearl",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/ruff_n_tuff%20paint%20can-02.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5079,
    "name": "Ruff & Tuff Scratch",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/ruff_n_tuff%20paint%20can-02_5.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5080,
    "name": "Ruff & Tuff Decora Rollercast",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/ruff_n_tuff%20paint%20can-02_0.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5081,
    "name": "Ruff & Tuff Decora Rollercoat",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/ruff_n_tuff%20paint%20can-02_1.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5082,
    "name": "Ruff & Tuff Decora Dholpur Stone",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/ruff_n_tuff%20paint%20can-02_2.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5083,
    "name": "Weathercoat Long Life PU Tile Coat",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2023-08/longlife%20pu%20tile%20can.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5084,
    "name": "Weathercoat Floor Protector",
    "brand": "Berger Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "image": "https://images.bergerpaints.com/s3fs-public/2024-04/Weathercoatfloorprotector.png?format=webp&width=1200&quality=95"
  },
  {
    "id": 5007,
    "name": "MRF Durothane 2K PU Paint - Metal and Wood Finish",
    "seoTitle": "MRF Durothane 2K PU Paint - Metal and Wood Finish",
    "seoDescription": "Buy MRF Durothane 2K PU Paint - Metal and Wood Finish online at wholesale prices. Premium two-pack 2K polyurethane coating for wooden doors, furniture & metal surfaces with scratch, water & chemical resistance.",
    "seoKeywords": "MRF Durothane 2K PU Paint, Metal and Wood Finish, MRF Durothane PU Wood Finish, 2K PU Paint for Metal and Wood, MRF Vapocure Durothane, polyurethane metal wood coating",
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
      "Premium two-pack 2K polyurethane finish for metal and wood",
      "Exceptional gloss retention, clarity & smooth film build",
      "Outstanding resistance to scratching, water, and domestic chemicals",
      "Suitable for wooden doors, furniture, gates & heavy-wear metal and wood surfaces"
    ],
    "popular": true,
    "image": "https://www.mrfpaint.com/wp-content/uploads/2024/10/Durothane.webp"
  },
  {
    "id": 5008,
    "name": "MRF AquaFresh Cool",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Paint",
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
    "subCategory": "Primers",
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
    "subCategory": "Enamel Paint",
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
    "name": "MRF AquaFresh PU Interior and Exterior Wall Primer",
    "slug": "mrf-aquafresh-pu-wall-primer",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "name": "MRF Altura 2-in-1 Interior and Exterior Wall Primer",
    "slug": "mrf-altura-2-in-1-wall-primer",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "name": "MRF Sello 2-in-1 Interior and Exterior Wall Primer",
    "slug": "mrf-sello-2-in-1-wall-primer",
    "brand": "MRF Vapocure",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
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
    "subCategory": "Primers",
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
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/1/FU/YJ/AM/2220962/industrial-thinner-1000x1000.png"
  },
  {
    "id": 5018,
    "name": "MRF Single Pack Epoxy Primer Grey",
    "seoTitle": "MRF Single Pack Epoxy Primer Grey (SPEP) | MRF Vapocure | Buy Online",
    "seoDescription": "Buy MRF Single Pack Epoxy Primer Grey (Vapocure SPEP) online at wholesale prices. Fast-drying 1K solvent-based epoxy metal primer for mild steel, industrial fabrication & automotive parts. Available in 1L (₹420) & 4L (₹1,560) packs.",
    "seoKeywords": "MRF Single Pack Epoxy Primer Grey, MRF Vapocure SPEP Grey, MRF SP EP Primer Grey, 1K epoxy primer metal, single pack epoxy primer 1L 4L, anti corrosive grey primer",
    "description": "MRF Vapocure SPEP (Single Pack Epoxy Primer Grey) is a ready-to-use, single-component solvent-based epoxy primer engineered for mild steel, automotive panels, and industrial metal fabrication. Provides rapid touch-dry speed, high opacity, corrosion defense, and tenacious inter-coat adhesion.",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "Primers",
    "price": "₹ 420.00",
    "sizes": [
      1,
      4
    ],
    "sizePrices": {
      "1": 420,
      "4": 1560
    },
    "unit": "L",
    "properties": [
      "Ready-to-Use Single Pack Epoxy Primer (MRF Vapocure SPEP Grey)",
      "Fast Touch Dry (15-30 Mins) with 4-6 Hr Recoat Window & High Opacity",
      "Robust Anti-Corrosive Barrier & Superior Adhesion on Mild Steel & Metal",
      "Ideal Undercoat for 2K PU Coatings, MetalCoat & Industrial Enamels (1L & 4L)"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 58,
    "image": "/assets/aistudio/MRF_Vapocure_SPEP_Epoxy_Primer_Tin_671ab43b.png",
    "slug": "mrf-single-pack-epoxy-primer-grey"
  },
  {
    "id": 5019,
    "name": "MRF Xuper Yellow Primer",
    "seoTitle": "MRF Xuper Yellow Primer (Vapocure V254) 1L & 4L | Buy Online",
    "seoDescription": "Buy MRF Xuper Yellow Primer (MRF Vapocure V254 Zinc Chrome Yellow Metal Primer) in 1L (₹360) & 4L (₹1,420) tins online at wholesale prices. Fast-drying ~30 min surface dry anti-rust primer for iron, mild steel & structural fabrication.",
    "seoKeywords": "MRF Xuper Yellow Primer, MRF Vapocure Xuper Yellow Primer, MRF Zinc Chrome Yellow Primer V254, MRF Yellow Metal Primer 1L 4L, fast dry metal primer",
    "description": "MRF Xuper Yellow Primer (MRF Vapocure V254) is a fast-drying, single-pack zinc chrome anti-corrosive metal primer engineered for mild steel, structural ironwork, fabrication yards, and automotive chassis. Surface-dries in ~30 minutes with high rust-inhibitive adhesion.",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "Primers",
    "price": "₹ 360.00",
    "sizes": [
      1,
      4
    ],
    "sizePrices": {
      "1": 360,
      "4": 1420
    },
    "unit": "L",
    "properties": [
      "Fast-Drying MRF Vapocure Zinc Chrome Yellow Metal Primer (Item Code V254)",
      "Rapid ~30 Min Surface Dry Saves Labor Time Before Topcoating",
      "Superior Rust-Inhibitive Protection for Mild Steel, Iron & Metal Structures",
      "High Spreading Capacity (90-140 sq.ft/L) Available in 1L & 4L Tins"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 41,
    "image": "/assets/aistudio/MRF_Vapocure_Xuper_Yellow_Primer_Can_117fa5e0.png",
    "slug": "mrf-xuper-yellow-primer"
  },
  {
    "id": 5020,
    "name": "MRF PU Thinner For Finish",
    "slug": "mrf-pu-thinner-for-finish",
    "seoTitle": "MRF PU Thinner For Finish (TFF) | 1L, 5L & 20L | MRF Vapocure",
    "seoDescription": "Buy MRF PU Thinner For Finish (Thinner For Finish TFF) in 1L, 5L & 20L packs online at wholesale price. Slow-evaporating genuine solvent for WoodCoat & MetalCoat.",
    "seoKeywords": "MRF PU Thinner For Finish, MRF Thinner For Finish, MRF TFF Thinner, MRF WoodCoat Thinner, MRF MetalCoat Thinner, MRF Durothane PU Thinner 1L 5L 20L",
    "description": "MRF PU Thinner For Finish (Thinner For Finish TFF) is a genuine slow-evaporating polyurethane solvent engineered by MRF Corp for two-pack PU systems including WoodCoat, MetalCoat, Durothane, and Treatwood. Its controlled evaporation rate extends open time to prevent orange peel, dry spray, and blushing while maximizing mirror gloss.",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "Thinners & Solvents",
    "price": "₹ 390.00",
    "sizes": [
      1,
      5,
      20
    ],
    "sizePrices": {
      "1": 390,
      "5": 1920,
      "20": 7450
    },
    "unit": "L",
    "properties": [
      "Official Slow-Evaporating Polyurethane Thinner (MRF Thinner For Finish TFF)",
      "Compatible with MRF WoodCoat, MetalCoat, Durothane & Treatwood 2K PU Coatings",
      "Prevents Orange Peel, Micro-Bubbling & Solvent Blush in Warm Climates",
      "Available in Sealed 1L, 5L & 20L Genuine MRF Cans (24-Month Sealed Shelf Life)"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 47,
    "image": "/assets/aistudio/Thinner_for_Finish_Product_Can_14e3833f.png"
  },
  {
    "id": 5021,
    "name": "MRF Epoxy Thinner 1110 EP",
    "slug": "mrf-epoxy-thinner-1110-ep",
    "seoTitle": "MRF Epoxy Thinner 1110 EP | 1L, 5L & 20L | MRF Vapocure",
    "seoDescription": "Buy MRF Vapocure Epoxy Thinner 1110 EP in 1L, 5L & 20L packs online at wholesale prices. Specialized epoxy dilution solvent for Epidec primers & high-build finishes.",
    "seoKeywords": "MRF Epoxy Thinner 1110 EP, MRF Thinner 1110 EP, MRF Vapocure 1110 EP, MRF Epidec Epoxy Thinner, 1110EP thinner 5L 20L, industrial epoxy thinner",
    "description": "MRF Epoxy Thinner 1110 EP (MRF Vapocure Thinner 1110 EP) is a precision-blended industrial epoxy solvent specifically formulated to thin MRF Epidec epoxy primers, zinc-phosphate undercoats, and high-build epoxy finishes. Ensures smooth spray atomization, uniform dry film build, and hassle-free gun cleaning.",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "Thinners & Solvents",
    "price": "₹ 400.00",
    "sizes": [
      1,
      5,
      20
    ],
    "sizePrices": {
      "1": 400,
      "5": 1960,
      "20": 7650
    },
    "unit": "L",
    "properties": [
      "Specialized Industrial Solvent for MRF Epidec & Two-Pack Epoxy Primers/Finishes",
      "Optimizes Spray Viscosity Without Pinholes, Sagging or Premature Gelling",
      "High-Solvency Active Blend for Fast Spray Gun, Hose & Roller Cleaning",
      "Supplied in 1L, 5L & 20L Genuine MRF Vapocure Sealed Containers"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 34,
    "image": "/assets/aistudio/Blue_Vapocure_Paints_Thinner_Can_82b1b978.png"
  },
  {
    "id": 5022,
    "name": "MRF Melamine Thinner 3830",
    "slug": "mrf-melamine-thinner-3830",
    "seoTitle": "MRF Melamine Thinner 3830 (PU & Wood) | 1L, 5L & 20L",
    "seoDescription": "Buy MRF Vapocure Melamine Thinner 3830 in 1L, 5L & 20L cans online at wholesale price. Medium-drying thinner for Melamine Aura wood finish & 2K PU sealers.",
    "seoKeywords": "MRF Melamine Thinner 3830, MRF Thinner 3830, MRF Vapocure 3830 Thinner 5L, MRF Melamine Aura Thinner, wood polish thinner 3830, MRF PU melamine thinner",
    "description": "MRF Melamine Thinner 3830 (MRF Vapocure Thinner 3830) is a medium-drying industrial wood and PU thinner specifically balanced for MRF Melamine Aura clear/matt finishes, melamine sanding sealers, and general polyurethane sealers. Delivers clean air-bubble release, optical clarity, and streak-free flow.",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "Thinners & Solvents",
    "price": "₹ 340.00",
    "sizes": [
      1,
      5,
      20
    ],
    "sizePrices": {
      "1": 340,
      "5": 1650,
      "20": 6450
    },
    "unit": "L",
    "properties": [
      "Medium-Drying Thinner Formulated for MRF Melamine Aura & Sanding Sealers",
      "Promotes Smooth Flow, Bubble Release & Crystal Clarity on Interior Woodwork",
      "Also Compatible with MRF PU Sealers & General Polyurethane Applications",
      "Available in Genuine MRF 1L, 5L & 20L Containers (24-Month Sealed Shelf Life)"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 39,
    "image": "/assets/aistudio/MRF_Vapocure_Thinner_3830_Can_8b24fe26.png"
  },
  {
    "id": 5023,
    "name": "MRF Fast Drying PU Primer Grey",
    "slug": "mrf-fast-drying-pu-primer-grey",
    "seoTitle": "MRF Fast Drying PU Primer Grey (2:30 Hr Dry) | 1L & 4L",
    "seoDescription": "Buy MRF Vapocure Fast Dry 2:30 PU Primer Grey (with Hardener) in 1L & 4L packs online at wholesale prices. Dries in 2 Hr 30 Min @ 30°C for automotive & metal.",
    "seoKeywords": "MRF Fast Drying PU Primer Grey, MRF Fast Dry 2:30 Primer, MRF Vapocure 2K PU Primer Grey, 2K PU metal primer automotive, fast dry polyurethane surfacer 1L 4L, MRF PU primer with hardener",
    "description": "MRF Fast Drying PU Primer Grey (MRF Vapocure Fast Dry 2:30 Primer) is a heavy-duty two-component (2K) polyurethane anti-corrosive metal and automotive primer-surfacer supplied with dedicated PU Hardener. Engineered to hard-dry and sand cleanly in just 2 hours 30 minutes at 30°C, it delivers superior corrosion resistance, high filling build, and tenacious inter-coat adhesion beneath MRF MetalCoat, Durothane, and automotive topcoats.",
    "brand": "MRF Vapocure",
    "topCategory": "Industrial",
    "subCategory": "Primers",
    "price": "₹ 520.00",
    "sizes": [
      1,
      4
    ],
    "sizePrices": {
      "1": 520,
      "4": 1980
    },
    "unit": "L",
    "properties": [
      "Two-Pack Fast-Dry 2K Polyurethane Primer Surfacer Grey (Includes PU Hardener)",
      "Rapid Cure: Dries in 2 Hrs 30 Mins @ 30°C (Touch Dry 10–15 Mins) for Fast Sanding",
      "Superior Corrosion Resistance, High Filling Build & Excellent Topcoat Adhesion",
      "Ideal for Automotive Panels, Ferrous/Non-Ferrous Metal & 2K PU Topcoats (1L & 4L)"
    ],
    "popular": true,
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 43,
    "image": "/assets/aistudio/MRF_Vapocure_Paints_Product_Set_c2f2bd85.png"
  },

  {
    "id": 1024,
    "name": "Ultima Allura Concordia",
    "description": "Crafted when some of the hardest and strongest materials come together. Composite material that is a mixture of coarse particles - Crushed stone, sand, gravel & sometimes concrete.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 149.00",
    "properties": [
      "Stone Aggregates",
      "High Strength",
      "Luxury Finish"
    ],
    "sizes": [30],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 124,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/allura-concordia-chit-pack.png",
    "slug": "ultima allura concordia"
  },
  {
    "id": 1025,
    "name": "Ultima Allura Reserva",
    "description": "Inspired by the elegance of natural materials, gives distinct finish to the exterior walls. Mined and crafted for this very purpose, they have a distinct visual appearance of their own.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 147.00",
    "properties": [
      "Natural Material Look",
      "Distinct Finish",
      "Luxury Finish"
    ],
    "sizes": [30],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 124,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/allura-reserva-chit-pack1.png",
    "slug": "ultima allura reserva"
  },
  {
    "id": 1026,
    "name": "Ultima Allura Meraki",
    "description": "A blend of carefully selected sands and unfired clays mixed with pigments and minerals. Inspired by cladding materials – adding finishing touches.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 187.00",
    "properties": [
      "Cladding Inspired",
      "Pigment Mixed",
      "Luxury Finish"
    ],
    "sizes": [30],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 124,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/allura-meraki-chit-pack.png",
    "slug": "ultima allura meraki"
  },
  {
    "id": 1027,
    "name": "Ultima Allura Venezio",
    "description": "Taking inspiration from the beauty of Italian architecture, this captures the essence of rustic Italian exteriors and gives a fine grain textured finish.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 300.00",
    "properties": [
      "Italian Architecture",
      "Rustic Exterior",
      "Fine Grained Texture"
    ],
    "sizes": [30],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 124,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/textures/others/apex-ultima-allura-venezio-packshot-asian-paints.png",
    "slug": "ultima allura venezio"
  },
  {
    "id": 1028,
    "name": "Ultima Allura Torino",
    "description": "Imported from Italy and made with selected marble chips, it is a water-based product with a textured finish.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 346.00",
    "properties": [
      "Italian Marble Chips",
      "Water-based",
      "Luxury Finish"
    ],
    "sizes": [30],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 124,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/textures/others/apex-ultima-allura-torino-packshot-asian-paints.png",
    "slug": "ultima allura torino"
  },
  {
    "id": 1029,
    "name": "Ultima Allura Clara",
    "description": "High Performance protective coat crafted for enriching finish and boosting durability. Protective coat for Allura Concordia, Reserva and Meraki.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Exterior Texture",
    "price": "₹ 572.00",
    "properties": [
      "High Performance",
      "Enriching Finish",
      "Protective Coat"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 124,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-apex-ultima-clara.png",
    "slug": "ultima allura clara"
  },

  {
    "id": 1030,
    "name": "Royale Play Mineral",
    "description": "Mineral is a textured finish made with four types of sand, inspired by natural stone. Each wall is uniquely crafted, making it ideal for homes, offices, and pub",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 216.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A10_mineral.png",
    "slug": "royale-play-mineral"
  },
  {
    "id": 1031,
    "name": "Royale Play Ironic",
    "description": "Rustic Effect insipired by Iron rust",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 6160.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5408_Ironic.png",
    "slug": "royale-play-ironic"
  },
  {
    "id": 1032,
    "name": "Royale Play Selena",
    "description": "Selena brings the raw beauty of stone indoors, with layered sand textures that feel as grounded as they look—each finish uniquely crafted.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 184.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/1C18_Selena.png",
    "slug": "royale-play-selena"
  },
  {
    "id": 1033,
    "name": "Wall To Floor Waterproof Top Coat",
    "description": "Wall to Floor is a seamless PU + epoxy system for waterproof coverage across surfaces, adding modern elegance to interiors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 4583.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A36_Top-Coat-B.png",
    "slug": "wall-to-floor-waterproof-top-coat"
  },
  {
    "id": 1034,
    "name": "Epoxy Binder Clear",
    "description": "Elegant. Modern. Versatile. The Wall to Floor multi-layer waterproof system offers seamless, continuous coverage across horizontal and vertical surfaces. Adding a dash of luxury to all modern interiors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 3547.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6756_epoxy-binder.png",
    "slug": "epoxy-binder-clear"
  },
  {
    "id": 1035,
    "name": "Royale Play Zaffiano Top Coat",
    "description": "A rich smoky finish with the visuals of softness of burnished leather. Designed to add warmth & glow to interiors, it is ideal for feature walls, lounges, lobbies or residences seeking an artisanal touch.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 6500.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/1C17_Zaffiano-Top-coat.png",
    "slug": "royale-play-zaffiano-top-coat"
  },
  {
    "id": 1036,
    "name": "Metal Powder",
    "description": "Metal Powder Epoxy Base Coat is a two-component decorative coating for indoor walls and technical surfaces. It contains additives for smooth application.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 13024.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6754_Metallo-Fuso.png",
    "slug": "metal-powder"
  },
  {
    "id": 1037,
    "name": "Royale Play Marmorino",
    "description": "Designer Plaster for all you walls",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 249.20",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5410_Marmorino.png",
    "slug": "royale-play-marmorino"
  },
  {
    "id": 1038,
    "name": "Royale Play Verderame",
    "description": "Copper rust effect for your interiors",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 6179.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5499_Verderame.png",
    "slug": "royale-play-verderame"
  },
  {
    "id": 1039,
    "name": "Royale Play Lithos",
    "description": "Lithos gives textured wall finishes inspired by real stone that transform spaces like never before",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 175.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/1A58_Lithos.png",
    "slug": "royale-play-lithos"
  },
  {
    "id": 1040,
    "name": "Royale Play Mica",
    "description": "This finish adds subtle mica flakes to the Lithos finish. Its dynamic play of light adds a dash of glimmer to your walls. Understated yet luxurious, this finish is elegant and works well with every décor.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 4800.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A11_Lithos-Mica.png",
    "slug": "royale-play-mica"
  },
  {
    "id": 1041,
    "name": "Wall To Floor Ath",
    "description": "Elegant. Modern. Versatile. The Wall to Floor multi-layer waterproof system offers seamless, continuous coverage across horizontal and vertical surfaces. Adding a dash of luxury to all modern interiors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 2311.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5607_W2F.png",
    "slug": "wall-to-floor-ath"
  },
  {
    "id": 1042,
    "name": "Ap Image Transfer Paint",
    "description": "An acrylic emulsion that brings your ideas to life. Use it with stencil designs and Calcecruda mineral coating to personalize your space.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 6250.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A26_Image-Transfer-Paint.png",
    "slug": "ap-image-transfer-paint"
  },
  {
    "id": 1043,
    "name": "Wall To Floor Pri",
    "description": "Elegant. Modern. Versatile. The Wall to Floor multi-layer waterproof system offers seamless, continuous coverage across horizontal and vertical surfaces. Adding a dash of luxury to all modern interiors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 3468.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Gloss"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5606_W2F-Primer.png",
    "slug": "wall-to-floor-pri"
  },
  {
    "id": 1044,
    "name": "Royale Play Mineral Sealer",
    "description": "Elegant. Modern. Versatile. The Wall to Floor multi-layer PU + epoxy waterproof system offers seamless, continuous coverage across horizontal and vertical surfaces. Adding a dash of luxury to all modern interiors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 4353.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Sheen"
    ],
    "sizes": [1],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A35_Mineral-Sealer.png",
    "slug": "royale-play-mineral-sealer"
  },
  {
    "id": 1045,
    "name": "Royale Play Dune",
    "description": "Africa, a continent of vibrant colours, deserts, and sand dunes, is the inspiration. With metallic pigments this evokes a sub-saharan theme.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 354.40",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Sheen"
    ],
    "sizes": [1, 5],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/royale-play-dune-packshot-asian-paints.png",
    "slug": "royale-play-dune"
  },
  {
    "id": 1046,
    "name": "Royale Play Metallics",
    "description": "Pick from a large variety of textures available for different conditions and give your wall the perfect look.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 363.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Sheen"
    ],
    "sizes": [1, 5],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/royale-play-metalics-packshot-asian-paints.png",
    "slug": "royale-play-metallics"
  },
  {
    "id": 1047,
    "name": "Royale Play Infinitex",
    "description": "Inspired by the various elements of nature, this is a range of designer interior textures that provides texture paint designs for walls",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 192.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Metallic Lustre"
    ],
    "sizes": [1, 5],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/textures/others/royale-play-infinitex-packshot-asian-paints.png",
    "slug": "royale-play-infinitex"
  },
  
  {
    "id": 1049,
    "name": "Royale Play Pro",
    "description": "Provides protective against stains & is water repellent",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 256.60",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5449_Protective-Coat.png",
    "slug": "royale-play-pro"
  },
  {
    "id": 1050,
    "name": "Royale Play Calcecruda",
    "description": "Bring comfort home with Calcecruda - a micro-porous mineral decorative coating with strong natural connotations.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 133.80",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5497_Calcecrudda.png",
    "slug": "royale-play-calcecruda"
  },
  {
    "id": 1051,
    "name": "Royale Play  velour",
    "description": "Velour Classique reimagines velvet with a soft pearl-opaque look and rich texture. Its metallic shades add a stylish, premium finish to interiors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 2050.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A31_Velour.png",
    "slug": "royale-play-velour"
  },
  {
    "id": 1052,
    "name": "Royale Play Zaffiano Base Coat",
    "description": "A rich smoky finish with the visuals of softness of burnished leather. Designed to add warmth & glow to interiors, it is ideal for feature walls, lounges, lobbies or residences seeking an artisanal touch.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 5500.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/1C16_Zaffiano-base-Coat.png",
    "slug": "royale-play-zaffiano-base-coat"
  },
  {
    "id": 1053,
    "name": "Royale Play Marmofresco",
    "description": "Worn and raw, this rustic finish captures the patina of aged lime—perfect for heritage-inspired interiors, boutique resorts, or homes seeking subtle nostalgia.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 184.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/1C07_Marmofresco.png",
    "slug": "royale-play-marmofresco"
  },
  {
    "id": 1054,
    "name": "Metal Powder Epoxy Base Coat",
    "description": "Metal Powder Epoxy Base Coat is a decorative indoor coating made of epoxy resins, aggregates, and additives for smooth application.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 3800.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A33_Epoxy-Base-Coat.png",
    "slug": "metal-powder-epoxy-base-coat"
  },
  {
    "id": 1055,
    "name": "Royale Play Teodorico",
    "description": "Lime base luxury fininsh for modern walls",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 249.60",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5409_Teoderico.png",
    "slug": "royale-play-teodorico"
  },
  {
    "id": 1056,
    "name": "Archi Argilla",
    "description": "Inspired by the earth and its colours this mineral designer plaster coat is ideal for lending a trendy, chic, rustic, look to modern interiors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 433.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A25_Argilla.png",
    "slug": "archi-argilla"
  },
  {
    "id": 1057,
    "name": "Royale Play Archi Concrete",
    "description": "Archi Concrete provide an industrial finish for interiror spaces",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 133.80",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5614_Archi-Concrete.png",
    "slug": "royale-play-archi-concrete"
  },
  {
    "id": 1058,
    "name": "Wall To Floor Clear",
    "description": "Elegant. Modern. Versatile. The Wall to Floor multi-layer waterproof system offers seamless, continuous coverage across horizontal and vertical surfaces. Adding a dash of luxury to all modern interiors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 5055.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5607_W2F.png",
    "slug": "wall-to-floor-clear"
  },
  {
    "id": 1059,
    "name": "Wall To Floor Base Coat",
    "description": "Elegant. Modern. Versatile. The Wall to Floor multi-layer waterproof system offers seamless, continuous coverage across horizontal and vertical surfaces. Adding a dash of luxury to all modern interiors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 297.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5603_W2F-Rasal.png",
    "slug": "wall-to-floor-base-coat"
  },
  {
    "id": 1060,
    "name": "Wall To Floor Waterproof",
    "description": "Elegant. Modern. Versatile. The Wall to Floor multi-layer PU + epoxy waterproof system offers seamless, continuous coverage across horizontal and vertical surfaces. Adding a dash of luxury to all modern interiors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 132.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A34_wall2floor.png",
    "slug": "wall-to-floor-waterproof"
  },
  {
    "id": 1061,
    "name": "Royale Play Opaco Matt",
    "description": "Add comfort and elegance with this designer plaster made of matte metallics and quartz. It creates rich chromatic and tactile effects across walls for a premium",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 2050.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A32_Opaco-Matt.png",
    "slug": "royale-play-opaco-matt"
  },
  {
    "id": 1062,
    "name": "Royale Play Stucco Mirror",
    "description": "Stucco Mirror is a mineral plaster that creates glossy, high-end finishes with soft, vibrant tones using pure slaked lime and special additives.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 195.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A41_Stucco-Mirror.png",
    "slug": "royale-play-stucco-mirror"
  },
  
  {
    "id": 1064,
    "name": "Royale Play Special Effects",
    "description": "This water-based special effects paint offers one of the largest variety of effects for interior walls to choose from.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 222.20",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1, 5],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/royale-play-special-effect-packshot-asian-paints.png",
    "slug": "royale-play-special-effects"
  },
  {
    "id": 1065,
    "name": "Royale Play Antico",
    "description": "Inspired by Italian interior finishes, Antico’s metallic textured paints lend an ageless quality to any room.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Interior Texture",
    "price": "₹ 2820.00",
    "properties": [
      "Special Effects",
      "Easy Application",
      "Environment Friendly"
    ],
    "sizes": [1],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/royale-play-antico-packshot-asian-paints.png",
    "slug": "royale-play-antico"
  },

  
  {
    "id": 1101,
    "name": "SmartCare Damp Block 2k - Prime",
    "description": "Exceptional waterproofing for interior walls and bathrooms due to a two-component, high performance coating.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 155.00",
    "properties": [
      "12 Years Waterproofing Warranty",
      "Surface Temperature Reduction",
      "Anti-efflorescence"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-damp-block-2k-prime-asian-paints.png",
    "slug": "smartcare-damp-block-2k-prime"
  },
  {
    "id": 1102,
    "name": "SmartCare Tile Coat",
    "description": "Clear waterproofing coating for terraces with tiles",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 300.00",
    "properties": [
      "5 years waterproofing warranty",
      "Excellent Adhesion",
      "High Elongation"
    ],
    "sizes": [1, 4],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/tile-coat-packshot.png",
    "slug": "smartcare-tile-coat"
  },
  {
    "id": 1103,
    "name": "SmartCare Infinia",
    "description": "Give your terrace the superior waterproofing with this PUD reinforced liquid applied waterproof coating",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 625.00",
    "properties": [
      "5 years warranty",
      "Crack bridging ability",
      "Top coat coverage increase up to 10%"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/SmartCare-Infinia.png",
    "slug": "smartcare-infinia"
  },
  {
    "id": 1104,
    "name": "SmartCare Damp Proof",
    "description": "Give your terrace the superior waterproofing with this glass fiber reinforced elastomeric liquid membrane.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 392.00",
    "properties": [
      "Upto 10 years Warranty",
      "Surface Heat Reduction",
      "Crack Bridging"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "/assets/aistudio/smartcare_damp_proof_packshot_hd.jpg",
    "slug": "smartcare-damp-proof"
  },
  {
    "id": 1105,
    "name": "SmartCare Damp Block 2k",
    "description": "Exceptional waterproofing for interior walls and bathrooms due to a two-component, high performance coating.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 169.00",
    "properties": [
      "Food Grade Certified",
      "2 years Warranty",
      "Microbial"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-dampblock-2k-asian-paints-new.png",
    "slug": "smartcare-damp-block-2k"
  },
  {
    "id": 1106,
    "name": "SmartCare Damp Proof Ultra",
    "description": "Give your home the ultimate waterproofing with this innovative fiber reinforced elastomeric liquid.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 512.00",
    "properties": [
      "Strong Bonding Agent",
      "Reduces Cracking and Shrinkage",
      "Excellent mortar modifier"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "/assets/aistudio/smartcare_damp_proof_ultra_packshot_hd.jpg",
    "slug": "smartcare-damp-proof-ultra"
  },
  {
    "id": 1107,
    "name": "SmartCare Tile Adhesive",
    "description": "Expertly fix natural stones, large ceramic on interior and exterior surfaces with this heavy duty adhesive.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 53.00",
    "properties": [
      "Superior Technology",
      "Weather and Chemical Resistance",
      "Flexibilty"
    ],
    "sizes": [20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-stone-heavy-tile-adhesive-asian-paints.png",
    "slug": "smartcare-tile-adhesive"
  },
  

  {
    "id": 1120,
    "name": "Putty Boost",
    "description": "Integral compound to enhance workability and performance of wall putty testagain.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 176.00",
    "properties": [
      "SELF CURING",
      "EXCELLENT ADHESION",
      "SMOOTH FINISH"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-putty-boost-asian-paints.png",
    "slug": "putty-boost"
  },
  {
    "id": 1121,
    "name": "Crack Nil",
    "description": "A white cement based polymer modified powder material used for filling cracks in plastered surface.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 80.00",
    "properties": [
      "5 years warranty",
      "Crack bridging ability",
      "Top coat coverage increase up to 10%"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-cracknil-asian-paints.png",
    "slug": "crack-nil"
  },
  {
    "id": 1122,
    "name": "SmartCare Block Joining Mortar",
    "description": "The perfect solution for fixing of AAC blocks, concrete blocks and fly ash bricks.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 26.00",
    "properties": [
      "12 Years Waterproofing Warranty",
      "Surface Temperature Reduction",
      "Anti-efflorescence"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-block-joining-mortar-asian-paints.png",
    "slug": "smartcare-block-joining-mortar"
  },
  {
    "id": 1123,
    "name": "Ultra Block 2k",
    "description": "Two component acrylic polymer modified high performance coating system.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 197.00",
    "properties": [
      "Reduced Shrinkage",
      "Reduces Cracking",
      "Mortar Modifier"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-ultrablock2K-asian-paints.png",
    "slug": "ultra-block-2k"
  },
  
  {
    "id": 1125,
    "name": "Damp Proof Advanced",
    "description": "Give unmatched waterproofing and superior whiteness to your Terraces & Exterior walls. Its excellent water resistance property keeps your terrace leakage free.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 401.00",
    "properties": [
      "3 years Warranty",
      "Anti-Efflorescence",
      "Anti-carbonation"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/DP-Advanced-Packshot.png",
    "slug": "damp-proof-advanced"
  },
  {
    "id": 1126,
    "name": "SmartCare Cemboost 200",
    "description": "A revolutionary waterproofing compound that waterproofs your walls from the inside test.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 127.00",
    "properties": [
      "Grainy Texture",
      "Ease of use",
      "Excellent Paintability"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/cemboost.png",
    "slug": "smartcare-cemboost-200"
  },
  {
    "id": 1127,
    "name": "SmartCare Vitalia Neo",
    "description": "An integral waterproofing compound that waterproofs the structure at the time of construction itself.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 131.00",
    "properties": [
      "Crack Filing",
      "High Flexibility",
      "Mechanical Strength"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-vitalia-neo-asian-paints.png",
    "slug": "smartcare-vitalia-neo"
  },
  {
    "id": 1128,
    "name": "Tile Adhesive For Tile-on-tile Application",
    "description": "Replace your existing tiles with new ones the hassle-free way using the SmartCare Tile Adhesive.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 48.00",
    "properties": [
      "Easy Application",
      "Excellent Adhesion",
      "Ready-to-Use"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-tile-on-tile-adhesive-asian-paints.png",
    "slug": "tile-adhesive-for-tile-on-tile-application"
  },
  {
    "id": 1129,
    "name": "SmartCare Waterproofing Putty",
    "description": "Waterproof Putty to protect your walls from dampness and provide long lasting beauty for your walls",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 54.00",
    "properties": [
      "Waterproofing",
      "High Performance",
      "Protection"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-waterproofing-putty-asian-paints-new.png",
    "slug": "smartcare-waterproofing-putty"
  },
  {
    "id": 1130,
    "name": "SmartCare Ezy White Tile Adhesive",
    "description": "Confidently fix your marbles and white tiles in interior and exterior surfaces using this ready-to-mix, white adhesive.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 207.00",
    "properties": [
      "5 years waterproofing warranty",
      "Excellent Adhesion",
      "High Elongation"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-ezy-white-tile-adhesive-asian-paints.png",
    "slug": "smartcare-ezy-white-tile-adhesive"
  },
  {
    "id": 1131,
    "name": "SmartCare Hydroloc Xtreme",
    "description": "Pre-putty waterproofing coating against dampness and efflorescence.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 590.00",
    "properties": [
      "Reduced Shrinkage",
      "Reduces Cracking",
      "Mortar Modifier"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Smartcare-Hydfroloc-Xtreme.png",
    "slug": "smartcare-hydroloc-xtreme"
  },
  {
    "id": 1132,
    "name": "SmartCare Damp Sheath Interior Primer Advanced",
    "description": "A specially formulated interior waterproofing primer to prevent surface dampness.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 270.00",
    "properties": [
      "3 years waterproofing warranty",
      "7X more water resistant",
      "Upto 15% increase in top coat coverage"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Damp-sheath-interior-advanced-packshot.png",
    "slug": "smartcare-damp-sheath-interior-advanced"
  },
  {
    "id": 1133,
    "name": "SmartCare Akrylmax",
    "description": "An easily paintable acrylic based joint filling sealant perfect for those cracks on doors, windows and switchboard.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 555.00",
    "properties": [
      "Water-resistant",
      "Anti-fungal",
      "Mold-resistant"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-akrylmax-asian-paints.png",
    "slug": "smartcare-akrylmax"
  },
  {
    "id": 1134,
    "name": "Xtremoseal Neutral",
    "description": "One component odourless silicone sealant, designed for sealing and waterproofing gaps and joints in Metal, Glass, Wood, Masonry surfaces etc.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 1500.00",
    "properties": [
      "Waterproofing",
      "High Performance",
      "Protection"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Xtremoseal-Neutral-packshott.png",
    "slug": "xtremoseal-neutral"
  },
  {
    "id": 1150,
    "name": "Marvelloplast S500",
    "description": "Asian Paints Marvelloplast Super 500 is an advanced gypsum plaster for levelling undulations on interior walls.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 18.00",
    "properties": [
      "5 years warranty",
      "Crack bridging ability",
      "Top coat coverage increase up to 10%"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/marvelloplast-asian-paints.png",
    "slug": "marvelloplast-s500"
  },
  {
    "id": 1151,
    "name": "SmartCare Damp Sheath Interior Primer",
    "description": "A specially formulated interior waterproofing primer to prevent surface dampness.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 270.00",
    "properties": [
      "Strong Bonding Agent",
      "Reduces Cracking and Shrinkage",
      "Excellent mortar modifier"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "/assets/aistudio/smartcare_damp_sheath_interior_packshot_hd.jpg",
    "slug": "smartcare-damp-sheath-interior"
  },
  {
    "id": 1152,
    "name": "SmartCare Roof Tapes",
    "description": "Made of advanced rubber with durable elasticity, this tape is perfect for waterproofing construction joints in buildings.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 932.00",
    "properties": [
      "Adhesion",
      "Flexibility",
      "Hybrid Technology"
    ],
    "sizes": [1],
    "unit": "pc",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-roof-tapes-asian-paints.png",
    "slug": "smartcare-roof-tapes"
  },
  {
    "id": 1153,
    "name": "SmartCare Epoxy Triblock",
    "description": "Food grade certified waterproofing solutions for cementitious water tanks.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 679.00",
    "properties": [
      "Grainy Texture",
      "Ease of use",
      "Excellent Paintability"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-epoxy-triblock-asian-paints.png",
    "slug": "smartcare-epoxy-triblock"
  },
  {
    "id": 1154,
    "name": "SmartCare Hybrid Pu Sealant",
    "description": "An effective rubber-type seal for dynamic structural joints and cracks on interiors as well as exteriors surfaces.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 1047.00",
    "properties": [
      "Easy to remove stains",
      "Long lasting beauty of tiles"
    ],
    "sizes": [1],
    "unit": "pc",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-pu-sealant-asian-paints.png",
    "slug": "smartcare-hybrid-pu-sealant"
  },
  {
    "id": 1155,
    "name": "SmartCare Tile Grout - Cement Based",
    "description": "Ensure zero leakages from tile joints in an affordable way with this economical solution.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 112.00",
    "properties": [
      "Water Impermeability",
      "Compressive Strength",
      "Workability"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-tile-grout-cement-based-asian-paints.png",
    "slug": "smartcare-tile-grout-cement-based"
  },
  {
    "id": 1156,
    "name": "SmartCare Tile Grout - Epoxy Based",
    "description": "An exceptional epoxy-based tile grout with 26 shades that match the tiles at home.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 932.00",
    "properties": [
      "Water Resistance",
      "Effloroscence Resistant",
      "Vibrant White Whiteness"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-tile-grout-epoxy-based-asian-paints.png",
    "slug": "smartcare-tile-grout-epoxy-based"
  },
  {
    "id": 1157,
    "name": "SmartCare White Multipurpose Tile Adhesive",
    "description": "Confidently fix your glass mosaic tiles in interior and exterior surfaces using this ready-to-mix, white adhesive.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 59.00",
    "properties": [
      "Water-resistant",
      "Anti-fungal",
      "Mold-resistant"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/asian-paints-smart-care-white-multipurpose-tile-adhesives-new.png",
    "slug": "smartcare-white-multipurpose-tile-adhesive"
  },
  {
    "id": 1158,
    "name": "Tile Bonder",
    "description": "A free-flowing powder which can be used as an additive for cement paste for enhancing its workability and notch-ability for machan or leveling bed application.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 67.00",
    "properties": [
      "Improves compressive strength of cement tile grout",
      "Gives a glossy finish to the grout",
      "Enhances water resistance of cement tile grout"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/tile-bonder.webp",
    "slug": "tile-bonder"
  },
  {
    "id": 1159,
    "name": "SmartCare Crack Seal Advanced",
    "description": "A smart solution to fix cracks on exterior and interior surfaces. Its innovative crack bridging ability ensures those do not reoccur anytime soon.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 730.00",
    "properties": [
      "Water-resistant",
      "Anti-fungal",
      "Non-corrosive"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/advance_crack_seal.png",
    "slug": "smartcare-crack-seal-advanced"
  },
  {
    "id": 1160,
    "name": "Epoxy Tile Grout 2 Component  Ready Shades",
    "description": "A two-component epoxy resin-based ready shades grout specifically designed for application in ceramic tiles, vitrified tiles and stone joints where a hygienic and sterile condition is required.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ NaN",
    "properties": [
      "Water-resistant",
      "UV resistant",
      "Anti-fungal"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/tile-grout-2K.webp",
    "slug": "epoxy-tile-grout-2-component-ready-shades"
  },
  {
    "id": 1161,
    "name": "Akrylmax Prime",
    "description": "An easily paintable acrylic based joint filling sealant perfect for those cracks on doors, windows and switchboard.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 614.00",
    "properties": [
      "Upto 25 years Warranty",
      "Surface Heat Reduction",
      "Superior Crack Bridging"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Akrylmax-prime-packshott.png",
    "slug": "akrylmax-prime"
  },
  {
    "id": 1162,
    "name": "SmartCare Damp Proof Xtreme",
    "description": "Waterproofing coating for terraces and exterior walls",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 460.00",
    "properties": [
      "5 years warranty",
      "Crack bridging ability",
      "Top coat coverage increase up to 10%"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/SC-dampproof-xtreme-new.png",
    "slug": "smartcare-damp-proof-xtreme"
  },
  {
    "id": 1163,
    "name": "Damp Proof Play",
    "description": "A single component elastomeric liquid with waterproofing properties for decorative terrace application on a horizontal surface",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 605.00",
    "properties": [
      "3 years Warranty",
      "Anti-Efflorescence",
      "Anti-carbonation"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/dampproofplay-resized-new.png",
    "slug": "damp-proof-play"
  },
  {
    "id": 1164,
    "name": "SmartCare Repairmax 200",
    "description": "Strengthen your floors, beams and other cement surfaces using this high-performance binder. Additionally, it can waterproof toilets, bathrooms and small terraces.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 242.00",
    "properties": [
      "5 years warranty",
      "Crack bridging ability",
      "Top coat coverage increase up to 10%"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/repairmax.png",
    "slug": "smartcare-repairmax-200"
  },
  {
    "id": 1165,
    "name": "SmartCare Crack Seal",
    "description": "A smart solution to fix cracks on exterior and interior surfaces. Its innovative crack bridging ability ensures those do not reoccur anytime soon.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 1092.00",
    "properties": [
      "Upto 12 years Warranty",
      "Surface Heat Reduction",
      "Superior Technology"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-crack-seal-asian-paints.png",
    "slug": "smartcare-crack-seal"
  },
  {
    "id": 1166,
    "name": "SmartCare Repair Polymer",
    "description": "Strengthen your floors, beams and other cement surfaces using this high-performance binder. Additionally, it can waterproof toilets, bathrooms and small terraces.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 265.00",
    "properties": [
      "Easy application",
      "Excellent Adhesion",
      "Ready to use"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-repair-polymer-asian-paints.png",
    "slug": "smartcare-repair-polymer"
  },
  {
    "id": 1167,
    "name": "SmartCare Tile Grout - Epoxy Based 3k",
    "description": "An exceptional epoxy-based tile grout with 10 shades that match the tiles at home.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 2182.00",
    "properties": [
      "3 years Warranty",
      "Anti-Efflorescence",
      "Anti-carbonation"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-tile-grout-epoxy-3k-asian-paints.png",
    "slug": "smartcare-tile-grout-epoxy-based-3k"
  },
  {
    "id": 1168,
    "name": "Xtremoseal Gp",
    "description": "One component silicone sealant, designed for sealing and waterproofing gaps and joints in Metal, Glass, Wood, Masonry surfaces etc.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 1357.00",
    "properties": [
      "Water-resistant",
      "Anti-fungal",
      "Non-corrosive"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/XTREMOSEAL-GP-packshott.png",
    "slug": "xtremoseal-gp"
  },
  {
    "id": 1169,
    "name": "SmartCare Tile Cleaner",
    "description": "A high quality active cleaner for daily maintenance of tiles, bath tubs, wash basins and common cementitious tile grout stains.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 205.00",
    "properties": [
      "Enhances the notching ability of the cement mixture",
      "Improves workability of the cement",
      "Provides excellent slag resistance"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-tile-cleaner-asian-paints.png",
    "slug": "smartcare-tile-cleaner"
  },
  {
    "id": 1170,
    "name": "Tile Adhesive For Normal Application",
    "description": "A sturdy cement tile adhesive that extends the life of tiled floors and walls of bathrooms, interiors as well as exteriors.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Waterproofing",
    "price": "₹ 28.00",
    "properties": [
      "Long life",
      "Water Resistance",
      "Chemical Resistance"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-tile-adhesive-normal-application-asian-paints.png",
    "slug": "tile-adhesive-for-normal-application"
  },

  
  {
    "id": 1181,
    "name": "WoodTech Insignia",
    "description": "A polyurethane based texture coating, which offers excellent aesthetic and smooth finish for interior décor.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 3409.00",
    "properties": [
      "High customisation",
      "Smooth finish",
      "450+ shades"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-insignia-asian-paints.png",
    "slug": "woodtech-insignia"
  },
  {
    "id": 1182,
    "name": "WoodTech Insignia- Classic Series",
    "description": "A polyurethane based texture coating, which offers excellent aesthetic and smooth finish Effects for interior décor.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 4658.00",
    "properties": [
      "High customisation",
      "Smooth finish",
      "1600+ shades"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Woodtech-Insignia-packshot.png",
    "slug": "woodtech-insignia-classic-series"
  },
  {
    "id": 1183,
    "name": "WoodTech Polyester Gold",
    "description": "A paraffined based clear coating, which offers best in class Gloss, excellent hardness and long lasting finish to wooden furniture",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1098.00",
    "properties": [
      "Mirror like Finish",
      "Excellent Hardness",
      "Durability"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-polyester-gold-asian-paints-new.png",
    "slug": "woodtech-polyester-gold"
  },
  {
    "id": 1184,
    "name": "WoodTech Epoxy Insulator Neo",
    "description": "Base coat which acts as a barrier to prevent oil from wood from damaging the coating",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1133.00",
    "properties": [
      "Universal undercoat",
      "Polyester Compatible",
      "Prevents damage from oil"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Woodtech-Epoxy-Insulator-Neo.png",
    "slug": "woodtech-epoxy-insulator-neo"
  },
  {
    "id": 1185,
    "name": "WoodTech Insignia- Chrome Series",
    "description": "WoodTech Insignia Chrome series is acrylic Based super fine special effect paint, which transforms wooden furniture into luxurious & unique masterpiece.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 6999.00",
    "properties": [
      "High customisation",
      "Smooth finish",
      "4 shades"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Woodtech-Insignia-Chrome.png",
    "slug": "woodtech-insignia-chrome-series"
  },
  {
    "id": 1186,
    "name": "WoodTech Polyester Vfm",
    "description": "Paraffin based wood coating that brings unparalleled glossy surface finish",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 676.00",
    "properties": [
      "High Film strength",
      "Water like clarity",
      "High Gloss"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Woodtech-Polyester-UL-Wood-Coating.png",
    "slug": "woodtech-polyester-vfm"
  },
  {
    "id": 1187,
    "name": "WoodTech Emporio Acrylic Pu",
    "description": "An acrylic based clear coating, which offers best in class, long lasting non-yellowing water white clear film.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1781.00",
    "properties": [
      "Solvent based",
      "Excellent long-lasting durability",
      "Non-yellowing"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-emporio-pu-asian-paints.png",
    "slug": "woodtech-emporio-acrylic-pu"
  },
  {
    "id": 1188,
    "name": "WoodTech Insignia- Metallics Series",
    "description": "Asian Paints WoodTech Insignia Metallic series is acrylic Based fine metallic special effect paint, which transforms wooden furniture into luxurious & unique masterpiece.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 3699.00",
    "properties": [
      "High customisation",
      "Smooth finish",
      "8 shades"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Woodtech-Insignia-Metallic.png",
    "slug": "woodtech-insignia-metallics-series"
  },
  {
    "id": 1189,
    "name": "WoodTech Emporio Regal Pu Clear",
    "description": "An acrylic based clear coating, which offers excellent weather resistance, light-fastness and UV protection",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1018.00",
    "properties": [
      "Superior Stain Resistance",
      "Superior Water Resistance",
      "Superior Scratch Resistance"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-emporio-regal-asian-paints.png",
    "slug": "woodtech-emporio-regal-pu-clear"
  },
  {
    "id": 1190,
    "name": "WoodTech River Resin",
    "description": "WoodTech Resin River is an epoxy based clear coating, which offers long lasting gloss, excellent film hardness and UV protection",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1250.00",
    "properties": [
      "High customisation",
      "Smooth finish",
      "10+ shades"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Woodtech-Resin-River.png",
    "slug": "woodtech-river-resin"
  },
  {
    "id": 1191,
    "name": "WoodTech Emporio Regal Pu White",
    "description": "An acrylic based clear coating, which offers excellent weather resistance, light-fastness and UV protection",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1498.00",
    "properties": [
      "Superior Stain Resistance",
      "Superior Water Resistance",
      "Superior Scratch Resistance"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-emporio-regal-asian-paints.png",
    "slug": "woodtech-emporio-regal-pu-white"
  },
  {
    "id": 1192,
    "name": "WoodTech Pu Palette Metal - Metallics",
    "description": "2500+ Shades | Anti corrosionproperties  | Anti yellowing | All weather resistance",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1262.00",
    "properties": [
      "Anti Corrosion",
      "All Weather resistant",
      "for Exteriors &amp; Interiors"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Woodtech-PU-Palette-Metal.png",
    "slug": "woodtech-pu-palette-metal-metallics"
  },
  {
    "id": 1193,
    "name": "WoodTech Emporio Gold Pu Clear",
    "description": "A two-pack polyurethane clear coating, which offers excellent weather resistance, fungal resistance and UV protection",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1042.00",
    "properties": [
      "Superior Durability",
      "Fungal Resistance",
      "High Cross Linking Density"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-emporio-gold-asian-paints.png",
    "slug": "woodtech-emporio-gold-pu-clear"
  },
  {
    "id": 1194,
    "name": "WoodTech Pu Palette - Interior Satin",
    "description": "3500+ Shades | Anti yellowing | Satin & glossy variants",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1238.00",
    "properties": [
      "3500 + Shades",
      "Anti - yellwoing",
      "Anti - scratch"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Woodtech-PU-Palette.png",
    "slug": "woodtech-pu-palette-interior-satin"
  },
  {
    "id": 1195,
    "name": "WoodTech Emporio Gold Pu White",
    "description": "A two-pack polyurethane clear coating, which offers excellent weather resistance, fungal resistance and UV protection",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1533.00",
    "properties": [
      "Superior Durability",
      "Fungal Resistance",
      "High Cross Linking Density"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-emporio-gold-asian-paints.png",
    "slug": "woodtech-emporio-gold-pu-white"
  },
  {
    "id": 1196,
    "name": "WoodTech Emporio Pu Palette",
    "description": "An acrylic based opaque coating, which offers excellent stain resistance, better hardness and long-lasting durability.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1748.00",
    "properties": [
      "Stain Resistance",
      "High durability",
      "Quick Drying"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-emporio-pu-palette-asian-paints.png",
    "slug": "woodtech-emporio-pu-palette"
  },
  {
    "id": 1197,
    "name": "WoodTech Emporio Pu Clear",
    "description": "An acrylic based clear coating, which offers excellent weather resistance, light-fastness and UV protection.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1919.00",
    "properties": [
      "Weather resistance",
      "Light fastness",
      "UV protection"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-emporio-pu-asian-paints-old.png",
    "slug": "woodtech-emporio-pu-clear"
  },
  {
    "id": 1198,
    "name": "WoodTech Emporio Pu White",
    "description": "An acrylic based opaque coating, which offers excellent stain resistance, better hardness and long-lasting durability.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1815.00",
    "properties": [
      "Weather resistance",
      "Light fastness",
      "UV protection"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-emporio-pu-asian-paints.png",
    "slug": "woodtech-emporio-pu-white"
  },
  {
    "id": 1199,
    "name": "WoodTech Emporio Pu Black",
    "description": "An acrylic based opaque coating, which offers excellent stain resistance, better hardness and long-lasting durability.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 2035.00",
    "properties": [
      "Weather resistance",
      "Light fastness",
      "UV protection"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-emporio-pu-asian-paints-old.png",
    "slug": "woodtech-emporio-pu-black"
  },
  {
    "id": 1200,
    "name": "WoodTech Pu Palette Interior",
    "description": "An acrylic based opaque coating, which offers excellent stain resistance, better hardness and long-lasting durability.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1199.00",
    "properties": [
      "650+ Shades",
      "Resists Cracking",
      "Superior Resistance"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-pu-palette-interiors-asian-paints.png",
    "slug": "woodtech-pu-palette-interior"
  },
  {
    "id": 1201,
    "name": "WoodTech Pu Palette Exterior",
    "description": "An acrylic based clear coating, which offers excellent weather resistance, light-fastness and UV protection.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1402.00",
    "properties": [
      "650+ Shades",
      "Exterior Durability",
      "Superior Resistance"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-pu-palette-exteriors-asian-paints.png",
    "slug": "woodtech-pu-palette-exterior"
  },
  {
    "id": 1202,
    "name": "WoodTech Pu Palette Metallic",
    "description": "An acrylic based opaque coating, which offers excellent stain resistance, better hardness and long-lasting durability.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1899.00",
    "properties": [
      "Stain Resistance",
      "High durability",
      "Quick Drying"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-wood-stain-for-interiors-asian-paints.png",
    "slug": "woodtech-pu-palette-metallic"
  },
  {
    "id": 1203,
    "name": "WoodTech Aquadur Pu Interior Matt",
    "description": "A low smell and healthsafe (low VOC) water based polyurethane clear coating, which offers smooth finish and good hardness.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1644.00",
    "properties": [
      "Low Smell",
      "Health safe",
      "Child safe"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-aquadur-pu-interior-asian-paints.png",
    "slug": "woodtech-aquadur-pu-interior-matt"
  },
  {
    "id": 1204,
    "name": "WoodTech Aquadur Pu Interior Gloss",
    "description": "A low smell and healthsafe (low VOC) water based polyurethane clear coating, which offers smooth finish and good hardness.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1644.00",
    "properties": [
      "Low Smell",
      "Health safe",
      "Child safe"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-aquadur-pu-interior-asian-paints.png",
    "slug": "woodtech-aquadur-pu-interior-gloss"
  },
  {
    "id": 1205,
    "name": "WoodTech Aquadur Pu Exterior Matt",
    "description": "A low smell and healthsafe (low VOC) water based polyurethane clear coating, which offers smooth finish and good hardness.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1705.00",
    "properties": [
      "Low Smell",
      "Health safe",
      "Child safe"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-aquadur-pu-exterior-asian-paints.png",
    "slug": "woodtech-aquadur-pu-exterior-matt"
  },
  {
    "id": 1206,
    "name": "WoodTech Aquadur Pu Exterior Gloss",
    "description": "A low smell and healthsafe (low VOC) water based polyurethane clear coating, which offers smooth finish and good hardness.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1705.00",
    "properties": [
      "Low Smell",
      "Health safe",
      "Child safe"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-aquadur-pu-exterior-asian-paints.png",
    "slug": "woodtech-aquadur-pu-exterior-gloss"
  },
  {
    "id": 1207,
    "name": "WoodTech Aquadur 2k Pu For Interior",
    "description": "A low smell and healthsafe (low VOC) water based polyurethane clear coating, which offers smooth finish and good hardness.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1962.00",
    "properties": [
      "Smooth finish",
      "Good hardness",
      "Virtually odourless"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-aquadur-2k-pu-for-interior-asian-paints.png",
    "slug": "woodtech-aquadur-2k-pu-for-interior"
  },
  {
    "id": 1208,
    "name": "WoodTech Aquadur 2k Pu Parquet",
    "description": "A low smell and healthsafe (low VOC) water based Polyurethane clear coating for interior flooring, which offers smooth finish, hardness and excellent abrasion resistance",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 4079.00",
    "properties": [
      "Easy application",
      "Low VOC Odour",
      "Quick dying"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-aquadur-2k-pu-parquet-asian-paints.png",
    "slug": "woodtech-aquadur-2k-pu-parquet"
  },
  {
    "id": 1209,
    "name": "WoodTech Pu Luxury Wood Finish For Interior",
    "description": "An acrylic based clear coating, which offers excellent stain resistance, better hardness and long-lasting durability.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1022.00",
    "properties": [
      "Solvent finish",
      "High Durability",
      "Stain resistance"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-pu-luxury-wood-finish-for-interior-asian-paints.png",
    "slug": "woodtech-pu-luxury-wood-finish-for-interior"
  },
  {
    "id": 1210,
    "name": "WoodTech Pu Luxury Wood Finish For Exterior",
    "description": "An acrylic based clear coating, which offers excellent weather resistance, light-fastness and UV protection.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1135.00",
    "properties": [
      "High Durability",
      "Stain resistance",
      "Weather resistance"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-pu-luxury-wood-finish-for-exterior-asian-paints.png",
    "slug": "woodtech-pu-luxury-wood-finish-for-exterior"
  },
  {
    "id": 1211,
    "name": "WoodTech Epoxy Insulator",
    "description": "A universal undercoat that protects all kind of wood coatings from impurities and resins present in wood & veneers.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1385.00",
    "properties": [
      "Universal undercoat",
      "For all kinds of wood",
      "Can be used in exterior"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-epoxy-insulator-asian-paints.png",
    "slug": "woodtech-epoxy-insulator"
  },
  {
    "id": 1212,
    "name": "WoodTech Wood Stains Interior",
    "description": "A solvent based dye, which offers excellent transparent shades, better durability and uniform finish.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 527.00",
    "properties": [
      "Transparent shades",
      "Uniform finish",
      "Better durability"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-wood-stain-for-interiors-asian-paints.png",
    "slug": "woodtech-wood-stains-interior"
  },
  {
    "id": 1213,
    "name": "WoodTech Ingenio Pu",
    "description": "Asian Paints WoodTech Ingenio PU is 2K acrylic based polyurethane clear coating which offers excellent weather resistance, light fastness, and UV protection.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 1159.00",
    "properties": [
      "Quick Drying Time",
      "Superior Durability",
      "German Technology"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-ingenio-packshot-asain-paints.png",
    "slug": "woodtech-ingenio-pu"
  },
  {
    "id": 1214,
    "name": "WoodTech Nc Sanding Sealer",
    "description": "High performance Nitro Cellulose based sealer",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 385.00",
    "properties": [
      "Quick Drying Time",
      "Superior Durability",
      "German Technology"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-sanding-sealer-packshot-asian-paints.png",
    "slug": "woodtech-nc-sanding-sealer"
  },
  {
    "id": 1215,
    "name": "WoodTech Filler",
    "description": "Universal undercoat for dent/grain filling",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 451.00",
    "properties": [
      "Quick Drying Time",
      "Superior Durability",
      "German Technology"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-filler-packshot-asian-paints.png",
    "slug": "woodtech-filler"
  },
  {
    "id": 1216,
    "name": "WoodTech Wood Stains Exterior",
    "description": "A water based pigmented dies, which offers excellent shades, better durability and uniform finish.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 920.00",
    "properties": [
      "Easy Application",
      "Durable",
      "Low VOC &amp; Odour"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-wood-stains-for-exterior-asian-paints-.png",
    "slug": "woodtech-wood-stains-exterior"
  },
  {
    "id": 1217,
    "name": "WoodTech Melamyne Gold Clear",
    "description": "Clear, acid-cured coating with smooth finish and high hardness. Non-yellowing formula preserves furniture’s natural beauty for long-lasting clarity.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 555.00",
    "properties": [
      "Good Hardness",
      "Value for Money",
      "Non Yellowing"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/WT-Melamyne-Gold.png",
    "slug": "woodtech-melamyne-gold-clear"
  },
  {
    "id": 1218,
    "name": "WoodTech Melamyne",
    "description": "Solvent-based, acid-cured clear coat with smooth finish and good hardness—ideal for enhancing and protecting interior wood surfaces.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 483.00",
    "properties": [
      "Good Hardness",
      "Value for Money",
      "Reliable"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/WT-Melamyne-Wood.png",
    "slug": "woodtech-melamyne"
  },
  {
    "id": 1219,
    "name": "WoodTech Touchwood Interior & Exterior 1kpu",
    "description": "Single component Polyurethane modified clear coating, which offers good smooth finish for both Interior & Exterior wooden surface.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 488.00",
    "properties": [
      "Smooth Finish",
      "Interior &amp; Exterior",
      "Good Gloss"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-touchwood-packshot-asian-paints.png",
    "slug": "woodtech-touchwood-interior-exterior-1kpu"
  },
  {
    "id": 1220,
    "name": "WoodTech Touchwood 1kpu Interior Shades",
    "description": "Single component Polyurethane modified clear coating, which offers good smooth finish in different shades",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 434.00",
    "properties": [
      "Smooth Finish",
      "Interior &amp; Exterior",
      "Good Gloss"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-1K-PU-shades-for-interior-packshot-asian-paints.png",
    "slug": "woodtech-touchwood-1kpu-interior-shades"
  },
  {
    "id": 1221,
    "name": "WoodTech Termishield",
    "description": "A herbal oil based clear additive, which offers excellent protection from termites and borers.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 460.00",
    "properties": [
      "Anti Termite Solution",
      "Herbal Product"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/woodtech-termishield-asian-paints.png",
    "slug": "woodtech-termishield"
  },

  {
    "id": 1250,
    "name": "SmartCare High Performance Red Oxide Metal Primer",
    "description": "Choose this easy to use primer for all metal surfaces. It doesn't require any dilution and offers superior rust protection.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 300.00",
    "properties": [
      "Supreme rust protection",
      "Ready to use primer",
      "Excellent adhesion property"
    ],
    "sizes": [1, 4, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-high-performance-redoxide-metal-primer-asian-paints.png",
    "slug": "smartcare-high-performance-red-oxide-metal-primer"
  },
  {
    "id": 1251,
    "name": "Decoprime Premium Metal Primer",
    "description": "Serves as a good quality metal primer due to its corrosion resistance ability. This easy to apply primer is ideal for household use.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 300.00",
    "properties": [
      "Good corrosion resistance",
      "Good adherent coating",
      "Saves money in long run"
    ],
    "sizes": [1, 4, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-decoprime-premium-metal-primer-asian-paints.png",
    "slug": "decoprime-premium-metal-primer"
  },
  {
    "id": 1252,
    "name": "Apcolite Premium Gloss Enamel",
    "description": "Get that shiny new look on metal surfaces by using this enamel. Its tough film is highly resistant to household stains.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "High Coverage",
      "Superior Hiding",
      "Stain Guard"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-apcolite-premium-gloss-enamel-asian-paints.png",
    "slug": "apcolite-premium-gloss-enamel"
  },
  {
    "id": 1253,
    "name": "Apcolite Rustshield Pu Enamel",
    "description": "An Anti – Rust PU Enamel with quick drying capabilities and 4 years Rust protection warranty.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "No Primer Required",
      "Quick Drying",
      "4 Years Warranty"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Apcolite_RustShield-packshot.png",
    "slug": "apcolite-rustshield-pu-enamel"
  },
  {
    "id": 1254,
    "name": "Apcolite Advanced Pu Enamel",
    "description": "Excellent finish and long lasting gloss for doors and windows which makes them look timeless. With its non yellowing property, shades look vibrant for a long.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "Enamel",
      "High gloss",
      "Non-yellowing"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Apcolite-advanced-PU-Enamel.png",
    "slug": "apcolite-advanced-pu-enamel"
  },
  {
    "id": 1255,
    "name": "Apcolite Premium Satin Enamel",
    "description": "A paint that is rich and sophisticated, yet a dependable solution that provides stain resistance and satin smooth finish.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "Soft Sheen Finish",
      "Anti Fungal Shield",
      "2 Years Warranty"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-apcolite-premium-satin-enamel-asian-paints.png",
    "slug": "apcolite-premium-satin-enamel"
  },
  {
    "id": 1256,
    "name": "Apcolite Advanced 2-pack Epoxy Finish",
    "description": "It provides ultimate rust protection and corrosion resistance for metal surfaces exposed to atmospheric land and marine conditions.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "Rust Protection",
      "Water &amp; Mild Chemical Resistance",
      "5 Years Warranty"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-apcolite-2pack-epoxy-finish-asian-paints.png",
    "slug": "apcolite-advanced-2-pack-epoxy-finish"
  },
  {
    "id": 1257,
    "name": "Tractor Sparc Enamel",
    "description": "A product that imparts a long lasting glossy finish to wood, metal and masonry surfaces. Tractor Sparc Enamel gives you a durable finish at an economical price",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "Glossy Finish",
      "Long Lasting",
      "Economical"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/pis-sheets/AP-Tractor-Sparc-Enamel-Packaging.png",
    "slug": "tractor-sparc-enamel"
  },
  {
    "id": 1258,
    "name": "Tractor Enamel",
    "description": "An economical choice for your household, this enamel can be used on multiple surfaces - be it wood, metal or masonry surfaces.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "Glossy Finish",
      "Affordable",
      "Durable"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-tractor-enamel-asian-paints.png",
    "slug": "tractor-enamel"
  },
  {
    "id": 1259,
    "name": "Apcolite Insect Shield Enamel",
    "description": "Now Hidden corners of your home won’t hide insects anymore. Make your home insect free with Apcolite Insectshield Enamel.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "Long term protection against insects",
      "800+ shades",
      "Effective against cockroaches"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Apcolite-Insect-Shield-Updated-packshot.png",
    "slug": "apcolite-insect-shield-enamel"
  },
  {
    "id": 1260,
    "name": "Apcolite Suprema Premium Gloss Enamel",
    "description": "Serving as a protective armour around the painted surface, this enamel imparts a shiny new look to multiple surfaces",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "IS 2933 Certified",
      "Extremely tough and durable",
      "High resistance to stains"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/apcolite-suprema.png",
    "slug": "apcolite-suprema-premium-gloss-enamel"
  },
  {
    "id": 1261,
    "name": "Suprema Advanced Premium Gloss Enamel",
    "description": "A topcoat paint which is highly washable and provides superior resistance to household stains",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "IS 2932 Certified",
      "High Gloss Finish",
      "Faster Drying Time"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/pis-sheets/Apcolite_Suprema_Advanced_20Ltr.png",
    "slug": "suprema-advanced-premium-gloss-enamel"
  },
  {
    "id": 1262,
    "name": "3 Mangoes Black Board Paint",
    "description": "A paint which exhibits good flow and levelling performance offering superior resistance to slippage of chalk during writing.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "Suitable for use as Black Board",
      "Good flow and superior leveling"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/mangoes-blackboard-paint.png",
    "slug": "3-mangoes-black-board-paint"
  },
  {
    "id": 1263,
    "name": "Apcolite Aluminium Paint",
    "description": "Excellent durability, high corrosion resistance and brilliant lustre finish are the attributes which best define Apco Aluminium Paint",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "Excellent durability",
      "Corrosion Resistance",
      "Fast Drying"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/apcolite-aluminium-paint.png",
    "slug": "apcolite-aluminium-paint"
  },
  {
    "id": 1264,
    "name": "3 Mangoes Aluminium Paint",
    "description": "A paint which is fast drying and has excellent adhesion when applied on steel structures, wagons, oil tanks and ferrous metal substrates",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Synthetic Enamels",
    "price": "₹ 300.00",
    "properties": [
      "Brilliant Lustre Finish",
      "Corrosion Resistance",
      "High Coverage"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/mangoes-aluminium-paint.png",
    "slug": "3-mangoes-aluminium-paint"
  },
  {
    "id": 1265,
    "name": "Apcolite Clear Synthetic Varnish",
    "description": "Recommended as a finishing varnish for interior wood applications, this product can also be mixed with synthetic enamels for gloss enhancement",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Wood Finishes",
    "price": "₹ 300.00",
    "properties": [
      "Gloss Retention",
      "Finishing varnish for wood",
      "Good durability"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/clear-synthtic-varnish.png",
    "slug": "apcolite-clear-synthetic-varnish"
  },
  {
    "id": 9011,
    "name": "Royale Wall Base Coat Interior Primer",
    "description": "Create the perfect base coat that primes for a smooth finish, better paint adhesion, and added moisture protection.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Special acrylic binders",
      "Adhesion",
      "Whiteness and smoothness"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-undercoats-royale-wall-basecoat-asian-paints.png",
    "slug": "royale-wall-base-coat"
  },
  {
    "id": 9012,
    "name": "TruCare Interior Wall Primer - Water thinnable",
    "description": "A true hero product when it comes to water-based wall finishes. It proves to be an effective primer for luxury finishes of top coats.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "SUPERIOR WHITENESS",
      "ALKALI RESISTANCE",
      "MOISTURE RESISTANCE"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/0360.png",
    "slug": "trucare-interior-wall-primer-water-thinnable"
  },
  {
    "id": 9013,
    "name": "TruCare Interior Wall Primer - Solvent Thinnable",
    "description": "Let your walls stand out! All you need for an everlasting paint is aprimer with good sealing properties.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "OPACITY AND WHITENESS",
      "ALKALI RESISTANCE",
      "GOOD SEALING PROPERTIES"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/0359_undercoats.png",
    "slug": "trucare-interior-wall-primer-solvent-thinnable"
  },
  {
    "id": 9014,
    "name": "TruCare Sparc Ultraa Interior Primer- Water Thinnable",
    "description": "Upgraded performance with great whiteness and topcoat adhesion for a wonderful wall with a superior finish",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "BETTER OPACITY AND WHITENESS",
      "BETTER TOPCOAT ADHESION",
      "ECONIMICAL PRICE POINT"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/TRUCARE_SPARC-ULTRAA-INTERIOR.png",
    "slug": "trucare-sparc-ultraa-interior-primer-water-thinnable"
  },
  {
    "id": 9015,
    "name": "TruCare Sparc Interior Primer-water Thinnable",
    "description": "Provides good whiteness, a smooth surface and great adhesion to the topcoat for smooth interior walls",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "OPACITY AND WHITENESS",
      "BETTER TOPCOAT ADHESION",
      "ECONOMICAL PRICE POINT"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/sparc_interior.png",
    "slug": "trucare-sparc-interior-primer-water-thinnable"
  },
  {
    "id": 9016,
    "name": "SmartCare Terrace Tile Primer",
    "description": "Lock in durability with our eco-friendly primer that waterproofs terrace tiles and keeps them strong for the long haul.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Adhesion",
      "Flexibility",
      "Hybrid Technology"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-terrace-tile-primer-asian-paints.png",
    "slug": "smartcare-terrace-tile-primer"
  },
  {
    "id": 9017,
    "name": "SmartCare Primero Exterior Primer",
    "description": "Make your paint job last with our water-based primer that adds extra durability and moisture resistance to your exterior walls.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Applicable on multiple surfaces",
      "Excellent sealing property",
      "Higher top coat coverage"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-smartcare-primero-advanced-asian-paints.png",
    "slug": "smartcare-primero"
  },
  {
    "id": 9018,
    "name": "TruCare Exterior Wall Primer",
    "description": "Prime your walls the right way with our water-based primer that locks in paint better and gives your exterior walls a smooth, even base.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Opacity and whiteness",
      "Better topcoat adhesio",
      "Resists peeling"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-trucare-exterior-wall-primer-advanced-asian-paints.png",
    "slug": "trucare-exterior-wall-primer"
  },
  {
    "id": 9019,
    "name": "TruCare Exterior Wall Primer Advanced",
    "description": "The perfect balance between whiteness, surface adhesion and topcoat finish to enusre all round satistaction with the surface finish",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "BETTER OPACITY AND WHITENESS",
      "BETTER TOPCOAT ADHESION",
      "ECONIMICAL PRICE POINT"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/5633-new1.png",
    "slug": "trucare-exterior-wall-primer-advanced"
  },
  {
    "id": 9020,
    "name": "TruCare Sparc Ultraa Exterior Primer",
    "description": "Upgraded performance with great whiteness and topcoat adhesion for a wonderful wall with a superior finish",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "BETTER OPACITY AND WHITENESS",
      "BETTER TOPCOAT ADHESION",
      "ECONIMICAL PRICE POINT"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A51-new1.png",
    "slug": "trucare-sparc-ultraa-exterior-primer"
  },
  {
    "id": 9021,
    "name": "TruCare Sparc Exterior Primer",
    "description": "Provides good whiteness, a smooth surface and great adhesion to the topcoat for smooth exterior walls",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "OPACITY AND WHITENESS",
      "BETTER TOPCOAT ADHESION",
      "ECONOMICAL PRICE POINT"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A24-new1.png",
    "slug": "trucare-sparc-exterior-primer"
  },
  {
    "id": 9022,
    "name": "TruCare Grey 1-pack Epoxy Primer",
    "description": "Say goodbye to rust with this primer that promises supreme protection against rust that is 50 times stronger than ordinary metal primer.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Primer with anti-corrosion properties",
      "Ready to use primer",
      "Excellent adhesion property"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-trucare-grey-1-pack-epoxy-primer-asian-paints.png",
    "slug": "trucare-grey-1-pack-epoxy-primer"
  },
  {
    "id": 9023,
    "name": "Apcolite Advanced 2-pack Epoxy Primer Grey",
    "description": "Give a perfect anti-rust finish to your metal surfaces with this primer, while enhancing adhesion and protects the metal.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Has overcoating property",
      "Excellent adhesion property",
      "Dual coat system with high performance"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-apcolite-advanced-2pack-epoxy-primer-grey-asian-paints.png",
    "slug": "apcolite-advanced-2-pack-epoxy-primer-grey"
  },
  {
    "id": 9024,
    "name": "TruCare Yellow Metal Primer",
    "description": "Say bye to rust and corrosion, with our metal primer that gives a lasting defence and improved paint adhesion.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Excellent adhesion property",
      "Supreme rust protection",
      "Free of hazardous material of chrome"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/1087.png",
    "slug": "trucare-yellow-metal-primer"
  },
  {
    "id": 9025,
    "name": "TruCare Wood Primer",
    "description": "Tackles wood's natural porosity to provide a pristine, workable surface",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Made Especially for Wood",
      "Good Sealing",
      "Topcoat Adherance"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/0007.png",
    "slug": "trucare-wood-primer"
  },
  {
    "id": 9026,
    "name": "TruCare Red Oxide Metal Primer",
    "description": "Give your metal surfaces the right protection with this primer, which will provide a good coverage, equal levelling, and good adhesion to your surfaces.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Excellent opacity",
      "Offers good coverage",
      "Good adhesion on all metal surfaces"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-trucare-red-oxide-metal-primer-asian-paints.png",
    "slug": "trucare-red-oxide-metal-primer"
  },
  {
    "id": 9027,
    "name": "TruCare Sparc Red Oxide Primer",
    "description": "Great surface adhesion with metals to ensure a resilient topcoat finish at an economical price point",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Good corrosion resistance",
      "Good adherent coating",
      "Economical Pricing"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6793.png",
    "slug": "trucare-sparc-red-oxide-primer"
  },
  {
    "id": 9028,
    "name": "TruCare Knifing Paste Filler",
    "description": "Create beautiful walls with this filler that smooths out cracks and dents, leaving you with a perfect wall finish.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Easy Cutting",
      "Hard Dry Feature",
      "Can be thinned"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-trucare-knifing-paste-filler-asian-paints.png",
    "slug": "trucare-knifing-paste-filler"
  },
  {
    "id": 9029,
    "name": "Damp Sheath Exterior Primer",
    "description": "Keep moisture out with our damp-proof coating that protects your exterior walls and keeps your paint looking fresh.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "5 years warranty",
      "Crack bridging ability",
      "Top coat coverage increase up to 10%"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/sc-Dampsheath-exterior-new.png",
    "slug": "damp-sheath-exterior"
  },
  {
    "id": 9030,
    "name": "Acrylic Wall Putty",
    "description": "Perfect your finish with our water-based putty that fills imperfections and leaves a smooth, white base for your topcoat.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "No primer required",
      "Cost effective",
      "Time saving system"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/interior-walls-undercoats-trucare-acrylic-wall-putty-asian-paints.png",
    "slug": "acrylic-wall-putty"
  },
  {
    "id": 9031,
    "name": "TruCare Wall Putty",
    "description": "Perfect the art of smooth walls, with our putty which will fill cracks and gaps, ensuring a perfect surface inside and out.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Smooth finish",
      "Good workability",
      "Excellent strength"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-trucare-wall-putty-asian-paints.png",
    "slug": "trucare-wall-putty"
  },
  {
    "id": 9032,
    "name": "TruCare Filling Putty",
    "description": "Smooth out every bump with our white cement-based putty giving your walls a flawless base coat for painting.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Excellent levelling",
      "Abrasion Resistance",
      "Built-up thickness upto 10 mm"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/exterior-walls-trucare-filling-Putty-asian-paints.png",
    "slug": "trucare-filling-putty"
  },
  {
    "id": 9033,
    "name": "TruCare Powder Acrylic Putty",
    "description": "Provides an ultra smooth, glossy, marble-like finish to ensure the smoothest and shiniest topcoat finish",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Smooth Finish",
      "Good Workability and Mixing",
      "Catwrs to both Filling and Finish"
    ],
    "sizes": [1, 5, 20],
    "unit": "kg",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/6A46.png",
    "slug": "trucare-powder-acrylic-putty"
  },
  {
    "id": 9034,
    "name": "SmartCare Damp Sheath Exterior Primer Advanced",
    "description": "Keep your exteriors water-tight with this high-performance coating that lasts longer and provides good adhesion.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "5 years warranty",
      "Crack bridging ability",
      "Top coat coverage increase up to 10%"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/smartcare-damp-sheath-exterior-advanced-asian-paints.png",
    "slug": "smartcare-damp-sheath-exterior-advanced"
  },
  {
    "id": 9035,
    "name": "Damp Secure Exterior Primer",
    "description": "Protect your walls the secure way with our primer that offers 3 years of waterproofing warranty. Designed for exterior vertical walls, it locks in paint better while providing a strong, protective base against dampness.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "Better Whiteness &amp; Coverage",
      "3 Years Waterproofing warranty",
      "Superior Topcoat Performance"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/Damp-secure.png",
    "slug": "damp-secure"
  },
  {
    "id": 9036,
    "name": "Decoprime Interior Wall Primer Advanced - Water Thinnable",
    "description": "An essential undercoat for paints! This paint provides superior hiding and superior whiteness before you apply your final paint.",
    "brand": "Asian Paints",
    "topCategory": "Home Paint",
    "subCategory": "Primers",
    "price": "₹ 150.00",
    "properties": [
      "OPACITY AND WHITENESS",
      "ALKALI RESISTANCE",
      "GOOD SEALING PROPERTIES"
    ],
    "sizes": [1, 4, 10, 20],
    "unit": "L",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": Math.floor(Math.random() * 200) + 50,
    "image": "https://www.asianpaints.com/content/dam/asian_paints/products/packshots/metals-decoprime-premium-metal-primer-asian-paints.png",
    "slug": "decoprime-interior-wall-primer-advanced-water-thinnable"
  }
,
  {
    "id": 9901,
    "name": "TruCare Laser Distance Meter",
    "description": "Smart and accurate laser distance meter for quick measurements up to 60 meters. Features area, volume, and Pythagorean measurement with high precision, ideal for quick site surveys before painting.",
    "brand": "Asian Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 2950.00",
    "properties": [
      "Range up to 60 meters",
      "High precision measurement",
      "Digital LCD display"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 124,
    "image": "https://m.media-amazon.com/images/I/51VlVdMKOIL.jpg",
    "slug": "trucare-laser-distance-meter"
  },
  {
    "id": 9902,
    "name": "TruCare Moisture Meter",
    "description": "Compact pin-type moisture meter to accurately check moisture levels on walls and wood before painting. Essential tool to ensure surfaces are dry enough for long-lasting paint application.",
    "brand": "Asian Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 1450.00",
    "properties": [
      "Accurate moisture detection",
      "Suitable for walls and wood",
      "Portable and easy to use"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 98,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/12/365465108/MQ/JF/DU/75336779/tes-dig-55187904-3-1000x1000.jpg",
    "slug": "trucare-moisture-meter"
  },
  {
    "id": 9903,
    "name": "TruCare Electric Wall Sander",
    "description": "High-performance electric wall sander (750W) with vacuum dust collection for a dust-free and smooth sanding experience. Reduces effort and saves time significantly.",
    "brand": "Asian Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 8500.00",
    "properties": [
      "750W powerful motor",
      "Integrated dust vacuum",
      "Professional grade finish"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 156,
    "image": "https://m.media-amazon.com/images/I/71w+b3K0OpL.jpg",
    "slug": "trucare-electric-wall-sander"
  },
  {
    "id": 9904,
    "name": "TruCare Paint Sprayer",
    "description": "750W Electric spray gun for smooth and even application of paint on walls and furniture. Features adjustable nozzles and easy cleanup.",
    "brand": "Asian Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 3200.00",
    "properties": [
      "750W Motor",
      "Uniform paint application",
      "Adjustable flow control"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.7,
    "reviews": 75,
    "image": "https://m.media-amazon.com/images/I/713A1C+PZJL.jpg",
    "slug": "trucare-paint-sprayer"
  },
  {
    "id": 9905,
    "name": "TruCare Economy Putty Mixer",
    "description": "Heavy-duty putty mixer designed for uniform and smooth mixing of wall putty and paint. Ergonomic design for comfortable long-duration usage.",
    "brand": "Asian Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 2800.00",
    "properties": [
      "Smooth and quick mixing",
      "Ergonomic handle",
      "Durable built"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 112,
    "image": "https://m.media-amazon.com/images/I/51aANSb6kTL.jpg",
    "slug": "trucare-economy-putty-mixer"
  }
,
  {
    "id": 9911,
    "name": "Berger Express Painting Sander",
    "description": "High-performance wall sander machine designed for Berger Express Painting. Features variable speed control and an integrated vacuum for a dust-free and smooth sanding experience.",
    "brand": "Berger Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 7500.00",
    "properties": [
      "Integrated dust vacuum",
      "Variable speed control",
      "Professional grade finish"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 115,
    "image": "https://img2.exportersindia.com/product_images/bc-full/2025/12/14964474/berger-express-painting-sanding-machine-1765169953-8472212.jpeg",
    "slug": "berger-express-painting-sander"
  },
  {
    "id": 9912,
    "name": "Berger Moisture Meter",
    "description": "Accurate digital moisture meter for measuring moisture content in walls, wood, and concrete. Essential for surface preparation before starting any painting or waterproofing work.",
    "brand": "Berger Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 1250.00",
    "properties": [
      "Accurate digital display",
      "Suitable for walls and wood",
      "Portable and easy to use"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.6,
    "reviews": 84,
    "image": "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9d2e5bcf-9ee9-473e-986e-59662c46f886.__CR0,0,300,300_PT0_SX300_V1___.png",
    "slug": "berger-moisture-meter"
  },
  {
    "id": 9913,
    "name": "Berger Airless Paint Sprayer",
    "description": "Professional-grade airless paint sprayer for fast, smooth, and even application of paint on large interior and exterior surfaces. Part of the Express Painting toolkit.",
    "brand": "Berger Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 18500.00",
    "properties": [
      "High pressure delivery",
      "Uniform paint application",
      "Fast coverage for large areas"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.9,
    "reviews": 142,
    "image": "https://5.imimg.com/data5/ANDROID/Default/2022/9/ZM/UO/LI/2303315/product-jpeg-1000x1000.jpg",
    "slug": "berger-airless-paint-sprayer"
  },
  {
    "id": 9914,
    "name": "Berger Express Putty Mixer",
    "description": "Heavy-duty electric putty and paint mixer designed for uniform and fast mixing. Ergonomic handle and powerful motor ensure smooth consistency.",
    "brand": "Berger Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 3100.00",
    "properties": [
      "Smooth and quick mixing",
      "Heavy-duty copper motor",
      "Ergonomic handle"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.7,
    "reviews": 92,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/11/361878963/ZD/KZ/EA/127283796/berger-multipurpose-mixture-machine-1000x1000.jpg",
    "slug": "berger-express-putty-mixer"
  },
  {
    "id": 9915,
    "name": "Berger High Pressure Washer",
    "description": "Powerful 120 Bar high-pressure washer for cleaning exterior walls, driveways, and concrete surfaces before painting. Removes dirt, algae, and loose paint easily.",
    "brand": "Berger Paints",
    "topCategory": "Power Tools",
    "subCategory": "Power Tools",
    "price": "₹ 5400.00",
    "properties": [
      "120 Bar pressure",
      "Removes dirt and algae",
      "Ideal for surface prep"
    ],
    "sizes": [1],
    "unit": "piece",
    "isAuthorised": true,
    "rating": 4.8,
    "reviews": 210,
    "image": "https://5.imimg.com/data5/SELLER/Default/2023/11/361872309/JR/UL/VP/127283796/berger-high-pressure-washer-1000x1000.jpg",
    "slug": "berger-high-pressure-washer"
  }
];

export const mockProducts = rawMockProducts.map(applyStandardEnamelIndustrialShades);