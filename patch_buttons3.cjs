const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const regex = /<motion\.div\s+initial={{ opacity: 0, y: 20 }}\s+animate={{ opacity: 1, y: 0 }}\s+transition={{ duration: 0\.8, delay: 0\.3 }}\s+className="mt-6 sm:mt-10 flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full px-1 sm:px-0"\s*>([\s\S]*?)<\/motion\.div>/;

const newButtons = `<motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 w-full"
                  >
                    <Link to="/buy-paint-online" className="bg-[#C6A87C] text-white px-8 py-3.5 sm:px-8 sm:py-4 rounded-full text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap gap-2 sm:gap-3 hover:bg-[#b09265] transition-all duration-300 shadow-lg w-[85%] sm:w-auto min-w-[200px]">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> Shop Paint
                    </Link>
                    <Link to="/visualizer" className="bg-white/80 border border-white backdrop-blur-md text-[#C6A87C] px-8 py-3.5 sm:px-8 sm:py-4 rounded-full text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider flex items-center justify-center whitespace-nowrap gap-2 sm:gap-3 hover:bg-white transition-colors duration-300 shadow-md w-[85%] sm:w-auto min-w-[200px]">
                      <Palette className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" /> Visualise Colours
                    </Link>
                  </motion.div>`;

content = content.replace(regex, newButtons);
fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
