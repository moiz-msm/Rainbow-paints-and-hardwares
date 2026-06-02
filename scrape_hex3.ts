import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
    const url = 'https://www.asianpaints.com/colour-catalogue/grey-wall-colours.html';
    const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0'} });
    // regex search for 'Morning Glory' or some other shade
    const regex = /"shadeName":"[^"]+"/g;
    const matches = data.match(regex);
    console.log("shadeName matches:", matches ? matches.length : 0);
    
    // Let's print out parts of the JSON where the hex codes are
    const matches2 = matchAll(data, /\{[^}]*#[0-9a-fA-F]{6}[^}]*\}/g);
    console.log("JSON dicts with hex code:", matches2.length);
    if (matches2.length) console.log(matches2.slice(0, 5));
}
function matchAll(str, regex) {
    let res = [];
    let m;
    while ((m = regex.exec(str)) !== null) {
        res.push(m[0]);
    }
    return res;
}
run();
