import axios from 'axios';

async function run() {
  const url = 'https://static.asianpaints.com/etc.clientlibs/apcolourcatalogue/components/content/shadelisting/clientlibs.5ec26f5a752c906d864f7c5cecb05940.js';
  const { data } = await axios.get(url);
  // look for api or json
  const jsonMatches = data.match(/['"][^'"]*\.json['"]/g);
  console.log("JSON matches: ", jsonMatches);
  const apiMatches = data.match(/['"][^'"]*api[^'"]*['"]/gi);
  console.log("API matches: ", apiMatches);
}
run();
