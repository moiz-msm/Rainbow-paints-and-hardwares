const fs = require('fs');

const content = fs.readFileSync('src/components/VisualizerSection.tsx', 'utf-8');

// 1. Find the start of Controls Area
const startStr = `          {/* Controls Area / Sidebar Panel */}`;
const startIdx = content.indexOf(startStr);
if (startIdx === -1) throw new Error("Could not find Controls Area");

// Find Colour Comparison Dashboard
const colourCompIdx = content.indexOf(`{/* Colour Comparison Dashboard */}`, startIdx);

// Find Designer Curated Color Schemes
const aiIdx = content.indexOf(`{/* Designer Curated Color Schemes Row */}`, colourCompIdx);

// Find Custom Paint Color Matcher
const customPickerIdx = content.indexOf(`{/* Custom Paint Color Matcher & Picker Panel */}`, aiIdx);

// Find Shade List
const shadeListIdx = content.indexOf(`{/* Shade List */}`, customPickerIdx);

// End of Shade List
const styleIdx = content.indexOf(`<style>{`);

// Split content
const beforeControls = content.substring(0, startIdx);
const colourCompHtml = content.substring(colourCompIdx, aiIdx);
const aiHtml = content.substring(aiIdx, shadeListIdx);
const shadeListHtml = content.substring(shadeListIdx, styleIdx);
const afterControls = content.substring(styleIdx);

// Find the 4 closing divs at the end of shadeListHtml and trim them out, we will put them back manually.
let strippedShadeList = shadeListHtml.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*$/, '');

const tabsHeader = `
          {/* Controls Area / Sidebar Panel */}
          <div className="transition-all duration-500 ease-in-out w-full glass-panel rounded-2xl border border-zinc-200 bg-white/95 backdrop-blur-xl flex flex-col shadow-lg overflow-hidden mt-2">
            
            {/* Control Tabs */}
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

const paletteTab = `
              {activeControlTab === 'palette' && (
                <div className="flex flex-col animate-in fade-in duration-300">
                  ${colourCompHtml}
                </div>
              )}
`;

const aiTab = `
              {activeControlTab === 'ai' && (
                <div className="flex flex-col p-4 gap-6 animate-in fade-in duration-300">
                  ${aiHtml}
                </div>
              )}
`;

const exploreTab = `
              {activeControlTab === 'explore' && (
                <div className="flex flex-col h-full animate-in fade-in duration-300">
                  ${strippedShadeList}
                </div>
              )}
`;

const tabsFooter = `
            </div>
          </div>
        </div>
      </div>
      
`;

const finalOutput = beforeControls + tabsHeader + exploreTab + paletteTab + aiTab + tabsFooter + afterControls;

fs.writeFileSync('src/components/VisualizerSection.tsx', finalOutput);

