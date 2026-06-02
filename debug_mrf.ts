import axios from 'axios';

async function run() {
    const url = 'https://www.mrfpaint.com/wp-content/themes/MRF/fetch_colors.php';
    try {
        const formData = new URLSearchParams();
        formData.append('colorPalatId', 'Yellow'); // exact case from site
        formData.append('productId', '');
        formData.append('start', '0');
        
        const res = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'User-Agent': 'Mozilla/5.0'
            }
        });
        console.log("Raw response:");
        console.log(typeof res.data === 'string' ? res.data.substring(0, 500) : res.data);
    } catch(e) {
        console.error(e.message);
    }
}
run();
