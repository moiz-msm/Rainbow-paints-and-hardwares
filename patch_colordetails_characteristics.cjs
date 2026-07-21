const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const characteristicsLogic = `
  function getShadeCharacteristics(shade) {
    if (!shade) return { lrv: 0, undertone: "Neutral", suitedFor: "Interior Walls" };
    
    const hex = shade.hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    
    // Approximate LRV (0-100) using relative luminance
    const rs = r / 255;
    const gs = g / 255;
    const bs = b / 255;
    
    // Convert to linear RGB
    const rl = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
    const gl = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
    const bl = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
    
    const L = 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
    
    // Convert luminance to perceived lightness (L*) for a more accurate LRV representation 0-100
    const lrv = Math.max(0, Math.min(100, Math.round(L * 100)));
    
    let undertone = "Neutral";
    if (r > g + 15 && r > b + 15) undertone = "Warm (Red/Pink)";
    else if (g > r + 15 && g > b + 15) undertone = "Cool (Green)";
    else if (b > r + 15 && b > g + 15) undertone = "Cool (Blue)";
    else if (r > b + 15 && g > b + 15 && Math.abs(r - g) < 20) undertone = "Warm (Yellow/Gold)";
    else if (r > g && g > b && r - b > 30) undertone = "Warm (Orange/Peach)";
    else if (b > r && b > g && Math.abs(r - g) < 15) undertone = "Cool (Purple)";
    
    let suitedFor = "Interior Walls";
    if (lrv > 70) suitedFor = "Living Rooms, Hallways, Ceilings";
    else if (lrv < 30) suitedFor = "Accent Walls, Home Theaters";
    else suitedFor = "Bedrooms, Dining Rooms, Exteriors";

    return { lrv, undertone, suitedFor };
  }
`;

const insertTarget = `function getDescription(shade) {`;
content = content.replace(insertTarget, characteristicsLogic + '\n  ' + insertTarget);

const compStartTarget = `const faqAns = getFaqAnswers(shade);`;
content = content.replace(compStartTarget, compStartTarget + '\n  const char = getShadeCharacteristics(shade);');

const ulTarget = `<li className="flex justify-between items-center">
                  <span className="text-ivory/60">Color Family</span>
                  <span className="font-semibold text-ivory capitalize">{shade.family}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-ivory/60">Recommended Finish</span>
                  <span className="font-semibold text-ivory">{shade.finish}</span>
                </li>`;
                
const ulReplacement = `<li className="flex justify-between items-center">
                  <span className="text-ivory/60">Color Family</span>
                  <span className="font-semibold text-ivory capitalize">{shade.family}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-ivory/60">Light Reflectance Value (LRV)</span>
                  <span className="font-semibold text-ivory">{char.lrv}%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-ivory/60">Color Undertone</span>
                  <span className="font-semibold text-ivory">{char.undertone}</span>
                </li>
                <li className="flex justify-between items-center text-right">
                  <span className="text-ivory/60">Best Suited For</span>
                  <span className="font-semibold text-ivory max-w-[60%]">{char.suitedFor}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-ivory/60">Recommended Finish</span>
                  <span className="font-semibold text-ivory">{shade.finish}</span>
                </li>`;

content = content.replace(ulTarget, ulReplacement);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Updated characteristics");
