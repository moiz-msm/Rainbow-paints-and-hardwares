const fs = require('fs');
let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

const regex = /<motion\.div[^>]*className="mt-8 sm:mt-10 grid grid-cols-4 divide-x divide-ivory\/10 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:justify-start lg:gap-8 w-full max-w-full"[^>]*>([\s\S]*?)<\/motion\.div>/;

const newBadges = `<motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    className="mt-10 sm:mt-12 grid grid-cols-4 gap-2 sm:gap-6 lg:flex lg:flex-row lg:flex-nowrap lg:items-start lg:justify-start lg:gap-12 w-full max-w-full"
                  >
                    <div className="flex flex-col items-center text-center">
                      <PackageOpen className="w-5 h-5 sm:w-7 sm:h-7 text-gold mb-2 sm:mb-3" strokeWidth={1.5} />
                      <span className="text-ivory font-bold text-[10px] sm:text-sm">200+</span>
                      <span className="text-ivory/80 text-[8px] sm:text-[10px] font-sans font-bold uppercase tracking-widest mt-0.5 sm:mt-1">Products</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[9px] font-sans mt-1 hidden sm:block">From top brands</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Palette className="w-5 h-5 sm:w-7 sm:h-7 text-gold mb-2 sm:mb-3" strokeWidth={1.5} />
                      <span className="text-ivory font-bold text-[10px] sm:text-sm">5000+</span>
                      <span className="text-ivory/80 text-[8px] sm:text-[10px] font-sans font-bold uppercase tracking-widest mt-0.5 sm:mt-1">Shades</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[9px] font-sans mt-1 hidden sm:block">To choose from</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Truck className="w-5 h-5 sm:w-7 sm:h-7 text-gold mb-2 sm:mb-3" strokeWidth={1.5} />
                      <span className="text-ivory font-bold text-[10px] sm:text-sm">Doorstep</span>
                      <span className="text-ivory/80 text-[8px] sm:text-[10px] font-sans font-bold uppercase tracking-widest mt-0.5 sm:mt-1">Delivery</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[9px] font-sans mt-1 hidden sm:block">Pan India</span>
                    </div>
                    
                    <div className="flex flex-col items-center text-center">
                      <Tags className="w-5 h-5 sm:w-7 sm:h-7 text-gold mb-2 sm:mb-3" strokeWidth={1.5} />
                      <span className="text-ivory font-bold text-[10px] sm:text-sm">Best</span>
                      <span className="text-ivory/80 text-[8px] sm:text-[10px] font-sans font-bold uppercase tracking-widest mt-0.5 sm:mt-1">Pricing</span>
                      <span className="text-ivory/50 text-[7px] sm:text-[9px] font-sans mt-1 hidden sm:block">Same as in-store</span>
                    </div>
                  </motion.div>`;

content = content.replace(regex, newBadges);
fs.writeFileSync('src/components/Hero.tsx', content, 'utf8');
