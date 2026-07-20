const fs = require('fs');

let content = fs.readFileSync('src/components/VisualizerSection.tsx.out', 'utf-8');

// The injected text near the end is:
//                 </div>
//               )}
//             </div>
//     </section>
// Let's remove it and put it where it belongs.

content = content.replace(/                <\/div>\n              \)\}\n            <\/div>\n    <\/section>/, '    </section>');

// Now we need to find the correct spot to close exploreTab.
// It's exactly at:
//                     <button
//                       onClick={() => setVisibleCount(prev => prev + 40)}
//                       ...
//                     >
//                       See More Shades
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
// We want to insert `</div> )} </div>` here, before the next `</div>`.

const target = `                    </button>
                  </div>
                )}
              </div>
            </div>`;

const replacement = `                    </button>
                  </div>
                )}
              </div>
            </div>
            </div>
          )}
        </div>`;

content = content.replace(target, replacement);

fs.writeFileSync('src/components/VisualizerSection.tsx', content);

