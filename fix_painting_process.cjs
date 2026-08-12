const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'PaintingProcess.tsx');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Change bg-zinc-950 to bg-royale-surface and text-white to text-zinc-800 or similar
  content = content.replace(
    /className="py-24 bg-zinc-950 text-white relative overflow-hidden"/g,
    'className="py-24 bg-royale-surface text-ivory relative overflow-hidden border-y border-royale-accent/40"'
  );
  
  // text-zinc-400 max-w-2xl mx-auto text-lg -> text-zinc-600 ...
  content = content.replace(
    /text-zinc-400 max-w-2xl mx-auto text-lg/g,
    'text-zinc-600 max-w-2xl mx-auto text-lg'
  );

  // bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent -> from-royale-surface via-royale-surface/50 to-transparent
  content = content.replace(
    /bg-gradient-to-t from-zinc-950 via-zinc-950\/20 to-transparent/g,
    'bg-gradient-to-t from-royale-surface via-royale-surface/20 to-transparent'
  );

  // border-4 border-zinc-950 -> border-4 border-royale-surface
  content = content.replace(
    /border-4 border-zinc-950/g,
    'border-4 border-royale-surface text-white'
  );

  // h3 text-white group-hover:text-gold -> text-ivory group-hover:text-gold
  content = content.replace(
    /<h3 className="text-xl font-bold font-serif mb-3 text-white group-hover:text-gold transition-colors">/g,
    '<h3 className="text-xl font-bold font-serif mb-3 text-ivory group-hover:text-gold transition-colors">'
  );

  // text-zinc-400 leading-relaxed text-sm -> text-zinc-600 leading-relaxed text-sm
  content = content.replace(
    /text-zinc-400 leading-relaxed text-sm/g,
    'text-zinc-600 leading-relaxed text-sm'
  );

  // bg-zinc-800 -> bg-royale-accent (for connector line)
  content = content.replace(
    /bg-zinc-800/g,
    'bg-royale-accent'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Fixed PaintingProcess.tsx');
}
