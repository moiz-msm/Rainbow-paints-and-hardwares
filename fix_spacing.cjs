const fs = require('fs');
let content = fs.readFileSync('src/components/VisualizerSection.tsx', 'utf8');

const startMarker = "          {/* Designer Curated Color Schemes Row */}";
const endMarker = "          </div>";

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker, startIndex + startMarker.length + 100);

if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find markers');
  process.exit(1);
}

const endBlockIndex = endIndex + endMarker.length + 1;

let blockToMove = content.slice(startIndex, endBlockIndex); 
console.log("End of block:", JSON.stringify(blockToMove.slice(-30)));

let adjustedBlock = blockToMove.split('\n').map(line => {
  if (line.length > 0) {
    return '  ' + line;
  }
  return line;
}).join('\n');

content = content.slice(0, startIndex) + adjustedBlock + content.slice(endBlockIndex);

fs.writeFileSync('src/components/VisualizerSection.tsx', content);
console.log('Moved successfully');
