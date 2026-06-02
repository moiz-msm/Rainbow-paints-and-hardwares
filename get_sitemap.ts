import axios from 'axios';
async function run() {
    try {
        const { data } = await axios.get('https://www.mrfpaint.com/sitemap_index.xml');
        console.log(data.substring(0, 500));
    } catch(e) { console.error(e.message); }
}
run();
