const fs = require('fs');

const content = fs.readFileSync('src/components/VisualizerSection.tsx.broken', 'utf-8');

// I will extract the sections using the original markers
const paletteStart = content.indexOf('{/* Colour Comparison Dashboard */}');
const aiStart = content.indexOf('{/* Designer Curated Color Schemes Row */}');
const customStart = content.indexOf('{/* Custom Paint Color Matcher & Picker Panel */}');
const exploreStart = content.indexOf('{/* Shade List */}');
const styleStart = content.indexOf('<style>{`');

let paletteInner = content.substring(paletteStart, aiStart);
let aiInner = content.substring(aiStart, customStart);
let customInner = content.substring(customStart, exploreStart);
let exploreInner = content.substring(exploreStart, styleStart);

// Clean up exploreInner closing divs
// It ends with a bunch of divs and closing tags. Let's find the last button or active text, and only take up to its closing tags.
// Actually, let's just strip all trailing </div> and )} and whitespace
exploreInner = exploreInner.replace(/(<\/div>\s*|\)\}\s*)+$/, '');

// Clean up aiInner closing divs? No, aiInner and customInner were adjacent, so no extra wrappers were between them.
// Same for paletteInner.

function balance(html) {
    let open = (html.match(/<div(\s|>)/g) || []).length;
    let close = (html.match(/<\/div>/g) || []).length;
    let diff = open - close;
    if (diff > 0) {
        html += '\n' + '</div>\n'.repeat(diff);
    }
    return html;
}

exploreInner = balance(exploreInner);
paletteInner = balance(paletteInner);
let combinedAiInner = balance(aiInner + customInner);

const beforeControls = content.substring(0, content.indexOf('{/* Control Tabs */}'));
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

const exploreTab = `
              {activeControlTab === 'explore' && (
                <div className="flex flex-col h-full animate-in fade-in duration-300">
${exploreInner}
                </div>
              )}
`;

const paletteTab = `
              {activeControlTab === 'palette' && (
                <div className="flex flex-col animate-in fade-in duration-300">
${paletteInner}
                </div>
              )}
`;

const aiTab = `
              {activeControlTab === 'ai' && (
                <div className="flex flex-col p-4 gap-6 animate-in fade-in duration-300">
${combinedAiInner}
                </div>
              )}
`;

const tabsFooter = `
            </div>
          </div>
        </div>
      </div>
`;

const afterControls = content.substring(styleStart);

fs.writeFileSync('src/components/VisualizerSection.tsx', beforeControls + tabsHeader + exploreTab + paletteTab + aiTab + tabsFooter + afterControls);

