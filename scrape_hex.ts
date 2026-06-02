import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
    const url = 'https://www.asianpaints.com/colour-catalogue/grey-wall-colours.html';
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0'} });
    const $ = cheerio.load(data);
    const matches = data.match(/#[0-9a-fA-F]{6}/g);
    console.log("Found hex matches count:", matches ? matches.length : 0);
    // Find everything with 'data-'
    let dataAttrs = new Set();
    $('*').each((i, el) => {
        if (el.attributes) {
            for (let attr of el.attributes) {
                if (attr.name.startsWith('data-') && attr.name.includes('color')) {
                    dataAttrs.add(attr.name);
                }
            }
        }
    });
    console.log(Array.from(dataAttrs));
}
run();
