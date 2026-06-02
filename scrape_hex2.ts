import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
    const url = 'https://www.asianpaints.com/colour-catalogue/grey-wall-colours.html';
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0'} });
    const $ = cheerio.load(data);
    let items = [];
    $('*').each((i, el) => {
        let hasHex = false;
        let attrs = {};
        if (el.attributes) {
            for (let attr of el.attributes) {
                attrs[attr.name] = attr.value;
                if (attr.value && attr.value.match(/#[0-9a-fA-F]{6}/)) {
                    hasHex = true;
                }
            }
        }
        if (hasHex || (attrs['style'] && attrs['style'].includes('background-color'))) {
             items.push(attrs);
        }
    });
    console.log(items.slice(0, 10));
}
run();
