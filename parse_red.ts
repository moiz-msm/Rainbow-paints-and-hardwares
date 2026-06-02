import * as fs from 'fs';
import * as cheerio from 'cheerio';

function run() {
  const html = fs.readFileSync('red.html', 'utf-8');
  const $ = cheerio.load(html);
  
  const shades = [];
  $('.color-swatch, li, div').each((i, el) => {
      const text = $(el).text();
      const style = $(el).attr('style');
      if (style && style.includes('#')) {
          const hexMatch = style.match(/#([0-9a-fA-F]{6})/);
          if (hexMatch) {
              const hex = hexMatch[1];
              const classes = $(el).attr('class') || '';
              const id = $(el).attr('id') || '';
              // search for text inside
              const innerText = $(el).text().trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
              shades.push({hex, innerText, classes, id});
          }
      }
  });
  console.log("Found matches:", shades.length);
  // print the ones that have some meaningful text
  const valid = shades.filter(s => s.innerText.length > 2 && s.innerText.length < 50);
  console.log(valid.slice(0, 10));
}
run();
