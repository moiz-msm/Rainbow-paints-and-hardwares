import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';

async function run() {
    const url = 'https://www.mrfpaint.com/wall-paint-colors-catalog/yellow-colour-wall-paint/';
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0'} });
    const $ = cheerio.load(data);
    
    const scripts = $('script').map((i, el) => $(el).html()).get().filter(s => s && s.length > 0);
    for (const s of scripts) {
         if (s.includes('var colors=[')) {
             const match = s.match(/var colors\s*=\s*(\[.*?\])/);
             if (match) {
                 fs.writeFileSync('mrf_colors_yellow.json', match[1]);
                 try {
                    const js = JSON.parse(match[1]);
                    console.log(`Found ${js.length} colors in yellow script.`);
                 } catch(e) {
                    console.log("Not strict JSON: ", match[1].substring(0, 100));
                 }
             }
         }
    }
}
run();
