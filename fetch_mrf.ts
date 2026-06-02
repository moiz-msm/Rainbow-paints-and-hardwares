import axios from 'axios';
import * as fs from 'fs';

async function run() {
    const url = 'https://www.mrfpaint.com/wp-content/themes/MRF/fetch_colors.php';
    try {
        let allColors = [];
        let start = 0;
        let colorPalatId = "all";
        while (true) {
            const formData = new URLSearchParams();
            formData.append('colorPalatId', colorPalatId);
            formData.append('productId', '');
            formData.append('start', start.toString());
            
            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': 'Mozilla/5.0'
                }
            });
            console.log("Response type:", typeof res.data, "start:", start);
            
            let data = res.data;
            if (typeof data === 'string') {
               try {
                  data = JSON.parse(data);
               } catch (e) {
                  console.log("JSON parse error", data.substring(0, 100));
                  break;
               }
            }
            if (!data.colors_info || data.count === 0) {
                break;
            }
            allColors = allColors.concat(data.colors_info);
            console.log(`Fetched ${data.colors_info.length}. Total so far: ${allColors.length}`);
            start = data.colors_info[data.count - 1].color_shade_id;
            
            // if we gathered enough or hit a bug
            if (data.count < 32) break;
        }
        
        console.log("Total colors extracted:", allColors.length);
        fs.writeFileSync('mrf-scraped.json', JSON.stringify(allColors, null, 2));
    } catch(e) {
        console.error(e.message);
    }
}
run();
