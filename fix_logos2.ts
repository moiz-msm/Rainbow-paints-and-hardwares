import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf-8');

// Just Spray
content = content.replace(
  'logo: "https://placehold.co/400x400/E53935/FFFFFF/png?text=Just+Spray",',
  'logo: "/justspray-logo.png",'
);

// Sheenlac
content = content.replace(
  'logo: "https://placehold.co/400x400/F57C00/FFFFFF/png?text=Sheenlac",',
  'logo: "https://sheenlac.com/wp-content/uploads/2024/05/Sheenlac-WhiteLogo_MenuBar.png",'
);

// Ajax
content = content.replace(
  'logo: "https://placehold.co/400x400/424242/FFFFFF/png?text=Ajax",',
  'logo: "https://via.placeholder.com/150?text=AJAX",'
);

fs.writeFileSync('src/data.ts', content);
