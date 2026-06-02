import axios from 'axios';
import * as cheerio from 'cheerio';

async function run() {
  const categories = [
      'grey', 'blue', 'brown', 'red', 'orange', 'yellow', 
      'green', 'purple', 'pink', 'white', 'off-white'
  ];
  
  for (const cat of categories) {
      const url = `https://www.asianpaints.com/colour-catalogue/${cat}-wall-colours.html`;
      console.log(`Fetching ${url}...`);
      try {
          const { data } = await axios.get(url);
          const $ = cheerio.load(data);
          // Look for shade elements
          // They might be something like li.colorData or divs with data-color attributes
          const shades = [];
          
          // Lets print all data attributes of matching elements
          $('*').each((i, el) => {
              const attrs = el.attributes;
              if (!attrs) return;
              let isShade = false;
              let hex = '';
              let name = '';
              let shadeCode = '';
              
              for (const attr of attrs) {
                  if (attr.name.includes('data-clr-code') || attr.name === 'data-colorcode') shadeCode = attr.value;
                  if (attr.name === 'data-clr-hex' || attr.name === 'data-colorhex') hex = attr.value;
                  if (attr.name === 'data-clr-name' || attr.name === 'data-colorname') name = attr.value;
              }
              if (hex || name || shadeCode) {
                  shades.push({hex, name, shadeCode, attrs: JSON.stringify(attrs)});
              }
          });
          
          console.log(`Found ${shades.length} possible shades from DOM properties`);
          if (shades.length > 0) {
              console.log(shades.slice(0, 5));
          }
          
          // Let's also check for inline JS arrays containing color data
          const scripts = $('script').map((i, el) => $(el).html()).get().filter(t => t.includes('shade') && t.includes('hex'));
          if (scripts.length > 0) {
              console.log(`Found ${scripts.length} inline scripts with shade data. Lengths:`, scripts.map(s => s.length));
              // Log a sample
              console.log(scripts[0].substring(0, 200));
          } else {
             console.log("No scripts found");
          }
          
          break; // just doing one for testing
      } catch (e) {
          console.error(e.message);
      }
  }
}
run();
