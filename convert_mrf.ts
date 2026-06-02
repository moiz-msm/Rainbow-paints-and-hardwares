import * as fs from 'fs';

function rgbToHex(r, g, b) {
  return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
}

function run() {
  const scraped = JSON.parse(fs.readFileSync('mrf-scraped-0.json', 'utf-8'));
  
  const shades = scraped.map((s, index) => {
      // Clean names
      let name = s.color_shade_name.trim();
      let rgbStr = s.color_rgb.toLowerCase().replace('rgb(', '').replace(')', '').replace(/\s+/g, '');
      let [r, g, b] = rgbStr.split(',').map(Number);
      
      let hexCode = rgbToHex(r, g, b);
      
      let family = s.color_shade_palat_id || 'Other';
      if (['Yellow','Purple','Pink','Green','White','Blue','Orange','Brown','Grey','Red'].includes(family) === false && family === 'White & Off-white') {
          family = 'Whites';
      } else if (family === 'White') {
          family = 'Whites';
      }
      
      return {
          id: `mrf-${s.color_shade_id}`,
          name: name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' '),
          shadeCode: s.color_shade_code,
          hex: hexCode,
          rgb: `${r},${g},${b}`,
          brand: "MRF Vapocure",
          category: s.color_shade_product_id || "Premium Finishes",
          finish: "Smooth",
          popular: false, // Could flag top X as popular, but false default
          family: family
      };
  });
  
  // Make sure to eliminate perfect duplicates if any based on shadeCode
  const unique = new Map();
  shades.forEach(s => {
       if (!unique.has(s.shadeCode)) unique.set(s.shadeCode, s);
  });
  const uniqueShades = Array.from(unique.values());
  
  fs.writeFileSync('src/data/shades/mrf-paints.json', JSON.stringify(uniqueShades, null, 2));
  console.log("Written items:", uniqueShades.length);
}
run();
