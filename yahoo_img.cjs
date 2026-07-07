const axios = require('axios');
const cheerio = require('cheerio');
async function search(query) {
    const { data } = await axios.get(`https://images.search.yahoo.com/search/images?p=${encodeURIComponent(query)}`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
        }
    });
    const $ = cheerio.load(data);
    const img = $('#sres img').first().attr('data-src') || $('#sres img').first().attr('src');
    console.log(img);
}
search('Berger Paints Just Spray');
