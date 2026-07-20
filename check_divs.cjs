const fs = require('fs');

const content = fs.readFileSync('src/components/VisualizerSection.tsx.broken', 'utf-8');

function checkDivs(code) {
    let open = (code.match(/<div(\s|>)/g) || []).length;
    let close = (code.match(/<\/div>/g) || []).length;
    return {open, close, diff: open - close};
}

const paletteIdx = content.indexOf(`{activeControlTab === 'palette' && (`);
const aiIdx = content.indexOf(`{activeControlTab === 'ai' && (`);
const exploreIdx = content.indexOf(`{activeControlTab === 'explore' && (`);

const tabsFooterIdx = content.indexOf(`            </div>\n          </div>\n        </div>\n      </div>\n      <style>`);

let exploreHtml = content.substring(exploreIdx, paletteIdx);
let paletteHtml = content.substring(paletteIdx, aiIdx);
let aiHtml = content.substring(aiIdx, tabsFooterIdx);

console.log("Explore diff:", checkDivs(exploreHtml).diff);
console.log("Palette diff:", checkDivs(paletteHtml).diff);
console.log("AI diff:", checkDivs(aiHtml).diff);

