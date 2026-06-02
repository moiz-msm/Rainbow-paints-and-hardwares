import axios from 'axios';
import * as cheerio from 'cheerio';

async function run() {
    const url = 'https://www.mrfpaint.com/wall-paint-colors-catalog/yellow-colour-wall-paint/';
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0'} });
    const $ = cheerio.load(data);
    
    console.log("Page size:", data.length);
    
    // find elements that look like colors
    let shades = [];
    $('*').each((i, el) => {
         const cl = $(el).attr('class') || '';
         const id = $(el).attr('id') || '';
         const style = $(el).attr('style') || '';
         const text = $(el).text().trim().replace(/\s+/g, ' ');
         if (style.includes('background') && text.length > 0 && text.length < 50) {
             shades.push({ cl, id, style, text });
         }
    });
    
    console.log("Found matches with background:", shades.length);
    console.log(shades.slice(0, 5));
    
    // Grab all inline scripts to see if data is injected in react/vue/angular format
    const scripts = $('script').map((i, el) => $(el).html()).get().filter(s => s && s.length > 0);
    console.log(`Found ${scripts.length} inline scripts.`);
    for (const s of scripts) {
         if (s.includes('color') || s.includes('shade') || s.includes('hex')) {
             console.log("Script with color data:", s.substring(0, 200));
         }
    }
}
run();
