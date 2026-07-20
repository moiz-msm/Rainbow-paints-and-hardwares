const fs = require('fs');
let content = fs.readFileSync('src/pages/Home.tsx', 'utf-8');

const target = `    areaServed: {
      "@type": "City",
      name: "Coimbatore",
    },`;

const replacement = `    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.0168,
      longitude: 76.9558,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Coimbatore",
      },
      {
        "@type": "City",
        name: "RS Puram",
      },
      {
        "@type": "City",
        name: "Gandhipuram",
      },
      {
        "@type": "City",
        name: "Saibaba Colony",
      },
      {
        "@type": "City",
        name: "Peelamedu",
      },
      {
        "@type": "City",
        name: "Saravanampatti",
      },
    ],`;

content = content.replace(target, replacement);
fs.writeFileSync('src/pages/Home.tsx', content);
