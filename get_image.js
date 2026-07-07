import https from 'https';

https.get('https://www.bergerpaints.com/products/exterior-wall-coatings/exterior-emulsion/weathercoat-glow', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/<img[^>]*src="([^"]*weathercoat-glow[^"]*)"/i);
    if (match) {
      console.log('Image URL:', match[1]);
    } else {
      console.log('Not found');
    }
  });
}).on('error', (e) => {
  console.error(e);
});
