import axios from 'axios';
import * as fs from 'fs';

async function run() {
    const url = 'https://www.mrfpaint.com/wp-content/themes/MRF/fetch_colors.php';
    try {
        let allColors = [];
        let start = 0;
        let colorPalatId = "0"; // To see if it gets all
        
        for (let page=0; page < 500; page++) {
            const formData = new URLSearchParams();
            formData.append('colorPalatId', colorPalatId);
            formData.append('productId', '0');
            formData.append('start', start.toString());
            
            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': 'Mozilla/5.0'
                }
            });
            
            let data = res.data;
            if (typeof data === 'string') {
               try { data = JSON.parse(data); } catch(e) { break; }
            }
            if (!data.colors_info || data.colors_info.length === 0) {
                break;
            }
            allColors = allColors.concat(data.colors_info);
            // console.log(`Fetched ${data.colors_info.length}. Total so far: ${allColors.length}`);
            start = data.colors_info[data.colors_info.length - 1].color_shade_id;
            
            if (data.colors_info.length < 32) break;
        }
        
        console.log("Total colors extracted with 0:", allColors.length);
        fs.writeFileSync('mrf-scraped-0.json', JSON.stringify(allColors, null, 2));
    } catch(e) {
        console.error(e.message);
    }
}
run();
