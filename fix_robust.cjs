const fs = require('fs');

const content = fs.readFileSync('src/components/VisualizerSection.tsx.broken', 'utf-8');

const startStr = `          {/* Controls Area / Sidebar Panel */}`;
const startIdx = content.indexOf(startStr);
const styleIdx = content.indexOf(`<style>{`);

let beforeControls = content.substring(0, startIdx);
let afterControls = content.substring(styleIdx);

// Instead of string splitting the broken file, I'll just use the code I know is there!
// I'll grab the `paletteInner` block
const colourCompIdx = content.indexOf(`{/* Colour Comparison Dashboard */}`, startIdx);
const aiIdx = content.indexOf(`{/* Designer Curated Color Schemes Row */}`, colourCompIdx);
const customPickerIdx = content.indexOf(`{/* Custom Paint Color Matcher & Picker Panel */}`, aiIdx);
const shadeListIdx = content.indexOf(`{/* Shade List */}`, customPickerIdx);

let paletteInner = content.substring(colourCompIdx, aiIdx);
let aiInner = content.substring(aiIdx, shadeListIdx);
let exploreInnerWithEnd = content.substring(shadeListIdx, styleIdx);

// The problem is `exploreInnerWithEnd` has 5 trailing `</div>` that belong to the outer layout!
// Let's strip them!
let exploreInner = exploreInnerWithEnd;
for(let i=0; i<5; i++) {
    exploreInner = exploreInner.replace(/<\/div>\s*$/, '');
}

// And `aiInner` has the wrappers for `Shade List`!
// Let's remove the wrappers from `aiInner`.
// The wrapper is right at the end of aiInner:
// <div className="flex flex-col h-full bg-[#faf9f6] rounded-b-2xl sm:rounded-b-2xl overflow-hidden relative border-t border-zinc-200">
let aiInnerParts = aiInner.split('<div className="flex flex-col h-full bg-[#faf9f6]');
if (aiInnerParts.length > 1) {
    aiInner = aiInnerParts[0];
}

// Now we know the exact content of each tab, without extra wrappers.
// BUT `exploreInner` needs its own wrappers since we removed them from `aiInner`!
// Wait! Since `exploreInner` ends with the closing tags for those wrappers, we must NOT put the opening wrappers back, we should just REMOVE the closing tags from `exploreInner`!
// Wait, the wrapper was `<div className="flex flex-col h-full bg-[#faf9f6] ... ">`. That's ONE wrapper.
// And another wrapper?
// Let's look at `exploreInner` start:
//             {/* Shade List */}
//             <div className="p-4 flex flex-col flex-grow min-h-[400px]">
// This is another wrapper!
// So if we removed ONE wrapper from `aiInner`, then `exploreInner` should have 1 EXTRA closing tag at the end!
// Let's strip 1 MORE closing tag from `exploreInner`.
exploreInner = exploreInner.replace(/<\/div>\s*$/, '');

const tabsHeader = `            {/* Control Tabs */}
            <div className="flex items-center gap-2 border-b border-zinc-200/50 p-2 sm:p-3 bg-zinc-50/50 overflow-x-auto hide-scrollbar shrink-0">
              <button
                onClick={() => setActiveControlTab('explore')}
                className={\`px-4 py-2 font-display font-semibold uppercase tracking-widest text-[10px] rounded-lg transition-all flex items-center gap-2 shrink-0 \${activeControlTab === 'explore' ? 'bg-white text-gold shadow-sm border border-zinc-200 scale-100' : 'text-ivory/60 hover:bg-white/50 border border-transparent'}\`}
              >
                <Search className="w-3.5 h-3.5" /> Explore Catalog
              </button>
              <button
                onClick={() => setActiveControlTab('palette')}
                className={\`px-4 py-2 font-display font-semibold uppercase tracking-widest text-[10px] rounded-lg transition-all flex items-center gap-2 shrink-0 \${activeControlTab === 'palette' ? 'bg-white text-gold shadow-sm border border-zinc-200 scale-100' : 'text-ivory/60 hover:bg-white/50 border border-transparent'}\`}
              >
                <Palette className="w-3.5 h-3.5" /> Palette & Save
                {combination.length > 0 && (
                  <span className="bg-gold text-white text-[8px] px-1.5 py-0.5 rounded-full">{combination.length}</span>
                )}
              </button>
              <button
                onClick={() => setActiveControlTab('ai')}
                className={\`px-4 py-2 font-display font-semibold uppercase tracking-widest text-[10px] rounded-lg transition-all flex items-center gap-2 shrink-0 \${activeControlTab === 'ai' ? 'bg-white text-gold shadow-sm border border-zinc-200 scale-100' : 'text-ivory/60 hover:bg-white/50 border border-transparent'}\`}
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Magic & Match
              </button>
            </div>
            <div className="flex flex-col relative w-full h-[600px] overflow-y-auto custom-scrollbar">
`;

const tabsFooter = `
            </div>
          </div>
        </div>
      </div>
`;

// Let's put it together
let newContent = beforeControls + tabsHeader + 
`              {activeControlTab === 'explore' && (
                <div className="flex flex-col h-full animate-in fade-in duration-300">
${exploreInner}
                </div>
              )}
` + 
`              {activeControlTab === 'palette' && (
                <div className="flex flex-col animate-in fade-in duration-300">
${paletteInner}
                </div>
              )}
` +
`              {activeControlTab === 'ai' && (
                <div className="flex flex-col p-4 gap-6 animate-in fade-in duration-300">
${aiInner}
                </div>
              )}
` + tabsFooter + afterControls;

fs.writeFileSync('src/components/VisualizerSection.tsx', newContent);

