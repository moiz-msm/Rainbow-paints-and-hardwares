const fs = require('fs');

let content = fs.readFileSync('src/data/blogPosts.ts', 'utf8');

const productReplacements = [
  { text: "Apex Ultima Protek Duralife", link: "/p/apex-ultima-protek-duralife" },
  { text: "Silk Glamor Luxury Emulsion", link: "/p/silk-glamor-luxury-emulsion" },
  { text: "Apex Ultima Protek", link: "/p/apex-ultima-protek" },
  { text: "WeatherCoat Long Life", link: "/p/weathercoat-long-life" },
  { text: "Royale Glitz", link: "/p/royale-glitz" },
  { text: "Apcolite Advanced Heavy Duty Emulsion", link: "/p/apcolite-advanced-emulsion" },
  { text: "Asian Paints Apcolite Advanced", link: "/p/apcolite-advanced-emulsion" },
  { text: "Berger Easy Clean Home Shield", link: "/p/easy-clean-fresh" },
  { text: "Berger Easy Clean", link: "/p/easy-clean-fresh" },
  { text: "MRF Super Enamel", link: "/p/synthetic-enamel-grey" },
  { text: "Asian Paints Water Based Enamel", link: "/p/apcolite-premium-enamel" },
  { text: "Asian Paints Apcolite Premium Enamel", link: "/p/apcolite-premium-enamel" },
  { text: "Asian Paints Apcolite Enamel", link: "/p/apcolite-premium-enamel" },
  { text: "Dr. Fixit Dampguard", link: "/p/newcoat-waterproofing" },
  { text: "Asian Paints SmartCare Damp Block 2K", link: "/p/decoprime-wall-primer" },
  { text: "Asian Paints Royale", link: "/p/royale-luxury-emulsion" },
  { text: "Berger Silk Glamor", link: "/p/silk-glamor-luxury-emulsion" },
  { text: "Asian Paints Apcolite", link: "/p/apcolite-premium-emulsion" },
  { text: "Royale Luxury Emulsion", link: "/p/royale-luxury-emulsion" },
];

for (const {text, link} of productReplacements) {
    // Only replace outside markdown links
    const regex = new RegExp(`(?<!\\[)${text}(?!\\])(?!\\()`, 'g');
    content = content.replace(regex, `[${text}](${link})`);
}

// Ensure color words that are standalone get linked
const colors = [
  "White", "Off-white", "Cream", "Light beige", "Pastel grey", "Light sand",
  "Black", "Dark grey", "Navy blue", "Deep maroon", "Dark brown", "red", "blue", "green"
];

for (const color of colors) {
    const regex = new RegExp(`(?<!\\[)\\b${color}\\b(?!\\])(?!\\()`, 'gi');
    content = content.replace(regex, match => `[${match}](/visualizer)`);
}

fs.writeFileSync('src/data/blogPosts.ts', content);
