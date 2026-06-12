fetch('http://localhost:3000/sitemap.xml').then(r => r.text()).then(console.log).catch(console.error);
