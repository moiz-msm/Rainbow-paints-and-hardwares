const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const regex = /<motion\.div\s+initial={{ opacity: 0, y: 20 }}\s+animate={{ opacity: 1, y: 0 }}\s+transition={{ duration: 0\.8, delay: 0\.3 }}\s+className="mt-8 sm:mt-10 flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-3 sm:gap-4"\s*>([\s\S]*?)<\/motion\.div>/;

const newButtons = `<motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-6 sm:mt-10 flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full px-1 sm:px-0"
                  >
                    <Link to="/buy-paint-online" className="bg-[#C6A87C] text-white px-2 py-3 sm:px-8 sm:py-4 rounded-full text-[9px] sm:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap gap-1.5 sm:gap-3 hover:bg-[#b09265] transition-all duration-300 shadow-lg flex-1">
                      <ShoppingCart className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" /> Shop Paint
                    </Link>
                    <Link to="/visualizer" className="bg-white/50 border border-white/70 backdrop-blur-md text-[#C6A87C] px-2 py-3 sm:px-8 sm:py-4 rounded-full text-[9px] sm:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap gap-1.5 sm:gap-3 hover:bg-white/80 transition-colors duration-300 shadow-lg flex-1">
                      <Palette className="w-3.5 h-3.5 sm:w-5 sm:h-5 shrink-0" /> Visualise Colours
                    </Link>
                  </motion.div>`;

content = content.replace(regex, newButtons);
fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
