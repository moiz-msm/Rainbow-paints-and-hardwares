const fs = require('fs');
let content = fs.readFileSync('src/pages/ProductDetailPage.tsx', 'utf-8');

const target1 = `    const isEnamel = nameLower.includes('enamel') || nameLower.includes('gloss');
    const isIndustrial = topCatLower.includes('industrial') || subCatLower.includes('epoxy') || subCatLower.includes('pu coatings');`;
const replacement1 = `    const isEnamel = nameLower.includes('enamel') || nameLower.includes('gloss');
    const isIndustrial = topCatLower.includes('industrial') || subCatLower.includes('epoxy') || subCatLower.includes('pu coatings');
    const isPowerTool = topCatLower.includes('power tools') || subCatLower.includes('power tools') || subCatLower.includes('tools') || nameLower.includes('meter') || nameLower.includes('machine') || nameLower.includes('sprayer') || nameLower.includes('washer') || nameLower.includes('sander') || nameLower.includes('mixer');`;

content = content.replace(target1, replacement1);

const target2 = `    // 1. Finish
    let finish = "Smooth & Matte Finish";
    if (nameLower.includes('aspira') || nameLower.includes('glitz') || nameLower.includes('silk') || propsString.includes('sheen')) finish = "Rich Pearl Sheen";`;
const replacement2 = `    // 1. Finish
    let finish = "Smooth & Matte Finish";
    if (isPowerTool) finish = "Industrial Grade Equipment";
    else if (nameLower.includes('aspira') || nameLower.includes('glitz') || nameLower.includes('silk') || propsString.includes('sheen')) finish = "Rich Pearl Sheen";`;

content = content.replace(target2, replacement2);

const target3 = `    // 2. Drying Time
    let dryingTime = "30 Mins (Touch Dry) / 4 Hours (Recoat)";
    if (isWood || isEnamel || isIndustrial) dryingTime = "1-2 Hours (Touch Dry) / 8 Hours (Hard Dry)";`;
const replacement3 = `    // 2. Drying Time
    let dryingTime = "30 Mins (Touch Dry) / 4 Hours (Recoat)";
    if (isPowerTool) dryingTime = "N/A (Ready to Use)";
    else if (isWood || isEnamel || isIndustrial) dryingTime = "1-2 Hours (Touch Dry) / 8 Hours (Hard Dry)";`;

content = content.replace(target3, replacement3);

const target4 = `    // 3. Coverage
    let coverage = "130 - 150 sq.ft/L (2 coats)";
    if (isExterior) coverage = "55 - 65 sq.ft/L (2 coats)";`;
const replacement4 = `    // 3. Coverage
    let coverage = "130 - 150 sq.ft/L (2 coats)";
    if (isPowerTool) coverage = "N/A (Tool / Equipment)";
    else if (isExterior) coverage = "55 - 65 sq.ft/L (2 coats)";`;

content = content.replace(target4, replacement4);

const target5 = `    // 4. Washability & Scrub
    let washability = "High Stain Washable & Scrub Resistant";
    if (nameLower.includes('royale') || nameLower.includes('silk')) washability = "Heavy Scrub Resistance (Teflon / Nano-Clean)";`;
const replacement5 = `    // 4. Washability & Scrub
    let washability = "High Stain Washable & Scrub Resistant";
    if (isPowerTool) washability = "Heavy Duty Hardware";
    else if (nameLower.includes('royale') || nameLower.includes('silk')) washability = "Heavy Scrub Resistance (Teflon / Nano-Clean)";`;

content = content.replace(target5, replacement5);

const target6 = `    // 5. Application Base & Diluent
    let base = "100% Acrylic Water Based";
    if (isWood || isEnamel || isIndustrial) base = "Solvent / Polyurethane (PU) Based";`;
const replacement6 = `    // 5. Application Base & Diluent
    let base = "100% Acrylic Water Based";
    if (isPowerTool) base = "Electrical / Mechanical";
    else if (isWood || isEnamel || isIndustrial) base = "Solvent / Polyurethane (PU) Based";`;

content = content.replace(target6, replacement6);

const target7 = `    // 6. Recommended Coats
    let coats = "2 Coats over 1 Coat Primer";
    if (isWaterproofing) coats = "Self-Priming + 2 Waterproof Topcoats";`;
const replacement7 = `    // 6. Recommended Coats
    let coats = "2 Coats over 1 Coat Primer";
    if (isPowerTool) coats = "N/A";
    else if (isWaterproofing) coats = "Self-Priming + 2 Waterproof Topcoats";`;

content = content.replace(target7, replacement7);

const target8 = `    // 7. VOC & Eco Level
    let vocLevel = "Low VOC & Odorless";
    if (nameLower.includes('royale') || nameLower.includes('silk')) vocLevel = "Ultra-Low VOC & Anti-Bacterial (Green Certified)";`;
const replacement8 = `    // 7. VOC & Eco Level
    let vocLevel = "Low VOC & Odorless";
    if (isPowerTool) vocLevel = "Zero Emissions (CE Certified)";
    else if (nameLower.includes('royale') || nameLower.includes('silk')) vocLevel = "Ultra-Low VOC & Anti-Bacterial (Green Certified)";`;

content = content.replace(target8, replacement8);

fs.writeFileSync('src/pages/ProductDetailPage.tsx', content);
console.log("Updated product specs logic.");
