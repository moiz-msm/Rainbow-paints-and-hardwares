const fs = require('fs');
let content = fs.readFileSync('src/components/VisualizerSection.tsx', 'utf8');

const startMarker = "              {/* Designer Curated Color Schemes Row */}";
const endMarker = "                )}\n              </div>";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find markers');
  process.exit(1);
}

const endBlockIndex = endIndex + endMarker.length + 1;

let blockToMove = content.slice(startIndex, endBlockIndex); 
console.log("End of block:", JSON.stringify(blockToMove.slice(-30)));

content = content.slice(0, startIndex) + content.slice(endBlockIndex);

const insertMarker = "            {/* Custom Paint Color Matcher & Picker Panel */}";
const insertIndex = content.indexOf(insertMarker);

if (insertIndex === -1) {
  console.log('Could not find insert marker');
  process.exit(1);
}

// remove 2 levels of indentation (4 spaces)
let adjustedBlock = blockToMove.split('\n').map(line => {
  if (line.startsWith('    ')) {
    return line.slice(4);
  }
  return line;
}).join('\n');

content = content.slice(0, insertIndex) + adjustedBlock + '\n' + content.slice(insertIndex);

fs.writeFileSync('src/components/VisualizerSection.tsx', content);
console.log('Moved successfully');
