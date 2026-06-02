import * as fs from 'fs';

const html = fs.readFileSync('mrf_yellow.html', 'utf-8');
const lines = html.split('\n');
let i = 0;
for (const line of lines) {
    if (line.includes('window') || line.includes('color') || line.includes('shade')) {
        // do nothing
    }
}
// lets find the word 'Yellow' to see what the container is
const regex = /.{0,50}Yellow.{0,50}/g;
const matches = html.match(regex);
console.log(matches ? matches.slice(0, 10) : []);
