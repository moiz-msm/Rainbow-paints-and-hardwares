const fs = require('fs');
let content = fs.readFileSync('src/components/VisualizerSection.tsx', 'utf8');

content = content.replace(/text-zinc-950/g, 'text-ivory');
content = content.replace(/text-zinc-900/g, 'text-ivory');
content = content.replace(/text-zinc-850/g, 'text-ivory');
content = content.replace(/text-zinc-800/g, 'text-ivory');
content = content.replace(/text-zinc-700/g, 'text-ivory/80');
content = content.replace(/text-zinc-600/g, 'text-ivory/60');
content = content.replace(/text-zinc-550/g, 'text-ivory/50');
content = content.replace(/text-zinc-500/g, 'text-ivory/40');

fs.writeFileSync('src/components/VisualizerSection.tsx', content);
console.log("Colors replaced");
