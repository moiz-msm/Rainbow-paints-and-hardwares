const fs = require('fs');

const products = [
  { id: 10, name: "101 PIDIPROOF LW+", price: "₹ 185.00", sizes: [0.2, 1, 5, 10, 20, 50, 100], properties: ["Integral Liquid Waterproofing"], image: "lw-plus" },
  { id: 53, name: "100 PIDIPROOF LW+ SUPER", price: "₹ 225.00", sizes: [1, 5, 10, 20, 50], properties: ["Liquid Plasticizing Compound"], image: "lw-plus" },
  { id: 58, name: "W013 PLASTER MASTER", price: "₹ 210.00", sizes: [1, 5, 10, 20], properties: ["Liquid Plasticing & Waterproofing"], image: "lw-plus" },
  { id: 57, name: "105 POWDER WATERPROOF", price: "₹ 47.00", sizes: [0.5, 30], properties: ["Integral powder waterproofing"], image: "lw-plus" },
  { id: 11, name: "301 PIDICRETE URP", price: "₹ 430.00", sizes: [0.2, 0.5, 1, 5, 10, 20, 50, 225], properties: ["SBR Latex for waterproofing & repairs"], image: "pidiproof-urp" },
  { id: 47, name: "302 SUPER LATEX", price: "₹ 470.00", sizes: [0.2, 0.5, 1, 5, 20], properties: ["SBR Latex for waterproofing & repairs"], image: "pidiproof-urp" },
  { id: 59, name: "303 PIDICRETE MPB", price: "₹ 405.00", sizes: [1, 10], properties: ["Acrylic multi-purpose binder"], image: "pidiproof-urp" },
  { id: 60, name: "233 PIDICRETE WP", price: "₹ 335.00", sizes: [1, 5, 20], properties: ["Acrylic waterproof polymer"], image: "pidiproof-urp" },
  { id: 61, name: "307 ALL SEAL", price: "₹ 475.00", sizes: [1, 5, 10, 20, 50], properties: ["High strength SI bond polymer"], image: "pidiproof-urp" },
  { id: 54, name: "304 POWERCRETE", price: "₹ 4600.00", sizes: [20, 50, 100], properties: ["Acrylic polymer for waterproofing & repairs"], image: "pidiproof-urp" },
  { id: 55, name: "604 PRIMESEAL", price: "₹ 390.00", sizes: [1, 4, 10, 20], properties: ["Efflorescence resistant penetrating primer"], image: "primeseal" },
  { id: 12, name: "601 RAINCOAT", price: "₹ 610.00", sizes: [1, 4, 10, 20], properties: ["Acrylic elastomeric exterior waterproof coating"], image: "raincoat" },
  { id: 62, name: "641 RAINCOAT CLASSIC", price: "₹ 630.00", sizes: [1, 4, 10, 20], properties: ["High build durable exterior elastomeric coating"], image: "raincoat" },
  { id: 63, name: "642 RAINCOAT SELECT", price: "₹ 730.00", sizes: [1, 4, 10, 20], properties: ["High performance exterior waterproof coating"], image: "raincoat" },
  { id: 65, name: "643 RAINCOAT WATERPROOF COATING", price: "₹ 500.00", sizes: [1, 4, 10, 20], properties: ["Universal elastomeric base coat"], image: "raincoat" },
  { id: 64, name: "651 RAINCOAT NEO", price: "₹ 370.00", sizes: [1, 4, 10, 20], properties: ["Primeless high build waterproof acrylate coating"], image: "raincoat" },
  { id: 49, name: "653 ROOFSEAL SELECT", price: "₹ 1950.00", sizes: [4, 20], properties: ["Heavy duty reinforced trafficable waterproof coating"], image: "newcoat" },
  { id: 36, name: "652 ROOFSEAL CLASSIC", price: "₹ 465.00", sizes: [1, 4, 10, 20], properties: ["Unique heat reflecting roof waterproof coating"], image: "newcoat" },
  { id: 56, name: "654 ROOFSEAL ULTRA", price: "₹ 11330.00", sizes: [20], properties: ["Next generation PU based roof waterproofing coating"], image: "newcoat" },
  { id: 52, name: "610 SURESEAL", price: "₹ 390.00", sizes: [1, 5, 20], properties: ["Waterproof coating (waterproofing all rounder)"], image: "newcoat" },
  { id: 66, name: "112 PIDIFIN 2K", price: "₹ 580.00", sizes: [3, 9, 15, 30], properties: ["Acrylic cementitious two component coating"], image: "crackx" },
  { id: 46, name: "113 FASTFLEX", price: "₹ 2700.00", sizes: [12], properties: ["High performance polymer modified cementitious coating"], image: "fastflex" },
  { id: 50, name: "196 BITUFIX", price: "₹ 970.00", sizes: [5, 20], properties: ["Bitumen emulsion paint for DPC"], image: "fastflex" },
  { id: 33, name: "135 BATHSEAL TAPE", price: "₹ 1700.00", sizes: [1], properties: ["Non-reinforced twin sided self adhesive bituminous membrane"], image: "bathseal" },
  { id: 67, name: "103 REPELLIN WR", price: "₹ 600.00", sizes: [1, 10], properties: ["Silicone based water repellent"], image: "raincoat" },
  { id: 68, name: "104 DAMPGUARD", price: "₹ 360.00", sizes: [0.5, 1], properties: ["Damp-proof coating for internal walls"], image: "crackx" },
  { id: 51, name: "107 KRYSTALLINE", price: "₹ 3025.00", sizes: [25], properties: ["Cementitious concrete waterproofing"], image: "crackx" },
  { id: 69, name: "211 EPOXY BONDING AGENT", price: "₹ 1150.00", sizes: [1], properties: ["Two part solvent free epoxy resin"], image: "pidiproof-urp" },
  { id: 70, name: "226 POLYMER MORTAR HB", price: "₹ 1500.00", sizes: [25], properties: ["Single component ready to use dual shrinkage"], image: "crackx" },
  { id: 71, name: "204 RUST REMOVER", price: "₹ 220.00", sizes: [0.5, 1], properties: ["Liquid for cleaning re-bars & steel surfaces"], image: "crackx" },
  { id: 72, name: "207 PIDICRETE AM", price: "₹ 70.00", sizes: [0.225], properties: ["Expansive plasticising admixture"], image: "pidiproof-urp" },
  { id: 73, name: "257 REPAIR POLYMER MORTAR", price: "₹ 670.00", sizes: [25], properties: ["Fiber reinforced dual shrinkage repair mortars"], image: "crackx" },
  { id: 74, name: "208 MICRO CONCRETE", price: "₹ 550.00", sizes: [25], properties: ["Flowable mortar for repairs to damaged reinforced concrete"], image: "crackx" },
  { id: 75, name: "710 PIDIGROUT 10M", price: "₹ 730.00", sizes: [25], properties: ["Dual shrinkage cementitious flowable grout"], image: "crackx" },
  { id: 76, name: "202 CRACK-X POWDER", price: "₹ 60.00", sizes: [0.5, 1, 25], properties: ["A non-shrink, high strength powder crack filler"], image: "crackx" },
  { id: 77, name: "201 CRACK-X PASTE", price: "₹ 205.00", sizes: [0.3, 0.5, 1, 5], properties: ["Ready to use high strength filler for cracks"], image: "crackx" },
  { id: 45, name: "217 CRACK-X SHRINKFREE", price: "₹ 205.00", sizes: [0.35, 0.75], properties: ["One time shrink-free filler for plaster cracks"], image: "crackx" },
  { id: 78, name: "501 FEVISEAL GP PRO", price: "₹ 325.00", sizes: [0.28], properties: ["Acetic cure silicone sealant for windows"], image: "crackx" },
  { id: 79, name: "501 FEVISEAL NEUTRAL PRO", price: "₹ 375.00", sizes: [0.28], properties: ["Silicone Sealant"], image: "crackx" },
  { id: 80, name: "501 FEVISEAL WEATHERPROOF PRO", price: "₹ 425.00", sizes: [0.28], properties: ["Silicone Sealant"], image: "crackx" },
  { id: 81, name: "FEVISEAL HY 100", price: "₹ 483.33", sizes: [0.6], properties: ["Low modulus hybrid sealant"], image: "crackx" },
  { id: 82, name: "FEVISEAL HY 300", price: "₹ 950.00", sizes: [0.6], properties: ["High modulus hybrid sealant"], image: "crackx" },
  { id: 83, name: "515 FEVISEAL MULTIPURPOSE", price: "₹ 145.00", sizes: [0.28], properties: ["One pack elastomeric acrylic sealant"], image: "crackx" },
  { id: 84, name: "501 FEVISEAL BATHROOM & KITCHEN", price: "₹ 145.00", sizes: [0.28], properties: ["Gap Filling Acrylic Sealant"], image: "crackx" },
  { id: 85, name: "404 FEVIMATE TG", price: "₹ 58.00", sizes: [0.5], properties: ["One pack water resistant tile grout"], image: "crackx" },
  { id: 86, name: "T16 ROFF CERA CLEAN", price: "₹ 150.00", sizes: [0.5, 1, 5], properties: ["High performance tile cleaner"], image: "crackx" },
];

let dataTs = fs.readFileSync('src/data.ts', 'utf-8');

dataTs = dataTs.replace(/{\s*id:\s*\d+,\s*name:\s*[^}]+brand:\s*"Dr\. Fixit"[^}]+},\s*/g, '');

const newProductsString = products.map(p => `  {
    id: ${p.id},
    name: ${JSON.stringify(p.name)},
    brand: "Dr. Fixit",
    topCategory: "Home Paint",
    subCategory: "Waterproofing",
    price: ${JSON.stringify(p.price)},
    sizes: ${JSON.stringify(p.sizes)},
    properties: ${JSON.stringify(p.properties)},
    popular: ${[10, 11, 12, 53, 55, 36, 49].includes(p.id)},
    image: "https://www.drfixit.co.in/content/dam/drfixit/packshots/${p.image}.png",
  },`).join('\n');

dataTs = dataTs.replace('export const mockProducts = [', 'export const mockProducts = [\n' + newProductsString);

fs.writeFileSync('src/data.ts', dataTs);
console.log('done!');
