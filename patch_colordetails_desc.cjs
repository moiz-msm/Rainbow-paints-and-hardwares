const fs = require('fs');
let content = fs.readFileSync('src/pages/ColorDetailsPage.tsx', 'utf-8');

const descLogic = `
  const getDescription = (shade) => {
    if (!shade) return "";
    const family = (shade.family || "color").toLowerCase();
    
    // Lightness check
    const hex = shade.hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    const isLight = brightness > 180;
    const isDark = brightness < 100;

    let trait = "versatile";
    if (isLight) trait = "bright and airy";
    else if (isDark) trait = "deep and sophisticated";
    else trait = "balanced and inviting";

    let vibe = "welcoming atmosphere";
    let pairing = "wooden furniture and subtle metallic accents";

    if (family.includes("blue")) {
      vibe = "calming, serene environment";
      pairing = "crisp whites and warm wood tones";
    } else if (family.includes("green") || family.includes("teal")) {
      vibe = "refreshing, nature-inspired feel";
      pairing = "natural textures and earthy neutrals";
    } else if (family.includes("red") || family.includes("pink") || family.includes("magenta")) {
      vibe = "vibrant and energetic space";
      pairing = "muted neutrals and gold accents";
    } else if (family.includes("yellow") || family.includes("orange") || family.includes("gold")) {
      vibe = "cheerful and warm ambiance";
      pairing = "cool grays and soft whites";
    } else if (family.includes("grey") || family.includes("gray") || family.includes("neutral") || family.includes("brown") || family.includes("beige")) {
      vibe = "modern, sophisticated look";
      pairing = "bold accent colors and sleek furnishings";
    } else if (family.includes("white") || family.includes("off-white") || family.includes("cream")) {
      vibe = "clean and spacious feel";
      pairing = "virtually any color palette";
    } else if (family.includes("purple") || family.includes("violet")) {
      vibe = "luxurious and creative mood";
      pairing = "silver accents and soft greys";
    }

    return \`\${shade.name} (\${shade.shadeCode}) is a \${trait} \${family} shade that brings a distinct character to your space. It works wonderfully to create a \${vibe} in your home. This color pairs exceptionally well with \${pairing}, making it a highly adaptable choice from the \${shade.brand} collection.\`;
  };
`;

const insertTarget = `const { living, bedroom } = shade ? getStableImages(shade.name + shade.shadeCode) : { living: "", bedroom: "" };`;

content = content.replace(insertTarget, descLogic + '\n  ' + insertTarget);

const uiTarget = `<p className="text-ivory/80 text-sm leading-relaxed mb-6 font-light">
                {shade.name} ({shade.shadeCode}) is a gentle, low-depth shade with a warm character. It works as a quiet backdrop in most rooms and pairs easily with wooden furniture and metallic accents. One of the most loved shades in the {shade.brand} palette, this color helps you create a cohesive and welcoming atmosphere.
              </p>`;
              
const uiReplacement = `<p className="text-ivory/80 text-sm leading-relaxed mb-6 font-light">
                {getDescription(shade)}
              </p>`;

content = content.replace(uiTarget, uiReplacement);

fs.writeFileSync('src/pages/ColorDetailsPage.tsx', content);
console.log("Updated description logic");
