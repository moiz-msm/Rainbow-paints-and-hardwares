import axios from 'axios';
import * as fs from 'fs';

async function run() {
    const url = 'https://www.mrfpaint.com/wall-paint-colors-catalog/all/';
    try {
        const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0'} });
        const match = data.match(/var colors\s*=\s*(\[.*?\]);/s);
        if (match) {
             const js = JSON.parse(match[1]);
             console.log(`Found ${js.length} colors in ALL script.`);
             fs.writeFileSync('mrf_all_colors.json', JSON.stringify(js, null, 2));
        } else {
             console.log("Not found in ALL.");
             fs.writeFileSync('all_page.html', data);
        }
    } catch (e) {
        console.error(e.response ? e.response.status : e.message);
    }
}
run();
