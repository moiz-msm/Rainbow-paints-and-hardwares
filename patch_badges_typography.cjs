const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const regex = /<motion\.div[^>]*className="mt-10 sm:mt-12 grid grid-cols-4 gap-2 sm:gap-6 lg:flex lg:flex-row lg:flex-nowrap lg:items-start lg:justify-start lg:gap-12 w-full max-w-full"[^>]*>([\s\S]*?)<\/motion\.div>/;

const newBadges = `<motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="mt-10 sm:mt-12 grid grid-cols-4 gap-2 sm:gap-4 lg:flex lg:flex-row lg:flex-nowrap lg:items-start lg:justify-start lg:gap-10 w-full max-w-full"
                  >
                    <div className="flex flex-col items-center text-center">
                      <PackageOpen className="w-5 h-5 sm:w-7 sm:h-7 text-[#C6A87C] mb-2" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">200+<br/>Products</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Palette className="w-5 h-5 sm:w-7 sm:h-7 text-[#C6A87C] mb-2" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">5000+<br/>Shades</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Truck className="w-5 h-5 sm:w-7 sm:h-7 text-[#C6A87C] mb-2" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">Doorstep<br/>Delivery</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Tags className="w-5 h-5 sm:w-7 sm:h-7 text-[#C6A87C] mb-2" strokeWidth={1.5} />
                      <span className="text-[#C6A87C] text-[8px] sm:text-[11px] font-sans font-bold uppercase tracking-widest leading-tight">Best<br/>Pricing</span>
                    </div>
                  </motion.div>`;

content = content.replace(regex, newBadges);
fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
