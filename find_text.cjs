const fs = require('fs');
const html = fs.readFileSync('page.html', 'utf8');

const items = ['Swirltex', 'Crosstex', 'Dholpur', 'Finetex', 'Pebbletex', 'Roughtex'];

items.forEach(item => {
    const idx = html.toLowerCase().indexOf(item.toLowerCase());
    if (idx !== -1) {
        console.log(`Found ${item}:`);
        console.log(html.substring(Math.max(0, idx - 150), idx + 350));
        console.log("----");
    } else {
        console.log(`Not found: ${item}`);
    }
});
