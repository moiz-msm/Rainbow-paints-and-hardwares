import axios from 'axios';

async function run() {
    const url = 'https://www.mrfpaint.com/wp-content/themes/MRF/fetch_colors.php';
    const tests = [
       { colorPalatId: 'all', productId: 0, start: 0 },
       { colorPalatId: '0', productId: 0, start: 0 }
    ];
    
    for (const t of tests) {
        try {
            const formData = new URLSearchParams();
            formData.append('colorPalatId', t.colorPalatId);
            formData.append('productId', t.productId.toString());
            formData.append('start', t.start.toString());
            
            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': 'Mozilla/5.0'
                }
            });
            console.log("Test:", t);
            console.log("Result items:", res.data?.Count || res.data?.count || res.data?.colors_info?.length);
        } catch(e) {}
    }
}
run();
