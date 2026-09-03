const fs = require('fs');

let content = fs.readFileSync('src/components/ProductsSection.tsx', 'utf-8');

const defaultImagesMap = {
  "Interior Wall": "https://img.icons8.com/color/144/living-room.png",
  "Exterior Wall": "https://img.icons8.com/color/144/home.png",
  "Undercoats": "https://img.icons8.com/color/144/paint-bucket.png",
  "Primer": "https://img.icons8.com/color/144/paint-bucket.png",
  "Waterproofing": "https://img.icons8.com/color/144/water.png",
  "Wood Finishes": "https://img.icons8.com/color/144/wood.png",
  "Painting Tools": "https://img.icons8.com/color/144/paint-brush.png",
  "Tools": "https://img.icons8.com/color/144/paint-brush.png",
  "Power Tools": "https://img.icons8.com/color/144/drill.png",
  "PU Coatings": "https://img.icons8.com/color/144/paint.png",
  "Epoxy Coatings": "https://img.icons8.com/color/144/test-tube.png",
  "Metals and Grills": "https://img.icons8.com/color/144/metal.png",
  "Synthetic Enamels": "https://img.icons8.com/color/144/paint-can.png",
  "Industrial": "https://img.icons8.com/color/144/factory.png",
  "Tile Adhesives": "https://img.icons8.com/color/144/brick-wall.png",
  "Thinners & Solvents": "https://img.icons8.com/color/144/flask.png",
};

// We will just replace the whole defaultImages block
const regex = /const defaultImages: Record<string, string> = \{[\s\S]*?\};/;
const replacementStr = `const defaultImages: Record<string, string> = {
      "Interior Wall": "https://img.icons8.com/color/144/living-room.png",
      "Exterior Wall": "https://img.icons8.com/color/144/home.png",
      "Undercoats": "https://img.icons8.com/color/144/paint-bucket.png",
      "Primer": "https://img.icons8.com/color/144/paint-bucket.png",
      "Waterproofing": "https://img.icons8.com/color/144/water.png",
      "Wood Finishes": "https://img.icons8.com/color/144/wood.png",
      "Painting Tools": "https://img.icons8.com/color/144/paint-brush.png",
      "Tools": "https://img.icons8.com/color/144/paint-brush.png",
      "Power Tools": "https://img.icons8.com/color/144/drill.png",
      "PU Coatings": "https://img.icons8.com/color/144/paint.png",
      "Epoxy Coatings": "https://img.icons8.com/color/144/test-tube.png",
      "Metals and Grills": "https://img.icons8.com/color/144/metal.png",
      "Synthetic Enamels": "https://img.icons8.com/color/144/paint-can.png",
      "Industrial": "https://img.icons8.com/color/144/factory.png",
      "Tile Adhesives": "https://img.icons8.com/color/144/brick-wall.png",
      "Thinners & Solvents": "https://img.icons8.com/color/144/flask.png",
    };`;

content = content.replace(regex, replacementStr);

const fbRegex = /const fallbackImages = \[[\s\S]*?\];/;
const fbReplacement = `const fallbackImages = [
      "https://img.icons8.com/color/144/paint-palette.png",
    ];`;
content = content.replace(fbRegex, fbReplacement);

fs.writeFileSync('src/components/ProductsSection.tsx', content);

console.log("Updated ProductSection.tsx to use icons8!");
