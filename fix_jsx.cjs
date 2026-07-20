const fs = require('fs');

let content = fs.readFileSync('src/components/VisualizerSection.tsx', 'utf-8');

// The first error is at line 1349
// 1347|              
// 1348|                  </div>
// 1349|                )}
// This means there is an extra `</div>` right before `)}`.
// In `exploreTab`, `visibleCount` block ends with:
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
// Wait, looking at the code around line 1349 in the current broken file:
//                   <div className="pt-6 pb-2 flex justify-center">
//                     <button ...> See More Shades </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
// I will just replace the end of exploreTab to exactly match what it needs.

// Let's use a regex to match the visibleCount block and its closing tags
content = content.replace(/See More Shades\s*<\/button>\s*<\/div>\s*\)\}\s*<\/div>\s*<\/div>\s*\)\}/, 
`See More Shades
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}`);

// The second error is at line 2246:
// 2244|  </div>
// 2245|  </div>
// 2246|  </div>
// 2247|  </div>
// 2248|  </div>
// This is exactly 5 closing divs before <style>
// In the current file, tabsFooter has:
//             </div>
//           </div>
//         </div>
//       </div>
// And it seems we have an extra one.
// Let's replace 5 closing divs before <style> with 4 closing divs.

content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<style>/, 
`</div>
        </div>
      </div>
    </div>
    <style>`);

fs.writeFileSync('src/components/VisualizerSection.tsx', content);

