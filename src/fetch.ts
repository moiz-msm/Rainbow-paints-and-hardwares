// script to fetch
import https from 'https';

const options = {
  hostname: 'api.github.com',
  path: '/search/code?q="asian+paints"+language:json',
  headers: { 'User-Agent': 'Node.js' }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log(data));
}).on('error', (err) => console.error(err));
