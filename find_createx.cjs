const fs = require('fs');
const html = fs.readFileSync('page.html', 'utf8').toLowerCase();
const searchTerm = 'createx';
let idx = html.indexOf(searchTerm);
while (idx !== -1) {
    console.log(html.substring(Math.max(0, idx - 50), idx + 250));
    idx = html.indexOf(searchTerm, idx + 1);
}
