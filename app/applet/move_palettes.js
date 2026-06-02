const fs = require('fs');

let content = fs.readFileSync('src/components/VisualizerSection.tsx', 'utf8');

const startMarker = "                    {/* Designer Curated Color Schemes Row */}";
const endMarker = "                    </div>\n                  </>";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find markers');
  process.exit(1);
}

const blockToMove = content.slice(startIndex, endIndex + 27); 

console.log("End of block:", JSON.stringify(blockToMove.slice(-30)));

content = content.slice(0, startIndex) + content.slice(endIndex + 27);

const insertMarker = "              {/* Quick Tabs: Recent / Favorites */}";
const insertIndex = content.indexOf(insertMarker);

if (insertIndex === -1) {
  console.log('Could not find insert marker');
  process.exit(1);
}

let adjustedBlock = blockToMove.split('\n').map(line => {
  if (line.startsWith('      ')) {
    return line.slice(6);
  }
  return line;
}).join('\n');

content = content.slice(0, insertIndex) + adjustedBlock + '\n' + content.slice(insertIndex);

fs.writeFileSync('src/components/VisualizerSection.tsx', content);
console.log('Moved successfully');
