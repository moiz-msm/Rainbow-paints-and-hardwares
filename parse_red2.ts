import * as fs from 'fs';
import * as cheerio from 'cheerio';

function run() {
  const html = fs.readFileSync('red.html', 'utf-8');
  const $ = cheerio.load(html);
  
  const matches = [];
  $('[style*="#"]').each((i, el) => {
      const style = $(el).attr('style');
      if (style && style.match(/#([0-9a-fA-F]{6})/)) {
          matches.push($(el).parent().html().replace(/\s+/g, ' '));
      }
  });
  console.log(matches.slice(15, 17));
}
run();
