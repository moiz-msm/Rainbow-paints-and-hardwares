import axios from 'axios';

async function run() {
    const url = 'https://www.mrfpaint.com/wp-content/themes/MRF/fetch_colors.php';
    const tests = [
       { colorPalatId: 'Yellow', productId: '', start: 0 },
       { colorPalatId: 'yellow', productId: '', start: 0 },
       { colorPalatId: '2', productId: '', start: 0 },
       { colorPalatId: '', productId: '', start: 0 }
    ];
    
    for (const t of tests) {
        try {
            const formData = new URLSearchParams();
            formData.append('colorPalatId', t.colorPalatId);
            formData.append('productId', t.productId);
            formData.append('start', t.start.toString());
            
            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'User-Agent': 'Mozilla/5.0'
                }
            });
            console.log("Test:", t);
            console.log("Result:", typeof res.data === 'string' ? res.data.substring(0,100) : Object.keys(res.data),
                 res.data.count, 'items');
        } catch(e) {}
    }
}
run();
