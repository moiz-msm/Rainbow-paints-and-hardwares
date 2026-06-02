import axios from 'axios';
async function run() {
    try {
        let res = await axios.get('https://www.mrfpaint.com/page-sitemap.xml');
        console.log(res.data.substring(0, 1000));
        res = await axios.get('https://www.mrfpaint.com/products-sitemap.xml');
        console.log(res.data.substring(0, 1000));
    } catch(e) { console.error(e.message); }
}
run();
