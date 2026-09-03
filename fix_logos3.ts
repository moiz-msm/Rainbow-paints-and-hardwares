import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf-8');

// Just Spray
content = content.replace(
  'logo: "/justspray-logo.png",',
  'logo: "https://m.media-amazon.com/images/I/71zeNIWEADL._SL1500_.jpg",'
);

// Sheenlac
content = content.replace(
  'logo: "https://sheenlac.com/wp-content/uploads/2024/05/Sheenlac-WhiteLogo_MenuBar.png",',
  'logo: "https://m.media-amazon.com/images/I/61qPTRPc19L.jpg",'
);

// Ajax
content = content.replace(
  'logo: "https://via.placeholder.com/150?text=AJAX",',
  'logo: "https://m.media-amazon.com/images/I/71DPemfY7hL.jpg",'
);

fs.writeFileSync('src/data.ts', content);
