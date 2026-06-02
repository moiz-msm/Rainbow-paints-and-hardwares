import axios from 'axios';
import * as cheerio from 'cheerio';

async function run() {
  const { data } = await axios.get('https://www.asianpaints.com/colour-catalogue.html');
  const $ = cheerio.load(data);
  const scripts = $('script[src]').map((i, el) => $(el).attr('src')).get();
  
  for (const src of scripts) {
      if (src.includes('colourcatalogue') || src.includes('global')) {
         console.log(src);
      }
  }
}
run();
