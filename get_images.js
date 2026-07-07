import https from 'https';

https.get('https://html.duckduckgo.com/html/?q=site:yespainter.com+weathercoat+glow', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // try to find any image url containing berger and glow
    const urls = data.match(/http[^"']*\.(?:png|jpg|jpeg)/gi);
    if (urls) {
      console.log('URLs:', [...new Set(urls)].join('\n'));
    } else {
      console.log('Not found');
    }
  });
}).on('error', (e) => {
  console.error(e);
});
