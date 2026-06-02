import axios from 'axios';
import * as cheerio from 'cheerio';

async function run() {
  const { data } = await axios.get('https://www.asianpaints.com/colour-catalogue.html');
  const $ = cheerio.load(data);
  
  // Find links
  const links = new Set();
  $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href && href.includes('colour-catalogue')) {
          links.add(href);
      }
  });
  console.log(Array.from(links));
}
run();
