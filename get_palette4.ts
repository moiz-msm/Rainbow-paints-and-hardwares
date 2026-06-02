import axios from 'axios';
async function run() {
  const cfs = ['all', 'Reds', 'Yellows', 'Blues'];
  const langs = ['en', 'en-in', 'en_IN'];
  for (const cf of cfs) {
     for (const lg of langs) {
        try {
            const res = await axios.get(`https://www.asianpaints.com/apcolourcatalogue/shadelistingpalette.json?cfType=${cf}&pageNumber=1&language=${lg}`, {headers:{'User-Agent':'Mozilla/5.0'}});
            if (Object.keys(res.data).length > 0) {
               console.log("Success with ", cf, lg, Object.keys(res.data));
            }
        } catch(e) {}
     }
  }
}
run();
