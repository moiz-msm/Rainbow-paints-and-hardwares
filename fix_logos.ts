import fs from 'fs';

let content = fs.readFileSync('src/data.ts', 'utf-8');

// Just Spray
content = content.replace(
  'logo: "/justspray-logo.png",',
  'logo: "https://placehold.co/400x400/E53935/FFFFFF/png?text=Just+Spray",'
);

// Sheenlac
content = content.replace(
  'logo: "https://sheenlac.com/wp-content/uploads/2024/05/Sheenlac-WhiteLogo_MenuBar.png",',
  'logo: "https://placehold.co/400x400/F57C00/FFFFFF/png?text=Sheenlac",'
);

// Ajax
content = content.replace(
  'logo: "https://via.placeholder.com/150?text=AJAX",',
  'logo: "https://placehold.co/400x400/424242/FFFFFF/png?text=Ajax",'
);

// Bawa
content = content.replace(
  'logo: "https://via.placeholder.com/150?text=BAWA",',
  'logo: "https://placehold.co/400x400/1976D2/FFFFFF/png?text=Bawa",'
);

// Jaya
content = content.replace(
  'logo: "https://via.placeholder.com/150?text=JAYA",',
  'logo: "https://placehold.co/400x400/388E3C/FFFFFF/png?text=Jaya",'
);

// Gorila
content = content.replace(
  'logo: "https://via.placeholder.com/150?text=GORILA",',
  'logo: "https://placehold.co/400x400/795548/FFFFFF/png?text=Gorila",'
);

// Local
content = content.replace(
  'logo: "https://via.placeholder.com/150?text=LOCAL",',
  'logo: "https://placehold.co/400x400/9E9E9E/FFFFFF/png?text=Local",'
);

fs.writeFileSync('src/data.ts', content);
