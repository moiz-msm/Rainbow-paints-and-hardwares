import * as fs from 'fs';

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : "0,0,0";
}

function run() {
  const scraped = JSON.parse(fs.readFileSync('asian-paints-scraped.json', 'utf-8'));
  
  const shades = scraped.map(s => {
      // Clean names
      let name = s.entityName;
      if (name.endsWith('-n')) name = name.substring(0, name.length-2);
      
      return {
          id: `asian-${s.entityCode}`,
          name: name.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          shadeCode: s.entityCode,
          hex: s.shadeHexCode,
          rgb: hexToRgb(s.shadeHexCode),
          brand: "Asian Paints",
          category: s.featureTag || "Premium Finishes",
          finish: "Smooth",
          popular: parseInt(s.popularity || '1000') <= 50 || s.featureTag === 'Recommended',
          family: s.shadeFamily
      };
  });
  
  fs.writeFileSync('src/data/shades/asian-paints.json', JSON.stringify(shades, null, 2));
  console.log("Written items:", shades.length);
}
run();
