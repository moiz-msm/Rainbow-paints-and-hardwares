const fs = require('fs');

const content = fs.readFileSync('src/components/VisualizerSection.tsx', 'utf-8');
const lines = content.split('\n');

const out = [];
let i = 0;

while (i < lines.length) {
  if (lines[i].includes('          {/* Controls Area / Sidebar Panel */}')) {
    out.push(lines[i]);
    out.push(lines[i+1]); // The wrapper div
    
    // Add Tabs
    out.push(`            {/* Control Tabs */}`);
    out.push(`            <div className="flex items-center gap-2 border-b border-zinc-200/50 p-2 sm:p-3 bg-zinc-50/50 overflow-x-auto hide-scrollbar shrink-0">`);
    out.push(`              <button onClick={() => setActiveControlTab('explore')} className={\`px-4 py-2 font-display font-semibold uppercase tracking-widest text-[10px] rounded-lg transition-all flex items-center gap-2 shrink-0 \${activeControlTab === 'explore' ? 'bg-white text-gold shadow-sm border border-zinc-200 scale-100' : 'text-ivory/60 hover:bg-white/50 border border-transparent'}\`}><Search className="w-3.5 h-3.5" /> Explore Catalog</button>`);
    out.push(`              <button onClick={() => setActiveControlTab('palette')} className={\`px-4 py-2 font-display font-semibold uppercase tracking-widest text-[10px] rounded-lg transition-all flex items-center gap-2 shrink-0 \${activeControlTab === 'palette' ? 'bg-white text-gold shadow-sm border border-zinc-200 scale-100' : 'text-ivory/60 hover:bg-white/50 border border-transparent'}\`}><Palette className="w-3.5 h-3.5" /> Palette & Save{combination.length > 0 && (<span className="bg-gold text-white text-[8px] px-1.5 py-0.5 rounded-full">{combination.length}</span>)}</button>`);
    out.push(`              <button onClick={() => setActiveControlTab('ai')} className={\`px-4 py-2 font-display font-semibold uppercase tracking-widest text-[10px] rounded-lg transition-all flex items-center gap-2 shrink-0 \${activeControlTab === 'ai' ? 'bg-white text-gold shadow-sm border border-zinc-200 scale-100' : 'text-ivory/60 hover:bg-white/50 border border-transparent'}\`}><Sparkles className="w-3.5 h-3.5" /> AI Magic & Match</button>`);
    out.push(`            </div>`);
    out.push(`            <div className="flex flex-col relative w-full h-[600px] overflow-y-auto custom-scrollbar">`);

    i += 6; // Skip the lines we're replacing (blank lines before "Colour Comparison Dashboard")
    break;
  }
  out.push(lines[i]);
  i++;
}

// Read Colour Comparison Dashboard
out.push(`              {activeControlTab === 'palette' && (`);
out.push(`                <div className="flex flex-col animate-in fade-in duration-300">`);

while (i < lines.length) {
  if (lines[i].includes('{/* Designer Curated Color Schemes Row */}')) {
    out.push(`                </div>`);
    out.push(`              )}`);
    out.push(`              {activeControlTab === 'ai' && (`);
    out.push(`                <div className="flex flex-col p-4 gap-6 animate-in fade-in duration-300">`);
    break;
  }
  out.push(lines[i]);
  i++;
}

// Read AI palettes and Custom Picker
while (i < lines.length) {
  if (lines[i].includes('{/* Shade List */}')) {
    out.push(`                </div>`);
    out.push(`              )}`);
    out.push(`              {activeControlTab === 'explore' && (`);
    out.push(`                <div className="flex flex-col h-full animate-in fade-in duration-300">`);
    break;
  }
  out.push(lines[i]);
  i++;
}

// Read Shade List and the rest of the file
while (i < lines.length) {
  // We need to stop right before the ending tags of the sidebar
  // But wait, the entire file ends with the closing of this panel and the section.
  // The structure was:
  // <div className="transition-all... sidebar panel">
  //   {/* ... */}
  // </div>
  // </div> // section
  // </section>
  // Let's just output everything. Wait, where does the sidebar panel end?
  if (lines[i].includes('</section>')) {
    // We need to inject the closing tags for the Tab content wrappers
    out.push(`                </div>`);
    out.push(`              )}`);
    out.push(`            </div>`); // Close the scrollable area
    
    // The sidebar panel's own closing div is further up?
    // Let's find it by counting brackets or just manually adding the closures.
    // Actually, I can just let the existing code close the sidebar panel.
  }
  out.push(lines[i]);
  i++;
}

fs.writeFileSync('src/components/VisualizerSection.tsx.out', out.join('\n'));
