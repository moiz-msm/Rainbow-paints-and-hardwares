import * as fs from 'fs';
import * as cheerio from 'cheerio';

function run() {
    const html = fs.readFileSync('mrf_yellow.html', 'utf-8');
    const $ = cheerio.load(html);
    
    $('script').each((i, el) => {
         const sr = $(el).attr('src');
         const body = $(el).html();
         if (!sr && body) {
             if (body.includes('colors')) {
                 fs.writeFileSync(`script_${i}.js`, body);
                 console.log("Wrote", `script_${i}.js`);
             }
         }
    });
}
run();
