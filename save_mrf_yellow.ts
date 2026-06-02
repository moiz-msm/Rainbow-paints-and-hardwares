import axios from 'axios';
import * as fs from 'fs';

async function run() {
    const url = 'https://www.mrfpaint.com/wall-paint-colors-catalog/yellow-colour-wall-paint/';
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0'} });
    fs.writeFileSync('mrf_yellow.html', data);
    console.log("Saved.");
}
run();
