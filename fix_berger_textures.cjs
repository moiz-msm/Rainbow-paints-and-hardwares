const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

const extTextures = [
"Florentina Vintage",
"Florentina Sandstone",
"Florentina Glitteratti",
"Solitaire Granite",
"Solitaire Stone",
"Ruff & Tuff Pearl",
"Ruff & Tuff Scratch",
"Ruff & Tuff Decora Rollercast",
"Ruff & Tuff Decora Rollercoat",
"Ruff & Tuff Decora Dholpur Stone"
];

const intTextures = [
"GlamArt Italian Collection Diamond",
"GlamArt Italian Collection Velluto",
"GlamArt Italian Collection Panama",
"GlamArt Italian Collection Decorative Primer",
"GlamArt Italian Collection Soffio",
"GlamArt Italian Collection Damasco",
"Silk Glamart Metallica",
"Silk GlamArt Non Metallic",
"Silk GlamArt Metallica for Designs",
"Silk GlamArt Stucco",
"Silk GlamArt Vintage",
"Silk Glamart Stones & Tones",
"Silk Metallics"
];

for (const name of extTextures) {
  const blockRegex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\"subCategory\\"\\s*:\\s*\\")([^"]+)(\\")`, 'g');
  data = data.replace(blockRegex, `$1Exterior Texture$3`);
}

for (const name of intTextures) {
  const blockRegex = new RegExp(`(\\"name\\"\\s*:\\s*\\"${name}\\"[\\s\\S]*?\\"subCategory\\"\\s*:\\s*\\")([^"]+)(\\")`, 'g');
  data = data.replace(blockRegex, `$1Interior Texture$3`);
}

// Add to subCategories export
if (!data.includes('"Exterior Texture"')) {
  data = data.replace(/"Exterior Wall",/g, '"Exterior Wall",\n    "Exterior Texture",');
}
if (!data.includes('"Interior Texture"')) {
  data = data.replace(/"Interior Wall",/g, '"Interior Wall",\n    "Interior Texture",');
}

fs.writeFileSync('src/data.ts', data);
console.log('Fixed Berger Textures and updated subCategories array');
